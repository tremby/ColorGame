var numSquares = 9;
var colors = getrandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

for(var i=0; i<modeButtons.length; i++)
{
	modeButtons[i].addEventListener("click",function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		modeButtons[2].classList.remove("selected");
		this.classList.add("selected");
		if(this.textContent === "Easy")
			numSquares = 3;
		else if(this.textContent === "Hard")
			numSquares = 9;
		else
			numSquares = 6;
		reset();
	})
}

function reset()
{
	colors = getrandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors"
	for(var i = 0;i < squares.length;i++)
	if(colors[i])
	{
		squares[i].style.display = "block";
		squares[i].style.backgroundColor = colors[i];
	}
	else
		squares[i].style.display = "none";
	h1.style.backgroundColor = "";
	h1.style.color = "";
}

resetButton.addEventListener("click",function(){
	reset();
})

for(var i = 0;i < colors.length;i++)
{
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click",function(){
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor)
		{
			messageDisplay.textContent = "CORRECT !";
			resetButton.textContent = "Play Again ?";
			changeColors(pickedColor);
			h1.style.backgroundColor = clickedColor;
			if(colorIsBright(clickedColor)) {
				h1.style.color = "black";
			}
		}
		else
		{
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "TRY AGAIN !";
		}
	})
}

function changeColors(color){
	for(var i = 0; i<squares.length; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function getrandomColors(num){
	var arr = [];
	for(i=0; i<num; i++){
		arr.push(RandomColor());
	}
	return arr;
}

function RandomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb("+r+", "+g+", "+b+")";
}

function colorIsBright(colorStr) {
	return Array.from(colorStr.matchAll(/(\d+)/g))
		.reduce(function (total, numstr) {
			return total + parseInt(numstr, 10);
		}, 0) / (255 * 3) > 0.7;
}
