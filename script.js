$(document).ready(function() {

  var sayings = document.getElementsByClassName('saying');
  var answers = document.getElementsByClassName('answer');
  var rand;
  audioListen();

  function is_touch_device() {
   return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  }

  //=======NORMAL BROWSERS=======
  if (!is_touch_device()) {
   console.log('not touch device');
   //hover
    $('.mhead').mouseenter(function() {
      getWisdom();
    });
    //click
    $('.mhead').on('click', function() {
      getAnswers();
      $('#one').transition({
        rotate: "+=190deg"
      }, 3000);
      $('#two').transition({
        rotate: "-=200deg"
      }, 3000);
    });
  //========TOUCH DEVICES========
  } else {
    console.log('is touch device');
    $('.subtitle').empty();
    $('.subtitle').append('swipe left for words of wisdom. swipe right for answers to any question.');
    //swipe left
    $('.mhead').on('swipeleft', function() {
      $('.mhead').transition({
        x: -300
      }).transition({
        x: 0
      });

      getWisdom();
      $('#one').transition({
        rotate: "+=90deg"
      });
      $('#two').transition({
        rotate: "-=90deg"
      });
    });
    //swipe right
    $('.mhead').on('swiperight', function() {
      getAnswersMobile();
    });
  }

  function getWisdom() {
    if (!$('.mhead').hasClass('invalid')) {
      $('.mhead').addClass('invalid');
      pauseAll();
      $('.waiting').addClass('hide');
      $('.confetti').removeClass('hide');
      rand = Math.floor(Math.random()*3);
      setTimeout(function() {
        sayings[rand].play();
        $('.mhead').removeClass('invalid spinner');
      }, 200);
    }
  }

function getAnswers() {
  if (!$('.mhead').hasClass('invalid')) {
      pauseAll();
      rand = Math.floor(Math.random()*3);
      $('.confetti').removeClass('hide');
      $('.waiting').removeClass('hide');
      $('.mhead').addClass('spinner invalid');
      $('.waiting').transition({ scale: 1.5 })
      .transition({ scale: 1 })
      .transition({ scale: 1.5 })
      .transition({ scale: 1 })
      .transition({ scale: 1.5 })
      .transition({ scale: 1 })
      .transition({ scale: 1.5 })
      .transition({ scale: 0
      });
      setTimeout(function() {
        answers[rand].play();
        $('.waiting').addClass('hide');
      }, 3000);
      setTimeout(function() {
        if ($('.mhead').hasClass('invalid')) {
          $('.mhead').removeClass('spinner invalid');
        }
      }, 7000);
    }
  }

  function getAnswersMobile() {
  if (!$('.mhead').hasClass('invalid')) {
      pauseAll();
      rand = Math.floor(Math.random()*3);
      $('.confetti').removeClass('hide');
      $('.waiting').removeClass('hide');
      $('.mhead').addClass('invalid');
      $('.waiting').transition({ scale: 1.5 })
      .transition({ scale: 1 })
      .transition({ scale: 1.5 })
      .transition({ scale: 1 })
      .transition({ scale: 1.5 })
      .transition({ scale: 1 })
      .transition({ scale: 1.5 })
      .transition({ scale: 0
      });
      $('.mhead').transition({
        rotate: '+=2160deg'
      }, 3000);
      setTimeout(function() {
        answers[rand].play();
        $('.waiting').addClass('hide');
      }, 3000);
      setTimeout(function() {
        if ($('.mhead').hasClass('invalid')) {
          $('.mhead').removeClass('invalid');
        }
      }, 7000);
    }
  }

  function audioListen() {
    $('.saying').each(function() {
      this.addEventListener('ended', function(){
        $('.confetti').addClass('hide');
        $('.mhead').removeClass('invalid spinner');
      });
    });
    $('.answer').each(function() {
      this.addEventListener('ended', function(){
        $('.confetti').addClass('hide');
        $('.mhead').removeClass('invalid spinner');
      });
    });
  }

  function pauseAll() {
    $('.saying').each(function() {
      this.pause();
      this.currentTime=0;
    });
    $('.answer').each(function() {
      this.pause();
      this.currentTime=0;
    });
  }

}); //close document listener




