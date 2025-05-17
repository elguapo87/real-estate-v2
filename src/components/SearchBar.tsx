"use client"

import Image from "next/image";
import { useState } from "react"

const SearchBar = () => {

    const [query, setQuery] = useState({
        type: "all",
        city: "",
        minPrice: 0,
        maxPrice: 0
    });

    const types = ["all", "buy", "rent"];

    const switchType = (val: string) => {
        setQuery((prev) => ({ ...prev, type: val }));
    };

    return (
        <div className="max-md:mb-30">
            <div className="">
                {types.map((type) => (
                    <button key={type} onClick={() => switchType(type)} className={`max-md:text-sm px-6 py-2 md:px-8 md:py-4 bg-white capitalize border border-[#999] border-b-none cursor-pointer state-btn ${query.type === type && "!bg-black text-white"}`}>
                        {type}
                    </button>
                ))}
            </div>

            <form className="md:border border-[#999] flex max-md:flex-col justify-between h-16 gap-2 shadow-md">
                <input type="text" name="city" placeholder="City" className="max-md:text-sm max-md:w-full max-md:py-2 border md:border-none px-[10px] w-[200px]" />
                <input type="number" name="minPrice" placeholder="Min Price" className="max-md:text-sm max-md:w-full max-md:py-2 border md:border-none px-[10px] w-[200px]" />
                <input type="number" name="maxPrice" placeholder="Max Price" className="max-md:text-sm max-md:w-full max-md:py-2 border md:border-none px-[10px] w-[200px]" />
                <button type="submit" className="border-none bg-[#f5ce51] flex-1 flex items-center justify-center max-md:py-1.5 cursor-pointer">
                    <Image src="/search.png" alt="" width={24} height={24} className="max-md:w-5" />
                </button>
            </form>
        </div>
    )
}

export default SearchBar


