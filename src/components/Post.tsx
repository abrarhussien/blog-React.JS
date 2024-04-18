import axios from "axios";
import myImg from "../assets/images/image.png";
import { useNavigate } from "react-router-dom";

function Post({ data ,isUser,currentUser,deletePost}) {
  const navigate= useNavigate()
  const handleDeletePost=(id)=>{
    axios.delete(`http://localhost:3000/posts/${id}`,{
      headers:{jwt:localStorage.getItem("jwt")},
    })
    .then(res => {
      console.log(res)
      deletePost(id)    
    }).catch(err=>console.log(err))
  }
  const handleEditPost=(id)=>{
    navigate(`/posts/edit/${id}`)
  }

  return (
    <div className="flex flex-col border rounded-lg border-zinc-300 post bg-white mb-4">
      <div className="flex p-2 justify-between   items-center ">
        <div className="flex gap-1 items-center ">
          <div className="h-8 w-8  rounded-full border border-zinc-200 overflow-hidden">
            <img
              className="w-full"
              src={data.user.image ? data.user.image : myImg}
              alt=""
            />
          </div>

          <h2>@{data.user.userName}</h2>

        </div>
        {isUser && currentUser._id=== data.user._id &&(
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-4 h-4 text-zinc-800 font-thin hover:cursor-pointer"
              onClick={()=>handleEditPost(data._id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-4 h-4 text-zinc-800 hover:cursor-pointer font-thin "
              onClick={()=>handleDeletePost(data._id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="max-h-80 overflow-hidden">
        <img src={data.image} alt="" className="w-full" />
      </div>
      <div className="p-4">
        <h1 className="font-bold text-lg">{data.title}</h1>
        <p>{data.body}</p>
      </div>
    </div>
  );
}

export default Post;
