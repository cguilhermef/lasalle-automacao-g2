#!/bin/bash
#Excluir usuario, Informar o Nome do usuario que deseja excluir
#Passar Parametro : Usuario

unset REMOVE
unset RESULT
unset RESULT1
unset USUARIO  

USUARIO=$1


if [ -e uDelUser.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch uDelUser.lock     #cria o arquivo de .lock
  	
    if [ -e uDelUser.txt ]  # testa se o arquivo existe, se positivo remove o mesmo.
    then

    rm uDelUser.txt            #remove o .txt de saída de alguma execução anterior

    fi

  #REMOVE=$(deluser -q "$USUARIO" --remove-home --backup)
  
  #Este comando exclui o usuario e suas pastas
  REMOVE=$(userdel -r "$USUARIO")

  echo "Usuario deletado com sucesso." > uDelUser.txt

  #cat uDelUser.txt 
    
  rm uDelUser.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi