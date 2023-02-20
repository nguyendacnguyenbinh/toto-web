"use strict";

var hasSubMenu = document.querySelector('.has-sub-menu');
var piece = document.querySelectorAll('.onePiece');
var slides = document.querySelectorAll('.main-container__slide--links');
var slide = 2;
var btnBTT = document.querySelector('.btn-back-to-top');
var active = [];

var effect = document.getElementById('effect');
var modal = document.querySelector('.modal');




(function start() {
    addBlackFriday ();    
    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
    showSlide();
})()



function addBlackFriday () {
  hasSubMenu.addEventListener('click', function() {  
    this.classList.toggle('open');
  })  
}

const menu = document.querySelector('#menu');
const sideBar = document.querySelector('.sidebar');

menu.onclick = function() {
  
}

var closes = document.querySelectorAll('.close-modal');
for (const close of closes) {
  close.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
  })
}

// check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  
  function callbackFunc() {
    for (var i = 0; i < piece.length; i++) {
      if (isElementInViewport(piece[i])) {
        piece[i].classList.add("in-view");
      }
    }
  }




// function scroll (){
//   let point = 0;
//   document.onscroll = function() {
//     point = window.scrollY || document.documentElement.scrollTop;
//     // console.log(point)
//     if (point < 100){
//       for (var i = 0; i < piece.length ; i++){
//         piece[i].classList.remove('in-view')    
//       }
    
//     } else if (point >= 100 && point < 800) {
//       piece[0].classList.add('in-view'); 
//     } else if (point >= 800 && point < 1500) {
//       piece[1].classList.add('in-view');
   
//     } else if (point >= 1500 && point < 2800) {
//       piece[2].classList.add('in-view');  
      
//     } else {
//       piece[3].classList.add('in-view');    
//     }

//     if( point < 150) {
//       btnBTT.classList.remove('display');
//     } else {
//       btnBTT.classList.add('display');
//     }
//   }  
  // logic sai. 
  // Khi load lại ở giữa trang.
  //  Các mục sẽ ko hiện ra mà phải kéo từ trên xuống mới hiện 
// }


function showSlide() { 
    
    if(slide === (slides.length - 1 )){
      slides[slide].classList.remove('show'); 
      slides[0].classList.add('show');        
      slide = 0;     
    } else {
      slides[slide].classList.remove('show');
      slides[slide + 1].classList.add('show'); 
      slide++;  
    }
  setTimeout(showSlide, 3000)    
}



const product = document.querySelector('.product');
const productList = document.querySelector('.product__list');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const interval = 2000;
let productItem = document.querySelectorAll('.product__item');
let index = 1;
let productId;


const firstClone = productItem[0].cloneNode(true);
const lastClone = productItem[productItem.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

productList.append(firstClone);
productList.prepend(lastClone);

let productWidth = productItem[index].clientWidth;

console.log(productWidth);

productList.style.transform = `translateX(${-productWidth * index}px)`;

const startSlide = () => {
 productId = setInterval(() => {
    moveToNextProduct();
  },interval);
}

const getSlide = () => document.querySelectorAll('.product__item');

productList.addEventListener('transitionend', () => {
  productItem = getSlide();
  if (productItem[index].id === firstClone.id){
    productList.style.transition = 'none'; 
    index = 1;
    productList.style.transform = `translateX(${-productWidth * index}px)`;
  }
  if (productItem[index].id === lastClone.id){
    productList.style.transition = 'none'; 
    index = productItem.length - 2;
    productList.style.transform = `translateX(${-productWidth * index}px)`;
  }
});


const moveToNextProduct = () => {
  // productItem = getSlide();
  if (index >= productItem.length - 1) return; // Nếu bấm nhanh quá thì sẽ ko làm gì cả
  index++;
  productList.style.transform = `translateX(${-productWidth * index}px)`;
  productList.style.transition = '.7s'; 
}

const moveToPrevProduct = () => { 
  if (index <= 0 ) return;
  index--;
  productList.style.transform = `translateX(${-productWidth * index}px)`;
  productList.style.transition = '.7s'; 
}

// product.addEventListener('mouseenter', () => {
//   clearInterval(productId);
// });
// product.addEventListener('mouseleave', startSlide);

nextBtn.addEventListener('click', moveToNextProduct);
prevBtn.addEventListener('click', moveToPrevProduct);

startSlide();
