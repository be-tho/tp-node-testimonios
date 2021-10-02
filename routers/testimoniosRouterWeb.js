import express from "express";
import controller, {nuevoForm} from "../controllers/testimoniosController.js"



const router = express.Router()



router.route('/')
    .get(function (req, res){
    res.send("hola mundo")
})

router.route('/listar')
    .get(controller.listar)


router.route('/nuevoTestimonio')
    .get(controller.nuevoForm)
    .post(controller.crearNuevo)
export default router