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

function sumarUno(iditem, aItems, aItemsCant){
	var indice = 0;
	if (aItems.length == aItemsCant.length){
		for (x = 0 ; x < aItems.length ; x++){
			if (aItems[x] == iditem){
				aItemsCant[x] = aItemsCant[x] + 1;
				break;
			}
		}
	}


}

function postInicio(req, res){
	params = req.body;
	tiporeporte = params.tiporeporte;
	fechadesde = params.fechadesde;
	fechahasta = params.fechahasta;

	fechadesde = changeDate(fechadesde);
	fechahasta = changeDate(fechahasta);

	// var connection = mysql.createConnection({
	//     user: 'root',
	//     password: '',
	//     host: '127.0.0.1',
	//     port: '3306',
	//     database: 'Maresa',
	//     dateStrings : true
	//  });

	// connection.connect();


	if (tiporeporte == 1){
	//render reporte para items
		var partesDiarios = [];

		mParteDiario1.getEntreFechas(fechadesde, fechahasta, function (datos){
			//console.log(datos)
	      	res.render("reportesitems", {
				datosItems: datos
			});
		});
	} else if (tiporeporte == 2){
	//render reporte para empleados
	}else{
		//error
	}
}