import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";



// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAYrgz9-LLhatfGSeP7iRJsFz1AVF5onpI",
    authDomain: "oleru-young.firebaseapp.com",
    projectId: "oleru-young",
    // storageBucket: "oleru-young.appspot.com",
    storageBucket: "oleru-young.firebasestorage.app",
    messagingSenderId: "416968907489",
    appId: "1:416968907489:web:38b922f619fe2b003075a0"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


// Function to initialize Owl Carousel
function initializeTechCarousel() {
    if (window.$ && typeof $('#tech-carousel').owlCarousel === 'function') {
        $('#tech-carousel').owlCarousel('destroy'); // Destroy previous instance if any
        $('#tech-carousel').owlCarousel({
            loop: true,
            margin: 48,
            dots: true,
            nav: false,
            items: 1,
            smartSpeed: 1000,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true
        });
    }
}




async function loadImagesToCarousel() {
    const uploadsRef = ref(storage, 'uploads/');
    const carousel = document.getElementById('tech-carousel');
    carousel.innerHTML = `` // Clear existing items



    try {

        const res = await listAll(uploadsRef);

        if (res.items.length === 0) {
            console.warn('No images found in uploads folder');
            carousel.innerHTML = '<div class="two-col-grid"><div class="img-div"><p>No images available</p></div></div>';
            initializeTechCarousel();
            return;
        }

        for (const itemRef of res.items) {
            const url = await getDownloadURL(itemRef);
            const div = document.createElement('div');
            div.className = 'two-col-grid';
            div.innerHTML = `<div class="img-div"><img src="${url}" /></div>`;
            carousel.appendChild(div);
        }


        // Initialize Owl Carousel AFTER content is loaded
        initializeTechCarousel();

    } catch (error) {
        console.error('Error loading images:', error);
    }
}


loadImagesToCarousel();





// portfolio
$('#tech-carousel').owlCarousel({
    loop:true,
    margin:48,
    dots:true,
    nav: false,
    items: 1,
    smartSpeed: 1000,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    // responsive:{
    //     0:{
    //         items:1
    //     },
    //     600:{
    //         items:2
    //     },
    //     1000:{
    //         items: 3
    //     }
    // }
})



// portfolio
$('#reviews-carousel').owlCarousel({
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
            items: 2
        }
    }
})


// autoplayHoverPause, pause auto play on hover 



// Reviews
$('#why-carousel').owlCarousel({
    loop:true,
    margin:8,
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
            items:2
        },
        1000:{
            items:2
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



























