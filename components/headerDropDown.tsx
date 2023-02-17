//a dropdown menu component that will appear on hover of each nav item

import Link from "next/link";

type DropdownProps = {
  items: {
    name: string;
    link: string;
  }[];
};

export default function Dropdown({ items }: DropdownProps) {
  return (
    <div className="absolute flex flex-col bg-white space-y-1 font-medium text-2xl shadow-lg p-2 border w-full">
      {items.map((item, index) => {
        return (
          <Link href={item.link} key={index} className="hover:underline">
            <p>{item.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
