const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const hasValidCodespaceName =
  typeof codespaceName === 'string' &&
  codespaceName.length > 0 &&
  codespaceName !== 'undefined' &&
  codespaceName !== 'null';

export function getApiBaseUrl() {
  if (hasValidCodespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(resource) {
  const cleanResource = String(resource).replace(/^\/+|\/+$/g, '');

  if (import.meta.env.DEV) {
    return `/api/${cleanResource}/`;
  }

  return `${getApiBaseUrl()}/api/${cleanResource}/`;
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.records)) {
    return payload.records;
  }

  return [];
}
