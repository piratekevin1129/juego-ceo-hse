var animacion_escenario_out = null

function setEscenario1(){
    prepareEscenario1()

    audio_intro_aplausos.play()

    getE('presentadora').className = 'presentadora-saca-set'
    playAnimation(0,null,false,1,false,function(){
        getE('personaje-'+personajes_info[0].id).className = 'personaje-feliz-set posicion-personaje-1'
        playAnimation(personajes_info[0].animations[1],null,false)
        getE('personaje-'+personajes_info[1].id).className = 'personaje-feliz-set posicion-personaje-2'
        playAnimation(personajes_info[1].animations[1],null,false)
        getE('personaje-'+personajes_info[2].id).className = 'personaje-feliz-set posicion-personaje-3'
        playAnimation(personajes_info[2].animations[1],null,false)

        getE('presentadora').className = 'presentadora-habla-set'
        playAnimation(1,null,true,1,false,null,70)

        audio_global = audio_intro;
        audio_intro.play()
        audio_intro.onended = function(){
            stopAnimation(1)
            audio_intro.onended = null
            audio_global = null;
            getE('presentadora').className = 'presentadora-saca-set'

            playAnimation(0,null,false,10,true)

            animacion_escenario_out = setTimeout(function(){
                clearTimeout(animacion_escenario_out)
                animacion_escenario_out = null

                audio_intro_aplausos.pause()
                getE('escenario-1-vid').pause()

                setCortina({
                    preBack: function(){
                        setComercial({
                            src:'assets/media/intro.mp4',
                            ended:function(){
                                setCortina({
                                    preBack: function(){
                                        unsetComercial()

                                        current_interactiva = 1
                                        setInteractiva({src:'durante_2024/index.html'})
                                    }
                                })
                            }
                        })
                    }
                })
            }, 1000)
        }
    })
}

function prepareEscenario1(){
    getE('escenario-1-vid').play()
    getE('tablero').className = 'tablero-on'
    getE('escenario-1').className = 'escenario-1-on'
    getE('personajes').className = 'personajes-shown personajes-medium'
}

function unsetEscenario1(){
    clearBoard(true)
    getE('escenario-1').className = 'escenario-1-hidden'
}