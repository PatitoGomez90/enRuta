var mRandom = require('../models/mRandom');
var mItems = require('../models/mItems');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mEmple = require('../models/mEmple');
var mCategoria = require('../models/mCategorias');
var mContratos = require('../models/mContratos');
var mUmed = require('../models/mUmed');

var mysql = require('mysql');
var sql = require('mssql');

var async = require('async');

module.exports = {
	getAsd: getAsd,
	postAsd: postAsd,
	getr2: getr2,
	postr2: postr2,
	getRandom3: getRandom3,
	postRandom3: postRandom3,
	getRandom4: getRandom4,
	postRandom4: postRandom4,
	getRandom5: getRandom5,
	postRandom5: postRandom5,
	getRandom6: getRandom6,
	postRandom6: postRandom6
}

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

function getRandom3(req, res){
	//mostrar ventana random3
	res.render("random3", {
		pagename: "Actualizar tabla emple con empleadoscsv y legajos (SQL)"
	});
}

function postRandom3(req, res){
	//actualizar tabla emple con datos de tabla empleadoscsv y legajo del SQL en el servidor
	//la cantidad de empleados actuales es la de empleadoscsv, asiq no se van a necesitar mas iteraciones que esas

  	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Maresa',
	    dateStrings : true
	 });

	connection.connect();

	mRandom.getAllFromEmpleadosCSV(function (empleadoscsv){
		mRandom.getAllFromEmple(function (emples){
			mRandom.getAllFromLegajoSQLenServer(function (legajos){
				mCategoria.getAll(function (categorias){
					mSectores.getAll(function (sectores){
						mContratos.getAll(function (contratos){
							console.log("empleadoscsv: " + empleadoscsv.length);
							console.log("emples: " + emples.length);
							console.log("legajos: " + legajos.length);
							console.log("categorias: " + categorias.length);
							console.log("sectores: " + sectores.length);
							console.log("contratos: " + contratos.length);

							//var codigofinal = "";
							var nombrefinal = "";
							var faltafinal = "";
							var fbajafinal = "";
							var cargofinal = "";
							var sectorfinal = "";
							var activafinal = "";
							var legajofinal = "";
							var cuilfinal = "";
							var fnacfinal = "";
							var domiciliofinal = "";
							var cpfinal = "";
							var telefonofinal = "";
							var tarjetafinal = "";
							var sexofinal = "";
							var categoriafinal = "";
							var turnofinal = 0;
							var condicionfinal = "";
							var contratofinal = 8;
							var idsectorfinal = 7;

							
							for (var i1 = 0 ; i1 < empleadoscsv.length ; i1++){

								legajofinal = empleadoscsv[i1].legajo;
								nombrefinal = empleadoscsv[i1].apenomb;
								sectorfinal = empleadoscsv[i1].sector;

								sectorfinal = sectorfinal.trim();

								for (var x = 0 ; x < sectores.length ; x++){
									var sectoresnombre = sectores[x].nombre;
									sectoresnombre = sectoresnombre.trim();

									if (sectorfinal == sectoresnombre){
										console.log(sectorfinal)
										console.log(sectoresnombre)
										idsectorfinal = sectores[x].id;
										console.log("MATCH! id "+sectorfinal)
										break;
									}else{
										console.log("NOT MATCH - "+sectorfinal)
										idsectorfinal = 7;

									}
								}

								activafinal = 1;

								categoriafinal = empleadoscsv[i1].categoria;
								categoriafinal = categoriafinal.trim();

								var categoriasnombre = "";

								for (var x = 0 ; x < categorias.length ; x++){
									categoriasnombre = categorias[x].nombre;
									categoriasnombre = categoriasnombre.trim();
									if (categoriafinal == categoriasnombre)
										idcategoriafinal = categorias[x].id;
									else
										idcategoriafinal = 12;

								}

								condicionfinal = empleadoscsv[i1].condicion;
								if (condicionfinal == "FIJO")
									condicionfinal = 1;
								else
									condicionfinal = 2;

								var nrocontrato = 0;

								contratofinal = empleadoscsv[i1].contrato;
								nrocontrato = contratofinal.slice(-10);

								for (var x = 0 ; x < contratos.length ; x++){
									var contratosnumero = "";
									contratosnumero = contratos[x].numero;
									contratosnumero = contratosnumero.trim();

									if(nrocontrato == contratosnumero){
										contratofinal = contratos[x].id;
										contratofinal = parseInt(contratofinal);
										break;
									}else{
										contratofinal = 8;
									}
								}

								for (var i2 = 0 ; i2 < emples.length ; i2 ++){
									//si empleadoscsv es igual q emples, agarrar info
									if ( legajofinal == emples[i2].legajo ){
										//agarrar info

										//codigofinal = emples[i2].codigo;
										tarjetafinal = emples[i2].tarjeta;
										faltafinal = emples[i2].falta;
										fbajafinal = emples[i2].fbaja;
										cargofinal = emples[i2].cargo;
										cuilfinal = emples[i2].cuil;
										fnacfinal = emples[i2].fecha_nac;

										domiciliofinal = emples[i2].domicilio;
										cpfinal = emples[i2].cp;
										telefonofinal = emples[i2].tel;
										//sexo lo saque xq no tiene datos

									}//fin if

								}//fin for emples

								for (var i3 = 0 ; i3 < legajos.length ; i3++) {
									//si empleadoscsv es igual q legajos, agarrar info
									if ( legajofinal == legajos[i3].LEG_LEGAJO ){
										//agarrar info
										tarjetafinal = legajos[i3].LEG_TARJETA;
										sexofinal = legajos[i3].LEG_SEXO;
										if (sexofinal == "M")
											sexofinal = 0;
										if (sexofinal == "F")
											sexofinal = 1;

									}//fin if

								}//fin for legajos

								//insert empleadocsv en mysql
									// var codigofinal--
									// var nombrefinal-
									// var faltafinal-
									// var fbajafinal-
									// var cargofinal-
									// var sectorfinal-
									// var activafinal-
									// var legajofinal -
									// var cuilfinal-
									// var fnacfinal-
									// var domiciliofinal-
									// var cpfinal-
									// var telefonofinal-
									// var tarjetafinal-
									// var sexofinal -
									// var categoriafinal-
									// var turnofinal = "";-
									// var condicionfinal-
									// var contratofinal-

								//codigo, nombre, falta, fbaja, cargo, sector, activa, legajo, cuil, fnac, domicilio, cp, telefono, tarjeta, sexo, categoria, turno, condicion, contrato, cb){
								//console.log("inserta "+contratofinal)
								query = "insert into emplefinal(nombre, falta, fbaja, cargo, id_sector_fk, activa, legajo, cuil, fecha_nac, domicilio, cp, tel, tarjeta, sexo, id_categoria_fk, id_turno_fk, id_condicion_fk, id_contrato_fk) values('"+nombrefinal+"', '"+faltafinal+"', '"+fbajafinal+"', '"+cargofinal+"',"+idsectorfinal+", "+ activafinal+", "+legajofinal+", '"+cuilfinal+"', '"+fnacfinal+"', '"+domiciliofinal+"', '"+cpfinal+"', '"+telefonofinal+"', "+tarjetafinal+", "+sexofinal+", "+categoriafinal+", "+turnofinal+", "+condicionfinal+", "+contratofinal+");";

								connection.query(query, function(err, rows, fields) {
									if (err) throw err;
										
									if (err)
										console.log(err);
								    //cb(rows);
								});

								// mEmple.insertFinal(codigofinal, nombrefinal, faltafinal, fbajafinal, cargofinal, sectorfinal, activafinal, legajofinal, cuilfinal, fnacfinal, domiciliofinal, cpfinal, telefonofinal, tarjetafinal, sexofinal, categoriafinal, turnofinal, condicionfinal, contratofinal, function(){
								// 	console.log("Empleado agregado con éxito Nro: "+i1)
								// });
							}//fin for empleadoscsv
							console.log("agregados: "+i1)
							console.log(query)
							connection.end();
							console.log("fin ")
							res.redirect('random');
						});
					});
				});
			});
		});
	});	
}

