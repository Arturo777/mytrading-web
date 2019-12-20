//CALL PRICES
let url = "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=";

let url2= "&to_symbol=";

let url3="&interval=60min&apikey=GLIC8LSNPTUPX8TM"

let sizeData="&outputsize=compact";

let urlW = "https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=EUR&to_symbol=USD&apikey=GLIC8LSNPTUPX8TM";

let hours, prices;

//ANIMATE
var counter;
let counterHtml;
let interval;

let closes =[];

let preloadedCloses = [];

//CONTROLS
let buttonPlay;
let buttonStop;
let sliderMain;

//INPUTS
let inputPairFrom, inputPairTo;
let from, to, sumbmit;

function setup() {
	let cnv = createCanvas(800, 500);
	cnv.parent("canvas-container");

	//COUNTER
	counterHtml = select("#counterHtml");

	//CONTROLS
	buttonPlay = select("#play");
	buttonPlay.mousePressed(play);

	buttonStop = select("#stop");
	buttonStop.mousePressed(stop);

	//SLIDERS
	sliderSpeed = select("#speed");

	//INPUTS
	inputPairFrom = select("#PairFrom");
	inputPairTo = select("#PairTo");

	inputPairTo.changed(NewPair);


	sumbmit = select("#sumbmit");
	sumbmit.mousePressed(NewPair);

	//CALL PRICES
	askPrice();
}

function draw() {
	background(180);
	if (!prices) {
		textSize(40);
		textAlign(CENTER);
		fill(37);
		text('Loading...', width/2-25, height/2);
	} else {
		slidering();
		textSize(20);
		fill(37);
		text("Price: "+close,100,60);
		// console.log(prices);
		vela();

		//ALMACENAR LOS DATOS EN EL ARRAY PARA DIBUJAR EL SPIKE
		if (interval) {
			closes.push(prices[counter]["4._close"]);
			// console.log(min(closes));
		} 
	}	
}

function keyPressed() {
	if (keyCode === 32) {
		console.log("space bar");
	  play();
	} 
}

function NewPair() {
	buttonPlay.html("Play");
	interval = false;
	prices=false;
	closes = [];
	preloadedCloses = [];
	tittlePair = select("#tittlePair");
	tittlePair.html(inputPairFrom.value().toUpperCase()+inputPairTo.value().toUpperCase());
	askPrice();



}

function slidering() {
	if (mouseIsPressed) {

	counter = sliderMain.value();
	} else {
	
	sliderMain.value(counter);
	counterHtml.html(counter);
	}
}

function loading() {
	if (hours){
		counter = (hours.length)-1;
		counterHtml.html(counter);

		//SLIDERS 2
		// console.log(hours.length);

		if (!sliderMain) {
			sliderMain = createSlider(0, (hours.length)-1, (hours.length)-1);
		}
		sliderMain.parent("slider-container");
		sliderMain.style('width', '800px');
		
	}
}

//ACCESING DATA 
function askPrice() {
	urlF =url + inputPairFrom.value() + url2 + inputPairTo.value() +url3+sizeData;
	loadJSON(urlF, gotData);	
}

function gotData(data) {

	old = JSON.stringify(data).split(' ').join('_');
	data = JSON.parse(old);
	
	//LOADED CANDLESTICKS
	hours = Object.keys(data["Time_Series_FX_(60min)"]);

	//PRICES
	prices = Object.values(data["Time_Series_FX_(60min)"]);

	loading();
	
	//DE UN SOLO CHINGADAZO PONER TODOS LOS CLOSES EN UN ARRAY
	for (let i = 0; i < hours.length; i++) {
		preloadedCloses.push(prices[i]["4._close"]);
	}
	console.log(preloadedCloses);
}

//CONTROLS 
function timer() {
	counterHtml.html(counter);
	counter--;
	if (counter == 0) {
		clearInterval(interval);
		buttonPlay.html("Again");
		interval = false;
	}		
} 

function play() {
	if (!interval) {
		interval = setInterval(timer, sliderSpeed.value());
		buttonPlay.html("Pause");

	} else {
		clearInterval(interval);
		interval = false;
		buttonPlay.html("Play");

		counter = sliderMain.value();
	}

	if (counter == 0) {
		clearInterval(interval);
		buttonPlay.html("Play");
		counter = (hours.length)-1;
		counterHtml.html(counter);

		sliderMain.value(counter);
		interval = false;
		closes = [];
	}		
}

function stop () {
	clearInterval(interval);
	buttonPlay.html("Play");
	counter = (hours.length)-1;
	counterHtml.html(counter);

	sliderMain.value(counter);
	interval = false;
	closes = [];
}








	

