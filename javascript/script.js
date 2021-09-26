/*Burger and Navbar*/
const burger = document.querySelector('.burger');
const navBar = document.querySelector('.header nav');

const timeline1 = gsap.timeline({defaults: {duration: 0.2}});
const timeline2 = gsap.timeline({paused: true, reversed: true, defaults: {duration: 0.2}});
const lines = [".line1", ".line2", ".line3"];

burger.addEventListener('mouseenter', ()=> {
    if(burger.classList.contains('js-x') || timeline2.isActive()) {
        return
    }
    timeline1
        .to('.burger', {scaleX: 0.8, scaleY: 1.2, transformOrigin: 'center', repeat: 1, yoyo: true})
});

timeline2
    .to(".line2", {duration: 0.1, scaleX: 0, transformOrigin: 'center'}, "slide")
    .to(".line1", {scaleX: 2, transformOrigin: 'left', y: 10}, "slide")
    .to(".line3", {scaleX: 2, transformOrigin: 'right', y: -10}, "slide")
    .to(".burger", {rotation: 180})
    .to(".line1", {rotation: 45, transformOrigin: 'center'}, "cross")
    .to(".line3", {rotation: -45, transformOrigin: 'center'}, "cross")

burger.addEventListener('click', ()=> {
    navBar.classList.toggle('active');

    if(timeline1.isActive()) {
        timeline1.progress(1);
    }
    burger.classList.toggle('js-x');
    timeline2.reversed() ? timeline2.play() : timeline2.reverse();

});

window.onscroll = ()=> {
    if (navBar.classList.contains('active') && burger.classList.contains('js-x')) {
        timeline2.reverse();
        navBar.classList.remove('active');
        burger.classList.remove('js-x');
    }
}

/*Testimonials Slider*/
const rBtn = document.querySelector('.testimonial-btn.right');
const lBtn = document.querySelector('.testimonial-btn.left');
const testimonialInner = document.querySelectorAll('.testimonial-inner');
const testimonialSliderBox = document.querySelector('.testimonial-slider-box');
const testimonialSlider = document.querySelector('.testimonial-slider');
let testimonialIndex = 0;
let testimonialSlide;

/*About Slider*/
const aboutSlider = document.querySelector('.about-slider');
const aboutInner = document.querySelectorAll('.about-inner');
const aboutSliderBox = document.querySelector('.about-slider-box');
const drops = document.querySelectorAll('.drop-body');

let abuotIndex = 0;
let dropIndex = 0;
let aboutSlide;
let drop;
let aboutInterval;

let img = new Image();
img.src = './images/Background2-3-tiny.png';
img.onload = ()=> {
    document.body.style.opacity = 1;
    document.body.style.backgroundImage = `url(${img.src})`;
}

window.addEventListener('load', function() {
    // document.body.style.opacity = 1;
    document.querySelector('.about').style.display = 'block';
    document.querySelector('.testimonials').style.display = 'block';
    aboutSliderBox.style.width = 100 * aboutInner.length + '%';
    aboutSlider.style.height = aboutInner[0].offsetHeight + 'px';

    testimonialSliderBox.style.width = 100 * testimonialInner.length + '%';
    testimonialSlider.style.height = testimonialInner[0].offsetHeight + 'px';
});

window.addEventListener('resize', function() {
    aboutSlider.style.height = aboutInner[0].offsetHeight + 'px';
    abuotIndex = 0;
    aboutSliderBox.style.transform = `translateX(0px)`;
    activateElement(aboutInner, aboutSlide, abuotIndex);

    testimonialSlider.style.height = testimonialInner[0].offsetHeight + 'px';
    testimonialIndex = 0;
    testimonialSliderBox.style.transform = `translateX(0px)`
    activateElement(testimonialInner, testimonialSlide, testimonialIndex);
});

/*Colorizing Icons*/
const colorIcons = document.querySelectorAll('.hero-icon');
const hero = document.querySelector('.hero');
let observing;

let observer = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) {
        observing = false;
        return;
    } else {
        colorIcons.forEach( (e, i)=> {
            e.style.animationDelay = `${1 * i}s`;
        });
        observing = true;
    }
    scrollColor();
}, {threshold: [0]});

observer.observe(hero);

function scrollColor() {
    document.addEventListener('scroll', ()=> {
        if (observing === false) {
            return;
        }
        let hue = window.pageYOffset * 1.2;
        colorIcons.forEach( (e, i)=> {
            e.style.fill = `hsl(${hue / (i+1)}, 100%, 50%)`;
        });
    });
}

/*About Slider*/
function activateElement(array, element, index) {
    for(element of array) {
        element.classList.remove('active');
        if (array == drops) {
            element.style.fill = 'rgba(0,0,0,0)';
            array[index].style.fill = `hsl(${100 * index}, 100%, 50%)`;
        }
    }
    array[index].classList.add('active');
}

function changeAboutSlide() {
    if (abuotIndex > aboutInner.length - 1) {
        abuotIndex = 0;
        aboutSliderBox.style.transform = `translateX(0px)`;
    } else {
        aboutSliderBox.style.transform = `translateX(${-aboutInner[0].offsetWidth * abuotIndex}px)`;
    }
    activateElement(aboutInner, aboutSlide, abuotIndex);
    activateElement(drops, drop, abuotIndex);
    abuotIndex++;
}

drops.forEach(function(el, ind) {
    el.addEventListener('mouseover', ()=> {
        abuotIndex = ind;
        aboutSliderBox.style.transform = `translateX(${-aboutInner[0].offsetWidth * abuotIndex}px)`;
        activateElement(aboutInner, aboutSlide, abuotIndex);
        activateElement(drops, drop, abuotIndex);
        resetAutoPlayAbout()
    });
    el.addEventListener('mouseout', ()=> {
        autoPlayAbout(1000 * 10);
    });
})

autoPlayAbout(1000 * 5);

function resetAutoPlayAbout() {
    clearInterval(aboutInterval);
}

function autoPlayAbout(delay) {
    aboutInterval = setInterval(changeAboutSlide, delay);
}

/*Testimonials Slider*/
rBtn.addEventListener('click', ()=> {
    tSlideLeft();
    activateElement(testimonialInner, testimonialSlide, testimonialIndex);
});

lBtn.addEventListener('click', ()=> {
    tSliderRight();
    activateElement(testimonialInner, testimonialSlide, testimonialIndex);
});

function tSlideLeft() {
    if (testimonialIndex >= testimonialInner.length - 1) {
        testimonialIndex = 0;
        testimonialSliderBox.style.transform = `translateX(0px)`;
    } else {
        testimonialIndex++;
        testimonialSliderBox.style.transform = `translateX(${-testimonialInner[0].offsetWidth * testimonialIndex}px)`;
    }
}

function tSliderRight() {
    if (testimonialIndex <= 0) {
        testimonialIndex = testimonialInner.length - 1;
        testimonialSliderBox.style.transform = `translateX(${-testimonialInner[0].offsetWidth * (testimonialInner.length - 1)}px)`;
    } else {
        testimonialIndex--;
        testimonialSliderBox.style.transform = `translateX(${-testimonialInner[0].offsetWidth * testimonialIndex}px)`;
    }
}
