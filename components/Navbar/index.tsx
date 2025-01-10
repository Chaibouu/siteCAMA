"use client"
import React,{useState, useEffect} from "react";
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import DropdownUser from "../Header/DropdownUser";
// import { User } from "@/types/user";
import { LinkItem } from "@/settings/navigation";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LoginButton } from "../auth/login-button";
// import DarkModeSwitcher from "./DarkModeSwitcher";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import { useCurrentUser } from "@/hooks/use-current-user";
import Configs from "@/configs/Configs";
import appConfig from "@/settings";
import { useSession } from "@/context/SessionContext";

interface NavbarProps {
  // user: User;
  Links: LinkItem[];
}

const Navbar = ({Links}:NavbarProps) => {

  const user = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userr, setUser] = useState();
  const pathname = usePathname();

  const [fix,setFix]=useState(false)
    useEffect(() => {
        const setFixed = () => {
            if (window.scrollY >= 90) {
                setFix(true);
            } else {
                setFix(false);
            }
        };

        window.addEventListener('scroll', setFixed);
        return () => {
            window.removeEventListener('scroll', setFixed);
        };
    }, []);

    const toggleMenu = () => {
      console.log("Toggle menu called");
      setMenuOpen(!menuOpen);
    };
  
  return (
    
    <div className={fix ? `w-full fixed top-0 left-0 z-20 bg-PrimaryCol border-b-2 border-SecondaryCol mb-4 dark:bg-SecondaryCol dark:border-PrimaryCol` : `w-full bg-PrimaryCol fixed top-0 left-0 z-20 mb-4 dark:bg-SecondaryCol`}>
      <div className="flex items-center justify-between m-2">
      
          <div className="md:ms-12">
            <Image
              src={appConfig.logoUrl}
              className="w-16 h-16"
              alt={appConfig.websiteTitle}
              height={200}
              width={200}
            />
          </div>


          {/* <div onClick={()=>setMenuOpen(!menuOpen)} className="text-3xl absolute right-8 top-6 cursor-pointer flex items-center lg:hidden ">
            <Icon icon={menuOpen? "iconamoon:close-duotone":"iconamoon:menu-burger-horizontal"} />
            <Icon icon={menuOpen ? "iconamoon:close-duotone" : "iconamoon:menu-burger-horizontal"} />
          </div> */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl absolute right-8 top-6 cursor-pointer lg:hidden flex items-center"
          >
            <Icon icon={menuOpen ? "iconamoon:close-duotone" : "iconamoon:menu-burger-horizontal"} />
          </div>


          <div className="">
            <ul className={`me-2 lg:flex lg:items-center lg:bg-transparent bg-white lg:pb-0 pb-12 absolute lg:static lg:z-auto z-[-1] w-full lg:w-[70%] xl:w-[60%] 2xl:w-[50%] lg:pl-0 pl-9 transition-all duration-500 ease-in ${menuOpen? 'top-0 left-0 pt-10 opacity-100 w-[100%] dark:bg-DarkCol':'top-[-490px] left-0 lg:opacity-100 opacity-0'}`}>
            {/* <ul
              className={`me-2 lg:flex lg:items-center lg:bg-transparent bg-white lg:pb-0 pb-12 
              absolute lg:static lg:z-auto z-[-1] w-full lg:w-auto pl-9 transition-all 
              duration-500 ease-in-out text-red-600 ${menuOpen ? 'top-16 opacity-100' : '-top-[500px] opacity-0'}`}
            > */}

              {Links && Links.length > 0 ? (
                Links.map((link: LinkItem) => (
                  <li key={link.name} className="lg:ml-4 text-[18px] lg:my-0 my-7 text-center">
                    <Link
                      href={link.link}
                      className="relative text-gray-800 hover:text-[#0a6b70] duration-500 w-full flex items-center justify-center min-w-[78px] dark:text-white
                      after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-[#0a6b70]
                      hover:after:w-full hover:after:left-0 after:transition-all after:duration-500 text-center"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-center">No links available</li>
              )}
              <div className={`md:hidden ${menuOpen? 'block':'hidden'}`}>
                <div className="flex items-center justify-end gap-6 pr-10">
                  <span className="me-6">
                    {/* <ModeToggle/> */}
                    <DarkModeSwitcher />
                  </span>
                  <div className="">
                    {user.isAuthenticated? 
                      (<span>
                        <DropdownUser />
                      </span>)
                      :(
                      <LoginButton mode="modal">  
                        <div className="bg-[#098084] rounded-lg text-white fond-bold py-2 px-6 hover:bg-[#098084] dark:bg-white dark:text-black">
                          Sign in
                        </div>
                      </LoginButton>
                      )
                    }
                  </div>
                </div>
              </div>
            </ul>
          </div>
          <div className="flex items-center justify-around pr-[70px] lg:pr-[5px] md:me-4 lg:me-4">
            <span className="me-6 hidden md:block">
              {/* <ModeToggle/> */}
              <DarkModeSwitcher />
            </span>

              {/* <span>
                <DropdownUser />
              </span> */}
                
              {/* <LoginButton mode="modal">  
                <div className="bg-Es_primary rounded-lg text-white fond-bold py-2 px-6 bg-[#098084] hover:bg-[#098084] dark:bg-white dark:text-black">
                  Sign in
                </div>
              </LoginButton> */}

            <div className="hidden md:block">
              {user.isAuthenticated? 
                (<span>
                  <DropdownUser />
                </span>)
                :(
                  // <button className="bg-Es_primary rounded-lg text-white fond-bold py-2 px-6 dark:bg-slate-500">Signin</button>
                <LoginButton mode="modal">  
                  <div className="bg-[#098084] rounded-lg text-white fond-bold py-2 px-6 hover:bg-[#098084] dark:bg-white dark:text-black">
                    Sign in
                  </div>
                </LoginButton>
                )
              }
            </div>
          </div>
      
      </div>
    </div>
  )
}

export default Navbar