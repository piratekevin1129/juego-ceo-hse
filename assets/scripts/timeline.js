var animacion_timeline = null
var timeline_video_duration = 0
var timeline_video_status = ''
var has_text = -1

function setTimeline(duracion){
    getE('timeline').className = 'timeline-on'
    timeline_video_duration = duracion
    getE('tl-duration').innerHTML = '00:00/'+formatTime(timeline_video_duration)
    timeline_video_status = 'playing'

    has_text = -1

    animacion_timeline = setInterval(function(){
        var current = getE('comercial-vid').currentTime
        var percent = (current*100)/timeline_video_duration
        var percent2 = Math.floor(percent*10)/10
        
        getE('tl-playbar-status').style.width = percent2+'%'
        getE('tl-duration').innerHTML = formatTime(current)+'/'+formatTime(timeline_video_duration)

        //checkcc
        var is_text = -1
        if(cc_data.length>0){
            for(var c = 0;c<cc_data.length;c++){
                if(current>=cc_data[c].start_time&&current<=cc_data[c].end_time){
                    is_text = c
                }
            }
            if(is_text!=-1){
                if(is_text!=has_text){
                    getE('cc_text').innerHTML = cc_data[is_text].text
                    has_text = is_text
                }else{
                    //siguen en el mismo texto
                }
            }else{
                console.log()
                getE('cc_text').innerHTML = '...'
            }
        }
    },10)
}

function unsetTimeline(){
    clearInterval(animacion_timeline)
    animacion_timeline = null
    timeline_video_duration = 0
    timeline_video_status = ''
    getE('timeline').className = 'timeline-off'
    getE('cc_text').className = 'cc_text_off'
}

function clickTimeline(event){
    var posx = event.pageX
    var px = posx-getE('tl-playbar').getBoundingClientRect().left
    var total = getE('tl-playbar').getBoundingClientRect().width

    var percent = (px*100)/total
    var percent2 = (percent*timeline_video_duration)/100
    var percent3 = Math.floor(percent2*10)/10
    
    getE('comercial-vid').currentTime = percent3
}

function handleVideo(){
    if(timeline_video_status=='playing'){
        getE('tl-play-btn').className = 'tl-play-paused'
        timeline_video_status = 'paused'
        getE('comercial-vid').pause()
    }else if(timeline_video_status=='paused'){
        getE('tl-play-btn').className = 'tl-play-playing'
        timeline_video_status = 'playing'
        getE('comercial-vid').play()
    }
}

function formatTime(time){
    var minutos = parseInt(time/60)
    var segundos = parseInt(time-(minutos*60))

    var m = minutos
    var s = segundos
    if(minutos<=9){
        m = '0'+minutos
    }
    if(segundos<=9){
        s = '0'+segundos
    }
    return String(m+':'+s)
}