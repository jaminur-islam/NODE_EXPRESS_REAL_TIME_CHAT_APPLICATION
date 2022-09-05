function decorateHtmlREsponse(page_title) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${page_title} - ${process.env.APP_NAME}`;
    res.locals.loggedUser = {};
    res.locals.errors = {};
    res.locals.data = {};
    next();
  };
}

module.exports = decorateHtmlREsponse;
