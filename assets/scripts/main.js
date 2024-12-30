var i = 0
var j = 0
var k = 0

var personajes_info = [
    {
        id:0,
        score:0,
        animations:[],
        nombre:'',
        real:true,
        audio:null,
        pos:1
    },
    {
        id:0,
        score:0,
        animations:[],
        nombre:'',
        real:false,
        audio:null,
        pos:2
    },
    {
        id:0,
        score:0,
        animations:[],
        nombre:'',
        real:false,
        audio:null,
        pos:3
    }
]

var nombres = ['Juan','Ana','Pedro']

function getRand(minimum,maximum){
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomnumber;
}

function loadTrack(data,loader_update){
    /*var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadedmetadata',function(){
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error loading audio: "+url)
        data.callBack(null)
    })*/

    var audio = null
    var request = new XMLHttpRequest();
    request.open("GET", data.src, true);
    request.responseType = "blob";
    request.onload = function() {
        if (this.status == 200) {
            audio = new Audio(URL.createObjectURL(this.response));
            audio.load();
            if(loader_update==null||loader_update==undefined){
                loaderUpdate()
            }else{
                if(loader_update){
                    loaderUpdate()
                }
            }
            data.callBack(audio)
        }else{
            console.log("error loading audio: "+url)
            data.callBack(null)
        }
    }
    request.send();
}

function overPersonaje(){
    audio_over.currentTime = 0
    audio_over.play()
}

function setPersonajesQuietos(stop){
    if(stop){
        stopAnimation(personajes_info[0].animations[0],true)
        stopAnimation(personajes_info[0].animations[1],true)
        stopAnimation(personajes_info[1].animations[0],true)
        stopAnimation(personajes_info[1].animations[1],true)
        stopAnimation(personajes_info[2].animations[0],true)
        stopAnimation(personajes_info[2].animations[1],true)
    }
    getE('personaje-'+personajes_info[0].id).className = 'personaje-quieto-set posicion-personaje-1'
    getE('personaje-'+personajes_info[1].id).className = 'personaje-quieto-set posicion-personaje-2'
    getE('personaje-'+personajes_info[2].id).className = 'personaje-quieto-set posicion-personaje-3'
}

