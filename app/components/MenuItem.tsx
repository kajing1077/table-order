import Image from "next/image";
import Link from "next/link";

type MenuProps = {
  menu: {
    id: number;
    name: string;
    price: number;
    description?: string;
    imageUrl: string;
    category: string;
  };
};

function MenuItem({ menu }: MenuProps) {
  return (
    <Link
      href={`/menu/${menu.id}`}
      className="flex items-center justify-between gap-4 cursor-pointer"
    >
      <div className="flex flex-col">
        <span className="text-17 text-tossgray-800 whitespace-normal break-words font-semibold">
          {menu.name}
        </span>
        <p className="text-15 text-tossgray-800 font-medium">
          {menu.price.toLocaleString()}원
        </p>
      </div>
      <div className="block overflow-hidden relative w-[104px] h-[104px] flex-shrink-0 rounded-lg">
        <Image
          src={menu.imageUrl}
          alt={menu.name}
          fill
          sizes="104px"
          className="rounded-xl"
          style={{
            objectFit: "cover",
          }}
          priority
        />
        <div
          className="absolute top-0 right-0 bottom-0 left-0 z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
        ></div>
      </div>
    </Link>
  );
}

export default MenuItem;
