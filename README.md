# Master 2 - B2B Specialty Food Supplier Website

A modern, high-performance B2B digital platform for Master 2, a specialty supplier of Asian sauces, noodles, and pre-made ingredients serving commercial kitchens, restaurants, hotels, and distributors since 1996.

---

## 🎯 Project Overview

**Purpose:** Drive qualified inquiries and bulk orders through WhatsApp and email quote requests  
**Target Users:** Restaurant owners, chefs, hotel procurement teams  
**Business Model:** B2B inquiry-based (no pricing displayed, no checkout)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity (product and content management)
- **Deployment:** Vercel
- **Internationalization:** English (`/en`) and Simplified Chinese (`/zh`)
- **State Management:** Zustand (session-only cart/quote builder)

---

## 📚 Documentation for Developers

### New to the team? Start here:

#### **Frontend/Designer:**
Read the [GitHub Beginner Guide](./GITHUB_BEGINNER_GUIDE.md)

#### **Backend Developer:**
Read both guides:
1. [GitHub Beginner Guide](./GITHUB_BEGINNER_GUIDE.md) - Git basics
2. [Backend Developer Local Setup](./BACKEND_DEV_LOCAL_SETUP.md) - Development environment

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20.19.1 or higher (v24.15.0 recommended)
- npm v11.x or higher
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Junjie14321/doublegainWeb.git
cd doublegainWeb

# 2. Install dependencies
npm install

# 3. Set up environment variables (Backend developers only)
# Copy the example file
cp .env.example .env.local

# Edit .env.local and fill in the values:
# NEXT_PUBLIC_SANITY_PROJECT_ID=b0byprax
# NEXT_PUBLIC_SANITY_DATASET=production
# NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# 4. Start the development server
npm run dev

# 5. Open http://localhost:3000
```

---

## 🔧 Development Scripts

```bash
# Start Next.js development server (http://localhost:3000)
npm run dev

# Start Sanity Studio CMS (http://localhost:3333)
npm run sanity

# Build for production
npm run build

# Start production server locally
npm start

# Deploy Sanity Studio
npm run sanity:deploy

# Run linter
npm run lint
```

---

## 📁 Project Structure

```
doublegainWeb/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalized routes
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── products/           # Product pages
│   │   └── ...                 # Other pages
│   └── api/                    # API routes
│       └── inquiry/            # Quote request endpoint
├── components/                  # Reusable React components
├── lib/                        # Utility functions and configs
│   ├── sanity.client.ts       # Sanity client configuration
│   └── i18n/                  # Translation files
│       ├── en.ts              # English translations
│       └── zh.ts              # Chinese translations
├── sanity/                     # Sanity CMS configuration
│   └── schemas/               # Content schemas
│       ├── product.ts         # Product schema
│       └── category.ts        # Category schema
├── public/                     # Static assets
├── styles/                     # Global styles
└── types/                      # TypeScript type definitions
```

---

## 🌐 Internationalization

The site supports two languages with route-based i18n:

- **English:** `/en/*`
- **Simplified Chinese:** `/zh/*`

Translation files are located in `/lib/i18n/`.

---

## 🔐 Environment Variables

Required environment variables (create `.env.local` from `.env.example`):

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=b0byprax
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Note:** Never commit `.env.local` to Git (it's in `.gitignore`).

---

## 🔄 Development Workflow

### For All Team Members:

1. **Never work directly on `main` branch**
2. **Always create a feature branch:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes and test locally**
4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request on GitHub**
6. **Wait for review and approval**
7. **After merge, update your local main:**
   ```bash
   git checkout main
   git pull origin main
   ```

### Branch Naming Convention:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `update/description` - Updates/improvements
- `docs/description` - Documentation changes

---

## 📦 Content Management (Sanity CMS)

### For Content Editors:

Access Sanity Studio to manage products and categories:
- **Local:** http://localhost:3333 (after running `npm run sanity`)
- **Production:** [Your deployed Sanity Studio URL]

### What You Can Manage:
- ✅ Products (name, description, images, categories, tags)
- ✅ Categories (sauces, noodles, pre-made ingredients)
- ✅ Bilingual content (English and Chinese)

Changes in Sanity appear on the website automatically.

---

## 🚀 Deployment

### Automatic Deployments:

- **Production:** `main` branch → https://doublegainweb.vercel.app
- **Preview:** Every Pull Request gets a unique preview URL from Vercel

### Manual Deployment:

The project auto-deploys on every push to `main` via Vercel. No manual deployment needed.

---

## 🧪 Testing

### Before Pushing:

1. **Test both languages:**
   - English: http://localhost:3000/en
   - Chinese: http://localhost:3000/zh

2. **Check browser console (F12)** for errors

3. **Test on different screen sizes** (mobile, tablet, desktop)

4. **Verify Sanity data loads correctly**

---

## 🔗 Important Links

- **Production Website:** https://doublegainweb.vercel.app
- **GitHub Repository:** https://github.com/Junjie14321/doublegainWeb
- **Vercel Dashboard:** https://vercel.com/
- **Sanity Project:** Project ID `b0byprax`

---

## 👥 Team Collaboration

### Pull Request Guidelines:

When creating a PR, include:

**Title:** Clear, descriptive summary (e.g., "Add contact form validation")

**Description:**
```markdown
## What changed?
- List of changes made

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## How to test?
1. Step-by-step testing instructions
2. Expected behavior

## Screenshots (if applicable)
[Add screenshots here]
```

### Code Review Checklist:

- [ ] Code works in both English and Chinese
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Follows existing code style
- [ ] Comments added for complex logic

---

## 📝 Git Commit Messages

Follow these conventions:

✅ **Good:**
- `Add email validation to contact form`
- `Fix navbar mobile menu not closing`
- `Update product card styling`

❌ **Bad:**
- `changes` (too vague)
- `fix` (what did you fix?)
- `updated stuff` (not specific)

---

## 🐛 Troubleshooting

### Common Issues:

**Port 3000 already in use:**
```bash
# Kill the process or use different port
PORT=3001 npm run dev
```

**Environment variables not loading:**
- Ensure `.env.local` exists in project root
- Restart dev server after adding variables
- Check file is named `.env.local` (not `.env`)

**Sanity data not showing:**
- Verify Sanity Studio is running
- Check environment variables are set
- Ensure products exist in Sanity

**Changes not reflecting:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Restart dev server

For more troubleshooting, see [Backend Developer Local Setup](./BACKEND_DEV_LOCAL_SETUP.md).

---

## 📞 Getting Help

**Stuck?** Here's what to do:

1. Check the documentation files in this repo
2. Search for the error message
3. Ask the team in your communication channel
4. Create a GitHub issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Error messages (if any)
   - Screenshots (if relevant)

---

## 📄 License

This project is proprietary and confidential. All rights reserved by Master 2.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Sanity](https://www.sanity.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [V0](https://v0.dev/) - Initial design prototyping

---

**Questions?** Check the documentation or reach out to the project lead.

**Welcome to the team! 🚀**