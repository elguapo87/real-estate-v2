import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Map from "@/components/Map";
import { listData } from "@/lib/dummyData";

const ListPage = () => {
  return (
    <div className='flex max-md:flex-col max-md:gap-14 h-full md:mt-8'>
      <Filter />

      <div className='md:w-[60%] h-full'>
        <div className='h-full md:pr-12.5 flex flex-col gap-12.5'>
          <Filter />
          {listData?.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div>
        {listData?.map((item) => (
            <Map key={item.id} items={item} />
          ))}
      </div>
    </div>
  );
};

export default ListPage
 