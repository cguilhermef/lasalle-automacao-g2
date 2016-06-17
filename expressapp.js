var express = require('/usr/local/lib/node_modules/express');
var shelljs = require('/usr/local/lib/node_modules/shelljs');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var availableCommands = [
  'show_top',
  'ls_root',
  'accessibleHost'
];

var result = {};
var params = '';
var output = null;
//Executa scripts que retornam apenas 1 para sucesso ou 0 para erro
app.post('/script', function(req, res) {
 
  //transforma o array de parâmetros em uma string separada por espaços
  //compatível com a passagem de parâmetros para o shellscript
  if (req.body.params) {
    params = req.body.params.toString().replace(/\,/ig,' ');
  } else {
    params = '';
  }
  //executa o respectivo comando no servidor da aplicação
  shelljs.exec('sh/scripts/'+req.body.command+'.sh '+params, function(code) {
    //se a saída do .sh for 126 ou 127, retorna um objeto indicando erro.
    if (code === 126 || code === 127){
      result = {exitCode:code};
    } else {
      //se a saída for outro status, faz a leitura do output do comando,
      //que é um json string em um arquivo txt com o mesmo nome do comando.
      output = fs.readFileSync('sh/scripts/'+req.body.command+'.txt', "utf8");
      result = JSON.parse(output);
    }
    res.json(result);
  });
});

//envia o pacote de scripts a serem utilizados no host

app.get('/package-cli', function(req, res) {
	
	shelljs.exec('sh/package-cli.sh', function(code){
		if (code === 0) {
			res.sendFile('/www/g2/sh/package-cli.tar');
		} else {
			res.status(500).end();
		}
	});
});

//executa .sh que realizam operações e retornam a saída preparada do console
app.listen(3000, function() {
  console.log('ta rolando!');
});