function getRandom4(req, res){
	res.render("random4", {
		pagename: "Actualizar tabla items con itemscsv"
	});
}

function postRandom4(req, res){

	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Maresa',
	    dateStrings : true
	 });

	connection.connect();

	mUmed.getAll(function (umeds){
		mLugares.getAll(function (lugares){
			mSectores.getAll(function (sectores){
				mRandom.getAllFromItemsCSV(function (itemscsv){
					mContratos.getAll(function (contratos){
						console.log("Items: "+itemscsv.length);
						console.log("Umeds: "+umeds.length);
						console.log("Sectores: "+sectores.length);
						console.log("Lugares: "+lugares.length);
						console.log("Contratos: "+contratos.length);

						for (var i1 = 0 ; i1 < itemscsv.length ; i1++){
							var numeroInt =	itemscsv[i1].numero;
							var descripcionTXT = itemscsv[i1].descripcion;
							var sectorTXT = itemscsv[i1].sector;
							var lugarTXT =	itemscsv[i1].lugar;
							var umedTXT = itemscsv[i1].umed;
							var horas_standard_final = itemscsv[i1].horas_standard;
							var contratoTXT = itemscsv[i1].contrato;

							switch(sectorTXT) {
							    case "COQUERÍA":
							        var id_sector_final = 5;
							        break;
							    case "TAREAS GRAL":
							        var id_sector_final = 3;
							        break;
							    case "ACERÍA":
							        var id_sector_final = 4;
							        break;
							    case "GRALES":
							        var id_sector_final = 8;
							        break;
							    default:
							        var id_sector_final = 7;
							}

							//guardar id lugar
							for (var i3 = 0 ; i3 < lugares.length ; i3++){
								var lugartxtDB = lugares[i3].nombre;
								var lugartxtDBmayus = lugartxtDB.toUpperCase();

								if ( lugarTXT == lugartxtDBmayus ){
									var id_lugar_final = lugares[i3].id;
									break;
								}else{
									var id_lugar_final = 0;
								}
							}

							//guardar id umed
							for (var i4 = 0 ; i4 < umeds.length ; i4++){
								var umedtxtDB = umeds[i4].codigo;
								var umedtxtDBmayus = umedtxtDB;

								if ( umedTXT == umedtxtDBmayus ){
									var id_umed_final = umeds[i4].id;
									break;
								}else{
									var id_umed_final = 0;
								}
							}

							//guardar id contrato
							contratoTXT = contratoTXT.trim();
							switch(contratoTXT) {
							    case "1000000000":
							        var id_contrato_final = 10;
							        break;
							    case "2000000000":
							        var id_contrato_final = 9;
							        break;
							    case "6700119523":
							        var id_contrato_final = 5;
							        break;
							    case "6700119546":
							        var id_contrato_final = 4;
							        break;
							    case "6700158761":
							        var id_contrato_final = 7;
							        break;
							    case "6700166490":
							        var id_contrato_final = 6;
							        break;
							    default:
							        var id_contrato_final = 8;
							}

							//fin de los for.. add item

							query = "insert into items(numero, nombre, id_sector_fk, id_lugar_fk, id_umed_fk, horas_standard, id_contrato_fk, activa) values("+numeroInt+", '"+descripcionTXT+"', "+id_sector_final+", "+id_lugar_final+", "+id_umed_final+", "+horas_standard_final+", "+id_contrato_final+", 1)"

							connection.query(query, function(err, rows, fields) {
								if (err) throw err;
									
								if (err)
									console.log(err);
							    //cb(rows);
							});

						}

						console.log("agregados: "+i1)
						connection.end();
						console.log("Fin ")

						res.redirect('random');
					});
				});
			});
		});
	});
}

