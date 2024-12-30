let informacion;
let infoVista = [];
let botonContinuar;
let audios_mp3 = new Audio();


$(document).ready(() => {
    // parent.unsetLoader()
    $("#inicio")[0].play()
    init();
});

function init() {
    informacion = $('.interactiva');
    botonContinuar = $('#continuar-btn');
    reproductorAudio = $('#audios');
    botonModal = $('.modal');

    manejadorBotones();

}

function manejadorBotones() {
    $('.boton-mostrar-info').click(function() {
        cerrarInfo();
        abrirInfo($(this));
        // pausarAudio();
        // ponerAudio($(this));
        checkInfoVista($(this));
    });
    $('.info__cerrar').click(function() {
        cerrarInfo();
        // pausarAudio();
    });
}

// Manejar Info

function cerrarInfo() {
    if (window.innerWidth < 768) {
        $('.activa').removeClass('activa');
    } else {
        $('.activa:not(.info)').removeClass('activa');
    }

}

function abrirInfo(boton) {
    let info = boton.data('info');
    $(`#info${info}`).addClass('activa')
    boton.addClass('activa')

}

function checkInfoVista(boton) {
    let info = boton.data('info');
    if (!infoVista.includes(info) && info != 0) {
        infoVista.push(info);
    }
    $("#inicio")[0].pause()
    audios_mp3.src = 'assets/audio/' + info + '.mp3';
    audios_mp3.load();
    audios_mp3.play()

    audios_mp3.addEventListener("ended", (event) => {
        if(infoVista.length>=5){
            checkBotonContinuar();
        }
    });  

}

// Manejar Audio

// function pausarAudio() {
//     reproductorAudio[0].pause();
//     reproductorAudio[0].currentTime = 0
// }

// function ponerAudio(boton) {
//     const indxAudio = boton.data('info');;
//     if (indxAudio == 0) {
//         return
//     }
//     let sourceAudio = $(reproductorAudio[0]).find(">:first-child");
//     sourceAudio.attr('src', `./assets/audio/audio${indxAudio}.mp3`);
//     reproductorAudio[0].load();
//     reproductorAudio[0].oncanplaythrough = reproductorAudio[0].play();
// }

// Botón continuar
function checkBotonContinuar() {
    if (infoVista.length === 5) {
        botonModal.removeClass('off');
        botonModal.addClass('on');
        botonContinuar.removeClass('continuar-btn-off');
        botonContinuar.addClass('continuar-btn-on');
        $("#final")[0].play()
    }
}

function clickContinuar() {
    parent.finalizarInteractiva()
}