import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "./pages/PostForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Ipost from "./interfaces/post";
import { environment } from "./environment";


function App() {
  const errorToast = (message:string) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [isUser, setIsUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts , setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [profilMenu,setProfilemenu]=useState("hidden");


  const shuffle=(array:Ipost[])=> {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }

  useEffect(() => {

    if (localStorage.getItem("jwt")) {
      setIsUser(true);
      fetchCurrentUser();
    }
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(environment.apiUrl+"/posts");
        setIsLoading(false);
        //@ts-ignore
        setPosts(shuffle(data.data));
      } catch (err) {
        setIsUser(false);
        setCurrentUser(null);
      }
      //console.log(data.data)
    }
    async function fetchCurrentUser() {
      try{
      const { data } = await axios.get(environment.apiUrl+"/user", {
        headers: { jwt: localStorage.getItem("jwt") },
      });
      console.log(data);
      setCurrentUser(data);}
      catch(err){
        console.log(err)
      }
    }
    
    fetchPosts();
  }, []);

  const addPost = (post:Ipost) => {
    // clone & update
    let newPosts = [ post,...posts];
    // state
    //@ts-ignore
    setPosts(newPosts);
  };
  const editPost = (updatedPost:Ipost) => {
    //clone & update
    let newPosts = posts;
    //@ts-ignore
    let index = newPosts.findIndex((post) => post._id == updatedPost._id);
    //@ts-ignore
    newPosts[index] = { ...updatedPost };
    // state
    setPosts(newPosts);
  };

  const deletePost = (id:string) => {
    //@ts-ignore
    let newPosts = posts.filter((post ) => post._id !== id);
    setPosts(newPosts);
  };

  const getPost = (id:string) => {
    //@ts-ignore
    let index = posts.findIndex((post) => post._id === id);
    return posts[index];
  };

  return (
    <>
      <BrowserRouter basename={"/blog-React.JS//"}>      
      {<Navbar
        isUser={isUser}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setIsUser={setIsUser}
        profilMenu={profilMenu}
        setProfilemenu={setProfilemenu}
      ></Navbar>}
        <Routes>
          <Route path="/register" element={<Register errorToast={errorToast} />} />
          <Route
            path="/posts/add"
            element={
              <PostForm
                isUser={isUser}
                currentUser={currentUser}
                addPost={addPost}
                errorToast={errorToast}
                editPost={editPost}
                getPost={getPost}
                setCurrentUser={setCurrentUser}
                setIsUser={setIsUser}
              />
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <PostForm
              addPost={addPost}
              errorToast={errorToast}
                isUser={isUser}
                currentUser={currentUser}
                editPost={editPost}
                getPost={getPost}
                setCurrentUser={setCurrentUser}
                setIsUser={setIsUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login setIsUser={setIsUser} setCurrentUser={setCurrentUser} errorToast={errorToast} />
            }
          />
          <Route
            path=""
            element={
              <Home
              profilMenu={profilMenu}
        setProfilemenu={setProfilemenu}
              errorToast={errorToast}
                isUser={isUser}
                setIsUser={setIsUser}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                posts={posts}
                setPosts={setPosts}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                deletePost={deletePost}
              />
            }
          />
          <Route path="*" element={<NotFound/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
