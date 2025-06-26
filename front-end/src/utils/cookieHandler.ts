export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const setCookie = (
  name: string,
  value: string,
  options: { days?: number; path?: string } = {}
) => {
  let cookie = `${name}=${value}`;

  if (options.days) {
    const date = new Date();
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
    cookie += `; expires=${date.toUTCString()}`;
  }

  cookie += `; path=${options.path || "/"}`;
  cookie += "; Secure";
  cookie += "; SameSite=Strict";

  document.cookie = cookie;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
