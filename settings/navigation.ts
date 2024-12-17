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
    title: "Dashboard",
    icon: "material-symbols-light:dashboard-outline",
    path: "/dashboard",
    allowedRoles: ["USER","ADMIN"],
  },
  {
    title: "Soutenance",
    icon: "ph:certificate-light",
    path: "/soutenance",
    allowedRoles: ["ADMIN", "USER"],
  },
  {
    title: "Utilisateur",
    icon: "mage:users",
    path: "/utilisateur",
    allowedRoles: ["ADMIN", "USER"],
  },
  {
    title: "Professeur",
    icon: "hugeicons:user",
    path: "/professeur",
    allowedRoles: ["ADMIN", "USER"],
  },
  {
    title: "Etudiant",
    icon: "ph:student-light",
    path: "/etudiant",
    allowedRoles: ["ADMIN", "USER"],
  },
  {
    title: "Paramètres",
    // icon: "material-symbols:settings",
    icon: "weui:setting-outlined",
    path: "/settings",
    allowedRoles: ["USER"],
  },
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
