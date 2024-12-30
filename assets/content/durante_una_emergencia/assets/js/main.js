// let informacion;
let infoVista = [];
let botonContinuar;
let reproductorAudio;
let flecha;
let contadorCorrectas = 0;

let respuestas = [{
        texto: "Cada persona se hará cargo de sus visitantes, guiándolos en la evacuación hasta llevarla al punto de encuentro y nuevamente en el reingreso del edificio.",
        correcta: true
    },
    {
        texto: "Aléjese de las ventanas y de objetos que se encuentren a una altura mayor que representen un riesgo de caída.",
        correcta: true
    },
    {
        texto: "Mantenga la calma, no adopte actitudes que puedan generar pánico. Refugiese en el triángulo de vida.",
        correcta: true
    },
    {
        texto: "Espere la orden del brigadista para evacuar el edificio. Al salir de las instalaciones no es necesario marcar el pin.",
        correcta: true
    },
    {
        texto: "Dale tu nombre e infórmale desde dónde estás llamando (la dirección exacta, si la sabes).",
        correcta: false
    },
    {
        texto: "Identifique las rutas de evacuación, salidas de emergencia de su área y los puntos de encuentro de la sede donde se encuentra.",
        correcta: true
    },
    {
        texto: "No utilice el celular mientras realiza la evacuación.",
        correcta: true
    },
    {
        texto: "Diríjase al punto de encuentro en grupo, no se aísle y únase al grupo más cercano e informe al brigadista.",
        correcta: true
    },
    {
        texto: "Almacenemos alimentos enlatados (atún, frijoles, sardinas, leche) que no necesiten refrigeración y agua purificada o hervida en envases con tapa.",
        correcta: false
    },
    {
        texto: "No corra, camine rápido y en fila. No se devuelva por objetos u otro motivo. No cargue objetos pesados.",
        correcta: true
    }
];

let correctas = []


$(document).ready(() => {
    // parent.unsetLoader()
    $('#inicio')[0].play();
    reproductorAudio = $('#audios');
    init();
});

function init() {
    botonContinuar = $('#continuar-btn');
    manejadorRespuestas();
    manejadorBotones();
}

function manejadorRespuestas() {
    desordenarRespuestas();
    agregarRespuestas();
}

function desordenarRespuestas() {
    respuestas.sort(() => Math.random() - 0.5);
}

function agregarRespuestas() {
    let respuestasHtml = '';
    respuestas.forEach((respuesta, idx) => {
        let respuestaHtml = `
        <a class="boton" data-respuesta="${idx}">
            <div class="boton__letra">
                <span>${String.fromCodePoint(idx + 65)}</span>
            </div>
            <div class="boton__texto">
                <p>${respuesta.texto}</p>
            </div>
        </a>
        `
        respuestasHtml = respuestasHtml + respuestaHtml;
        if (respuesta.correcta) {
            correctas.push(idx);
        }
    });
    $('.interactiva').html(respuestasHtml);

}

function manejadorBotones() {
    $('.boton').click(function() {
        let esCorrecto = checkRespuesta($(this));
        pausarAudio();
        ponerAudio(esCorrecto);
        checkBoton(esCorrecto, $(this));
        checkInfoVista(esCorrecto);
        checkBotonContinuar();


    });

}

// Manejar Info

function checkRespuesta(boton) {
    let respuesta = parseInt(boton.data('respuesta'));
    return correctas.indexOf(respuesta) > -1;
}

function checkBoton(esCorrecto, boton) {
    esCorrecto ? boton.addClass('boton--selected') : false;
}

function checkInfoVista(esCorrecto) {
    esCorrecto ? contadorCorrectas++ : null
}

// Botón continuar
function checkBotonContinuar() {
    if (contadorCorrectas === correctas.length) {
        $('#inicio')[0].pause();
        $('.interactiva').addClass('finalizado');
        botonContinuar.removeClass('continuar-btn-off');
        botonContinuar.removeClass('continuar-btn-on');
    }
}

function clickContinuar() {
    parent.finalizarInteractiva()
}

// Manejar Audio

function pausarAudio() {
    reproductorAudio[0].pause();
    reproductorAudio[0].currentTime = 0
}

function ponerAudio(esCorrecto) {
    let nombreAudio;
    esCorrecto ? nombreAudio = 'bien' : nombreAudio = 'error';
    let sourceAudio = $(reproductorAudio[0]).find(">:first-child");
    sourceAudio.attr('src', `./assets/audio/${nombreAudio}.mp3`);
    reproductorAudio[0].load();
    reproductorAudio[0].oncanplaythrough = reproductorAudio[0].play();
}