<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run your app locally

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Environment Variables

Create a `.env.local` file based on `.env.example`:

1. `VITE_WHATSAPP_NUMBER` (required in production)
2. `VITE_GTM_ID` (optional)

If `VITE_WHATSAPP_NUMBER` is missing, the app uses a safe fallback number in code to keep WhatsApp buttons working.

## Vercel Deploy

In Vercel Project Settings -> Environment Variables, set:

1. `VITE_WHATSAPP_NUMBER`
2. `VITE_GTM_ID` (optional)

After changing environment variables, trigger a new deploy so the frontend bundle is rebuilt.
