
//LOT SIZE
let inputCap, inputCs, inputPer, lotSize, submitLot, totalLots;

//FIBO LEVELS
let inputP1, inputP2, submitLev, levels;
let L100, L786, L618, L50, L382, L236, L0; 

//LOTS DISTRIBUTION
let submitLD;
let LotsWS0, LotsWS236, LotsWS382, LotsWS50, LotsWS618, LotsWS786;


function setup() {
	noCanvas(); 

	//LOT SIZE
	submitLot = select('#showLot');
	submitLot.mousePressed(lots);
	inputCap = select('#capital'); 
	inputCs = select('#sc')
	inputPer = select('#perc');
	lotSize = select('#lots');

	inputPer.changed(lots);
	inputCs.changed(lots);
	inputCap.changed(lots);


}

function lots(capital,cs,perc) {
	capital =inputCap.value();
	cs      =inputCs.value();
	perc    =(inputPer.value())*.01;

	totalLots=(((capital*perc)/cs)*.01).toFixed(2);

	lotSize.html('Lots = '+totalLots);


}











