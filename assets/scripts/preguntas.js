var audio_pregunta = null
var audio_retroalimentacion = null
var loaded_pregunta = 0

//////////////load audio preguntas//////////////

function loadGame(){
    loadAudioPregunta()
}

function loadAudioPregunta(){
    if(loaded_pregunta==data_preguntas.length){
        startGame()
    }else{
        if(data_preguntas[loaded_pregunta].audiosrc!=''){
            loadTrack({src: 'assets/audios/'+data_preguntas[loaded_pregunta].id+'/'+data_preguntas[loaded_pregunta].audiosrc+'.mp3', callBack: function (data) {
                data_preguntas[loaded_pregunta].audio = data
    
                if(data_preguntas[loaded_pregunta].hasretroalimentacion){
                    loadTrack({src: 'assets/audios/'+data_preguntas[loaded_pregunta].id+'/'+data_preguntas[loaded_pregunta].retroalimentacionsrc+'.mp3', callBack: function (data) {
                        data_preguntas[loaded_pregunta].retroalimentacion = data
    
                        loaded_pregunta++
                        loadAudioPregunta()
                    }},false)
                }else{
                    loaded_pregunta++
                    loadAudioPregunta()
                }
            }})
        }else{
            loaded_pregunta++
            loadAudioPregunta()
        }
    }
}

var ended_pregunta_audio = null
var letras = ['A','B','C','D','E'];

function setPregunta(ended){
    if(ended!=null&&ended!=undefined){
        ended_pregunta_audio = ended
    }else{
        ended_pregunta_audio = null
    }
    if(data_preguntas[pregunta_actual].tipo=='verdaderofalso'){

        getE('pregunta-title').innerHTML = data_preguntas[pregunta_actual].pregunta
        getE('pregunta-opciones').innerHTML = ''

        for(i = 0;i<data_preguntas[pregunta_actual].opciones.length;i++){
            var opcion = document.createElement('div')
            var h = ''

            opcion.className = 'pregunta-opcion pregunta-opcion-out'

            h+='<div class="pregunta-opcion-texto">'
                h+='<p>'+data_preguntas[pregunta_actual].opciones[i]+'</p>'
            h+='</div>'
            h+='<div class="pregunta-opcion-icon"></div>'
            h+='<div class="pregunta-opcion-zona" onclick="clickOpcion('+(i+1)+',1)" onmouseover="overOpcionVF(this,'+(i+1)+')" onmouseout="outOpcionVF(this)"></div>'
                        
            opcion.innerHTML = h

            getE('pregunta-opciones').appendChild(opcion)
        }
    }else if(data_preguntas[pregunta_actual].tipo=='verdaderofalsoimg'){
        getE('pregunta3-title').innerHTML = data_preguntas[pregunta_actual].pregunta
        getE('pregunta3-opciones').innerHTML = ''

        for(i = 0;i<data_preguntas[pregunta_actual].opciones.length;i++){
            var opcion = document.createElement('div')
            var h = ''

            opcion.className = 'pregunta3-opcion pregunta3-opcion-out'

            h+='<div class="pregunta3-opcion-texto">'
                h+='<p>'+data_preguntas[pregunta_actual].opciones[i]+'</p>'
            h+='</div>'
            h+='<div class="pregunta3-opcion-icon"></div>'
            h+='<div class="pregunta3-opcion-zona" onclick="clickOpcion('+(i+1)+',3)" onmouseover="overOpcionVFI(this)" onmouseout="outOpcionVFI(this)"></div>'
                        
            opcion.innerHTML = h

            getE('pregunta3-opciones').appendChild(opcion)
        }

        getE('pregunta3-img').src = 'assets/images/preguntas/'+data_preguntas[pregunta_actual].id+'/'+data_preguntas[pregunta_actual].img+'.png';
    }
    else{
        getE('pregunta2-title').innerHTML = data_preguntas[pregunta_actual].pregunta
        getE('pregunta2-marco-container-img').src = 'assets/sprites/p'+personajes_info[0].id+'-piensa/imagen1.png'
        getE('pregunta2-opciones').innerHTML = ''

        for(i = 0;i<data_preguntas[pregunta_actual].opciones.length;i++){
            var opcion = document.createElement('div')
            opcion.className = 'pregunta2-opcion pregunta2-opcion-out'

            var h = ''
            h+='<div class="pregunta2-opcion-texto">'
            h+='<p>'+data_preguntas[pregunta_actual].opciones[i]+'</p>'
            h+='</div>'
            h+='<div class="pregunta2-opcion-letra">'+letras[i]+'</div>'
            h+='<div class="pregunta2-opcion-icon"></div>'
            h+='<div class="pregunta2-opcion-zona" onclick="clickOpcion('+(i+1)+',2)" onmouseover="overOpcionSM(this)" onmouseout="outOpcionSM(this)"></div>'

            opcion.innerHTML = h

            getE('pregunta2-opciones').appendChild(opcion)
        }
    }
    
    if(data_preguntas[pregunta_actual].audio!=null){
        audio_pregunta = data_preguntas[pregunta_actual].audio
        audio_global = audio_pregunta;
        audio_pregunta.play()
        
        audio_pregunta.onended = function(){
            audio_pregunta.onended = null
            audio_global = null;
    
            continuarPregunta()       
        }
    }else{
        //pregunta sin audio
        continuarPregunta()
    }
}

