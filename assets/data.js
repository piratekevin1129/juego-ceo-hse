var pregunta_actual = (1-1)
var skip_intro = false;
var fullscreen_enabled = false;

var data_preguntas = [
    {
        id:1,
        pregunta:'¿Es nuestro propósito proveer soluciones integrales, ofrecer productos y servicios de valor agregado?',
        tipo:'verdaderofalso',
        opciones:[
            'Si',
            'No'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt: "Porque nuestro propósito es proveer soluciones energéticas,",
            start: 0,
            end: 3.5
        }, {
            txt: "ofrecer productos y servicios de valor agregado,",
            start: 3.5,
            end: 6.3
        }, {
            txt: "generando valor económico, social y ambiental",
            start: 6.3,
            end: 9.5
        }, {
            txt: "a nuestras partes interesadas,",
            start: 9.5,
            end: 11.3
        }, {
            txt: "centrados en el ser humano como el eje fundamental",
            start: 11.3,
            end: 14.2
        }, {
            txt: "de todas nuestras actuaciones",
            start: 14.2,
            end: 17
        }],
        next:null
    },

    {
        id:2,
        pregunta:'Desarrollamos nuestras actividades enmarcadas en la ética, las mejores prácticas de gobierno corporativo, derechos humanos, gestión de riesgos, la gestión de activos, mejoramiento continuo, seguridad, preservación del ambiente, el bienestar y la salud de nuestra gente, la legislación, las normas y los más altos estándares aplicables.',
        tipo:'verdaderofalso',
        opciones:[
            'Si es correcto',
            'No es correcto'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:3,
        pregunta: 'Esto nos motiva a trabajar en los siguientes compromisos:',
        tipo:'opcionmultiple',
        opciones:[
            'Propiciar el rendimiento esperado y el crecimiento sostenido a través de una efectiva identificación de oportunidades y la gestión de las inversiones y los recursos, acorde con los niveles de riesgo.',
            'Prestar servicios confiables y de calidad acorde con los requerimientos de los clientes, mediante la aplicación de altos estándares nacionales e internacionales, la gestión efectiva de los riesgos y el mejoramiento continuo de nuestros procesos.',
            'Garantizar la seguridad de las operaciones, proporcionando las condiciones adecuadas y promoviendo  la participación y consulta de los trabajadores para la prevención y los comportamientos sanos y seguros.',
            'Todas las opciones son correctas'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt: 'Además de los compromisos antes descritos no podemos olvidar:',
            start: 0,
            end: 4.1
        }, {
            txt: 'Gestionar de forma integral el ciclo de vida de nuestros activos con enfoque en',
            start: 4.1,
            end: 8.5
        }, {
            txt: 'generar valor agregado a la Empresa, optimizando los beneficios de las inversiones',
            start: 8.5,
            end: 13.3
        }, {
            txt: 'de capital, costos operacionales y los indicadores de desempeño.',
            start: 13.3,
            end: 17.5
        }, {
            txt: 'Promover el bienestar, la salud y el desarrollo integral de nuestra gente, en el marco',
            start: 17.5,
            end: 23
        }, {
            txt: 'de una cultura organizacional centrada en principios y valores y en un ambiente de',
            start: 23,
            end: 27.5
        }, {
            txt: 'trabajo saludable.',
            start: 27.5,
            end: 28.8
        }, {
            txt: 'Fortalecer la cultura ambiental entre nuestros grupos de interés, promoviendo la',
            start: 28.8,
            end: 34.1
        }, {
            txt: 'prevención y la mitigación de los impactos de nuestra operación y el uso racional de',
            start: 34.1,
            end: 38.6
        }, {
            txt: 'los recursos; dando prioridad a la reducción, reutilización y aprovechamiento de los',
            start: 38.6,
            end: 44.5
        }, {
            txt: 'residuos generados.',
            start: 44.5,
            end: 46.4
        }, {
            txt: 'Construir y mantener relaciones comerciales con proveedores y contratistas, bajo',
            start: 46.4,
            end: 51
        }, {
            txt: 'condiciones justas y transparentes, homologando modelos de gestión operacional.',
            start: 51,
            end: 55.9
        }, {
            txt: 'Aportar al mejoramiento de la calidad de vida de las regiones en donde',
            start: 55.9,
            end: 59.8
        }, {
            txt: 'desarrollamos nuestras operaciones, mediante prácticas de gestión social.',
            start: 59.8,
            end: 63.4
        }, {
            txt: 'Asegurar la consulta y participación de los diferentes actores internos y externos, los',
            start: 63.4,
            end: 68.9
        }, {
            txt: 'aspectos significativos, incluidos entre otros; los cambios, los nuevos requisitos y las',
            start: 68.9,
            end: 75.5
        }, {
            txt: 'especificaciones que impacten el desarrollo de los procesos.',
            start: 75.5,
            end: 80
        }],
        next:null
    },

    {
        id:4,
        pregunta: '¿Dónde podemos consultar la Política Corporativa Integrada?',
        tipo: 'opcionmultiple',
        opciones:[
            'Kawak',
            'Agenda corporativa y Página web',
            'A y B son correctas',
            'Publicadas en recepción'
        ],
        correcta:3,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt:"Veamos la siguiente nota patrocinada antes de continuar",
            start:0,
            end:4
        }],
        next:{
            tipo:'comercial',
            src:'ya_conoces_la_herramienta_de_gestion_kawak',
            end:{
                tipo:'pdf',
                data:{
                    title:'Consulta más información en...',
                    href:'assets/docs/kawak/documento.pdf',
                    audiosrc:'assets/docs/kawak/audio.mp3',
                    next:{
                        tipo:'comercial',
                        src:'sst-hse_2',
                        end:null
                    }
                }
            }
        }
    },

    {
        id:5,
        pregunta:'Teniendo en cuenta la nota que acabamos de escuchar, el objetivo del proceso de gestión HSE es:',
        tipo:'opcionmultiple',
        opciones:[
            'Identificar los riesgos a los que están expuestos los colaboradores',
            'Determinar los aspectos asociados a sus labores para prevenir, mejorar y conservar la salud de las personas y las condiciones del ambiente laboral.',
            'Proteger la seguridad y salud en todos los trabajadores, mediante la mejora continua',
            'A y B son correctas'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt:"Hemos llegado a la sección de",
            start:0,
            end:2.16
        },{
            txt:"Definiciones sistema de seguridad de trabajo",
            start:2.16,
            end:5.2
        },{
            txt:"y para comprender la información",
            start:5.2,
            end:7.16
        },{
            txt:"te invitamos primero a relacionar",
            start:7.16,
            end:8.9
        },{
            txt:"los enunciados de la derecha",
            start:8.9,
            end:10.5
        },{
            txt:"con los que se encuentran a la izquierda",
            start:10.5,
            end:12.8
        }],
        next:{
            tipo:'interactiva',
            src:'emparejamiento/index.html?data=1',
            int:2,
            end:null
        }
    },

    {
        id:6,
        pregunta:'Fortalecer la cultura ambiental entre nuestros grupos de interés, promoviendo la prevención y la mitigación de los impactos de nuestra operación y el uso racional de los recursos; dando prioridad a la reducción, reutilización y aprovechamiento de los residuos generados',
        tipo:'opcionmultiple',
        opciones:[
            'Política corporativa integrada',
            'Política de seguridad vial',
            'Política de control de sustancias psicoactivas'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:7,
        pregunta:'La COMPAÑÍA ENERGÉTICA DE OCCIDENTE S.A.S E.S.P, se compromete a diseñar, definir e implementar actividades de promoción y prevención de accidentes de tránsito en vías urbanas y rurales por donde transitan los colaboradores de la Compañía',
        tipo:'opcionmultiple',
        opciones:[
            'Política corporativa integrada',
            'Política de seguridad vial',
            'Política de control de sustancias psicoactivas'
        ],
        correcta:2,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt:"Un día seguro, seguro es un gran día",
            start:0,
            end:4
        }],
        next:{
            tipo:'pdf',
            data:{
                title:'Consulta más información en...',
                href:'assets/docs/politicas_objetivos/documento.pdf',
                audiosrc:'',
                next:{
                    tipo:'comercial',
                    src:'sabe_usted_cuales_son_sus_responsabilidades_dentro_del_sg-sst',
                    end:{
                        tipo:'informacion',
                        src:'informacion_4',
                        end:{
                            tipo:'interactiva',
                            src:'emparejamiento/index.html?data=2',
                            int:4,
                            end:null
                        }
                    }
                }
            }
        }
    },

    {
        id:8,
        pregunta: '¿Qué busca la resolución 5018 de 2019?:',
        tipo:'opcionmultiple',
        opciones:[
            'Regula condiciones laborales y protección de trabajadores en el sector eléctrico.',
            'Garantizar condiciones seguras para quienes trabajan en el sector eléctrico.',
            'Contiene disposiciones sobre distancias de seguridad, transporte, trabajo en alturas y elementos de protección individual.',
            'Todas las anteriores'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:9,
        pregunta: 'Las 5 reglas de oro son: desconexión, bloqueo, verificación de ausencia de tensión, puesta a tierra y corto circuito, señalización de área de trabajo',
        tipo:'verdaderofalso',
        opciones:[
            'Verdadero',
            'Falso'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:10,
        pregunta: '¿Cuál es la resolución que establece los requisitos mínimos para realizar trabajos en alturas?:',
        tipo:'opcionmultiple',
        opciones:[
            'Resolución 1072 de 2015',
            'Resolución 4272 de 2021',
            'Resolución 2020 de 2014'
        ],
        correcta:2,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:11,
        pregunta: 'Elementos de protección personal. Los elementos de protección personal, son:',
        tipo:'opcionmultiple',
        opciones: [
            'Un conjunto de elementos y dispositivos diseñados para proteger las partes del cuerpo que se encuentran expuestas a riesgos durante el ejercicio de una labor.',
            'Son normas mínimas de seguridad y de salud para la utilización por los trabajadores en el trabajo de equipos de protección individual',
            'Es cualquier equipo o dispositivo destinado para ser sujetado por el trabajador'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:12,
        pregunta: '¿Cuáles son las premisas que se deben tener en cuenta con los EPP?',
        tipo:'opcionmultiple',
        opciones: [
            'Ser de uso personal e intransferible.',
            'Están destinados a proteger la integridad física de las personas que lo usan.',
            'Estar certificados.',
            'Todas las anteriores'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt: 'Recuerda que los EPP no evitan los accidentes, solamente reducen sustancialmente el',
            start: 0,
            end: 5.5
        }, {
            txt: 'impacto o las consecuencias de un accidente o enfermedad laboral que podría ocasionar',
            start: 5.5,
            end: 10.3
        }, {
            txt: 'los agentes producidos dentro del entorno productivo.',
            start: 10.3,
            end: 13.3
        }, {
            txt: 'Dentro de los EPP más comunes encontramos el casco, las monogafas, los protectores',
            start: 13.3,
            end: 19
        }, {
            txt: 'auditivos, guantes, camisa manga larga, pantalón tipo industrial y botas con puntera.',
            start: 19,
            end: 24.5
        }, {
            txt: 'ADEMÁS DE ESTOS, SE USARÁN OTROS E.P.P. EN CASO DE EXISTIR PELIGROS EN EL',
            start: 24.5,
            end: 28.8
        }, {
            txt: 'TRABAJO QUE REQUIERAN DE SU USO.',
            start: 28.8,
            end: 31
        }],
        next:{
            tipo:'interactiva',
            src:'mecanismos_de_participacion',
            int:7
        }
    },

    {
        id:13,
        pregunta: 'Cuál de las siguientes acciones no pertenecen al ANTES durante un emergencia:',
        tipo:'opcionmultiple',
        opciones: [
            'Identifique las rutas de evacuación, salidas de emergencia de su área y los puntos de encuentro de la sede donde se encuentra.',
            'Identifique a los brigadistas de emergencia de su área.',
            'Refugiese en el triángulo de vida.',
            'Identifique un posible triángulo de la vida.'
        ],
        correcta:3,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:{
            tipo:'interactiva',
            src:'durante_una_emergencia/index.html',
            int:10
        }
    },

    {
        id:14,
        tipo:'verdaderofalso',
        pregunta: 'Es correcto decir que DESPUÉS de una emergencia debe dirigirse al punto de encuentro, permanecer con su grupo y su brigadista, sin dispersarse, esperando la instrucción del brigadista para regresar al edificio y hacerlo despacio y sin prisa:',
        opciones: [
            'Si, es correcto',
            'No, el enunciado el falso'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt: "Muy bien, no olvides las siguientes recomendaciones frente a una emergencia:",
            start: 0,
            end: 4.9
        }, {
            txt: "Los elementos de atención de emergencia son: extintores, botiquines, camillas,",
            start: 4.9,
            end: 10.6
        }, {
            txt: "inmovilizadores de cuello, señales de ruta de evacuación y salida de emergencia.",
            start: 10.6,
            end: 16.2
        }, {
            txt: "Los elementos de emergencia deben estar ubicados de tal manera que sea fácil",
            start: 16.2,
            end: 21
        }, {
            txt: "acceder a ellos.",
            start: 21,
            end: 22.4
        }, {
            txt: "Deben estar libres de obstáculos.",
            start: 22.4,
            end: 24.4
        }, {
            txt: "Las rutas de evacuación y salidas de emergencia",
            start: 24.4,
            end: 27.4
        }, {
            txt: "también deben estar libres de obstáculos.",
            start: 27.4,
            end: 29.9
        }, {
            txt: "Los botiquines deben estar en perfecto estado de orden y limpieza",
            start: 29.9,
            end: 34
        }],
        next:null
    },

    {
        id:15,
        tipo:'verdaderofalso',
        pregunta: '¿El objetivo de la salud en el trabajo es brindar herramientas que logren mejorar su calidad de vida de manera integral, detectar enfermedades oportunamente, siempre comprometidos con su bienestar y cuidando su salud?',
        opciones: [
            'Verdadero',
            'Falso'
        ],
        correcta:2,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:16,
        tipo:'verdaderofalso',
        pregunta: '¿La salud laboral es una actividad multidisciplinaria que promueve y protege de los accidentes a los proveedores?',
        opciones: [
            'Verdadero',
            'Falso'
        ],
        correcta:2,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:17,
        tipo:'opcionmultiple',
        pregunta: 'Los Sistemas de Vigilancia epidemiológica y programas de promoción de la salud y prevención de la enfermedad que CEO implementará comprometida con su salud y bienestar son:',
        opciones: [
            'Sistema de vigilancia epidemiológica osteomuscular y Psicosocial, y Programa de Riesgo Cardiovascular',
            'Programa de Riesgo Psicológico y Social',
            'Programas de promoción de la salud y prevención de la enfermedad, y Programa de conservación visual',
            'A y C son correctas'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:18,
        tipo:'opcionmultiple',
        pregunta: 'Para cuidar tu corazón debes:',
        opciones: [
            'Comer de manera equilibrada y saludable. Moderar el consumo de alcohol y dejar de fumar.',
            'Realizar actividad física diariamente.',
            'Realizar Chequeos médicos y controlar tu tensión arterial',
            'Todas las anteriores'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:19,
        tipo:'opcionmultiple',
        pregunta: 'Sistema de vigilancia Epidemiológica Osteomuscular. Para prevenir los trastornos musculoesqueléticos se debe:',
        opciones: [
            'Realizar ejercicios de estiramiento y calentamiento durante la jornada laboral. Evitar inclinaciones hacia adelante, arqueando la espalda, y hacia atrás, exagerando la curvatura de la espalda.',
            'Mantener la espalda recta y alineada, bien apoyada en el respaldo de la silla y evitando tensiones en los hombros.',
            'Establecer un ritmo de trabajo adecuado, con periodos de pausa y descanso, especialmente ante tareas repetitivas.',
            'Todas las anteriores'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:20,
        tipo:'verdaderofalso',
        pregunta: '¿Al levantar cargas manualmente, se deben mantener los pies separados, las piernas flexionadas y la espalda recta, sujetando la carga firme y suavemente y alzándose pegada al cuerpo?',
        opciones: [
            'Verdadero',
            'Falso'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:21,
        tipo:'verdaderofalso',
        pregunta: '¿Las PAUSAS ACTIVAS, son breves descansos durante la jornada laboral que sirven para recuperar energía, mejorar el desempeño y eficiencia en la casa, a través de 4 técnicas y ejercicios que te ayudarán a quitar la fatiga, trastornos psicológicos y prevenir el estrés?',
        opciones: [
            'Verdadero',
            'Falso'
        ],
        correcta:2,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },
    
    {
        id:22,
        tipo:'opcionmultiple',
        pregunta: 'Para cuidar y preservar su salud mental CEO cual de estas opciones NO debe tener en cuenta',
        opciones: [
            'Identificar, evaluar, prevenir, intervenir y monitorear los factores de riesgo psicosocial',
            'Establecer acciones de intervención que permitan el mejoramiento de las condiciones de salud y de trabajo.',
            'Prevenir los efectos en la salud generados por la exposición a factores de riesgo psicosocial',
            'Mejorar los efectos y acciones de riesgo en las personas emocionales'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },
    
    {
        id:23,
        tipo:'opcionmultiple',
        pregunta: 'Para prevenir riesgo Psicosocial debes:',
        opciones: [
            'Establece prioridades y decide qué cosas se deben hacer y qué cosas pueden esperar.',
            'Tomar tiempo para hacer actividades relajantes que disfrutes.',
            'Evitar pensar obsesivamente en los problemas.',
            'Todas las anteriores'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:24,
        tipo:'opcionmultiple',
        pregunta: '¿Cuál de los siguientes no es un beneficio de las técnicas de relajación?',
        opciones: [
            'Disminuyen la frecuencia cardíaca, presión arterial, frecuencia respiratoria y la tensión muscular',
            'Mejora la concentración y el estado de ánimo',
            'Mejorar y disminuir la respiración para disminuir la ira',
            'Mejora de la calidad del sueño'
        ],
        correcta:3,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:25,
        tipo:'opcionmultiple',
        pregunta: 'Para cuidar mi salud visual debo:',
        opciones: [
            'Consumir alimentos saludables ricos en vitaminas A, C, E.',
            'Utilizar los elementos de protección personal oculares.',
            'Trabajar con buena iluminación y relajar los ojos periódicamente a través de las pausas visuales.',
            'Todas las anteriores'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:26,
        tipo:'verdaderofalso',
        pregunta: 'El Programa de Promoción de la Salud y prevención de la enfermedad. Busca promover, fomentar y mantener la salud de los trabajadores de CEO, implementando estrategias que permitan generar un entorno de trabajo saludable, que promocionen la salud y se prevenga de manera oportuna la aparición de enfermedades que puedan afectar la calidad de vida y desempeño laboral de los trabajadores?',
        opciones: [
            'Verdadero',
            'Falso'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },
    
    {
        id:27,
        tipo:'verdaderofalso',
        pregunta: '¿Cuidamos tu salud con los beneficios de la Póliza de salud a través de los siguientes servicios: visitas en casa, hospitalización, ortesis y emergencias odontológicas?',
        opciones: [
            'Verdadero',
            'Falso'
        ],
        correcta:2,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:28,
        tipo:'opcionmultiple',
        pregunta: 'Los servicios ambulatorios que presta la póliza de salud son:',
        opciones: [
            'Exámenes especiales de diagnóstico y terapias, incluyendo domiciliarias',
            'Exámenes de laboratorio y Rx - Rutina y especializados, también consultas prioritarias, domiciliarias y con especialistas',
            'Solo Rx - Rutina y especializados con especialistas',
            'A y B son correctas'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:29,
        tipo:'verdaderofalso',
        pregunta: 'Reporta tus incapacidades a tiempo. Todo el personal que labora en CEO y es incapacitado por enfermedad de origen común, enfermedad laboral, accidente de trabajo, licencia de maternidad, paternidad o accidente de tránsito debe notificar el mismo día que se genera la incapacidad a su Jefe inmediato y a salud en el trabajo?',
        opciones: [
            'Verdadero',
            'Falso'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:{
            tipo:'informacion',
            src:'informacion_5',
            end:{
                tipo:'interactiva',
                src:'emparejamiento/index.html?data=3',
                int:8
            }
        }
    },
    
    {
        id:30,
        tipo:'verdaderofalsoimg',
        pregunta: 'Este esquema a qué proceso pertenece:',
        opciones: [
            'Plan de Gestión Integral de Residuos Sólidos - Peligrosos y no peligrosos',
            'Plan de Gestión Integral de Residuos Peligrosos'
        ],
        img:'esquema',
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt:"Plan de gestión integral de residuos sólidos peligrosos y no peligrosos",
            start:0,
            end:4.5
        },{
            txt:"Objetivo: establecer lineamientos para el manejo adecuado",
            start:4.5,
            end:8
        },{
            txt:"de los residuos sólidos generados",
            start:8,
            end:9.8
        },{
            txt:"garantizando cumplimiento de la normatividad",
            start:9.8,
            end:12.9
        },{
            txt:"No peligrosos:",
            start:12.9,
            end:15
        },{
            txt:"Ten presente las 3 R: reducir, reutilizar y reciclar",
            start:15,
            end:19.5
        },{
            txt:"Reduce el consumo de papel",
            start:19.5,
            end:22
        },{
            txt:"Reutiliza el papel cuando haya sido impreso por una cara",
            start:22,
            end:26
        },{
            txt:"Recicla el papel",
            start:26,
            end:27.2
        },{
            txt:"Haciendo uso adecuado de los recipientes establecidos para tal fin",
            start:27.2,
            end:31.3
        },{
            txt:"Recuerda depositar las botellas vacías",
            start:31.3,
            end:33.6
        },{
            txt:"sin residuos de líquidos en su interior",
            start:33.6,
            end:35.3
        },{
            txt:"para evitarr que este se derrame sobre el resto del material",
            start:35.3,
            end:37.9
        },{
            txt:"para reciclar y asi prevenir que se dañe",
            start:37.9,
            end:40.8
        }],
        next:null
    },

    {
        id:31,
        tipo:'verdaderofalsoimg',
        pregunta: 'Este esquema a qué proceso pertenece:',
        opciones: [
            'Programa de ahorro y uso eficiente de energía',
            'Programa de ahorro y uso eficiente de agua'
        ],
        img:'esquema',
        correcta:2,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt: 'PROGRAMA DE AHORRO Y USO EFICIENTE DE AGUA',
            start: 0,
            end: 2.7
        }, {
            txt: 'Objetivo: Implementar estrategias que contribuyan en la disminución del consumo del',
            start: 2.7,
            end: 7.4
        }, {
            txt: 'recurso agua con el fin de racionalizar su uso y aportar en la conservación de este.',
            start: 7.4,
            end: 13.1
        }, {
            txt: 'Tips: Cierra la llave mientras te lavas los dientes y las manos.',
            start: 13.1,
            end: 17.1
        }, {
            txt: 'Evita descargues el agua del sanitario sin necesidad.',
            start: 17.1,
            end: 20.4
        }, {
            txt: 'No arrojes residuos o elementos al sanitario que puedan obstruir.',
            start: 20.4,
            end: 24.4
        }, {
            txt: 'Si observas alguna fuga o filtración en tu sitio de trabajo,',
            start: 24.4,
            end: 28.1
        }, {
            txt: 'repórtala al área de Servicios Generales.',
            start: 28.1,
            end: 31
        }],
        next:null
    },

    {
        id:32,
        tipo:'verdaderofalsoimg',
        pregunta: 'Este esquema a qué proceso pertenece:',
        opciones: [
            'Programa de ahorro y uso eficiente de agua',
            'Plan de Gestión Integral de Residuos Peligrosos'
        ],
        img:'esquema',
        correcta:2,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt:"Peligrosos",
            start:0,
            end:1.6
        },{
            txt:"Material contaminado con aceite dieléctrico",
            start:1.6,
            end:5.2
        },{
            txt:"Envase de productos químicos",
            start:5.2,
            end:7.7
        },{
            txt:"Material contaminado con productos químicos",
            start:7.7,
            end:11.2
        },{
            txt:"Silicagel equipos contaminados con PCB",
            start:11.2,
            end:15.9
        },{
            txt:"Especiales (Posconsumo)",
            start:15.9,
            end:18.8
        },{
            txt:"RAEE`s, pilas, luminarias",
            start:18.8,
            end:24.1
        },{
            txt:"¿Qué son los residuos peligrosos?",
            start:24.1,
            end:27
        },{
            txt:"Son aquellos residuos producidos por el generador con alguna",
            start:27,
            end:30.1
        },{
            txt:"de las siguientes características",
            start:30.1,
            end:31.9
        },{
            txt:"infecciosos, combustibles, inflamables, explosivos",
            start:31.9,
            end:35.6
        },{
            txt:"reactivos, radiactivos, volátiles",
            start:35.6,
            end:38.1
        },{
            txt:"corrosivos y/o tóxicos",
            start:38.1,
            end:39.8
        },{
            txt:"los cuales pueden causar daño a la salud humana",
            start:39.8,
            end:42.3
        },{
            txt:"y/o al medio ambiente",
            start:42.3,
            end:44.2
        }],
        next:null
    },

    {
        id:33,
        tipo:'verdaderofalsoimg',
        pregunta: 'Este esquema a qué proceso pertenece:',
        opciones: [
            'Programa de ahorro y uso eficiente de energía',
            'Plan de Gestión Integral de Residuos Sólidos Peligrosos y no peligrosos'
        ],
        img:'esquema',
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:true,
        retroalimentacion:null,
        retroalimentacionsrc:'retroalimentacion',
        retroalimentacioncc:[{
            txt: 'PROGRAMA DE AHORRO Y USO EFICIENTE DE ENERGÍA',
            start: 0,
            end: 3.3
        }, {
            txt: 'Objetivo: Implementar estrategias que contribuyan al uso eficiente de la energía.',
            start: 3.3,
            end: 8.4
        }, {
            txt: 'TIPS: Utiliza la iluminación natural y enciende las luces solo cuando sea necesario.',
            start: 8.4,
            end: 14.7
        }, {
            txt: 'Apaga los computadores y desconecta los cargadores',
            start: 14.7,
            end: 17.7
        }, {
            txt: 'de celular cuando no estén en uso.',
            start: 17.7,
            end: 20.1
        }, {
            txt: 'Si eres uno de los últimos en abandonar el baño, oficinas y salas de reunión,',
            start: 20.1,
            end: 24.9
        }, {
            txt: 'apaga las luces, aires acondicionados y fotocopiadoras.',
            start: 24.9,
            end: 29
        }],
        next:{
            tipo:'interactiva',
            src:'codigo_colores/index.html',
            int:9
        }
    },

    {
        id:34,
        tipo:'opcionmultiple',
        pregunta: 'Es un Impacto Ambiental:',
        opciones: [
            'Los impactos positivos sobre el medio ambiente',
            'El resultado de la interacción de los recursos naturales',
            'Cambio en el medio ambiente ya sea adverso o beneficioso, como resultado total o parcial de los aspectos ambientales de una organización.'
        ],
        correcta:3,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:35,
        tipo:'opcionmultiple',
        pregunta: '¿En qué recipiente debes disponer plásticos, cartón y papel limpios?:',
        opciones: [
            'Recipiente blanco',
            'Recipiente Verde',
            'Recipiente Negro'
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:36,
        tipo:'verdaderofalso',
        pregunta: 'Un residuo peligroso se caracteriza por tener alguna de las siguientes características: infecciosos, combustibles, inflamables, explosivos, reactivos, radiactivos, volátiles, corrosivos y/o tóxicos; los cuales pueden causar daño a la salud humana y/o al medio ambiente',
        opciones: [
            'Verdadero',
            'Falso',
        ],
        correcta:1,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:37,
        tipo:'opcionmultiple',
        pregunta: '¿Cuáles de los siguientes forman parte del programa de gestión ambiental?:',
        opciones: [
            'Programa de ahorro y uso eficiente de energía',
            'Programa de ahorro y uso eficiente de agua',
            'Plan de gestión integral de residuos peligrosos y no peligrosos',
            'Todas las anteriores'
        ],
        correcta:4,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:null
    },

    {
        id:38,
        tipo:'opcionmultiple',
        pregunta: '¿Cuáles de los siguientes residuos se considera NO peligroso?:',
        opciones: [
            'Material contaminado con aceite',
            'Equipos contaminados con PCB`s',
            'Papel Higiénico',
            'Residuos eléctricos y electrónicos (RAEE `s)'
        ],
        correcta:3,
        audio:null,
        audiosrc:'pregunta',
        hasretroalimentacion:false,
        retroalimentacion:null,
        retroalimentacionsrc:'',
        next:{
            tipo:'comercial',
            src:'estrategias_de_descarbonizacion',
            end:{
                tipo:'final'
            }
        }
    }

]

