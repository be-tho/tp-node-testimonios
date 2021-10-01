import express from "express";
import fs from "fs";
import repository from "../repositories/testimoniosRepository.js"

const router = express.Router()

router.route('/testimonios')
    .get (function (req, res) {
        repository.getAll()
            .then (function (testimonios) {
                res.status(200).json(testimonios)
            })
            .catch (function () {
                res.status (500).json ({err: 500, msg: "error al leer"})
            })
    })
    .post (function (req, res) {
        fs.promises.readFile ('./data/testimonios.json')
            .then (function (data) {
                const testimonios = JSON.parse (data)
                const testimonio = req.body
                testimonio.id = testimonios.length + 1

                testimonios.push (testimonio)

                fs.promises.writeFile ('./data/testimonios.json', JSON.stringify (testimonios))
                    .then (function () {
                        res.status (200).json (testimonio)
                    })
                    .catch (function (err) {
                        res.status (500).json ({err: 500, msg: "error al escribir el dato"})
                    })

            })
            .catch (function (err) {
                res.status (500).json ({err: 500, msg: "error al leer los datos"})
            })
    })

router.route('/testimonios/:id')
    .get (function (req, res) {
        const id = parseInt (req.params.id)
        fs.promises.readFile ('./data/testimonios.json')
            .then (function (data) {
                const testimonios = JSON.parse (data)
                const instrumento = testimonios.find (e => e.id == id)
                if (instrumento != undefined && instrumento.deleted != true ) {
                    res.status (200).json (instrumento)
                } else {
                    res.status (404).json ({err: 404, msg: "El instrumento no se encuentra"})
                }
            })
            .catch (function (err) {
                res.status (500).json ({err: 500, msg: "error al leer el dato"})
            })
    })
    .put(function (req, res){
        const id = parseInt(req.params.id)
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data)

                const testimonio = testimonios.find(e => e.id == id)
                if (testimonio != undefined && testimonio.deleted != true ) {
                    let index = testimonios.indexOf(testimonio)
                    testimonios[index] = {...req.body, id:id}

                    fs.promises.writeFile ('./data/testimonios.json', JSON.stringify (testimonios))
                        .then (function () {
                            res.status (200).json (testimonios[index])
                        })
                        .catch (function (err) {
                            res.status (500).json ({err: 500, msg: "error al escribir el dato"})
                        })
                }
            })
            .catch(function (){
                res.status(500).json({err: 500, msg: "Error al leer los datos"})
            })
    })
    .patch(function (req, res){
        const id = parseInt(req.params.id)
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data)

                const instrumento = testimonios.find(e => e.id == id)
                if (instrumento != undefined && instrumento.deleted != true ) {
                    let index = testimonios.indexOf(instrumento)
                    testimonios[index] = {...testimonios[index], ...req.body, id:id}

                    fs.promises.writeFile ('./data/testimonios.json', JSON.stringify (testimonios))
                        .then (function () {
                            res.status (200).json (testimonios[index])
                        })
                        .catch (function (err) {
                            res.status (500).json ({err: 500, msg: "error al escribir el dato"})
                        })
                }
            })
            .catch(function (){
                res.status(500).json({err: 500, msg: "Error al leer los datos"})
            })
    })
    .delete(function (req, res){
        const id = parseInt(req.params.id)
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data)

                const instrumento = testimonios.find(e => e.id == id)

                if (instrumento != undefined && instrumento.deleted != true ) {
                    instrumento.deleted = true

                    fs.promises.writeFile ('./data/testimonios.json', JSON.stringify (testimonios))
                        .then (function () {
                            res.status (200).json (instrumento)
                        })
                        .catch (function (err) {
                            res.status (500).json ({err: 500, msg: "error al escribir el dato"})
                        })
                }
            })
            .catch(function (){
                res.status(500).json({err: 500, msg: "Error al leer los datos"})
            })
    })


router.route('/deleted/:id')
    .put(function (req, res){
        const id = parseInt(req.params.id)
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data)
                const testimonio = testimonios.find(e => e.id == id)
                const name = testimonio.name
                if (testimonio.deleted == true) {
                    let index = testimonios.indexOf(testimonio)
                    testimonios[index] = {...req.body, id:id, name:name}

                    fs.promises.writeFile ('./data/testimonios.json', JSON.stringify (testimonios))
                        .then (function () {
                            res.status (200).json (testimonios[index])
                        })
                        .catch (function (err) {
                            res.status (500).json ({err: 500, msg: "error al escribir el dato"})
                        })
                }
            })
            .catch(function (){
                res.status(500).json({err: 500, msg: "Error al leer los datos"})
            })
    })
    .post

export default router