var express = require('/usr/local/lib/node_modules/express');
var shelljs = require('/usr/local/lib/node_modules/shelljs');
var fs = require('fs');

var app = express();
var availableCommands = [
  'show_top',
  'ls_root',
  'accessibleHost'
];
var result = '';

app.use(express.static('dist'));

//Executa scripts que retornam apenas 1 para sucesso ou 0 para erro
app.get('/script/', function(req, res) {
  if (!req.query.command) {
    res.send('Você precisa informar um comando!');
    return;
  }
  if (availableCommands.indexOf(req.query.command) === -1) {
    res.send('Comando invalido ou inexistente');
    return;
  }
  shelljs.exec('sh/scripts/'+req.query.command+'.sh '+req.query.hostname, function(code) {
    res.send(code);
  });
});

//executa .sh que realizam operações e retornam a saída preparada do console
app.get('/shell/', function(req, res) {
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
