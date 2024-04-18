import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({
  isUser,
  currentUser,
  posts,
  setPosts,
  isLoading,
  setIsLoading,
  deletePost,
  setIsUser,
  setCurrentUser,
}) {
  const navigate = useNavigate();
  const addpost = () => {
    navigate("/posts/add");
  };
  return (
    <div className="graybg min-h-screen">
      <Navbar
        isUser={isUser}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setIsUser={setIsUser}
      ></Navbar>
      <div className="sm:px-20 md:px-32 lg:px-60 xl:px-80 main ">
        <div className="flex flex-col pt-9 w-full main items-center bg-white relative">
          {posts &&
            posts.map((post) => (
              <Post
                key={post._id}
                data={post}
                isUser={isUser}
                currentUser={currentUser}
                deletePost={deletePost}
              ></Post>
            ))}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.3}
            stroke="currentColor"
            className="w-16 h-16 fixed top-screen left-2 sm:left-20 md:left-36 lg:left-64 xl:left-80 2xl:left-96 hover:cursor-pointer purple text-zinc-700"
            onClick={addpost}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Home;
