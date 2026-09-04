import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

const products = [
  {
    name: "Apple iPhone 17 Pro",
    slug: "apple-iphone-17-pro",
    description: "Premium smartphone with advanced performance.",
    mrp: 134900,
    price: 134900,
    variants: [
      {
        name: "Silver",
        color: "#D9D9D9",
        storage: "256GB",
        image: "/products/iphone-silver-thumb1.jpg",
        thumbnails: [
          "/products/iphone-silver.jpg",
          "/products/iphone-silver-thumb1.jpg",
          "/products/iphone-silver-thumb2.jpg",
          "/products/iphone-silver-thumb3.jpg",
          "/products/iphone-silver-thumb4.jpg",
          "/products/iphone-silver-thumb5.jpg",
          "/products/iphone-silver-thumb6.jpg",
        ],
      },
      {
        name: "Orange",
        color: "#F97316",
        storage: "256GB",
        image: "/products/iphone-orange-thumb1.jpg",
        thumbnails: [
          "/products/iphone-orange.jpg",
          "/products/iphone-orange-thumb1.jpg",
          "/products/iphone-orange-thumb2.jpg",
          "/products/iphone-orange-thumb3.jpg",
          "/products/iphone-orange-thumb4.jpg",
          "/products/iphone-orange-thumb5.jpg",
          "/products/iphone-orange-thumb6.jpg",
        ],
      },
      {
        name: "Black",
        color: "#222222",
        storage: "256GB",
        image: "/products/iphone-black-thumb1.jpg",
        thumbnails: [
          "/products/iphone-black.jpg",
          "/products/iphone-black-thumb1.jpg",
          "/products/iphone-black-thumb2.jpg",
          "/products/iphone-black-thumb3.jpg",
          "/products/iphone-black-thumb4.jpg",
          "/products/iphone-black-thumb5.jpg",
          "/products/iphone-black-thumb6.jpg",
        ],
      },
    ],
    emiPlans: [
      { tenure: 6, monthlyPayment: 19111, interestRate: 0, cashback: 1349 },
      { tenure: 9, monthlyPayment: 12741, interestRate: 0, cashback: 1349 },
      { tenure: 12, monthlyPayment: 9555, interestRate: 0, cashback: 1349 },
    ],
  },
  {
    name: "Samsung Galaxy S25 Ultra 5G AI",
    slug: "samsung-galaxy-s25-ultra",
    description: "The ultimate Android experience with AI.",
    mrp: 129999,
    price: 94999,
    variants: [
      {
        name: "Titanium Black",
        color: "#1A1A1A",
        storage: "256GB",
        image: "/products/s25-black-thumb1.jpg",
        thumbnails: [
          "/products/s25-black.jpg",
          "/products/s25-black-thumb1.jpg",
          "/products/s25-black-thumb2.jpg",
          "/products/s25-black-thumb3.jpg",
          "/products/s25-black-thumb4.jpg",
          "/products/s25-black-thumb5.jpg",
          "/products/s25-black-thumb6.jpg",
        ],
      },
      {
        name: "Titanium Silverblue",
        color: "#A8B8C8",
        storage: "256GB",
        image: "/products/s25-silverblue-thumb1.jpg",
        thumbnails: [
          "/products/s25-silverblue.jpg",
          "/products/s25-silverblue-thumb1.jpg",
          "/products/s25-silverblue-thumb2.jpg",
          "/products/s25-silverblue-thumb3.jpg",
          "/products/s25-silverblue-thumb4.jpg",
          "/products/s25-silverblue-thumb5.jpg",
          "/products/s25-silverblue-thumb6.jpg",
        ],
      },
      {
        name: "Titanium Black",
        color: "#1A1A1A",
        storage: "512GB",
        image: "/products/s25-black-thumb1.jpg",
        thumbnails: [
          "/products/s25-black.jpg",
          "/products/s25-black-thumb1.jpg",
          "/products/s25-black-thumb2.jpg",
          "/products/s25-black-thumb3.jpg",
          "/products/s25-black-thumb4.jpg",
          "/products/s25-black-thumb5.jpg",
          "/products/s25-black-thumb6.jpg",
        ],
      },
    ],
    emiPlans: [
      { tenure: 3, monthlyPayment: 26916, interestRate: 0, cashback: 949 },
      { tenure: 6, monthlyPayment: 13458, interestRate: 0, cashback: 0 },
      { tenure: 9, monthlyPayment: 8972, interestRate: 0, cashback: 0 },
      { tenure: 12, monthlyPayment: 6729, interestRate: 0, cashback: 0 },
    ],
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    description: "The most powerful Pixel yet.",
    mrp: 109999,
    price: 109999,
    variants: [
      {
        name: "Obsidian",
        color: "#202124",
        storage: "256GB",
        image: "/products/iphone-black-thumb1.jpg", // Reusing an existing placeholder
        thumbnails: [
          "/products/iphone-black.jpg",
          "/products/iphone-black-thumb1.jpg",
        ],
      },
      {
        name: "Porcelain",
        color: "#FDFCF2",
        storage: "256GB",
        image: "/products/iphone-silver-thumb1.jpg", // Reusing an existing placeholder
        thumbnails: [
          "/products/iphone-silver.jpg",
          "/products/iphone-silver-thumb1.jpg",
        ],
      }
    ],
    emiPlans: [
      { tenure: 6, monthlyPayment: 18333, interestRate: 0, cashback: 1099 },
      { tenure: 12, monthlyPayment: 9166, interestRate: 0, cashback: 0 },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log("Inserted", products.length, "products successfully");

    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
