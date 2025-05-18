"use client"

import Loading from '@/components/Loading';
import { AuthContext } from '@/context/AuthContext';
import { addPost } from '@/lib/api/actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AddPostPage = () => {

    const context = useContext(AuthContext);
    if (!context) throw new Error("AddPostPage must be within AuthContextProvider");
    const { isLoading, userData, fetchPosts } = context;

    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState("");
    const [desc, setDesc] = useState("");
    const [city, setCity] = useState("");
    const [bathroom, setBathroom] = useState(0);
    const [bedroom, setBedroom] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [type, setType] = useState("rent");
    const [property, setProperty] = useState("apartment");
    const [utilities, setUtilities] = useState("Owner is responsible");
    const [pet, setPet] = useState("Allowed");
    const [income, setIncome] = useState("");
    const [size, setSize] = useState(0);
    const [school, setSchool] = useState(0);
    const [bus, setBus] = useState(0);
    const [restaurant, setRestaurant] = useState(0);
    const [image1, setImage1] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);
    const [image3, setImage3] = useState<File | null>(null);
    const [image4, setImage4] = useState<File | null>(null);
    
    const router = useRouter();

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price.toString());
        formData.append("address", address);
        formData.append("desc", desc);
        formData.append("city", city);
        formData.append("bathroom", bathroom.toString());
        formData.append("bedroom", bedroom.toString());
        formData.append("latitude", latitude.toString());
        formData.append("longitude", longitude.toString());
        formData.append("type",type);
        formData.append("property", property); 
        formData.append("utilities", utilities);
        formData.append("pet", pet);
        formData.append("income", income);
        formData.append("size", size.toString());
        formData.append("school", school.toString());
        formData.append("bus", bus.toString());
        formData.append("restaurant", restaurant.toString());

        if (image1) formData.append("images", image1);
        if (image2) formData.append("images", image2);
        if (image3) formData.append("images", image3);
        if (image4) formData.append("images", image4);

        if (!(image1 || image2 || image3 || image4)) {
            toast.error("At least one image must be selected");
            return;
        }

        try {
            setLoading(true);

            const data = await addPost(formData);

            if (data.success) {
                toast.success(data.message);
                fetchPosts();
                router.push("/list");

            } else {
                toast.error(data.message);
            }
            
        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }

        setLoading(false);
    };

    
    useEffect(() => {
        if (!isLoading && !userData) {
            router.replace("/login");
        }
    }, [isLoading, userData, router]);

    return userData ? (
        <div className='relative h-full flex max-md:flex-col-reverse max-md:bg-[#fcf5f3] rounded-md max-md:px-3'>
            <div className="flex-[3] max-md:pb-3">
                {/* WRAPPER */}
                <div className='md:mt-7.5 md:mr-12.5 md:mb-25 md:ml-0'>
                    <form onSubmit={onSubmitHandler} className='flex justify-between max-md:justify-center max-md:items-center max-md:text-center flex-wrap gap-5'>
                        {/* ITEM */}
                        <div className='max-md:w-full max-md:mt-5 md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="title">* Title</label>
                            <input onChange={(e) => setTitle(e.target.value)} value={title} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="text" name='title' id='title' />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="title">* Price</label>
                            <input onChange={(e) => setPrice(Number(e.target.value))} value={price} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='price' id='price' min={0} />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="address">* Address</label>
                            <input onChange={(e) => setAddress(e.target.value)} value={address} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="text" name='address' id='address' />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="desc">Description</label>
                            <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' rows={6} name='desc' id='desc'></textarea>
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="address">* City</label>
                            <input onChange={(e) => setCity(e.target.value)} value={city} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="text" name='city' id='city' />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="bedroom">* Bedroom Number</label>
                            <input onChange={(e) => setBedroom(Number(e.target.value))} value={bedroom} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='bedroom' id='bedroom' min={0} />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="bathroom">* Bathroom Number</label>
                            <input onChange={(e) => setBathroom(Number(e.target.value))} value={bathroom} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='bathroom' id='bathroom' min={0} />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="latitude">Latitude</label>
                            <input onChange={(e) => setLatitude(Number(e.target.value))} value={latitude} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='latitude' id='latitude'/>
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="longitude">Longitude</label>
                            <input onChange={(e) => setLongitude(Number(e.target.value))} value={longitude} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='longitude' id='longitude' />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-1/2 md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="type">* Type</label>
                            <select onChange={(e) => setType(e.target.value)} value={type} className='max-md:p-2 md:p-4.75 border border-gray-500 rounded-[5px]' name="type">
                                <option value="rent">Rent</option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-1/2 md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="property">* Property</label>
                            <select onChange={(e) => setProperty(e.target.value)} value={property} className='max-md:p-2 md:p-4.75 border border-gray-500 rounded-[5px]' name="property">
                                <option value="apartment">apartment</option>
                                <option value="house">house</option>
                                <option value="condo">condo</option>
                                <option value="land">land</option>
                            </select>
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-1/2 md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="utilities">Utilities</label>
                            <select onChange={(e) => setUtilities(e.target.value)} value={utilities} className='max-md:p-2 md:p-4.75 border border-gray-500 rounded-[5px]' name="utilities">
                                <option value="owner">Owner is responsible</option>
                                <option value="tenant">Tenant is responsible</option>
                                <option value="shared">Shared</option>
                            </select>
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-1/2 md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="pet">Pet Policy</label>
                            <select onChange={(e) => setPet(e.target.value)} value={pet} className='max-md:p-2 md:p-4.75 border border-gray-500 rounded-[5px]' name="pet">
                                <option value="allowed">Allowed</option>
                                <option value="not-allowed">Not Allowed</option>
                            </select>
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="income">Income Policy</label>
                            <input onChange={(e) => setIncome(e.target.value)} value={income} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="text" name='income' id='income' />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="size">Total Size (square metres)</label>
                            <input onChange={(e) => setSize(Number(e.target.value))} value={size} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='size' id='size' min={0} />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="school">School distance</label>
                            <input onChange={(e) => setSchool(Number(e.target.value))} value={school} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='school' id='school' min={0} />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="bus">Bus station distance</label>
                            <input onChange={(e) => setBus(Number(e.target.value))} value={bus} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='bus' id='bus' min={0} />
                        </div>

                        {/* ITEM */}
                        <div className='max-md:w-full md:w-1/3 flex flex-col gap-1.25'>
                            <label htmlFor="restaurant">Restaurant distance</label>
                            <input onChange={(e) => setRestaurant(Number(e.target.value))} value={restaurant} className='max-md:p-2 md:p-5 rounded-[5px] border border-gray-500' type="number" name='restaurant' id='restaurant' min={0} />
                        </div>

                        <button type='submit' className='w-full py-2.5 md:py-4.5 rounded-[5px] border-none bg-teal-500 text-white font-bold cursor-pointer'>
                            {loading ? "Processing..." : "Send"}
                        </button>
                    </form>
                </div>
            </div>

            <div className='flex-[2] md:bg-[#fcf5f3] flex flex-col gap-5 items-center md:mt-5'>
                <h1 className='text-lg md:text-2xl mt-3 md:mt-5'>Upload images</h1>
                <label htmlFor="image1">
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (e.target.files && e.target.files.length > 0) {setImage1(e.target.files[0])}}} type="file" id='image1' hidden />
                    <Image src={image1 ? URL.createObjectURL(image1) : "/upload_images_area.svg"} alt='' width={500} height={500} className={`md:w-auto aspect-[2/1] md:h-45 border border-gray-300 rounded ${!image1 ? "opacity-40" : ""}`} />
                </label>
                
                <label htmlFor="image2">
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (e.target.files && e.target.files.length > 0) {setImage2(e.target.files[0])}}} type="file" id='image2' hidden />
                    <Image src={image2 ? URL.createObjectURL(image2) : "/upload_images_area.svg"} alt='' width={500} height={500} className={`md:w-auto aspect-[2/1] md:h-45 border border-gray-300 rounded ${!image2 ? "opacity-40" : ""}`} />
                </label>

                <label htmlFor="image3">
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (e.target.files && e.target.files.length > 0) {setImage3(e.target.files[0])}}} type="file" id='image3' hidden />
                    <Image src={image3 ? URL.createObjectURL(image3) : "/upload_images_area.svg"} alt='' width={500} height={500} className={`md:w-auto aspect-[2/1] md:h-45 border border-gray-300 rounded ${!image3 ? "opacity-40" : ""}`} />
                </label>

                <label htmlFor="image4">
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {if (e.target.files && e.target.files.length > 0) {setImage4(e.target.files[0])}}} type="file" id='image4' hidden />
                    <Image src={image4 ? URL.createObjectURL(image4) : "/upload_images_area.svg"} alt='' width={500} height={500} className={`md:w-auto aspect-[2/1] md:h-45 border border-gray-300 rounded ${!image4 ? "opacity-40" : ""}`} />
                </label>
            </div>
        </div>
    ) : (
        <Loading />
    )
}

export default AddPostPage
