var mChk1 = require('../models/mChk1');
var mChk2 = require('../models/mChk2');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar
};

function getLista(req, res) {
  	mChk2.getAll(function (chk2s){
  		res.render('chk2lista', {
			pagename: 'Lista de CheckLists 2',
			chk2s: chk2s,
		});
  	});
}

function getAlta(req, res){
	mChk1.getAll(function (chk1s){
		res.render('chk2alta',{
			pagename: "Alta de CheckList",
			chk1s: chk1s
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idchk1 = params.chk1;
	detalle = params.detalle;
	orden = params.orden;
	titulo = params.titulo;

	if (titulo == "on")
		titulo = 1;
	else
		titulo = 0;

	mChk2.insert(idchk1, detalle, orden, titulo, function(){
		res.redirect('chk2lista');
	});
}

function getModificar(req, res){
	params = req.params;
	idchk2 = params.id;
	mChk1.getAll(function (chk1s){
		//console.log(chk1s)
		mChk2.getChk2ById(idchk2 ,function (chk2){
			//console.log(chk2)
			res.render('chk2modificar',{
				chk1s: chk1s,
				chk2: chk2[0],
				pagename: 'Modificar'
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	chk2id = params.chk2id;
	chk1id = params.chk1;
	orden = params.orden;
	detalle = params.detalle;
	titulo = params.titulo;

	if (titulo == "on")
		titulo = 1;
	else
		titulo = 0;
	
	mChk2.update(chk2id, chk1id, detalle, orden, titulo, function (){
		res.redirect('chk2lista');
	});
}