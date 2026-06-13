Nita Style global saving fix
============================

This version saves admin changes to a live Netlify backend using Netlify Functions + Netlify Blobs.

What now saves globally:
- Products added in admin
- Product edits
- Product photos saved in the product record
- Price drops / sale prices
- Sold-out status
- Coupon codes
- Orders
- Signed-up users/customers
- NITA10 discount usage

Important deployment note:
This only works on the live Netlify website when Netlify Functions are deployed. It will NOT work from file:///Downloads/... because local files cannot run backend functions.

Best deployment method:
1. Upload/deploy the whole folder to Netlify with the netlify/functions folder included.
2. Make sure package.json is at the root.
3. After deployment, open:
   https://YOUR-SITE.netlify.app/.netlify/functions/store
4. If it shows JSON with nitaProducts, nitaOrders, etc., the global backend is active.
5. Then make an admin edit, wait for the toast "Saved globally", refresh on phone, and the change will appear.

If the function URL shows 404:
- Your functions were not deployed.
- Do not test from local file:///.
- Redeploy the entire project folder, not only index.html.
- Prefer GitHub or Netlify CLI deployment for Functions.

## Full-quality product image solution

Very large product photos should not be saved inside Netlify Blobs as base64 because Netlify can reject large function requests. For exact original image quality, put product photos as real files in:

`assets/products/`

Then, in Admin → Add Product, use the "Original image file names / links" box and write one file name per line, for example:

red-bag-1.jpg
red-bag-2.jpg
red-bag-3.jpg

This stores only the image path in the product database, while the actual photo is served directly by Netlify as a static original-quality file.
