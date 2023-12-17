import Cookies from 'js-cookie'

export const setCookie = (
  nameCookie: string,
  valueCookie: string,
  timeCookie?: number
) => {
  const expirationDate = new Date()
  if (timeCookie) {
    expirationDate.setTime(expirationDate.getTime() + timeCookie) // 24 horas en milisegundos -> 24 * 60 * 60 * 1000
  }
  Cookies.set(nameCookie, valueCookie, { expires: expirationDate })
}

export const getCookie = (nameCookie: string): string | undefined => {
  const cookieValue = Cookies.get(nameCookie)
  return cookieValue || undefined
}

export const removeCookie = (cookieName: string) => {
  Cookies.remove(cookieName)
}
