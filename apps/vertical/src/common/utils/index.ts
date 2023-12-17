/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param queryParams
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.google.com', obj)
 *  ==>www.google.com?a=3&b=4
 */
export function setObj2UrlParams(
  baseUrl: string,
  queryParams: Record<string, string | string[] | number | boolean>,
): string {
  const searchParams = new URLSearchParams();
  for (const [key, values] of Object.entries(queryParams)) {
    if (Array.isArray(values)) {
      values.forEach(value => {
        searchParams.append(key, value);
      });
    } else {
      searchParams.append(key, `${values}`);
    }
  }
  return /\?$/.test(baseUrl)
    ? baseUrl + searchParams.toString()
    : baseUrl.replace(/\/?$/, '?') + searchParams.toString();
}
export function getUrl2Obj(url: string) {
  const [baseUrl, params] = url.split('?');
  const urlParams = new URLSearchParams(params);
  return {
    baseUrl,
    params: new Map(urlParams.entries()),
  };
}
