export interface ReqParams {
  limit: number;
  page: number;
}

export interface ResResult {
  id: number;
  url: string;
  ip: string;
  protocol: string;
  host: number;
  domain: string;
  email: string;
}

export interface ResList<T> {
  list: T[],
  page: number,
  pageSize: number,
  total: number
}

export interface ResEntity<T> {
  code: number,
  data: T,
  message: ''
}
