var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function unorderArray(lengt){
    var array = []
    while(array.length<lengt){
        var r = getRand(0,(lengt-1))
        if(!array.includes(r)){
            array.push(r)
        }
    }
    return array
}

function getE(idname){
    return document.getElementById(idname)
}

function initGame(){
    getE('pregunta-5-enunciado').innerHTML = actual_pregunta_data.pregunta
    getE('pregunta-5-subtitulo').innerHTML = actual_pregunta_data.subtitulo
    getE('texto-sopa').innerHTML = actual_pregunta_data.texto
    getE('enuncioado-titulo').innerHTML = actual_pregunta_data.titulo
    setJuegoSopaDeLetras(actual_pregunta_data.palabritas, actual_pregunta_data.palabras)
    getE('pregunta-cont-5').className = 'pregunta-cont-5-in'
}

/*****************SOPA DE LETRAS*************/
var palabrascont = document.getElementById("palabras");
var arraypalabras = [];
var palabras = [];

var ismobile = false
ismobile = isMobileDevice()

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function setJuegoSopaDeLetras(palabritas, data) {
    arraypalabras = palabritas;

    for (var z = 0; z < 10; z++) {
        //console.log("palabrita: "+arraypalabras[z]);
        var div_palabra = document.createElement('div')
        div_palabra.innerHTML = "<div>" + palabritas[z] + "</div>"
        div_palabra.className = "laspalabritas"
        div_palabra.id = ("p" + z)
        palabrascont.appendChild(div_palabra)
    }

    palabras = data

    setGame();
}

var espacios = []
var sopa_width = 0
var sopa_height = 0
var line_width = 30

var ctx = getE('lienzo').getContext('2d')
var ctx2 = getE('rayas').getContext('2d')
var pressing = false
var presseds = []

function setGame() {
    //prepare espacios
    audio_inicio.currentTime = 0
    audio_inicio.play();

    getE('lienzo').width = sopa_width
    getE('lienzo').height = sopa_height
    getE('rayas').width = sopa_width
    getE('rayas').height = sopa_height

    line_width = parseInt((sopa_width * 6) / 100)

    ctx2.fillStyle = '#ddebf4'
    ctx2.fillRect(0, 0, sopa_width, sopa_height)

    var espacios_coll = getE('texto-sopa').getElementsByTagName('span')
    for (i = 0; i < espacios_coll.length; i++) {
        espacios_coll[i].className = 'espacio'
        espacios_coll[i].innerHTML = palabras[i][0]
        espacios.push(espacios_coll[i])
    }

    setSopa()
}

var codes = []
var rastros = []
var matrix = []

var filas = 13
var columnas = 13

var intentos = 1

function setSopa() {
    //inicializae
    for (i = 0; i < filas; i++) {
        var arr = []
        for (j = 0; j < columnas; j++) {
            arr.push({ key: '.', code: '' })
        }
        matrix.push(arr)
    }

    i = 0

    var reset = false;
    while (i < palabras.length) {
        var palabrita = palabras[i][1]
        var word_splited = palabrita.split("")
        var direccion = 0


        var intentos_3 = []
        var esta_4 = false

        direccion = getRand(1, 4)
        // console.log("dirección ---> " + direccion)

        var acomoda = acomodarWord(word_splited, direccion)
        while (!acomoda) {
            intentos_3.push(direccion) //pushear para evitar

            if (intentos_3.length == 4) {
                // console.log("Ni mandraque ubica esta palabra " + word_splited.join(""))
                acomoda = true
                reset = true
                    // console.log('reiniciar')
                intentos++
            } else {
                // console.log("no dió con " + direccion)

                direccion = getRand(1, 4)
                esta_4 = intentos_3.includes(direccion)
                while (esta_4) {
                    direccion = getRand(1, 4)
                    esta_4 = intentos_3.includes(direccion)
                }

                // console.log("intentemos con " + direccion)
                // console.log("dirección ---> " + direccion)
                acomoda = acomodarWord(word_splited, direccion)
            }
        }

        i++
    }

    //printMatrix()
    //console.log(rastros)
    //printSopaRayas()
    if (reset) {
        resetSopa()
    } else {
        printSopaLetras()
            // console.log(intentos)
    }
}

