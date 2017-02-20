// Middleware function to inject 404 if no prior route is able to service this request.
module.exports.inject404 = inject404;
module.exports.handler = handler;

function inject404() {
  return function inject(req, res, next) {
    let opt = {msg: 'Not Found', status: 404};
    let err = new Error(opt.msg);
    err.status = opt.status;
    next(err);
  };
};

function handler() {
  return function handle(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    let opt = {view: 'error', status: 500};
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || opt.status);
    res.render(opt.view);
  };
};
