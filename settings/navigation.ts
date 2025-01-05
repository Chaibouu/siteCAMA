export interface LinkItem {
  name: string;
  link: string;
}

export const Links : LinkItem[] = [
  {
    name:"Accueil",
    link:"#accueil"
  },
  {
    name:"À propos",
    link:"#propos"
  },
  {
    name:"Service",
    link:"#service"
  },
  {
    name:"Boutique",
    link:"#boutique"
  },
  {
    name:"Réalisations",
    link:"#realisation"
  },
  {
    name:"Contact",
    link:"#contact"
  },
]
export const Linkss : LinkItem[] = [
  {
    name:"Accueil",
    link:"/#accueil"
  },
  {
    name:"À propos",
    link:"/#propos"
  },
  {
    name:"Service",
    link:"/#service"
  },
  {
    name:"Boutique",
    link:"/#boutique"
  },
  {
    name:"Réalisations",
    link:"/#realisation"
  },
  {
    name:"Contact",
    link:"/#contact"
  },
]

export interface ChildrenItem {
  title: string;
  path: string;
  allowedRoles: string[];
}
export interface NavigationItem {
  title: string;
  icon: string;
  path: string;
  children?: ChildrenItem[];
  allowedRoles: string[];
}

export const adminNavigation: NavigationItem[] = [
  {
    title: "Produits",
    icon: "eos-icons:product-classes",
    path: "/produit",
    allowedRoles: ["ADMIN"],
  },
  {
    title: "Catégories",
    icon: "material-symbols:category",
    path: "/categori",
    allowedRoles: ["ADMIN"],
  },
  {
    title: "Utilisateurs",
    icon: "mage:users-fill",
    path: "/utilisateur",
    allowedRoles: ["ADMIN"],
  },
  {
    title: "Réalisations",
    icon: "lets-icons:book-fill",
    path: "/realisation",
    allowedRoles: ["ADMIN"],
  },
  {
    title: "Partenaires",
    icon: "material-symbols:partner-exchange",
    path: "/partenaire",
    allowedRoles: ["ADMIN"],
  },
  // {
  //   title: "Dashboard",
  //   icon: "material-symbols-light:dashboard-outline",
  //   path: "/dashboard",
  //   allowedRoles: ["USER","ADMIN"],
  // },
  // {
  //   title: "Soutenance",
  //   icon: "ph:certificate-light",
  //   path: "/soutenance",
  //   allowedRoles: ["ADMIN", "USER"],
  // },
  // {
  //   title: "Professeur",
  //   icon: "hugeicons:user",
  //   path: "/professeur",
  //   allowedRoles: ["ADMIN", "USER"],
  // },
  // {
  //   title: "Etudiant",
  //   icon: "ph:student-light",
  //   path: "/etudiant",
  //   allowedRoles: ["ADMIN", "USER"],
  // },
  // {
  //   title: "Paramètres",
  //   // icon: "material-symbols:settings",
  //   icon: "weui:setting-outlined",
  //   path: "/settings",
  //   allowedRoles: ["USER"],
  // },
  // {
  //   title: "Pages",
  //   icon: "eos-icons:admin",
  //   path: "#",
  //   children: [
  //     {
  //       title: "Client",
  //       path: "/dashboard/client",
  //       allowedRoles: ["USER"],
  //     },
  //     {
  //       title: "Server",
  //       path: "/dashboard/server",
  //       allowedRoles: ["USER"],
  //     },
  //   ],
  //   allowedRoles: ["USER"],
  // },
];
