// include('./components/_es6-11.js');
// include('./components/_navi.js');
// import Export from "./export";

// axios get 例
// axios.get('https://jsonplaceholder.typicode.com/users')
//     .then(response => console.log(response))
//     .catch(error => console.log(error))

// mounted(){
//   this.pageLoadingFn();
//   let elh = document.querySelector('.mheight');
//   console.log(window.pageYOffset);
//   console.log(elh.getBoundingClientRect().top);
//   console.log(window.pageYOffset + elh.getBoundingClientRect().top);
  // axios.get('https://jsonplaceholder.typicode.com/users')
  //     .then(response => console.log(response))
  //     .catch(error => console.log(error))
// }
let app = Vue.createApp({
  data: function(){
    return{
      pageLoadingDt: false,
      headerGnAcDt: false,
      maingVsHover: true,
    }
  },
  methods: {
    beforeunloadFn () {
      this.pageLoadingDt = false;
      window.scrollTo(0, 0);
    },
    pageLoadingFn(){
      setTimeout(()=>{
        this.pageLoadingDt = true;
      },800);
    },
    gnMenuIconFn(){
      console.log('gn menu click');
      const elBody = document.querySelector('body');
      this.headerGnAcDt = !this.headerGnAcDt;
      this.headerGnAcDt == true ? elBody.classList.add('header-gn-ac') : elBody.classList.remove('header-gn-ac')
    },
    mainVsCursorFn(event, target){
      // console.log(e)
      gsap.to(target, {
        css:{
          left: event.pageX+'px',
          top: event.pageY+'px',
        },
      });
    },
    mainVsMouseMoveFn(e, target, speed){
      let mainVscontainer = document.querySelector('.page-backgroundmove-container');
      let relX = e.pageX - mainVscontainer.offsetLeft;
      gsap.to(target, 1, {
        x: (relX - mainVscontainer.clientWidth / 2) / mainVscontainer.clientWidth * speed, ease:
        "power1.easeIn"
      });
    },
    documentMouseleave(){
      console.log("mouse leave")
    },
  },
  created(){
    console.log('created')
  },
  mounted(){
    console.log('mounted')
    // window.addEventListener('beforeunload', () => {
    //   this.beforeunloadFn()
    // })
    // window.onload = function () {
    //   window.scrollTo(0, 0);
    // }
    this.pageLoadingFn();
    let mainVscontainer = document.querySelector('.page-backgroundmove-container');
    let mainVsItems = document.querySelector('.page-backgroundmove-items');
    let mainVsTarget = document.querySelector('.page-backgroundmove-fig');
    let mainVsTarget2 = document.querySelector('.page-backgroundmove-fig2');
    let mainVsCursorTarget = document.querySelector('.page-cursor');
    let mainContentWrap = document.querySelector('.page-content-wrap');
    mainVscontainer.addEventListener('mousemove', e => {
      this.mainVsMouseMoveFn(e, mainVsTarget, -50);
      this.mainVsMouseMoveFn(e, mainVsTarget2, -200);
      this.mainVsCursorFn(e,mainVsCursorTarget);
    });
    // mainVsItems.addEventListener('mousemove', function(e){
    //   console.log('mousemove');
    //   // console.log(e.pageX);
    //   // console.log(e.pageY);
    //   mainVsCursorTarget.style.top = e.pageY + 1 + 'px';
    //   mainVsCursorTarget.style.left = e.pageX + 1 + 'px';
    //   // gsap.to(mainVsCursorTarget, {
    //   //   css:{
    //   //     left: e.pageX+'px',
    //   //     top: e.pageY+'px',
    //   //   },
    //   // });
    // });
    mainVscontainer.addEventListener('mouseover', e => {
        console.log('mouseover');
    });
    mainVscontainer.addEventListener('mouseleave', e => {
        console.log('mouseleave');
    });


    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function() {
        let speed = 50;
        // gsap.timeline({scrollTrigger:{trigger:'.scrollDist', start:'top top', end:'bottom bottom', scrub:1}})
        gsap.utils.toArray(".page-scrolltrigger-container").forEach(function(containerTrigger) {
          var elTargetA = containerTrigger.querySelectorAll(".page-scrolltrigger-target-a");
          var elTargetB = containerTrigger.querySelectorAll(".page-scrolltrigger-target-b");
          const tl = gsap.timeline();
          tl.to(elTargetA, {y: -10 * speed, ease: "power1.in" }, 0)
          .to(elTargetB, {y: -30 * speed, ease: "power1.in" }, 0)
          ScrollTrigger.create({
            animation: tl,
            trigger: containerTrigger,
            start: 'top center',
            end: 'bottom center',
            markers: true,
            scrub: 1, // 1秒遅れて追従させる
            // pin: true, // 要素を固定表示させる
            // anticipatePin: 1, // ピン留めをどのくらい早く行うかを制御
        });
        });
      },
      // "(max-width: 767.98px)": function() {
      //   ScrollTrigger.create({
      //     scroller:".page-scroll-container",
      //     trigger: ".header-nav-ac",
      //     start: 'top 100px',
      //     // end: 'bottom 30%',
      //     // markers: true,
      //     // scrub: 1, // 1秒遅れて追従させる
      //     // pin: true, // 要素を固定表示させる
      //     // anticipatePin: 1, // ピン留めをどのくらい早く行うかを制御
      //     onEnter : self => {
      //       elHeader.classList.add('sc');
      //     },
      //     onLeaveBack : self => {
      //       elHeader.classList.remove('sc');
      //     }

      //   });
      // }
    });

  }
})
app.mount('#app')