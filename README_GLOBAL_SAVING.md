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
