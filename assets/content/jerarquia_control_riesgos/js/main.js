$(document).ready(() => {
    // parent.unsetLoader()

	setTimeout(() => {
        $(".contenedor__superior").css({
            transform: 'translate(0px, 0)'
        });
    }, 100);

    setTimeout(() => {
        $(".contenedor__superior-titulo p:first-child").css({
            transform: 'translate(0px, 0)'
        });
        
        $("#audio_inicial")[0].play();
    }, 400);

    setTimeout(() => {
        $(".contenedor__superior-titulo p:last-child").css({
            transform: 'translate(0px, 0)'
        });

        $(".contenedor__superior-texto p").css({
            opacity: 1
        });
    }, 500);
setTimeout(() => {
    	$(".contenedor__inferior-imagen").css({
            transform: 'scale(1)'
        });
    }, 700);

    const es_zona = $("#es_zona");
    const clicks = $(".clicks");
    let texto;

    clicks.mousemove((e) => {
        texto = $(e.target).data('texto');

        es_zona.css({
            display: 'block',
            left: `${ e.clientX - 25 }px`,
            top: `${ e.clientY - 25 }px`,
        });
    });

    es_zona.mouseleave((e) => {
        es_zona.css({
            display: 'none'
        });
    });

    es_zona.click(() => {
        mostrarTextos(texto);
    })

    clicks.click((e) => {
        console.log("e.target: "+e.target)
        mostrarTextos($(e.target).data('texto'));
    });

    let textosVistos = [];

    $("#accordion").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });

    $("#accordion h3").click((e) => {
        $.each($('.audios'), (index, audio) => {
            audio.pause(); 
            audio.currentTime = 0;
        });

        texto = $(e.target).data('texto');

        textosVistos.push(texto);

        $(`#audio_${ texto }`)[0].play();

        final();
    });

    const mostrarTextos = (texto) => {
        let width = window.innerWidth;

        var eltexto=1;
        if(texto=="texto_5"){
            eltexto=5;
            $(`#click_${eltexto}`).css('display', 'none');
        }else if(texto=="texto_4"){
            eltexto=4;
            $(`#click_${eltexto}`).css('display', 'none');
        }else if(texto=="texto_3"){
            eltexto=3;
            $(`#click_${eltexto}`).css('display', 'none');
        }else if(texto=="texto_2"){
            eltexto=2;
            $(`#click_${eltexto}`).css('display', 'none');
        }else if(texto=="texto_1"){
            eltexto=1;
            $(`#click_${eltexto}`).css('display', 'none');
        }

        $.each($('.audios'), (index, audio) => {
            audio.pause(); 
            audio.currentTime = 0;
        });

        textosVistos.push(texto);

        setTimeout(() => {
            if($(`#audio_${ texto }`)[0] != undefined){
                $(`#audio_${ texto }`)[0].play();
            }
        }, 500);
        
        if(width < 767){
            $(`.pasos`).css('opacity', 0);
            $(`#img_${ texto }`).css('opacity', 1);

            $(".contenedor__inferior-texto").removeClass('active');
            $(".contenedor__inferior-texto").css('display', 'none');
            $(`#${ texto }`).css('display', 'block');

            setTimeout(() => {
                $(`#${ texto }`).addClass('active');
            }, 10);
        }else{
            $(`.pasos`).css('opacity', 0);
            $(`#img_${ texto }`).css('opacity', 1);

            // $(".contenedor__inferior-texto").removeClass('active');
            $(`#${ texto }`).css('display', 'flex');

            setTimeout(() => {
                $(`#${ texto }`).addClass('active');
                
                $(".mientras").removeClass('active');
            }, 500);
        }

        final();
    }

    const final = () => {
        let dataArr = new Set(textosVistos);
        let result = [...dataArr];

        if(result.length == 5){
            $("#continuar-btn").removeClass('continuar-btn-off');
            $("#continuar-btn").addClass('continuar-btn-on');
        }
    }
});

function cerrartexto(){
    setTimeout(() => {
        $(".contenedor__inferior-texto").removeClass('active');
    }, 10);
}


function clickContinuar(){
    parent.finalizarInteractiva()
}