import {Router} from 'express'
import userController from "../controllers/UserController";
import {checkAuth} from "../middlewares/checkAuth";
import testValidation from "../middlewares/testValidation";
import {CreateUserDto} from "../dto/CreateUserDto";

const router = Router()


router.post('/register', testValidation(CreateUserDto), userController.register)
router.post('/login', userController.login)
router.get('/get-data', checkAuth, userController.getUserData)

export default router

