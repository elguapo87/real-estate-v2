"use client"

import Card from '@/components/Card';
import Filter from '@/components/Filter';
import React, { useContext, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AuthContext, PostDataType } from '@/context/AuthContext';

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const ListPage = () => {
  return (
    <div className='flex max-md:flex-col max-md:gap-14 h-full md:mt-8'>
      <Suspense fallback={<div>Loading...</div>}>
        <FilteredContent />
      </Suspense>
    </div>
  );
};

export default ListPage;

// Extracted content with useSearchParams in its own client component
const FilteredContent = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("ListPage must be within AuthContextProvider");
  const { posts, searchFilter, isSearched, filteredPosts, setFilteredPosts } = context;

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");

  useEffect(() => {
    if (!posts) return;

    let newFilteredPosts = posts;

    if (userId && userName) {
      newFilteredPosts = newFilteredPosts.filter((item: PostDataType) => {
        return item.user?.id?.toString() === userId && item.user?.userName;
      });
    }

    if (isSearched) {
      newFilteredPosts = posts.filter((item: PostDataType) => {
        const matchesCity = !searchFilter.city || item.city.toLowerCase().includes(searchFilter.city.toLowerCase());
        const matchesType = searchFilter.type.length === 0 || searchFilter.type.includes(item.type);
        const matchesProperty = (searchFilter.property?.length ?? 0) === 0 || (searchFilter.property ?? []).includes(item.property);
        const matchesPrice = (searchFilter.price.minPrice <= item.price) && (searchFilter.price.maxPrice >= item.price);
        const matchesBedroom = searchFilter.bedroom === 0 || item.bedroom === searchFilter.bedroom;

        return matchesCity && matchesType && matchesProperty && matchesPrice && matchesBedroom;
      });
    }

    setFilteredPosts(newFilteredPosts);
  }, [posts, isSearched, searchFilter, userId, userName, setFilteredPosts]);

  return (
    <>
      <div className='md:w-[60%] h-full'>
        <div className='h-full md:pr-12.5 flex flex-col gap-12.5'>
          <Filter />
          {filteredPosts?.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      {/* MAP CONTAINER */}
      <div className='md:sticky top-[132px] md:w-[40%] h-[500px] md:h-[83vh]'>
        <Map items={filteredPosts || []} />
      </div>
    </>
  );
};