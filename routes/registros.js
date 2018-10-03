var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('registros');
});


router.post('/', function(req, res, next) {
 
  var query = req.body;

  //console.log(query)

  var queryObject = {};

  //console.log(Object.keys(query).length)

  if(Object.keys(query).length < 1){

    res.send('false');
  }else{

    for(var index in query){

      //console.log(index)
      //console.log(query[index])
      var realindex = index.substring(2, index.lenght);
      //console.log(realindex)
      realindex = realindex.slice(0, realindex.length-1);
      //console.log(realindex)

      if(typeof(query[index]) !== 'undefined'){

        if(query[index] != ''){

          queryObject[realindex] = query[index];
        }
      }
      
    }

    //console.log(queryObject)

    
    var queryString = 'SELECT * FROM padron WHERE\n';

    for(var index in queryObject){

      //console.log(index)
      console.log(queryObject[index])

      if(index == 'Nacimiento'){

        queryString += index + ' = DATE(\''  + queryObject[index] + 'T03:00:00.000Z\') OR\n' ;
      }else{
        queryString += index +' LIKE \'%' + queryObject[index] + '%\' AND\n';
      }

      

    }

    queryString = queryString.slice(0, queryString.length-4);

    console.log(queryString)

    knex.raw(queryString)
    .then(function(response){

        //console.log(response)
        res.send(response[0])
    });


  }

  //res.send(true);






/*
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
  */

});

router.put('/', function(req, res, next) {

  //console.log(registro)


  if(req.body){

    knex('registro')
      .insert(
        {
          id: '', registro: req.body.registro, 
          timestamp: req.body.timestamp, 
          planilla: req.body.planilla,
          encuestador: req.body.encuestador,
          estado: req.body.estado
        })
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
