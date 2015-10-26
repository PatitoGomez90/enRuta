//requerimientos de modelo
mItems = require('../models/mItems');
mParteDiario1 = require('../models/mParteDiario1');
mParteDiario2 = require('../models/mParteDiario2');
mEmple = require('../models/mEmple');

var async = require('async');
var mysql = require('mysql');
var nodeExcel = require('excel-export');

module.exports = {
	getInicio: getInicio,
	postInicio: postInicio,
	getItemsExport: getItemsExport
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
		mEmple.getReporteEmplesEntreFechas(fecha_desde, fecha_hasta, function (emples){
			console.log(emples.length)
			cantidad = emples.length;
			res.render("reportesemple", {
				pagename: "Reporte de Empleados",
				emples: emples,
				fechadesde: fechadesde,
				fechahasta: fechahasta,
				cantidad: cantidad
			});
		});
	}else{
		//error
	}
}

function getItemsExport(req, res){
	console.log("go!")
	//var cellData = "Give me something to believe";
	params = req.params;
	fecha_desde = params.desde;
	fecha_hasta = params.hasta;

	mParteDiario1.getSP_ItemsEntreFechas(fecha_desde, fecha_hasta, function (items){
		//console.log(items[0])
		items = items[0];
		//console.log(items)
		var conf = {};
			//este tiene una url acá pero en el server es otra....
				conf.stylesXmlFile = "C:/Users/Administrador/Documents/Proyectos/Maresa/style.xml";
		/*ITEM	
		DESCRIPCION	
		HS NORMALES	
		HS al 50	
		HS al 100	
		HS TOTALES*/
	    conf.cols = [{caption:'Item', type:'number'},
	    {caption:'Descripcion', type:'string'},
	    {caption:'Hrs Normales', type:'number'},
	    {caption:'Hrs al 50', type:'number'},
	    {caption:'Hrs al 100', type:'number'},
	    {caption:'Total', type:'number'}];
	
		var arrItems = [];

		for (var x = 0 ; x < items.length ; x++){
	    	item = items[x].itemnum;
	    	descripcion = items[x].itemtxt;
	    	normales = items[x].normal;
	    	hrs50 = items[x].Al50;
	    	hrs100 = items[x].Al100;
	    	hrstotales = items[x].Total;
	    	
	    	var items2 = [];

	    	items2.push(item);
	    	items2.push(descripcion);
	    	items2.push(normales);
	    	items2.push(hrs50);
	    	items2.push(hrs100);
	    	items2.push(hrstotales);

	    	arrItems.push(items2);
	    }

	   	conf.rows = arrItems;
	    var result = nodeExcel.execute(conf);
	    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	    res.setHeader("Content-Disposition", "attachment; filename=" + "ReporteItems.xlsx");
	    res.end(result, 'binary');
	});
	
    
    console.log("finished")
}