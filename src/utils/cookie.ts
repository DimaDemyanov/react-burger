export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(accessToken: string, minutes: number = 20) {
  const d = new Date();
  d.setTime(d.getTime() + 60 * minutes * 1000);

  accessToken = encodeURIComponent(accessToken);

  let cookie = "accessToken=" + accessToken;
  cookie += ";expires=" + d.toUTCString();
  document.cookie = cookie;
}

export function deleteCookie(name: string) {
  setCookie(name, -1);
}