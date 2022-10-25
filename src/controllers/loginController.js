const Login = require('../models/LoginModel')

const index = (req, res) => {
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

module.exports = { index, register }