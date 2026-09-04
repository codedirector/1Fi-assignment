export interface Variant {
  name: string;
  color: string;
  storage: string;
  image: string;
  thumbnails: string[];
}

export interface EmiPlan {
  tenure: number;
  monthlyPayment: number;
  interestRate: number;
  cashback: number;
}

export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mrp: number;
  price: number;
  variants: Variant[];
  emiPlans: EmiPlan[];
}
