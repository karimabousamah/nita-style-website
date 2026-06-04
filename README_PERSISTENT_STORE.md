# Nita Style persistent saving

This version saves admin changes globally using Netlify Functions + Netlify Blobs.

What now saves after refresh and for all visitors:
- products added by admin
- product edits
- price drops / sale prices
- sold-out status
- coupon codes
- orders
- signed-up customers
- first-order discount usage

Deploy to Netlify normally. Netlify will install `@netlify/blobs` from `package.json` and deploy the `netlify/functions/store.js` function.

Important: local file preview (`file:///...`) cannot use Netlify Functions, so global saving works on the live Netlify URL after deployment.

For product photos: uploaded photos are saved as base64 inside the store. This works for small/medium images, but for many large product photos a real image storage service should be connected later.
