# Nova DApp

This is a modern Web3 Decentralized Application built with React, Vite, Tailwind CSS, and Wagmi/RainbowKit.

## Features
- 🚀 **Fast Setup:** Built on Vite for lightning-fast HMR and build times.
- 🎨 **Premium UI:** Styled with Tailwind CSS, utilizing glassmorphism and modern gradient animations.
- 🦊 **Wallet Connection:** Connect seamlessly to MetaMask, Coinbase Wallet, WalletConnect, and many more out of the box thanks to `@rainbow-me/rainbowkit`.
- 🔗 **Smart Contract Interaction:** Read and write data to any `SimpleStorage` smart contract dynamically. Showcases pending, success, and error transaction states.

## Getting Started Locally

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`.

## Deployment

### Deploy to Vercel (Recommended)
Vercel provides the easiest way to deploy Vite React apps.

1. Create a GitHub repository and push your code to it.
2. Go to [Vercel](https://vercel.com) and sign in.
3. Click "Add New..." -> "Project".
4. Import your GitHub repository.
5. Vercel will automatically detect that it's a Vite project. The build command will be `npm run build` and output directory `dist`.
6. Click **Deploy**. Your DApp is now live!

### Deploy to GitHub Pages
To deploy to GitHub Pages, you need to add the `gh-pages` package.

1. Install `gh-pages`:
```bash
npm install gh-pages --save-dev
```

2. Update `vite.config.ts` by adding a base path:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // replace with your repository name
})
```

3. Update `package.json` configurations:
```json
"homepage": "https://yourusername.github.io/your-repo-name",
// Add these to "scripts":
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

4. Run the deploy sequence:
```bash
npm run deploy
```
