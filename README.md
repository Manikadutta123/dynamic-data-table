This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 📊 Dynamic Data Table Manager (Next.js + Redux + MUI)

A **frontend project** built with **Next.js 14**, **Redux Toolkit**, and **Material UI** that allows users to manage tabular data dynamically — including column management, CSV import/export, inline editing, and theming.

---

## 🚀 Features

### 🧩 Core
✅ Dynamic Data Table with columns:
- Name, Email, Age, Role  
✅ Sorting (ASC/DESC toggle)  
✅ Global Search (across all fields)  
✅ Pagination (10 rows per page)  
✅ Manage Columns (Add / Show / Hide)  
✅ Import / Export CSV  
✅ State management via Redux Toolkit  

### 🎁 Bonus Features
- 🔄 Inline Row Editing (with Save / Cancel)
- 🗑️ Row Delete with Confirmation
- 🌗 Theme Toggle (Light / Dark)
- 📱 Responsive Material UI Design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js 14 (App Router)** | Framework |
| **React 18** | Frontend UI |
| **TypeScript** | Type safety |
| **Redux Toolkit** | State management |
| **Material UI (MUI v5)** | UI components |
| **PapaParse** | CSV parsing |
| **FileSaver.js** | CSV export |
| **Redux Persist (optional)** | State persistence |

---

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/Manikadutta123/dynamic-data-table.git

cd dynamic-data-table

# Install dependencies
npm install

# Run the project
npm run dev

# Open in browser
http://localhost:3000
