#!/bin/bash
#Modificar o Shell do usuario, Informar o Nome do usuario que deseja modificar e o novo shell
#Passar Parametro : Usuario e novo shell
unset MODSHELL
unset RESULT
unset RESULT1
unset USUARIO  

USUARIO=$1
NOVOSHELL=$2



if [ -e uModShell.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch uModShell.lock     #cria o arquivo de .lock
  	
    if [ -e uModShell.txt ]  # testa se o arquivo existe, se positivo remove o mesmo.
    then

    rm uModShell.txt            #remove o .txt de saída de alguma execução anterior

    fi

  #Modifica o shell do usuario.
    
  MODSHELL=$(usermod -s "$NOVOSHELL" "$USUARIO")

  RESULT=$(cat /etc/passwd | grep "$USUARIO" > uModShell.txt) 
  
  #RESULT1=$(cat uModShell.txt) #usado somente para debug

  #echo "$RESULT1"

  rm uModShell.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi