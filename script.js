$(document).ready(function() {

  var sayings = document.getElementsByClassName('saying');
  var answers = document.getElementsByClassName('answer');
  var rand1 = Math.floor(Math.random()*3);
  var rand2 = Math.floor(Math.random()*3);
  audioListen();

  function is_touch_device() {
   return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  }
  //=============================
  //=======NORMAL BROWSERS=======
  //=============================
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
  //=============================
  //========TOUCH DEVICES========
  //=============================
  } else {
    mobileListen();

    console.log('is touch device');
    $('.subtitle').empty();
    $('.subtitle').append('swipe left for words of wisdom. swipe right for answers to any question.');
    $('.confetti').addClass('confettiMobile');
//swipe left
    $('.mhead').on('swipeleft', function() {
      getWisdom();
      $('.mhead').transition({
        x: -300
      }).transition({
        x: 0
      });
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

  //=============================
  //======GENERAL FUNCTIONS======
  //=============================

  function getWisdom() {
    if (!$('.mhead').hasClass('invalid')) {
      $('.mhead').addClass('invalid');
      pauseAll();
      $('.waiting').addClass('hide');
      $('.confetti').removeClass('hide');
      rand1 = newRand(rand1);
      sayings[rand1].load();
      sayings[rand1].play();
      setTimeout(function() {
        $('.mhead').removeClass('invalid spinner');
      }, 700);
    }
  }

function getAnswers() {
  if (!$('.mhead').hasClass('invalid')) {
      pauseAll();
      rand2 = newRand(rand2);
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
        answers[rand2].load();
        answers[rand2].play();
        $('.waiting').addClass('hide');
      }, 2800);
      setTimeout(function() {
        if ($('.mhead').hasClass('invalid')) {
          $('.mhead').removeClass('invalid');
          console.log('answer removing spinner');
        }
      }, 6000);
    }
  }

  function getWisdomMobile() {
    if (!$('.mhead').hasClass('invalid')) {
      $('.mhead').addClass('invalid');
      pauseAll();
      $('.waiting').addClass('hide');
      $('.confetti').removeClass('hide');
      rand1 = newRand(rand1);
      sayings[rand1].load();
      sayings[rand1].play();
    }
  }

  function getAnswersMobile() {
  if (!$('.mhead').hasClass('invalid')) {
    $('.mhead').addClass('invalid');
      pauseAll();
      $('.confetti').removeClass('hide');
      $('.waiting').removeClass('hide');
      rand2 = newRand(rand2);
      answers[rand2].load();
      answers[rand2].play();
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
    }
  }

  // function getAnswersMobile() {
  // if (!$('.mhead').hasClass('invalid')) {
  //     pauseAll();
  //     rand2 = newRand(rand2);
  //     $('.confetti').removeClass('hide');
  //     $('.waiting').removeClass('hide');
  //     $('.mhead').addClass('invalid');
  //     $('.waiting').transition({ scale: 1.5 })
  //     .transition({ scale: 1 })
  //     .transition({ scale: 1.5 })
  //     .transition({ scale: 1 })
  //     .transition({ scale: 1.5 })
  //     .transition({ scale: 1 })
  //     .transition({ scale: 1.5 })
  //     .transition({ scale: 0
  //     });
  //     $('.mhead').transition({
  //       rotate: '+=2160deg'
  //     }, 3000);
  //     setTimeout(function() {
  //       answers[rand2].play();
  //       $('.waiting').addClass('hide');
  //     }, 3000);
  //     setTimeout(function() {
  //       if ($('.mhead').hasClass('invalid')) {
  //         $('.mhead').removeClass('invalid');
  //       }
  //     }, 7000);
  //   }
  // }

  function audioListen() {
    $('.saying').each(function() {
      this.addEventListener('ended', function(){
        $('.confetti').addClass('hide');
        $('.mhead').removeClass('invalid');
      });
    });
    $('.answer').each(function() {
      this.addEventListener('ended', function(){
        $('.confetti').addClass('hide');
        console.log('listen removing spinner');
        $('.mhead').removeClass('invalid spinner');
      });
    });
  }

  function mobileListen() {
    $('.saying').each(function() {
      this.addEventListener('loadstart', function() {
        console.log('loading');
        $('.waiting').removeClass('hide');
      });
      this.addEventListener('playing', function() {
        console.log('playing');
        $('.waiting').addClass('hide');
        $('.mhead').removeClass('invalid');
      });
    });
    $('.answer').each(function() {
      this.addEventListener('loadstart', function() {
        console.log('loading');
        $('.waiting').removeClass('hide');
      });
      this.addEventListener('playing', function() {
        console.log('playing');
        $('.waiting').addClass('hide');
        $('.mhead').removeClass('invalid');
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

  function newRand(z) {
    var n = Math.floor(Math.random()*3);
    if (n === z) {
      return newRand();
    }
    return n;
  }

}); //close document listener




