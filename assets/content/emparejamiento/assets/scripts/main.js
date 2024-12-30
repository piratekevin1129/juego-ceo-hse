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
    getE('pregunta-4-enunciado').innerHTML = actual_pregunta_data.pregunta
    setJuegoEmparejamiento(actual_pregunta_data.opciones.length)
    getE('pregunta-cont-4').className = 'pregunta-cont-4-in'
    
    animacion_pregunta = setTimeout(function() {
        clearTimeout(animacion_pregunta)
        animacion_pregunta = null
    
        getE('pregunta-cont-4').className = 'pregunta-cont-4-on'
        getE('pregunta-4-columnas').className = 'preguntas-4-opciones-front'
    }, 500)
}


/*****************APAREAMIENTO*************/

var actual_col_a = null
var actual_col_a_raya = null
var actual_col_a_letra = null
var actual_col_a_rect = null
var actual_col_a_ind = -1
var columnas_correctos = 0
var columnas_colors = ['00b7e8', '5ebe30', 'ff9c00', '004492', 'ad3094', '364d68', '00929b']
var columnas_letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
var columnas_total = 0

var columnas_completadas = []

function setJuegoEmparejamiento(leng) {
    columnas_total = leng

    columnas_correctos = 0
    columnas_completadas = []
    getE('pregunta-4-col1').innerHTML = ''
    getE('pregunta-4-col2').innerHTML = ''
    for (i = 0; i < columnas_total; i++) {
        columnas_completadas.push(false)
    }

    var desorden = unorderArray(columnas_total)
    var desorden2 = unorderArray(columnas_total)
    for (i = 0; i < desorden.length; i++) {
        var col_a = document.createElement('div')
        col_a.className = 'pregunta-col-a'
        col_a.id = 'pregunta-col-a-' + desorden[i]
        col_a.setAttribute('ind', desorden[i])
        col_a.innerHTML = '<div class="pregunta-col-raya" style="background-color:#' + columnas_colors[desorden[i]] + '"></div><section class="pregunta-col-a-section-' + (desorden[i] + 1) + '"></section><p>' + actual_pregunta_data.opciones[desorden[i]].opcion1 + '</p><div class="pregunta-col-letter" onmouseover="overOpcion()" onmouseout="outOpcion()" onmousedown="downCol(event,' + desorden[i] + ')" style="background-color:#' + columnas_colors[desorden[i]] + '">' + columnas_letras[i] + '</div>'

        getE('pregunta-4-col1').appendChild(col_a)
    }
    for (i = 0; i < desorden2.length; i++) {
        var col_b = document.createElement('div')
        col_b.className = 'pregunta-col-b'
        col_b.id = 'pregunta-col-b-' + desorden2[i]
        col_b.setAttribute('ind', desorden2[i])
        col_b.innerHTML = '<p>' + actual_pregunta_data.opciones[desorden2[i]].opcion2 + '</p><div class="pregunta-col-number">' + (i + 1) + '</div>'

        getE('pregunta-4-col2').appendChild(col_b)
    }
}

function downCol(event, id) {
    click_mp3.play()
    actual_col_a = getE('pregunta-col-a-' + id)
    actual_col_a_raya = actual_col_a.getElementsByClassName('pregunta-col-raya')[0]
    actual_col_a_raya.style.width = '0px'
    actual_col_a_raya.style.transform = 'rotate(0deg)'
    actual_col_a_raya.style.webkitTransform = 'rotate(0deg)'
    actual_col_a_raya.style.oTransform = 'rotate(0deg)'

    actual_col_a_ind = actual_col_a.getAttribute('ind')
    actual_col_a_letra = actual_col_a.getElementsByClassName('pregunta-col-letter')[0]

    actual_col_a_rect = {
        x: (actual_col_a_letra.getBoundingClientRect().left + (actual_col_a_letra.offsetWidth / 2)),
        y: (actual_col_a_letra.getBoundingClientRect().top + (actual_col_a_letra.offsetHeight / 2))
    }

    document.body.addEventListener('mousemove', moveCol, true)
    document.body.addEventListener('mouseup', upCol, true)
}

function moveCol(event) {
    var rect1 = {
        x: event.pageX,
        y: event.pageY
    }
    setRayaGeo(rect1, actual_col_a_rect)
}

function upCol(event) {
    var posx = event.pageX
    var posy = event.pageY

    document.body.removeEventListener('mousemove', moveCol, true)
    document.body.removeEventListener('mouseup', upCol, true)

    var colsb = getE('pregunta-4-col2').getElementsByClassName('pregunta-col-b')
    var actual_col_b = null
    for (i = 0; i < colsb.length; i++) {
        var r = {
            x: colsb[i].getBoundingClientRect().left,
            y: colsb[i].getBoundingClientRect().top,
            w: colsb[i].offsetWidth,
            h: colsb[i].offsetHeight
        }
        if (
            posx >= (r.x - 30) && posx <= (r.x + r.w) &&
            posy >= r.y && posy <= (r.y + r.h)
        ) {
            actual_col_b = colsb[i]
        }
    }

    if (actual_col_b != null) {
        var ind_b = actual_col_b.getAttribute('ind')
        var number_b = actual_col_b.getElementsByClassName('pregunta-col-number')[0]
        if (ind_b == actual_col_a_ind) {
            columnas_completadas[ind_b] = true
            correct_mp3.play()
            columnas_correctos++
            actual_col_a_letra.removeAttribute('onmousedown')
            number_b.style.backgroundColor = actual_col_a_letra.style.backgroundColor
            number_b.style.color = '#FFFFFF'

            var rect3 = {
                x: (number_b.getBoundingClientRect().left + (number_b.offsetWidth / 2)),
                y: (number_b.getBoundingClientRect().top + (number_b.offsetHeight / 2))
            }
            setRayaGeo(rect3, actual_col_a_rect)

            //console.log(columnas_correctos,columnas_total)
            if (columnas_correctos == columnas_total) {
                ganarJuegoEmparejamiento()
            }
        } else {
            wrong_mp3.play()
            actual_col_a_raya.style.width = '0px'
            actual_col_a_raya.style.transform = 'rotate(0deg)'
            actual_col_a_raya.style.webkitTransform = 'rotate(0deg)'
            actual_col_a_raya.style.oTransform = 'rotate(0deg)'
        }
    } else {
        actual_col_a_raya.style.width = '0px'
        actual_col_a_raya.style.transform = 'rotate(0deg)'
        actual_col_a_raya.style.webkitTransform = 'rotate(0deg)'
        actual_col_a_raya.style.oTransform = 'rotate(0deg)'
    }

    actual_col_a = null
    actual_col_a_raya = null
    actual_col_a_letra = null
    actual_col_a_rect = null
    actual_col_a_ind = -1
}

