import Footer from "./Footer";

function Login() {
    return <div className="flex flex-col min-h-screen">
    <div className="flex-1 w-full md:w-[50%] text-center mt-20 md:mt-[25%] xl:mt-[18%] flex flex-col items-center mx-auto">
        <p className="sm:text-3xl text-4xl">Welcome to <img src="naing-high-resolution-logo-transparent.png" alt="Logo" className="w-[100px] inline" /></p>
        <a href="http://localhost:3000/auth/google">
            <button className="border-2 border-orange-700 text-orange-700 rounded-md p-2 m-2 cursor-pointer hover:border-none hover:bg-orange-400 hover:text-white">
                  <img src="google.png" alt="Google Logo" className="w-7 inline mr-2" />
                Continue with Google</button>
        </a>
    </div>
    <Footer />
    </div>;
}

export default Login;