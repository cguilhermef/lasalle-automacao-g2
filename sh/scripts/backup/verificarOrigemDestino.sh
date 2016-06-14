#!/bin/bash

path=/www/g2/sh/scripts/backup/
script=${path}verificarOrigemDestino

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
  
  if [ -z $1 ] || [ -z $2 ]
  then
    echo -e "{\"exitCode\":500, \"message\":\"Deve ser informado um ip de origem e um ip de destino!\"}" >> ${script}.txt  
    rm ${script}.lock
    exit
  fi

  #testa se as portas 22 - do ssh - estão disponíveis

  nc -z -w 4 $1 22
  origem=$?
  nc -z -w 4 $2 22
  destino=$?

  if [ $origem -eq 0 ]
  then
    origem=true
  else
    origem=false
  fi
  if [ $destino -eq 0 ]
  then
    destino=true
  else
    destino=false
  fi

  echo -e "{\"exitCode\":0,\"content\":{\"origem\":$origem,\"destino\":$destino}}" >> ${script}.txt
 
  rm ${script}.lock
  exit

fi
