#!/bin/bash
#Cadastro de porta que sera armazenado no arquivo portmonitor.txt.
unset RESULT
unset PORT_CAD

PORT_CAD=$1

if [ -e mPortCad.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch mPortCad.lock     #cria o arquivo de .lock
  
    
echo "$PORT_CAD" >> portmonitor.txt  # Deve ser passado os endereços de ip no arquivo ipmonitor.txt para que seja realizado o monitoramento


  RESULT=$(cat portmonitor.txt) # somente para teste de debug
  
  echo "$RESULT"
  
  rm mPortCad.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi