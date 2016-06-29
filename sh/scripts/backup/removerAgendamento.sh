#!/bin/bash

path=/www/g2/sh/scripts/backup/
script=${path}removerAgendamento


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
  if [ -e ${script}.tmp2 ]
  then 
    rm ${script}.tmp2
  fi
	identificacao=`echo "$1" | sed 's/#//g'`
	crontab -l | sed /$identificacao/d >> ${script}.tmp
	crontab ${script}.tmp
#cat ${script}.tmp
  echo -e "{\"exitCode\":0,\"content\":{\"message\":\"Removido com sucesso!\"}}" >> ${script}.txt
  rm ${script}.lock
  exit
fi
