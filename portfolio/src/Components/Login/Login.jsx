import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    navigate('/admin')
    console.log("Login Data:", data);
  };

  return (
    <div className="w-full h-screen flex flex-col  items-center justify-center bg-[#050414]">
    
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gradient-to-r from-black via-[#0f172a] to-[#1e3a8a]
                        shadow-[0_0_40px_rgba(168,85,247,0.35)]

                          h-[60%]
                          w-[90%]
                          sm:w-[420px]
                          md:w-[480px]
                          lg:w-[520px]
                          xl:w-[560px] 
                          flex items-center justify-center flex-col gap-4 text-white border p-6 rounded-lg"
      >
        <input
          className="border p-6 rounded-lg bg-transparent
            mt- -8
            w-full
            border border-white/20
            text-white
            text-xl
            h-[1vh]
            placeholder-white/40
            focus:outline-none
            focus:border-purple-400/60
            focus:shadow-[0_0_20px_rgba(168,85,247,0.45)]
            transition-all duration-300
"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          className="border w-full p-6 rounded-lg bg-transparent
            border border-white/20
            text-white
            text-xl
            mt-4
            h-[1vh]
            placeholder-white/40
            focus:outline-none
            focus:border-purple-400/60
            focus:shadow-[0_0_20px_rgba(168,85,247,0.45)]
            transition-all duration-300
"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button
          className="border w-60 p-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600
            hover:from-purple-500 hover:to-indigo-500
            text-white font-medium
            shadow-[0_0_30px_rgba(168,85,247,0.5)]
            hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]
            transition-all duration-300
            mt-8
            "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
