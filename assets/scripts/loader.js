var total_loader = (data_preguntas.length)+33 //33 audios independientes
var current_loader = 0
function loaderUpdate(){
    current_loader++
    var loader_width = Math.round((current_loader*100)/total_loader)

    getE('loader-text').innerHTML = loader_width+'%'

}