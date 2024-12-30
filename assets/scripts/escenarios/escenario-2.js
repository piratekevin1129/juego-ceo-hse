function setEscenario2(){
    if(data_preguntas[pregunta_actual].audiosrc!=''){
        getE('presentadora').className = 'presentadora-saca-set'
        playAnimation(0,null,false,1,false,function(){
            getE('presentadora').className = 'presentadora-habla-set'
            playAnimation(1,null,true,1,false,null,70)
    
            setPregunta(function(){
                stopAnimation(1)
                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,10,true,function(){
                    getE('presentadora').className = 'presentadora-quieta-set'
                    
                    if(data_preguntas[pregunta_actual].tipo=='verdaderofalso'){
                        playAnimation(2,null,true,1,false,null,70)
                        getE('personaje-'+personajes_info[0].id).className = 'personaje-piensa-set posicion-personaje-1'
                        playAnimation(12,null,true,1,false,null,70)
                    }
                })
    
                //poner a pensar personaje
            })
            
        })
    }else{
        //pregunta sin audio
        setPregunta(function(){   
            if(data_preguntas[pregunta_actual].tipo=='verdaderofalso'){
                playAnimation(2,null,true,1,false,null,70)
                getE('personaje-'+personajes_info[0].id).className = 'personaje-piensa-set posicion-personaje-1'
                playAnimation(12,null,true,1,false,null,70)
            }
            //poner a pensar personaje
        })
    }
}

function prepareEscenario2(){    
    getE('escenario-2').className = 'escenario-2-on'
    getE('personajes').className = 'personajes-shown personajes-big'

    setPersonajesQuietos(true)
}

function unsetEscenario2(){
    getE('escenario-2').className = 'escenario-2-hidden'
}