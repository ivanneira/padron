$(function(){

    $('#busquedaNacimiento').datepicker({
        format: "yyyy-mm-dd",
        startView: 3,
        clearBtn: true,
        language: "es",
        autoclose: true
    });

    $(document).keypress(function(e) {
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

        $.post('registros',{q: queryObject}, function(data){

            console.log(data)

            if(data){
                $('#filas').empty()

                for(var index in data){

                    var htmlString = 
                    '<tr>' +
                    '   <td><button class="btn btn-success fila" data-id="' + data[index].ID + '" type="button">Agregar</button></td>' +
                    '   <td>' + data[index].Dni + '</td>' +
                    '   <td>' + data[index].Sexo + '</td>' +
                    '   <td>' + data[index].Nombre + '</td>' +
                    '   <td>' + data[index].Apellido + '</td>' +
                    '   <td>' + data[index].Nacimiento + '</td>' +
                    '   <td>' + data[index].Calle + '</td>' +
                    '   <td>' + data[index].Numero + '</td>' +
                    '   <td>' + data[index].Monoblock + '</td>' +
                    '   <td>' + data[index].Ciudad + '</td>' +
                    '   <td>' + data[index].Municipio + '</td>' +
                    '   <td>' + data[index].Barrio + '</td>' +
                    '   <td>' + data[index].ID + '</td>' +

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


        console.log(queryObject)

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

    $.ajax({
        method: 'PUT',
        url: 'registros',
        data: {registro: id, timestamp: Date.now(), planilla: 1, encuestador: 1, estado: 'amarillo'},
        success: function(data){
            console.log(data)
        }
    });

}