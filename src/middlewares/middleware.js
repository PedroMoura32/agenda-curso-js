function middlewareGlobal(req, res, next) {
    res.locals.umaVariavelLocal = 'Este é o valor da variável local.'

    next()
}

function checkCsrfError(err, req, res, next) {
    if(err) {
        return res.render('404')
    }

    next()
}

function csrfMiddleware(req, res, next) {
    res.locals.csrfToken = req.csrfToken()
    next()
}

module.exports = { middlewareGlobal, checkCsrfError, csrfMiddleware }