var mRandom = require('../models/mRandom');
var mItems = require('../models/mItems');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mEmple = require('../models/mEmple');
var mysql = require('mysql');
var sql = require('mssql');

module.exports = {
	getAsd: getAsd,
	postAsd: postAsd,
	getr2: getr2,
	postr2: postr2
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}


function getAsd(req, res) {
	res.render('random', {
    	pagename: 'Hacé clic en el botón!'
  	});  
};

function postAsd(req, res){
	//traer todo de random
	var connection = mysql.createConnection({
		user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Maresa',
	    dateStrings : true
	});

	//console.log('/--------/ DEBUG USE /---------/');
	//console.log(query);
	connection.connect();


	mRandom.getAll(function (random){
		mItems.getAll(function (items){
			mLugares.getAll(function (lugares){
				mSectores.getAll(function (sectores){
					var i = 0;
					//recorrerlo
					for (i = 0 ; i < random.length ; i++){
						var x = 0;
						var idsave = 0;

						if (random[i].Sector == "TAREAS GRAL" || random[i].Sector == "GRALES" ){
							idsave = 3;
						}else{
							if (random[i].Sector == "ACERÍA"){
								idsave = 4;
							}else{
								if(random[i].Sector == "COQUERÍA"){
									idsave=5;
								}else{
									idsave=7;
								}
							}
						}

						connection.query("insert into items(numero, nombre, id_sector_fk, um, activa) values("+random[i].subpos+", '"+random[i].descripcion+"', "+idsave+", '"+random[i].um+"', 1) ", function(err, rows, fields) {
							if (err) throw err;
						    //console.log(err)
						    //console.log(rows)
						    //console.log(fields)
							console.log("guardado item n°"+i)
						    //cb(rows);
						});
					}
  					connection.end();
				});
			});
		});
	});
}

function getr2(req, res){
	res.render("random2", {
		pagename: "Traer Emples del SQL del server y Guardarlos en Mysql Local"
	});
}

function postr2(req, res){

	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Maresa',
	    dateStrings : true
	});

  	console.log('/--------/ DEBUG USE /---------/');
  	//console.log(query);
  	connection.connect();
   
	mRandom.getLegajosFromSQL(function (legajos){
		console.log(legajos.length)
		//console.log(legajos[0])
		mEmple.getAllActivos2(function (emples){
			console.log(emples.length)
			for ( var i = 0 ; i < legajos.length ; i++) {
				l = legajos[i];
			 	//tarjeta, codigo, nombre, falta, fbaja, cargo, sector, activa, legajo, cuil, fnac, domicilio, cp, telefono, sexo
			 	if ( l.LEG_SEXO == "M")
			 		sexo = 0;
			 	else
			 		if (l.LEG_SEXO == "F")
			 			sexo = 1;
			 		else
			 			sexo = "ERROR"

			 	var tarjeta = l.LEG_TARJETA;
			 	var nombre = l.LEG_APYNOM.trim();
			 	var falta = changeDate(l.fechaingreso);
			 	var fbaja = "2025/07/22";
			 	var cargo = 0;
			 	var sector = 0;
			 	var activa = 1;
			 	var legajo = l.LEG_LEGAJO;
			 	var sexo = l.LEG_SEXO;

			 	if (sexo == 'F')
			 		sexo = 1;
			 	else
			 		if (sexo == 'M')
			 			sexo = 0;
			 		else
			 			sexo = 0;


			 	var cuil = "";
			 	var fnac = "";
			 	var domicilio = "";
			 	var cp = "";
			 	var telefono = "";

			 	
			 	for ( var x = 0 ; x < emples.length ; x++){
			 		if (emples[x].legajo == legajo){
			 			cuil = emples[x].cuil;
			 			fnac = emples[x].fecha_nac;
			 			fnac = changeDate(fnac);
			 			domicilio = emples[x].domicilio;
			 			cp = emples[x].cp;
			 			telefono = emples[x].tel;
			 		}else{
			 			cuil = "";
			 			fnac = "";
			 			domicilio = "";
			 			cp = "";
			 			telefono = "";
			 		}
			 	} 

			 	query = "insert into emple(nombre, falta, fbaja, cargo, id_sector_fk, activa, legajo, cuil, fecha_nac, domicilio, cp, tel, tarjeta, sexo) values('"+nombre+"', '"+falta+"', '"+fbaja+"', '"+cargo+"',"+sector+", "+ activa+", "+legajo+", '"+cuil+"', '"+fnac+"', '"+domicilio+"', '"+cp+"', '"+telefono+"', "+tarjeta+", "+sexo+");"
			 	//console.log(query)

		      	connection.query(query, function(err, rows, fields) {
					if (err){
						throw err;
				    	console.log(err);
				    }
				    //console.log(rows)
				    //console.log(fields)
					//console.log("guardado "+i)
				    //cb(rows);
				});
    		}    
			connection.end();
		});//cierra mEmple
	});
	res.redirect("random")
}
