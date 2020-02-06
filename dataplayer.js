//CALL PRICES

////INTRADAY
let url = "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=";
let url2= "&to_symbol=";

let urlInterval= "&interval=60min";

let apiKey="&apikey=GLIC8LSNPTUPX8TM";

let sizeData="&outputsize=compact";

////DAILY
let dailyUrl = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=GLIC8LSNPTUPX8TM";


//TO STORE DATA
let rows, prices;

//ANIMATE
let counter;
let counterHtml;
let interval;
let closes =[];
let preloadedCloses = [];
let closeMapped;

//CONTROLS
let buttonPlay;
let buttonStop;
let sliderMain;

let x = 80;

//INPUTS
let inputPairFrom, inputPairTo;
let from, to, submit;

let timeFrame;

function setup() {

	let cnvDiv = select(canvasContainer);
	cnv = createCanvas(canvasContainer.offsetWidth,canvasContainer.offsetHeight);

	// console.log(canvasContainer.offsetHeight);

	 cnv.parent("#canvasContainer");

	//COUNTER
	counterHtml = select("#counterHtml");

	//CONTROLS
	buttonPlay = select("#play");
	buttonPlay.mousePressed(play);

	buttonStop = select("#stop");
	buttonStop.mousePressed(stop);

	

	//INPUTS
	inputPairFrom = select("#PairFrom");
	inputPairTo = select("#PairTo");

	// inputPairTo.changed(NewPair);

	submit = select("#askData");
	submit.mousePressed(NewPair);

	timeFrame = select("#timeFrame");

	//SLIDER SPEED
	SpeedValue = select("#SpeedValue");
	sliderSpeed = select("#speed");

	//SLIDER MAIN
	

	//CALL PRICES
	askPrice();
}

// function windowResized() {
// 	canvasResize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
// }

//ACCESING DATA 
function askPrice() {
	
	
	//DATA SIZE
	if (fullData.checked) {
		sizeData ="&outputsize=full";
		// console.log("checked!");
	} else {
		sizeData ="&outputsize=compact";
	}
	

	//LINK
	if (timeFrame.value() == "Daily") {

		urlF = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + inputPairFrom.value() + "&to_symbol=" + inputPairTo.value() + apiKey + sizeData;

	} else {

		//LINK
		urlF = url + inputPairFrom.value() + url2 + inputPairTo.value() + timeFrame.value() + sizeData + apiKey;
	}

	//console.log(urlF);



	//WHAT'S THIS?
	loadJSON(urlF, gotData);
}

function gotData(data) {

	old = JSON.stringify(data).split(' ').join('_');
	data = JSON.parse(old);

	//SPLIT STRING

	let splitString = split(timeFrame.value(), '=');

	let intraDayString = "Time_Series_FX_("+splitString[1]+")";

	let DailyString = "Time_Series_FX_(Daily)" ;

	

	if (timeFrame.value() == "Daily") {

		//TOTAL ROWS
		rows = Object.keys(data[DailyString]); 

		//PRICES
		prices = Object.values(data[DailyString]);
		
	} else {

		//TOTAL ROWS
		rows = Object.keys(data[intraDayString]);

		//PRICES
		prices = Object.values(data[intraDayString]);
	}
		// console.log(splitString[1]);

		//console.log(rows);
		loading();
	


	//DE UN SOLO CHINGADAZO PONER TODOS LOS CLOSES EN UN ARRAY
	for (let i = 0; i < rows.length; i++) {
		preloadedCloses.push(prices[i]["4._close"]);
	}

	// console.log(preloadedCloses);

}

function loading() {
	if (rows) {
	   counter = (rows.length)-1;
	   counterHtml.html(counter);
	}
   
		//MAIN SLIDER 
		x = (rows.length)-1;

		if (sliderMain) {
			sliderMain.remove();
		}

		sliderMain = createSlider(0,x,x);
		sliderMain.parent("#sliderMain-container");
		sliderMain.style("width", "100%");
		sliderMain.id("sliderMain");

		//SPEED SLIDER
		SpeedValue.html(sliderSpeed.value());
}

function draw() {
	background(250);
	if (!prices) {
		textSize(40);
		textAlign(CENTER);
		fill(37);
		text('Loading...', width/2-25, height/2);

		
	} else {
		slidering();
		textSize(20);
		fill(37);


		push();
		fill(204, 153, 0);
		stroke(193);
		strokeWeight(1);
		translate(width/2, height/2);
		line(width,closeMapped,-width,closeMapped);
		pop();

		push();
		translate(width/2, height/2);
		priceLabel = text(close,-width/3,closeMapped+6);
		pop();
	

		// console.log(prices);
		vela();

		//ALMACENAR LOS DATOS EN EL ARRAY PARA DIBUJAR EL SPIKE
		if (interval) {
			closes.push(prices[counter]["4._close"]);
			//  console.log(min(closes));
		} 

		
	}	
}

function keyPressed() {
	if (keyCode === 32) {
		// console.log("space bar");
	  play();
	} 
}

function NewPair() {
	if (!interval) {
	buttonPlay.html("Play");
	}
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

	let SpeedValueMapped = map(sliderSpeed.value(), 50, 500, 100, 1);

	

	SpeedValue.html(SpeedValueMapped.toFixed(0));
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
		counter = (rows.length)-1;
		counterHtml.html(counter);

		sliderMain.value(counter);
		interval = false;
		closes = [];
	}		
}

function stop () {
	clearInterval(interval);
	buttonPlay.html("Play");
	counter = (rows.length)-1;
	counterHtml.html(counter);

	 sliderMain.value(counter);
	interval = false;
	closes = [];
}








	

