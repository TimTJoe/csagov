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
      title: "",
      category: "",
      body: "",
      user_id: "",
    });

    const handleErrors = (errors) => { console.error(errors) };

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    async function handleSave() {
        setLoading(true)
        try {
            let res = await homeServices.create(values)
            
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
    <div style={{maxHeight: "98vh"}}>
     <Navbar />
     <main className="responsive" style={{
        maxWidth: "668px",
        margin: "0 auto"
      }}>

        

     


     <article className="border">
        <div className="row">
          <div className="max">
            <h5>Title</h5>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus cum eum consequuntur placeat excepturi aliquam aspernatur, error consequatur corrupti obcaecati quibusdam exercitationem! Rem atque esse natus mollitia culpa ipsum. Debitis?</p>
          </div>
        </div>
        <nav>
          <button>Edit</button>
          <button className="border ">Delete</button>
        </nav>
      </article>
     </main>
      <dialog id="dialog" style={{minWidth: "568px"}}>

        <h5>Create New Post</h5>
        <div className="space"></div>

        <form 
        onSubmit={handleSubmit(handleSave, handleErrors)} 
        style={{width: "100%"}}>

          <div className="field label round fill border">
          <input type="text" name="title" />
          <label> Title </label>
          { 
            errors.title ? 
            <span className="error">{errors.title.message}</span> : null
          }
          </div>

          <div className="field label round fill border">
          <input type="text" name="category" />
          <label> Category </label>
          { 
            errors.category ? 
            <span className="error">{errors.category.message}</span> : null
          }
          </div>

          <div className="field textarea label border fill round extra">
              <textarea></textarea>
              { 
            errors.post ? 
            <span className="error">{errors.title.message}</span> : null
          }
          <label>Post Body</label>
          </div>

            <button data-ui="#dialog" className="responsive transparent">Cancel</button>
            <button class="responsive" type="submit">Publish</button>
        </form>
      </dialog>

      <div style={{position: "absolute", bottom: "1rem", left: "1rem"}}>
        <button data-ui="#dialog" class="extend square round primary">
          <i>add</i>
          <span>Create Post</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
