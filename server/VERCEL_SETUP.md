# Connect the Vercel website to Express

## Current deployments

- Frontend: `https://afriiorg.vercel.app` (project root `client`)
- Backend: `https://afiiorgserver.vercel.app` (project root `server`)

`client/vercel.json` proxies `/api/*` to this backend. Both projects have been
deployed with this connection. Vercel originally selected `src/app.js`, which is
an app factory, causing `FUNCTION_INVOCATION_FAILED`. The explicit `server/index.js`
entry point exports the initialized Express application; `src/index.js` starts
a listener only outside Vercel. Keep this entry point for future deployments.
Configure backend secrets in the backend project's Production environment,
including `CLIENT_URL=https://afriiorg.vercel.app`, then redeploy the backend.
The local ignored `.env` is not automatically copied to Vercel.
Set `NODE_ENV` to exactly `production` without trailing whitespace so secure
session cookies and production proxy handling are enabled.

The instructions below for a persistent Node.js host are an alternative hosting
option; Vercel manages the function lifecycle for the current backend deployment.

The Vite proxy runs only on your computer. Deploying `client/` does not deploy
the Express application in `server/`. The existing self-rewrite is not an API.

1. Deploy `server/` as a Node.js web service on your backend host. Use Node 22+,
   build command `npm ci`, and start command `npm start` with `server` as its root.
2. Set these variables in that host's dashboard (local `.env` files are not deployed):
   - `NODE_ENV=production`
   - `CLIENT_URL=https://afriiorg.vercel.app` (no trailing slash)
   - `MONGODB_URI` and `MONGODB_DB=afrii`
   - `SESSION_SECRET` (at least 32 characters)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `PAYSTACK_SECRET_KEY` and the account's enabled `PAYSTACK_CURRENCIES`
   Use the existing database to retain articles, admin accounts and PDFs. Allow
   the backend host's network access in MongoDB Atlas. Do not copy these secrets
   into frontend variables. `ADMIN_PASSWORD` is not needed for normal operation.
3. Confirm `https://YOUR-BACKEND-HOST/api/health` returns JSON, then from `client/` run:

   ```sh
   npm run backend:configure -- https://YOUR-BACKEND-HOST
   ```

   This checks the host and updates `client/vercel.json` to proxy `/api/*` to it.
4. Commit/push the changed configuration and redeploy the Vercel project. Its root
   directory should be `client`, build command `npm run build`, output `dist`.
5. Check `https://afriiorg.vercel.app/api/stories` returns JSON, then test admin
   sign-in, a PDF preview and a contact submission. These requests stay on the
   website's origin, including session cookies; no browser CORS workaround is needed.
6. Configure Paystack's webhook as
   `https://YOUR-BACKEND-HOST/api/webhooks/paystack`. Direct backend delivery keeps
   webhook handling independent of the frontend deployment. Test payments first.

The API backend does not need a copy of `client/dist` for `/api` routes. Its root
page may be unavailable when only `server/` is deployed; use `/api/health` to check it.
Uploaded PDFs and images retain the existing 25 MB and 8 MB backend limits.

External rewrite reference: https://vercel.com/docs/rewrites
