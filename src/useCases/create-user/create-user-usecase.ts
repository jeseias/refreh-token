import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';

interface IUserRequest {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    // Verify is user exists 
    const userAlreadyExist = client.user.findFirst({
      where: {
        username
      }
    })

    if (userAlreadyExist) {
      throw new Error('User Already exists')
    }

    // Create User
    const hashedPassword = await hash(password, 8)

    const user = await client.user.create({
      data: {
        name,
        username,
        password: hashedPassword
      }
    })

    return user
  }
}