function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function goFullscreen() {
    if(!this.scale.isFullscreen){
        this.scale.startFullscreen();
    }
    else{
        this.scale.stopFullscreen();
    }
}

// interger, decimals, nearest 10 or 100...
function round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}