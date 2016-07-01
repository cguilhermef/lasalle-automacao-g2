#!/bin/bash
#Remove o endereco IP passado no parametro
unset RESULT
unset DATA
unset IP_REMOVE

IP_REMOVE=$1

if [ -e mIpRemove.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch mIpRemove.lock     #cria o arquivo de .lock
  
     
  sed -i '/^'$IP_REMOVE'$/d' ipmonitor.txt #Remove a variavel de entrada
  
  RESULT=$(cat ipmonitor.txt) # somente para teste de debug
  echo "$RESULT"
  rm mIpRemove.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi