import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-ouz7erckyjyswymx.us.auth0.com/.well-known/jwks.json",
  }) as any,
  audience: "http://localhost:3001/api/",
  issuer: "https://dev-ouz7erckyjyswymx.us.auth0.com/",
  algorithms: ["RS256"],
});
