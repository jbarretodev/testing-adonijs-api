import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserRepository from 'App/repositories/UserRepository'

export default class AuthController {
  public async authentication({ request, response, auth }: HttpContextContract) {
    try {
      const email:string = request.input('email')
      const password:string  = request.input('password')

      await auth.use('api').verifyCredentials(email, password)

      let userRepository = new UserRepository()
      const user = await userRepository.searchUser(email)

      const token = await auth.use('api').generate(<User>user, {
        expiresIn: '1 h',
      })

      return response.ok({
        token: token,
        user,
      })
    } catch {
      return response.unauthorized({
        error: 'credentials wrong',
      })
    }
  }

  public async logout({ auth, response }) {
    await auth.use('api').revoke()

    return response.ok({
      msg: 'token revoked',
    })
  }
}
