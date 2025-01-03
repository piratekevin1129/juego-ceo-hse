function detectFullScreen(){
    if(document.fullscreenElement){
        console.log("cambio de página, continua en full screen")
    }else{
        console.log("se salió del full screen")
        getE('fullscreen-window').className = 'fullscreen-on'
    }
}

function establecerFullScreen(){
    if(document.fullscreenElement){
        document.exitFullscreen()
        return;
    }else{
        document.body.requestFullscreen();
    }
}