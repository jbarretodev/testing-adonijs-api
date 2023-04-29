import { NewUser } from 'App/@types/interfaces'
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

  public async createNewUser(newUser: NewUser) {
    const user = User.create(newUser)

    if (!user) return undefined

    return user
  }
}
