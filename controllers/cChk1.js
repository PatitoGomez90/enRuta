var mChk1 = require('../models/mChk1');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta
};

function getLista(req, res) {
  	mChk1.getAll(function (chk1s){
  		res.render('chk1lista', {
			pagename: 'Lista de CheckLists 1',
			chk1s: chk1s,
		});
  	});
}

function getAlta(req, res){
	res.render('chk1alta',{
		pagename: "Alta de CheckList"
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	masdatos = params.masdatos;

	mChk1.insert(nombre, masdatos, function(){
		res.redirect('chk1lista');
	});
}