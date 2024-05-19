const cookieCreate = (
  name,
  value,
  expires,
  domain,
  path = '/',
  secure,
  httpOnly
) => {
  let cookie = `${name}=${value}`;

  if (expires) cookie += `; expires=${expires}`;
  if (domain) cookie += `; domain=${domain}`;
  if (path) cookie += `; path=${path}`;
  if (secure) cookie += `; secure`;
  if (httpOnly) cookie += `; HttpOnly`;

  document.cookie = cookie;
};

const cookieSearch = name => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
    if (cookieName === name) return cookieValue;
  }
  return null;
};

const cookieRemove = name => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

export { cookieCreate, cookieSearch, cookieRemove };
