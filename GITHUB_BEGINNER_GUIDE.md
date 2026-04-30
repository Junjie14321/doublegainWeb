# GitHub Beginner Guide for Team Members

## Welcome! 👋

This guide will help you get started with our project even if you've never used GitHub before.

---

## Table of Contents
1. [What is GitHub?](#what-is-github)
2. [Initial Setup](#initial-setup)
3. [Getting the Project on Your Computer](#getting-the-project)
4. [Daily Workflow](#daily-workflow)
5. [Common Commands Cheat Sheet](#cheat-sheet)
6. [Troubleshooting](#troubleshooting)

---

## What is GitHub?

Think of GitHub as:
- **Google Docs for code** - Multiple people can work on the same project
- **Time machine** - You can see all changes and go back to any previous version
- **Backup service** - Your code is safely stored in the cloud

**Key Terms:**
- **Repository (Repo):** The project folder
- **Branch:** A copy of the code where you can work without affecting the main version
- **Commit:** Saving your changes with a description
- **Push:** Uploading your changes to GitHub
- **Pull:** Downloading changes from GitHub
- **Pull Request (PR):** Asking to merge your changes into the main code

---

## Initial Setup

### Step 1: Install Git

**Windows:**
1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Keep all default settings (just click "Next")
4. Finish installation

**Mac:**
1. Open Terminal
2. Type: `git --version`
3. If not installed, it will prompt you to install (follow the prompts)

**Verify Installation:**
```bash
git --version
# Should show something like: git version 2.x.x
```

---

### Step 2: Install Node.js

**Download from:** https://nodejs.org/
- Choose the **LTS version** (v24.15.0 or newer)
- Run the installer
- Keep all default settings

**Verify Installation:**
```bash
node --version
# Should show: v24.15.0 or higher

npm --version
# Should show: 11.x.x or higher
```

---

### Step 3: Install a Code Editor

**We recommend Cursor AI** (what the team uses):
- Download from: https://cursor.sh/
- Install it
- Open Cursor

**Alternative:** VS Code (https://code.visualstudio.com/)

---

### Step 4: Configure Git (First Time Only)

Open your terminal (in Cursor: View → Terminal) and run:

```bash
# Set your name (use your real name)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify
git config --global user.name
git config --global user.email
```

---

### Step 5: Get Access to the Project

1. **Create a GitHub account** at https://github.com/
2. **Tell the project lead your GitHub username**
3. **Wait for the invitation email** from GitHub
4. **Accept the invitation** (click the link in the email)

---

## Getting the Project

### Clone the Repository (Download the Project)

**Option 1: Using Cursor/Terminal (Recommended)**

1. **Open Cursor**
2. **Open Terminal** (View → Terminal or Ctrl + `)
3. **Navigate to where you want the project:**
   ```bash
   # Windows example:
   cd C:\Users\YourName\Desktop
   
   # Mac example:
   cd ~/Desktop
   ```

4. **Clone the repository:**
   ```bash
   git clone https://github.com/Junjie14321/doublegainWeb.git
   ```

5. **Enter the project folder:**
   ```bash
   cd doublegainWeb
   ```

6. **Install dependencies:**
   ```bash
   npm install
   ```

**Option 2: Using GitHub Desktop (Easier for Beginners)**

1. **Download GitHub Desktop:** https://desktop.github.com/
2. **Install and sign in** with your GitHub account
3. **Click "Clone a repository"**
4. **Select `Junjie14321/doublegainWeb`**
5. **Choose where to save it** (e.g., Desktop)
6. **Click "Clone"**
7. **Open the folder in Cursor**
8. **Open Terminal in Cursor and run:**
   ```bash
   npm install
   ```

---

## Daily Workflow

### The Golden Rule:
**NEVER work directly on the `main` branch!**

Always create a new branch for your work.

---

### Step-by-Step Workflow

#### 1. Start Your Day (Get Latest Changes)

```bash
# Make sure you're on main branch
git checkout main

# Get the latest changes
git pull origin main
```

---

#### 2. Create a New Branch for Your Work

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Examples:
git checkout -b feature/add-contact-form
git checkout -b feature/update-product-page
git checkout -b fix/navbar-bug
git checkout -b frontend/product-grid-layout
git checkout -b backend/contact-api-validation
git checkout -b integration/sanity-products-sync
```

**Branch Naming Convention:**
- `feature/description` - for new features
- `fix/description` - for bug fixes
- `update/description` - for updates/improvements
- `frontend/description` - for UI and client-side changes
- `backend/description` - for API, database, and server-side changes
- `integration/description` - for connecting services (e.g. Sanity, payment, auth)

**Tip:** You can combine both style and area if your team prefers:
- `feature/frontend/improve-product-cards`
- `fix/backend/contact-route-timeout`

---

#### 3. Do Your Work

- Write code
- Test it locally
- Make sure everything works

---

#### 4. Save Your Changes (Commit)

```bash
# See what files you changed
git status

# Add all changed files
git add .

# OR add specific files
git add path/to/file.ts

# Commit with a clear message
git commit -m "Add contact form to homepage"

# Good commit messages:
# ✅ "Add email validation to contact form"
# ✅ "Fix navbar mobile menu not closing"
# ✅ "Update product card styling"
# ❌ "changes" (too vague)
# ❌ "fix" (what did you fix?)
```

---

#### 5. Upload Your Changes (Push)

```bash
# First time pushing this branch
git push origin feature/your-feature-name

# Git will give you a link to create a Pull Request - copy it!
```

---

#### 6. Create a Pull Request (PR)

**Option A: Use the link from terminal**
- Click the link that appeared after `git push`
- It looks like: `https://github.com/Junjie14321/doublegainWeb/pull/new/feature/...`

**Option B: Go to GitHub manually**
1. Go to: https://github.com/Junjie14321/doublegainWeb
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select your branch
5. Click "Create pull request"

**Fill in the PR:**
- **Title:** Clear description (e.g., "Add contact form to homepage")
- **Description:** 
  ```
  ## What changed?
  - Added contact form with email validation
  - Added success message after submission
  
  ## How to test?
  1. Go to homepage
  2. Scroll to contact section
  3. Try submitting the form
  
  ## Screenshots (if applicable)
  [Add screenshots here]
  ```

6. **Click "Create pull request"**
7. **Wait for review** (project lead will check it)
8. **Check the preview URL** that Vercel bot posts

---

#### 7. After PR is Approved

Once your PR is merged:

```bash
# Switch back to main
git checkout main

# Get the latest (including your merged changes)
git pull origin main

# Delete your old branch locally (cleanup)
git branch -d feature/your-feature-name
```

---

## Common Scenarios

### Scenario 1: Someone Else Pushed Changes

```bash
# Get the latest changes
git checkout main
git pull origin main

# If you're on a feature branch and need the latest main
git checkout feature/your-branch
git merge main
```

---

### Scenario 2: You Made Changes on the Wrong Branch

```bash
# Save your changes without committing
git stash

# Switch to the correct branch (or create new one)
git checkout -b feature/correct-branch

# Apply your saved changes
git stash pop
```

---

### Scenario 3: You Want to Undo Uncommitted Changes

```bash
# Undo changes to a specific file
git checkout -- path/to/file.ts

# Undo ALL uncommitted changes (CAREFUL!)
git reset --hard
```

---

### Scenario 4: Merge Conflicts

If you see "CONFLICT" when pulling or merging:

1. **Open the conflicting file** in Cursor
2. **Look for conflict markers:**
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> main
   ```
3. **Decide which version to keep** (or combine both)
4. **Remove the conflict markers** (`<<<<<<<`, `=======`, `>>>>>>>`)
5. **Save the file**
6. **Mark as resolved:**
   ```bash
   git add path/to/file.ts
   git commit -m "Resolve merge conflict in file.ts"
   ```

---

## Cheat Sheet

### Most Common Commands

```bash
# Check status
git status

# Get latest changes
git pull origin main

# Create new branch
git checkout -b feature/branch-name

# Switch to existing branch
git checkout branch-name

# See all branches
git branch

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push changes
git push origin branch-name

# See commit history
git log --oneline

# Undo uncommitted changes
git checkout -- filename
```

---

### Safe Workflow (Copy-Paste Every Day)

```bash
# 1. Start of day
git checkout main
git pull origin main

# 2. Create new branch
git checkout -b feature/my-new-feature

# 3. [Do your work here]

# 4. Save and upload
git add .
git commit -m "Description of what you did"
git push origin feature/my-new-feature

# 5. Create PR on GitHub (use the link from terminal)

# 6. After PR is merged
git checkout main
git pull origin main
git branch -d feature/my-new-feature
```

---

## Troubleshooting

### "Permission denied" when pushing

**Problem:** You don't have access to the repository

**Solution:**
1. Make sure you accepted the GitHub invitation
2. Ask the project lead to add you as a collaborator

---

### "Your branch is behind 'origin/main'"

**Problem:** Someone else pushed changes

**Solution:**
```bash
git pull origin main
```

---

### "fatal: not a git repository"

**Problem:** You're not in the project folder

**Solution:**
```bash
cd path/to/doublegainWeb
```

---

### "Changes not staged for commit"

**Problem:** You changed files but didn't add them

**Solution:**
```bash
git add .
```

---

### Everything is broken, I want to start fresh

**Solution:**
```bash
# Save your work first!
# Copy your changed files somewhere safe

# Then delete the project folder and re-clone
cd ..
rm -rf doublegainWeb
git clone https://github.com/Junjie14321/doublegainWeb.git
cd doublegainWeb
npm install
```

---

## Best Practices

### DO ✅
- Commit often (small, focused commits)
- Write clear commit messages
- Pull before you start working
- Create a new branch for each feature
- Test your code before pushing
- Ask for help if stuck

### DON'T ❌
- Work directly on `main` branch
- Commit broken code
- Push without testing
- Delete files without checking with team
- Force push (`git push -f`) unless you know what you're doing
- Commit sensitive data (passwords, API keys)

---

## Getting Help

**Stuck?** Here's what to do:

1. **Read the error message** - Git errors are usually helpful
2. **Google the error** - Someone has probably solved it
3. **Ask ChatGPT/Claude** - "I got this Git error: [paste error]"
4. **Ask the team** - We're here to help!

---

## Useful Resources

- **GitHub Docs:** https://docs.github.com/
- **Git Cheat Sheet:** https://education.github.com/git-cheat-sheet-education.pdf
- **Interactive Tutorial:** https://learngitbranching.js.org/
- **GitHub Desktop:** https://desktop.github.com/ (easier UI)

---

## Quick Reference Card

Print this and keep it next to your computer:

```
DAILY WORKFLOW
==============
1. git checkout main
2. git pull origin main
3. git checkout -b feature/my-feature
4. [do work]
5. git add .
6. git commit -m "What I did"
7. git push origin feature/my-feature
8. [Create PR on GitHub]
9. [After merge] git checkout main && git pull

HELP!
=====
Status:           git status
Undo changes:     git checkout -- filename
Start over:       git checkout main && git pull
See branches:     git branch
Delete branch:    git branch -d branch-name
```

---

**Welcome to the team! 🚀**

If you have questions, don't hesitate to ask!
