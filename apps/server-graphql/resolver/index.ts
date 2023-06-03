import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { RESTDataSource } from '@apollo/datasource-rest';
import { GetRequest, RequestWithBody, WillSendRequestOptions } from '@apollo/datasource-rest/src/RESTDataSource';
import qs from 'qs';
import { compile } from 'path-to-regexp';

/**
 *
 */
import books from './books/index';
import module1 from './module1/index';
export const resolvers = [books];

/**
 *
 */
export type DataSourceMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export interface DataHelperRequestOption<RequestParam = any> extends Omit<ContextInterface, 'dataSources'> {
  headers: { [key: string]: string };
  path: string;
  method?: DataSourceMethod;
  params?: RequestParam;
  flatDepth: 0 | 1;
}
class DataHelper extends RESTDataSource {
  //override memoizeGetRequests: boolean = false;

  public willSendRequest(request: WillSendRequestOptions) {}

  public async request<RequestParam extends object = any, Response = any>(
    options: Partial<DataHelperRequestOption<RequestParam>> = {},
  ): Promise<Response> {
    const {
      method = 'get',
      path: originPath = '/',
      params: originParams = {},
      req: incomingRequest,
      flatDepth = 1,
      userId,
    } = options ?? {};

    const noBodyMethod = method === 'get' || method === 'delete';
    const path = '';
    const fullPath = '';
    const headers = {};
    const requestOption = <GetRequest & RequestWithBody>{
      headers: headers,
      //body: '',
    };
    const result = await this[method](fullPath, requestOption);
    return result;
  }
}

/**
 *
 */
export interface DataSourceInterface {
  testAPI: any;
}
export interface ContextInterface extends ExpressContextFunctionArgument {
  dataSources: DataSourceInterface;
  userId?: string;
}
export const context = async ({ req, res }: ExpressContextFunctionArgument): Promise<ContextInterface> => {
  const dataSources = {
    testAPI: new DataHelper(),
  };

  return {
    dataSources,
    req,
    res,
  };
};
