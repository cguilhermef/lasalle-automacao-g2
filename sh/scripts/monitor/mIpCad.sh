#!/bin/bash
#Cadastro de IP que sera armazenado no arquivo ipmonitor.txt.
unset RESULT
unset IP_CAD

IP_CAD=$1

if [ -e mIpCad.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch mIpCad.lock     #cria o arquivo de .lock
  
    
echo "$IP_CAD" >> ipmonitor.txt  # Deve ser passado os endereços de ip no arquivo ipmonitor.txt para que seja realizado o monitoramento


  RESULT=$(cat ipmonitor.txt) # somente para teste de debug
  echo "$RESULT"
  rm mIpCad.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi