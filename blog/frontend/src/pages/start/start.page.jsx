const StartPage = () => {
    return (
        <main className="grid responsive" >
            <section className="s12 s6 m6" style={{
                display: "grid",
                alignContent: "center"
            }}>
                <h3>Blog Solutions for Curious minds</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dolore exercitationem sapiente vitae, nam quasi libero non necessitatibus, sunt, vel reprehenderit eaque est eos numquam optio. Dignissimos, rerum blanditiis! Delectus.</p>
                <div className="space"></div>
                <div>
                    <a href="signup" className=" button primary">Create New Account</a>
                    <a href="signin" className="button secondary solid">Sign in</a>
                </div>
            </section>
            <section className="s12 sm6 m6" style={{display: "grid", placeContent: "center"}} >
                <img className="border round" style={{
                    height: "300px",
                    width: "500px",
                    outline: "1rem solid rgba(0,0,0,.0987)"
                }} src="/sign">
                </img>
            </section>
        </main>
    );
}

export default StartPage;