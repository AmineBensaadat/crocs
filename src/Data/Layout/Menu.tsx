import { MenuItem } from "@/Types/Layout.type";

export const MenuList: MenuItem[] | undefined = [
  {
    title: "General",
    lanClass: "lan-1",     
    Items: [
      {
        title: "Members",
        id: 1,
        icon: "home",
        type: "sub",
        lanClass: "lan-3",
        children: [
          {
            title: "members list",
            path: `/pages/Members/list`,
            type: "link",
          },
        ],
      },
      {
        title: "Plans",
        id: 1,
        icon: "home",
        type: "sub",
        lanClass: "lan-3",
        children: [
          {
            title: "Plans list",
            path: `/pages/Plans/list`,
            type: "link",
          },
        ],
      },
    ],
  },
];
