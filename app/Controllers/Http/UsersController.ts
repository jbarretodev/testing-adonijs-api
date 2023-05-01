import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { NewUser, UpdateUser } from 'App/@types/types'
import UserRepository from 'App/repositories/UserRepository'

export default class UsersController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  public async createUser(ctx: HttpContextContract) {
    const newUser = await this.userRepository.createNewUser(<NewUser>ctx.request.all())

    if (newUser) return ctx.response.created(newUser)

    return ctx.response.badRequest({
      error: 'Error creating new user',
    })
  }

  public async getAllUsers({ response }: HttpContextContract) {
    const users = await this.userRepository.getAllUsers()

    return response.ok(users)
  }

  public async getUserById({ params, response }: HttpContextContract) {
    const user = await this.userRepository.getOneUserById(params.id)

    if (!user) return response.notFound({ error: 'user not found' })

    return response.ok(user)
  }

  public async getUserByEmail({ params, response }: HttpContextContract) {
    const user = await this.userRepository.getOneUserByEmail(params.email)

    if (!user) return response.notFound({ error: 'user not found' })

    return response.ok(user)
  }

  public async deleteUser({ params, response }: HttpContextContract) {
    const rs = await this.userRepository.deleteUser(params.id)

    if (!rs) return response.notFound({ error: 'user not found' })

    return response.ok({ msg: 'user deleted' })
  }

  public async updateUser({ params, request, response }: HttpContextContract) {
    const resUp = await this.userRepository.updateUser(params.id, <UpdateUser>request.body())

    if (!resUp) return response.notFound({ error: 'user not found' })

    return response.ok(resUp)
  }

  public async changePassword({ params, request, response }: HttpContextContract) {
    const rsChange = await this.userRepository.changePassword(params.id, request.input('password'))

    if (!rsChange) return response.notFound({ error: 'user not found' })

    return response.ok({ msg: 'the password have been changed' })
  }
}