function continuarPregunta(){
    if(data_preguntas[pregunta_actual].tipo=='verdaderofalso'){
        getE('pregunta-container').className = 'pregunta-container-on'
    }else if(data_preguntas[pregunta_actual].tipo=='opcionmultiple'){
        getE('pregunta2-container').className = 'pregunta2-container-on'
    }else if(data_preguntas[pregunta_actual].tipo=='verdaderofalsoimg'){
        getE('pregunta3-container').className = 'pregunta3-container-on'
    }
    audio_suspenso.play()

    if(ended_pregunta_audio!=null&&ended_pregunta_audio!=undefined){
        ended_pregunta_audio()
    }
}

function nextPregunta(){
    pregunta_actual++
    if(pregunta_actual==data_preguntas.length){
        
    }else{
        setEscenario2()
    }
}

function overOpcionVF(btn,o){
    var opcion = btn.parentNode
    opcion.className = 'pregunta-opcion pregunta-opcion-over-'+o
    audio_over.currentTime = 0
    audio_over.play()
}
function overOpcionVFI(btn){
    var opcion = btn.parentNode
    opcion.className = 'pregunta3-opcion pregunta3-opcion-over'
    audio_over.currentTime = 0
    audio_over.play()
}
function overOpcionSM(btn){
    var opcion = btn.parentNode
    opcion.className = 'pregunta2-opcion pregunta2-opcion-over'
    audio_over.currentTime = 0
    audio_over.play()
}

function outOpcionVF(btn){
    var opcion = btn.parentNode
    opcion.className = 'pregunta-opcion pregunta-opcion-out'
}
function outOpcionVFI(btn){
    var opcion = btn.parentNode
    opcion.className = 'pregunta3-opcion pregunta3-opcion-out'
}
function outOpcionSM(btn){
    var opcion = btn.parentNode
    opcion.className = 'pregunta2-opcion pregunta2-opcion-out'
}

var rand_audio = -1

