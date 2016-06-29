#!/bin/bash
#Cadastro de usuario: Deve ser passado os parametros na sequencia: USUARIO SENHA INTERPRETADOR
unset USERCAD
unset RESULT
unset RESULT1
unset USER 
unset INTERPRETADOR 
unset DIRETORIO
unset SENHA  

USER=$1
SENHA=$2
INTERPRETADOR=$3
#DIRETORIO=$4

if [ -e uCadUser.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch uCadUser.lock     #cria o arquivo de .lock
  
  if [ -e uCadUser.txt ]  # testa se o arquivo existe, se for positivo remove o mesmo
  then   
  
  rm uCadUser.txt            #remove o .txt de saída de alguma execução anterior
  
  fi 

  #VERIFICAR PARA DEFINIR UM GRUPO PADRAO NO CADASTRO.
  
  USERCAD=$(useradd -m -p $(openssl passwd -1 "$SENHA") -s "$INTERPRETADOR" "$USER")

  RESULT=$(cat /etc/passwd | grep "$USER" > uCadUser.txt) 
  RESULT1=$(cat uCadUser.txt) # serve somente para teste de debug
  echo "$RESULT1"

  rm uCadUser.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
fi                                                    #finalizado sem erros.
