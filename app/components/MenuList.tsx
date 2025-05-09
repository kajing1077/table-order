import { BadgeType } from "./CustomBadge";
import MenuItem from "./MenuItem";
import { createClient } from "@/utils/supabase/server";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  tag: BadgeType;
}

export default async function MenuList() {
  const supabase = await createClient();
  const { data: menuItems } = await supabase.from("MenuItem").select();

  const groupedMenuItems = menuItems?.reduce(
    (acc: Record<string, MenuItem[]>, menu) => {
      if (!acc[menu.category]) {
        acc[menu.category] = [];
      }
      acc[menu.category].push(menu);
      return acc;
    },
    {} as Record<string, (typeof MenuItem)[]>
  );

  const categoryOrder = ["단품", "세트", "사이드", "음료"];

  const sortedMenuData = Object.entries(groupedMenuItems) as [
    string,
    MenuItem[]
  ][];
  sortedMenuData.sort((a, b) => {
    return categoryOrder.indexOf(a[0]) - categoryOrder.indexOf(b[0]);
  });

  return (
    <div className="flex flex-col">
      {sortedMenuData.map(([category, menus], index) => (
        <div key={category} id={category}>
          <h2 className="font-bold text-17 mb-3 px-6 text-tossgray-800 pt-6">
            {category}
          </h2>
          <div className="flex flex-col gap-4 pb-6">
            {menus.map((menu) => (
              <MenuItem key={menu.id} menu={menu} />
            ))}
          </div>
          {index !== sortedMenuData.length - 1 ? (
            <hr className=" h-4 py-2 bg-tossgray-400 border-0" />
          ) : (
            <hr className="bg-white border-0 p-3" />
          )}
        </div>
      ))}
    </div>
  );
}
