function vela() {

    //ACCESING PRICES
    open = prices[counter]["1._open"];
    high = prices[counter]["2._high"];
    low = prices[counter]["3._low"];
    close = prices[counter]["4._close"];
    upSpike = max(closes);
    downSpike = min(closes);

    //MAPPING
    translate(400, 250);
    openMapped = map(open, max(preloadedCloses), min(preloadedCloses), -200, 200);
    highMapped = map(high, max(preloadedCloses), min(preloadedCloses), -200, 200);
    lowMapped = map(low, max(preloadedCloses), min(preloadedCloses), -200, 200);
    closeMapped = map(close, max(preloadedCloses), min(preloadedCloses), -200, 200);
    upSpikeMapped = map(upSpike, max(preloadedCloses), min(preloadedCloses), -200, 200);
    downSpikeMapped = map(downSpike, max(preloadedCloses), min(preloadedCloses), -200, 200);
  
    //DRAWING SPIKE
    strokeWeight(5);
    line(0, downSpikeMapped, 0, upSpikeMapped);
    
    //DRAWING CANDLE
    if (closeMapped < 0) {
        fill(0,155,0);
    } else {
        fill(0,0,253)
    }
    quad(-35, 0, 35, 0, 35, closeMapped, -35, closeMapped);

}
