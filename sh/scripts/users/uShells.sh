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


if [ -e uShells.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch uShells.lock     #cria o arquivo de .lock
  
    if [ -e uShells.txt ]   # testa se o arquivo existe, se for positivo remove o mesmo
    then  

    rm uShells.txt         #remove o .txt de saída de alguma execução anterior

    fi

  SHELLS_SISTEMA=$(cat /etc/shells | grep 'bin' > uShells.txt)
  
  RESULT=$(cat uShells.txt) # somente para teste de debug
  echo "$RESULT"
  rm uShells.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi
