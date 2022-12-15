"use strict";

var hasSubMenu = document.querySelector('.has-sub-menu');
var piece = document.querySelectorAll('.onePiece');
var slides = document.querySelectorAll('.main-container__slide--links');
var slide = 2;
var btnBTT = document.querySelector('.btn-back-to-top');
var active = [];
var products = document.querySelectorAll('.product__item');
var effect = document.getElementById('effect');
var modal = document.querySelector('.modal');
var closes = document.querySelectorAll('.close-modal');


function start() {
    addBlackFriday ();    
    scroll ();
    showSlide();
}

start()

function addBlackFriday () {
  hasSubMenu.addEventListener('click', function() {  
    this.classList.toggle('open');
  })  
}



// function isElementInViewport(el) {
//     var rect = el.getBoundingClientRect();
//     return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <=
//         (window.innerHeight || document.documentElement.clientHeight) &&
//       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
//   }

function scroll (){
  let point = 0;
  document.onscroll = function() {
    point = window.scrollY || document.documentElement.scrollTop;
    console.log(point)
    if (point < 100){
      for (var i = 0; i < piece.length ; i++){
        piece[i].classList.remove('in-view')    
      }
    
    } else if (point >= 100 && point < 800) {
      piece[0].classList.add('in-view');
      piece[1].classList.remove('in-view');    
    } else if (point >= 800 && point < 1500) {
      piece[1].classList.add('in-view');
      piece[2].classList.remove('in-view');  
   
    } else if (point >= 1500 && point < 2800) {
      piece[2].classList.add('in-view');
      piece[3].classList.remove('in-view');    
      
    } else {
      piece[3].classList.add('in-view');    
    }

    if( point < 150) {
      btnBTT.classList.remove('display');
    } else {
      btnBTT.classList.add('display');
    }
  }  
  // logic sai. 
  // Khi load lại ở giữa trang.
  //  Các mục sẽ ko hiện ra mà phải kéo từ trên xuống mới hiện

  
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


// Cần hiệu ứng chạy smooth hơn
// function pulsation(){
//     var date = new Date();
//     const ms = date.getMilliseconds();
  
//     var size = 0.084 * ms;
//     console.log(ms)
//     document.getElementById('effect').style.width = `${size}px`;
//     document.getElementById('effect').style.height = `${size}px`;
  
//     setTimeout(pulsation,ms)
//   }
//   pulsation()
  

function hidemodal()  { 
  modal.classList.remove('open-modal');
}

for (const close of closes) {
  close.addEventListener('click', hidemodal)
}