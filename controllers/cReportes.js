//requerimientos de modelo
mItems = require('../models/mItems');
mParteDiario1 = require('../models/mParteDiario1');
mParteDiario2 = require('../models/mParteDiario2');

var async = require('async');
var mysql = require('mysql');

module.exports = {
	getInicio: getInicio,
	postInicio: postInicio
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getInicio(req, res){
	res.render('reportesinicio', {
		pagename: 'Elija el tipo de reporte'
	});
}

function postInicio(req, res){
	params = req.body;
	tiporeporte = params.tiporeporte;
	fechadesde = params.fechadesde;
	fechahasta = params.fechahasta;

	fecha_desde = changeDate(fechadesde);
	fecha_hasta = changeDate(fechahasta);

	if (tiporeporte == 1){
	//render reporte para items
		
		mParteDiario1.getSP_ItemsEntreFechas(fecha_desde, fecha_hasta, function (items){
			cantidad = items[0].length;
			res.render("reportesitems", {
				pagename: "Reporte de items",
				items: items[0],
				fechadesde: fechadesde,
				fechahasta: fechahasta,
				cantidad: cantidad
			});
		});
	} else if (tiporeporte == 2){
	//render reporte para empleados
	}else{
		//error
	}
}