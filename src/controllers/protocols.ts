export interface IHttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export interface IHttpRequest<B> {
  params?: any;
  body?: B;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}
