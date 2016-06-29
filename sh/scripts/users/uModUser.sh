#!/bin/bash
#Modificar o nome do usuario e o diretorio home. Move os dados do home antigo para o novo.
#Deve ser passado como parametro: NOVO USUARIO, USUARIO ATUAL
unset USERCAD
unset RESULT
unset RESULT1
unset USERATUAL 
unset USERNOVO  
unset HOMEATUAL 

USERNOVO=$1
USERATUAL=$2



if [ -e uModUser.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch uModUser.lock     #cria o arquivo de .lock
  	
    if [ -e uModUser.txt ]  # testa se o arquivo existe, se positivo remove o mesmo.
    then

    rm uModUser.txt            #remove o .txt de saída de alguma execução anterior

    fi
    #Modifica o nome de usuario e move os arquivos do diretorio atual para o novo diretorio.
  

  #HOMEATUAL=$(cat /etc/passwd | cut -d ':' -f1,6,7 | grep -i $USERATUAL | sed 's/:/ /g' | awk '{print $2}')


  USERCAD=$(usermod -m -d /home/$USERNOVO -l "$USERNOVO" "$USERATUAL")


  RESULT=$(cat /etc/passwd | grep "$USERNOVO" > uModUser.txt) 
  
  RESULT1=$(cat uModUser.txt) #usado somente para debug

  echo "$RESULT1"

  rm uModUser.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi