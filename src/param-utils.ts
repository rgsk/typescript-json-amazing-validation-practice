export const removeParamsFromQuery = (query: string, params: string[]) => {
  const urlSearchParams = new URLSearchParams(query);
  for (let param of params) {
    urlSearchParams.delete(param);
  }
  return urlSearchParams.toString();
};

export const addParamsToQuery = (
  query: string,
  obj: Record<string, string | string[]>
) => {
  const urlSearchParams = new URLSearchParams(query);
  for (let [param, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      for (let v of value) {
        urlSearchParams.append(param, v);
      }
    } else {
      urlSearchParams.append(param, value);
    }
  }
  return urlSearchParams.toString();
};
export const removeParamsFromPath = (
  pathWithQuery: string,
  params: string[]
) => {
  const [path, query] = pathWithQuery.split("?");
  const newQuery = removeParamsFromQuery(query, params);
  if (newQuery.length === 0) {
    return path;
  }
  const finalPath = path + "?" + newQuery;
  return finalPath;
};
export const addParamsToPath = (
  pathWithQuery: string,
  obj: Record<string, string | string[]>
) => {
  const [path, query] = pathWithQuery.split("?");
  const newQuery = addParamsToQuery(query, obj);
  if (newQuery.length === 0) {
    return path;
  }
  const finalPath = path + "?" + newQuery;
  return finalPath;
};
