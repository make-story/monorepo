/**
 * 지도관련 API
 */
import axios from 'axios';

// test
export const fetchTest = (params: any = {}) => {
  return axios
    .get('/dummy/module/index', {
      params: {
        ...params,
      },
    })
    .then(response => ({ data: response?.data }))
    .catch(error => ({ error }));
};
