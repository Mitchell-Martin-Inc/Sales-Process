window.playbookAuthConfig = {
  enabled: true,
  requireAllowedDomain: true,
  allowedDomains: ["mitchellmartin.com", "itmmi.com"],
  msal: {
    auth: {
      clientId: "22b31d32-ad85-4c7f-9e91-d9233dc1b871",
      authority: "https://login.microsoftonline.com/7f492253-744d-45d5-81fa-5cff91344686",
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
