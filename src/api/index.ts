import { img2code } from './img2code';
const apiFun = {
  img2code,
};
export type ApiType = keyof typeof apiFun
export function handleApi(e: any, apiName: ApiType, params: any) {
  return apiFun[apiName](params);
}
