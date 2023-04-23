/**
 * apiManager 서버서이드 사용 방법
 */
import { createApiManager, TApiManager } from '@makeapi/common/apiManager';

export default async function createApiManagerServerSide(context: any) {
  const { store, req, res, params, query } = context;
  //console.log('createApiManagerServerSide', Date.now());

  // axios 인스턴스
  //const state = store?.getState() || {};
  const apiManager: TApiManager = createApiManager({
    store,
    //state,
    //dispatch: store?.dispatch,
    /*payload: {
      token: state?.auth?.token,
      tokenExpire: state?.auth?.tokenExpire,
    },*/
  });
  //console.log('apiManager', apiManager.apiGW);
  //console.log('Authorization', headers.Authorization);

  return apiManager;
}
