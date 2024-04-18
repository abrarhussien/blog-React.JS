import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
interface FormValues {
  title: string;
  body: string;
  image: string;
}

interface OtherProps {
  message: string;
}

interface MyFormProps {
  initialTitle: string;
  initialBody: string;
  initialImage: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

function PostForm({
  isUser,
  currentUser,
  addPost,
  getPost,
  editPost,
  setIsUser,
  setCurrentUser,
}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const mood = id ? "edit" : "add";
  let post = { title: "", body: "", image: "" };
  if (mood === "edit") {
    post = getPost(id);
  }

  const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message } = props;
    return (
      <Form className="sm:w-full min-w-72 w-5/6 m-auto">
        <div className="relative mb-5">
          <h1 className="absolute topm left-2 bg-white ">Image</h1>
          <Field
            type="text"
            name="image"
            placeholder=""
            className={`border-2 rounded border-zinc-400 w-full px-1 py-3 placeholder:text-zinc-900 ${
              touched.image && errors.image && "border-red-500 border-2 rounded"
            }`}
          />
          {touched.image && errors.image && (
            <div className="text-red-500">{errors.image}</div>
          )}
        </div>

        <div className="relative mb-5">
          <h1 className="absolute topm left-2 bg-white ">Title</h1>
          <Field
            type="text"
            name="title"
            placeholder=""
            className={`border-2 rounded border-zinc-400 w-full px-1 py-3 placeholder:text-zinc-900 ${
              touched.title && errors.title && "border-red-500 border-2 rounded "
            }`}
          />
          {touched.title && errors.title && (
            <div className="text-red-500">{errors.title}</div>
          )}
        </div>

        <div className="relative mb-5">
          <h1 className="absolute topm left-2 bg-white ">body</h1>
          <Field
            type="text"
            name="body"
            as="textarea"
            placeholder=""
            className={`border-2 rounded border-zinc-400 w-full px-1 py-3 placeholder:text-zinc-900 ${
              touched.body && errors.body && "border-red-500 border-2 rounded"
            }`}
          />
          {touched.body && errors.body && (
            <div className="text-red-500">{errors.body}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-zinc-900 text-white px-8 py-2 w-40 mx-auto rounded-3xl mt-4"
        >
          {mood === "add" ? "Add" : "Edit"}
        </button>
      </Form>
    );
  };

  const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: (props) => {
      return {
        title: mood === "add" ? "" : post.title,
        body: mood === "add" ? "" : post.body,
        image: mood === "add" ? "" : post.image,
      };
    },
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.title) {
        errors.title = "Required";
      }
      if (!values.body) {
        errors.body = "Required";
      }
      if (!values.image) {
        errors.image = "Required";
      }

      return errors;
    },

    handleSubmit: (values) => {
      if (mood === "add") {
        axios
          .post(
            `http://localhost:3000/posts`,
            { ...values, user: currentUser._id },
            {
              headers: { jwt: localStorage.getItem("jwt") },
            }
          )
          .then((res) => {
            console.log(res);
            addPost(res.data.data);
            navigate("/home");
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .patch(
            `http://localhost:3000/posts/${post._id}`,
            { ...post, ...values },
            {
              headers: { jwt: localStorage.getItem("jwt") },
            }
          )
          .then((res) => {
            console.log(res);
            editPost({ ...post, ...values });
            navigate("/home");
          })
          .catch((err) => console.log(err));
      }
    },
  })(InnerForm);
  return (
    <div className="graybg min-h-screen">
      <Navbar
        isUser={isUser}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setIsUser={setIsUser}
      ></Navbar>
      <div className="sm:px-20 md:px-32 lg:px-56 xl:px-76 main">
        <div className="flex   w-full main  items-start bg-white ">
          <div className="flex flex-col pt-11  w-full sm:px-10 md:px-20 lg:px-10 xl:px-40 2xl:px-80 items-center items-start bg-white ">
            <h1 className="mb-10 text-4xl font-semibold">{mood==="add"?"Add Post":"Edit Post"}</h1>
            <MyForm message="add" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
