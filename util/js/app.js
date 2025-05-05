// portfolio
$('#tech-carousel').owlCarousel({
    loop:true,
    margin:48,
    dots:true,
    nav: false,
    items: 3,
    smartSpeed: 1000,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items: 3
        }
    }
})


// autoplayHoverPause, pause auto play on hover 



// Reviews
$('#why-carousel').owlCarousel({
    loop:true,
    margin:28,
    dots: false,
    nav: false,
    smartSpeed: 1000,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})



// autoplayHoverPause, pause auto play on hover 


AOS.init({
// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        // nav.classList.add("bg-dark");
        nav.classList.remove("py-5");
        nav.classList.add("py-3", "shadow");
    } else {
        // nav.classList.remove("bg-dark");
        nav.classList.add("py-5");
        nav.classList.remove("py-3", "shadow");
    }
})



const counters = document.querySelectorAll(".count");
const speed = 100;




// The code to start the animation is now wrapped in a function
const startCounters = () => {

    counters.forEach((counter) => {
        const updateCount = () => {
            // get the data attribute
            const target = parseInt(+counter.getAttribute("data-target"));
            // get the inner text of the element
            const currentValue = parseInt(+counter.innerText);
            
            const increment = Math.trunc(target / speed);
            if (currentValue < target) {
                counter.innerText = currentValue + increment;
                setTimeout(updateCount, 1);
            } else {
                currentValue.innerText = target;
            }
        };
        updateCount(counter);
    });
}
  
// On the first scroll in this window, call the function to start the counters
//   window.addEventListener('scroll', startCounters, {
//     once: false
//   });



// Observation

const observerOptions = {
    root: null,
    threshold: 0.4,
    // rootMargin: '0 0 -50px 0'
};


const counterObserver = new IntersectionObserver(entries => {
    console.log(entries)
    entries.forEach(entry => {

        // if (!entry.isIntersecting) return;


        if (entry.isIntersecting) {
            // entry.target.classList.add('in-view');
            
            startCounters();
            console.log(1)
            // counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);


counters.forEach((counterElem) => counterObserver.observe(counterElem));



























