# Molecule Forge

AI-powered chemical route-discovery and process-screening platform for identifying commercially promising molecules from refinery-derived feedstocks.

---

## 🚀 Deploying to Vercel

This project is fully configured and ready for 1-click deployment on **Vercel**.

### Method 1: Deploy via GitHub (Recommended)

1. **Initialize Git & Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Vercel deployment"
   git branch -M main
   # Add your remote repository:
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com/) and sign in.
   - Click **"Add New..."** → **"Project"**.
   - Select your GitHub repository.
   - Vercel will automatically detect:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click **Deploy**!

---

### Method 2: Deploy using Vercel CLI

1. Install the Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Run the deploy command from the project root:
   ```bash
   vercel
   ```
   Follow the prompts to link and deploy to preview.

3. To deploy directly to production:
   ```bash
   vercel --prod
   ```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run type checks
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ⚙️ Configuration Files Added for Vercel

- **`vercel.json`**: Configures the build pipeline, framework detection, and SPA fallback rewrites (`/(.*)` → `/index.html`).
- **`.vercelignore`**: Excludes temporary files, local environments, and caches from deployment uploads.
