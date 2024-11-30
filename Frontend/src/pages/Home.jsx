import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-[url(https://images.unsplash.com/photo-1514749204155-24e484635226?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover h-screen w-full flex justify-between flex-col">
        <div className="text-4xl font-semibold ml-5 mt-5 text-white ">Uber</div>
        <div className="py-4 px-4 bg-white w-full">
          <h3 className="text-2xl font-bold mb-2">Get Started with Uber</h3>
          <Link
            to={"/login"}
            className=" inline-block text-center w-full bg-black text-white py-3 rounded mb-2 mt-2"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
