//requiriendo modelo mensaje.js:
var mRandom = require('../models/mRandom');
var mysql = require('mysql');
var async = require('async');

module.exports = {
	getRandom: getRandom,
	updateRepuestosConIdRubroFk: updateRepuestosConIdRubroFk,
	updateTablaVehiculosConFive: updateTablaVehiculosConFive,
	updateTablaSecrConOperariosTemp: updateTablaSecrConOperariosTemp,
	updateOtrosGastos: updateOtrosGastos
}

function getRandom(req, res){
	res.render('random', {
		pagename: 'Seccion Interna para los Programadores',
	});
}

function updateRepuestosConIdRubroFk(req, res){

	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	// connection.connect();


	mRandom.getAllRepuestos(function (repuestos){
		mRandom.getAllRubros(function (rubros){

			connection.connect();

			async.eachSeries(repuestos, function (rep, callback) {
				var i = repuestos.indexOf(rep);
				if(i == '100')
					console.log("100 !")
				if(i == '500')
					console.log("500 !!")
				if(i == '1000')
					console.log("1000 !!")
				if(i == '1500')
					console.log("1500 !!!")
				if(i == '2000')
					console.log("2000 !!!!")

				for (var x = 0; x < rubros.length; x++) {
					codigodelrepuesto = rep.codigo.substring(0, 4);
					if (codigodelrepuesto == rubros[x].codigo) {
						var query = "update repuestos set repuestos.id_rubro_fk = "+rubros[x].id+" where repuestos.id = "+rep.id;
						connection.query(query, function(err, rows, fields) {
							if (err) {
								throw err;
						    	console.log(err);

							}else{
								// cb(rows);
								//console.log("updated !");
								
							}
						    // console.log(rows)
						    // console.log(fields)						    
						});
						callback();
						break;						
					}else{
						
					}
				}
				//console.log(i);
			}, function (err) {
				//Esta parte se sejecuta cuando termina de recorrer el array
				// acomode la funcion "callback" de Async, ya que sino nos queda el callback
				// de 	mFichadas.MySqlInsert dando vueltas
				console.log(i)
				if (err) { 
					throw err; 
				}else{
					res.send("finished");
				connection.end();
				return cb();
				}				
			});						
		});
	});	
}

function updateTablaVehiculosConFive(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getVehiculos(function (vehiculos){
		mRandom.getFive(function (five_temp){
			async.eachSeries(vehiculos, function (vehi, callback) {
				for (var i = 0; i < five_temp.length; i++) {
					if (five_temp[i].nro_coche == vehi.numero ){
						//actualizar
						var nro_coche = five_temp[i].nro_coche;
						var chasis = five_temp[i].chasis;
						var chasis_fecha = five_temp[i].chasis_fecha;
						var chasis_dlls = five_temp[i].chasis_dlls;
						var chasis_pesos = five_temp[i].chasis_pesos;
						var carro = five_temp[i].carro;
						var carro_fecha = five_temp[i].carro_fecha;
						var carro_dlls = five_temp[i].carro_dlls;
						var carro_pesos = five_temp[i].carro_pesos;

						query = "UPDATE `vehiculos` SET chasis='"+chasis+"', chasis_fecha='"+chasis_fecha+"', chasis_dlls="+chasis_dlls+", chasis_pesos = "+chasis_pesos+", carro ='"+carro+"', carro_fecha ='"+carro_fecha+"', carro_dlls ="+carro_dlls+", carro_pesos ="+carro_pesos+" WHERE numero ="+nro_coche;
						connection.query(query, function(err, rows, fields) {
							if (err) {
								throw err;
						    	console.log(err);

							}else{
								// cb(rows);
								callback();
								console.log(query);
								console.log("updated !");
							}					    
						});
					}else{
						//next
					}
				};
			}, function (err) {
				if (err) { 
					throw err; 
				}else{
					res.send("finished");
					connection.end();
					return cb();
				}				
			});		
		});
	});		
}

function updateTablaSecrConOperariosTemp(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getOperariosTemp(function (ops){
		console.log("inside");
		console.log(ops.length);

		async.eachSeries(ops, function (op, callback) {
			var legajo = op.legajo;
			var nombre = op.nombre;

			query = "INSERT INTO secr(unica, usuario, clave, alta, baja, activa) VALUES("+legajo+",'"+nombre+"', '"+legajo+"', '2016-01-07', '2100-01-01', 1)"
			connection.query(query, function (err, rows, fields) {
				if (err) {
					throw err;
			    	console.log(err);
				}else{
					// cb(rows);
					callback();
					console.log(query);
					console.log("updated !");
				}					    
			});
		}, function (err) {
			if (err) { 
				throw err; 
			}else{
				res.send("finished");
				connection.end();
				// return cb();
			}				
		});
	});
}

function updateOtrosGastos(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Evhsa',
	    dateStrings : true
 	});

	connection.connect();

	mRandom.getOtrosGastos_Temp(function (otrosgastos_temp){
		console.log(otrosgastos_temp.length);

		async.eachSeries(otrosgastos_temp, function (ot_temp, callback) {
			var temp_fecha = ot_temp.fecha;
			var temp_descripcion = ot_temp.descripcion;
			var temp_cantidad = ot_temp.cantidad;
			var temp_destino = ot_temp.destino;
			var temp_coche = ot_temp.coche;
			var temp_total = ot_temp.total;
			var temp_operario = ot_temp.operario;
			var temp_memo = ot_temp.memo;
			var temp_empresa = ot_temp.empresa;

			var id_usuario_fk = 0;

			switch(temp_operario) {
			    case '169':
			    	id_usuario_fk = 169;
			        break;
			    case '182':
			    	id_usuario_fk = 182;
			        break;
			    case '189':
			    	id_usuario_fk = 189;
			        break;
			    case '333':
			    	id_usuario_fk = 333;
			        break;
			    case '363':
			    	id_usuario_fk = 363;
			        break;
			    case '9':
			    	id_usuario_fk = 9;
			        break;
			    case '99':
			    	id_usuario_fk = 99;
			        break;
			    // default:
			    // 	id_usuario_fk = 0;
			}

			query = "INSERT INTO otrosgastos(`fecha`, `descripcion`, `cantidad`, `id_destino_fk`, `id_vehiculo_fk`, `total`, `id_usuario_fk`, `memo`, `empresa`) VALUES('"+temp_fecha+"','"+temp_descripcion+"', "+temp_cantidad+", "+temp_destino+", "+temp_coche+", "+temp_total+", "+id_usuario_fk+", '"+temp_memo+"', '"+temp_empresa+"')"
			connection.query(query, function (err, rows, fields) {
				if (err) {
					throw err;
			    	console.log(err);
				}else{
					// cb(rows);					
					console.log(query);
					console.log("updated !");
					callback();
				}					    
			});

		}, function (err) {
			if (err) { 
				throw err; 
			}else{
				res.send("finished");
				connection.end();
				// return cb();
			}				
		});
	});

}