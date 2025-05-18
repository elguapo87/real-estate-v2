"use client"

import { AuthContext } from '@/context/AuthContext';
import { loginUser, registerUser } from '@/lib/api/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {

  const context = useContext(AuthContext);
  if (!context) throw new Error("Login must be within AuthContextProvider");
  const { userData, setUserData } = context;

  const [state, setState] = useState("Login");
  const [image, setImage] = useState<File | null>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      
      if (state !== "Login") {
        formData.append("userName", userName);

        if (image) formData.append("avatar", image);
      }

      const data = state === "Login" ? await loginUser(formData) : await registerUser(formData);

      if (data.success) {
        setUserData(data.user);
        router.push("/");
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errMessage);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (userData) {
      router.replace("/");
      return;
    }
  }, [userData, router])

  return (
    <div className='min-h-[80vh] flex items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 m-auto items-start p-8 max-w-[340px]  min-w-[340px] md:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className="text-2xl font-semibold">{state === "Login" ? "Login" : "Register"}</p>
        
        {
          state !== "Login"
                &&
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <label htmlFor="image">
                <Image src={image ? URL.createObjectURL(image) : "/upload_area.svg"} alt='' width={64} height={64} className='aspect-square rounded-full object-cover' />
                <input onChange={(e) => setImage(e.target.files?.[0] || null)} type="file" id='image' hidden  />
              </label>
              <p>Upload User image (optional)</p>
            </div>

            <div className="w-full">
              <p>Username</p>
              <input onChange={(e) => setUserName(e.target.value)} value={userName} className='border border-zinc-300 rounded w-full p-2 mt-1 outline-[#254,205,81,0.438]' type="text" placeholder='Username' required />
            </div> 
          </div>
        }
        <div className="w-full">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-zinc-300 rounded w-full p-2 mt-1 outline-[#254,205,81,0.438]' type="email" placeholder='Email' required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1 outline-[#555222]' type="password" placeholder='Password' required />
        </div>

        <button type='submit' className='bg-blue-500 text-white w-full py-2 rounded-md text-base' disabled={loading}>
          {loading ? "Processing..." : state === "Login" ? "Login" : "Register"}
        </button>

        {
          state === "Login"
              ?
          <p onClick={() => setState("Register")}>Don&apos;t have an account? <span className='text-blue-600 cursor-pointer'>Sign Up</span></p>
              :
          <p onClick={() => setState("Login")}>Already have an account? <span className='text-blue-600 cursor-pointer'>Login</span></p>
        }
      </form>
    </div>
  )
}

export default Login
