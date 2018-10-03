$(function(){


	$('.datatable').DataTable({
		select: 'single',
		"ajax": "/registros/registros",
		"columns": [
            {"data": "id"},
            {"data": "registro"},
            {"data": "encuestador"},
            {"data": "planilla"},
            {"data": "timestamp"},
            {"data": "estado"},
            {"data": "Sexo"},
            {"data": "Ejemplar"},
            {"data": "Vencimiento"},
            {"data": "Emision"},
            {"data": "Apellido"},
            {"data": "Nombre"},
            {"data": "Nacimiento"},
            {"data": "Fallecimiento"}
        ]
	});
});