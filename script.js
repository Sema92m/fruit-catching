const game = document.querySelector(".game");
const basket = document.querySelector(".basket");
const fruits = document.querySelector(".fruits");
let count = document.querySelector(".counter");




let basketLeft = parseInt(
    window.getComputedStyle(basket).getPropertyValue("left")
);
let basketBottom = parseInt(
    window.getComputedStyle(basket).getPropertyValue("bottom")
);

function moveBasketLeft() {
    if (basketLeft > 0) {
        basketLeft -= 25;
        basket.style.left = basketLeft + "px";
    }
}
function moveBasketRight() {
    if (basketLeft < 250) {
        basketLeft += 25;
        basket.style.left = basketLeft + "px";
    }
}

function control(e) {
    if (e.key == "ArrowLeft") {
        moveBasketLeft();
    }
    if (e.key == "ArrowRight") {
        moveBasketRight();
    }
}

function generateFruits() {
    let fruitBottom = 500; 
    let fruitLeft = Math.floor(Math.random() * 250);
    let fruit = document.createElement("div");
    fruit.setAttribute("class", "fruit");
    fruits.appendChild(fruit);

    function fallDownFruit() {
        if (
            fruitBottom < basketBottom + 50 &&
            fruitBottom > basketBottom &&
            fruitLeft > basketLeft - 20 &&
            fruitLeft < basketLeft + 50
        ) {

            addEggToBasket();
            breakEggTimeout;
            fruits.removeChild(fruit);
            clearInterval(fallInterval);
            count.innerHTML++;
        }
        if (fruitBottom < basketBottom) {
            fruit.classList.add("fruit_break");
            clearInterval(fallInterval);
            clearTimeout(fruitTimeout);
            // location.reload();
        }
        fruitBottom -= 5;
        fruit.style.bottom = fruitBottom + "px";
        fruit.style.left = fruitLeft + "px";
    }
    let fallInterval = setInterval(fallDownFruit, 20);
    let fruitTimeout = setTimeout(generateFruits, 2000);
    let breakEggTimeout = setTimeout(removeEggFromBasket,500);
    
}

generateFruits();

function addEggToBasket() {
    basket.classList.toggle('basket_plus__egg')
}
function removeEggFromBasket() {
    if(basket.classList.contains('basket_plus__egg')) {
        basket.classList.remove('basket_plus__egg')
    }
}
document.addEventListener("keydown", control);





document
    .getElementById("left")
    .addEventListener("touchstart", moveBasketLeft, { passive: true });
document
    .getElementById("right")
    .addEventListener("touchstart", moveBasketRight, { passive: true });