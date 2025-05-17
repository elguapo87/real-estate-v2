import { Marker, Popup } from "react-leaflet";
import Link from "next/link";

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

const Pin = ({ item } : { item: ListDataTypes }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img} alt="" />
          <div className="textContainer">
            <Link href={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default Pin