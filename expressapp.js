var express = require('/usr/local/lib/node_modules/express');
var shelljs = require('/usr/local/lib/node_modules/shelljs');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var availableCommands = [
  'show_top',
  'ls_root',
  'accessibleHost'
];

var result = {};
var params = '';
//Executa scripts que retornam apenas 1 para sucesso ou 0 para erro
app.post('/script', function(req, res) {
//  console.log(req.body);
  if (req.body.params) {
    params = req.body.params.toString().replace(/\,/ig,' ');
  } else {
    params = '';
  }

  shelljs.exec('sh/scripts/'+req.body.command+'.sh '+params, function(code) {
    if (code === 'txt') {
      result.json = fs.readFileSync('sh/scripts/'+req.body.command+'.txt', "utf8");
      result.json = JSON.parse(result.json);
    } else {
      result.exit = code;
    }
    res.send(result);
  });
});

//executa .sh que realizam operações e retornam a saída preparada do console
app.get('/shell', function(req, res) {
  if (!req.query.command) {
    res.send('Você precisa informar um comando!');
    return;
  }
  if (availableCommands.indexOf(req.query.command) === -1) {
    res.send('Comando invalido ou inexistente');
    return;
  }
  shelljs.exec('sh/bashes/'+req.query.command+'.sh');
  result = '<pre>' + fs.readFileSync('sh/bashes/'+req.query.command+'.txt', "utf8") + '</pre>';
  res.send(result);
});

app.listen(3000, function() {
  console.log('ta rolando!');
});
