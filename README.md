# 🎵 ytm-auth

A lightweight authentication service for [`ytm-term`](https://github.com/nonesubham/ytm-term), built using [Hono](https://hono.dev) and deployed on [Cloudflare Workers](https://workers.cloudflare.com).

This sub-project allows users of `ytm-term` to securely authenticate with their **Google Account** and to retrieve `refresh token` which user used to access their private playlists in `ytm-term`  
No user data is stored – only OAuth credentials (client ID and secret) are needed for the OAuth flow.

---

## 🚀 Features

- ✅ Simple Google OAuth 2.0 sign-in flow
- ✅ Secure token exchange & direct return of refresh token
- ✅ Cloudflare Workers hosting — globally distributed and fast
- ✅ Built using Hono.js — lightweight, modern, and fast
- ✅ Zero data storage — tokens are passed directly to the user

---

## 🛠️ Setup & Deployment

### 1. Create Google OAuth 2.0 Credentials

- Go to **Google Cloud Console → API & Services → OAuth consent screen**
- Create a new OAuth 2.0 Client ID
- Add the following to **Authorized JavaScript origins**:
  - ✅ Local: `http://localhost:8787` or `http://127.0.0.1:8787`
  - ✅ Production: your deployed domain/subdomain
- Add callback URL to **Authorized redirect URIs**:
  - `http://127.0.0.1:8787/google` (for local dev)
  - `<your-domain>/google` (for production)

### 2. Clone Repo & Install Dependencies

```sh
git clone https://github.com/nonesubham/ytm-auth
cd ytm-auth
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file based on `.env.example`:

```env
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
REDIRECT_URI="http://127.0.0.1:8787/google"
```

> ⚠️ Make sure the `REDIRECT_URI` exactly matches what's configured in your Google OAuth app.

### 4. Run Locally

```sh
npm run dev
```

Your dev server should now be running at [http://127.0.0.1:8787](http://127.0.0.1:8787)

### 5. Deploy to Cloudflare Workers

First, log in to Cloudflare:

```sh
npx wrangler login
```

Then deploy:

```sh
npm run deploy
```

This will deploy your worker per the `wrangler.toml` configuration.

---

## 📁 Project Structure

```
├── src/
│   └── index.js        # Hono app with OAuth 2.0 logic
├── .env.example        # Example of required environment variables
├── wrangler.toml       # Cloudflare Workers configuration
├── package.json        # NPM scripts and dependencies
└── README.md
```

---

## 🔒 Security Notes

- No sensitive tokens (refresh or access) are stored — they are displayed directly to the user.
- Only your app’s Google OAuth `client_id` and `client_secret` need to be stored (in your environment variables).
- Do **not** commit your `.env` file to version control.

---

## ✅ Credits

- Part of the [`ytm-term`](https://github.com/nonesubham/ytm-term) ecosystem
- Uses:
  - [Hono.js](https://hono.dev)
  - [Cloudflare Workers](https://workers.cloudflare.com)

hello:
