function initRabbit() {
  //about click
  $('#home').on('click', function() {
    ga('send', 'event', 'aboutButtons', 'click', 'homeButton');
    window.location.href="/"
  });

  //social media click ga
  $('.social a').on('click', function() {
    var $this = $(this);
    ga('send', 'event', 'aboutButtons', 'click', 'Social-Button-' + $this.data('type'));
  });
}

function initMatrix() {
  //about click
  $('#about').on('click', function() {
    ga('send', 'event', 'homeButtons', 'click', 'aboutButton');
    window.location.href="/about"
  });

  //social media click ga
  $('.social a').on('click', function() {
    var $this = $(this);
    ga('send', 'event', 'homeButtons', 'click', 'Social-Button-' + $this.data('type'));
  });

  // alert('loaded');
  var ajaxData = {};
  var pageNumber = 1;

  //fetch data
  $.ajax({
    type: 'GET',
    url: '../info.json',
    dataType: 'json',
    cache:false,
    success: function(result) {
      // console.log(result);
      ajaxData = $.extend(true, ajaxData, result);
      result.data = result.data.reverse();
      var newArr = result.data.splice(0, 10);
      result.data = newArr;

      var cardsTemplateScript = $('#cards-template').html();
      var cardsTemplate = Handlebars.compile(cardsTemplateScript);
      var cardsHtml = cardsTemplate(result);
      $('.card-container').html(cardsHtml);

      //handle image fullscreen
      $('.card-image').on('click', function() {
        var $this = $(this);
        var imageSrc = $this.attr('src');
        var imageId = $this.attr('id');
        var modalImage = $('#fullScreenModal').find('img');
        var backLink = $('#fullScreenModal').find('a.back-link');
        $(modalImage).attr('src', imageSrc);
        $(backLink).attr('href', '#' + imageId);

        ga('send', 'event', 'imagePreview', 'click', 'Image-' + $this.prev('.image-name').text());
        $('#fullScreenModal').modal('show');
      });

      $('.card-image').on('mouseenter', function() {
        var $this = $(this);
        ga('send', 'event', 'imageHover', 'hover', 'Image-' + $this.prev('.image-name').text());
      });
    },
    error: function(xhr,status,error) {
      console.log(xhr);
    }
  });

  //handle back link
  $('.back-link').on('click', function() {
    ga('send', 'event', 'homeButtons', 'click', 'backButton');
    $('#fullScreenModal').modal('hide');
  });

  //handlebar helpers
  Handlebars.registerHelper("addOne", function(count) {
	  return count;
	});

  Handlebars.registerHelper("prefixCount", function(day) {
	  var number = parseInt(day);

    if(number < 10) {
      return "00";
    }else if(number < 100) {
      return "0";
    }else {
      return "";
    }
	});

  //Add scroll event listener
  $(document).scroll(function() {
    var $this = $(this);
    var offSet = $('.card-container').find('.card:last-child').offset().top;
    var scrollTop = $this.scrollTop();
    var windowHeight = $(window).height();

    // console.log(offSet);
    // console.log(scrollTop);
    if(scrollTop + windowHeight >= offSet) {
      if((pageNumber * 10 === $('.card-container .card').length)) {
        getNextPage(pageNumber);
        pageNumber = pageNumber + 1;
        $('.loader').fadeIn(300);
      }
    }
  });

  //append next pageNumber
  function getNextPage(pageNumber) {
    var newResult = {
      data: []
    };
    console.log(ajaxData.data.length);
    newResult = $.extend(true, newResult, ajaxData);
    newResult.data = newResult.data.reverse();
    // console.log(newResult.data);
    var newArr = newResult.data.splice((pageNumber) * 10, 10);
    newResult.data = newArr;
    // console.log(newArr);
    var cardsTemplateScript = $('#cards-template').html();
    var cardsTemplate = Handlebars.compile(cardsTemplateScript);
    var cardsHtml = cardsTemplate(newResult);

    $('.card-container').append(cardsHtml);
    setTimeout(function() {
      $('.loader').fadeOut(300);
    }, 3000);

    //handle image fullscreen
    $('.card-image').on('click', function() {
      var $this = $(this);
      var imageSrc = $this.attr('src');
      var imageId = $this.attr('id');
      var modalImage = $('#fullScreenModal').find('img');
      var backLink = $('#fullScreenModal').find('a.back-link');
      $(modalImage).attr('src', imageSrc);
      $(backLink).attr('href', '#' + imageId);

      ga('send', 'event', 'imagePreview', 'click', 'Image-' + $this.prev('.image-name').text());
      $('#fullScreenModal').modal('show');
    });

    $('.card-image').on('mouseenter', function() {
      var $this = $(this);
      ga('send', 'event', 'imageHover', 'hover', 'Image-' + $this.prev('.image-name').text());
    });

    ga('send', 'event', 'pageScroll', 'scroll', (pageNumber * 10/100) * 100 + '%');
  }
}
