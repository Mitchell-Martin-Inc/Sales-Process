window.playbookAuthConfig = {
  enabled: true,
  requireAllowedDomain: false,
  allowedDomains: ["mitchellmartin.com", "itmmi.com"],
  msal: {
    auth: {
      clientId: "REPLACE_WITH_ENTRA_APP_CLIENT_ID",
      authority: "https://login.microsoftonline.com/REPLACE_WITH_TENANT_ID",
      redirectUri: window.location.origin + window.location.pathname,
      postLogoutRedirectUri: window.location.origin + window.location.pathname,
      navigateToLoginRequestUrl: false
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false
    }
  },
  loginRequest: {
    scopes: ["openid", "profile", "email"]
  }
};
