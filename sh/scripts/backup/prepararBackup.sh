#!/bin/bash
# Este script cria o backup.tar no host, para ser posteriormente movido para o destino.

path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}prepararArquivos

function ipLocal() { 
 echo `ifconfig $1 | grep "inet end" | cut -d\t -f2 | cut -d\  -f3` 
}

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

  if [ -z $1 ]
	then
    echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Deve ser informado ao menos um item.\"}}" >> ${script}.txt
	fi

  if [ ! -d ${targetPath} ]
  then
		mkdir -p ${targetPath}
	fi
  
  if [ ! -d ${path}temp ]
	then
		mkdir -p ${path}temp
	fi
  
  itens=$*
  timeStamp=`date +%Y%m%d%H%M%S`
   
	tar -cf ${path}temp/backup_${timeStamp}.tar $itens

	#mv backup_${timeStamp}.tar ${path}temp/backup_${timeStamp}.tar
  
	ARQUIVOGERADO=backup_${timeStamp}.tar
  
  if [ $? -eq 0 ]
  then
	  echo -e "{\"exitCode\":0,\"content\":{\"message\":\"Arquivos prontos para o backup.\",\"arquivoGerado\":\"${targetPath}temp/backup_${timeStamp}.tar\"}}" >> ${script}.txt
	else
 	  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao reunir os arquivos.\"}}" >> ${script}.txt
	fi

  rm ${script}.lock
  exit

fi
