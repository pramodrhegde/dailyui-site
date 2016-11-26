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
