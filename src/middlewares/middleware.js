function middlewareGlobal(req, res, next) {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user

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