import { Router } from 'express'
import { ensureAuthenticated } from './middlewares/ensure-authenticated'
import { AuthenticateUserController } from './useCases/authenticate-user/authenticate-user-controller'
import { CreateUserController } from './useCases/create-user/create-user-controller'

const createUserController = new CreateUserController()
const authenticateController = new AuthenticateUserController()

const router = Router()

router.post('/users', createUserController.handle)
router.post('/login', authenticateController.handle)

router.get('/courses', ensureAuthenticated, (req, res) => {
  return res.json([
    { id: 1, name: 'NodeJS' },
    { id: 2, name: 'ReactJS' },
    { id: 3, name: 'ReactNative' },
    { id: 4, name: 'Flutter' },
    { id: 5, name: 'Elixir' }
  ])
})

export { router }