function getRandom5(req, res){
	res.render("random5", {
		pagename: "Traer tarjetas de tabla legajo del sql"
	});
}

function postRandom5(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Maresa',
	    dateStrings : true
	 });

	connection.connect();

	mRandom.getLegajosFromSQL(function (legajos){
		console.log(legajos.length)
		//for (var i = 0 ; legajos.length < i ; i++){
		async.each(legajos, function (legajo, callback) {
			query = "INSERT INTO `templegajosytarjetas`(`legajo`, `tarjeta`) VALUES ("+legajo.LEG_LEGAJO+", "+legajo.LEG_TARJETA+");"

			connection.query(query, function(err, rows, fields) {
				if (err) {
					throw err;
					console.log(err);
				}else{
					//console.log("insert ok ");
					callback();
				}
			});
		}, function (){
			console.log("Insert OK")
			res.redirect('random');
		});
	});
	//connection.end();
}

function getRandom6(req, res){
	res.render('random6', {
		pagename: "Actualizar Emple con Tarjetas de SQL"
	})
}

function postRandom6(req, res){
	var connection = mysql.createConnection({
	    user: 'root',
	    password: '',
	    host: '127.0.0.1',
	    port: '3306',
	    database: 'Maresa',
	    dateStrings : true
	});

	connection.connect();

	mRandom.getLegajosTempsOfMySql(function (temp){
		console.log(temp.length)

      	async.each(temp, function (leg, callback){
      		query = "UPDATE `emple` SET `tarjeta`= "+leg.tarjeta+" WHERE legajo = "+leg.legajo;
			connection.query(query, function(err, rows, fields) {
				if (err) {
					throw err;
					console.log(err);
				}else{
					//console.log("insert ok ");
					callback();
				}
			});
	    }, function (){
			console.log("update OK")
			res.redirect('random');
		});    
	});
}