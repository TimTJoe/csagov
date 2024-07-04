import { useEffect, useState } from "react";
import Navbar from "@components/nav";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Pattern from "@components/Pattern";
import homeServices from "@services/home.services";
import postServices from "@services/post.services";
import localdbServices from "@services/localdb.services";
import helperServices from "@services/helper.services";


const HomePage = () => {
    const goto = useNavigate()
  const [user, setUser] = useState()
  const [reload, setReload] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(localdbServices.getItem("user") || null)
  const [success, setSuccess] = useState(false)
  const [verb, setVerb] = useState("POST")
  const [filetedPostId, setFilteredPostId] = useState(null)


    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState(null)

    const {
        control,
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [postValues, setPostValues] = useState({
      title: "",
      category: "",
      body: "",
      user_id: loggedInUser?.id,
    });

          
    async function updatePost() {
      setLoading(true)
      try {
        let res = await postServices.update(postValues,filetedPostId )
        console.log(res.data)
        window.location.reload()
      } catch (error) {
        const data = error.response.data
        console.log(error)
        setError(data.type, {
          type: "custom",
          message: data.message,
        });
        setLoading(false)
      }
    }
    async function savePost() {
      setLoading(true)
      try {
        let res = await postServices.create(postValues)
        console.log(res.data)
        window.location.reload()
      } catch (error) {
        const data = error.response.data
        console.log(error)
        setError(data.type, {
          type: "custom",
          message: data.message,
        });
        setLoading(false)
      }
    }
    

    const handleErrors = (errors) => { console.error(errors) };

    function handleChange(e) {
        setPostValues({ ...postValues, [e.target.name]: e.target.value });
      }

      const handleGreeting = async () => {
        const res = await homeServices.initializer()
        console.log(res.data.message)
      }
      
      const handleRemove = async (id) =>{
        try {
          let res = await postServices.remove(id)
          console.log(res)
          window.location.reload()
        } catch (error) {
          const data = error.response.data
          console.log(data)
          setError(data.type, {
            type: "custom",
            message: data.message,
          });
        }
    }


    const handleEdit = (id) => {
      let post = allPosts.filter(post => post.id == id)[0]
      setFilteredPostId(post.id)
      setPostValues({
        title: post.title,
        category: post.category,
        body: post.body,
        user_id: loggedInUser.id
      })
    }

    useEffect(() => { 
      handleGreeting()

      const getPosts = async () => {

      let res =  await postServices.getAllPosts()
      setAllPosts(res.data.posts)
      }

      getPosts()
      setLoggedInUser(localdbServices.getItem("user"))
     }, [,reload])


  
  return (
    <div style={{maxHeight: "98vh"}}>
     <Navbar />
     <main className="responsive" style={{
        maxWidth: "668px",
        margin: "0 auto"
      }}>

      {
        allPosts && 
          allPosts.map((post, index) => (
            <article className="border" key={index}>
                <span className="row">
                  <div className="max">
                    <h6 className="small">{post.category}</h6>
                    <div className="bold">{`${post.User.firstname} ${post.User.lastname}`}</div>
                  </div>
                  <label>{helperServices.formatDate(post.createdAt)}</label>
                </span>
               <div className="row">
                 <div className="max">
                   <h5>{post.title}</h5>
                   <p>{post.body}</p>
                 </div>
               </div>
             
                {
                  loggedInUser !== null && loggedInUser.id == post.User.id ? 
                  <nav>
                    <button data-ui="#dialog" onClick={() => {
                      setVerb("PUT")
                      handleEdit(post.id)
                    }}>Edit</button>
                    <button className="border " onClick={() => {
                      setReload(!reload)
                      handleRemove(post.id)
                      }}>Delete</button>
                  </nav>
                : null
                }
               
             </article>

          ))
      }
     </main>

      <dialog id="dialog" style={{minWidth: "400px"}}>

        <h5>{verb === "POST" ? "Create New Post" : "Edit Your Post "}</h5>
        <div className="space"></div>
        {loading && <progress></progress>}


        <form 
        method={verb}
        onSubmit={verb === "POST" ? handleSubmit(savePost, handleErrors) : 
          handleSubmit(updatePost, handleErrors) } 
        style={{width: "100%"}}>

          <div className="field label round fill border">
          <input value={postValues.title} type="text" {...register("title")} onChange={handleChange} required/>
          <label> Title </label>
          { 
            errors.title ? 
            <span className="error">{errors.title.message}</span> : null
          }
          </div>

          <div className="field label round fill border">
          <input value={postValues.category} type="text" {...register("category")} onChange={handleChange} required/>
          <label> Category </label>
          { 
            errors.category ? 
            <span className="error">{errors.category.message}</span> : null
          }
          </div>

          <div className="field textarea label border fill round extra">
              <textarea minLength={116} maxLength={500} value={postValues.body} {...register("body")} onChange={handleChange} required></textarea>
              { 
            errors.body ? 
            <span className="error">{errors.body.message}</span> : null
          }
          <label>Post Body</label>
          </div>
            <button className="responsive" type="submit">Publish</button>
        </form>
      </dialog>

      {
        loggedInUser && 
        <div style={{position: "absolute", bottom: "1rem", left: "1rem"}}>
        <button data-ui="#dialog" className="extend square round primary" onClick={() => {
          setVerb("POST")
        }}>
          <i>add</i>
          <span>Create Post</span>
        </button>
      </div>
      }
      
    </div>
  );
};

export default HomePage;
