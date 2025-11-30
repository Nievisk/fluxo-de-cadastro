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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const mailer_service_1 = require("./mailer.service");
const jwt_service_1 = require("./jwt.service");
const hash_service_1 = require("./hash.service");
let AuthService = class AuthService {
    constructor(prisma, mailer, jwt, hash) {
        this.prisma = prisma;
        this.mailer = mailer;
        this.jwt = jwt;
        this.hash = hash;
    }
    async register(data) {
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existing) {
            if (!existing.is_valid) {
                const token = this.jwt.create(existing.id, existing.is_valid);
                await this.mailer.send({ ...existing, token });
                return;
            }
            throw new common_1.ConflictException("Email already in use");
        }
        const hashed = this.hash.hashData(data.password);
        const newUser = await this.prisma.user.create({
            data: {
                email: data.email,
                hashed_pass: hashed,
                first_name: data.first_name,
                last_name: data.last_name,
            },
        });
        const token = this.jwt.create(newUser.id, newUser.is_valid);
        await this.mailer.send({ ...newUser, token });
    }
    async login(data) {
        var _a;
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email }
        });
        const matches = this.hash.compareData((_a = existing === null || existing === void 0 ? void 0 : existing.hashed_pass) !== null && _a !== void 0 ? _a : "", data.password);
        if (!(existing === null || existing === void 0 ? void 0 : existing.is_valid) || !matches)
            throw new common_1.UnauthorizedException("Incorrect email or password");
        const accessToken = this.jwt.create(existing.id, existing.is_valid);
        return accessToken;
    }
    async validate(id) {
        const existing = await this.prisma.user.findUnique({ where: { id } });
        if (existing === null || existing === void 0 ? void 0 : existing.is_valid)
            return;
        const user = await this.prisma.user.update({
            where: { id },
            data: { is_valid: true }
        });
        const accessToken = this.jwt.create(user.id, user.is_valid);
        return accessToken;
    }
    async findUser(id) {
        return await this.prisma.user.findUnique({
            where: { id },
            select: { first_name: true }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.SendEmailService,
        jwt_service_1.JwtService,
        hash_service_1.HashService])
], AuthService);
