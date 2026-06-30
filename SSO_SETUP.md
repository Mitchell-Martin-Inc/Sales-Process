# Sales Playbook SSO Setup

This site now includes a Microsoft Entra ID sign-in gate through `auth.js` and `auth-config.js`.

## Required Entra App Registration

1. Create a Microsoft Entra ID app registration for the sales playbook.
2. Set the platform type to **Single-page application**.
3. Add redirect URIs for every place the site will run, for example:
   - `http://127.0.0.1:8787/index.html`
   - `http://127.0.0.1:8787/resources.html`
   - Your production `index.html` URL
   - Your production `resources.html` URL
4. Copy the **Application client ID** and **Directory tenant ID**.
5. Update `auth-config.js`:
   - Replace `REPLACE_WITH_ENTRA_APP_CLIENT_ID`
   - Replace `REPLACE_WITH_TENANT_ID`

## Important Security Note

Client-side SSO protects the app experience, but it does not fully secure static files if someone can request them directly by URL.

For true protection, host the site behind an authenticated service such as Azure Static Web Apps authentication, Azure App Service Easy Auth, SharePoint permissions, or another reverse proxy/access gateway that requires Microsoft sign-in before serving `index.html`, `resources.html`, and everything in `resources/`.

## Optional Domain Restriction

`auth-config.js` includes:

```js
requireAllowedDomain: false,
allowedDomains: ["mitchellmartin.com", "itmmi.com"]
```

Set `requireAllowedDomain` to `true` after confirming the expected signed-in usernames use those domains.