function clickOpcion(o,p){
    //quitar zonas
    var opciones = []
    if(p==1){
        opciones = getE('pregunta-container').getElementsByClassName('pregunta-opcion-zona')
    }else if(p==2){
        opciones = getE('pregunta2-container').getElementsByClassName('pregunta2-opcion-zona')
    }else if(p==3){
        opciones = getE('pregunta3-container').getElementsByClassName('pregunta3-opcion-zona')
    }
    
    for(i = 0;i<opciones.length;i++){
        opciones[i].removeAttribute('onclick')
        opciones[i].removeAttribute('onmouseover')
        opciones[i].removeAttribute('onmouseout')
    }

    audio_suspenso.pause()
    stopAnimation(2)

    if(o==data_preguntas[pregunta_actual].correcta){
        audio_correcto.play()
    }else{
        audio_incorrecto.play()
    }
    
    getE('presentadora').className = 'presentadora-saca-set'
    playAnimation(0,null,false,1,false,function(){
        getE('presentadora').className = 'presentadora-habla-set'
        playAnimation(1,null,true,1,false,null,70)

        if(o==data_preguntas[pregunta_actual].correcta){
            rand_audio = getRand(1,audios_bien.length)-1
            audios_bien[rand_audio].play()
            audios_bien[rand_audio].onended = function(){
                audios_bien[rand_audio].onended = null

                stopAnimation(1)
                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,10,true,function(){
                    if(p==1){
                        getE('pregunta-container').className = 'pregunta-container-off'
                    }else if(p==2){
                        getE('pregunta2-container').className = 'pregunta2-container-off'
                    }else if(p==3){
                        getE('pregunta3-container').className = 'pregunta3-container-off'
                    }
    
                    setRespuesta('¡Correcto!', null, function(){
                        setRetroalimentacion('correcto')
                    })
                })
            }
        }else{
            if(p==1){
                getE('pregunta-opciones').getElementsByClassName('pregunta-opcion')[data_preguntas[pregunta_actual].correcta-1].className = 'pregunta-opcion pregunta-opcion-correcta'
            }else if(p==2){
                getE('pregunta2-opciones').getElementsByClassName('pregunta2-opcion')[data_preguntas[pregunta_actual].correcta-1].className = 'pregunta2-opcion pregunta2-opcion-correcta'
            }else if(p==3){
                getE('pregunta3-opciones').getElementsByClassName('pregunta3-opcion')[data_preguntas[pregunta_actual].correcta-1].className = 'pregunta3-opcion pregunta3-opcion-correcta'
            }

            rand_audio = getRand(1,audios_mal.length)-1
            audios_mal[rand_audio].play()
            audios_mal[rand_audio].onended = function(){
                audios_mal[rand_audio].onended = null

                stopAnimation(1)
                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,10,true,function(){
                    if(p==1){
                        getE('pregunta-container').className = 'pregunta-container-off'
                    }else if(p==2){
                        getE('pregunta2-container').className = 'pregunta2-container-off'
                    }else if(p==3){
                        getE('pregunta3-container').className = 'pregunta3-container-off'
                    }

                    setRespuesta('¡Incorrecto!', null, function(){
                        if(p==1){
                            getE('pregunta-opciones').getElementsByClassName('pregunta-opcion')[data_preguntas[pregunta_actual].correcta-1].className = 'pregunta-opcion'
                        }else if(p==2){
                            getE('pregunta2-opciones').getElementsByClassName('pregunta2-opcion')[data_preguntas[pregunta_actual].correcta-1].className = 'pregunta2-opcion'
                        }else if(p==3){
                            getE('pregunta3-opciones').getElementsByClassName('pregunta3-opcion')[data_preguntas[pregunta_actual].correcta-1].className = 'pregunta3-opcion'
                        }
                        setRetroalimentacion('incorrecto')
                    })
                })
            }
            
        }
    })

}

var npc_ganador = 0
var npc_perdedor = 0
var npc_ganador_audio = null

function setRetroalimentacion(estado){
    npc_ganador = 0
    npc_perdedor = 0
    npc_ganador_audio = null

    if(estado=='incorrecto'){
        npc_ganador = getRand(1,2)
        if(npc_ganador==1){
            npc_perdedor = 2
        }else{
            npc_perdedor = 1
        }

        audio_booh.currentTime = 0
        audio_booh.play()

        getE('personaje-'+personajes_info[npc_ganador].id).className = 'personaje-feliz-set posicion-personaje-'+personajes_info[npc_ganador].pos
        playAnimation(personajes_info[npc_ganador].animations[1],null,true)

        getE('personaje-'+personajes_info[npc_perdedor].id).className = 'personaje-triste-set posicion-personaje-'+personajes_info[npc_perdedor].pos
        playAnimation(personajes_info[npc_perdedor].animations[0],null,true)

        getE('personaje-'+personajes_info[0].id).className = 'personaje-triste-set posicion-personaje-'+personajes_info[0].pos
        playAnimation(personajes_info[0].animations[0],null,true,14)

        personajes_info[npc_ganador].score+=10
        npc_ganador_audio = personajes_info[npc_ganador].audio

        updateBoard(npc_ganador)

        getE('presentadora').className = 'presentadora-saca-set'
        playAnimation(0,null,false,1,false,function(){
            getE('presentadora').className = 'presentadora-habla-set'
            playAnimation(1,null,true,1,false,null,70)

            npc_ganador_audio.currentTime = 0
            npc_ganador_audio.play()
            npc_ganador_audio.onended = function(){
                npc_ganador_audio.onended = null
                npc_ganador_audio = null

                stopAnimation(1)
                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,10,true,function(){
                    continuarRetroalimentacion()
                })
            }
        })
    }else{
        audio_bien_aplausos.currentTime = 0
        audio_bien_aplausos.play()

        getE('personaje-'+personajes_info[0].id).className = 'personaje-feliz-set posicion-personaje-1'
        playAnimation(personajes_info[0].animations[1],null,true)
        getE('personaje-'+personajes_info[1].id).className = 'personaje-triste-set posicion-personaje-2'
        playAnimation(personajes_info[1].animations[0],null,true,14)
        getE('personaje-'+personajes_info[2].id).className = 'personaje-triste-set posicion-personaje-3'
        playAnimation(personajes_info[2].animations[0],null,true)

        personajes_info[0].score+=10

        updateBoard(0)
        continuarRetroalimentacion()
    }
}

function continuarRetroalimentacion(){
    if(data_preguntas[pregunta_actual].hasretroalimentacion){
        audio_susurros.play()

        getE('presentadora').className = 'presentadora-saca-set'
        playAnimation(0,null,false,1,false,function(){
            getE('presentadora').className = 'presentadora-habla-set'
            playAnimation(1,null,true,1,false,null,70)

            audio_retroalimentacion = data_preguntas[pregunta_actual].retroalimentacion
            audio_global = audio_retroalimentacion;
            audio_retroalimentacion.play()

            getE('cc_text').className = 'cc_text_on'

            audio_retroalimentacion.ontimeupdate = function(){
                var current = audio_retroalimentacion.currentTime
                var txt_current = "..."
                for(j = 0;j<data_preguntas[pregunta_actual].retroalimentacioncc.length;j++){
                    if(
                        current>=data_preguntas[pregunta_actual].retroalimentacioncc[j].start&&
                        current<=data_preguntas[pregunta_actual].retroalimentacioncc[j].end
                    ){
                        txt_current = data_preguntas[pregunta_actual].retroalimentacioncc[j].txt
                    }
                }
                getE('cc_text').innerHTML = txt_current
            }
    
            audio_retroalimentacion.onended = function(){
                audio_retroalimentacion.onended = null
                audio_global = null;

                getE('cc_text').className = 'cc_text_off'
                audio_retroalimentacion.ontimeupdate = null

                audio_susurros.pause()
                stopAnimation(1)

                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,10,true,function(){
                    continuarConcurso()
                })
            }
        })
    }else{
        //podemos un audio de bulto para que haya tiempo de que se vea la animación
        //siempre y cuando haya respondido correcto

        console.log("npc_ganador: "+npc_ganador)
        if(npc_ganador==0){
            getE('presentadora').className = 'presentadora-saca-set'
            playAnimation(0,null,false,1,false,function(){
                getE('presentadora').className = 'presentadora-habla-set'
                playAnimation(1,null,true,1,false,null,70)
    
                npc_ganador_audio = personajes_info[0].audio
                npc_ganador_audio.currentTime = 0
                npc_ganador_audio.play()
                npc_ganador_audio.onended = function(){
                    npc_ganador_audio.onended = null
                    npc_ganador_audio = null
    
                    stopAnimation(1)
    
                    getE('presentadora').className = 'presentadora-saca-set'
                    playAnimation(0,null,false,10,true,function(){
                        continuarConcurso()
                    })
                }
            })
        }else{
            continuarConcurso()
        }
    }
}

