# 1Fi EMI Store

A full-stack e-commerce web application displaying smart phones with multiple EMI plans backed by mutual funds. Built as part of the 1Fi SDE1 Assignment.

## 🚀 Tech Stack Used

*   **Frontend**: React (Next.js 15 App Router), Tailwind CSS
*   **Backend**: Node.js (Next.js API Routes)
*   **Database**: MongoDB (via Mongoose)
*   **Language**: TypeScript

## 📦 Database Schema

The application uses MongoDB to store Product data, with nested arrays for Variants and EMI Plans.

```typescript
// Product Schema
{
  name: String,
  slug: String, // Unique URL identifier
  description: String,
  mrp: Number,
  price: Number,
  variants: [
    {
      name: String,    // e.g., "Titanium Gray"
      color: String,   // Hex code, e.g., "#808080"
      storage: String, // e.g., "256GB"
      image: String,   // Path to main variant image
      thumbnails: [String] // Array of image paths for the gallery
    }
  ],
  emiPlans: [
    {
      tenure: Number, // Months, e.g., 3, 6, 9, 12
      monthlyPayment: Number,
      interestRate: Number, // e.g., 0%
      cashback: Number      // e.g., 949
    }
  ]
}
```

## 🛠️ Setup and Run Instructions

1.  **Clone the repository and install dependencies:**
    ```bash
    git clone <your-repo-url>
    cd 1fi-emi-store
    npm install
    ```

2.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
    ```

3.  **Seed the Database:**
    Populate the database with sample products (Apple iPhone 17 Pro, Samsung Galaxy S25 Ultra, etc.):
    ```bash
    npx tsx scripts/seed.ts
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API Endpoints

### 1. Get All Products
**Endpoint:** `GET /api/products`
**Description:** Fetches a list of all available products.

**Example Response:**
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Samsung Galaxy S25 Ultra 5G AI",
    "slug": "samsung-galaxy-s25-ultra",
    "mrp": 129999,
    "price": 94999,
    "variants": [
      {
        "name": "Titanium Black",
        "color": "#1A1A1A",
        "storage": "256GB",
        "image": "/products/s25-black-thumb1.jpg",
        "thumbnails": ["..."]
      }
    ],
    "emiPlans": [
      {
        "tenure": 6,
        "monthlyPayment": 13458,
        "interestRate": 0,
        "cashback": 0
      }
    ]
  }
]
```

### 2. Get Single Product by Slug
**Endpoint:** `GET /api/products/[slug]`
**Description:** Fetches detailed information for a specific product using its unique slug (e.g., `/api/products/samsung-galaxy-s25-ultra`).

**Example Response:**
```json
{
  "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
  "name": "Samsung Galaxy S25 Ultra 5G AI",
  "slug": "samsung-galaxy-s25-ultra",
  "description": "The ultimate Android experience with AI.",
  "mrp": 129999,
  "price": 94999,
  "variants": [
    {
      "name": "Titanium Silverblue",
      "color": "#A8B8C8",
      "storage": "256GB",
      "image": "/products/s25-silverblue-thumb1.jpg",
      "thumbnails": [
        "/products/s25-silverblue.jpg",
        "/products/s25-silverblue-thumb1.jpg"
      ]
    }
  ],
  "emiPlans": [
    {
      "tenure": 3,
      "monthlyPayment": 26916,
      "interestRate": 0,
      "cashback": 949
    }
  ]
}
```
