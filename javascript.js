// gsap.from('.box1',{
//     x:600,
//     duration:2,
//     delay:2,
//      backgroundColor:"blue",
//     //  stagger:2
//     repeat:-1,
//     yoyo:true
// })

// let t1=gsap.timeline();

// t1.from(".box1", 
// {
//     x:600,
//     duration: 1,
//  })
// t1.from(".box2", 
// {
//     x:900,
//     duration: 1,
// })

// gsap.from("#nav img,#nav h3,#nav h4,#nav button",{
//     y:-100,
//     duration:1,
//     delay:1,
//     opacity:0,
//     stagger:0.5 // sab ka darman katni time ma animate krwna ha 
// })


// t1.to("h5",{
//     y:30,
//     repeat:-1,
//     duration:0.7,
//     yoyo:true
// })

// gsap.from(".page1 .box", {duration: 1, delay:2,x:600,rotate:360,scrollTrigger:{

//   trigger:".page1 .box",
//   scroller:'body',
//   markers:true,
//   start:'top 30%',
//   scrub:2
// }})


// gsap.from("#page2 .box", {
//   scale:0,
//   opacity:0,
//   duration:1,
//   stagger:0.3,
//   scrollTrigger:{
//     trigger:'#page .box',
//     scroller:'body'
  
//   }
// })

// const scroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true
// });


gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const t1 = gsap.timeline();

// Animation for page1
t1.from(".page1 .box", {
  duration: 1, 
  rotate: 360,
  scale: 0,
  delay: 1
});

// Animation for page3 triggered by ScrollTrigger
t1.from(".page2 .box", {
  duration: 1,
  rotate: 360,
  scale: 0,
  delay:1,
  scrollTrigger: {
    trigger: ".page2 .box",
    scroller:'#main',
    markers: true,
    start:"top 60%",
    end:'top 30%',
    scrub:2
  }
});
