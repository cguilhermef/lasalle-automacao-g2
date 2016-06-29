#!/bin/bash

path=/www/g2/sh/scripts/backup/
script=${path}agendarBackup


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

	identificacao=$1
	minuto=`echo $2 | sed 's/A/\*/'`
	hora=`echo $3 | sed 's/A/\*/'`
	dia=`echo $4 | sed 's/A/\*/'`
	mes=`echo $5 | sed 's/A/\*/'`
	diaSemana=`echo $6 | sed 's/A/\*/'`

	ipOrigem=$7
	ipDestino=$8
	itens=`echo $* | cut -d\  -f9-`

  crontab -l > ${script}.tmp
  echo "$minuto $hora $dia $mes $diaSemana ${path}executarBackup.sh $ipOrigem $ipDestino $itens #${identificacao}" >> ${script}.tmp
	crontab ${script}.tmp


  echo -e "{\"exitCode\":0,\"content\":{\"message\":\"Agendado com sucesso!\"}}" >> ${script}.txt
  rm ${script}.lock
  exit
fi
