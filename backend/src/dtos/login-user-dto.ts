import { IsEmail, IsString, Matches, MaxLength } from "class-validator"

export class LoginUserDto {
    @IsString()
    @IsEmail()
    @MaxLength(250)
    email: string

    @IsString()
    @Matches(/^(?=.*\p{L})(?=.*\p{Nd})(?=.*[!@#$%^&*()\-_=+\[\]{};:'",.<>/?]).{8,16}$/u)
    password: string
}