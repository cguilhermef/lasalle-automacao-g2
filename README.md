## Sobre o projeto

Trata-se de um trabalho de G2 para a faculdade UniLassale, da disciplina de
Linguagens de automação. Por este motivo, o projeto utiliza as linguagens
Javascript e Shellscript.

## Organização

Na pasta *app* ficam os arquivos da aplicação web, construida em _**Angular**_. Na pasta *sh* são divididos os scripts em _**Shellscript**_.

Os scripts são divididos em pastas de acordo com o módulo
no qual são utilizados: _Backup_, _Usuários_, _Monitoramento_ e _Performance_.

No momento, foram integrados todos os módulos com o *webclient*, exceto o de Performance.

## Instalação

Utilizando uma máquina com _**Node**_ e _**Bower**_ instalados, executar o roteiro a seguir.

### Build da versão de produção

Após clonar o projeto, executar os seguintes comandos

```bash
$ npm install
$ bower install
$ grunt build
```
Dessa forma todas as depenências foram instaladas e a pasta _dist_ foi criada.

### Instalação do _server_
Na máquina destinada a ser o servidor da aplicação, clonar o projeto em um diretório _/www/g2/_

Instalar o _**Nodejs**_ e os seguintes _packages_ com a opção __-g__

* shelljs
* expressjs
* body-parser
