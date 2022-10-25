const mongoose = require('mongoose')
const validator = require('validator')

const LoginSchema = new mongoose.Schema({
    email:  { type: String, required: true },
    password: { type: String, required: true }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body) {
        this.body = body, //recebe os dados digitados
        this.errors = [], //gera uma flag de erro caso precise, controla se o usuário pode ou não ser cadastrado
        this.user = null //
    }
    // este método chama o método valida
    async register() {
        this.valida()
        if(this.errors.length > 0) return

        try {
            this.user = await LoginModel.create(this.body)
        } catch (e) {
            console.log(e)
        }
    }

    valida() {
        this.cleanUp()
        //Validação
        // O e-mail precisa ser válida
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!') //usando a função validator para checar se o e-mail é valido
        // A senha precisa ter entre 3 e 10
        if(this.body.password.length < 3 || this.body.length > 10) this.errors.push('Senha inválida, precisa ter de 3 a 10 caracteres!')
        
    }

    cleanUp(){
        for(const key in this.body) {
            if(typeof this.body[key] !== "string") {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login