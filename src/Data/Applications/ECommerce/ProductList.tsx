import RatioImage from "@/CommonComponent/RatioImage";
import SVG from "@/CommonComponent/SVG";
import { ImagePath } from "@/Constant";
import { ProductListType } from "@/Types/ECommerce.type";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import { Badge, FormGroup, Input } from "reactstrap";
import { format } from "date-fns";
import Image from "next/image";

export const productListBodyData = [
  {
    name: "Choose Product",
    options: [
      "Apple iphone 13 Pro",
      "Wood Chair",
      "M185 Compact Wireless Mouse",
    ],
  },
  {
    name: "Choose Category",
    options: ["Furniture", "Smart Gadgets", "Electrics"],
  },
  {
    name: "Choose Sub Category",
    options: ["Smart Phones", "Smart Watches", "Wireless headphone"],
  },
  {
    name: "Status",
    options: ["Sold Out", "In Stock", "Pre Order", "Limited Stock"],
  },
  {
    name: "Price",
    options: ["56000.00", "19000.00", "10000.00", "15000.00", "99000.00"],
  },
];

export const productListTableData: ProductListType[] = [
  {
    imageSrc: "dashboard-8/product-categories/laptop.png",
    productName: "Apple Desktop 2024",
    sku: "02145YK796",
    category: "Laptops",
    price: "56000.00",
    quantity: "13",
    status: "Sold Out",
    rating: 4,
  },
  {
    imageSrc: "dashboard-8/product-categories/phone.png",
    productName: "Apple iPhone 13 Pro",
    sku: "56379FG3AW",
    category: "Smart Phones",
    price: "19000.00",
    quantity: "48",
    status: "In Stock",
    rating: 3,
  },
  {
    imageSrc: "dashboard-8/product-categories/headphone.png",
    productName: "Headphones",
    sku: "33KR5689B1",
    category: "Smart Headphones",
    price: "10000.00",
    quantity: "5",
    status: "In Stock",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/wireless-headphone.png",
    productName: "Wireless headphone",
    sku: "AD6789HEY0",
    category: "Smart Headphones",
    price: "15000.00",
    quantity: "4",
    status: "Sold Out",
    rating: 4,
  },
  {
    imageSrc: "dashboard-2/product/1.png",
    productName: "Wood Chair",
    sku: "456DF78DFQ",
    category: "Furniture",
    price: "99000.00",
    quantity: "2",
    status: "Sold Out",
    rating: 5,
  },
  {
    imageSrc: "email-template/3.png",
    productName: "Wood Chair",
    sku: "5633GD3K54",
    category: "Furniture",
    price: "1000.00",
    quantity: "8",
    status: "Sold Out",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/ipad.png",
    productName: "MacBook Air 13.3-inch",
    sku: "589KO8PPQ8",
    category: "Laptops",
    price: "45000.00",
    quantity: "10",
    status: "Sold Out",
    rating: 4,
  },
  {
    imageSrc: "dashboard-8/product-categories/mouse.png",
    productName: "M185 Compact Wireless Mouse",
    sku: "02145YK796",
    category: "E-Commerce",
    price: "19000.00",
    quantity: "48",
    status: "In Stock",
    rating: 2,
  },
  {
    imageSrc: "other-images/cart-img.jpg",
    productName: "Wood chairs",
    sku: "568GH3LLQ2",
    category: "Furniture",
    price: "78000.00",
    quantity: "50",
    status: "In Stock",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/watch.png",
    productName: "Smart watch",
    sku: "58FR7K34F6",
    category: "Electric",
    price: "25000.00",
    quantity: "48",
    status: "Sold Out",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/dvd.png",
    productName: "DVD",
    sku: "HG5667DFQ1",
    category: "Electric",
    price: "5600.00",
    quantity: "10",
    status: "In Stock",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/speaker.png",
    productName: "Speakers",
    sku: "02145YK796",
    category: "Electric",
    price: "12200.00",
    quantity: "50",
    status: "Sold Out",
    rating: 4,
  },
  {
    imageSrc: "dashboard-8/product-categories/phone.png",
    productName: "Apple iphone 13 Pro",
    sku: "56379FG3AW",
    category: "Smart Phones",
    price: "19000.00",
    quantity: "48",
    status: "In Stock",
    rating: 3,
  },
  {
    imageSrc: "dashboard-8/product-categories/headphone.png",
    productName: "Headphones",
    sku: "33KR5689B1",
    category: "Smart Headphones",
    price: "10000.00",
    quantity: "5",
    status: "In Stock",
    rating: 5,
  },
  {
    imageSrc: "other-images/cart-img.jpg",
    productName: "Wood chairs",
    sku: "568GH3LLQ2",
    category: "Furniture",
    price: "78000.00",
    quantity: "50",
    status: "In Stock",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/watch.png",
    productName: "Smart watch",
    sku: "58FR7K34F6",
    category: "Electric",
    price: "25000.00",
    quantity: "48",
    status: "Sold Out",
    rating: 4,
  },
  {
    imageSrc: "dashboard-8/product-categories/phone.png",
    productName: "Apple iPhone 13 Pro",
    sku: "56379FG3AW",
    category: "Smart Phones",
    price: "19000.00",
    quantity: "48",
    status: "In Stock",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/headphone.png",
    productName: "Headphones",
    sku: "33KR5689B1",
    category: "Smart Headphones",
    price: "10000.00",
    quantity: "5",
    status: "In Stock",
    rating: 3,
  },
  {
    imageSrc: "dashboard-8/product-categories/wireless-headphone.png",
    productName: "Wireless headphone",
    sku: "AD6789HEY0",
    category: "Smart Headphones",
    price: "15000.00",
    quantity: "4",
    status: "Sold Out",
    rating: 5,
  },
  {
    imageSrc: "dashboard-2/product/1.png",
    productName: "Wood Chair",
    sku: "456DF78DFQ",
    category: "Furniture",
    price: "99000.00",
    quantity: "2",
    status: "Sold Out",
    rating: 4,
  },
  {
    imageSrc: "email-template/3.png",
    productName: "Wood Chair",
    sku: "5633GD3K54",
    category: "Furniture",
    price: "1000.00",
    quantity: "8",
    status: "Sold Out",
    rating: 3,
  },
  {
    imageSrc: "dashboard-8/product-categories/laptop.png",
    productName: "Apple Desktop 2024",
    sku: "02145YK796",
    category: "Laptops",
    price: "56000.00",
    quantity: "13",
    status: "Sold Out",
    rating: 4,
  },
  {
    imageSrc: "dashboard-8/product-categories/phone.png",
    productName: "Apple iPhone 13 Pro",
    sku: "56379FG3AW",
    category: "Smart Phones",
    price: "19000.00",
    quantity: "48",
    status: "In Stock",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/phone.png",
    productName: "Apple iPhone 13 Pro",
    sku: "56379FG3AW",
    category: "Smart Phones",
    price: "19000.00",
    quantity: "48",
    status: "In Stock",
    rating: 5,
  },
  {
    imageSrc: "dashboard-8/product-categories/headphone.png",
    productName: "Headphones",
    sku: "33KR5689B1",
    category: "Smart Headphones",
    price: "10000.00",
    quantity: "5",
    status: "In Stock",
    rating: 4,
  },
  {
    imageSrc: "dashboard-8/product-categories/wireless-headphone.png",
    productName: "Wireless headphone",
    sku: "AD6789HEY0",
    category: "Smart Headphones",
    price: "15000.00",
    quantity: "4",
    status: "Sold Out",
    rating: 2,
  },
  {
    imageSrc: "dashboard-2/product/1.png",
    productName: "Wood Chair",
    sku: "456DF78DFQ",
    category: "Furniture",
    price: "99000.00",
    quantity: "2",
    status: "Sold Out",
    rating: 2,
  },
];

