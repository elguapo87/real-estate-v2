"use client"

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react"

const SearchBar = () => {

    const context = useContext(AuthContext);
    if (!context) throw new Error("ListPage must be within AuthContextProvider");
    const { setSearchFilter, setIsSearched } = context;

    const router = useRouter();

    const typeRef = useRef<HTMLButtonElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const minPriceRef = useRef<HTMLInputElement>(null);
    const maxPriceRef = useRef<HTMLInputElement>(null);

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

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const minPrice = minPriceRef.current?.value ? parseInt(minPriceRef.current.value) : 0;
        const maxPrice = maxPriceRef.current?.value ? parseInt(maxPriceRef.current.value) : Infinity;

        setSearchFilter((prev) => ({
            ...prev,
            city: cityRef.current ? cityRef.current.value : "",
            type: query.type === "all" ? [] : [query.type],
            price: { minPrice, maxPrice }
        }));

        setIsSearched(true);

        setTimeout(() => {
            router.push("/list");
        }, 100);
    };

    return (
        <div className="max-md:mb-30">
            <div className="">
                {types.map((type) => (
                    <button ref={typeRef} key={type} onClick={() => switchType(type)} className={`max-md:text-sm px-6 py-2 md:px-8 md:py-4 bg-white capitalize border border-[#999] border-b-none cursor-pointer state-btn ${query.type === type && "!bg-black text-white"}`}>
                        {type}
                    </button>
                ))}
            </div>

            <form onSubmit={onSearch} className="md:border border-[#999] flex max-md:flex-col justify-between h-16 gap-2 shadow-md">
                <input ref={cityRef} type="text" name="city" placeholder="City" className="max-md:text-sm max-md:w-full max-md:py-2 border md:border-none px-[10px] w-[200px]" />
                <input ref={minPriceRef} type="number" name="minPrice" placeholder="Min Price" className="max-md:text-sm max-md:w-full max-md:py-2 border md:border-none px-[10px] w-[200px]" />
                <input ref={maxPriceRef} type="number" name="maxPrice" placeholder="Max Price" className="max-md:text-sm max-md:w-full max-md:py-2 border md:border-none px-[10px] w-[200px]" />
                <button type="submit" className="border-none bg-[#f5ce51] flex-1 flex items-center justify-center max-md:py-1.5 cursor-pointer">
                    <Image src="/search.png" alt="" width={24} height={24} className="max-md:w-5" />
                </button>
            </form>
        </div>
    )
}

export default SearchBar


