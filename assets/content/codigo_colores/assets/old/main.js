$(document).ready(() => {
    init();
});

function init() {
    construirPersonajes()
    window.setTimeout(() => {
        configAudiosIniciales()
        parent.unsetLoader();
    }, 3000)
}

function configAudiosIniciales() {
    $("#audio_inicial")[0].play();
    $("#audio_inicial").on("ended", (e) => {
        ocultarModal()
        playAudio("audio_instruccion", 1)
    });
    $("#audio_underground")[0].play();
    $("#audio_underground")[0].volume = 0.25;
    $("#audio_underground").on("ended", (e) => {
        $("#audio_underground")[0].play();
    });
}

// ---------- BASE ----------
let toggle_audio = true;
let volume_audio = 0.25;
function toggleAudio() {
    if (toggle_audio) {
        toggle_audio = false;
        $("#sonido-btn").addClass("sonido-off");
        $("#sonido-btn").removeClass("sonido-on");
        volume_audio = 0;
    } else {
        toggle_audio = true;
        $("#sonido-btn").addClass("sonido-on");
        $("#sonido-btn").removeClass("sonido-off");
        volume_audio = 0.25;
    }
    $("#audio_underground")[0].volume = volume_audio;
}

function tieneClase(elementId, className) {
    return $('#' + elementId).hasClass(className);
}

function loadAndPlayAudio(audioSrc, onEndCallback) {
    // Obtener el elemento de audio
    const audioElement = document.getElementById("audio");

    // Quitar todos los eventos asociados al elemento de audio
    let clone = audioElement.cloneNode(true);
    audioElement.parentNode.replaceChild(clone, audioElement);

    // Establecer la nueva fuente de audio
    clone.src = audioSrc;

    // Asignar el nuevo evento al finalizar el audio
    clone.addEventListener('ended', onEndCallback);

    // Reproducir el audio
    clone.play().catch(error => {
        console.error('Error al reproducir el audio:', error);
    });
}

function playAudio(str, num) {
    $(`#${str}`)[0].currentTime = 0
    $(`#${str}`)[0].volume = num;
    $(`#${str}`)[0].play()
}

function pausarAudio(str) {
    $(`#${str}`)[0].pause()
    $(`#${str}`)[0].currentTime = 0
}

function pausarAudios() {
    for (let index = 0; index < $(".audios").length; index++) {
        const element = $(".audios")[index];
        element.pause()
        element.currentTime = 0
    }
}

var visto = []
function checkContinuar(num) {
    if (!visto.includes(num)) visto.push(num);
    if (visto.length >= data.length) {
        $("#continuar-btn").removeClass("off");
    }
}

function clickContinuar() {
    parent.unlockNextTema()
    parent.nextTema()
}

function mostrarHelp() {
    pausarAudios()
    playAudio("audio_click", 0.5)        
    $(".info").addClass("off")
    $(`.personaje.active`).removeClass("active")
    window.setTimeout(() => {
        $("#modal").removeClass("off")
        $(".modal-animado").addClass("fadeInDown")
        $(".modal-animado").removeClass("fadeOutUp")
    }, 100)
    playAudio("audio_inicial", 1)
}

function ocultarModal() {
    pausarAudios();
    $("#modal").addClass("off")
    $(".modal-animado").addClass("fadeOutUp")
    $(".modal-animado").removeClass("fadeInDown")
    window.setTimeout(() => {
        $("#modal").removeClass("contenido")
    }, 670)
}


// ------------------------------------------------------

function mostrarInfo(info, num) {
    if (num <= data[info - 1].txt.length) {
        pausarAudios()
        playAudio("audio_click", 0.5)

        $(".subTitulos div.activo").removeClass("activo")
        $(`.subTitulos div:nth-child(${num})`).addClass("activo")
        $(".txt").addClass("off")

        if (num == 0) {
            $(".titulo").addClass("off")
            $(".subTitulos").addClass("off")
            $(".info").addClass("off")
            $(`.personaje.active`).removeClass("active")
            $(`#personaje-${info}`).addClass("active")
            window.setTimeout(() => {
                $(`.subTitulos`).html("")
                for (let index = 0; index < data[info - 1].txt.length; index++) {
                    $(`.subTitulos`).append(`<div onclick="mostrarInfo(${info}, ${index + 1})" onmouseenter="playAudio('audio_over', 0.5)" class="row"></div>`)
                }
                $(".titulo p").html(data[info - 1].titulo)
                $(".titulo").removeClass("off")
                $(".subTitulos").removeClass("off")
                $(".info").removeClass("off")
                loadAndPlayAudio(`assets/audios/${info}-${num}.mp3`, () => {
                    mostrarInfo(info, num + 1)
                })
            }, 400)
        }
        else {
            window.setTimeout(() => {
                $(".txt p").html(data[info - 1].txt[num - 1])
                scrollTop(".txt")
                $(".txt").removeClass("off")
                loadAndPlayAudio(`assets/audios/${info}-${num}.mp3`, () => {
                    mostrarInfo(info, num + 1)
                })
            }, 400)
        }
    }
    else {
        checkContinuar(info)
        $(".info").addClass("off")
        $(`#personaje-${info}`).removeClass("active")
        $(`#personaje-${info}`).addClass("visto")
    }
}

function scrollTop(element) {
    $(element)[0].scrollTop = 0;
}

function construirPersonajes() {
    for (let index = 0; index < data.length; index++) {
        element = data[index]
        $(`.img`).append(`<img id="personaje-${index + 1}" class="personaje" onclick="mostrarInfo(${index + 1},0)" src="./assets/img/c${index + 1}.svg" alt="Personaje" style="height:${element.height}%; left:${element.left}%; bottom:${element.bottom}%;" onmouseenter="playAudio('audio_over', 0.5)">`)
    }
}