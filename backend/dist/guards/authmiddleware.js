"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const express_jwt_1 = require("express-jwt");
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
exports.checkJwt = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dev-ouz7erckyjyswymx.us.auth0.com/.well-known/jwks.json",
    }),
    audience: "http://localhost:3001/api/",
    issuer: "https://dev-ouz7erckyjyswymx.us.auth0.com/",
    algorithms: ["RS256"],
});
