var squarePlace = [[900,30,1.66,3],
[600,30,1.66,6],
[900,15,0.67,12]];
var container = document.querySelector("#container");
var colors = [], pickedColor,currentMode;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".modeBtn");


function checkThis(){
		for (var i = 0; i< modeBtn.length; i++) {
			if (modeBtn[i].classList.contains("selected")){
				currentMode = modeBtn[i];
				console.log(modeBtn[i].textContent);
				init(i);
			}
		}
	}


function init(level){
	//génère toute les nouvelles couleurs
	colors = generateRandomColors(squarePlace[level][3]);
	container.style.maxWidth = String(squarePlace[level][0])+"px";
	//choisit une nouvelle couleur au hasard
	pickedColor = pickColor();
	//change colorDisplay 
	colorDisplay.textContent = pickedColor;
	//change la couleur des carrés
	for (var i = 0; i < squares.length; i++){
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
			squares[i].style.width = String(squarePlace[level][1])+"%";
			squares[i].style.paddingBottom = String(squarePlace[level][1])+"%";
			squares[i].style.margin = String(squarePlace[level][2])+"%";
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
	

	window.onload = checkThis();

	for (var i = 0; i< modeBtn.length; i++) {

		modeBtn[i].addEventListener("click",function(){
			if(this !== currentMode){
				currentMode.classList.remove("selected");
				this.classList.add("selected");
				checkThis();
			}
		});
	}
	


	resetButton.addEventListener("click", checkThis);


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
