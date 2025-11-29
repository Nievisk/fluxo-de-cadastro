import { Body, Controller, Get, Post, Put, Req, Res } from "@nestjs/common";
import { CreateUserdto } from "../dtos/create-user-dto";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../dtos/login-user-dto";
import { Response, Request, response } from "express"

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Req() request: Request, @Body() dto: CreateUserdto) {
        await this.authService.register(dto);
        return `Welcome ${dto.first_name}! We sent a confirmation to: ${dto.email}.`
    }

    @Post("login")
    async login(@Req() request: Request, @Req() response: Response, @Body() dto: LoginUserDto) {
        const accessToken = await this.authService.login(dto);
        response.cookie("accesstoken", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 10,
            secure: false,
            sameSite: "lax"
        })
    }

    @Post("logout")
    async logout(@Req() request: Request, @Res() response: Response) {
        response.clearCookie("accessToken")
    }

    @Put("validate")
    async validate(@Req() request: any) {
        await this.authService.validate(request.id);
        return "Account validated successfully"
    }

    @Get("user")
    async findUser(@Req() request: any) {
        return await this.authService.findUser(request.id)
    }
}