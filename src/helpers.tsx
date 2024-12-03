export const getGameTime = (gameStart: Date, gameEnd?: Date) => {
  const now = gameEnd || new Date(Date.now());
  const timeDiff = new Date(
    now.getTime() - gameStart.getTime() + now.getTimezoneOffset() * 1000 * 60,
  );

  return timeDiff.toLocaleTimeString();
};

export const setCookie = (key: string, value: string | number) => {
  document.cookie = `${key}=${value};path=/;`;
};

export const clearCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });
};

export const getCookie = (key: string) => {
  const name = key + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
