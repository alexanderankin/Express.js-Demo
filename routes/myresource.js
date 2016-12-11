var express = require('express');
var router = express.Router();

var db = require('../db');

function runquery(query, params, done) {
  if (typeof params == 'function')
    done = params;

  db.getConnection(function (err, conn) {
    if (err) return done(err);
    conn.query(query, params, function (err, response) {
      conn.release();
      if (err) return done(err);

      return done(null, response);
    });
  });
}

/* GET whole listing. */
router.get('/', function(req, res, next) {
  runquery("use mydb; select * from myResource;", function (e, response) {
    if (e) return next(e);
    res.json(response);
  });
});

/* GET one listing. */
router.get('/:id', function(req, res, next) {
  runquery("use mydb; select * from myResource where id = ?;", req.params.id, function (e, response) {
    if (e) return next(e);
    res.json(response);
  });
});

/* POST new listing. */
router.post('/', function(req, res, next) {
  runquery("use mydb; insert into myResource (data) values (?);", req.body, function (e, response) {
    if (e) return next(e);
    res.json(response);
  });
});

/* PUT updated listing. */
router.put('/:id', function(req, res, next) {
  runquery("use mydb; update myResource set data = ? where id= ?;", req.body, req.params.id, function (e, response) {
    if (e) return next(e);
    res.json(response);
  });
});

/* DELETE listing. */
router.delete('/:id', function(req, res, next) {
  runquery("use mydb; delete from myResource where id = ?", req.params.id, function (e, resp) {
    if (e) return next(e);
    res.json(resp);
  })
});


module.exports = router;
