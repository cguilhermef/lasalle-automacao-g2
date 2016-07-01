#!/bin/bash
#lista os usuários para o host inforado
# $1 = ip do host
# $2 = critério de busca (opcional)


path=/www/g2/sh/scripts/users/
script=${path}listarUsuarios


if [ -e ${script}.lock ]
then
  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Há um processo em andamento.\"}}" > ${script}.txt
  exit 126
else
  
  touch ${script}.lock

	if [ -z $1 ]
	then		
  	echo -e "{\"exitCode\":500,\"content\":{\"message\":\"É necessário informar o IP do host.\"}}" >> ${script}.txt
		rm ${script}.lock           # após a execução, remove o .lock
		exit 126
 	fi
 	
	ipHost=$1
		
	if [ -e ${script}.txt ]
  then 
   	rm ${script}.txt
	fi
  if [ -e ${script}.tmp ]
  then 
 	  rm ${script}.tmp
	fi
	
	shellsSistema=$(ssh wux@$ipHost "cat /etc/shells | grep ^\/bin")
	shellsSistema=$(echo $shellsSistema | tr \  \|)
	usuarios=$(ssh wux@$ipHost "cat /etc/passwd | cut -d ':' -f1,6,7 | grep -E \"$shellsSistema\" | grep -v wux | grep -v root")
	if [ ! -z $2 ]
	then
		for user in $usuarios
		do
			echo $user >> ${script}.tmp
		done
		usuarios=`cat ${script}.tmp | grep "$2"`
	fi
	count=$(echo "$usuarios" | wc -w)
	
	echo -e "
	{
		\"exitCode\":0,
		\"content\":{
			\"usuarios\":[" >> ${script}.txt
				echo "$usuarios" | while read usuario
				do
					echo -e "{
										\"name\": \"`echo $usuario | cut -d ':' -f1`\",
										\"home\": \"`echo $usuario | cut -d ':' -f2`\",
										\"shell\": \"`echo $usuario | cut -d ':' -f3`\"
									 }" >> ${script}.txt
					count=$((count-1))
					if [ $count -gt 0 ]
					then
						echo "," >> ${script}.txt
					fi
				done
	echo "]}}" >> ${script}.txt
	rm ${script}.lock           # após a execução, remove o .lock
 	exit                                                 # isso registra um exit code 0, ou seja,
                                                    #finalizado sem erros.
fi
