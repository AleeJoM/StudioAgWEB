import fechasClave from '../../../assets/images/top-fechas-clave.webp'
import cyberMonday from '../../../assets/images/top-cybermonday.webp'
import blackFriday from '../../../assets/images/top-black-friday.webp'
import calendario from '../../../assets/images/calendario-nov-dic.webp'
import estetica from '../../../assets/images/idea-estetica.webp'
import panaderia from '../../../assets/images/idea-panaderia.webp'
import abogada from '../../../assets/images/tarjetas-abogada.webp'
import szero from '../../../assets/images/tarjetas-szero.webp'
import identidad from '../../../assets/images/identidad-logo.webp'
import cambiarIg from '../../../assets/images/reel-cambiar-instagram.webp'
import clienteNuevo from '../../../assets/images/reel-cliente-nuevo.webp'

export const IMAGES = {
  fechasClave,
  cyberMonday,
  blackFriday,
  calendario,
  estetica,
  panaderia,
  abogada,
  szero,
  identidad,
  cambiarIg,
  clienteNuevo,
}

/* Las tres solapas de la carpeta de marca (post "¿Listo/a para trabajar tu marca?") */
export const SERVICE_TABS = [
  {
    id: 'marketing',
    label: 'Marketing',
    color: 'var(--vino)',
    ink: 'var(--crema)',
    emoji: '💡',
    title: 'Estrategia que tiene sentido',
    items: [
      {
        name: 'Estrategia de marketing',
        text: 'Definir qué comunicar, cómo hacerlo y qué acciones llevar adelante para alcanzar tus objetivos.',
      },
      {
        name: 'Branding',
        text: 'Buscamos que tu marca tenga una identidad propia, coherente y fácil de reconocer.',
      },
      {
        name: 'Fechas clave',
        text: 'Calendarios con ideas día por día para vender más en cada fecha importante.',
      },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    color: 'var(--naranja)',
    ink: 'var(--papel)',
    emoji: '🚀',
    title: 'Redes vivas, comunidad real',
    items: [
      {
        name: 'Community Manager',
        text: 'Mantener tus redes activas, conectar con tu audiencia y hacer crecer tu comunidad.',
      },
      {
        name: 'Post · Historias · Reels',
        text: 'Contenido con intención: el que habla de vos, de tu esencia y de todo lo que querés transmitir.',
      },
      {
        name: 'Ganchos y textos',
        text: 'Copies estratégicos y formatos recomendados para que frenen el scroll.',
      },
    ],
  },
  {
    id: 'diseno',
    label: 'Diseño',
    color: 'var(--verde)',
    ink: 'var(--papel)',
    emoji: '✨',
    title: 'Identidad en cada detalle',
    items: [
      {
        name: 'Identidad visual',
        text: 'Tu logo dice quién sos. Tu identidad hace que te reconozcan sin verlo.',
      },
      {
        name: 'Tarjetas personales',
        text: 'Branding aplicado a la papelería: QR directo a tu web, datos de contacto y redes.',
      },
      {
        name: 'Feed que enamora',
        text: 'La gente entra a tu perfil y en segundos decide si se queda. Lo diseñamos para que se quede.',
      },
    ],
  },
]

export const PROCESS = [
  {
    n: '01',
    title: 'Te conocemos',
    text: 'No arrancamos publicando: arrancamos conociéndote. Primero entendemos tu negocio.',
    emoji: '🤍',
  },
  {
    n: '02',
    title: 'Le damos identidad',
    text: 'Una marca coherente, propia y fácil de reconocer, aplicada a cada punto de contacto.',
    emoji: '🎨',
  },
  {
    n: '03',
    title: 'Creamos para conectar',
    text: 'Contenido pensado para tu público, con estrategia detrás de cada post, historia y reel.',
    emoji: '📲',
  },
]

/* Datos públicos de Instagram relevados el 5/11/2026 */
export const TOP_POSTS = [
  {
    rank: '01',
    path: 'p/De0PFqCDdk-',
    title: 'Fechas clave para vender más',
    kicker: 'La publicación que rompió todo 🔥',
    text: 'Noviembre y diciembre pasan volando. Un calendario para planificar Cyber Monday, Black Friday y las fiestas — y que la marca esté presente en el momento indicado.',
    slides: [fechasClave, cyberMonday, blackFriday],
    stats: [
      { value: 2055, label: 'Me gusta', emoji: '❤️' },
      { value: 183, label: 'Comentarios', emoji: '💬' },
      { value: 33, label: 'Republicaciones', emoji: '🔁' },
    ],
  },
  {
    rank: '02',
    path: 'p/Dekof2MHxI-',
    title: 'Lo que subiría si tuviera un centro de estética',
    kicker: 'Y la que le siguió 💅',
    text: 'Ideas concretas para centros de estética. Guardalo para cuando no sepas qué subir.',
    slides: [estetica],
    stats: [
      { value: 250, label: 'Me gusta', emoji: '❤️' },
      { value: 11, label: 'Comentarios', emoji: '💬' },
    ],
  },
]

export const WORKS = [
  {
    img: abogada,
    tag: 'Diseño · Papelería',
    title: 'Tarjetas para abogada de confianza',
    text: 'Sencillo, elegante y profesional: tonos cálidos y tipografías delicadas. 🤎',
    path: 'p/DeaWOOCjapi',
  },
  {
    img: szero,
    tag: 'Diseño · Papelería',
    title: 'Tarjetas personales SZERO',
    text: 'Identidad respetada, QR directo a la web, contacto y redes. 💌',
    path: 'p/DdkaLSsjYYo',
  },
  {
    img: panaderia,
    tag: 'Contenido · Ideas',
    title: 'Si tuviera una panadería…',
    text: 'Una panadería también puede hacerte frenar el scroll. 🥐',
    path: 'p/DdsGR_hjfRe',
  },
  {
    img: identidad,
    tag: 'Branding',
    title: '¿Te reconocerían sin tu logo?',
    text: 'Tu identidad hace que te reconozcan sin verlo. 🤎',
    path: 'p/DdFdI77Nvad',
  },
  {
    img: calendario,
    tag: 'Estrategia',
    title: 'Calendario noviembre y diciembre',
    text: 'Saber las fechas no alcanza: hay que saber qué publicar cada día, y cómo.',
    path: 'p/DfTHrIsH5Vl',
  },
  {
    img: cambiarIg,
    tag: 'Reel · Análisis',
    title: '¿Qué cambiaríamos de tu Instagram?',
    text: 'Pequeños cambios pueden hacer una gran diferencia en cómo comunicás tu marca.',
    path: 'reel/DdnGMEANAmp',
  },
]

export const CALENDAR_PERKS = [
  'Ideas día por día',
  'Formatos recomendados',
  'Ganchos y textos estratégicos',
  'Fechas clave para aprovechar',
]

export const MARQUEE_WORDS = [
  'Estrategia',
  '🚀',
  'Contenido',
  '💡',
  'Diseño',
  '🤎',
  'Post',
  '✨',
  'Historias',
  '💌',
  'Reels',
  '📌',
]
