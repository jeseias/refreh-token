import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";

interface IUserAuthenticationRequest {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IUserAuthenticationRequest) {
    // Verify if user exists
    const userAlreadyExists = await client.user.findFirst({
      where: { username }
    })

    if (!userAlreadyExists) {
      throw new Error('User or password is incorrect!')
    }

    // Verify if the password is correct
    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error("Usr or password is incorrect!")
    }

    // Generate user token
    const token = sign({}, process.env.SECRET_JWT_CODE, {
      subject: userAlreadyExists.id,
      expiresIn: "20s"
    })

    return { token }
  }  
}