const Contato = require("../models/ContatoModel")

const index = async (req, res) => {
    const contatos = await Contato.buscaContatos()   
    res.render('index', { contatos })
    
    return
}

module.exports = { index }