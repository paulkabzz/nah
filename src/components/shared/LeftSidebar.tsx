import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react"
import { useUserContext } from "@/context/AuthContext"
import { sidebarLinks } from "@/constants"
import { INavLink } from "@/types"


const LeftSidebar = () => {
  const { mutate: signOut, isSuccess} = useSignOutAccount();
  const navigate = useNavigate();
  const {user} = useUserContext();

  const { pathname } = useLocation()

  useEffect(() => {
    if(isSuccess) navigate(0);
  }, [isSuccess]);


  return (
    <nav className="leftsidebar">
        <div className="flex flex-col gap-11">
          <Link to="/" className="flex gap-3 items-center">
                <img src="/assets/images/logo.svg" alt="logo" width={170} height={36}/>
          </Link>

          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
              <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile" className="h-14 w-14 rounded-full"/>
              <div className="flex flex-col">
                <p className="body-bold">
                    {user.name}
                </p>
                <div className="small-regular text-light-3 flex whitespace-nowrap overflow-ellipsis">
                      @{user.username}
                      { user.id === "6574132c122c08a82c39" && <img src="/assets/images/verified.png" alt="verified" style={{height: "16px", width: "16px"}} className="mt-[4px] ml-1"/>}

                </div>
              </div>
          </Link>
          <ul className="flex flex-col gap-6">
              {
                  sidebarLinks.map((link: INavLink) => {

                    const isActive = pathname === link.route;
                    return (
                        <li key={link.label} className={`leftsidebar-link ${isActive && 'bg-primary-500'}`}>
                          <NavLink to={link.route} className={"flex gap-4 items-center p-4 "}>
                            <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`}/>
                            {link.label}
                          </NavLink>
                        </li>
                        
                    )
                  })
              }
          </ul>
        </div>

          <Button variant={'ghost'} className="shad-button_ghost" onClick={() => signOut()}>
             <img src="/assets/icons/logout.svg" alt="logout" />
             <p className="small-medium lg:base-medium">
              Logout
             </p>
          </Button>
    </nav>
  )
}

export default LeftSidebar