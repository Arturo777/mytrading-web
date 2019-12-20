
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


    //FIBO LEVELS
    submitLev= select('#showlev');
    submitLev.mousePressed(FiboLevels);
    inputP1= select('#P1');
    inputP2= select('#P2');
    levels= select('#levels');

	L100 = select('#L100');  
	L786 = select('#L786');
	L618 = select('#L618');  
	 L50 = select('#L50');  
	L382 = select('#L382');  
	L236 = select('#L236'); 
	  L0 = select('#L0');   
    
    inputP2.changed(FiboLevels);


	//LOTS DISTRIBUTION
	
	submitLD = select('#showLD');
	submitLD.mousePressed(LotDistribution);
	LotsWS0 = select('#LotsWS0');
	LotsWS236 = select('#LotsWS236');
	LotsWS382 = select('#LotsWS382');
	LotsWS50 = select('#LotsWS50');
	LotsWS618 = select('#LotsWS618');
	LotsWS786 = select('#LotsWS786');

	S236 = select('#LotsWS0'); 
	S382 = select('#LotsWS0');
	S50 = select('#LotsWS0');
	S618 = select('#LotsWS0');
	S786 = select('#LotsWS0');



}

function lots(capital,cs,perc) {
	capital =inputCap.value();
	cs      =inputCs.value();
	perc    =(inputPer.value())*.01;

	totalLots=(((capital*perc)/cs)*.01).toFixed(2);

	lotSize.html('Lots = '+totalLots);

	LotDistribution();

}


function FiboLevels(P1,P2) {

	P1=inputP1.value();
	P2=inputP2.value();

	L100.html( '100% = '+P1);
	L786.html('78.6% = '+(P1-(P1-P2)*.214));
	L618.html('61.8% = '+(P1-(P1-P2)*.382));
	 L50.html(  '50% = '+(P1-(P1-P2)*.5));
	L382.html('38.2% = '+(P1-(P1-P2)*.618));
	L236.html('23.6% = '+(P1-(P1-P2)*.764));
	  L0.html(   '0% = '+P2);
}

function LotDistribution() {
LotsWS0.html('0% Stop = '+totalLots);
LotsWS236.html('23.6% Stop =  '+(totalLots/.764).toFixed(2));
LotsWS382.html('38.2% Stop = '+(totalLots/.618).toFixed(2));
LotsWS50.html('50% Stop = '+(totalLots/.50).toFixed(2));
LotsWS618.html('61.8% Stop = '+(totalLots/.382).toFixed(2));
LotsWS786.html('78.6% Stop = '+(totalLots/.214).toFixed(2));
}









