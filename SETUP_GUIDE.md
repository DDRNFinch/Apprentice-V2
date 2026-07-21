# 🚀 Apprentice+ Setup Guide

## Step 1: Install Node.js
Before you can run the app, you need to install Node.js (which includes npm).

1. Go to: https://nodejs.org/
2. Click the **LTS (Long Term Support)** version
3. Download and install it
4. Open Command Prompt or Terminal and type:
   ```
   node --version
   npm --version
   ```
   If you see version numbers, you're good to go!

## Step 2: Clone the Repository
You need to download the code from GitHub to your computer.

1. Open Command Prompt or Terminal
2. Navigate to where you want to save the project:
   ```
   cd Desktop
   ```
   (or wherever you want to save it)

3. Clone the repository:
   ```
   git clone https://github.com/DDRNFinch/Apprentice-V2.git
   ```

4. Enter the project directory:
   ```
   cd Apprentice-V2
   ```

## Step 3: Install Dependencies
The app needs several packages to run. Install them with:

```
npm install
```

This will take a few minutes and create a folder called `node_modules`.

## Step 4: Start the Development Server
Once installation is complete, start the app:

```
npm start
```

A browser window should automatically open at `http://localhost:3000` showing your Apprentice+ app!

## Step 5: Using the App

1. **Go to Settings Tab** (bottom navigation)
2. **Select a Course** from the dropdown
3. **Explore all tabs** to see the content

## Troubleshooting

### "npm is not recognized"
- You probably didn't install Node.js correctly
- Restart your computer after installing Node.js
- Try reinstalling Node.js

### "Port 3000 is already in use"
- Another app is using port 3000
- In the terminal, press `Ctrl+C` to stop the app
- Try running `npm start` again

### "git is not recognized"
- You need to install Git: https://git-scm.com/
- Download and install it
- Restart your terminal

## Building for Production
When you're ready to deploy your app:

```
npm run build
```

This creates an optimized production version in a `build` folder.

## Next Steps
- Modify courses in `src/pages/SettingsPage.tsx`
- Add your own branding/logo
- Connect to a backend API for data storage
- Deploy to Netlify, Vercel, or GitHub Pages

Good luck! 🎉
