"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });

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

const Map = ({ items }: { items: PostDataType[]}) => {
  return (
    <MapContainer center={[44.2107675, 20.9224158]} zoom={7} scrollWheelZoom={true} className="h-[500px] md:h-[83vh] w-full rounded-[20px]">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => {
        return <Pin key={item.id} item={item} />;
      })}
    </MapContainer>
  );
};

export default Map;


