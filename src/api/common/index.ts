import { ReqParams, ResResult } from './model';
import { get } from '/@/utils/http';

enum URL {
  page_one_list = '/api/common/page_one/list',
  list = '/api/node/nodelist',
}

const page_one_list = async (data: ReqParams) => get<ResResult>({ url: URL.page_one_list, data });

const node_list = async (data: ReqParams) => get<ResResult>({ url: URL.list, data });

export default { page_one_list, node_list };
