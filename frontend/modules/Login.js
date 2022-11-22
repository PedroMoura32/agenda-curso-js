export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        console.log('entrei no init')
        this.events()
    }

    events() {
        if(!this.form) return console.log('form não existe')
        this.form.addEventListener('submit', e => {
            console.log('entrei no preventDefault')
            e.preventDefault()
            alert('FORM NÃO ENVIADO')
        })
    }
}