#!/bin/bash

path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}executarBackup


if [ -e ${script}.lock ]
then
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
  echo $itens

  ssh wux@${ipOrigem} "${path}prepararBackup.sh $itens"

  if [ $ipOrigem != $ipDestino ]
	then
    ${path}moverBackup.sh $ipOrigem $ipDestino
	fi
  
if [ $? -eq 0 ]
  then
	  echo -e "{\"exitCode\":0,\"content\":{\"message\":\"Arquivos prontos para o backup.\",\"arquivoGerado\":\"${targetPath}temp/backup_${timeStamp}.tar\"}}" >> ${script}.txt
	else
 	  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao reunir os arquivos.\"}}" >> ${script}.txt
	fi

  rm ${script}.lock
  exit

fi
