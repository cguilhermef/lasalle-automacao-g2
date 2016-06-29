#!/bin/bash
#Buscar usuarios cadastrados no sistema que utilizam shell.
unset LOGPESQ
unset RESULT
unset path
unset script 
unset SHELLS_SISTEMA

#path="/www/g2/sh/scripts/user/"
#script="${$path}uCadastrados"
#echo "$script"

SHELLS_SISTEMA=$(cat /etc/shells | grep 'bin')

if [ -e uCadastrados.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch uCadastrados.lock     #cria o arquivo de .lock
  
    if [ -e uCadastrados.txt ]   # testa se o arquivo existe, se for positivo remove o mesmo
    then  

    rm uCadastrados.txt         #remove o .txt de saída de alguma execução anterior

    fi

  LOGPESQ=$(grep "$SHELLS_SISTEMA" /etc/passwd | cut -d ':' -f1 > uCadastrados.txt)
  
  RESULT=$(cat uCadastrados.txt) # somente para teste de debug
  echo "$RESULT"
  rm uCadastrados.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi