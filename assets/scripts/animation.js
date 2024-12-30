var a = 0;
var animations = []

function loadImg(data){
    var img = new Image()
    if(data.extra!=null&&data.extra!=undefined){
        img.setAttribute('f',data.extra.f)
    }
    img.onload = function(){
        img.onload = null
        img.onerror = null
        data.callBack(img)
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        data.callBack(null)
        console.log("error loading img: "+img.src)        
    }
    img.src = data.src
}

var a_f = 1
var a_callback = null
var a_callback_frames = null
var a_total_frames = 0
var a_frames_loaded = 0
var a_folder = ''
var a_type = 'png'
var a_pos = 0
var a_canv = null
var a_width = 0
var a_height = 0
var a_divid = null
var a_ext = ''
var a_pre = ''
var a_extra = null
var a_extra_frames = 0
var a_async = null

function loadAnimation(data){
    a_callback = data.callBack
    a_total_frames = data.total
    a_f = 1
    a_folder = data.folder
    a_pos = data.pos
    a_canv = document.getElementById(data.canv)
    a_divid = document.getElementById(data.idname)

    var a_percent = 0
    if(data.realh=='auto'&&data.realw=='auto'){
        a_width = data.width
        a_height = data.height
    }else{
        if(data.realh=='auto'&&data.realw!='auto'){
            a_width = data.realw
            a_percent = (data.realw*100)/data.width
            a_height = (data.height*a_percent)/100
        }
        if(data.realw=='auto'&&data.realh!='auto'){
            a_height = data.realh
            a_percent = (data.realh*100)/data.height
            a_width = (data.width*a_percent)/100
        }else{
            //tamaños definidos
            a_width = data.width
            a_height = data.height
        }
    }

    //a_width = data.width
    //a_height = data.height

    a_canv.width = a_width
    a_canv.height = a_height

    var ctx = a_canv.getContext('2d')

    a_type = 'png'
    if(data.type!=null&&data.type!=undefined){
        a_type = data.type
    }
    a_ext = ''
    if(data.ext!=null&&data.ext!=undefined){
        a_ext = data.ext
    }
    a_pre = ''
    if(data.pre!=null&&data.pre!=undefined){
        a_pre = data.pre
    }

    a_extra = false
    if(data.extra!=null&&data.extra!=undefined){
        a_extra = data.extra
        a_extra_frames = data.extraframes
    }
    a_extra_frames = 25
    if(data.extraframes!=null&&data.extraframes!=undefined){
        a_extra_frames = data.extraframes
    }

    a_async = false
    if(data.async!=null&&data.async!=undefined){
        a_async = data.async
    }

    a_callback_frames = function(){
        ctx.drawImage(animations[a_pos].frames[0].img,0,0,animations[a_pos].w,animations[a_pos].h)
        a_callback()
    }

    animations[a_pos] = {
        pos:a_pos,
        f:0,
        ctx:ctx,
        w:a_width,
        h:a_height,
        folder:a_folder,
        frames:[],
        animacion:null,
        status:'stopped',
        frames_loaded:a_frames_loaded,
        frames_total:a_total_frames
    }
    
    if(!a_async){
        loadFrame()
    }else{
        for(a_f = 1;a_f<=a_total_frames;a_f++){
            loadImg({src:a_folder+'/'+a_pre+a_f+a_ext+'.'+a_type,callBack:function(data){
                var get_f = data.getAttribute('f')
                animations[a_pos].frames[get_f-1] = {img:data}
                animations[a_pos].frames_loaded++
                loaderUpdate()
                loadedFramesAsync()
            },extra:{f:a_f}})
        }
    }
}

function loadedFramesAsync(){
    if(animations[a_pos].frames_loaded==animations[a_pos].frames_total){
        if(a_extra){
            checkExtra()
        }
        a_callback_frames()
    }
}

function checkExtra(){
    //llenar frames hasta los frames extras proporcionados
    var last_frame = animations[a_pos].frames[animations[a_pos].frames.length-1]
    for(var ex = 1;ex<=a_extra_frames;ex++){
        animations[a_pos].frames.push(last_frame)
    }
}

function loadFrame(){
    if(a_f>a_total_frames){
        if(a_extra){
            checkExtra()
        }
        a_callback_frames()
    }else{
        loadImg({src:a_folder+'/'+a_pre+a_f+a_ext+'.'+a_type,callBack:function(data){
            animations[a_pos].frames.push({img:data})
            a_f++
            loaderUpdate()
            loadFrame()
        }})
    }
}

function playAnimation(pos,limit,loop,start = 1,reverse = false,callBack = null,framerate = 50){
    animations[pos].f = (start-1);
    animations[pos].status = 'playing'
    animations[pos].animacion = setInterval(function(){
        if(status_juego){
            if(animations[pos].f==limit){
                //console.log("final")
                stopAnimation(pos)
                
                if(callBack!=null){
                    callBack()
                }
            }else{
                //console.log(animations[pos].f)
                animations[pos].ctx.clearRect(0,0,animations[pos].w,animations[pos].h)
        
                animations[pos].ctx.drawImage(animations[pos].frames[animations[pos].f].img,0,0,animations[pos].w,animations[pos].h)
                if(reverse){
                    animations[pos].f--
                    if(animations[pos].f==-1){
                        if(loop){
                            animations[pos].f = (animations[pos].frames.length-1)
                        }else{
                            animations[pos].f = 0
                            stopAnimation(pos)
        
                            if(callBack!=null){
                                callBack()
                            }
                        }
                    }
                }else{
                    animations[pos].f++
                    if(animations[pos].f==animations[pos].frames.length){
                        if(loop){
                            animations[pos].f = 0
                        }else{
                            animations[pos].f = (animations[pos].frames.length-1)
                            stopAnimation(pos)
        
                            if(callBack!=null){
                                callBack()
                            }
                        }
                    }
                }
        
            }
        }
    },framerate)
}

function stopAnimation(pos,reset){
    if(animations[pos].animacion!=null){
        clearInterval(animations[pos].animacion)
        animations[pos].animacion = null
        animations[pos].status = 'stopped'
    }
    if(reset!=null&&reset!=undefined){
        if(reset){
            animations[pos].ctx.clearRect(0,0,animations[pos].w,animations[pos].h)
            animations[pos].ctx.drawImage(animations[pos].frames[0].img,0,0,animations[pos].w,animations[pos].h)
        }
    }
}