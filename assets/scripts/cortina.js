var animacion_cortina = null
var cortina_callback = null
var cortina_preback = null

function setCortina(data){
    if(data.callBack!=null&&data.callBack!=null){
        cortina_callback = data.callBack
    }else{
        cortina_callback = null
    }

    if(data.preBack!=null&&data.preBack!=null){
        cortina_preback = data.preBack
    }else{
        cortina_preback = null
    }

    getE('cortina').className = 'cortina-on cortina-in'
    audio_cortina.play()

    animacion_cortina = setTimeout(function(){
        clearTimeout(animacion_cortina)
        animacion_cortina = null

        if(cortina_preback!=null){
            cortina_preback()
        }
        
        getE('cortina').className = 'cortina-off cortina-out'
    
        animacion_cortina = setTimeout(function(){
            clearTimeout(animacion_cortina)
            animacion_cortina = null

            if(cortina_callback!=null&&cortina_callback!=null){
                cortina_callback()
            }
        },1500)
    },1500)
}