function resetSopa() {
    codes = []
    rastros = []
    matrix = []
    setSopa()
}

function acomodarWord(word_splited, direccion) {
    var inicio_x = 0
    var inicio_y = 0
    var count_x = 0
    var count_y = 0
    var intentos = []
    var intentos_2 = []
    var esta = false
    var esta_2 = false
    var code = null
    var rastro = null

    var repetir = false
    var approved = false
    var restart = false
    var aborted = false
    var disponibles = []

    if (direccion == 1) {
        //horizontal
        //hacia la adelante
        //set disponibles
        for (j = 0; j < columnas; j++) {
            if (
                (j + word_splited.length) <= columnas
            ) {
                disponibles.push(j)
            }
        }

        if (disponibles.length > 0) {
            while (!approved) {
                while (!restart) {
                    if (intentos_2.length == disponibles.length) {
                        approved = true
                        aborted = true
                            //console.log("se agotaron las opciones para "+word_splited.join(""))
                            //console.log(disponibles)
                            //console.log(intentos_2)
                    } else {
                        if (disponibles.length == 1) {
                            inicio_x = disponibles[0]
                        } else {
                            inicio_x = disponibles[getRand(0, (disponibles.length - 1))]
                        }

                        esta_2 = intentos_2.includes(inicio_x)
                        while (esta_2) {
                            //imposibol que sea 1 otra vez
                            inicio_x = disponibles[getRand(0, (disponibles.length - 1))]
                            esta_2 = intentos_2.includes(inicio_x)
                        }

                        intentos_2.push(inicio_x)
                    }

                    intentos = []
                    restart = true
                }

                if (!aborted) {
                    repetir = false
                    inicio_y = getRand(0, (filas - 1))

                    count_x = inicio_x
                    for (j = 0; j < word_splited.length; j++) {
                        if (matrix[inicio_y][count_x].key == '.') {

                        } else {
                            //mirar si la letra esta igual
                            if (matrix[inicio_y][count_x].key == word_splited[j]) {
                                //coincidencias de la vida
                            } else {
                                repetir = true
                            }
                        }
                        count_x++
                    }

                    if (repetir) {
                        //buscar otro eje y
                        if (intentos.length == filas) {
                            //console.log("No se pudo poner esta "+word_splited.join("")+' ('+direccion+'-'+sentido+')')

                            restart = false
                        } else {
                            esta = intentos.includes(inicio_y)
                            while (esta) {
                                inicio_y = getRand(0, (filas - 1))
                                esta = intentos.includes(inicio_y)
                            }
                            intentos.push(inicio_y)
                        }
                    } else {
                        //pushear
                        approved = true
                    }
                }
            }
        } else {
            aborted = true
        }

        //pushear
        if (aborted) {
            //console.log("Nada que hacer con la palabra "+word_splited.join("")+" ("+direccion+')')
        } else {
            count_x = inicio_x
            code = { ini: '', end: '' }
            rastro = []

            for (j = 0; j < word_splited.length; j++) {
                if (j == 0) {
                    code.ini = 'c_' + inicio_y + '_' + count_x
                } else if (j == (word_splited.length - 1)) {
                    code.end = 'c_' + inicio_y + '_' + count_x
                }
                rastro.push('c_' + inicio_y + '_' + count_x)
                matrix[inicio_y][count_x].key = word_splited[j]
                count_x++
            }
            codes.push(code)
            rastros.push(rastro)
        }
    } else if (direccion == 2) {
        //hacia la adelante
        //set disponibles
        for (j = 0; j < columnas; j++) {
            if (
                (j - (word_splited.length - 1)) >= 0
            ) {
                disponibles.push(j)
            }
        }

        if (disponibles.length > 0) {
            while (!approved) {
                while (!restart) {
                    if (intentos_2.length == disponibles.length) {
                        approved = true
                        aborted = true
                            //console.log("se agotaron las opciones para "+word_splited.join(""))
                            //console.log(disponibles)
                            //console.log(intentos_2)
                    } else {
                        if (disponibles.length == 1) {
                            inicio_x = disponibles[0]
                        } else {
                            inicio_x = disponibles[getRand(0, (disponibles.length - 1))]
                        }

                        esta_2 = intentos_2.includes(inicio_x)
                        while (esta_2) {
                            //imposibol que sea 1 otra vez
                            inicio_x = disponibles[getRand(0, (disponibles.length - 1))]
                            esta_2 = intentos_2.includes(inicio_x)
                        }

                        intentos_2.push(inicio_x)
                    }

                    intentos = []
                    restart = true
                }

                if (!aborted) {
                    repetir = false
                    inicio_y = getRand(0, (filas - 1))

                    count_x = inicio_x
                    for (j = 0; j < word_splited.length; j++) {
                        if (matrix[inicio_y][count_x].key == '.') {

                        } else {
                            //mirar si la letra esta igual
                            if (matrix[inicio_y][count_x].key == word_splited[j]) {
                                //coincidencias de la vida
                            } else {
                                repetir = true
                            }
                        }
                        count_x--
                    }

                    if (repetir) {
                        //buscar otro eje y
                        if (intentos.length == filas) {
                            //console.log("No se pudo poner esta "+word_splited.join("")+' ('+direccion+'-'+sentido+')')

                            restart = false
                        } else {
                            esta = intentos.includes(inicio_y)
                            while (esta) {
                                inicio_y = getRand(0, (filas - 1))
                                esta = intentos.includes(inicio_y)
                            }
                            intentos.push(inicio_y)
                        }
                    } else {
                        //pushear
                        approved = true
                    }
                }
            }
        } else {
            aborted = true
        }

        //pushear
        if (aborted) {
            //console.log("Nada que hacer con la palabra "+word_splited.join("")+" ("+direccion+')')
        } else {
            count_x = inicio_x
            code = { ini: '', end: '' }
            rastro = []
            for (j = 0; j < word_splited.length; j++) {
                if (j == 0) {
                    code.ini = 'c_' + inicio_y + '_' + count_x
                } else if (j == (word_splited.length - 1)) {
                    code.end = 'c_' + inicio_y + '_' + count_x
                }
                rastro.push('c_' + inicio_y + '_' + count_x)
                matrix[inicio_y][count_x].key = word_splited[j]
                count_x--
            }
            codes.push(code)
            rastros.push(rastro)
        }
    } else if (direccion == 3) {
        //vertical
        //hacia la abajo
        //set disponibles
        for (j = 0; j < filas; j++) {
            if (
                (j + word_splited.length) <= filas
            ) {
                disponibles.push(j)
            }
        }

        if (disponibles.length > 0) {
            while (!approved) {
                while (!restart) {
                    if (intentos_2.length == disponibles.length) {
                        approved = true
                        aborted = true
                            //console.log("se agotaron las opciones para "+word_splited.join(""))
                            //console.log(disponibles)
                            //console.log(intentos_2)
                    } else {
                        if (disponibles.length == 1) {
                            inicio_y = disponibles[0]
                        } else {
                            inicio_y = disponibles[getRand(0, (disponibles.length - 1))]
                        }

                        esta_2 = intentos_2.includes(inicio_y)
                        while (esta_2) {
                            //imposibol que sea 1 otra vez
                            inicio_y = disponibles[getRand(0, (disponibles.length - 1))]
                            esta_2 = intentos_2.includes(inicio_y)
                        }

                        intentos_2.push(inicio_y)
                    }

                    intentos = []
                    restart = true
                }

                if (!aborted) {
                    repetir = false
                    inicio_x = getRand(0, (columnas - 1))

                    count_y = inicio_y
                    for (j = 0; j < word_splited.length; j++) {
                        if (matrix[count_y][inicio_x].key == '.') {

                        } else {
                            //mirar si la letra esta igual
                            if (matrix[count_y][inicio_x].key == word_splited[j]) {
                                //coincidencias de la vida
                            } else {
                                repetir = true
                            }
                        }
                        count_y++
                    }

                    if (repetir) {
                        //buscar otro eje y
                        if (intentos.length == columnas) {
                            //console.log("No se pudo poner esta "+word_splited.join("")+' ('+direccion+'-'+sentido+')')

                            restart = false
                        } else {
                            esta = intentos.includes(inicio_x)
                            while (esta) {
                                inicio_x = getRand(0, (columnas - 1))
                                esta = intentos.includes(inicio_x)
                            }
                            intentos.push(inicio_x)
                        }
                    } else {
                        //pushear
                        approved = true
                    }
                }
            }
        } else {
            aborted = true
        }

        //pushear
        if (aborted) {
            //console.log("Nada que hacer con la palabra "+word_splited.join("")+" ("+direccion+')')
        } else {
            count_y = inicio_y
            code = { ini: '', end: '' }
            rastro = []
            for (j = 0; j < word_splited.length; j++) {
                if (j == 0) {
                    code.ini = 'c_' + count_y + '_' + inicio_x
                } else if (j == (word_splited.length - 1)) {
                    code.end = 'c_' + count_y + '_' + inicio_x
                }
                rastro.push('c_' + count_y + '_' + inicio_x)
                matrix[count_y][inicio_x].key = word_splited[j]
                count_y++
            }
            codes.push(code)
            rastros.push(rastro)
        }
    } else if (direccion == 4) {
        //hacia arriba
        //set disponibles
        for (j = 0; j < filas; j++) {
            if (
                (j - (word_splited.length - 1)) >= 0
            ) {
                disponibles.push(j)
            }
        }

        if (disponibles.length > 0) {
            while (!approved) {
                while (!restart) {
                    if (intentos_2.length == disponibles.length) {
                        approved = true
                        aborted = true
                            //console.log("se agotaron las opciones para "+word_splited.join(""))
                            //console.log(disponibles)
                            //console.log(intentos_2)
                    } else {
                        if (disponibles.length == 1) {
                            inicio_y = disponibles[0]
                        } else {
                            inicio_y = disponibles[getRand(0, (disponibles.length - 1))]
                        }

                        esta_2 = intentos_2.includes(inicio_y)
                        while (esta_2) {
                            //imposibol que sea 1 otra vez
                            inicio_y = disponibles[getRand(0, (disponibles.length - 1))]
                            esta_2 = intentos_2.includes(inicio_y)
                        }

                        intentos_2.push(inicio_y)
                    }

                    intentos = []
                    restart = true
                }

                if (!aborted) {
                    repetir = false
                    inicio_x = getRand(0, (columnas - 1))

                    count_y = inicio_y
                    for (j = 0; j < word_splited.length; j++) {
                        if (matrix[count_y][inicio_x].key == '.') {

                        } else {
                            //mirar si la letra esta igual
                            if (matrix[count_y][inicio_x].key == word_splited[j]) {
                                //coincidencias de la vida
                            } else {
                                repetir = true
                            }
                        }
                        count_y--
                    }

                    if (repetir) {
                        //buscar otro eje y
                        if (intentos.length == columnas) {
                            //console.log("No se pudo poner esta "+word_splited.join("")+' ('+direccion+'-'+sentido+')')

                            restart = false
                        } else {
                            esta = intentos.includes(inicio_x)
                            while (esta) {
                                inicio_x = getRand(0, (columnas - 1))
                                esta = intentos.includes(inicio_x)
                            }
                            intentos.push(inicio_x)
                        }
                    } else {
                        //pushear
                        approved = true
                    }
                }
            }
        } else {
            aborted = true
        }

        //pushear
        if (aborted) {
            //console.log("Nada que hacer con la palabra "+word_splited.join("")+" ("+direccion+')')
        } else {
            count_y = inicio_y
            code = { ini: '', end: '' }
            rastro = []
            for (j = 0; j < word_splited.length; j++) {
                if (j == 0) {
                    code.ini = 'c_' + count_y + '_' + inicio_x
                } else if (j == (word_splited.length - 1)) {
                    code.end = 'c_' + count_y + '_' + inicio_x
                }
                rastro.push('c_' + count_y + '_' + inicio_x)
                matrix[count_y][inicio_x].key = word_splited[j]
                count_y--
            }
            codes.push(code)
            rastros.push(rastro)
        }
    }

    if (aborted) {
        return false
    } else {
        return true
    }
}

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function printSopaLetras() {
    //letras
    for (i = 0; i < matrix.length; i++) {
        var row = document.createElement('div')
        row.classList = 'sopa-row';
        row.style.height = '20px'
        row.style.height = 'calc(100% / ' + filas + ')'
        row.style.height = '-moz-calc(100% / ' + filas + ')'

        for (j = 0; j < matrix[i].length; j++) {
            var sopa_l = document.createElement('div')
            sopa_l.id = 'c_' + i + '_' + j
            sopa_l.className = 'sopa-col'
            sopa_l.style.width = '20px'
            sopa_l.style.width = 'calc(100% / ' + columnas + ')'
            sopa_l.style.width = '-moz-calc(100% / ' + columnas + ')'
            if (ismobile) {
                sopa_l.setAttribute('onclick', 'clickLetra(event,this)')
                    //sopa_l.setAttribute('onmouseup','upSopa(event,this)')
            } else {
                sopa_l.setAttribute('onmousedown', 'downLetra(event,this)')
                sopa_l.setAttribute('onmouseup', 'upLetra(event,this)')
            }
            sopa_l.setAttribute('ok', 'no')

            var txt = ''
            if (matrix[i][j].key == '.') {
                txt = letters[getRand(0, (letters.length - 1))]
                    //txt = 'x'
            } else {
                txt = matrix[i][j].key
            }
            if (!ismobile) {
                sopa_l.innerHTML = txt + '<span onmouseover="overLetra(this)" onmouseout="outLetra(this)"></span>'
            } else {
                sopa_l.innerHTML = txt + '<span></span>'
            }
            row.appendChild(sopa_l)
        }

        document.getElementById('sopa').appendChild(row)
    }
}

