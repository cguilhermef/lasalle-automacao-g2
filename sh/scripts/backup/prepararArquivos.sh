#!/bin/bash

path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}prepararArquivos

echo $1 $2

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

  if [ -z $2 ]
	then
    echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Deve ser informado ao menos um item.\"}}" >> ${script}.txt
	fi

  if [ ! -d $targetPath ]
  then
		mkdir $targetPath
		mkdir ${targetPath}temp
	fi
  
  if [ -d ${targetPath}temp ]
	then
		rm -Rf ${targetPath}temp/* >> /dev/null
	fi

  ipOrigem=$1
  itens=`echo $* | cut -d\  -f2-`
  itensOk=''  

  for item in $itens
	do
    if [ -d ${item} ] || [ -e ${item} ] #eh um diretorio
		then
    	itensOk="$itensOk $item"
    fi
	done
  echo $itensOk	
  timeStamp=`date +%Y%m%d%H%M%S`
	tar -cf ${targetPath}temp/backup_${timeStamp}.tar $itensOk

  if [ $? -eq 0 ]
  then
	  echo -e "{\"exitCode\":0,\"content\":{\"message\":\"Arquivos prontos para o backup.\",\"arquivoGerado\":\"backup_${timeStamp}.tar\"}}" >> ${script}.txt
	else
 	  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao reunir os arquivos.\"}}" >> ${script}.txt
	fi

  rm ${script}.lock
  exit

fi
