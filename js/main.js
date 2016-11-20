$(document).ready(function() {
  // alert('loaded');

  //fetch data
  $.ajax({
    type: 'GET',
    url: '../info.json',
    dataType: 'json',
    cache:false,
    success: function(result) {
      // console.log(result);
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
        $('#fullScreenModal').modal('show');
      });

    },
    error: function(xhr,status,error) {
      console.log(xhr);
    }
  });

  //handle back link
  $('.back-link').on('click', function() {
    $('#fullScreenModal').modal('hide');
  });

  //handlebar helpers
  Handlebars.registerHelper("addOne", function(count) {
	  return count + 1;
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
});
