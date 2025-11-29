import { IsEmail, IsString, Matches, MaxLength } from "class-validator"

export class LoginUserDto {
    @IsString()
    @IsEmail()
    @MaxLength(250)
    email: string

    @IsString()
    @Matches(/^(?=.*\p{L})(?=.*\p{Nd})(?=.*[\p{S}\p{P}])[\p{L}\p{Nd}\p{S}\p{P}][^\s]{8,16}$/u)
    password: string
}