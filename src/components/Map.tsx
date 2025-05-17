import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

type ListDataTypes = {
    id: number;
    title: string;
    img: string;
    bedroom: number;
    bathroom: number;
    price: number;
    address: string,
    latitude: number,
    longitude: number,
    city: string;
    property: string;
};

const Map = ({ items } : { items: ListDataTypes[] }) => {
  return (
    <MapContainer center={[52.4797, -1.90269]} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  )
}

export default Map