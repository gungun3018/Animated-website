gsap.registerPlugin(ScrollTrigger);

const t = gsap.timeline();
const quotes = document.querySelector(".quote") ;

// very important note never use var for gsap.timeline() , 

t

    .from("#text1" , {
      duration : 1 , 
      
      onStart: function () {
            $("#text1").textillate({
                in: {
                  effect: 'rotateIn' , 
                  loop : true , 
                  sync : true , 
                }
             });
        } , 
      }) 

      .from("#text2" , {
        duration : 1 , 
        delay :0.4 , 
        onStart: function () {
              $("#text2").textillate({
                  in: {
                    effect: 'rotateIn' , 
                    loop : true , 
                    sync : true , 
                  }
               });
          } , 
        }) 
      
    
    .from(quotes , {
        duration : 6 , 
        opacity : 0 , 
        scale : 2 , 
        ease : "power2.out" , 

        // scrollTrigger :{
        //     trigger : "#page2 .h",
        //     scroller : "body" ,
        //     start : "top 60%" ,
        //     // markers : "true" ,  
        //     onStart: function () {
        //         $(".typewriter").textillate({
        //             in: {
        //               effect: 'hinge'
        //             }
        //          });
        //     } , 
        //   }

    });


  function loco(){
  
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
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    }
    
//smooth transition from page 1 to 2 ..
loco() ; 

// var t = gsap.timeline();

// t
//  .from("#page2 .quote", {
//     delay : 2 , 
//     onStart: function () {
//       $(".typewriter").textillate({
//         in: {
//           effect: 'hinge',
//         }
//       });
//     }
//   });




