const game = document.querySelector(".game");
const basket = document.querySelector(".basket");
const fruits = document.querySelector(".fruits");
let score = 0;

let basketLeft = parseInt(
    window.getComputedStyle(basket).getPropertyValue("left")
);
let basketBottom = parseInt(
    window.getComputedStyle(basket).getPropertyValue("bottom")
);

function moveBasketLeft() {
    if (basketLeft > 0) {
        basketLeft -= 15;
        basket.style.left = basketLeft + "px";
    }
}
function moveBasketRight() {
    if (basketLeft < 620) {
        basketLeft += 15;
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
    let fruitBottom = 470;
    let fruitLeft = Math.floor(Math.random() * 620);

    let fruit = document.createElement("div");
    fruit.setAttribute("class", "fruit");
    fruits.appendChild(fruit);

    function fallDownFruit() {
        if (
            fruitBottom < basketBottom + 50 &&
            fruitBottom > basketBottom &&
            fruitLeft > basketLeft - 30 &&
            fruitLeft < basketLeft + 80
        ) {
			fruits.removeChild(fruit);
			clearInterval(fallInterval);
			score++;
		}
            if (fruitBottom < basketBottom) {
                // alert("Game over! Your score is: "+score);
				
				clearInterval(fallInterval);
				clearTimeout(fruitTimeout);
				location.reload();
            }
        fruitBottom -= 5;
        fruit.style.bottom = fruitBottom + "px";
        fruit.style.left = fruitLeft + "px";
    }
    let fallInterval = setInterval(fallDownFruit, 20);
    let fruitTimeout = setTimeout(generateFruits, 2000);
}

generateFruits();

document.addEventListener("keydown", control);
