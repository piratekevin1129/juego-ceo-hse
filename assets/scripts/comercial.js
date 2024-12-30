var comercial_ended = null
var cc_data = []

function setComercial(data){
    if(data.ended!=null&&data.ended!=undefined){
        comercial_ended = data.ended
    }else{
        comercial_ended = null
    }

    //buscar cc
    var cc_data_ind = findCC(data.src)
    if(cc_data_ind!=-1){
        cc_data = cc[cc_data_ind].cc
        getE('cc_text').className = 'cc_text_on'
        getE('cc_text').innerHTML = '...'
    }else{
        cc_data = []
        getE('cc_text').className = 'cc_text_off'
    }
    
    getE('comercial').className = 'comercial-on'
    
    getE('comercial-vid-src').src = data.src
    getE('comercial-vid').load()
    getE('comercial-vid').onloadeddata = function(){
        getE('comercial-vid').onloadeddata = null

        getE('comercial-vid').play()
        setTimeline(getE('comercial-vid').duration)

        getE('comercial-vid').onended = function(){
            getE('comercial-vid').onended = null

            if(comercial_ended!=null&&comercial_ended!=undefined){
                comercial_ended()
            }
        }
    }
}

function unsetComercial(){
    getE('comercial').className = 'comercial-off'
    getE('comercial-vid-src').src = ''
    unsetTimeline()
}

function findCC(url){
    var is_cc = -1
    for(var c = 0;c<cc.length;c++){
        if(url.indexOf(cc[c].nombre)!=-1){
            is_cc = c
        }
    }
    return is_cc
}