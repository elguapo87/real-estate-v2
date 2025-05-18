"use client";

import Image from "next/image";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";

const customIcon = new L.Icon({
    iconUrl: "/marker-icon.png", // Use a local image in `public/` folder
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

type PostDetailType = {
    desc?: string;
    utilities?: string;
    pet?: string;
    income?: string;
    size?: number;
    school?: number;
    bus?: number;
    restaurant?: number;
  };
  
  type ImageType = {
    id: number;
    url: string;
  };
  
  type PostDataType = {
    id: number;
    title: string;
    images: ImageType[];
    bedroom: number;
    bathroom: number;
    price: number;
    property: string;
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    postDetail: PostDetailType[];
  };  

const Pin = ({ item } : { item: PostDataType }) => {

    return (
        <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
            <Popup>
                <Link href={`/${item.id}`} className="w-40 flex gap-4 items-center">
                  
                    <Image src={item.images?.[0]?.url} alt="" width={64} height={64} className="w-16 h-16 object-cover rounded-[5px]" />
               
                    <div className="flex flex-col justify-between text-sm"> 
                        <span className="whitespace-nowrap">{item.bedroom === 1 ? item.bedroom + " bedroom" : item.bedroom + " bedrooms"} </span>
                        <span className="font-semibold">€{item.price}</span>
                    </div>
                </Link>
            </Popup>
        </Marker>
    );
};

export default Pin;
