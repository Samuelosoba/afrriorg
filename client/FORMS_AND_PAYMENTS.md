# Forms, payments and administration

The API has moved to the root `server/` Express application.
See [server/README.md](../server/README.md) for MongoDB, Cloudinary, admin account,
Paystack currency/webhook configuration, local startup and deployment.

- Admin dashboard: /admin
- Enquiries: persisted in MongoDB and managed in the admin inbox.
- Donations: persisted, verified and reconciled through signed Paystack webhooks.
- Programme content: managed in the dashboard; seed existing data before launch.

Run both the backend and frontend locally. Vite proxies /api to port 4000.
