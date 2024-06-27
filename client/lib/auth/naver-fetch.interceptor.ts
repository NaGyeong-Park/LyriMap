/**
 * This interceptor is used to modify the response of the naver access token request as it does not strictly follow the OAuth2 spec
 * @param originalFetch
 */
export const naverFetchInterceptor =
  (originalFetch: typeof fetch) =>
  async (url: Parameters<typeof fetch>[0], options: Parameters<typeof fetch>[1] = {}) => {
    /* Only intercept naver access token request */
    if (url === "https://nid.naver.com/oauth2.0/token" && options.method === "POST") {
      const response = await originalFetch(url, options);
      const body = await response.json();
      body.expires_in = parseInt(body.expires_in);

      /*  Create a new response with the modified body */
      const modifiedResponse = new Response(JSON.stringify(body), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });

      /* Add the original url to the response */
      return Object.defineProperty(modifiedResponse, "url", {
        value: response.url,
      });
    }

    return originalFetch(url, options);
  };
