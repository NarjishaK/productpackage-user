import { Product } from "@/types/product";
const shopData: Product[] = [
  {
  _id: "1",
  id: 1,
  title: "Havit HV-G69 USB Gamepad",
  packagename: "havit-hv-g69-usb-gamepad",
  image: "/images/products/product-1-bg-1.png", // example main image
  reviews: 15,
  price: 59.0,
  discountedPrice: 29.0,
  imgs: {
    thumbnails: [
      "/images/products/product-1-sm-1.png",
      "/images/products/product-1-sm-2.png",
    ],
    previews: [
      "/images/products/product-1-bg-1.png",
      "/images/products/product-1-bg-2.png",
    ],
  },
}

];

export default shopData;