function clickPersonaje(p){
    personaje_actual = (p-1)

    if(p==1){
        personajes_info[0].id = 1
        personajes_info[0].animations = [3,6,9,14]
        personajes_info[0].nombre = nombres[0]
        personajes_info[0].audio = juan_bien

        personajes_info[1].id = 2
        personajes_info[1].animations = [4,7,10,15]
        personajes_info[1].nombre = nombres[1]
        personajes_info[1].audio = ana_bien

        personajes_info[2].id = 3
        personajes_info[2].animations = [5,8,11,16]
        personajes_info[2].nombre = nombres[2]
        personajes_info[2].audio = pedro_bien
    }else if(p==2){
        personajes_info[0].id = 2
        personajes_info[0].animations = [4,7,10,15]
        personajes_info[0].nombre = nombres[1]
        personajes_info[0].audio = ana_bien

        personajes_info[1].id = 1
        personajes_info[1].animations = [3,6,9,14]
        personajes_info[1].nombre = nombres[0]
        personajes_info[1].audio = juan_bien

        personajes_info[2].id = 3
        personajes_info[2].animations = [5,8,11,16]
        personajes_info[2].nombre = nombres[2]
        personajes_info[2].audio = pedro_bien
    }else if(p==3){
        personajes_info[0].id = 3
        personajes_info[0].animations = [5,8,11,16]
        personajes_info[0].nombre = nombres[2]
        personajes_info[0].audio = pedro_bien

        personajes_info[1].id = 1
        personajes_info[1].animations = [3,6,9,14]
        personajes_info[1].nombre = nombres[0]
        personajes_info[1].audio = juan_bien

        personajes_info[2].id = 2
        personajes_info[2].animations = [4,7,10,15]
        personajes_info[2].nombre = nombres[1]
        personajes_info[2].audio = ana_bien
    }

    setPersonajesQuietos(false)

    //setTablero

    var ht = ''
    ht+='<div class="tablero-row">'
        ht+='<p>'+personajes_info[0].nombre+'</p>'
        ht+='<h6 id="puntaje-'+personajes_info[0].id+'">'+personajes_info[0].score+'</h6>'
    ht+='</div>'
    ht+='<div class="tablero-row">'
        ht+='<p>'+personajes_info[1].nombre+'</p>'
        ht+='<h6 id="puntaje-'+personajes_info[1].id+'">'+personajes_info[1].score+'</h6>'
    ht+='</div>'
    ht+='<div class="tablero-row">'
        ht+='<p>'+personajes_info[2].nombre+'</p>'
        ht+='<h6 id="puntaje-'+personajes_info[2].id+'">'+personajes_info[2].score+'</h6>'
    ht+='</div>'

    getE('tablero-col').innerHTML = ht

    audio_bienvenida.pause()
    audio_click.play()
    
    getE('encendido').className = 'encendido-off'
    audio_tv_encendido_off.play()

    animacion_encendido = setTimeout(function(){
        clearTimeout(animacion_encendido)
        animacion_encendido = null

        //cargar cosas
        //resetear loader
        //50 de los 3 sprites de la presentadora
        //45 + 2 + 27 = 3 sprites standar de cada personaje (feliz, quieto, triste)
        //38 sprite pensando (1 solo)
        
        total_loader = (50 + ((45 + 2 + 27) * 3) + 38) //frames presentadora + personaje + 2 npc 
        current_loader = 0

        getE('loader').className = 'loader-state-1 loader-on'
        getE('encendido').className = 'encendido-off encendido-hidden'
        getE('escenario-0').className = 'escenario-0-hidden'

        //cargar sprites presentadora

        loadAnimation({
            idname:'presentadora-saca-microfono',
            canv:'presentadora-saca-microfono-canv',
            width:300,
            height:508,
            realw:'auto',
            realh:'auto',
            pos:0,
            total:10,
            folder:'assets/sprites/presentadora-saca-microfono',
            pre:'imagen',
            async:false,
            callBack:function(){
                loadAnimation({
                    idname:'presentadora-habla',
                    canv:'presentadora-habla-canv',
                    width:300,
                    height:508,
                    realw:'auto',
                    realh:'auto',
                    pos:1,
                    total:30,
                    folder:'assets/sprites/presentadora-habla',
                    pre:'imagen',
                    async:true,
                    callBack:function(){
                        loadAnimation({
                            idname:'presentadora-quieta',
                            canv:'presentadora-quieta-canv',
                            width:300,
                            height:508,
                            realw:'auto',
                            realh:'auto',
                            pos:2,
                            total:10,
                            folder:'assets/sprites/presentadora-quieta',
                            pre:'imagen',
                            extra:true,
                            async:true,
                            callBack:function(){
                                loadedDatosPresentadora()
                            }
                        })
                    }
                })
            }
        })


    },1000)
}

function loadedDatosPresentadora(){
    //triste
    loadAnimation({
        idname:'personaje-1-triste',
        canv:'personaje-1-triste-canv',
        width:250,
        height:430,
        realw:'auto',
        realh:'auto',
        pos:3,
        total:27,
        folder:'assets/sprites/p1-triste',
        pre:'imagen',
        extra:true,
        async:true,
        callBack:function(){
            loadAnimation({
                idname:'personaje-2-triste',
                canv:'personaje-2-triste-canv',
                width:250,
                height:430,
                realw:'auto',
                realh:'auto',
                pos:4,
                total:27,
                folder:'assets/sprites/p2-triste',
                pre:'imagen',
                extra:true,
                async:true,
                callBack:function(){
                    loadAnimation({
                        idname:'personaje-3-triste',
                        canv:'personaje-3-triste-canv',
                        width:250,
                        height:430,
                        realw:'auto',
                        realh:'auto',
                        pos:5,
                        total:27,
                        folder:'assets/sprites/p3-triste',
                        pre:'imagen',
                        extra:true,
                        async:true,
                        callBack:function(){
                            loadedDatosTriste()
                        }
                    })
                }
            })
        }
    })
}

