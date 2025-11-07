import { Hono } from 'hono';

const app = new Hono();

app.get('/google-login', (c) => {
  const { GOOGLE_ID, REDIRECT_URI } = c.env;
  const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
  const SCOPE = "https://www.googleapis.com/auth/youtube.readonly";

  const authUrl = `${AUTH_ENDPOINT}?client_id=${encodeURIComponent(GOOGLE_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&access_type=offline&prompt=consent`;

  return c.redirect(authUrl);
});

app.get('/google', async (c) => {
  const { GOOGLE_ID, GOOGLE_SECRET, REDIRECT_URI } = c.env;
  const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

  const url = new URL(c.req.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return c.text('No code found in the URL.');
  }

  // Exchange code for token
  const tokenResponse = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `code=${code}&client_id=${GOOGLE_ID}&client_secret=${GOOGLE_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`,
  });

  const tokenData = await tokenResponse.json();
  let message = tokenData.refresh_token
    ? `Please Do Not Refresh This Page!!!\n\nPlease pass this token : "${tokenData.refresh_token}" in ytm-term\n\neg : ytm-term login --token="${tokenData.refresh_token}"`
    : 'No refresh token received.';

  return c.text(message);
});

export default app;
