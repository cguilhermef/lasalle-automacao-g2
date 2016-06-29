#!/bin/bash
# utilizar unset antes da variavel apos criacao do lock
#formtato data: content:{\"ultimoAcesso\":[anoanoanoano,mesmes,diadia,hora,minuto,segundo],}

unset CONECTADOS  #unset limpa a variavel
unset LOGCONECTADOS 


if [ -e checklogados.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch checklogados.lock     #cria o arquivo de .lock
    rm /www/g2/'sh'/scripts/user/checklogados.txt            #remove o .txt de saída de alguma execução anterior  
  
  CONECTADOS=$(w | grep "pts/" | awk '{print $1 " " $3}' > /www/g2/'sh'/scripts/user/checklogados.txt) #/www/g2/sh/scripts/user 
  LOGCONECTADOS=$(cat /www/g2/'sh'/scripts/user/checklogados.txt)
  echo "$LOGCONECTADOS"

  rm checklogados.lock           # após a execução, remove o .lock
  exit                                         # isso registra um exit code 0, ou seja,
                                                  #finalizado sem erros.
fi