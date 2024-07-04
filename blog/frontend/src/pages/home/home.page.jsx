import { useEffect, useState } from "react";
import Navbar from "@components/nav";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Pattern from "@components/Pattern";
import homeServices from "@services/home.services";
import postServices from "@services/post.services";


const HomePage = () => {
    const goto = useNavigate()

    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState(null)

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
          console.log(res.data)
          
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
      
      const handleRemove = async (id) =>{
        let post = allPosts.filter(post => post.id == id)
        try {
          let res = await postServices.remove(id)
          console.log(res)
        } catch (error) {
          const data = error.response.data
          console.log(data)
          setError(data.type, {
            type: "custom",
            message: data.message,
          });
        }
    }

    

    

    useEffect(() => { 
      handleGreeting()

      const getPosts = async () => {

      let res =  await postServices.getAllPosts()
      console.log(res.data.posts)
      setAllPosts(res.data.posts)
      }

      getPosts()
      
     }, [])


  
  return (
    <div style={{maxHeight: "98vh"}}>
     <Navbar />
     <main className="responsive" style={{
        maxWidth: "668px",
        margin: "0 auto"
      }}>

      {
        allPosts && 
          allPosts.map(post => (
            <article className="border">
               <div className="row">
                 <div className="max">
                   <h5>{post.title}</h5>
                   <p>{post.body}</p>
                 </div>
               </div>
               <nav>
                 <button onClick={() => {

                 }}>Edit</button>
                 <button className="border " onClick={() => {handleRemove(post.id)}}>Delete</button>
               </nav>
             </article>

          ))
      }
     </main>

      <dialog id="dialog" style={{minWidth: "568px"}}>

        <h5>Create New Post</h5>
        <div className="space"></div>
        {loading && <progress></progress>}


        <form 
        onSubmit={handleSubmit(handleSave, handleErrors)} 
        style={{width: "100%"}}>

          <div className="field label round fill border">
          <input type="text" {...register("title")} onChange={handleChange} required/>
          <label> Title </label>
          { 
            errors.title ? 
            <span className="error">{errors.title.message}</span> : null
          }
          </div>

          <div className="field label round fill border">
          <input type="text" {...register("category")} onChange={handleChange} required/>
          <label> Category </label>
          { 
            errors.category ? 
            <span className="error">{errors.category.message}</span> : null
          }
          </div>

          <div className="field textarea label border fill round extra">
              <textarea {...register("body")} onChange={handleChange} required></textarea>
              { 
            errors.body ? 
            <span className="error">{errors.body.message}</span> : null
          }
          <label>Post Body</label>
          </div>

            <button data-ui="#dialog" className="responsive transparent">Cancel</button>
            <button className="responsive" type="submit">Publish</button>
        </form>
      </dialog>

      <div style={{position: "absolute", bottom: "1rem", left: "1rem"}}>
        <button data-ui="#dialog" className="extend square round primary">
          <i>add</i>
          <span>Create Post</span>
        </button>
      </div>

    </div>
  );
};

export default HomePage;
