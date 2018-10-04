$(function(){

    $('#busquedaNacimiento').datepicker({
        format: "yyyy-mm-dd",
        startView: 3,
        clearBtn: true,
        language: "es",
        autoclose: true
    });

    $('.busquedas').keypress(function(e) {
        if(e.which == 13) {
            $("#buscar").click();
        }
    });


    $("#buscar").click(function(){

        var queryObject = {};

        var fields = ['Dni','Sexo','Nombre','Apellido','Nacimiento','Calle','Numero','Monoblock','Ciudad','Municipio','Barrio','ID'];

        //console.log(fields)
        for(var index in fields){

            var selector = $('#busqueda'+fields[index])
            var field = fields[index];

            //console.log(field)

            if(selector.val() != ''){

                queryObject[field] = selector.val();
            }

        }

        //queryObject.timestamp = Date.now();

        alertModal('buscando datos...');

        $.post('registros',{q: queryObject}, function(data){

            //console.log(data)
            $('.modal').modal('hide');

            if(data){
                $('#filas').empty()

                for(var index in data){

                    var htmlString = 
                    '<tr>' +
                    '   <td><button class="btn btn-success fila" data-id="' + data[index].ID + '" type="button">Agregar</button></td>' +
                    '   <td>' + data[index].ID + '</td>' +
                    '   <td>' + data[index].Dni + '</td>' +
                    '   <td>' + data[index].Sexo + '</td>' +
                    '   <td>' + data[index].Nombre + '</td>' +
                    '   <td>' + data[index].Apellido + '</td>' +
                    '   <td>' + data[index].Nacimiento.substring(data[index].Nacimiento.length-14,-1) + '</td>' +
                    '   <td>' + data[index].Calle + '</td>' +
                    '   <td>' + data[index].Numero + '</td>' +
                    '   <td>' + data[index].Monoblock + '</td>' +
                    '   <td>' + data[index].Ciudad + '</td>' +
                    '   <td>' + data[index].Municipio + '</td>' +
                    '   <td>' + data[index].Barrio + '</td>' +


                    '</tr>';

                    $('#filas').append(htmlString);
                }

            }else{

                $('#filas').empty().append('<tr><td>Sin resultados</td></tr>')
            }

            $(".fila").unbind('click').click(function(){

                agregar($(this).data('id'))
            });

        });


        //console.log(queryObject)

    });

    /*

        if($("#busqueda").val().trim() != ''){
            $.ajax({
                method: 'POST',
                url: 'registros',
                data: {query: $("#busqueda").val()},
                success: function(data){
    
                    if(data){
                        $('#filas').empty()
    
                        for(var index in data){
    
                            $('#filas').append('<tr><td>'+ data[index].nombre + ' ' + data[index].apellido +'</td><td>'+ data[index].dni +'</td><td><button class="btn btn-success fila" data-id="' + data[index].id + '" type="button">Agregar</button></td></tr>')
                        }
    
                    }else{
    
                        $('#filas').empty().append('<tr><td>Sin resultados</td></tr>')
                    }

                    $(".fila").unbind('click').click(function(){

                        agregar($(this).data('id'))
                    });
                },
                error: function(e){
                    console.log(e)
                }
            });

        }

    });
*/


});

function agregar(id){


    var htmlString = 
        '<input type="number" class="agregados form-control" id="planilla" placeholder="número de planilla"><br/>' +
        '<input type="number" class="agregados form-control" id="encuestador" placeholder="número de encuestador"><br/>' +
        '<select class="agregados form-control" id="estado">' +
        '    <option value="reempadronado">reempadronado</option>' +
        '    <option value="visitado sin reempadronar">Visitado sin reempadronar</option>' +
        '    <option value="otro">Otro</option>' +        
        '</select><br/>' +
        '<div class="form-group">' +
        '    <label for="comentario">comentario opcional</label>' +
        '    <textarea class="form-control" id="comentario" rows="3"></textarea>' +
        '</div>';



    $('.modal-title').text("Guardar registro ID:" + id)
    $(".modal-body").empty().append(htmlString);
    $(".modal-footer").empty().append('<button id="enviardatos" class="btn btn-success btn-block">Agregar</button>')

    $('.modal').modal('show')

    $('.agregados').unbind('keypress').keypress(function(e) {
        if(e.which == 13) {
            $("#enviardatos").click();
        }
    });

    $('#enviardatos').click(function(){

        var planilla = $('#planilla').val();
        var encuestador = $('#encuestador').val()
        var estado = $('#estado').val();
        var comentario = $('#comentario').val()

        if( planilla != '' || encuestador != ''){

            alertModal('intentado guardar el registro...');

            $.ajax({
                method: 'PUT',
                url: 'registros',
                data: {registro: id, timestamp: Date.now(), planilla:planilla, encuestador: encuestador, estado: estado, comentario: comentario},
                success: function(data){
        
                    //console.log(data)
        
                    $('.modal').modal('hide');
        
                    if(data){
        
                        if(data === 'exist'){
        
                            alertModal("El registro ya está guardado!")
                        }else{
                            //console.log(data)
                            alertModal("El registro se guardó correctamente")
        
                        }
        
                    }else{
        
                        alertModal("hubo un error"); 
                    }
                }
            });

        }else{

            alert("faltan datos");
        }
    });

    /*

*/
}

function alertModal(message){

    $('.modal-title')
        .text("Atención");

    $('.modal-body')
        .empty()
        .append(message);

    $('.modal-footer')
        .empty()
        .append('<button type="button" class="btn btn-secondary" data-dismiss="modal">cerrar</button>');

    $(".modal").modal('show');
}