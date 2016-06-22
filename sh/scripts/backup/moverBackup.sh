#!/bin/bash
# Este script moverá o backup de um host para outro
path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}moverBackups

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
	if [ -e ${script}.error ]
  then 
    rm ${script}.error
  fi

	

  if [ $1 != $2 ]
	then
	  scp -3 -r -o StrictHostKeyChecking=no wux@${1}:${path}temp/*.tar wux@${2}:/www/g2/sh/backups/
		ssh wux@${1} "rm -Rf ${path}temp/*.tar"
	fi

  if [ $? -eq 0 ]
  then
	  echo -e "{\"exitCode\":0,\"content\":{\"message\":\"Arquivos prontos para o backup.\",\"arquivoGerado\":\"${targetPath}temp/backup_${timeStamp}.tar\"}}" >> ${script}.txt
	else
		echo "Ocorreu um erro ao mover os arquivos" >> ${path}moverBackups.error
 	  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao reunir os arquivos.\"}}" >> ${script}.txt
	fi

  rm ${script}.lock
  exit

fi
