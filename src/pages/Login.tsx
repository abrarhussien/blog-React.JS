import { Link, useNavigate } from "react-router-dom";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import myImg from "../assets/images/original-0c14504bd291054d76548cb015dff89a.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { environment } from "../environment";

//var usernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
const emailRegex = new RegExp(
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
);
//let passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/);

interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors,   values } = props;
  return (
    <Form className="sm:w-80 w-64 m-auto transition-all ">
      <div className="relative mb-5">
        {values.email && (
          <h1 className="absolute topm left-2 bg-white ">Email</h1>
        )}
        <Field
          type="email"
          name="email"
          placeholder="email"
          className={`border-b-2  w-full px-1 py-3 placeholder:text-zinc-900 ${
            values.email ? "border-2 rounded":""
          } ${
            touched.email && errors.email?"border-red-500  ":"border-zinc-400"
          }`}
        />
        {touched.email && errors.email && (
          <div className="text-red-500">{errors.email}</div>
        )}
      </div>

      <div className="relative">
        {values.password && (
          <h1 className="absolute topm left-2 bg-white">Password</h1>
        )}

        <Field
          type="password"
          name="password"
          placeholder="password"
          className={`border-b-2 w-full px-1 py-3 placeholder:text-zinc-900 ${
            values.password ? "border-2 rounded":""
          } ${
            touched.password &&
            errors.password ?
            "border-red-500 ":"border-zinc-400"
          }`}
        />
        {touched.password && errors.password && (
          <div className="text-red-500">{errors.password}</div>
        )}
      </div>

      <button
        type="submit"
        // disabled={isSubmitting}
        className={`bg-zinc-900 text-white px-8 py-2 w-full rounded-3xl mt-9 disabled:bg-zinc-600F hover:bg-zinc-800 `}
      >
        sign in
      </button>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

//@ts-ignore
function Login({ setIsUser, setCurrentUser ,errorToast}) {

  const warningToast = (message:string) =>
    toast.warn(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const navigate = useNavigate();
  const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: (props) => {
      return {
        email: props.initialEmail || "",
        password: "",
      };
    },
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      // else if (!passwordRegex.test(values.password)) {
      //   errors.password = `At least one lowercase alphabet i.e. [a-z]
      //   At least one uppercase alphabet i.e. [A-Z]
      //   At least one Numeric digit i.e. [0-9]
      //   At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
      //   Also, the total length must be in the range [8-15]`;
      // }

      return errors;
    },

    handleSubmit: (values) => {
      
      axios
        .post(environment.apiUrl+`/user/login`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data.jwt);
          localStorage.setItem("jwt", res.data.jwt);
          setIsUser(true);
          setCurrentUser(res.data.user);

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 409) {
            warningToast("wrong email or password");
            console.log(409);
          } else {
            errorToast("something went wrong");
          }
        });
    },
  })(InnerForm);

  return (
    <div className="bg-zinc-900 h-screen py-24 px-4 sm:px-32 flex items-center justify-center">
      <div className="graybg w-full h-full  rounded-3xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl overflow-hidden col-span-1 xl:col-span-3 hidden lg:block ">
          <img className="h-full" src={myImg} />
        </div>
        <div className="col-span-1 xl:col-span-2 p-4  ">
          <div className="bg-white h-full rounded-3xl grid grid-cols-1 justify-center items-center p-4 ">
            <div className=" text-center">
              <h1 className="font-bold mb-8 text-2xl hover:cursor-pointer"> <Link to="/">zero</Link> </h1>
              <h1 className="font-bold text-3xl ">welcome back!</h1>
              <h6 className="text-md">please enter your deatails</h6>
            </div>
            <MyForm message="login" />

            <p className="text-center">
              You don't have an account? <br className="sm:hidden" />
              <span>
                <Link to="/register" className="font-semibold">
                  sign up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Login;
