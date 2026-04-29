# Backend Developer Local Setup Guide

## Overview

This guide will help you set up your local development environment to work with the Master 2 B2B website project, including Next.js and Sanity CMS integration.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Project Setup](#initial-project-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running the Development Servers](#running-the-development-servers)
5. [Working with Sanity CMS](#working-with-sanity-cms)
6. [Development Workflow](#development-workflow)
7. [Testing Your Changes](#testing-your-changes)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

Before you start, make sure you have these installed:

✅ **Node.js v20.19.1 or higher** (v24.15.0 recommended)
- Download: https://nodejs.org/
- Verify: `node --version`

✅ **npm v11.x or higher**
- Comes with Node.js
- Verify: `npm --version`

✅ **Git**
- Download: https://git-scm.com/
- Verify: `git --version`

✅ **Code Editor** (Cursor AI recommended)
- Download: https://cursor.sh/
- Alternative: VS Code (https://code.visualstudio.com/)

---

## Initial Project Setup

### 1. Clone the Repository

Open your terminal and navigate to where you want the project:

```bash
# Navigate to your workspace
cd ~/Desktop  # Mac
# OR
cd C:\Users\YourName\Desktop  # Windows

# Clone the repository
git clone https://github.com/Junjie14321/doublegainWeb.git

# Enter the project directory
cd doublegainWeb
```

---

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - Next.js 14 and React
# - Sanity client and tools
# - TypeScript
# - Tailwind CSS
# - And all other packages

# Wait for installation to complete (2-5 minutes)
```

**Expected output:**
```
added 1198 packages in 2m
```

---

### 3. Verify Installation

```bash
# Check if node_modules folder was created
ls -la  # Mac/Linux
dir     # Windows

# You should see a node_modules folder
```

---

## Environment Configuration

### Understanding Environment Variables

Environment variables store sensitive configuration (API keys, database URLs) that shouldn't be committed to Git.

---

### 1. Create `.env.local` File

In the project root (same level as `package.json`), create a file named `.env.local`:

```bash
# Create the file
touch .env.local  # Mac/Linux
# OR in Cursor: Right-click → New File → .env.local
```

---

### 2. Add Sanity Configuration

Open `.env.local` and add these variables:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=b0byprax
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Optional: Sanity Studio Configuration (if you need to run the studio locally)
SANITY_STUDIO_PROJECT_ID=b0byprax
SANITY_STUDIO_DATASET=production
```

**Important Notes:**
- ✅ `.env.local` is in `.gitignore` - it won't be committed to GitHub
- ✅ `NEXT_PUBLIC_*` variables are accessible in the browser
- ✅ Variables without `NEXT_PUBLIC_` are server-side only

---

### 3. Verify Environment Variables

Create a test file to verify your environment variables are loaded:

**Create:** `test-env.js` in the project root

```javascript
// test-env.js
console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Sanity Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('Sanity API Version:', process.env.NEXT_PUBLIC_SANITY_API_VERSION);
```

**Run:**
```bash
node test-env.js
```

**Expected output:**
```
Sanity Project ID: b0byprax
Sanity Dataset: production
Sanity API Version: 2024-01-01
```

**Delete the test file after verification:**
```bash
rm test-env.js  # Mac/Linux
del test-env.js # Windows
```

---

## Running the Development Servers

You'll typically run **TWO servers** during development:

1. **Next.js Dev Server** - Your website (port 3000)
2. **Sanity Studio** - CMS admin panel (port 3333)

---

### Running Next.js (Website)

**In Terminal 1:**

```bash
npm run dev
```

**What this does:**
- Starts Next.js development server
- Runs on: http://localhost:3000
- Hot-reload enabled (changes auto-refresh)
- Shows build logs and errors

**Expected output:**
```
✓ Ready in 600ms
  ○ Local:        http://localhost:3000
  ○ Network:      http://192.168.x.x:3000
```

**Visit:** http://localhost:3000

---

### Running Sanity Studio (CMS)

**In Terminal 2 (new terminal tab):**

```bash
npm run sanity
```

**What this does:**
- Starts Sanity Studio development server
- Runs on: http://localhost:3333
- Admin interface for managing products
- Requires login (use your Sanity account)

**Expected output:**
```
✔ Checking configuration files...
✔ Starting development server...
  
  Local: http://localhost:3333
  Content Studio running!
```

**Visit:** http://localhost:3333

**First time?** You'll be prompted to login:
1. Click "Login"
2. Use your Sanity account (same email you got the invitation to)
3. Authorize the studio

---

### Running Both Servers Simultaneously

**Option 1: Two Terminal Tabs (Recommended)**

In Cursor:
1. **Terminal 1:** `npm run dev` (keep running)
2. **Click `+` to open Terminal 2:** `npm run sanity` (keep running)

**Option 2: Use a package like `concurrently`**

```bash
# Install concurrently
npm install --save-dev concurrently

# Add to package.json scripts:
"dev:all": "concurrently \"npm run dev\" \"npm run sanity\""

# Then run both with one command:
npm run dev:all
```

---

## Working with Sanity CMS

### Understanding the Sanity Setup

**Project Structure:**
```
doublegainWeb/
├── sanity/                    # Sanity configuration
│   ├── schemas/              # Content schemas
│   │   ├── index.ts         # Schema registry
│   │   ├── product.ts       # Product schema
│   │   └── category.ts      # Category schema
│   └── sanity.cli.ts        # CLI config
├── lib/
│   └── sanity.client.ts     # Sanity client for Next.js
└── sanity.config.ts         # Studio configuration
```

---

### Sanity Studio (http://localhost:3333)

**What you can do:**
- ✅ View all products
- ✅ Add new products
- ✅ Edit existing products
- ✅ Create categories
- ✅ Upload images
- ✅ Preview content

**You probably WON'T need this as a backend dev** - your frontend teammate will manage content here.

---

### Fetching Data from Sanity in Next.js

**Example: Fetch all products**

Create a test page: `app/[locale]/backend-test/page.tsx`

```typescript
import { client } from '@/lib/sanity.client'

// Sanity query to fetch products
async function getProducts() {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    "category": category->name,
    description,
    tags,
    image
  }`
  
  const products = await client.fetch(query)
  return products
}

export default async function BackendTestPage() {
  const products = await getProducts()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Backend Test - Sanity Data</h1>
      
      <div className="bg-blue-100 p-4 rounded mb-4">
        <p>✅ Successfully fetched {products.length} products from Sanity</p>
      </div>
      
      <div className="space-y-4">
        {products.map((product: any) => (
          <div key={product._id} className="border p-4 rounded">
            <h3 className="font-bold">{product.name.en}</h3>
            <p className="text-gray-600">{product.description?.en}</p>
            <p className="text-sm text-gray-500">Category: {product.category?.en}</p>
            {product.tags && (
              <div className="mt-2">
                {product.tags.map((tag: string) => (
                  <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-xs mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Test it:**
1. Save the file
2. Visit: http://localhost:3000/en/backend-test
3. You should see all products from Sanity

---

### GROQ Query Language Basics

Sanity uses **GROQ** (Graph-Relational Object Queries) to fetch data.

**Common Queries:**

```javascript
// Get all products
const query = `*[_type == "product"]`

// Get products with specific category
const query = `*[_type == "product" && category->slug.current == "sauces"]`

// Get single product by slug
const query = `*[_type == "product" && slug.current == $slug][0]`

// Get products with related category data
const query = `*[_type == "product"]{
  _id,
  name,
  slug,
  "category": category->{
    name,
    slug
  }
}`

// Get products with images
const query = `*[_type == "product"]{
  _id,
  name,
  "imageUrl": image.asset->url
}`
```

**Learn more:** https://www.sanity.io/docs/groq

---

## Development Workflow

### Typical Backend Development Flow

```bash
# 1. Start of day - Get latest code
git checkout main
git pull origin main

# 2. Create a new feature branch
git checkout -b feature/api-endpoint

# 3. Start development servers
# Terminal 1:
npm run dev

# Terminal 2 (optional, only if you need to check CMS):
npm run sanity

# 4. Make your changes
# - Edit files
# - Test at http://localhost:3000
# - Check console for errors

# 5. Test your changes locally
# - Visit affected pages
# - Check browser console (F12)
# - Check terminal for server errors

# 6. Commit and push
git add .
git commit -m "Add new API endpoint for product filtering"
git push origin feature/api-endpoint

# 7. Create Pull Request on GitHub
# - Use the link from terminal
# - OR go to GitHub and create manually
# - Wait for review

# 8. After PR is merged
git checkout main
git pull origin main
```

---

### Working with API Routes

**Create a new API endpoint:**

**File:** `app/api/products/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    // Build Sanity query
    let query = `*[_type == "product"]`
    if (category) {
      query = `*[_type == "product" && category->slug.current == "${category}"]`
    }
    
    query += `{
      _id,
      name,
      slug,
      description,
      "category": category->name,
      tags
    }`
    
    // Fetch from Sanity
    const products = await client.fetch(query)
    
    // Return JSON response
    return NextResponse.json({
      success: true,
      count: products.length,
      data: products
    })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
```

**Test it:**
- Visit: http://localhost:3000/api/products
- Or: http://localhost:3000/api/products?category=sauces

---

### Environment-Specific Behavior

**Development (localhost):**
- Hot reload enabled
- Detailed error messages
- Source maps available
- Slower (not optimized)

**Production (Vercel):**
- Optimized builds
- Minified code
- CDN-cached
- Faster performance

**Always test locally before pushing!**

---

## Testing Your Changes

### 1. Visual Testing

**Test pages you changed:**
```bash
# Start dev server
npm run dev

# Visit affected pages:
http://localhost:3000/en
http://localhost:3000/en/products
http://localhost:3000/en/products/premium-oyster-sauce
http://localhost:3000/zh  # Test Chinese version too!
```

---

### 2. Console Testing

**Check browser console (F12):**
- Look for errors (red messages)
- Check network requests
- Verify API responses

**Check terminal:**
- Build errors
- Server errors
- Warning messages

---

### 3. Test Different Locales

Our site supports English and Chinese:

```bash
# Test English
http://localhost:3000/en/your-page

# Test Chinese
http://localhost:3000/zh/your-page
```

---

### 4. Sanity Data Testing

**Verify Sanity connection:**

Visit: http://localhost:3000/en/test-sanity

Should show:
- ✅ Connected to Sanity!
- ✅ Product data from CMS

---

## Common Tasks

### Task 1: Add a New Sanity Schema Field

**Example: Add "price" field to products**

1. **Edit:** `sanity/schemas/product.ts`

```typescript
// Add this field to the fields array:
defineField({
  name: 'price',
  title: 'Price (for internal reference only)',
  type: 'number',
  description: 'Not displayed on website (B2B quote model)',
}),
```

2. **Restart Sanity Studio:**
```bash
# Terminal 2 (Ctrl+C to stop, then restart)
npm run sanity
```

3. **Check Sanity Studio:**
- Go to http://localhost:3333
- Edit a product
- You should see the new "Price" field

---

### Task 2: Fetch Data with New Fields

**Update your query:**

```typescript
const query = `*[_type == "product"]{
  _id,
  name,
  slug,
  price,  // <- New field
  description
}`
```

---

### Task 3: Create a New API Route

**Example: Search products by name**

**File:** `app/api/products/search/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get('q')
  
  if (!searchTerm) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 })
  }
  
  const query = `*[_type == "product" && name.en match "${searchTerm}*"]{
    _id,
    name,
    slug
  }`
  
  const results = await client.fetch(query)
  
  return NextResponse.json({ results })
}
```

**Test:**
http://localhost:3000/api/products/search?q=oyster

---

### Task 4: Add TypeScript Types

**Create:** `types/sanity.ts`

```typescript
export interface Product {
  _id: string
  name: {
    en: string
    zh: string
  }
  slug: {
    _type: 'slug'
    current: string
  }
  description?: {
    en: string
    zh: string
  }
  tags?: string[]
  category?: {
    name: {
      en: string
      zh: string
    }
  }
}

export interface Category {
  _id: string
  name: {
    en: string
    zh: string
  }
  slug: {
    current: string
  }
  tagline?: {
    en: string
    zh: string
  }
}
```

**Use in your code:**

```typescript
import { Product } from '@/types/sanity'

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{...}`
  return await client.fetch(query)
}
```

---

## Troubleshooting

### Problem: "Cannot find module '@/lib/sanity.client'"

**Cause:** TypeScript path alias not configured

**Solution:**
Check `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### Problem: Port 3000 already in use

**Cause:** Another process is using port 3000

**Solution:**
```bash
# Kill the process
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# OR use a different port
PORT=3001 npm run dev
```

---

### Problem: Environment variables not loading

**Checklist:**
- ✅ File is named `.env.local` (not `.env`)
- ✅ File is in project root (next to `package.json`)
- ✅ Variable names start with `NEXT_PUBLIC_` (if needed in browser)
- ✅ Restart dev server after adding variables

**Debug:**
```bash
# Check if file exists
ls -la .env.local

# Print environment variables
node -e "console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)"
```

---

### Problem: Sanity data not showing

**Checklist:**
1. ✅ Sanity Studio is running (http://localhost:3333)
2. ✅ Products exist in Sanity Studio
3. ✅ Environment variables are set
4. ✅ Client is properly imported

**Debug:**
```typescript
// Add console.log to see what's fetched
const products = await client.fetch(query)
console.log('Fetched products:', products)
```

---

### Problem: Changes not reflecting

**Cause:** Browser cache or server cache

**Solution:**
- **Hard refresh:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Clear cache:** F12 → Network tab → "Disable cache"
- **Restart dev server:** Ctrl+C then `npm run dev`

---

### Problem: Git push rejected

**Cause:** Your branch is behind the remote

**Solution:**
```bash
# Get latest changes
git pull origin main

# Or if you have conflicts
git fetch origin
git merge origin/main
# Resolve conflicts
git add .
git commit -m "Merge main into feature branch"
git push origin your-branch
```

---

## Performance Tips

### 1. Use React Server Components

**Good (Server Component):**
```typescript
// app/products/page.tsx
async function ProductsPage() {
  const products = await client.fetch(query)  // Fetches on server
  return <div>{products.map(...)}</div>
}
```

**Avoid (Client Component for data fetching):**
```typescript
'use client'
function ProductsPage() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('/api/products')  // Extra API call
  }, [])
}
```

---

### 2. Enable ISR (Incremental Static Regeneration)

```typescript
// app/products/[slug]/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await client.fetch(query)
  return <div>...</div>
}
```

---

### 3. Use Sanity Image CDN

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity.client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

// Use in component:
<img src={urlFor(product.image).width(800).url()} alt={product.name.en} />
```

---

## Resources

### Documentation
- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **GROQ Cheat Sheet:** https://www.sanity.io/docs/query-cheat-sheet
- **TypeScript:** https://www.typescriptlang.org/docs/

### Tools
- **Sanity Vision:** http://localhost:3333/vision (test GROQ queries)
- **React DevTools:** Browser extension for debugging React
- **Network Tab:** F12 → Network (check API calls)

### Team Resources
- **GitHub Repo:** https://github.com/Junjie14321/doublegainWeb
- **Vercel Dashboard:** https://vercel.com/
- **Sanity Studio:** Your deployed studio URL

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start Next.js (port 3000)
npm run sanity          # Start Sanity Studio (port 3333)
npm run build           # Build for production (test locally)

# Git
git status              # Check current changes
git checkout main       # Switch to main branch
git pull origin main    # Get latest changes
git checkout -b feature/name  # Create new branch
git add .              # Stage all changes
git commit -m "message" # Commit changes
git push origin branch  # Push to GitHub

# Debugging
npm run build          # Check for build errors
node -v               # Check Node version
npm -v                # Check npm version
```

---

## Next Steps

After setup, you should be able to:
- ✅ Run the project locally
- ✅ See products from Sanity
- ✅ Make code changes
- ✅ Test changes before pushing
- ✅ Create API routes
- ✅ Work with TypeScript

**Ready to contribute!** 🚀

If you have questions, ask the team or check the documentation links above.
