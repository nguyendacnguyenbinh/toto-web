"use strict";

var hasSubMenu = document.querySelector('.has-sub-menu');
var pieces = document.querySelectorAll('.onePiece');
var slides = document.querySelectorAll('.main-container__slide--links');
var slide = 2;
var btnBTT = document.querySelector('.btn-back-to-top');
var active = [];

var effect = document.getElementById('effect');
var modal = document.querySelector('.modal');




(function start() {
    addBlackFriday ();    

    showSlide();
})()



function addBlackFriday () {
  hasSubMenu.addEventListener('click', function() {  
    this.classList.toggle('open');
  })  
}

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



const menu = document.querySelector('#menu');
const sideBar = document.querySelector('.sidebar');

menu.onclick = function() {
  
}

// Đóng modal cover
var closes = document.querySelectorAll('.close-modal');
for (const close of closes) {
  close.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
  })
}

// show onscroll
function checkAnimationScroll() {
  pieces.forEach(function (piece) {
    let heightScreen = window.innerHeight;
    let rectEl = piece.getClientRects()[0];

    console.log(rectEl);

    if(!(rectEl.top > heightScreen || rectEl.bottom < 0)){
      piece.classList.add("in-view");
    } else {
      piece.classList.remove("in-view");
    }
  })
}

window.onscroll = checkAnimationScroll



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
