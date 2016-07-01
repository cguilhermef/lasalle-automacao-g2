#!/bin/bash
# Lista as portas adicionadas no monitoramento
path=/www/g2/sh/scripts/monitor/
script=${path}listarPortas


if [ -e ${script}.lock ]
then
  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Há um processo em andamento.\"}}" > ${script}.txt
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

	count=`cat ${path}portmonitor.txt | wc -l`
	
	echo -e	"{
						\"exitCode\": 0,
						\"content\": {
													\"portas\":[" >> ${script}.txt

	cat ${path}portmonitor.txt | while read host
	do
		echo -e "\"$host\"" >> ${script}.txt
		count=$((count - 1))
		if [ $count -gt 0 ]
		then
			echo "," >> ${script}.txt
		fi
	done
	
	echo "]}}" >> ${script}.txt
	

  rm ${script}.lock           # após a execução, remove o .lock

  exit                                                 # isso registra um exit code 0, ou seja,
fi                                                    #finalizado sem erros.
