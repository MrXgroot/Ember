const STORAGE_KEY = "auth";

function getAuthStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return {
      accounts: [],
      activeAccountId: null,
    };
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse auth storage:", error);

    localStorage.removeItem(STORAGE_KEY);

    return {
      accounts: [],
      activeAccountId: null,
    };
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
