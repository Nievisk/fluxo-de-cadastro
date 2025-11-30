import { IsString, Matches } from "class-validator"
import { LoginUserDto } from "./login-user-dto"

export class CreateUserdto extends LoginUserDto {
    @IsString()
    @Matches(/^[\p{L}\s'-]{3,50}$/u)
    first_name: string

    @IsString()
    @Matches(/^[\p{L}\s'-]{3,50}$/u)
    last_name: string
}