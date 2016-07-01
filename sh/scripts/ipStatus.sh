#!/bin/bash

path=/www/g2/sh/scripts/
script=${path}ipStatus

if [ -e ${script}.lock ]
then
  exit 126
else
  
  touch ${script}.lock
  
  unset latencia
  unset perda
  unset ativo
  

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
    echo -e "{\"exitCode\":500, \"message\":\"Deve ser informado um IP!\"}" >> ${script}.txt  
    rm ${script}.lock
    exit
  fi

  ping -c2 $1 > ${script}.tmp 2>&1
  result=$?

  if [ $result -eq 0 ]
  then
    perda=`cat ${script}.tmp | tail -n2 | head -n1 | cut -d\, -f3 | cut -d\  -f2 | sed 's/[^0-9 \.]//g'`
    latencia=`cat ${script}.tmp | tail -n1 | cut -d= -f2 | cut -d\/ -f2`
    ativo=true
  else
    ativo=false
    latencia=null
    perda=null
  fi
	
	ssh -o StrictHostKeyChecking=no wux@$1 "ls /www/g2/ >> /dev/null"

  echo -e "{\"exitCode\":0, \"content\":{\"ip\":\"$1\", \"perda\":$perda, \"latencia\":$latencia,\"ativo\":$ativo }}" >> ${script}.txt  
 
  rm ${script}.tmp 
  rm ${script}.lock
  exit

fi
