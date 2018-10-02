var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('registros');
});


router.post('/', function(req, res, next) {
 
  var query = req.body.query;

  knex
  .select()
  .from("padron")
  .where("nombre",'like', '%' + query + '%')
  .orWhere("apellido",'like', '%' + query + '%')
  .orWhere('dni','like', query)
  .then(function(rows){

      if(rows.length > 0) {

        res.send(rows);


      }
      else
      {
        res.send(null)
      }


  })
  .catch(function(error){

      console.log(error);
      res.send(false)
  });

});

router.put('/', function(req, res, next) {

  var id = req.body.id;


  if(id){

    knex('registro')
      .insert({id: '', registro: id})
      .then(function(a,b){
        
        if(a){
          res.send(true);
        }else{
          res.send(false);
        }
        
        
      });
  }

  

});


module.exports = router;
