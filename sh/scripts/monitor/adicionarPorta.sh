#!/bin/bash
# Adiciona uma porta na lista de monitoradas
# $1 = ip do host
path=/www/g2/sh/scripts/monitor/
script=${path}adicionarPorta


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
	
	echo $1 >> ${path}portmonitor.txt

	echo -e "{\"exitCode\": 0, \"content\":{\"message\":\"Porta $1 adicionada com sucesso.\"}}" >> ${script}.txt

  rm ${script}.lock           # após a execução, remove o .lock

  exit                                                 # isso registra um exit code 0, ou seja,
fi                                                    #finalizado sem erros.
