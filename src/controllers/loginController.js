const Login = require('../models/LoginModel')

const index = (req, res) => {
    if(req.session.user) return res.render('login-logado')
    res.render('login')
}

async function register(req, res) {


    try {
        const login = new Login(req.body) // enviando o body como argumento que é necessário para o contrutor da classe
        await login.register()
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors) // aqui envia uma mensagem de erro para o usuário, caso tenha
            req.session.save(function() { // não sei para quê(se deu errado) mas estamos salvando a sessão do usuário
                return res.redirect('/login/index')
            })
            return
        }
    
        req.flash('success', 'Seu usuário foi criado com Sucesso.') // aqui envia uma mensagem de erro para o usuário, caso tenha
        req.session.save(function() { // não sei para quê(se deu errado) mas estamos salvando a sessão do usuário
            return res.redirect('/login/index')
        })

    } catch (e) {
        console.log(e)
        return res.render('404')
    }

}

async function login(req, res) {

    try {
        const login = new Login(req.body) // enviando o body como argumento que é necessário para o contrutor da classe
        await login.login()
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors) // aqui envia uma mensagem de erro para o usuário, caso tenha
            req.session.save(function() { // não sei para quê(se deu errado) mas estamos *salvando a sessão do usuário
                return res.redirect('/login/index')
            })
            return
        }
    
        req.flash('success', 'Você entrou no sistema.') // aqui envia uma mensagem de erro para o usuário, caso tenha
        req.session.user = login.user
        req.session.save(function() { // não sei para quê(se deu errado) mas estamos salvando a sessão do usuário
            return res.redirect('/login/index')
        })

    } catch (e) {
        console.log(e)
        return res.render('404')
    }

}

function logout(req, res) {
    req.session.destroy()
    res.redirect('/')
}

module.exports = { index, register, login, logout }