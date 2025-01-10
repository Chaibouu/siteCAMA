import { Saira_Extra_Condensed } from "next/font/google"

export type ColorConfig = {
  name?: string
  light?: string
  main: string
  dark?: string
}

export const images = [
  {
    url:"/slider/citronier.png",
    alt:"description de l'image",
    title:"Optimisez vos récoltes, embellissez vos espaces verts.",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
  {
    url:"/slider/2.jpg",
    alt:"description de l'image",
    title:"Optimisez vos récoltes, embellissez vos espaces verts.",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
  {
    url:"/slider/3.jpg",
    alt:"description de l'image",
    title:"Optimisez vos récoltes, embellissez vos espaces verts.",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
  {
    url:"/slider/4.jpg",
    alt:"description de l'image",
    title:"Découvrer notre Univers",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
  {
    url:"/slider/5.jpg",
    alt:"description de l'image",
    title:"Découvrer notre Univers",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
  {
    url:"/slider/6.jpg",
    alt:"description de l'image",
    title:"Découvrer notre Univers",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
  {
    url:"/slider/7.jpg",
    alt:"description de l'image",
    title:"Découvrer notre Univers",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
  {
    url:"/slider/8.jpg",
    alt:"description de l'image",
    title:"Découvrer notre Univers",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
  {
    url:"/slider/9.jpg",
    alt:"description de l'image",
    title:"Découvrer notre Univers",
    subtitle:"Une expérience unique au coeur de notre savoir-faire",
  },
]

type Realisation = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  lieu: string;
  media: string; // URL d'une image ou vidéo
  mediaType: "image" | "video";
};

export const realisations: Realisation[] = [
  {
    id: 1,
    title: "Champ de maïs - Région Nord",
    subtitle: "Suivi intensif pour un rendement exceptionnel",
    description:
      "Ce projet consiste à suivre un champ de maïs de 10 hectares dans la région nord. Nous avons assuré un suivi minutieux pour maximiser le rendement.",
    date: "2024-12-20",
    lieu: "Niamey",
    media: "/champ.jpg",
    mediaType: "image",
  },
  {
    id: 2,
    title: "Projet de blé - Région Sud",
    subtitle: "Un partenariat fructueux",
    description:
      "Optimisation de la production de blé grâce à nos semences certifiées et un accompagnement technique.",
    date: "2024-10-15",
    lieu: "Youri",
    media: "/image1.jpg",
    mediaType: "image",
  },
  {
    id: 3,
    title: "Projet de blé - Région Sud",
    subtitle: "Un partenariat fructueux",
    description:
      "Optimisation de la production de blé grâce à nos semences certifiées et un accompagnement technique.",
    date: "2024-10-15",
    lieu: "Kollo",
    media: "/image2.jpg",
    mediaType: "image",
  },
  {
    id: 4,
    title: "Projet de blé - Région Sud",
    subtitle: "Un partenariat fructueux",
    description:
      "Optimisation de la production de blé grâce à nos semences certifiées et un accompagnement technique.",
    date: "2024-10-15",
    lieu: "Balleyara",
    media: "/champ.jpg",
    mediaType: "image",
  },
  {
    id: 4,
    title: "Projet de blé - Région Sud",
    subtitle: "Un partenariat fructueux",
    description:
      "Optimisation de la production de blé grâce à nos semences certifiées et un accompagnement technique.",
    date: "2024-10-15",
    lieu: "Balleyara",
    media: "/champ.jpg",
    mediaType: "image",
  },
  {
    id: 4,
    title: "Projet de blé - Région Sud",
    subtitle: "Un partenariat fructueux",
    description:
      "Optimisation de la production de blé grâce à nos semences certifiées et un accompagnement technique.",
    date: "2024-10-15",
    lieu: "Balleyara",
    media: "/champ.jpg",
    mediaType: "image",
  },
  {
    id: 4,
    title: "Projet de blé - Région Sud",
    subtitle: "Un partenariat fructueux",
    description:
      "Optimisation de la production de blé grâce à nos semences certifiées et un accompagnement technique.",
    date: "2024-10-15",
    lieu: "Balleyara",
    media: "/champ.jpg",
    mediaType: "image",
  },
  {
    id: 4,
    title: "Projet de blé - Région Sud",
    subtitle: "Un partenariat fructueux",
    description:
      "Optimisation de la production de blé grâce à nos semences certifiées et un accompagnement technique.",
    date: "2024-10-15",
    lieu: "Balleyara",
    media: "/champ.jpg",
    mediaType: "image",
  },
  // Ajoutez d'autres réalisations ici
];

export const partenaires = [
  {
    id: 1,
    name: "C.A.M.A",
    logo: "/logoo.png",
    description: "Partenaire engagé dans la promotion des solutions durables.",
  },
  {
    id: 2,
    name: "AfricaYcone",
    logo: "/logoo.png",
    description: "Acteur clé dans le domaine agricole.",
  },
  {
    id: 3,
    name: "SahelCoders",
    logo: "/sahel_coders_logo.png",
    description: "Association de jeune développeur en innovation technologique.",
  },
  {
    id: 4,
    name: "Partenaire D",
    logo: "/logoo.png",
  },
];



// Primary color config object
const Configs ={
    appName: 'primary-1',
    title: 'primary-1',
    description: 'primary-1',
    PrimaryColor: '#33A752',
    SecondariColor: '#DF7413',
    btnColor   :' #675DD8',
    VertClair  :' #A8D5BA',
    VertFonce  :' #2F4F4F',
    
    BeigeSable :' #D2B48C',
    BrunMoyen  :' #8B4513',
    BrunFonce  :' #5D4037',

    BleuPastel :' #ADD8E6',
    BleuClair  :' #87CEEB',
    BleuFonce  :' #4682B4',

    DarkCol    : ' #001F3F'
  }

export default Configs
