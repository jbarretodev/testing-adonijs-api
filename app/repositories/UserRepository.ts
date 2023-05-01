import { NewUser, UpdateUser } from 'App/@types/types'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UserRepository {
  public async getAllUsers() {
    return await User.all()
  }

  public async getOneUserById(id: number) {
    const user = await User.find(id)

    if (!user) return undefined

    return user
  }

  public async getOneUserByEmail(email: string) {
    const user = await User.findBy('email', email)

    if (!user) return undefined

    return user
  }

  public async searchUser(email: string) {
    return await User.findBy('email', email)
  }

  public async createNewUser(newUser: NewUser) {
    const user = await User.create(newUser)

    if (!user) return undefined

    return user
  }

  public async deleteUser(id: number) {
    const user = await User.find(id)

    if (!user) return undefined

    await user.delete()

    return true
  }

  public async updateUser(id: number, upUser: UpdateUser) {
    const user = await User.find(id)

    if (!user) return undefined

    await user.merge(upUser).save()
    return await user.refresh()
  }

  public async changePassword(id: number, newPassword: string) {
    let user = await User.find(id)

    if (!user) return undefined

    user.password = await Hash.make(newPassword)
    await user.save()

    return await user.refresh()
  }
}
