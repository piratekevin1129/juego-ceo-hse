var animacion_pdf = null

function setPdf(data){
    getE('pdf').className = 'pdf-on'

    getE('pdf-title').innerHTML = data.title
    getE('pdf-link').href = data.href

    if(data.next==null){
        getE('pdf-button').onclick = function(){
            data.callBack()
    
            getE('pdf').className = 'pdf-off'
        }
    }else{
        getE('pdf-button').onclick = function(){
            if(data.next.tipo=='comercial'){
                setCortina({
                    preBack: function(){
                        clearBoard(false)
                        setPersonajesQuietos(true)
                        setComercial({
                            src:'assets/media/'+data.next.src+'.mp4',
                            ended:function(){
                                if(data.next.end==null){
                                    continuarConcurso2()
                                }else{
                                    if(data.next.end.tipo=='interactiva'){
                                        setCortina({
                                            preBack: function(){
                                                unsetComercial()
                                                current_interactiva = data.next.end.int
                                                setInteractiva({src:data.next.end.src})
                                            }
                                        })
                                    }else if(data.next.end.tipo=='informacion'){
                                        setCortina({
                                            preBack: function(){
                                                unsetComercial()
                                                setInformacion({src:data.next.end.src,end:data.next.end.end})
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    }
                })
            }else if(data.next.tipo=='informacion'){
                setCortina({
                    preBack: function(){
                        //ocultar escenario 2
                        unsetEscenario2()
                    },
                    callBack: function(){
                        setInformacion({
                            src:data.next.src,
                            end:data.next.end
                        })
                    }
                })
            }
            getE('pdf').className = 'pdf-off'
        }
    }
}