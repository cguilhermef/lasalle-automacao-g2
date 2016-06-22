#!/bin/bash

path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}listaBackups


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
	
	#	conta quantos backups recentes foram feitos
	count=`tail -n 20 ${path}executarBackup.log | grep .tar -c`
  

  #inicia a saida formatada em JSON
	echo -e "
	{
		\"exitCode\":0,
		\"content\":
			{
				\"backups\": [ " >> ${script}.txt
	
	#concatena na saida formatada cada linha do backup, como um novo objeto em notação JSON
	tail -n 20 ${path}executarBackup.log | while read backup
	do
		echo "{
						\"dataExecucao\":\"`echo ${backup} | cut -d\  -f1`\",
						\"ipOrigem\":\"`echo ${backup} | cut -d\  -f2`\",
						\"ipDestino\":\"`echo ${backup} | cut -d\  -f3`\",
						\"arquivoGerado\":\"`echo ${backup} | cut -d\  -f4`\"
					}" >> ${script}.txt

		count=$((count -1))

		if [ $count -gt 0 ]
		then
			echo , >> ${script}.txt
		fi
	done
  
	echo -e "]}}" >> ${script}.txt
			
	rm ${script}.lock
	exit
fi
