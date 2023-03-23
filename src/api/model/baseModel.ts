export interface BasicPageParams {
  current: number;
  size: number;
}

export interface BasicFetchResult<T> {
  records: T[];
  total: number;
}
