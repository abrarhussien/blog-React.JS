import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "./pages/PostForm";

function App() {
  const [isUser, setIsUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsUser(true);
      fetchCurrentUser();
    }
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3000/posts");
        setIsLoading(false);
        setPosts(data.data);
      } catch (err) {
        setIsUser(false);
        setCurrentUser(null);
      }
      //console.log(data.data)
    }
    async function fetchCurrentUser() {
      const { data } = await axios.get("http://localhost:3000/user", {
        headers: { jwt: localStorage.getItem("jwt") },
      });
      console.log(data);
      setCurrentUser(data);
    }
    fetchPosts();
  }, []);

  const addPost = (post) => {
    // clone & update
    let newPosts = [...posts, post];
    // state
    setPosts(newPosts);
  };
  const editPost = (updatedPost) => {
    //clone & update
    let newPosts = posts;
    let index = newPosts.findIndex((post) => post._id == updatedPost._id);
    newPosts[index] = { ...updatedPost };
    // state
    setPosts(newPosts);
  };

  const deletePost = (id) => {
    let newPosts = posts.filter((post) => post._id !== id);
    setPosts(newPosts);
  };

  const getPost = (id) => {
    let index = posts.findIndex((post) => post._id === id);
    return posts[index];
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/posts/add"
            element={
              <PostForm
                isUser={isUser}
                currentUser={currentUser}
                addPost={addPost}
              />
            }
          />
          <Route
            path="/posts/edit/:id"
            element={
              <PostForm
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
              <Login setIsUser={setIsUser} setCurrentUser={setCurrentUser} />
            }
          />
          <Route
            path=""
            element={
              <Home
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
