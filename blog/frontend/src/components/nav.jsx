const Navbar = () => {
    return ( 
    <header class="fill">
        <nav>
          <h5 class="max">CSA Blog</h5>
          <button class="circle transparent">
            <a className="button" href="/signin">Sign in</a>
            <a className="button" href="/signup">Sign Signup</a>
            <img class="responsive" src="/favicon.png"/>
          </button>
        </nav>
      </header>
       );
}
 
export default Navbar;