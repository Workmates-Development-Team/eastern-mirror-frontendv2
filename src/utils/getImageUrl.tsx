// export function getImageUrl(path?: string) {
//   return path
//     ? process.env.NEXT_PUBLIC_API_BASE_URL + path
//     : "/images/logo.webp";
// }
export function getImageUrl(path?: string) {
  return path
    ? 'https://api.easternmirrornagaland.com' + path
    : "/images/logo.webp";
}
