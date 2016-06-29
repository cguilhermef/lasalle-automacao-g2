#!/bin/bash
#Cadastro de usuario: Deve ser passado os parametros na sequencia: IP USUARIO SENHA INTERPRETADOR
path=/www/g2/sh/scripts/users/
script=${path}cadastrarUsuario


if [ -e ${script}.lock ]
then
  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Há um processo em andamento.\"}}" > ${script}.txt
  exit 126
else
  
  touch ${script}.lock

	if [ -z $1 ]
	then		
  	echo -e "{\"exitCode\":500,\"content\":{\"message\":\"É necessário informar o IP do host.\"}}" >> ${script}.txt
		rm ${script}.lock 
		exit 126
 	fi
 	
		
	if [ -e ${script}.txt ]
  then 
   	rm ${script}.txt
	fi
  if [ -e ${script}.tmp ]
  then 
 	  rm ${script}.tmp
	fi

	unset USERCAD
	unset RESULT
	unset RESULT1
	unset USER 
	unset INTERPRETADOR 
	unset SENHA  

	ipHost=$1		
	USER=$2
	SENHA=$3
	INTERPRETADOR=$4


  $(ssh wux@$ipHost "sudo useradd -m -p `echo $SENHA | openssl passwd -stdin` -s \"$INTERPRETADOR\" \"$USER\"")
	RESULT=$?
	if [ $RESULT -eq 0 ]
	then	
		echo -e "{\"exitCode\":0,\"content\":{\"message\":\"Usuário $USER criado com sucesso.\"}}" >> ${script}.txt
	else
		echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Usuário $USER não pode ser criado.\"}}" >> ${script}.txt
	fi

  rm ${script}.lock           # após a execução, remove o .lock

  exit                                                 # isso registra um exit code 0, ou seja,
fi                                                    #finalizado sem erros.