function setRayaGeo(rect1, rect2, raya) {
    var radians = Math.atan2((rect1.x - rect2.x), (rect1.y - rect2.y));
    var degree = (radians * (180 / Math.PI) * -1) + 90;

    if (raya != null && raya != undefined) {
        raya.style.transform = 'rotate(' + degree + 'deg)'
        raya.style.webkitTransform = 'rotate(' + degree + 'deg)'
        raya.style.oTransform = 'rotate(' + degree + 'deg)'
    } else {
        actual_col_a_raya.style.transform = 'rotate(' + degree + 'deg)'
        actual_col_a_raya.style.webkitTransform = 'rotate(' + degree + 'deg)'
        actual_col_a_raya.style.oTransform = 'rotate(' + degree + 'deg)'
    }

    var cat1 = rect1.x - rect2.x
    var cat2 = rect1.y - rect2.y
    var hipo = Math.hypot(cat1, cat2)

    if (raya != null && raya != undefined) {
        raya.style.width = hipo + 'px'
    } else {
        actual_col_a_raya.style.width = hipo + 'px'
    }
}

function ganarJuegoEmparejamiento() {
    getE('pregunta-4-btn').className = 'pregunta-continuar-btn pregunta-continuar-btn-on'
}

function perderJuegoEmparejamiento() {
    
}

/*var animacion_emparejamiento_automatico = null
var aea_i = 0 //animacion_emparejamiento_automatico
function juegoAutomaticoEmparejamiento() {
    juegoAutomaticoEmparejamiento2()
}

function juegoAutomaticoEmparejamiento2() {
    //mirar si faltan
    var columnas_faltantes = false
    for (i = 0; i < columnas_completadas.length; i++) {
        if (!columnas_completadas[i]) {
            columnas_faltantes = true
        }
    }
    // console.log(columnas_completadas)
    //console.log(columnas_faltantes)

    if (columnas_faltantes) {
        if (columnas_completadas[aea_i] == false) {
            var col_clave = getE('pregunta-col-a-' + aea_i)
                // console.log('pregunta-col-a-'+aea_i)
            var raya_clave = col_clave.getElementsByClassName('pregunta-col-raya')[0]
            raya_clave.style.width = '0px'
            raya_clave.style.transform = 'rotate(0deg)'
            raya_clave.style.webkitTransform = 'rotate(0deg)'
            raya_clave.style.oTransform = 'rotate(0deg)'

            var letra_clave = col_clave.getElementsByClassName('pregunta-col-letter')[0]

            var rect_letra_clave = letra_clave.getBoundingClientRect()

            var numero_clave = getE('pregunta-col-b-' + aea_i).getElementsByClassName('pregunta-col-number')[0]
            var rect_numero_clave = numero_clave.getBoundingClientRect()

            var rect3 = {
                x: (rect_numero_clave.left + (numero_clave.offsetWidth / 2)),
                y: (rect_numero_clave.top + (numero_clave.offsetHeight / 2))
            }
            var rect4 = {
                x: (rect_letra_clave.left + (letra_clave.offsetWidth / 2)),
                y: rect_letra_clave.top + ((letra_clave.offsetHeight / 2))
            }
            raya_clave.classList.add('pregunta-col-raya-move')

            animacion_emparejamiento_automatico = setTimeout(function() {
                clearTimeout(animacion_emparejamiento_automatico)
                animacion_emparejamiento_automatico = null
                setRayaGeo(rect3, rect4, raya_clave)

                animacion_emparejamiento_automatico = setTimeout(function() {
                    clearTimeout(animacion_emparejamiento_automatico)
                    animacion_emparejamiento_automatico = null

                    //poner el numero del color
                    numero_clave.style.backgroundColor = letra_clave.style.backgroundColor
                    numero_clave.style.color = '#FFFFFF'

                    correct_mp3.play()

                    columnas_completadas[aea_i] = true
                    aea_i++
                    juegoAutomaticoEmparejamiento2()
                }, 1000)
            }, 20)
        } else {
            aea_i++
            juegoAutomaticoEmparejamiento2()
        }
    } else {
        //poner btn continuar
        getE('reloj').className = 'reloj-off'
        getE('pregunta-4-btn').classList.remove('pregunta-continuar-btn-off')
        getE('pregunta-4-btn').classList.add('pregunta-continuar-btn-on')
        click_continuar_mp3.play()
    }
}*/


function overOpcion() {
    over_mp3.currentTime = 0
    over_mp3.play()
}

function outOpcion() {

}

function clickContinuar(){
    parent.finalizarInteractiva()
}