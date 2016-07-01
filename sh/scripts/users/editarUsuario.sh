#!/bin/bash
#Cadastro de usuario: Deve ser passado os parametros na sequencia: ipHost usuarioAntigo homeAntigo novoUsuario novoHome novoInterpretador
path=/www/g2/sh/scripts/users/
script=${path}editarUsuario


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
	oldName=$2
	oldHome=$3
	name=$4
	home=$5
	shell=$6
	nameTest=0
	dirTest=0
	
	if [ $name != $oldName ]
	then
		nameTest=$(ssh wux@$ipHost "sudo cat /etc/passwd" | grep $name | wc -l)
	fi

	if [ $home != $oldHome ]
	then
		dirTest=$(ssh wux@$ipHost "sudo ls -l /home" | grep $home | wc -l)
	fi

	if [ $nameTest -ne 0 ] || [ $dirTest -ne 0 ] 
	then
		echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Usuário $name já existe e/ou o diretório já existem.\"}}" >> ${script}.txt
	else
		$(ssh wux@$ipHost "sudo usermod -s $shell -d $home -l $name $oldName")
		result=$(ssh wux@$ipHost "echo $?")
		if [ $result -eq 0 ]
		then

			result=0

			if [ $oldHome != $home ]
			then
				$(ssh wux@$ipHost "sudo mv $oldHome $home")
				result=$(ssh wux@$ipHost "echo $?")
			fi

			if [ $result -eq 0 ]
			then
				echo -e	"{
									\"exitCode\":0,
									\"content\":{
										\"message\":\"Usuário $name editado com sucesso.\",
										\"user\": {
											\"name\": \"$name\",
											\"home\": \"$home\",
											\"shell\": \"$shell\"
										}
									}
								}" >> ${script}.txt
			else 
				echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Não foi possível mover a pasta $oldHome para $home.\"}}" >> ${script}.txt
			fi
		else
			echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Não foi possível mover editar o usuário $oldName\"}}" >> ${script}.txt
		fi
	fi


  rm ${script}.lock           # após a execução, remove o .lock

  exit                                                 # isso registra um exit code 0, ou seja,
fi                                                    #finalizado sem erros.