function overLetra(espan) {
    //over_mp3.currentTime = 0
    //over_mp3.play()
    if (pressing) {
        espan.parentNode.classList.add('sopa-selected')
        presseds.push(espan.parentNode.id)
    }

}

function outLetra(span) {
    //letra.classList.remove('sopa-selected')
}

function downLetra(e, letra) {
    var posx = e.pageX
    var posy = e.pageY
    var rect_sopa = getE('sopa').getBoundingClientRect()
    ini_x = posx - rect_sopa.left
    ini_y = posy - rect_sopa.top

    ctx.beginPath()
    ctx.strokeStyle = '#e0ea8a'

    ctx.moveTo(ini_x, ini_y)
    ctx.lineTo(ini_x, ini_y)
    ctx.lineWidth = line_width
    ctx.lineCap = 'round'
    ctx.stroke()

    pressing = true
    letra.classList.add('sopa-selected')
    ini_letra = letra
    presseds.push(letra.id)

    over_mp3.currentTime = 0
    over_mp3.play()

    window.addEventListener('mousemove', moveLetra, true)
    //window.addEventListener('mousemove',moveLetra,true)    
}

function moveLetra(e) {
    var posx = e.pageX
    var posy = e.pageY
    var rect_sopa = getE('sopa').getBoundingClientRect()
    fin_x = posx - rect_sopa.left
    fin_y = posy - rect_sopa.top

    ctx.clearRect(0, 0, sopa_width, sopa_height)
    ctx.beginPath()
    ctx.strokeStyle = '#e0ea8a'

    ctx.moveTo(ini_x, ini_y)
    ctx.lineTo(fin_x, fin_y)
    ctx.lineWidth = line_width
    ctx.lineCap = 'round'
    ctx.stroke()
}

