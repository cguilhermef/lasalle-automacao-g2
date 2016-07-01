#!/bin/bash
# Remove o usuario do host informado
# $1 = ip do host
# $2 = nome do usuario
path=/www/g2/sh/scripts/users/
script=${path}removerUsuario


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
	
	unset result

	ipHost=$1
	name=$2
	
	ssh wux@$ipHost "sudo userdel -r $name"
	result=$?	

	if [ $result -ne 0 ] 
	then
		echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao tentar excluir o usuario ${name}.\"}}" >> ${script}.txt
	else
		echo -e	"{
							\"exitCode\":0,
							\"content\":{
								\"message\":\"Usuário $name removido com sucesso.\"
							}
						}" >> ${script}.txt
	fi


  rm ${script}.lock           # após a execução, remove o .lock

  exit                                                 # isso registra um exit code 0, ou seja,
fi                                                    #finalizado sem erros.
