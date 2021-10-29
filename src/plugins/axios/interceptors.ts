import { AxiosInstance, AxiosResponse } from 'axios';

// Response Interceptor
function returnData(res: AxiosResponse) {
  return res.data;
}

export default function (axios: AxiosInstance) {
  axios.interceptors.response.use(returnData);
}
