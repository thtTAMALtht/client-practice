import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className="flex justify-center mt-16">
      <div className=" card bg-base-100 w-full border border-gray-200 max-w-2xl shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold text-center py-2">Login now!</h1>
          <form>
            <fieldset className="fieldset space-y-2">
              <label className="label text-lg font-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="outline w-full p-2 rounded-sm outline-gray-200 placeholder-gray-400"
                placeholder="Email"
              />
              <label className="label text-lg font-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="outline w-full p-2 rounded-sm outline-gray-200 placeholder-gray-400"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn bg-[#113F67] text-white mt-4">
                Login
              </button>
              <span className="mt-2 text-sm">
                Dont have an account ?{" "}
                <Link
                  className="text-[#F76100] font-semibold"
                  to="/auth/register"
                >
                  Register here!
                </Link>
              </span>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
    );
};

export default Login;