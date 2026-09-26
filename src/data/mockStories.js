// Datos de prueba con historias y anécdotas adaptadas al contexto de podcasts en México
export const INITIAL_STORIES = [
  {
    id: "story-1",
    title: "El espejo antiguo en la casa de mis abuelos en Querétaro que no reflejaba la cama",
    topic: "Paranormal",
    topicIcon: "👻",
    authorName: "Mariana 'GatitaEspeluznante'",
    isAnonymous: false,
    isPatron: true,
    patronTier: "Patrón Nivel Leyenda ($150 MXN/mes)",
    createdAt: "Hace 2 horas",
    date: "2026-09-26",
    spiciness: 4, // 1 al 5
    hostRating: 5,
    status: "Seleccionada Ep #42",
    upvotes: 52,
    estimatedReadTime: "2 min",
    wordCount: 310,
    hostNotes: "¡Excelente historia para abrir el bloque de terror! Poner música de suspenso en el remate.",
    attachments: [
      {
        id: "att-1",
        name: "espejo_cuarto_huespedes.jpg",
        type: "image",
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        caption: "Foto del espejo de marco de latón tomada de día. Miren el ángulo de inclinación."
      }
    ],
    content: `¡Hola amigos del podcast! Llevo siguiéndolos desde el episodio uno. En 2023 mis papás heredaron la casona de mis abuelos en el centro de Querétaro. En el cuarto de visitas dejaron un espejo de cuerpo entero con marco de latón viejísimo.

Al principio no le tomamos importancia, pero cada que un primo o visita se quedaba a dormir ahí, despertaba con la misma parálisis de sueño: sentían que despertaban, miraban al espejo y veían la habitación completamente vacía, sin la cama reflejada.

Hace un mes me tocó dormir ahí porque estaban pintando mi recámara. A las 3:15 AM mi perra empezó a gruñirle a la esquina. Me senté en la cama, me tallé los ojos y miré al espejo. El reflejo del cabecero de madera, las cobijas y mi propia silueta no estaban. Solo se veía el piso de duela reflejado y dos huellas descalzas marcadas sobre el polvo justo donde termina la cama.

Prendí la luz en chinga y no he vuelto a entrar a ese cuarto sola. Les adjunto la foto del espejo. ¡Un abrazo y sigan con el gran contenido!`
  },
  {
    id: "story-2",
    title: "Mi jefe compartió pantalla en el Zoom general y dejó abierto su Excel de 'Aliento Godín'",
    topic: "Chisme Godín",
    topicIcon: "☕",
    authorName: "CaféConSalseo",
    isAnonymous: true,
    isPatron: true,
    patronTier: "Productor Ejecutivo VIP ($250 MXN/mes)",
    createdAt: "Hace 5 horas",
    date: "2026-09-26",
    spiciness: 5,
    hostRating: 5,
    status: "Joyita del Mes",
    upvotes: 84,
    estimatedReadTime: "3 min",
    wordCount: 410,
    hostNotes: "Chisme godín de primer nivel. No decir el nombre de la empresa.",
    attachments: [
      {
        id: "att-2",
        name: "excel_filtrado_censurado.jpg",
        type: "image",
        url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        caption: "Captura rápida antes de que cerrara la laptop de golpe."
      }
    ],
    content: `Por favor 100% anónimo porque sigo chambeando en este lugar de Santa Fe.

Trabajo en una consultoría y nuestro director es de esos que usan chaleco de plumas y habla en 'spanglish corporativo'. El martes pasado tuvimos la junta trimestral con más de 120 personas conectadas en Zoom.

El jefe dijo: 'A ver equipo, les voy a proyectar los entregables de Q3'. Puso compartir pantalla y lo que se vio durante unos 10 segundos eternos no era la presentación, sino un Excel con el título: 'Matriz_Desempeño_Higiene_Personal_2025_v3.xlsx'.

Había columnas reales que decían: 'ÍNDICE DE HALITOSIS (1 al 10)', 'OLOR DE COMIDA DE TUPPER DISRUPTIVO', y notas junto a nuestros nombres como:
- 'Godínez, Carlos: Olor persistente a tacos de suadero después de las 2 PM, hablarle de lejitos.'
- 'Sánchez, Sofía: 10/10 siempre huele a menta o chicle, perfil para subirle el sueldo.'
- 'Ramiro: Tupper de atún con cebolla apesta el piso 4.'

Se hizo un silencio sepulcral en el Zoom. Alguien en el chat escribió: 'Pestaña equivocada lic.', y en ese segundo el jefe cerró la laptop tan fuerte que se escuchó el madrazo en el micrófono. A los diez minutos Recursos Humanos mandó un correo diciendo que 'por fallas de ancho de banda se posponía la sesión'. Nadie se atreve a verse a la cara en el comedor.`
  },
  {
    id: "story-3",
    title: "Me llevó a unos tacos de birria y llevó a su mamá para que me hiciera una entrevista",
    topic: "Citas del Terror",
    topicIcon: "💔",
    authorName: "SobrevivienteDeTinder",
    isAnonymous: false,
    isPatron: false,
    patronTier: null,
    createdAt: "Ayer",
    date: "2026-09-25",
    spiciness: 4,
    hostRating: 4,
    status: "Por Revisar",
    upvotes: 41,
    estimatedReadTime: "2 min",
    wordCount: 280,
    hostNotes: "Ideal para el bloque de comedia y citas fallidas.",
    attachments: [
      {
        id: "att-3",
        name: "ticket_cuenta_tres.jpg",
        type: "image",
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        caption: "La cuenta donde insistió en dividir la orden entre los tres."
      }
    ],
    content: `Hice match en Bumble con un chavo de 30 años que parecía súper tranquilo. Me invitó a cenar a una taquería muy famosa de birria en la Narvarte. Llegué a las 8:00 PM y cuando me acerco a la mesa, él no estaba solo: estaba sentado junto a su mamá, una señora como de 65 años con lentes oscuros puestos de noche.

Sin dejarme ni sentar bien, el chavo me dice: 'Te presento a mi mamá Doña Lupita. Ella siempre viene a mis primeras citas porque tiene sexto sentido para detectar si una mujer me conviene o es una interesada'.

La señora sacó una libreta con pluma, se pidió su consomé con tres quesabirrias, y empezó el interrogatorio: me preguntó cuánto ganaba en mi trabajo, en qué colonia rentaba, si me llevaba bien con mis suegros anteriores y qué signo zodiacal era. Cuando yo le preguntaba algo a él, la mamá contestaba: 'Él ahorita está enfocado en su espiritualidad'.

Al final cuando llegó la cuenta, el muchacho me la pasó y me dijo: 'Como mi mamá vino en calidad de consejera, propongo que dividamos la cuenta 50/50'. Dejé 100 pesos en la mesa, me salí caminando rápido y los bloqueé de todos lados.`
  },
  {
    id: "story-4",
    title: "Cómo usé el reglamento vecinal de 1994 para destituir al dictador de la alberca de la privada",
    topic: "Venganza",
    topicIcon: "⚖️",
    authorName: "VecinaVengadora",
    isAnonymous: false,
    isPatron: true,
    patronTier: "Patrón Nivel Leyenda ($150 MXN/mes)",
    createdAt: "Hace 2 días",
    date: "2026-09-24",
    spiciness: 3,
    hostRating: 4,
    status: "Seleccionada Ep #43",
    upvotes: 68,
    estimatedReadTime: "3 min",
    wordCount: 360,
    hostNotes: "Muy buena catarsis. La gente ama las historias de venganza contra vecinos odiosos.",
    attachments: [],
    content: `Saludos cracks del podcast. En mi fraccionamiento en Zapopan teníamos a 'Don Héctor', un señor jubilado que se autonombró presidente vitalicio del comité vecinal. 

El tipo se la pasaba con una libreta y cronómetro junto a la alberca común. Multaba con $500 pesos si un niño salpicaba agua fuera del perímetro o si ponías una bocinita con música a volumen bajo. La gota que derramó el vaso fue cuando le gritó a mi sobrino de 7 años por meter un inflable de dinosaurio.

Me puse a leer el reglamento fundacional del condominio de 1994. En el artículo 14, inciso C, encontré una cláusula arcaica nunca derogada: 'Cualquier condómino al corriente tiene derecho a solicitar el área húmeda comunal para ceremonias cívicas o representaciones patrióticas previa notificación de 48 horas'.

Organizamos a 25 vecinos. Registramos formalmente el uso de la alberca para una 'Representación Histórica de la Batalla de Puebla'. Llegamos un sábado con bigotes postizos, sombreros y música tradicional. Cuando Don Héctor quiso llamar a la patrulla, los policías leyeron el documento oficial, se rieron y le dijeron que estábamos en nuestro derecho.

En la siguiente asamblea convocamos quórum y votamos unánimemente para quitarle el cargo. Ahora la alberca tiene música y cero amargados.`
  },
  {
    id: "story-5",
    title: "El tramo de la carretera a Matehuala donde el reloj del carro empezó a correr al revés",
    topic: "Paranormal",
    topicIcon: "🛸",
    authorName: "TraileroNocturno",
    isAnonymous: true,
    isPatron: false,
    patronTier: null,
    createdAt: "Hace 3 días",
    date: "2026-09-23",
    spiciness: 5,
    hostRating: 4,
    status: "Archivada",
    upvotes: 49,
    estimatedReadTime: "2 min",
    wordCount: 250,
    hostNotes: "Relato de carretera clásico. Buen ritmo.",
    attachments: [],
    content: `Veníamos manejando mi hermano y yo de San Luis Potosí rumbo a Monterrey por la 57, como a la 1:30 de la madrugada. Es una recta desértica larguísima sin señal de celular.

De la nada la estación de radio empezó a sintonizar un murmullo como de estación de tren antigua en otro idioma. De repente el reloj digital del tablero de mi coche empezó a fallar.

Marcaba 1:42 AM. Y en vez de avanzar, cambió a 1:41 AM... luego 1:40... 1:39. Literalmente estaba contando hacia atrás mientras íbamos a 100 km/h. Sacamos los celulares y las pantallas estaban congeladas con el logo de la manzana.

Cruzamos un vado con una neblina densa que olía raro, como a fierro quemado. En cuanto pasamos el puente del kilómetro 120, las luces del tablero dieron un chispazo y el reloj saltó de golpe a las 2:55 AM.

Perdimos más de una hora de tiempo en un tramo que no toma ni 15 minutos. Ninguno de los dos sabe qué pasó.`
  }
];

export const TOPICS = [
  { id: "all", name: "Todos los Temas", icon: "✨" },
  { id: "Paranormal", name: "Paranormal y Sustos", icon: "👻" },
  { id: "Chisme Godín", name: "Chisme Godín y Oficina", icon: "☕" },
  { id: "Citas del Terror", name: "Citas y Ligues del Terror", icon: "💔" },
  { id: "Venganza", name: "Venganza y Justicia Poética", icon: "⚖️" },
  { id: "Confesiones", name: "Confesiones Prohibidas", icon: "🤫" }
];

export const HOST_STATUSES = [
  { id: "Joyita del Mes", label: "🔥 Joyita / Lectura Obligada" },
  { id: "Seleccionada Ep #42", label: "🎙️ Seleccionada: Episodio #42" },
  { id: "Seleccionada Ep #43", label: "📅 Seleccionada: Episodio #43" },
  { id: "Por Revisar", label: "⏳ Por Revisar con Co-host" },
  { id: "Archivada", label: "📁 Guardar para Especial" }
];
