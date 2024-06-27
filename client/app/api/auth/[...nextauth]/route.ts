import { NextRequest } from "next/server";

import { POST, GET as AuthGET } from "@/auth";
import { naverFetchInterceptor } from "@/lib/auth/naver-fetch.interceptor";
export { POST };

const originalFetch = fetch;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  // naver oauth interceptor
  if (url.pathname === "/api/auth/callback/naver") {
    global.fetch = naverFetchInterceptor(originalFetch);
    const response = await AuthGET(req);
    global.fetch = originalFetch;
    return response;
  }

  return await AuthGET(req);
}
