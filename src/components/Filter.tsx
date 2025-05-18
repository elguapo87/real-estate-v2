"use client"

import { AuthContext } from "@/context/AuthContext"
import Image from "next/image"
import { useContext, useRef } from "react"

const Filter = () => {

  const context = useContext(AuthContext);
  if (!context) throw new Error("Filter must be inside AuthContextProvider");
  const {searchFilter, setSearchFilter, setIsSearched } = context;
  
  const cityRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const propertyRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const bedroomRef = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    if (cityRef.current && typeRef.current && propertyRef.current && priceRef.current && bedroomRef.current) {
      setSearchFilter({
        city: cityRef.current.value,
        type: typeRef.current.value === "any" ? [] : [typeRef.current.value],
        property: propertyRef.current.value === "any" ? [] : [propertyRef.current.value],
        price: {
          minPrice: parseInt((document.getElementById("minPrice") as HTMLInputElement)?.value) || 0,
          maxPrice: parseInt((document.getElementById("maxPrice") as HTMLInputElement)?.value) || Infinity 
        },
        bedroom: parseInt(bedroomRef.current.value) || 0
      });

      setIsSearched(true);
    }
  };
  
  return (
    <div className="flex max-md:items-center flex-col gap-2.5">
      {
        searchFilter.city
            &&
        <h1 className="font-light text-[20px] md:text-[24px]">Search results for <b>{searchFilter.city}</b></h1>
      }

      {/* TOP */}
      <div>
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px]" htmlFor="city">Location</label>
          <input ref={cityRef} className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]" type="text" id="city" name="city" placeholder="City" />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex max-md:flex-col max-md:items-start items-end justify-between gap-1.5 md:flex-wrap">

        <div className="flex items-start md:gap-1.5 max-md:gap-5.5">
          <div className="max-md:w-full flex flex-col gap-0.5">
            <label className="text-[10px]" htmlFor="type">Type</label>
            <select ref={typeRef} name="type" id="type" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]">
              <option value="any">any</option>
              <option value="buy">buy</option>
              <option value="rent">rent</option>
            </select>
          </div>

          <div className="max-md:w-full flex flex-col gap-0.5">
            <label className="text-[10px]" htmlFor="property">Property</label>
            <select ref={propertyRef} name="property" id="property" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]">
              <option value="any">any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px]" htmlFor="minPrice">Min Price</label>
          <input ref={priceRef} type="number" id="minPrice" name="minPrice" placeholder="any" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px]" htmlFor="maxPrice">Max Price</label>
          <input ref={priceRef} type="number" id="maxPrice" name="maxPrice" placeholder="any" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px]" htmlFor="bedroom">Bedroom</label>
          <input ref={bedroomRef} type="number" id="bedroom" name="bedroom" placeholder="any" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]" />
        </div>

        <button onClick={onSearch} type="button" className="max-md:w-full flex items-center justify-center w-20 p-2.5 border-none cursor-pointer bg-[#fece51]">
          <Image src="/search.png" alt="" width={24} height={24} className="max-md:w-5" />
        </button>
      </div>
    </div>
  )
}

export default Filter
