var actual_pregunta_data = null

var data_preguntas = [
    {
        pregunta: 'Definiciones Sistema de Seguridad de Trabajo',
        opciones: [{
                opcion1: 'Peligro',
                opcion2: 'Fuente, situación o acto con potencial de enfermedad o lesión para el ser humano, daños a las instalaciones y/o al medio ambiente o a una combinación de éstos.'
            },
            {
                opcion1: 'Riesgo',
                opcion2: 'El riesgo es la probabilidad de que una amenaza se convierta en un desastre. La vulnerabilidad o las amenazas, por separado, no representan un peligro. Pero si se juntan, se convierten en un riesgo.'
            },
            {
                opcion1: 'Controles',
                opcion2: 'Mecanismos para verificar o comprobar el funcionamiento o evolución de una actividad, de tal forma que nos permitan reducir los riesgos asociados al desarrollo de la misma. (Incluir la jerarquía de controles (Pirámide invertida): Eliminación, Sustitución, Controles de ingeniería, controles administrativos y EPP).'
            },
            {
                opcion1: 'Acto inseguro',
                opcion2: 'Son las prácticas inseguras de las personas, generadas por actitudes negativas frente a la seguridad, por ejemplo: no usar las herramientas adecuadas para la operación, dejar las herramientas en el piso, entre otras.'
            },
            {
                opcion1: 'Condición insegura',
                opcion2: 'Son todas las circunstancias o condiciones físicas que pueden causar lesiones o alteraciones en la salud, por ejemplo: herramientas defectuosas o mal diseñadas, carencia  de sitios apropiados para su almacenamiento, entre otras.'
            },
            {
                opcion1: 'Peligro (Causa)',
                opcion2: 'Contacto con químicos peligrosos (materiales de trabajo)'
            },
            {
                opcion1: 'Riesgo (EFECTO)',
                opcion2: 'Quemaduras, irritaciones (lesiones)'
            }
        ]
    },
    {
        pregunta: 'Aprendamos jugando, sobre la Clasificación de peligros',
        opciones: [
            {
                opcion1: 'Biológico',
                opcion2: 'Biológico, bacterias, hongos, parásitos, picaduras, mordeduras, fluidos.'
            },
            {
                opcion1: 'Físicos',
                opcion2: 'Ruido, iluminación, vibraciones, temperaturas extremas, presión atmosférica, radiaciones.'
            },
            {
                opcion1: 'Químico',
                opcion2: 'Polvos orgánicos, fibras, líquidos, gases y vapores, humos, material particulado.'
            },
            {
                opcion1: 'Psicosocial',
                opcion2: 'Gestión organizacional, características de la organización, del grupo social, condiciones de la tarea, interfase persona – tarea y jornada de trabajo.'
            },
            {
                opcion1: 'Biomecánico',
                opcion2: 'Postura, esfuerzo, movimiento repetitivo, manipulación manual de cargas.'
            },
            {
                opcion1: 'Condiciones de seguridad',
                opcion2: 'Mecánico, eléctrico, locativo, tecnológico, accidentes de tránsito, públicos, trabajo en alturas y espacios confinados.'
            },
            {
                opcion1: 'Fenómenos naturales',
                opcion2: 'Sismo, terremoto, vendaval, inundación, derrumbe, precipitaciones.'
            }
        ]
    },
    {
        pregunta: 'Relacione los Requisitos para la radicación de incapacidades, según corresponda',
        opciones: [
            {
                opcion1: 'Enfermedad Común',
                opcion2: 'Certificado de incapacidad'
            },
            {
                opcion1: 'Enfermedad laboral',
                opcion2: 'Certificado de incapacidad Documento de reconocimiento por parte de la ARL como enfermedad de origen laboral.'
            },
            {
                opcion1: 'Accidente de trabajo',
                opcion2: 'Certificado de incapacidad Reporte de Accidente laboral'
            },
            {
                opcion1: 'Accidente de tránsito',
                opcion2: 'Certificado de incapacidad Copia de los FURIPS (Formulario Único de Reclamación de las Instituciones Prestadoras de Servicios de salud) (debe ser entregado en la IPS de atención)'
            },
            {
                opcion1: 'Licencia de maternidad',
                opcion2: 'Certificado de incapacidad y/o Licencia de maternidad semanas de gestación de la madre al momento del parto Copia de la Epicrisis del parto, deben indicarse las fechas de la licencia fotocopia del registro civil de nacimiento'
            },
            {
                opcion1: 'Licencia de paternidad',
                opcion2: 'Certificado de semanas de gestación de la madre al momento del parto. fotocopia de la epicrisis de la madre en la cual se indique la edad gestacional fotocopia del registro civil de nacimiento'
            }
        ]
    }
]