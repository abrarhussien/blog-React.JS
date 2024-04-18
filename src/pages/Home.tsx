import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

//@ts-ignore
function Home({isUser,currentUser,posts,setPosts,isLoading,setIsLoading,deletePost,setIsUser,setCurrentUser,errorToast}) {
  const [showVerticalyCenteredModal, setShowVerticalyCenteredModal] =
    useState(false);
    
    const [postToDelete,setPostToDelete]=useState(null);

    const handleDeletePost=()=>{
      console.log(postToDelete)
      axios.delete(`http://localhost:3000/posts/${postToDelete}`,{
        headers:{jwt:localStorage.getItem("jwt")},
      })
      .then(res => {
        console.log(res)
        deletePost(postToDelete) 
        setShowVerticalyCenteredModal(false)   
      }).catch(err=>console.log(err))
    }

  const navigate = useNavigate();
  const addpost = () => {
    navigate("/posts/add");
  };
  return (
    <div className="graybg main">

      <div className="sm:px-20 md:px-32 lg:px-60 xl:px-80 main ">
        <div className="flex flex-col pt-9 w-full main items-center bg-white relative">
         {isLoading && <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>}
          {posts &&
            //@ts-ignore
            posts.map((post) => (
              <Post
                key={post._id}
                data={post}
                isUser={isUser}
                currentUser={currentUser}
                deletePost={deletePost}
                setShowVerticalyCenteredModal={setShowVerticalyCenteredModal}
                setPostToDelete={setPostToDelete}
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

        <TEModal
        show={showVerticalyCenteredModal}
        setShow={setShowVerticalyCenteredModal}
      >
        <TEModalDialog centered  >
          <TEModalContent  className="border-2 border-red-500">
            <TEModalHeader  className="bg-white border-b-1 border-zinc-200">
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800">
                confirm delete
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowVerticalyCenteredModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody className="bg-white">
              <p>are you sure you want to delete this post?</p>
            </TEModalBody>
            <TEModalFooter className="bg-white">
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowVerticalyCenteredModal(false)}
                >
                  Cancle
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                onClick={()=>handleDeletePost()}
                  type="button"
                  className="ml-1 inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  delete
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}

export default Home;
