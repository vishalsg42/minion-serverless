// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Result<T, K = any | undefined> = ResultSuccess<T> | ResultError<K>

export type ResultSuccess<T> = {
  isSuccess: true
  data: T
}

export type ResultError<K> = {
  isSuccess: false
  errorData: K
}

export function isResultError<Success, Error>(result: Result<Success, Error>): result is ResultError<Error> {
  return !result.isSuccess
}

export type LambdaFunctionVars = {
  fmcvServiceUrl: string
  fmcvTimeout?: number
  mTlsClientKey: string
  mTlsClientCert: string
}

export type HTTPResponse = {
  statusCode: number
  body: string
  headers?: {
    [header: string]: boolean | number | string
  }
}

export enum WSDLOperations {
  LoadVerification = "LoadVerificationAsync",
  LoadCard = "LoadCardAsync",
}

export type MTLSData = {
  clientKey: string
  clientCert: string
}

export enum FmcvServiceErrorType {
  // RequestDataValidationError used for legacy request
  RequestDataValidationError = "FmcvRequestValidationError",
  ConnectionError = "FmcvConnectionError",
  // Socket timeout
  Timeout = "ESOCKETTIMEDOUT",
  UnexpectedResponse = "UnexpectedResponse",
  UnexpectedException = "UnexpectedException",
  InternalServerError = "InternalServerError",
}

export type FmcvError = {
  errorType: FmcvServiceErrorType
  errorMessage?: string
}

export type FmcvServiceCommunicatorRequest = {
  [key: string]: unknown
}

export type FmcvServiceCommunicatorResponse = {
  [key: string]: unknown
}
