var interactiva_callback = null
var interactiva_preback = null

function setInteractiva(data){
    if(data.callBack!=null&&data.callBack!=undefined){
        interactiva_callback = data.callBack
    }else{
        interactiva_callback = null
    }
    
    getE('interactiva-data').src = 'assets/content/'+data.src
    getE('interactiva').className = 'interactiva-on'

    if(interactiva_callback!=null&&interactiva_callback!=null){
        interactiva_callback()
    }
}

function unsetInteractiva(data){
    if(data.callBack!=null&&data.callBack!=undefined){
        interactiva_callback = data.callBack
    }else{
        interactiva_callback = null
    }

    if(data.preBack!=null&&data.preBack!=undefined){
        interactiva_preback = data.preBack
    }else{
        interactiva_preback = null
    }

    setCortina({
        preBack: function(){
            removeInteractiva()

            if(interactiva_preback!=null&&interactiva_preback!=undefined){
                interactiva_preback()
            }
        },
        callBack: function(){
            if(interactiva_callback!=null&&interactiva_callback!=undefined){
                interactiva_callback()
            }
        }
    })
    
}

//remueve la interactiva sin cortina
function removeInteractiva(){
    getE('interactiva-data').src = ""
    getE('interactiva').className = 'interactiva-off'
}