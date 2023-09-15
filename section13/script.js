'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); //ambil attribute
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event delegation, for better performance
// 1. add eventListener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); //ambil attribute
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// 2. determine what element originated the event

// end event delegation

// button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // scrolling old school way
  // window.scrollTo(
  //   // s1coords.left + window.scrollX,
  //   // s1coords.top + window.scrollY
  //   {
  //     left: s1coords.left + window.scrollX,
  //     top: s1coords.top + window.scrollY,
  //     behavior: 'smooth',
  //   }
  // );

  // scrolling modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// create tabbed component

// event handler button

// console.log(tabs);
// console.log(tabsContainer);
// bad practice
// tabs.forEach(t =>
//   t.addEventListener('click', () => {
//     console.log('tabs');
//   })
// );
// good practice - event delegation
tabsContainer.addEventListener('click', function (e) {
  console.log(e);
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  // guard clause . untuk keluar function
  if (!clicked) return;

  // remove all active class tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // activate content tabs
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// end create tabbed component

// menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
// MENGGUNAKAN event delegation
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// end menu fade animation

// sticky navbar
// using scroll event
// menentukan posisi dari section 1
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > 0) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// intersection observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
// end sticky navbar

// revealing element on scrolls
const allSections = document.querySelectorAll('.section');
// remove section--hidden
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// end revealing element on scrolls

// lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');

    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));
// endlazy loading images

// slider component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    // kenapa pake slide? agar terbuat sesuai dengan banyaknya gambar yang ada.
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };

  const activateDot = function (slide) {
    // non-aktifkan semua titik
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // mengakrifkan titik yang dipilih saja
    // bagaiman kita tahu yang aktif? #kita menggunakan data atribute.
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active'); //menselect data atribute
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    // console.log('next slide');
    goToSlide(currentSlide);
    // menerapkan activate dot
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    // console.log('prev slide');
    goToSlide(currentSlide);

    // menerapkan activate dot
    activateDot(currentSlide);
  };

  // looping slide
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i})`));

  // function initialization
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // next slide
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide(); // circuiting
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      // menerapkan activate dot
      activateDot(slide);
    }
  });
};

slider();
// end slider component
///////////////////////////////////////

///////////////////////////////////////
// selecting, creating, deleting elements
// querySelector
// const header = document.querySelector('.header');
// queryselectorAll ==> menghasilkan nodelist
const allSection = document.querySelectorAll('.section');
// console.log(allSection);

// getElementByID
// const section1 = document.getElementById('section--1');
// console.log(section1, 'getElementById');
// getElementsByTagName ==> HTML Collection
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons, 'getElementsByTagName');
// getElementsByClassName ==> HTML Collection
const allbtn = document.getElementsByClassName('btn');
// console.log(allbtn, 'getelementsbyclassname');

// creating and inserting elements
// .insertAdjacentHTML  ==> memasukan elements dengan javascript
// create element
const message = document.createElement('div'); //membuat element
message.classList.add('cookie-message'); //membuat class
// message.textContent = 'we use cookie for improved functionality and analytics';
message.innerHTML =
  "we use cookie for improved functionality and analytics <button class='btn btn--close--cookie'>Got it!</button>";

// header.prepend(message); //memasukan di element pertama dari parrentnya
header.append(message);
// header.append(message.cloneNode(true)); //memasukan di akhir di akhir dari parrentnya.
// before & after
// header.before(message); //dimasukan sebelum header element (sibling)
// header.after(message); //dimasukan sesudah  header element (sibling)

// delete elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });
// end selecting, creating, deleting elements
///////////////////////////////////////

///////////////////////////////////////
//implementing smooth scrolling
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   // scrolling old school way
//   // window.scrollTo(
//   //   // s1coords.left + window.scrollX,
//   //   // s1coords.top + window.scrollY
//   //   {
//   //     left: s1coords.left + window.scrollX,
//   //     top: s1coords.top + window.scrollY,
//   //     behavior: 'smooth',
//   //   }
//   // );

//   // scrolling modern way
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// end implementing smooth scrolling
///////////////////////////////////////

///////////////////////////////////////
// events and event handlers

// const alertH1 = function () {
//   alert('addeventlistener: great!');

//   h1.removeEventListener('mouseenter', alertH1);
// };
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertH1);

//  end events and event handlers
///////////////////////////////////////

///////////////////////////////////////
//  event propagation
// rgb(255,255,255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('link', e.target);
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('container', e.target);

//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('nav', e.target);

//   this.style.backgroundColor = randomColor();
// });

//  endevent propagation
///////////////////////////////////////

///////////////////////////////////////
// // style, attributes and classes
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// // console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// // css variable /css custom property
// // document.documentElement.style.setProperty('--color-primary', 'orangered');

// console.log('--------- attribute ------');
// // attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// // console.log(logo.className);
// // merubah value pada attribtue
// logo.alt = 'beatiful minimalist logo';
// console.log(logo.alt);
// // cara lain mengakses attribtue
// console.log(logo.getAttribute('class'));
// // cara set attribute
// logo.setAttribute('company', 'Bankist');
// console.log(logo.getAttribute('company'));

// // data attribute
// console.log(logo.dataset.versionNumber);

// // classes

// // endstyle, attributes and classes
///////////////////////////////////////

///////////////////////////////////////
//  DOM Traversing

// const h1 = document.querySelector('h1');
// // going downwards : child
// console.log(h1.querySelectorAll('.highlight'));

// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // goin upwards : parent
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

//  end DOM Traversing
///////////////////////////////////////
