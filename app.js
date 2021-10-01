import express from 'express'
import routerApi from './routers/testimoniosRouter.js'
import routerWeb from './routers/testimoniosRouterWeb.js'

const app = express ()

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

//parse body sea JSON
app.use(express.json ())
app.use(express.urlencoded({ extended : true }))

//le paso a express mi api para q lo use
app.use(routerApi)
app.use (routerWeb)

app.listen ('80', function () {
    console.log ("SERVER ON!")
})
