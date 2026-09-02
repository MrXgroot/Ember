const STORAGE_KEY = "auth";

const EMPTY_AUTH_STORAGE = {
  accounts: [],
  activeAccountId: null,
};

function getAuthStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return { ...EMPTY_AUTH_STORAGE };
  }

  try {
    const parsed = JSON.parse(stored);

    // Guard against valid JSON with an invalid structure.
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid auth storage format");
    }

    return {
      accounts: Array.isArray(parsed.accounts) ? parsed.accounts : [],
      activeAccountId:
        typeof parsed.activeAccountId === "string"
          ? parsed.activeAccountId
          : null,
    };
  } catch (error) {
    console.error("Invalid auth storage. Resetting:", error);

    localStorage.removeItem(STORAGE_KEY);

    return { ...EMPTY_AUTH_STORAGE };
  }
}

function saveAuthStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAccounts() {
  return getAuthStorage().accounts;
}

export function saveAccount(account) {
  const storage = getAuthStorage();

  const existingIndex = storage.accounts.findIndex(
    (item) => item.id === account.id,
  );

  if (existingIndex === -1) {
    storage.accounts.push(account);
  } else {
    storage.accounts[existingIndex] = account;
  }

  saveAuthStorage(storage);
}

export function removeAccount(accountId) {
  const storage = getAuthStorage();

  storage.accounts = storage.accounts.filter(
    (account) => account.id !== accountId,
  );

  if (storage.activeAccountId === accountId) {
    storage.activeAccountId = null;
  }

  saveAuthStorage(storage);
}

export function getActiveAccountId() {
  return getAuthStorage().activeAccountId;
}

export function saveActiveAccountId(accountId) {
  const storage = getAuthStorage();

  storage.activeAccountId = accountId;

  saveAuthStorage(storage);
}

export function getActiveAccount() {
  const storage = getAuthStorage();

  return (
    storage.accounts.find(
      (account) => account.id === storage.activeAccountId,
    ) ?? null
  );
}

export function clearActiveAccount() {
  const storage = getAuthStorage();

  storage.activeAccountId = null;

  saveAuthStorage(storage);
}
