// let informacion;
let infoVista = [];
let botonContinuar;
let reproductorAudio;
const regex = /(\d+)/g; //Espreción regular para sacar los números de un string
let flecha;
let posActual = 0;
let info = 0;
let flechas;
let audios_mp3 = new Audio();

$(document).ready(() => {
    // parent.unsetLoader()
    $("#inicio")[0].play()
    init();
});

function init() {
    informacion = $('.info');
    botonContinuar = $('#continuar-btn');
    // reproductorAudio = $('#audios');
    flecha = $('.interactiva__flecha img');

    manejadorBotones();
    manejadorCarrusel();
}

function manejadorBotones() {
    $('.boton-mostrar-info').click(function() {
        cerrarInfo();
        abrirInfo($(this));
        // pausarAudio();
        // ponerAudio($(this));
        checkInfoVista($(this));
        checkBotonContinuar();
        posActual = 1

    });
    $('.info__cerrar').click(function() {
        cerrarInfo();
        // pausarAudio();
    });
    $('.info__indicador').click(function() {
        let slider = $(this).data('slider');
        let contenido = $(this).data('contenido');
        // pausarAudio();
        // ponerAudioSlide(slider, contenido);
        posActual = parseInt(contenido);
    });
    $(reproductorAudio).on('ended', function() {
        if (info > 0) {
            posActual++;
            let botonSlider = document.querySelector(`#info${info} .info__indicador:nth-child(${posActual})`);
            if (botonSlider != null) {
                botonSlider.click();
            }
        }

    });
}

// Manejar Info



function abrirInfo(boton) {
    boton.addClass('boton-mostrar-info--activo');
    $('.info').addClass('info--activo');
    info = parseInt(boton.data('info'));
    $(`#info${info}`).addClass('info__contenido--activo');

    $("#inicio")[0].pause()
    audios_mp3.src = 'assets/audio/' + info + '.mp3';
    audios_mp3.load();
    audios_mp3.play()
        // duplicarBoton(boton);
}

function cerrarInfo() {
    $('.boton-mostrar-info--activo').removeClass('boton-mostrar-info--activo');
    $('.info--activo').removeClass('info--activo');
    $('.info__contenido--activo').removeClass('info__contenido--activo');
    audios_mp3.pause()
}

function checkInfoVista(boton) {
    let info = boton.data('info');
    if (!infoVista.includes(info) && info != 0) {
        infoVista.push(info);
    }
}



// Manejar Audio

function pausarAudio() {
    reproductorAudio[0].pause();
    reproductorAudio[0].currentTime = 0
}

function ponerAudio(boton) {
    const indxAudio = boton.data('info');;
    if (indxAudio == 0) {
        return
    }
    let sourceAudio = $(reproductorAudio[0]).find(">:first-child");
    sourceAudio.attr('src', `./assets/audio/audio${indxAudio}-1.mp3`);
    reproductorAudio[0].load();
    reproductorAudio[0].oncanplaythrough = reproductorAudio[0].play();
}

function ponerAudioSlide(slider, audio) {
    let sourceAudio = $(reproductorAudio[0]).find(">:first-child");
    sourceAudio.attr('src', `./assets/audio/audio${slider}-${audio}.mp3`);
    reproductorAudio[0].load();
    reproductorAudio[0].oncanplaythrough = reproductorAudio[0].play();
}





// Botón continuar
function checkBotonContinuar() {
    if (infoVista.length === 4) {
        botonContinuar.removeClass('continuar-btn-off');
        botonContinuar.removeClass('continuar-btn-on');
    }
}

function clickContinuar() {
    parent.finalizarInteractiva();
}


// Carrusel

function manejadorCarrusel() {
    $('.interactiva__flecha').click(function() {
        moverCarrusel(parseInt($(this).data('lado')))
    })

}

function moverCarrusel(direccion) {
    let botones = $('.interactiva__boton');
    for (let boton of botones) {

        let posision = parseInt($(boton).data('position'))

        let nuevaPos = posision + direccion;
        if (nuevaPos == 5) {
            nuevaPos = 1;

        } else if (nuevaPos == 0) {
            nuevaPos = 4;
        }
        if (nuevaPos == 1) {
            $(boton).removeClass('interactiva__boton--derecha');
            $(boton).addClass('interactiva__boton--izquierda');
        } else if (nuevaPos == 2) {
            $(boton).removeClass('interactiva__boton--izquierda');
            $(boton).addClass('interactiva__boton--derecha');

        }
        $(boton).attr('data-position', nuevaPos)
        $(boton).data('position', nuevaPos)
    }

    // botones.each(function(idx, boton) {
    //     $(boton).data('position', '1')
    //     console.log($(boton), $(boton).data())
    // })

}