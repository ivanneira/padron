var express = require('express');
var router = express.Router();
var excel = require('excel4node');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('exportar');
});

router.get('/excel', function(req, res, next) {

    console.log(1)

    var workbook = new excel.Workbook();
    var wsPlanillas = workbook.addWorksheet('planillas');
    var wsEncuestas = workbook.addWorksheet('encuestas');
    var wsRegistros = workbook.addWorksheet('registros');

    var estiloFecha = workbook.createStyle({
        numberFormat: 'd/m/yy'
    });

    var estiloBold = workbook.createStyle({
        font: {
            bold: true
        }
    });

    var estiloCentrado = workbook.createStyle({
        alignment: {
            horizontal: 'center'
        }
    });

    function notnull(data){

        return data ? data : 'sin datos';
    }

    console.log(2)

    knex
    .select(
        'padron.id',
        'registro',
        'encuestador',
        'planilla',
        'timestamp', 
        'estado' ,
        'Dni', 
        'Sexo', 
        'Ejemplar', 
        'Vencimiento',
        'Emision', 
        'Apellido', 
        'Nombre', 
        'Nacimiento', 
        'Fallecimiento', 

        'Cuil', 
        'Calle',
        'Numero',
        'Piso',
        'Departamento',
        'Cpostal',
        'Barrio',
        'Monoblock',
        'Ciudad',
        'Municipio',
        'Provincia',
        'Pais',
        'comentario'
        )
    .from('registro')
    .leftJoin('padron', 'registro.registro', 'padron.id')
    .then(function(row,e){
        console.log(3)
      if(e){
        console.log(e)
        res.send(false)
      }else if(row){

        wsPlanillas.cell(1,1).string("registro").style(estiloBold);
        wsPlanillas.cell(1,2).string("encuestador").style(estiloBold);
        wsPlanillas.cell(1,3).string("planilla").style(estiloBold);
        wsPlanillas.cell(1,4).string("estado").style(estiloBold);
        wsPlanillas.cell(1,5).string("Dni").style(estiloBold);
        wsPlanillas.cell(1,6).string("Sexo").style(estiloBold);
        wsPlanillas.cell(1,7).string("Ejemplar").style(estiloBold);
        wsPlanillas.cell(1,8).string("Vencimiento").style(estiloBold);
        wsPlanillas.cell(1,9).string("Emision").style(estiloBold);
        wsPlanillas.cell(1,10).string("Apellido").style(estiloBold);
        wsPlanillas.cell(1,11).string("Nombre").style(estiloBold);
        wsPlanillas.cell(1,12).string("Nacimiento").style(estiloBold);
        wsPlanillas.cell(1,13).string("Fallecimiento").style(estiloBold);
        wsPlanillas.cell(1,14).string("Cuil").style(estiloBold);
        wsPlanillas.cell(1,15).string("Calle").style(estiloBold);
        wsPlanillas.cell(1,16).string("Numero").style(estiloBold);
        wsPlanillas.cell(1,17).string("Piso").style(estiloBold);
        wsPlanillas.cell(1,18).string("Departamento").style(estiloBold);
        wsPlanillas.cell(1,19).string("Cpostal").style(estiloBold);
        wsPlanillas.cell(1,20).string("Barrio").style(estiloBold);
        wsPlanillas.cell(1,21).string("Monoblock").style(estiloBold);
        wsPlanillas.cell(1,22).string("Ciudad").style(estiloBold);
        wsPlanillas.cell(1,23).string("Municipio").style(estiloBold);
        wsPlanillas.cell(1,24).string("Provincia").style(estiloBold);
        wsPlanillas.cell(1,25).string("Pais").style(estiloBold);
        wsPlanillas.cell(1,26).string("comentario").style(estiloBold);

        var filecounter = 2;

        for(var index in row){

            wsPlanillas.cell(filecounter,1).number(row[index].registro).style(estiloCentrado);
            wsPlanillas.cell(filecounter,2).string(row[index].encuestador).style(estiloCentrado);
            wsPlanillas.cell(filecounter,3).number(row[index].planilla).style(estiloCentrado);
            wsPlanillas.cell(filecounter,4).string(row[index].estado).style(estiloCentrado);
            wsPlanillas.cell(filecounter,5).string(row[index].Dni).style(estiloCentrado);
            wsPlanillas.cell(filecounter,6).string(row[index].Sexo);
            wsPlanillas.cell(filecounter,7).string(row[index].Ejemplar).style(estiloCentrado);
            wsPlanillas.cell(filecounter,8).date(new Date(row[index].Vencimiento)).style(estiloCentrado).style(estiloFecha);
            wsPlanillas.cell(filecounter,9).date(new Date(row[index].Emision)).style(estiloCentrado).style(estiloFecha);
            wsPlanillas.cell(filecounter,10).string(row[index].Apellido);
            wsPlanillas.cell(filecounter,11).string(row[index].Nombre);
            wsPlanillas.cell(filecounter,12).date(new Date(row[index].Nacimiento)).style(estiloCentrado).style(estiloFecha);
            wsPlanillas.cell(filecounter,13).string(row[index].Fallecimiento.toString()).style(estiloCentrado);
            wsPlanillas.cell(filecounter,14).string(row[index].Cuil);
            wsPlanillas.cell(filecounter,15).string(row[index].Calle);
            wsPlanillas.cell(filecounter,16).string(row[index].Numero);
            wsPlanillas.cell(filecounter,17).string(row[index].Piso);
            wsPlanillas.cell(filecounter,18).string(row[index].Departamento);
            wsPlanillas.cell(filecounter,19).string(row[index].Cpostal);
            wsPlanillas.cell(filecounter,20).string(row[index].Barrio);
            wsPlanillas.cell(filecounter,21).string(row[index].Monoblock);
            wsPlanillas.cell(filecounter,22).string(row[index].Ciudad);
            wsPlanillas.cell(filecounter,23).string(row[index].Municipio);
            wsPlanillas.cell(filecounter,24).string(row[index].Provincia);
            wsPlanillas.cell(filecounter,25).string(row[index].Pais);
            wsPlanillas.cell(filecounter,26).string(row[index].comentario);


            filecounter++;
        }

        wsPlanillas.column(1).setWidth(18);
        wsPlanillas.column(2).setWidth(18);
        wsPlanillas.column(3).setWidth(18);
        wsPlanillas.column(4).setWidth(18);
        wsPlanillas.column(5).setWidth(18);
        wsPlanillas.column(6).setWidth(18);
        wsPlanillas.column(7).setWidth(18);
        wsPlanillas.column(8).setWidth(18);
        wsPlanillas.column(9).setWidth(18);
        wsPlanillas.column(10).setWidth(18);
        wsPlanillas.column(11).setWidth(18);
        wsPlanillas.column(12).setWidth(18);
        wsPlanillas.column(13).setWidth(18);
        wsPlanillas.column(14).setWidth(18);



        workbook.write('listado.xlsx',res);

      }else{
        res.send(false)
      }

    });
  });


module.exports = router;
