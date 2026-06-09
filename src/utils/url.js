import { stringify } from "qs";
import { isEmpty, toPairs, omit } from "ramda";

export const buildUrl = (route, params) => {
  const placeHolders = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = stringify(omit(placeHolders, params));

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};
