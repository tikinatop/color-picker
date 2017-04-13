var difficulty = 6;
var squarePlace = [30,1.66];
var container = document.querySelector("#container");
var colors = generateRandomColors(difficulty);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

window.document.onload = init();

easyBtn.addEventListener("click",function(){
	togglePropertySelected(mediumBtn,hardBtn,easyBtn);
	squarePlace = [30,1.66,30];
	container.style.maxWidth = "900px";
	difficulty = 3;
	init();
});

mediumBtn.addEventListener("click",function(){
	togglePropertySelected(easyBtn,hardBtn,mediumBtn);
	squarePlace = [30,1.66,30];
	container.style.maxWidth = "600px";
	difficulty = 6;
	init();
});

hardBtn.addEventListener("click",function(){
	togglePropertySelected(easyBtn,mediumBtn,hardBtn);
	squarePlace = [15,0.67,15];
	container.style.maxWidth = "900px";
	difficulty = 12;
	init();
});

function togglePropertySelected(a, b, c){
	a.classList.remove("selected");
	b.classList.remove("selected");
	c.classList.add("selected");
}

resetButton.addEventListener("click", init);

colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++){
	//Ajoute les couleurs initiales aux carrés
	squares[i].style.backgroudColor = colors[i];
	//Ajoute un eventListener aux carrés
	squares[i].addEventListener("click", function(){
		//
		var clickedColor = this.style.backgroundColor;
		//
		console.log(clickedColor,pickedColor);
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?";
			changeColors(clickedColor);
			h1.style.background = clickedColor;
		} else {
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again!";
		}
	});
}

	function init(){
	//génère toute les nouvelles couleurs
	colors = generateRandomColors(difficulty);
	//choisit une nouvelle couleur au hasard
	pickedColor = pickColor();
	//change colorDisplay 
	colorDisplay.textContent = pickedColor;
	//change la couleur des carrés
	for (var i = 0; i < squares.length; i++){
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
			squares[i].style.width = squarePlace[0]+"%";
			squares[i].style.margin = squarePlace[1]+"%";
			squares[i].style.paddingBottom = squarePlace[2]+"%";
		} else {
			squares[i].style.display = "none";
		}
	}
	resetButton.textContent = "New Colors";
	h1.style.background = "steelblue";
	}

	function changeColors(color) {
		//
		for (var i = 0; i < squares.length; i++) {
		//
			squares[i].style.background = color;			
		}
	}

	function pickColor() {
		var random = Math.floor(Math.random()*colors.length);
		return colors[random];
	}

	function generateRandomColors(num) {
		//
		var arr = [];
		//
		for (var i = 0; i < num; i++){
			//
			arr.push(randomColor());
		}
		//
		return arr;
	}

	function randomColor() {
		return "rgb("+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+")";
	}
	