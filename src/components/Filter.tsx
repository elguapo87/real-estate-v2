"use client"

import Image from "next/image"

const Filter = () => {

  return (
    <div className="flex max-md:items-center flex-col gap-2.5">
 
        <h1 className="font-light text-[20px] md:text-[24px]">Search results for <b>Belgrade</b></h1>


      <div>
        <div className="flex flex-col gap-0.5">
          <label className="text-[10px]" htmlFor="city">Location</label>
          <input className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]" type="text" id="city" name="city" placeholder="City" />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex max-md:flex-col max-md:items-start items-end justify-between gap-1.5 md:flex-wrap">

        <div className="flex items-start md:gap-1.5 max-md:gap-5.5">
          <div className="max-md:w-full flex flex-col gap-0.5">
            <label className="text-[10px]" htmlFor="type">Type</label>
            <select name="type" id="type" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]">
              <option value="any">any</option>
              <option value="buy">buy</option>
              <option value="rent">rent</option>
            </select>
          </div>

          <div className="max-md:w-full flex flex-col gap-0.5">
            <label className="text-[10px]" htmlFor="property">Property</label>
            <select name="property" id="property" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]">
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
          <input type="number" id="minPrice" name="minPrice" placeholder="any" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px]" htmlFor="maxPrice">Max Price</label>
          <input type="number" id="maxPrice" name="maxPrice" placeholder="any" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]" />
        </div>

        <div className="flex flex-col gap-0.5">
          <label className="text-[10px]" htmlFor="bedroom">Bedroom</label>
          <input type="number" id="bedroom" name="bedroom" placeholder="any" className="w-full p-2.5 border border-[#e0e0e0] rounded-[5px] text-[14px]" />
        </div>

        <button type="button" className="max-md:w-full flex items-center justify-center w-20 p-2.5 border-none cursor-pointer bg-[#fece51]">
          <Image src="/search.png" alt="" width={24} height={24} className="max-md:w-5" />
        </button>
      </div>
    </div>
  )
}

export default Filter
