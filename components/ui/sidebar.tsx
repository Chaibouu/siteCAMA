"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Icon } from '@iconify/react';

export interface ChildrenItem {
  title: string;
  path: string;
}

interface Links {
  title: string;
  path: string;
  icon?: React.JSX.Element | React.ReactNode | string;
  children?: ChildrenItem[]; // Ajout des sous-onglets
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// export const SidebarProvider = ({
//   children,
//   open: openProp,
//   setOpen: setOpenProp,
//   animate = true,
// }: {
//   children: React.ReactNode;
//   open?: boolean;
//   setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
//   animate?: boolean;
// }) => {
//   const [openState, setOpenState] = useState(false);

//   const open = openProp !== undefined ? openProp : openState;
//   const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

//   return (
//     <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };


export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const [isTablet, setIsTablet] = useState(false); // État pour détecter les tablettes

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  // Effet pour détecter si l'utilisateur est en mode tablette
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 425px) and (max-width: 868px)");

    const handleTabletChange = (event: MediaQueryListEvent) => {
      setIsTablet(event.matches);
    };

    // Définir l'état initial et écouter les changements de taille
    setIsTablet(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleTabletChange);

    return () => {
      mediaQuery.removeEventListener("change", handleTabletChange);
    };
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: isTablet }}>
      {children}
    </SidebarContext.Provider>
  );
};
//========================================================================


export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  sm:flex sm:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row sm:hidden  items-center justify-between bg-neutral-100 dark:bg-slate-900 w-full mt-2"
        )}
        {...props}
        onClick={() => setOpen(!open)}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-slate-900 dark:text-neutral-200 w-full h-full"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};


export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, setOpen, animate } = useSidebar(); // Accès à setOpen pour fermer la sidebar
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'affichage des sous-onglets

  const toggleOpen = () => setIsOpen(!isOpen); // Fonction pour basculer l'état des sous-onglets

  // Fonction pour gérer le clic sur un lien
  const handleLinkClick = () => {
    if (setOpen) {
      setOpen(false); // Fermer la sidebar après un clic sur un lien
    }
  };


  return (
    <div>
      {/* Lien principal */}
      <div
        className={cn(
          "flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer",
          className
        )}
        // onClick={link.children ? toggleOpen : undefined} // Ouvrir/fermer les sous-onglets seulement s'il y a des enfants
        onClick={link.children ? toggleOpen : handleLinkClick} // Fermer la sidebar ou ouvrir les sous-onglets
      >

     <Link
        href={link.path}
        className={cn(
          "flex items-center justify-start gap-2  group/sidebar py-2",
          className
        )}
        onClick={link.children ? undefined : handleLinkClick} // Fermer seulement si pas d'enfants
        {...props}
      >
            {/* Vérification si link.icon est une chaîne ou un élément React */}
            {typeof link.icon === "string" ? (
              <Icon className="text-3xl" icon={link.icon} width="24" height="24" />
            ) : (
              link.icon
            )}

            <motion.span
              animate={{
                display: animate ? (open ? "inline-block" : "none") : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
              {link.title}
            </motion.span>

            {/* Bouton pour ouvrir/fermer les sous-onglets */}
            {link.children && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className={`transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`} // Rotation en fonction de l'état isOpen
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0z" />
                  <path
                    fill="gray"
                    d="M12.707 14.536a1 1 0 0 1-1.414 0l-2.829-2.829A1 1 0 0 1 9.172 10h5.656a1 1 0 0 1 .708 1.707z"
                  />
                </g>
              </svg>
            )}
        </Link>
      </div>

      {/* Sous-onglets */}
      {link.children && isOpen && ( // Affichage des sous-onglets si isOpen est true
        <div className="pl-6">
          {link.children.map((child) => (
            <SidebarLink key={child.title} link={child} className="pl-2" />
          ))}
        </div>
      )}
    </div>
  );
};