#!/bin/bash
#Remove a porta passada no parametro
unset RESULT
unset DATA
unset PORT_REMOVE

PORT_REMOVE=$1

if [ -e mPortRemove.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch mPortRemove.lock     #cria o arquivo de .lock
  
     
  sed -i '/^'$PORT_REMOVE'$/d' portmonitor.txt #Remove a variavel de entrada
  
  RESULT=$(cat portmonitor.txt) # somente para teste de debug
  echo "$RESULT"
  rm mPortRemove.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi