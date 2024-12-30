var audio_informacion_mp3 = null

function setInformacion(data){
    //colocar escenario 1
    prepareEscenario1()

    audio_susurros.play()

    audio_informacion_mp3 = new Audio('assets/audios/informacion/'+data.src+'.mp3')
    audio_informacion_mp3.onloadeddata = function(){
        audio_informacion_mp3.onloadeddata = null

        getE('presentadora').className = 'presentadora-saca-set'
        playAnimation(0,null,false,1,false,function(){
            getE('presentadora').className = 'presentadora-habla-set'
            playAnimation(1,null,true,1,false,null,70)

            audio_global = audio_informacion_mp3;
            audio_informacion_mp3.play()
            audio_informacion_mp3.onended = function(){
                audio_informacion_mp3.onended = null
                audio_informacion_mp3 = null
                audio_global = null;

                audio_susurros.pause()
                stopAnimation(1)
                getE('presentadora').className = 'presentadora-saca-set'

                playAnimation(0,null,false,10,true, function(){
                    getE('escenario-1-vid').pause()
                    if(data.end==null){
                        nextPregunta()
                    }else{
                        if(data.end.tipo=='comercial'){
                            setTransicion({
                                text:'¡Ya regresamos!',
                                preBack:function(){
                                    clearBoard(false)
                                    setPersonajesQuietos(true)
                                },
                                callBack:function(){
                                    setComercial({
                                        src:'assets/media/'+data.end.src+'.mp4',
                                        ended:function(){
                                            if(data.end.end==null){
                                                continuarConcurso2()
                                            }else{
                                                if(data.end.end.tipo=='interactiva'){
                                                    setCortina({
                                                        preBack: function(){
                                                            unsetComercial()
                                                            current_interactiva = data.end.end.int
                                                            setInteractiva({src:data.end.end.src})
                                                        }
                                                    })
                                                }else if(data.end.end.tipo=='informacion'){
                                                    setCortina({
                                                        preBack: function(){
                                                            unsetComercial()
                                                            setInformacion({
                                                                src:data.end.end.src,
                                                                end:data.end.end.end
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }
                            })
                        }else if(data.end.tipo=='interactiva'){
                            setCortina({
                                preBack: function(){
                                    clearBoard(false)
                                    setPersonajesQuietos(true)

                                    current_interactiva = data.end.int
                                    setInteractiva({src:data.end.src})
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    audio_informacion_mp3.onerror = function(){
        console.log("error cargando audio informacion")
    }

    
}