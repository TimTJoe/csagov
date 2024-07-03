const Navbar = () => {
    return ( 
    <header class="fill">
        <nav>
          <h5 class="max">CSA Blog</h5>
          <div>
            <a className="button border" href="/signin">Sign In</a>
            <a className="button" href="/signup">Sign Up</a>
          </div>
        </nav>
      </header>
       );
}
 
export default Navbar;