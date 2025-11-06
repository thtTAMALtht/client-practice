import React, { use } from "react";
import { Link } from "react-router";
import AuthContext from "../../context/AuthContext";
import useAxiosHook from "../../hooks/useAxiosHook";

const Register = () => {
  const { googleSignIn } = use(AuthContext);
  const axiosHook = useAxiosHook();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        axiosHook.post("/users", userInfo)
        .then((data) => {
          console.log("after user post", data.data);
        });

        // fetch("http://localhost:5000/users",{
        //   method : "POST",
        //   headers : {
        //     "Content-Type" : "application/json"
        //   },
        //   body : JSON.stringify(userInfo)
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //   console.log('after user post',data);
        // })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center mt-16">
      <div className=" card bg-base-100 w-full border border-gray-200 max-w-2xl shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold text-center py-2">Register now!</h1>
          <form>
            <fieldset className="fieldset space-y-2">
              <label className="label text-lg font-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="outline w-full p-2 rounded-sm outline-gray-200 placeholder-gray-400"
                placeholder="Name"
              />

              <label className="label text-lg font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="outline w-full p-2 rounded-sm outline-gray-200 placeholder-gray-400"
                placeholder="Email"
              />

              <label className="label text-lg font-semibold">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="outline w-full p-2 rounded-sm outline-gray-200 placeholder-gray-400"
                placeholder="Photo URL"
              />

              <label className="label text-lg font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="outline w-full p-2 rounded-sm outline-gray-200 placeholder-gray-400"
                placeholder="Password"
              />
              <label className="label">
                <input type="checkbox" name="term" className="checkbox" />
                Accept our terms and conditions
              </label>

              <button className="btn bg-[#F76100] mt-4 text-white">
                Register
              </button>
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <span className="mt-2 text-sm">
                Already have an account ?{" "}
                <Link to="/login" className="text-[#113F67] font-semibold">
                  Login here!
                </Link>
              </span>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
