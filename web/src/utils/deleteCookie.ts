export function deleteCookie(name: string, path: string = '/') {
  document.cookie = `${name}=;path=${path};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
