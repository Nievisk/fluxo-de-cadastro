"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../services/jwt.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(jwt) {
        this.jwt = jwt;
    }
    use(req, res, next) {
        var _a;
        const accesstoken = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a["accessToken"];
        if (!accesstoken)
            return next(new common_1.UnauthorizedException("Missing access token"));
        const { id, isValid } = this.jwt.validate(accesstoken);
        const url = req.originalUrl;
        if (!url.includes("validate") && !isValid)
            return next(new common_1.UnauthorizedException("This account is not verified"));
        req.body = { id };
        return next();
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService])
], AuthMiddleware);
