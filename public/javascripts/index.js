$(function(){


    $("#buscar").click(function(){

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



});

function agregar(id){

    $.ajax({
        method: 'PUT',
        url: 'registros',
        data: {id: id},
        success: function(data){
            console.log(data)
        }
    });

}