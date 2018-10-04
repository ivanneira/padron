$(function(){

    $('.modal-title').text('cargando datos ...');
    $('.modal').modal('show');

	var datatable = $('.datatable').DataTable({
        select: 'single',
        "processing": true,
        "responsive": "single",
        "lengthMenu": [ 20, 50, 100 ],
        "ajax": "/registros/registros",
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        "createdRow": function( row, data, dataIndex){

            //console.log(data)
            if( data.estado ==  `reempadronado`){
                $(row).addClass('verde');
            }else if(data.estado == 'visitado sin reempadronar'){
                $(row).addClass('rojo');
            }
        },
		"columns": [
            {"data": "id"},
            {"data": "registro"},
            {"data": "encuestador"},
            {"data": "planilla"},
            {"data": "estado"},
            {"data": "timestamp"},
            {"data": "Dni"},
            {"data": "Sexo"},
            {"data": "Ejemplar"},
            {"data": "Vencimiento"},
            {"data": "Emision"},
            {"data": "Apellido"},
            {"data": "Nombre"},
            {"data": "Nacimiento"},
            {"data": "Fallecimiento"},
            {"data": "comentario"}
        ],
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 5 ],
                "visible": false
            },
            {
                "targets": [ 8 ],
                "visible": false
            }
        ],
    ).on('xhr', function () {
        $('.modal').modal('hide');
    })
    .on('select', function(e,dt,type,indexes){
        editModal(dt.data(),datatable);

    });

});

function editModal(data,datatable){

    console.log(data)
    $(".modal-title").text('Editar');

    var htmlString = 
        '<label for="edicionplanilla">Planilla</label>' +
        '<input type="number" class="edicion form-control" id="edicionplanilla" placeholder="número de planilla">' +
        '<label for="edicionencuestador">Encuestador</label>' +
        '<input type="number" class="edicion form-control" id="edicionencuestador" placeholder="número de encuestador">' +
        '<label for="edicionestado">Estado</label>' +
        '<select class="edicion form-control" id="edicionestado">' +
        '    <option value="reempadronado">reempadronado</option>' +
        '    <option value="visitado sin reempadronar">Visitado sin reempadronar</option>' +
        '    <option value="otro">Otro</option>' +        
        '</select><br/>' +
        '<div class="form-group">' +
        '    <label for="comentario">comentario</label>' +
        '    <textarea class="form-control" id="edicioncomentario" rows="3"></textarea>' +
        '</div>';

    $('.modal-body').empty().append(htmlString);

    $('.modal-footer').empty().append(
        '<button id="borrar" class="btn btn-danger">BORRAR</button>' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">cancelar</button>' +
        '<button id="editarDatos" class="btn btn-success">editar</button>'
        );



    $('#edicionplanilla').val(data.planilla);
    $('#edicionencuestador').val(data.encuestador);
    $('#edicionestado').val(data.estado);
    $('#edicioncomentario').text(data.comentario);

    $('#editarDatos').unbind('click').click(function(){

        var registro = data.registro;
        var timestamp = data.timestamp;
        var planilla = $('#edicionplanilla').val();
        var encuestador = $('#edicionencuestador').val();
        var estado = $('#edicionestado').val();
        var comentario = $('#edicioncomentario').val();

        $.ajax({
            method: 'PATCH',
            url: 'registros',
            data: {registro: registro, planilla: planilla, encuestador: encuestador, estado: estado, comentario: comentario, timestamp: timestamp},
            success: function(data){
                //console.log(data);
                datatable.ajax.reload();

                if(!data){

                    $(".modal-title").text('ERROR');
                    $(".modal-body").empty().append('No se pudieron guardar los datos, intente nuevamente');
                    $(".modal-footer").empty();


                }else if(typeof(data) == null){
                    $(".modal-title").text('ERROR');
                    $(".modal-body").empty().append('No se pudieron guardar los datos, intente nuevamente');
                    $(".modal-footer").empty();

                }else{
            


                    $(".modal-title").text('Correcto');
                    $(".modal-body").empty().append('Se editó el registro');
                    $(".modal-footer").empty();

                }

            }
        })

    });

    $('.edicion').unbind('keypress').keypress(function(e) {
        if(e.which == 13) {
            $("#editarDatos").click();
        }
    });

    $('#borrar').unbind('click').click(function(){

        var registro = data.registro;

        $.ajax({
            method: 'DELETE',
            url: 'registros',
            data: {registro: registro},
            success: function(data){
                //console.log(data);
                datatable.ajax.reload();
            }
        })
    });

    $('.modal').modal('show');


    $('#edicionplanilla').focus();
}