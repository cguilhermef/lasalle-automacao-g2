#!/bin/bash

path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}executarBackup


if [ -e ${script}.lock ]
then
  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Há um processo em andamento.\"}}" >> ${script}.txt
  exit 126
else
  
  touch ${script}.lock
  
  if [ -e ${script}.txt ]
  then 
    rm ${script}.txt
  fi
  if [ -e ${script}.tmp ]
  then 
    rm ${script}.tmp
  fi

  if [ -z $3 ]
	then
    echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Deve ser informado ao menos um item.\"}}" >> ${script}.txt
	fi

  if [ ! -d ${targetPath} ]
  then
		mkdir -p ${targetPath}
	fi
  
  ipOrigem=$1
  ipDestino=$2
  itens=`echo $* | cut -d\  -f3-`
 
 
  ssh wux@${ipOrigem} "${path}prepararBackup.sh $itens" 
	arquivo=`ssh wux@${ipOrigem} "ls ${path}temp/*.tar" | cut -d_ -f2`
	
	if [ $? -ne 0 ]
	then
    echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao preparar os arquivos na origem.\"}}" >> ${script}.txt
	fi 

  if [ $ipOrigem != $ipDestino ]
	then
    ${path}moverBackup.sh $ipOrigem $ipDestino

		if [ $? -ne 0 ]
		then
    	echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao mover o backup, da origem para o destino.\"}}" >> ${script}.txt
		fi
	fi
  
	if [ $? -eq 0 ]
  then
    dataExecucao=`date +%s000`
	  echo -e "
{
	\"exitCode\":0,
	\"content\":
		{
			\"message\":\"Backup realizado com sucesso!\", 
			\"ipOrigem\":\"$ipOrigem\",
			\"ipDestino\":\"$ipDestino\",
			\"arquivoGerado\":\"$arquivo\", 
			\"dataExecucao\":\"$dataExecucao\"
		}
}" >> ${script}.txt

	else
 	  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreram erros durante o process.\"}}" >> ${script}.txt
	fi

  rm ${script}.lock
  exit

fi