//funcion llamada despues de la retroalimentacion
function continuarConcurso(){
    if(data_preguntas[pregunta_actual].next!=null){
        getE('escenario-1-vid').pause()
        //no se pausa porque a veces es corto el audio de retroalimentacion y se mocha
        //audio_bien_aplausos.pause()

        if(data_preguntas[pregunta_actual].next.tipo=='comercial'){
            setCortina({
                preBack: function(){
                    clearBoard(false)
                    setPersonajesQuietos(true)
                    setComercial({
                        src:'assets/media/'+data_preguntas[pregunta_actual].next.src+'.mp4',
                        ended:function(){
                            if(data_preguntas[pregunta_actual].next.end==null){
                                continuarConcurso2()
                            }else{
                                if(data_preguntas[pregunta_actual].next.end.tipo=='pdf'){
                                    setPdf({
                                        title:data_preguntas[pregunta_actual].next.end.data.title,
                                        audiosrc:data_preguntas[pregunta_actual].next.end.data.audiosrc,
                                        href:data_preguntas[pregunta_actual].next.end.data.href,
                                        next:data_preguntas[pregunta_actual].next.end.data.next,
                                        callBack:function(){
                                            continuarConcurso2()
                                        }
                                    })
                                }else if(data_preguntas[pregunta_actual].next.end.tipo=='final'){
                                    setFinal()
                                }
                            }
                            
                        }
                    })
                }
            })
        }else if(data_preguntas[pregunta_actual].next.tipo=='interactiva'){
            setCortina({
                preBack: function(){
                    clearBoard(false)
                    setPersonajesQuietos(true)
                    current_interactiva = data_preguntas[pregunta_actual].next.int
                    setInteractiva({src:data_preguntas[pregunta_actual].next.src})
                }
            })
        }else if(data_preguntas[pregunta_actual].next.tipo=='pdf'){
            setPdf({
                title:data_preguntas[pregunta_actual].next.data.title,
                audiosrc:data_preguntas[pregunta_actual].next.data.audiosrc,
                href:data_preguntas[pregunta_actual].next.data.href,
                next:data_preguntas[pregunta_actual].next.data.next,
                callBack:function(){
                    continuarConcurso2()
                }
            })
        }else if(data_preguntas[pregunta_actual].next.tipo=='informacion'){
            setInformacion({
                src:data_preguntas[pregunta_actual].next.src,
                end:data_preguntas[pregunta_actual].next.end
            })
        }
    }else{
        getE('presentadora').className = 'presentadora-saca-set'
        playAnimation(0,null,false,1,false,function(){
            getE('presentadora').className = 'presentadora-habla-set'
            playAnimation(1,null,true,1,false,null,70)

            var rand_next_aud = getRand(1,audios_next.length)
            audio_global = audios_next[rand_next_aud-1]
            audios_next[rand_next_aud-1].play()
            audios_next[rand_next_aud-1].onended = function(){
                audios_next[rand_next_aud-1].onended = null
                audio_global = null
                stopAnimation(1)
        
                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,10,true,function(){
                    getE('escenario-1-vid').pause()

                    setTransicion({text:'Siguiente Pregunta',
                        preBack: function(){
                            unsetEscenario1()

                            prepareEscenario2()
                        },
                        callBack: function(){
                            nextPregunta()
                        }
                    })
                })
            }
        })
    }
}

function continuarConcurso2(){
    setCortina({
        preBack: function(){
            unsetComercial()
        },
        callBack: function(){
            setTransicion({text:'Siguiente Pregunta',
                preBack: function(){
                    unsetEscenario1()

                    prepareEscenario2()
                },
                callBack: function(){
                    nextPregunta()
                }
            })
        }
    })
}


var animacion_respuesta = null
var animacion_respuesta2 = null
var animacion_respuesta3 = null

var respuesta_preback = null
var respuesta_callback = null

var colores_respuesta = ['00b7e8','ff9c00','004492','364d68','5ebe30']

function setRespuesta(info,preBack,callBack){
    if(preBack!=null&&preBack!=undefined){
        respuesta_preback = preBack
    }else{
        respuesta_preback = null
    }
    if(callBack!=null&&callBack!=undefined){
        respuesta_callback = callBack
    }else{
        respuesta_callback = null
    }

    if(audio_pregunta!=null){
        audio_pregunta.pause()
    }
    getE('respuesta-container').className = 'respuesta-container-on'
    var info_splited = info.split("")
    getE('respuesta-texto').innerHTML = ''

    for(i = 0;i<info_splited.length;i++){
        var span = document.createElement('span')
        span.className = 'respuesta-container-span-out'
        span.innerHTML = info_splited[i]
        span.style.color = '#'+colores_respuesta[getRand(1,colores_respuesta.length)-1]

        getE('respuesta-texto').appendChild(span)
    }

    i = 0;
    animacion_respuesta = setInterval(function(){
        if(i==info_splited.length){
            clearInterval(animacion_respuesta)
            animacion_respuesta = null
        }else{
            getE('respuesta-texto').getElementsByTagName('span')[i].className = 'respuesta-container-span-in'
            i++
        }
    },150)

    animacion_respuesta2 = setTimeout(function(){
        clearTimeout(animacion_respuesta2)
        animacion_respuesta2 = null

        //aqui se pone todo en blanco
        stopAnimation(12)
        setPersonajesQuietos(true)

        getE('respuesta-container').className = 'respuesta-container-off'

        //colocar escenario 1 y ocultar 2
        unsetEscenario2()
        
        prepareEscenario1()
        //cuando se pone el escenario en blanco

        if(respuesta_preback!=null&&respuesta_preback!=undefined){
            respuesta_preback()
        }
        animacion_respuesta3 = setTimeout(function(){
            clearTimeout(animacion_respuesta3)
            animacion_respuesta3 = null
            //ya cuando se ha desvanecido toda la transicion de respuesta

            if(respuesta_callback!=null&&respuesta_callback!=undefined){
                respuesta_callback()
            }
        },1000)

    },3000)
}