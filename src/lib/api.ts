// Helper utility for authenticated fetch requests across Aestific.
// Authentication tokens are stored exclusively in secure HttpOnly cookies.
// JavaScript access is eliminated to protect against XSS token exfiltration.
// Under no circumstances are tokens stored in localStorage, sessionStorage, or IndexedDB.

let inMemoryAuthToken: string | null = null;

// Ensure any legacy token artifacts from prior turns are cleared from web storage
try {
  localStorage.removeItem('aestific_token');
  sessionStorage.removeItem('aestific_token');
} catch {
  // Ignore storage errors in restricted contexts
}

export function getAuthToken(): string | null {
  return inMemoryAuthToken;
}

export function setAuthToken(token?: string) {
  if (!token || typeof token !== 'string') {
    inMemoryAuthToken = null;
    return;
  }
  const clean = token.trim();
  inMemoryAuthToken = clean || null;
}

export function clearAuthToken() {
  inMemoryAuthToken = null;
  try {
    localStorage.removeItem('aestific_token');
    sessionStorage.removeItem('aestific_token');
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

// Media and file download URLs authenticate via HttpOnly session cookies or query token for cross-origin iframes
export function getAuthMediaUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('data:') || url.startsWith('blob:')) return url;

  const token = getAuthToken();
  if (!token) return url;

  if (url.startsWith('/api/files/download/') || url.startsWith('/api/files/raw/')) {
    if (url.includes('token=')) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}token=${encodeURIComponent(token)}`;
  }
  return url;
}

export async function authFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers || {});

  const token = getAuthToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    if (!headers.has('x-guest-id')) {
      const gid = localStorage.getItem('aestific_guest_id');
      if (gid) {
        headers.set('x-guest-id', gid);
      }
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }

  const response = await fetch(input, {
    ...init,
    credentials: init?.credentials || 'include',
    headers,
  });

  return response;
}

export async function safeParseJson(res: Response): Promise<any> {
  const text = await res.text();
  const trimmed = text.trim();
  if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<!doctype') || trimmed.startsWith('<html') || trimmed.startsWith('<')) {
    throw new Error('Server returned an HTML page instead of JSON. Please check server connection or API route.');
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text || 'Invalid JSON response from server.');
  }
}