export const productListColumns: TableColumn<ProductListType>[] = [
  {
    name: "Full Name",
    selector: (row) => row.first_name,
    sortable: true,
    cell: (row) => (
      <div className="product-names">
        <div className="d-flex align-items-center figma-line rounded-full">
          <Image
           className="rounded-full"
          width={42} height={42}
            src={`${ImagePath}/avatar/${row.file_name}`}
            alt="laptop"
          />
        </div>
        <p>
          {row.first_name} {row.last_name}
        </p>
      </div>
    ),
    width: "20%",
  },
  {
    name: "Membership Type",
    selector: (row) => row.plan_name,
    sortable: true,
    cell: (row) => <p className="f-light">{row.plan_name}</p>,
  },
  {
    name: "Joining Date",
    selector: (row) => row.join_date,
    sortable: true,
    cell: (row) => (
      <p className="f-light">{format(new Date(row.join_date), "MM/dd/yyyy")}</p>
    ),
  },
  {
    name: "Expiry Date",
    selector: (row) => '15/10/2025',
    sortable: true,
    cell: (row) => (
      <p className="f-light">15/10/2025</p>
    ),
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => (
      <p className="f-light">{row.status}</p>
    ),
  },
  {
    name: "Action",
    cell: (row) => (
      <div className="product-action">
        <Link href={`/app/ecommerce/add_product`}>
          <SVG iconId="edit-content" />
        </Link>
        <SVG iconId="trash1" />
      </div>
    ),
    sortable: true,
  },
];
