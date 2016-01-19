//requiriendo modelo mensaje.js:
var mRandom = require('../models/mRandom');
var mysql = require('mysql');
var async = require('async');

module.exports = {
	getRandom: getRandom,
	updateRepuestosConIdRubroFk: updateRepuestosConIdRubroFk,
	updateTablaVehiculosConFive: updateTablaVehiculosConFive
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