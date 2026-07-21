const STORAGE_KEY = "auth";

export function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession() {
  const session = localStorage.getItem(STORAGE_KEY);

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session);
  } catch (error) {
    console.error(error);

    localStorage.removeItem(STORAGE_KEY);

    return null;
  }
}

export function getToken() {
  return getSession()?.token ?? null;
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}