function loadedDatosTriste(){
    //feliz
    loadAnimation({
        idname:'personaje-1-feliz',
        canv:'personaje-1-feliz-canv',
        width:320,
        height:500,
        realw:'auto',
        realh:'auto',
        pos:6,
        total:45,
        folder:'assets/sprites/p1-feliz',
        pre:'imagen',
        extra:true,
        async:true,
        callBack:function(){
            loadAnimation({
                idname:'personaje-2-feliz',
                canv:'personaje-2-feliz-canv',
                width:320,
                height:500,
                realw:'auto',
                realh:'auto',
                pos:7,
                total:45,
                folder:'assets/sprites/p2-feliz',
                pre:'imagen',
                extra:true,
                async:true,
                callBack:function(){
                    loadAnimation({
                        idname:'personaje-3-feliz',
                        canv:'personaje-3-feliz-canv',
                        width:320,
                        height:500,
                        realw:'auto',
                        realh:'auto',
                        pos:8,
                        total:45,
                        folder:'assets/sprites/p3-feliz',
                        pre:'imagen',
                        extra:true,
                        async:true,
                        callBack:function(){
                            loadedDatosFeliz()
                        }
                    })
                }
            })
        }
    })


}

function loadedDatosFeliz(){
    //quieto
    loadAnimation({
        idname:'personaje-1-quieto',
        canv:'personaje-1-quieto-canv',
        width:250,
        height:430,
        realw:'auto',
        realh:'auto',
        pos:9,
        total:1,
        folder:'assets/sprites/p1-quieto',
        pre:'imagen',
        async:true,
        callBack:function(){
            loadAnimation({
                idname:'personaje-2-quieto',
                canv:'personaje-2-quieto-canv',
                width:250,
                height:430,
                realw:'auto',
                realh:'auto',
                pos:10,
                total:1,
                folder:'assets/sprites/p2-quieto',
                pre:'imagen',
                callBack:function(){
                    loadAnimation({
                        idname:'personaje-3-quieto',
                        canv:'personaje-3-quieto-canv',
                        width:250,
                        height:430,
                        realw:'auto',
                        realh:'auto',
                        pos:11,
                        total:1,
                        folder:'assets/sprites/p3-quieto',
                        pre:'imagen',
                        callBack:function(){
                            loadedDatosQuieto()
                        }
                    })
                }
            })
        }
    })

}

function loadedDatosQuieto(){
    //piensa
    loadAnimation({
        idname:'personaje-'+personajes_info[0].id+'-piensa',
        canv:'personaje-'+personajes_info[0].id+'-piensa-canv',
        width:250,
        height:430,
        realw:'auto',
        realh:'auto',
        pos:12,
        total:38,
        folder:'assets/sprites/p'+personajes_info[0].id+'-piensa',
        pre:'imagen',
        extra:true,
        extraframes:12,
        async:true,
        callBack:function(){
            comenzarJuego()
        }
    })
}

