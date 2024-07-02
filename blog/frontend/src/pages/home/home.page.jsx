import { useEffect, useState } from "react";
import Navbar from "@components/nav";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Pattern from "@components/Pattern";
import homeServices from "@services/home.services";


const HomePage = () => {
    const goto = useNavigate()

    const [loading, setLoading] = useState(false)

    const {
        control,
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleErrors = (errors) => { console.error(errors) };

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    async function handleSave() {
        setLoading(true)
        try {
            let res = await homeServices.create(values)
            if (res.status == "201") {
               //set post, so the page will render with new content
            } else {
                throw new Error({ message: "status error" })
            }
        } catch (error) {
            setError("server", {
                error,
                type: "custom",
                message: "Technical Error. Try again.",
            });
        }
    }



  const handleGreeting = async () => {
    const res = await homeServices.initializer()
    console.log(res.data.message)
  }

  useEffect(() => { handleGreeting() }, [])
  return (
    <>
     <Navbar />
     <main className="responsive" style={{
        maxWidth: "668px",
        margin: "0 auto"
      }}>
      <form onSubmit={handleSubmit(handleSave, handleErrors)} className="border round" style={{padding: "2rem"}} >
        <h5>Create New Post</h5>
        <div className="field label round fill border">
        <input type="text" name="title" />
        <label> Title </label>
        { 
          errors.password ? 
          <span className="error">{errors.password.message}</span> : null
        }
        </div>
        <div className="field label fill round border large">
          <textarea name="post" id="post" 
          style={{width: "100%", display: "block"}} cols={30} rows={10}></textarea>
          <label>Post</label> 
        </div>
      </form>


     <article class="border">
        <div class="row">
          <div class="max">
            <h5>Title</h5>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus cum eum consequuntur placeat excepturi aliquam aspernatur, error consequatur corrupti obcaecati quibusdam exercitationem! Rem atque esse natus mollitia culpa ipsum. Debitis?</p>
          </div>
        </div>
        <nav>
          <button>Edit</button>
          <button className="border ">Delete</button>
        </nav>
      </article>
      <dialog>
        <h5>Default</h5>
        <div>Some text here</div>
        <nav class="right-align no-space">
          <button class="transparent link">Cancel</button>
          <button class="transparent link">Confirm</button>
        </nav>
      </dialog>
     </main>
    </>
  );
};

export default HomePage;
