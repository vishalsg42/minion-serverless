import { HTTPResponse } from "../models/common-types"

export const createHTTPResponse = (statusCode: number, body: Record<string, unknown> | string): HTTPResponse => ({
  statusCode,
  body: typeof body === "string" ? body : JSON.stringify(body),
  headers: getSecurityResponseHeaders(),
})

// Adds security response headers
export const getSecurityResponseHeaders = (): Record<string, boolean | number | string> => ({
  "Content-Type": "application/json",
  "Cache-Control": "no-store, no-cache",
  "X-Content-Type-Options": "nosniff",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; form-action 'none'; sandbox",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "DENY",
})