function comenzarJuego(){
    //cargar datos de presentadora celebrando
    loadAnimation({
        idname:'presentadora-celebra',
        canv:'presentadora-celebra-canv',
        width:400,
        height:590,
        realw:'auto',
        realh:'auto',
        pos:13,
        total:50,
        folder:'assets/sprites/presentadora-celebra',
        pre:'imagen',
        callBack:function(){
            console.log("cargó animacion presentadora celebrando")

            loadAnimation({
                idname:'personaje-1-celebra',
                canv:'personaje-1-celebra-canv',
                width:360,
                height:500,
                realw:'auto',
                realh:'auto',
                pos:14,
                total:51,
                folder:'assets/sprites/p1-celebra',
                pre:'imagen',
                callBack:function(){
                    console.log("cargó animacion p1 celebrando")
                    
                    loadAnimation({
                        idname:'personaje-2-celebra',
                        canv:'personaje-2-celebra-canv',
                        width:360,
                        height:500,
                        realw:'auto',
                        realh:'auto',
                        pos:15,
                        total:51,
                        folder:'assets/sprites/p2-celebra',
                        pre:'imagen',
                        callBack:function(){
                            console.log("cargó animacion p2 celebrando")
                    
                            loadAnimation({
                                idname:'personaje-3-celebra',
                                canv:'personaje-3-celebra-canv',
                                width:360,
                                height:500,
                                realw:'auto',
                                realh:'auto',
                                pos:16,
                                total:51,
                                folder:'assets/sprites/p3-celebra',
                                pre:'imagen',
                                callBack:function(){
                                    console.log("cargó animacion p3 celebrando")
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    //datos delos demás celebrando
    
    if(skip_intro){
        //inicio adelantado
        prepareEscenario2()
        setEscenario2()
    
        getE('loader').className = 'loader-state-1 loader-off'
        getE('encendido').className = 'encendido-on'
        audio_tv_encendido_on.play()
    
        animacion_encendido = setTimeout(function(){
            clearTimeout(animacion_encendido)
            animacion_encendido = null
    
            getE('encendido').className = 'encendido-on encendido-hidden'
        },1000)
        //inicio adelantado
    }else{
        //colocar transición
        setTransicion({text:'Vamos a comenzar',callBack:function(){

            //al finalizar la transición
            setEscenario1()

        }})

        getE('loader').className = 'loader-state-1 loader-off'
        getE('encendido').className = 'encendido-on'
        audio_tv_encendido_on.play()

        animacion_encendido = setTimeout(function(){
            clearTimeout(animacion_encendido)
            animacion_encendido = null

            getE('encendido').className = 'encendido-on encendido-hidden'
        },1000)
    }
}

var current_interactiva = 0
var audio_interactiva = null
function finalizarInteractiva(){
    if(current_interactiva==1){
        unsetInteractiva({
            preBack: function(){
                prepareEscenario1()
            },
            callBack: function(){
                audio_intro_aplausos.play()

                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,1,false,function(){
                    getE('presentadora').className = 'presentadora-habla-set'
                    playAnimation(1,null,true,1,false,null,70)

                    audio_global = audio_intro2;
                    audio_intro2.play()
                    audio_intro2.onended = function(){
                        stopAnimation(1)
                        audio_intro2.onended = null
                        audio_global = null;

                        getE('presentadora').className = 'presentadora-saca-set'

                        playAnimation(0,null,false,10,true)

                        animacion_escenario_out = setTimeout(function(){
                            clearTimeout(animacion_escenario_out)
                            animacion_escenario_out = null

                            audio_intro_aplausos.pause()
                            getE('escenario-1-vid').pause()

                            //colocar transición
                            setTransicion({
                                text:'¡Prepárate!',
                                preBack:function(){
                                    //ocultar escenario 1
                                    unsetEscenario1()
                                    prepareEscenario2()
                                },
                                callBack:function(){
                                    //al finalizar la transición
                                    //poner escenario 2
                                    setEscenario2()
        
                                }
                            })
                            
                        }, 1000)
                    }
                })
            }
        })
    }else if(current_interactiva==2){
        unsetInteractiva({
            preBack: function(){
                
            },
            callBack: function(){
                setPdf({
                    title:'Consulta más información en...',
                    href:'assets/docs/clasificacion_peligros/documento.pdf',
                    audiosrc:'assets/docs/clasificacion_peligros/audio.mp3',
                    next:{
                        tipo:'informacion',
                        src:'informacion_2',
                        end:{
                            tipo:'comercial',
                            src:'accidente_de_trabajo_enfermedad_laboral_incidente',
                            end:{
                                tipo:'informacion',
                                src:'informacion_3',
                                end:{
                                    tipo:'interactiva',
                                    src:'sopa/index.html',
                                    int:3,
                                    end:null
                                }
                            }
                        }
                    }
                })
            }
        })
    }else if(current_interactiva==3){
        unsetInteractiva({
            preBack: function(){
                prepareEscenario1()
            },
            callBack: function(){
                audio_intro_aplausos.play()

                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,1,false,function(){
                    getE('presentadora').className = 'presentadora-habla-set'
                    playAnimation(1,null,true,1,false,null,70)

                    audio_global = retroalimentacion_interactiva_3;
                    retroalimentacion_interactiva_3.play()
                    retroalimentacion_interactiva_3.onended = function(){
                        stopAnimation(1)
                        retroalimentacion_interactiva_3.onended = null
                        audio_global = null;

                        getE('presentadora').className = 'presentadora-saca-set'

                        playAnimation(0,null,false,10,true, function(){
                            audio_intro_aplausos.pause()
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
        })
    }else if(current_interactiva==4){
        unsetInteractiva({
            preBack: function(){
                prepareEscenario1()
            },
            callBack: function(){
                audio_intro_aplausos.play()

                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,1,false,function(){
                    getE('presentadora').className = 'presentadora-habla-set'
                    playAnimation(1,null,true,1,false,null,70)

                    audio_global = retroalimentacion_interactiva_4;
                    retroalimentacion_interactiva_4.play()
                    retroalimentacion_interactiva_4.onended = function(){
                        stopAnimation(1)
                        retroalimentacion_interactiva_4.onended = null
                        audio_global = null;

                        getE('presentadora').className = 'presentadora-saca-set'

                        playAnimation(0,null,false,10,true, function(){
                            audio_intro_aplausos.pause()
                            getE('escenario-1-vid').pause()

                            setPdf({
                                title:'Consulta más información en...',
                                href:'assets/docs/identificacion_peligros/documento.pdf',
                                audiosrc:'assets/docs/identificacion_peligros/audio.mp3',
                                next:{
                                    tipo:'comercial',
                                    src:'que_hacer_antes_de_ejecutar_una_actividad',
                                    end:{
                                        tipo:'interactiva',
                                        src:'5_reglas_oro/index.html',
                                        int:5
                                    }
                                }
                            })
                        })
                    }
                })
            }
        })
    }else if(current_interactiva==5){
        unsetInteractiva({
            preBack: function(){
                current_interactiva = 6
                setInteractiva({src:'jerarquia_control_riesgos/index.html'})
            },
            callBack: function(){
                
            }
        })
    }else if(current_interactiva==8){
        unsetInteractiva({
            preBack: function(){
                prepareEscenario1()
            },
            callBack: function(){
                audio_intro_aplausos.play()

                getE('presentadora').className = 'presentadora-saca-set'
                playAnimation(0,null,false,1,false,function(){
                    getE('presentadora').className = 'presentadora-habla-set'
                    playAnimation(1,null,true,1,false,null,70)

                    audio_global = retroalimentacion_interactiva_8;
                    retroalimentacion_interactiva_8.play()
                    retroalimentacion_interactiva_8.onended = function(){
                        stopAnimation(1)
                        retroalimentacion_interactiva_8.onended = null
                        audio_global = null;

                        getE('presentadora').className = 'presentadora-saca-set'

                        playAnimation(0,null,false,10,true, function(){
                            audio_intro_aplausos.pause()
                            getE('escenario-1-vid').pause()
                            
                            setTransicion({
                                text:'¡Ya regresamos!',
                                preBack:function(){
                                    setComercial({
                                        src:'assets/media/sistema_de_gestion_ambiental.mp4',
                                        ended:function(){
                                            setTransicion({text:'Siguiente Pregunta',
                                                preBack: function(){
                                                    unsetComercial()
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
                            })
                        })
                    }
                })
            }
        })
    }else{
        //6,7,9,10
        setTransicion({text:'Siguiente Pregunta',
            preBack: function(){
                removeInteractiva()
                unsetEscenario1()
                prepareEscenario2()
            },
            callBack: function(){
                nextPregunta()
            }
        })
    }
}

function updateBoard(ganador){
    getE('puntaje-'+personajes_info[0].id).innerHTML = personajes_info[0].score
    getE('puntaje-'+personajes_info[1].id).innerHTML = personajes_info[1].score
    getE('puntaje-'+personajes_info[2].id).innerHTML = personajes_info[2].score
    
    var row = getE('puntaje-'+personajes_info[ganador].id).parentNode
    row.className = 'tablero-row puntaje-ganador'
}

function clearBoard(hide){
    if(hide){
        getE('tablero').className = 'tablero-off'
    }
    var puntajes_row = getE('tablero-col').getElementsByClassName('tablero-row')
    for(i = 0;i<puntajes_row.length;i++){
        puntajes_row[i].className = 'tablero-row'
    }
}

function setFinal(){
    //mirar ganador  
    var primer_lugar = 0
    var segundo_lugar = 0
    var tercer_lugar = 0

    var mayor = -1
    var mayor_ind = -1

    for(i = 0;i<personajes_info.length;i++){
        if(personajes_info[i].score>mayor){
            mayor = personajes_info[i].score
            mayor_ind = i
        }
    }
    primer_lugar = mayor_ind

    mayor = -1
    mayor_ind = -1
    for(i = 0;i<personajes_info.length;i++){
        if(personajes_info[i].score>mayor&&i!=primer_lugar){
            mayor = personajes_info[i].score
            mayor_ind = i
        }
    }
    segundo_lugar = mayor_ind

    mayor = -1
    mayor_ind = -1
    for(i = 0;i<personajes_info.length;i++){
        if(personajes_info[i].score>mayor&&i!=primer_lugar&&i!=segundo_lugar){
            mayor = personajes_info[i].score
            mayor_ind = i
        }
    }
    tercer_lugar = mayor_ind

    console.log(primer_lugar,segundo_lugar,tercer_lugar)

    setTransicion({
        text:'¡Hemos terminado!',
        preBack:function(){
            unsetComercial()
            clearBoard(true)
            prepareEscenario1()
            getE('personajes').className = 'personajes-shown personajes-small'
            audio_ending.play()
            audio_intro_aplausos.play()
            audio_intro_aplausos.loop
            audio_intro_aplausos.volume = 0.5
        },
        callBack:function(){
            getE('personaje-'+personajes_info[primer_lugar].id).className = 'personaje-celebra-set posicion-personaje-1'
            playAnimation(personajes_info[primer_lugar].animations[3],null,true,1)
            getE('personaje-'+personajes_info[segundo_lugar].id).className = 'personaje-celebra-set posicion-personaje-2'
            playAnimation(personajes_info[segundo_lugar].animations[3],null,true,17)
            getE('personaje-'+personajes_info[tercer_lugar].id).className = 'personaje-celebra-set posicion-personaje-3'
            playAnimation(personajes_info[tercer_lugar].animations[3],null,true,34)

            getE('presentadora').className = 'presentadora-saca-set'
            playAnimation(0,null,false,1,false,function(){
                getE('presentadora').className = 'presentadora-habla-set'
                playAnimation(1,null,true,1,false,null,70)

                audio_final.play()
                audio_final.onended = function(){
                    audio_final.onended = null

                    stopAnimation(1)
                    getE('presentadora').className = 'presentadora-saca-set'

                    playAnimation(0,null,false,10,true, function(){
                        getE('presentadora').className = 'presentadora-celebra-set'
                        playAnimation(13,null,true)
                    })
                }
            })

        }
    })
}