//requiriendo modelo mensaje.js:
var mRandom = require('../models/mRandom');
var mysql = require('mysql');
var async = require('async');

module.exports = {
	getRandom: getRandom,
	updateRepuestosConIdRubroFk: updateRepuestosConIdRubroFk
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

			// for (var i = 0; i < repuestos.length; i++) {
			// 	if(i == 100)
			// 		console.log("100")
			// 	if(i == 500)
			// 		console.log("500")
			// 	if(i == 1000)
			// 		console.log("1000")
			// 	if(i == 1500)
			// 		console.log("1500")
			// 	if(i == 2000)
			// 		console.log("2000")
			// 	for (var x = 0; x < rubros.length; x++) {
			// 							codigodelrepuesto = repuestos[i].codigo.substring(0, 4);
			// 		if (codigodelrepuesto == rubros[x].codigo) {
			// 			var query = "update repuestos set repuesto.id_rubro_fk = "+rubros[x].id+" where repuesto.id = "+repuestos[i].id;
			// 			connection.query(query, function(err, rows, fields) {
			// 				if (err) {
			// 					throw err;
			// 			    	console.log(err)
			// 				}else{
			// 					cb(rows);	
			// 				}
			// 			    // console.log(rows)
			// 			    // console.log(fields)						    
			// 			});
			// 			break;
			// 		}
			// 	}
			// }
			// console.log(i)
			// ;
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