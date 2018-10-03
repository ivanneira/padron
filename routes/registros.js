var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('registros');
});

router.get('/registros', function(req, res, next) {

  knex
    .select('padron.id','registro','encuestador','planilla','timestamp', 'estado', 'Sexo', 'Ejemplar', 'Vencimiento','Emision', 'Apellido', 'Nombre', 'Nacimiento', 'Fallecimiento')
    .from('registro')
    .leftJoin('padron', 'registro.registro', 'padron.id')
    .then(function(d,e){

      if(e){
        console.log(e)
        res.send(false)
      }else if(d){
        //console.log({data: d})
        formatData(res,d);
      }else{
        res.send(false)
      }

    });

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
      //console.log(queryObject[index])

      if(index == 'Nacimiento'){

        queryString += index + ' = DATE(\''  + queryObject[index] + 'T03:00:00.000Z\') OR\n' ;
      }else{
        queryString += index +' LIKE \'%' + queryObject[index] + '%\' AND\n';
      }

      

    }

    queryString = queryString.slice(0, queryString.length-4);

    //console.log(queryString)

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

  console.log(req.body)


  if(req.body){

    var idRegistro = req.body.registro;

    if(idRegistro){

      knex
        .select()
        .from('registro')
        .where('registro', idRegistro)
        .then(function(d,e){

          console.log(d)
          //console.log(idRegistro)
          
          if(e){
            res.send(false)
          }

          if(d == ''){

                knex('registro')
                  .insert(
                    {
                      registro: req.body.registro, 
                      timestamp: req.body.timestamp, 
                      planilla: req.body.planilla,
                      encuestador: req.body.encuestador,
                      estado: req.body.estado
                    })
                  .then(function(a,b){

                    console.log(a,b)
                    
                    if(a){
                      res.send(true);
                    }else{
                      res.send(false);
                    }
                    
                    
                  });


          }else{

            res.send('exist');

          }

        })

    }
/*
    knex('registro')
      .insert(
        {
          registro: req.body.registro, 
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

      */

      //res.send(true)
  }


});

function formatData(res,data){

    var data2send = {
        "data": []
    };

    for(var index in data){


        data2send.data.push({
            "id": data[index].id,
            "registro": data[index].registro,
            "encuestador": data[index].encuestador,
            "planilla": data[index].planilla,
            "timestamp": data[index].timestamp,
            "estado": data[index].estado,
            "Sexo": data[index].Sexo,
            "Sexo": data[index].Sexo,
            "Ejemplar": data[index].Ejemplar,
            "Vencimiento": data[index].registro,
            "Emision": data[index].encuestador,
            "Apellido": data[index].planilla,
            "Nombre": data[index].timestamp,
            "Nacimiento": data[index].estado,
            "Fallecimiento": data[index].Sexo,

        });
    }

    res.send(data2send);

}



module.exports = router;
