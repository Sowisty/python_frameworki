module.exports = {
    mount: [['./', './']],
    middleware: function (req, res, next) {
      if (req.url.endsWith('.gz')) {
        res.setHeader('Content-Encoding', 'gzip');
      }
      next();
    }
  };
  