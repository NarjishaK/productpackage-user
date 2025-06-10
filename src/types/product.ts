export type Product = {
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  _id: string;
  image: string;
  packagename: string;
  
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
    packageDetails?: {
    packagename?: string;
    price?: number;
    image?: string;
    isActive?: boolean;
    fromDate?: string;
    toDate?: string;
  };
};