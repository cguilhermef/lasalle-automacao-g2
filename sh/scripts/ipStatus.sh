#!/bin/bash

path=/www/g2/sh/scripts/
script=${path}ipStatus

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

  ping -c2 192.168.0.12 > ${script}.tmp 2>&1
  lost=`cat ${script}.tmp | tail -n2 | head -n1 | cut -d\, -f3 | cut -d\  -f2 | sed 's/[^0-9 \.]//g'`
  latencyAVG=`cat ${script}.tmp | tail -n1 | cut -d= -f2 | cut -d\/ -f2`
  
  echo -e "{\"exitCode\":0, \"content\":{\"ip\":\"$1\", \"lost\":$lost, \"latency\":$latencyAVG }}" >> ${script}.txt  
 
  rm ${script}.tmp 
  rm ${script}.lock
  exit

fi
