//aqui temos as variáveis de ambiente, para que as senhas e usuários possam estar protegidos - la no arquivo .env
require('dotenv').config()
console.log('teste')
const express = require('express') // inicio do express
const app = express()
const mongoose = require('mongoose') // vai modelar nossa base de dados

//aqui começa a conexão com o banco de dados
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Connect a base de dados')
        app.emit('pronto') //emite um sinal, se positivo, lá embaixo ele deixa o código rolar
    })
    .catch(e => console.log(e))

// as sessões salvam cookies no pc do cliente
const session = require('express-session')
const MongoStore = require('connect-mongo') // as sessões serão salvas dentro da base de dados
const flash = require('connect-flash') // mensagens autodestrutivas, assim que ler ela vai sumir - feedback msg de erro

const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
//middlewares são "funções" que são executadas no meio do caminho
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware')
app.use(helmet())

app.use(express.urlencoded({ extended: true })) //podemos postar formularios para dentro da aplicação
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public'))) // arquivos estáticos - imagens, css, js... devem ser acessados diretamente

const sessionOptions = session({
    secret: 'texto secreto',
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 7, //duração do cookie 7 dias
        httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING })
})
app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))// arquivos que a gente renderiza na tela
app.set('view engine', 'ejs') // aqui a engine que estamo utilizando para renderizar o html

app.use(csrf())
app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(routes)

app.on('pronto', () => {

    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log('Servirdor executando na porta 3000')
    })

})
