"use client"

import Card from '@/components/Card'
import Chat from '@/components/Chat'
import Loading from '@/components/Loading'
import { AuthContext, PostDataType } from '@/context/AuthContext'
import { getUserSavedPosts, updateUser } from '@/lib/api/actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type SavedPostType = {
  post: PostDataType
};

const ProfilePage = () => {

  const context = useContext(AuthContext);
  if (!context) throw new Error("ProfilePage must be within AuthContextProvider");
  const { userData, posts, isLoading, fetchUserData } = context;

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const [userSavedPosts, setUserSavedPosts] = useState<SavedPostType[] | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData || !userData.id) {
      toast.error("User data is not available. Please refresh and try again.");
      return;
    }

    const formData = new FormData();
    formData.append("id", userData.id.toString());
    formData.append("userName", userName || userData.userName);
    formData.append("email", email || userData.email);
    if (image) formData.append("avatar", image);

    try {
      const data = await updateUser(formData);

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
        setIsEdit(false);

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "An unknown error occured";
      toast.error(errMessage);
    }
  };

  const fetchUserPosts = async () => {
    if (!userData) return;

    try {
      const data = await getUserSavedPosts();
      if (data.success) {
        setUserSavedPosts(data.userSavedPosts);
      }

    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "An unknown error occured";
      toast.error(errMessage);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserPosts();
    }
  }, [userData]);


  const filteredPosts = userSavedPosts?.flatMap((item) => item.post ? [item.post] : []);


  useEffect(() => {
    if (!isLoading && !userData) {
      if (window.location.pathname === "/profile") {
        router.replace("/login");
      }
    }
  }, [isLoading, userData, router]);

  if (isLoading) return <Loading />;

  return userData ? (
    <div className='flex max-md:flex-col h-full md:mt-8'>
      {/* DETAILS */}
      <div className='flex-[3] pb-12.5'>
        <div className='md:pr-12.5 flex flex-col gap-8 md:gap-12.5'>

          {/* TITLE */}
          <h1 className='text-center font-light text-xl md:text-2xl'>User Information</h1>

          {/* INFO */}
          <form onSubmit={handleUpdate} className='max-md:self-center flex flex-col gap-5 md:gap-10 bg-[rgba(254,205,81,0.438)] py-5 px-10 rounded-md w-max shadow-xl'>
            {
              isEdit
                ?
                <>
                  <div className='relative flex items-end gap-5 md:gap-10'>
                    <button onClick={(e) => { e.preventDefault(); setIsEdit(false); }} className='absolute top-0 right-0 translate-x-7 -translate-y-3 text-2xl cursor-pointer'>x</button>
                    <p className='md:text-xl'>Select Image:</p>
                    <label htmlFor="image">
                      <input onChange={(e) => { if (e.target.files) setImage(e.target.files[0]); }} type="file" id='image' hidden />
                      <Image
                        src={image ? URL.createObjectURL(image) : userData.avatar || "/upload_area.svg"}
                        alt=''
                        width={60}
                        height={60}
                        className='w-10 h-10 md:w-15 md:h-15 rounded-full object-cover aspect-square'
                      />
                    </label>
                  </div>
                  <input onChange={(e) => setUserName(e.target.value)} defaultValue={userData.userName} className='md:text-xl font-bold outline-none p-3' type="text" />
                  <input onChange={(e) => setEmail(e.target.value)} defaultValue={userData.email} className='md:text-xl font-bold outline-none p-3' type="email" />

                  <button type='submit' className='px-3 py-1 text-sm font-extrabold text-white md:px-4 md:py-2 bg-[#389755] border-none cursor-pointer rounded hover:scale-101 duration-300'>Save</button>
                </>
                :
                <>
                  <span className='flex items-end gap-5 md:gap-10'>
                    <p className='md:text-xl'>Avatar:</p>
                    <Image
                      src={userData.avatar || "/noAvatar.png"}
                      alt=''
                      width={60}
                      height={60}
                      className='w-10 h-10 md:w-15 md:h-15 rounded-full object-cover aspect-square'
                    />
                  </span>
                  <span className='flex items-center justify-between gap-5 md:text-xl'>Username: <b>{userData.userName}</b></span>
                  <span className='flex items-center gap-5 md:text-xl'>Email: <b>{userData.email}</b></span>
                  <button onClick={(e) => { e.preventDefault(); setIsEdit(true); }} className='px-3 py-1 text-sm font-bold md:px-4 md:py-2 bg-[#fece51] border-none cursor-pointer rounded hover:scale-101 duration-300'>Update Profile</button>
                </>
            }

          </form>

          {/* TITLE */}
          <div className='flex items-start justify-between'>
            <h1 className='font-light text-xl md:text-2xl'>My List</h1>
            <button onClick={() => router.push("/add")} className='px-3 py-1 text-sm text-white md:px-6 md:py-3 bg-[#389755] border-none cursor-pointer rounded hover:scale-101 duration-300'>Create New Post</button>
          </div>

          {
            posts?.filter((post) => post.user.id === userData.id).length === 0
              ? <p>You don&apos;t have any posts</p>
              : posts?.filter((post) => post.user.id === userData.id).map((item) => (
                <Card key={item.id} item={item} />
              ))
          }

          <h1 className='font-light text-xl md:text-2xl'>Saved List</h1>

          {
            userSavedPosts?.length === 0
              ?
              <p className='text-gray-500'>You haven&apos;t saved any posts yet.</p>
              :
              filteredPosts?.map((post) => (
                <Card key={post.id} item={post} type='profile' />
              ))
          }
        </div>
      </div>

      {/* CHAT CONTAINER - RIGHT SIDE */}
      <div className='flex-[2] bg-[#fcf5f3] h-full pb-3'>
        <div className='px-5 h-full'>
          <Chat />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ProfilePage

