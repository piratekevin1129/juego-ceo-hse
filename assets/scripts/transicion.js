var t = 0;
var animacion_texto_span = null
var animacion_transicion = null
var transicion_callback = null
var transicion_preback = null

function setTransicion(data){
    var texto = data.text
    var texto_splited = texto.split("")

    if(data.callBack!=null&&data.callBack!=undefined){
        transicion_callback = data.callBack
    }else{
        transicion_callback = null
    }

    if(data.preBack!=null&&data.preBack!=undefined){
        transicion_preback = data.preBack
    }else{
        transicion_preback = null
    }

    getE('transicion-texto2').innerHTML = ''

    for(t = 0;t<texto_splited.length;t++){
        var span = document.createElement('span')
        span.className = 'transicion-texto2-span-out'
        span.innerHTML = texto_splited[t]
        getE('transicion-texto2').appendChild(span)
    }

    getE('transicion-texto1').innerHTML = texto
    getE('transicion-texto3').innerHTML = texto
    getE('transicion').className = 'transicion-on'
    audio_transicion.play()

    t = 0;
    animacion_texto_span = setInterval(function(){
        if(t==texto_splited.length){
            clearInterval(animacion_texto_span)
            animacion_texto_span = null

            if(transicion_preback!=null&&transicion_preback!=undefined){
                transicion_preback()
            }
            
        }else{
            getE('transicion-texto2').getElementsByTagName('span')[t].className = 'transicion-texto2-span-in'
            t++
        }
    },150)

    animacion_transicion = setTimeout(function(){
        clearTimeout(animacion_transicion)
        animacion_transicion = null

        if(transicion_callback!=null&&transicion_callback!=undefined){
            transicion_callback()
        }

        animacion_transicion = setTimeout(function(){
            clearTimeout(animacion_transicion)
            animacion_transicion = null
    
            getE('transicion').className = 'transicion-off transicion-hidden'  
        },1000)
    },5000)
}