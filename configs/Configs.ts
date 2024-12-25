import { Saira_Extra_Condensed } from "next/font/google"

export type ColorConfig = {
  name?: string
  light?: string
  main: string
  dark?: string
}

export const images = [
  {
    url:"/slider/1.jpg",
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
]

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
  }

export default Configs