function upLetra(e, letra) {
    fin_letra = letra

    verificarPalabra()

    //reiniciar todo
    pressing = false
    for (i = 0; i < presseds.length; i++) {
        var l = getE(presseds[i])
        if (l.getAttribute('ok') == 'no') {
            l.classList.remove('sopa-selected')
        }
    }
    ini_letra = null
    fin_letra = null
    presseds = []
    ctx.clearRect(0, 0, sopa_width, sopa_height)
    window.removeEventListener('mousemove', moveLetra, true)
}

function verificarPalabra() {
    var ini_letra_code = ini_letra.getAttribute('id')
    var fin_letra_code = fin_letra.getAttribute('id')
    var palabra_encontrada = -1

    for (i = 0; i < codes.length; i++) {
        if (
            (codes[i].ini == ini_letra_code && codes[i].end == fin_letra_code) ||
            (codes[i].end == ini_letra_code && codes[i].ini == fin_letra_code)
        ) {
            palabra_encontrada = i
        }
    }

    if (palabra_encontrada != -1) {
        espacios[palabra_encontrada].innerHTML = palabras[palabra_encontrada][0]
        espacios[palabra_encontrada].classList.add('espacio-filled')

        for (i = 0; i < rastros[palabra_encontrada].length; i++) {
            getE(rastros[palabra_encontrada][i]).className = 'sopa-col sopa-selected'
            getE(rastros[palabra_encontrada][i]).setAttribute('ok', 'si')
                // console.log("pone si")
        }
        palabras[palabra_encontrada][2] = true

        //poner raya
        ctx2.beginPath()
        ctx2.strokeStyle = '#e0ea8a'

        ctx2.moveTo(ini_x, ini_y)
        ctx2.lineTo(fin_x, fin_y)
        ctx2.lineWidth = line_width
        ctx2.lineCap = 'round'
        ctx2.stroke()
        ctx2.closePath()

        correct_mp3.currentTime = 0
        correct_mp3.play()

        //verificar
        var encontradas = 0
        for (i = 0; i < palabras.length; i++) {
            if (palabras[i][2]) {
                //console.log("----------------------------++")
                //console.log(palabras[i][0])
                var mostrarlap = ("p" + i)
                    //console.log(mostrarlap)
                document.getElementById(mostrarlap).style.visibility = "collapse";
                encontradas++
            }
        }

        if (encontradas == palabras.length) {
            ganarJuegoSopaDeLetras()
        }
    } else {
        // console.log("nada")
        wrong_mp3.currentTime = 0
        wrong_mp3.play()
    }
}

function perderJuegoSopaDeLetras() {
    
}

/*function juegoAutomaticoSopaDeLetras() {
    rastros.forEach((rastro) => {
        rastro.forEach((id) => {
            getE(id).className = 'sopa-col sopa-selected'
            getE(id).setAttribute('ok', 'si')
        });
    });

    let palabraABuscar = document.getElementsByClassName('laspalabritas');

    for (var i = 0; i < palabraABuscar.length; i++) {
        palabraABuscar[i].style.display = 'none';
    }

    let espacios = document.getElementsByClassName('espacio');

    for (var i = 0; i < espacios.length; i++) {
        espacios[i].classList.add('espacio-filled');
    }

    getE('reloj').className = 'reloj-off'
    getE('pregunta-5-btn').classList.remove('pregunta-continuar-btn-off')
    getE('pregunta-5-btn').classList.add('pregunta-continuar-btn-on')

    click_continuar_mp3.play()
}*/

function ganarJuegoSopaDeLetras() {
    getE('pregunta-5-btn').className = 'pregunta-continuar-btn pregunta-continuar-btn-on'
}

function clickContinuar(){
    parent.finalizarInteractiva()
}