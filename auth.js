(async () => {
  const config = window.playbookAuthConfig;

  const createAuthShell = () => {
    const shell = document.createElement("section");
    shell.className = "auth-shell";
    shell.setAttribute("role", "dialog");
    shell.setAttribute("aria-labelledby", "authTitle");
    shell.setAttribute("aria-live", "polite");
    shell.innerHTML = `
      <div class="auth-card">
        <img src="mmi-playbook-logo.png" alt="" class="auth-logo">
        <p class="eyebrow">Secure playbook</p>
        <h1 id="authTitle">Sign in to continue</h1>
        <p id="authMessage">Checking your Mitchell Martin account...</p>
        <div class="auth-actions"></div>
      </div>
    `;
    document.body.appendChild(shell);
    return shell;
  };

  const authShell = createAuthShell();
  const authMessage = authShell.querySelector("#authMessage");
  const authActions = authShell.querySelector(".auth-actions");

  const setAuthMessage = (title, message, action) => {
    authShell.querySelector("#authTitle").textContent = title;
    authMessage.textContent = message;
    authActions.replaceChildren();
    if (action) {
      authActions.appendChild(action);
    }
  };

  const makeButton = (text, onClick) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "auth-button";
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  };

  const showApp = (account, msalInstance) => {
    document.body.classList.remove("auth-pending");
    document.body.classList.add("auth-ready");
    authShell.remove();

    const status = document.createElement("div");
    status.className = "auth-status";
    const name = account?.name || account?.username || "Signed in";
    status.innerHTML = `
      <span>${name}</span>
      <button type="button">Sign out</button>
    `;
    status.querySelector("button").addEventListener("click", () => {
      msalInstance.logoutRedirect({ account });
    });
    document.querySelector(".topbar")?.appendChild(status);
  };

  const isPlaceholderConfig = () => {
    const auth = config?.msal?.auth || {};
    return !config || !auth.clientId || !auth.authority ||
      auth.clientId.includes("REPLACE_WITH") ||
      auth.authority.includes("REPLACE_WITH");
  };

  const domainIsAllowed = (account) => {
    if (!config.requireAllowedDomain) {
      return true;
    }
    const username = account?.username || "";
    const domain = username.split("@")[1]?.toLowerCase();
    return Boolean(domain && config.allowedDomains.includes(domain));
  };

  if (!config?.enabled) {
    document.body.classList.remove("auth-pending");
    authShell.remove();
    return;
  }

  if (isPlaceholderConfig()) {
    setAuthMessage(
      "SSO setup required",
      "Add your Microsoft Entra app client ID and tenant ID in auth-config.js before this playbook can sign users in.",
      null
    );
    return;
  }

  if (!window.msal) {
    setAuthMessage(
      "SSO library unavailable",
      "The Microsoft sign-in library could not load. Check the network connection or host the MSAL browser script locally.",
      null
    );
    return;
  }

  const msalInstance = new msal.PublicClientApplication(config.msal);

  try {
    const redirectResult = await msalInstance.handleRedirectPromise();
    const account = redirectResult?.account || msalInstance.getAllAccounts()[0];

    if (account && domainIsAllowed(account)) {
      msalInstance.setActiveAccount(account);
      showApp(account, msalInstance);
      return;
    }

    if (account && !domainIsAllowed(account)) {
      setAuthMessage(
        "Account not allowed",
        "This account is signed in, but it is not on the allowed playbook domain list.",
        makeButton("Use a different account", () => msalInstance.logoutRedirect({ account }))
      );
      return;
    }

    setAuthMessage(
      "Sign in to continue",
      "Use your Mitchell Martin Microsoft account to access the sales playbook.",
      makeButton("Sign in with Microsoft", () => msalInstance.loginRedirect(config.loginRequest))
    );
  } catch (error) {
    setAuthMessage(
      "Sign-in error",
      error?.message || "Microsoft sign-in could not complete. Check the Entra app registration settings.",
      makeButton("Try again", () => msalInstance.loginRedirect(config.loginRequest))
    );
  }
})();
