import { MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk';
import { Quiz } from '../../models/Quiz';

export type Methods = {
  get: {
    query?: MicroCMSQueries;
    resBody: MicroCMSListResponse<Quiz>;
  };
};
