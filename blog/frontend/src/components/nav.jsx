import localdbServices from "@services/localdb.services";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState()
  useEffect(() => {
    let res = localdbServices.getItem("user")
    if(res == null) {
      setIsAuth(false)
    } else {
      setIsAuth(res.isAuth)
      setUser(res)
    }
  }, [])
    return ( 
    <header class="fill">
        <nav>
          <h5 class="max">Blogging</h5>
          <div class="overlay blur"></div>
          
          <div>
            {
              isAuth ? <a class="chip medium round">
             <i class="medium">account_circle</i>

              <span>{user.firstname}</span>
            </a> : <a className="button" href="/signup">Sign Up</a>
            }
            
          </div>
        </nav>
      </header>
       );
}
 
export default Navbar;