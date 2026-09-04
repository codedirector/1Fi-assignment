import mongoose, { Schema, Document, Model } from "mongoose";

interface IVariant {
  name: string;
  color: string;
  storage: string;
  image: string;
  thumbnails: string[];
}

interface IEmiPlan {
  tenure: number;
  monthlyPayment: number;
  interestRate: number;
  cashback: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  mrp: number;
  price: number;
  variants: IVariant[];
  emiPlans: IEmiPlan[];
}

const VariantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const EmiPlanSchema = new Schema(
  {
    tenure: {
      type: Number,
      required: true,
    },
    monthlyPayment: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    cashback: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: String,

    mrp: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    variants: {
      type: [VariantSchema],
      required: true,
    },

    emiPlans: {
      type: [EmiPlanSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
