(function() {
  let firstEl = document.querySelector('.fnc-slide .fnc-slide-images');
  let firstNums = [ '0', '1', '2' ];  // ランダム表示させたい画像のパス
  let firstImages = [ 'url("/assets/images/home/home-top-1.jpg")', 'url("/assets/images/home/random-b.jpg")', 'url("/assets/images/home/random-c.jpg")' ];  // ランダム表示させたい画像のパス
  let newImages = [];
  let newNums = [];
  var randumStart = true;
  let number;
  let prevNum;


  let firstImgRandom = function(){
    if(randumStart){
      number = Math.floor(Math.random() * firstNums.length);
      prevNum = firstNums[number];
      randumStart = false;
    }else{
      newNums = [].concat(firstNums);
      newNums.splice(prevNum, 1);
      number = Math.floor(Math.random() * newNums.length);
      prevNum = newNums[number];
    }

    let selectedImg = firstImages[prevNum];
    firstEl.style.backgroundImage = selectedImg;
  }
  firstImgRandom();

  var $$ = function(selector, context) {
    var context = context || document;
    var elements = context.querySelectorAll(selector);
    return [].slice.call(elements);
  };

  function _fncSliderInit($slider, options) {
    var el_base = "fnc-";
    var prefix = ".fnc-";

    var $slider = $slider;
    var $slidesCont = $slider.querySelector(prefix + "slider-wrap");
    var $slides = $$(prefix + "slide", $slider);
    var $controls = $$(prefix + "nav-control", $slider);
    var $controlsBgs = $$(prefix + "nav-bg", $slider);
    var $progressAS = $$(prefix + "nav-control-progress", $slider);

    var numOfSlides = $slides.length;
    var curSlide = 1;
    var sliding = false;
    var slidingAT = +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 30;
    var slidingDelay = +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 30;

    var autoSlidingActive = false;
    var autoSlidingTO;
    var autoSlidingDelay = 5000; // default autosliding delay value
    var autoSlidingBlocked = false;

    var $activeSlide;
    var $activeControlsBg;
    var $prevControl;

    function setIDs() {
      $slides.forEach(function($slide, index) {
        $slide.classList.add(el_base+"slide-" + (index + 1));
        $slide.setAttribute("data-old", index + 1);
      });

      $controls.forEach(function($control, index) {
        $control.setAttribute("data-slide", index + 1);
        $control.classList.add(el_base + "nav-control-" + (index + 1));
      });

      $controlsBgs.forEach(function($bg, index) {
        $bg.classList.add(el_base + "nav-bg-" + (index + 1));
      });
    };

    setIDs();
    TweenMax.to('.m--active-slide .fnc-slide-images', 15, {x: '5%'});
    function afterSlidingHandler() {
      
      TweenMax.to('.m--active-slide .fnc-slide-images', 15, {x: '5%'});
      TweenMax.to('.m--active-old .fnc-slide-images', .15, {x: '0%',delay : .25});
      $slider.querySelector(".m--previous-slide").classList.remove("m--active-slide", "m--previous-slide");
      $slider.querySelector(".m--previous-nav-bg").classList.remove("m--active-nav-bg", "m--previous-nav-bg");

      $activeSlide.classList.remove("m--before-sliding");
      $activeControlsBg.classList.remove("m--nav-bg-before");
      $prevControl.classList.remove("m--prev-control");
      $prevControl.classList.add("m--reset-progress");
      var triggerLayout = $prevControl.offsetTop;
      $prevControl.classList.remove("m--reset-progress");

      sliding = false;
      var layoutTrigger = $slider.offsetTop;

      if (autoSlidingActive && !autoSlidingBlocked) {
        setAutoslidingTO();
      }
    };

    function performSliding(slideID) {
      if (sliding) return;
      sliding = true;
      window.clearTimeout(autoSlidingTO);
      curSlide = slideID;
      $prevControl = $slider.querySelector(".m--active-control");
      $prevControl.classList.remove("m--active-control");
      $prevControl.classList.add("m--prev-control");
      $slider.querySelector(prefix + "nav-control-" + slideID).classList.add("m--active-control");

      $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
      $activeControlsBg = $slider.querySelector(prefix + "nav-bg-" + slideID);

      $slider.querySelector(".m--active-slide").classList.add("m--active-old");
      $slider.querySelector(".m--active-slide").classList.add("m--previous-slide");
      $slider.querySelector(".m--active-nav-bg").classList.add("m--previous-nav-bg");

      $activeSlide.classList.add("m--before-sliding");
      $activeControlsBg.classList.add("m--nav-bg-before");

      var layoutTrigger = $activeSlide.offsetTop;

      $activeSlide.classList.add("m--active-slide");
      $activeControlsBg.classList.add("m--active-nav-bg");
      setTimeout(afterSlidingHandler, slidingAT + slidingDelay);//afterSlidingHandler, slidingAT + slidingDelay

      let slideID_old;

      // slideID_old = slideID;
      let $el_old = $slider.querySelectorAll(".m--active-old");
      let $el_previous = $slider.querySelector(".m--previous-slide");
      slideID_old = $el_previous.getAttribute('data-old')

      for( let i=0; i<$el_old.length; i++) {
        let old_data = $el_old[i].getAttribute('data-old');
        if(old_data !== slideID_old){
          $slider.querySelector(prefix + "slide-" + old_data).classList.remove("m--active-old");
        }
      }
    };

    function controlClickHandler() {
      if (sliding) return;
      if (this.classList.contains("m--active-control")) return;
      if (options.blockASafterClick) {
        autoSlidingBlocked = true;
        $slider.classList.add("m--autosliding-blocked");
      }
      var slideID = +this.getAttribute("data-slide");

      performSliding(slideID);
    };

    $controls.forEach(function($control) {
      $control.addEventListener("click", controlClickHandler);
    });

    function setAutoslidingTO() {
      if(curSlide === 3){
        firstImgRandom();
      }
      window.clearTimeout(autoSlidingTO);
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 1;

      autoSlidingTO = setTimeout(function() {
        performSliding(curSlide);
      }, delay);
    };

    if (options.autoSliding || +options.autoSlidingDelay > 0) {
      if (options.autoSliding === false) return;
      
      autoSlidingActive = true;
      setAutoslidingTO();
      
      $slider.classList.add("m--with-autosliding");
      var triggerLayout = $slider.offsetTop;
      
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      delay += slidingDelay + slidingAT;
      
      $progressAS.forEach(function($progress) {
        $progress.style.transition = "transform " + (delay / 1000) + "s";
      });
    }
    
    $slider.querySelector(prefix + "nav-control:first-child").classList.add("m--active-control");

  };

  var fncSlider = function(sliderSelector, options) {
    var $sliders = $$(sliderSelector);

    $sliders.forEach(function($slider) {
      _fncSliderInit($slider, options);
    });

  };

  window.fncSlider = fncSlider;

}());