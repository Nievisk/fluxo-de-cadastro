import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ICreateUser } from "../interfaces/icreate-user";
import { PrismaService } from "./prisma.service";
import { SendEmailService } from "./mailer.service";
import { JwtService } from "./jwt.service";
import { HashService } from "./hash.service";
import { ILoginUser } from "../interfaces/ilogin-user";


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailer: SendEmailService,
    private jwt: JwtService,
    private hash: HashService
  ) { }

  async register(data: ICreateUser) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      if (!existing.is_valid) {
        const token = this.jwt.create(existing.id, existing.is_valid);
        await this.mailer.send({ ...existing, token });
        return;
      }

      throw new ConflictException("Email already in use");
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


  async login(data: ILoginUser) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    const matches = this.hash.compareData(existing?.hashed_pass ?? "", data.password)

    if (!existing?.is_valid || !matches) throw new UnauthorizedException("Incorrect email or password");

    const accessToken = this.jwt.create(existing.id, existing.is_valid)
    return accessToken
  }

  async validate(id: string) {
    const existing = await this.prisma.user.findUnique({ where: { id } })

    if (existing?.is_valid) return;

    const user = await this.prisma.user.update({
      where: { id },
      data: { is_valid: true }
    })

    const accessToken = this.jwt.create(user.id, user.is_valid)
    return accessToken
  }

  async findUser(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: { first_name: true }
    })
  }
}