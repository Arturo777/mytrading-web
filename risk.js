
//LOT SIZE
let inputCap, inputCs, inputPer, lotSize, submitLot, totalLots;


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











