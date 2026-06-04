# Nita Style automated email setup

This version contains real automated email code using Netlify Functions + Resend.

## What works after setup
- Signup popup sends the NITA10 first-order code by email.
- Checkout sends an order confirmation email to the customer.
- Checkout also sends a new-order notification email to the admin.

## Required Netlify environment variables
In Netlify: Site settings → Environment variables → Add variables:

RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=Nita Style <your_verified_email_or_domain>
ADMIN_EMAIL=karim.abousamah1@gmail.com

Important: Resend requires a verified sender/domain before sending from your own email. Until then, use a verified Resend sender.
