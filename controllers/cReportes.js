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
	getItemsExport: getItemsExport,
	getEmplesExport: getEmplesExport
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
		mEmple.getSP_EmplesEntreFechas(fecha_desde, fecha_hasta, function (emples){
			console.log(emples.length)
			cantidad = emples[0].length;
			res.render("reportesemple", {
				pagename: "Reporte de Empleados",
				emples: emples[0],
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
			conf.stylesXmlFile = "C:/Users/leandro/Documents/Maresa-master/style.xml";
				//conf.stylesXmlFile = "C:/Users/Administrador/Documents/Proyectos/Maresa/style.xml";
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

function getEmplesExport(req, res){
	console.log("go!")
	//var cellData = "Give me something to believe";
	params = req.params;
	fecha_desde = params.desde;
	fecha_hasta = params.hasta;

	mEmple.getSP_EmplesEntreFechas(fecha_desde, fecha_hasta, function (emples){
		//console.log(emples[0])
		emples = emples[0];
		//console.log(items)
		var conf = {};
			//este tiene una url acá pero en el server es otra....
			conf.stylesXmlFile = "C:/Users/leandro/Documents/Maresa-master/style.xml";
				//conf.stylesXmlFile = "C:/Users/Administrador/Documents/Proyectos/Maresa/style.xml";
		/*<td style="text-align: center;">{{ e.legajo }}</td>
		<td style="text-align: center;">{{ e.empletxt }}</td>
		<td style="text-align: center;">{{ e.sectortxt }}</td>
		<td style="text-align: center;">{{ e.categoriatxt }}</td>
		<td style="text-align: center;">{{ e.hrs_normales }}</td>
		<td style="text-align: center;">{{ e.hrs_al50 }}</td>
		<td style="text-align: center;">{{ e.hrs_al100 }}</td>
		<td style="text-align: center;">{{ e.hrs_feriado_trabajado }}</td>
		<td style="text-align: center;">{{ e.hrs_feriado_no_trabajado }}</td>
		<td style="text-align: center;">{{ e.calorias_n }}</td>
		<td style="text-align: center;">{{ e.calorias_50 }}</td>
		<td style="text-align: center;">{{ e.calorias_100 }}</td>
		<td style="text-align: center;">{{ e.calorias_fer }}</td>
		<td style="text-align: center;">{{ e.peligrosas_n }}</td>
		<td style="text-align: center;">{{ e.peligrosas_50 }}</td>
		<td style="text-align: center;">{{ e.peligrosas_100 }}</td>
		<td style="text-align: center;">{{ e.peligrosas_fer }}</td>
		<td style="text-align: center;">{{ e.polucion_n }}</td>
		<td style="text-align: center;">{{ e.polucion_50 }}</td>
		<td style="text-align: center;">{{ e.polucion_100 }}</td>
		<td style="text-align: center;">{{ e.polucion_fer }}</td>
		<td style="text-align: center;">{{ e.termo_n }}</td>
		<td style="text-align: center;">{{ e.termo_50 }}</td>
		<td style="text-align: center;">{{ e.termo_100 }}</td>
		<td style="text-align: center;">{{ e.termo_fer }}</td>
		<td style="text-align: center;">{{ e.insalubres_n }}</td>
		<td style="text-align: center;">{{ e.insalubres_50 }}</td>
		<td style="text-align: center;">{{ e.insalubres_100 }}</td>
		<td style="text-align: center;">{{ e.insalubres_fer }}</td>
		<td style="text-align: center;">{{ e.hrs_nocturnas_normales }}</td>				
		<td style="text-align: center;">{{ e.hrs_nocturnas_100 }}</td>
		<td style="text-align: center;">{{ e.hrs_nocturnas_feriado }}
		<td style="text-align: center;">{{ e.emergencias }}</td>
		<td style="text-align: center;">{{ e.hrs_reconocimiento }}</td>
		<td style="text-align: center;">{{ e.turnicidad }}</td>

		<th style="text-align: center;">F No T</th>
		<th style="text-align: center;">Ausentimos</th>
		<th style="text-align: center;">compensatorios</th>
		<th style="text-align: center;">hrs capacitacion</th>
		<th style="text-align: center;">emergencias</th>
		<th style="text-align: center;">hrs donacion sangre/th>
		<th style="text-align: center;">hrs familiar enfermo</th>
		<th style="text-align: center;">hrs citacion judicial</th>
		<th style="text-align: center;">hrs lic fallecimiento</th>
		<th style="text-align: center;">hrs lic nacimiento</th>
		<th style="text-align: center;">hrs lic examen</th>
		<th style="text-align: center;">hrs lic accidente</th>
		<th style="text-align: center;">hrs lic mudanza</th>
		<th style="text-align: center;">hrs lic matrimonio</th>
		<th style="text-align: center;">hrs lic inundacion</th>
		<th style="text-align: center;">hrs examen medico</th>
		<th style="text-align: center;">enfermedades</th>
		<th style="text-align: center;">horas reconocimiento</th>
		<th style="text-align: center;">permiso gremial</th>
		<th style="text-align: center;">CAL N</th>*/
	    conf.cols = [{caption:'Legajo', type:'number'},
		    {caption:'Nombre', type:'string'},
		    {caption:'Sector', type:'string'},
		    {caption:'Categoria', type:'string'},
		    {caption:'Hrs Normales', type:'number'},
		    {caption:'Hrs al 50', type:'number'},
		    {caption:'Hrs al 100', type:'number'},
		    {caption:'Feriados Trabajado', type:'number'},
		    {caption:'Feriados No Trabajado', type:'number'},

		    {caption:'Ausentismos', type:'number'},
		    {caption:'Compensatorios', type:'number'},
		    {caption:'Hrs Capacitacion', type:'number'},
		    {caption:'Emergencias', type:'number'},
			{caption:'Hrs Donacion Sangre', type:'number'},
			{caption:'Hrs Familiar Enfermo', type:'number'},
			{caption:'Hrs Citacion Judicial', type:'number'},
			{caption:'Hrs Lic. Fallecimiento', type:'number'},
			{caption:'Hrs Lic. Nacimiento', type:'number'},
			{caption:'Hrs Lic. Examen', type:'number'},
			{caption:'Hrs Lic. Accidente', type:'number'},
			{caption:'Hrs Lic. Mudanza', type:'number'},
			{caption:'Hrs Lic. Matrimonio', type:'number'},
			{caption:'Hrs Lic. Inundacion', type:'number'},
			{caption:'Hrs Examen Medico', type:'number'},
			{caption:'Enfermedades', type:'number'},
			{caption:'Hrs Reconocimiento', type:'number'},
			{caption:'Permisos Gremiales', type:'number'},

		    {caption:'Hrs Calorias Normales', type:'number'},
		    {caption:'Hrs Calorias al 50', type:'number'},
		    {caption:'Hrs Calorias al 100', type:'number'},
		    {caption:'Hrs Calorias Feriado', type:'number'},
		    {caption:'Hrs Peligrosas Normales', type:'number'},
		    {caption:'Hrs Peligrosas al 50', type:'number'},
		    {caption:'Hrs Peligrosas al 100', type:'number'},
		    {caption:'Hrs Peligrosas Feriado', type:'number'},
		    {caption:'Hrs Polucion Normales', type:'number'},
		    {caption:'Hrs Polucion al 50', type:'number'},
		    {caption:'Hrs Polucion al 100', type:'number'},
		    {caption:'Hrs Polucion Feriado', type:'number'},
		    {caption:'Hrs Termo Normales', type:'number'},
		    {caption:'Hrs Termo al 50', type:'number'},
		    {caption:'Hrs Termo al 100', type:'number'},
		    {caption:'Hrs Termo Feriado', type:'number'},
		    {caption:'Hrs Insalubres Normales', type:'number'},
		    {caption:'Hrs Insalubres al 50', type:'number'},
		    {caption:'Hrs Insalubres al 100', type:'number'},
		    {caption:'Hrs Insalubres Feriado', type:'number'},
		    {caption:'Hrs Nocturnas Normales', type:'number'},
		    {caption:'Hrs Nocturnas al 100', type:'number'},
		    {caption:'Hrs Nocturnas Feriado', type:'number'},
		    {caption:'Hrs Emergencia', type:'number'},
		    {caption:'Hrs Rec. por Diagrama', type:'number'},
			{caption:'Turnicidad', type:'number'}];
	
		var arrEmples = [];

		for (var x = 0 ; x < emples.length ; x++){
	    	legajo = emples[x].legajo;
			empletxt = emples[x].empletxt;
			sectortxt = emples[x].sectortxt;
			categoriatxt = emples[x].categoriatxt;
			hrs_normales = emples[x].hrs_normales;
			hrs_al50 = emples[x].hrs_al50;
			hrs_al100 = emples[x].hrs_al100;
			hrs_feriado_trabajado = emples[x].hrs_feriado_trabajado;
			hrs_feriado_no_trabajado = emples[x].hrs_feriado_no_trabajado;

			ausentismo = emples[x].ausentismo;
			compensatorio = emples[x].compensatorio;
			capacitacion = emples[x].capacitacion;
			emergencias = emples[x].emergencias;
			donacion_sangre = emples[x].donacion_sangre;
			familiar_enfermo = emples[x].familiar_enfermo;
			citacion_judicial = emples[x].citacion_judicial;
			lic_fallecimiento = emples[x].lic_fallecimiento;
			lic_nacimiento = emples[x].lic_nacimiento;
			lic_examen = emples[x].lic_examen;
			lic_accidente = emples[x].lic_accidente;
			lic_mudanza = emples[x].lic_mudanza;
			lic_matrimonio = emples[x].lic_matrimonio;
			lic_inundacion = emples[x].lic_inundacion;
			examen_medico = emples[x].examen_medico;
			enfermedad = emples[x].enfermedad;
			horas_reconocimiento = emples[x].horas_reconocimiento;
			permiso_gremial = emples[x].permiso_gremial;

			calorias_n = emples[x].calorias_n;
			calorias_50 = emples[x].calorias_50;
			calorias_100 = emples[x].calorias_100;
			calorias_fer = emples[x].calorias_fer;
			peligrosas_n = emples[x].peligrosas_n;
			peligrosas_50 = emples[x].peligrosas_50;
			peligrosas_100 = emples[x].peligrosas_100;
			peligrosas_fer = emples[x].peligrosas_fer;
			polucion_n = emples[x].polucion_n;
			polucion_50 = emples[x].polucion_50;
			polucion_100 = emples[x].polucion_100;
			polucion_fer = emples[x].polucion_fer;
			termo_n = emples[x].termo_n;
			termo_50 = emples[x].termo_50;
			termo_100 = emples[x].termo_100;
			termo_fer = emples[x].termo_fer;
			insalubres_n = emples[x].insalubres_n;
			insalubres_50 = emples[x].insalubres_50;
			insalubres_100 = emples[x].insalubres_100;
			insalubres_fer = emples[x].insalubres_fer;
			hrs_nocturnas_normales = emples[x].hrs_nocturnas_normales;				
			hrs_nocturnas_100 = emples[x].hrs_nocturnas_100;
			hrs_nocturnas_feriado = emples[x].hrs_nocturnas_feriado;
			emergencias = emples[x].emergencias;
			hrs_reconocimiento = emples[x].hrs_reconocimiento;
			turnicidad = emples[x].turnicidad;
	    	
	    	var emples2 = [];

	    	emples2.push(legajo);
	    	emples2.push(empletxt);
	    	emples2.push(sectortxt);
	    	emples2.push(categoriatxt);
	    	emples2.push(hrs_normales);
	    	emples2.push(hrs_al50);
	    	emples2.push(hrs_al100);
	    	emples2.push(hrs_feriado_trabajado);
	    	emples2.push(hrs_feriado_no_trabajado);
	    	emples2.push(ausentismo);
	    	emples2.push(compensatorio);
	    	emples2.push(capacitacion);
	    	emples2.push(emergencias);
	    	emples2.push(donacion_sangre);
	    	emples2.push(familiar_enfermo);
	    	emples2.push(citacion_judicial);
	    	emples2.push(lic_fallecimiento);
	    	emples2.push(lic_nacimiento);
	    	emples2.push(lic_examen);
	    	emples2.push(lic_accidente);
	    	emples2.push(lic_mudanza);
	    	emples2.push(lic_matrimonio);
	    	emples2.push(lic_inundacion);
	    	emples2.push(examen_medico);
	    	emples2.push(enfermedad);
	    	emples2.push(horas_reconocimiento);
	    	emples2.push(permiso_gremial);
	    	emples2.push(calorias_n);
	    	emples2.push(calorias_50);
	    	emples2.push(calorias_100);
	    	emples2.push(calorias_fer);
	    	emples2.push(peligrosas_n);
	    	emples2.push(peligrosas_50);
	    	emples2.push(peligrosas_100);
	    	emples2.push(peligrosas_fer);
	    	emples2.push(polucion_n);
	    	emples2.push(polucion_50);
	    	emples2.push(polucion_100);
	    	emples2.push(polucion_fer);
	    	emples2.push(termo_n);
	    	emples2.push(termo_50);
	    	emples2.push(termo_100);
	    	emples2.push(termo_fer);
	    	emples2.push(insalubres_n);
	    	emples2.push(insalubres_50);
	    	emples2.push(insalubres_100);
	    	emples2.push(insalubres_fer);
	    	emples2.push(hrs_nocturnas_normales);
	    	emples2.push(hrs_nocturnas_100);
	    	emples2.push(hrs_nocturnas_feriado);
	    	emples2.push(emergencias);
	    	emples2.push(hrs_reconocimiento);
	    	emples2.push(turnicidad);

	    	arrEmples.push(emples2);
	    }

	   	conf.rows = arrEmples;
	    var result = nodeExcel.execute(conf);
	    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	    res.setHeader("Content-Disposition", "attachment; filename=" + "ReporteEmpleados.xlsx");
	    res.end(result, 'binary');
	});
	
    
    console.log("finished")
}