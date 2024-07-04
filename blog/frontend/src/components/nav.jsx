import homeServices from "@services/home.services";
import localdbServices from "@services/localdb.services";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLogout, setIsLogout] = useState(false)
  const [user, setUser] = useState()
  const handleLogout = () => {
    setIsLogout(homeServices.logout())
    setIsAuth(false)
    window.location.reload()
  }
  useEffect(() => {
    let res = localdbServices.getItem("user")
    if(res == null) {
      setIsAuth(false)
    } else {
      setIsAuth(res.isAuth)
      setUser(res)
    }
  }, [, isLogout, isAuth])
    return ( 
    <header className="fill">
        <nav>
          <h5 className="max">CSA Blogging</h5>
         
          
          <div>
            {
              isAuth ? 
              <button data-ui="#menu-button">
              <span>
               <i className="medium">account_circle</i>
                {user.firstname}
                </span>
              <i>arrow_drop_down</i>
              <menu className="no-wrap " id="menu-button">
                <h6 className="small-padding">{user.firstname + " " + user.lastname}</h6>
                <a className="center-align" onClick={handleLogout} data-ui="#logout-snackbar">Log out</a>
              </menu>
            </button>
            : <a className="button" href="/signin">Sign In</a>
            }
            
          </div>
        </nav>
        <div className="snackbar" id="logout-snackbar">Logout Successfully</div>

      </header>
       );
}
 
export default Navbar;