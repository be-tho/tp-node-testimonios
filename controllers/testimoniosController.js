import repository from "../repositories/testimoniosRepository.js"

//listar
function listar(req, res){
    repository.getAll()
        .then(function (testimonios){
            res.render(
                "listarTestimonios", //vista
                {list : testimonios} //modelo
            )
        })
        .catch(function (err){
            res.status(500).send(err.message)
        })
}

//mostrar formulario
export function nuevoForm(req, res){
    res.render("formulario", {})
}

export function crearNuevo(req, res){
    repository.create(req.body)
        .then(function (entity){
            res.render("exito", { entity })
        })
}

export default {
    listar,
    nuevoForm,
    crearNuevo
}