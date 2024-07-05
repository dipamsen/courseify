import { VercelRequest, VercelResponse } from "@vercel/node";

type Handler = (
  request: VercelRequest,
  response: VercelResponse
) => Promise<VercelResponse> | VercelResponse;

export const allowCors = (func: Handler): Handler => {
  return (req, res) => {
    // For the preflight request, we never actually hit this log statement
    console.log(req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    return func(req, res);
  };
};
