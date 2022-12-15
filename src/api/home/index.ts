import { ReqParams, ResInfoList, ResResult } from './model';
import { get } from '/@/utils/http';

enum URL {
  list = '/api/home/list',
  info = '/api/home/info',
}

const list = async (data: ReqParams) => get<ResResult>({ url: URL.list, data });

const info = async () => get<ResInfoList>({ url: URL.info });

export default { list, info };
