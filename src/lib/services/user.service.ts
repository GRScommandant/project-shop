import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { Prisma } from '@prisma/client'

export type CreateUserInput = {
  email: string
  name: string
  password: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  username:string
}

export type UpdateUserInput = Partial<Omit<CreateUserInput, 'password'>> & {
  password?: string
}

export const userService = {
  async createUser(input: CreateUserInput) {
    const hashedPassword = await hash(input.password, 12)

    const userData: Prisma.UserCreateInput = {
      email: input.email,
      name: input.name,
      password: hashedPassword,
      phone: input.phone,
      username: input.username,
    }

    if (input.address) {
      userData.address = {
        create: input.address
      }
    }

    const user = await prisma.user.create({
      data: userData,
      include: {
        address: true
      }
    })

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        address: true
      }
    })
    return user
  },


  async getUserByUsername (username : string) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        address: true
      }
    })
    return user
  },

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        address: true
      }
    })

    if (!user) return null

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async updateUser(id: string, input: UpdateUserInput) {
    const updateData: Prisma.UserUpdateInput = {
      ...input
    }

    if (input.password) {
      updateData.password = await hash(input.password, 12)
    }

    if (input.address) {
      updateData.address = {
        upsert: {
          create: input.address,
          update: input.address
        }
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        address: true
      }
    })

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id }
    })
  }
}
