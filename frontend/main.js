import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login'

console.log('estou na main')

const login = new Login('.form-login')
const cadaster = new Login('.form-cadaster')

login.init()
cadaster.init()

// import './assets/css/style.css';