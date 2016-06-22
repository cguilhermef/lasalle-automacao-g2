#!/bin/bash
# Este script cria o backup.tar no host, para ser posteriormente movido para o destino.

path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}prepararBackup

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
  if [ -e ${script}.error ]
  then 
    rm ${script}.error
  fi

  if [ -z $1 ]
	then
		echo "Deve ser informado ao menos um item" >> ${script}.error
  	echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Deve ser informado ao menos um item.\"}}" >> ${script}.txt
	fi

  if [ ! -d ${targetPath} ]
  then
		sudo mkdir -p ${targetPath}
	fi
  
  if [ ! -d ${path}temp ]
	then
		sudo mkdir -p ${path}temp
		sudo chown -Rf wux:wux ${path}temp
	else
	  sudo rm -Rf ${path}temp/*.tar
	fi
  
  itens=$*

  for item in $itens
	do
		if [ -e $item ]
		then
      itensOk="${itensOk} $item"
		fi
	done
  echo "itens ok: $itensOk"
  if [ -n $itensOk ]
	then
		timeStamp=`date +%Y%m%d%H%M%S`
   
		sudo tar -cf ${path}temp/backup_${timeStamp}.tar $itens
	  
	if [ $? -ne 0 ]
  	then
			echo "Ocorreu um erro ao reunir os arquivos" >> ${script}.error
 		  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao reunir os arquivos.\"}}" >> ${script}.txt
		fi

	else
		echo "Nenhum dos arquivos ou diretórios informados existe." >> ${script}.error
   	echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Nenhum dos arquivos ou diretórios informados existe.\"}}" >> ${script}.txt
		exit 127
	fi 
  
 	rm ${script}.lock

fi
