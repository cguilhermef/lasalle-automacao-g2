#!/bin/bash

path=/www/g2/sh/scripts/
script=${path}ipStatus

echo $2
if [ -e ${script}.lock ]
then
  exit 126
else
  
  touch ${script}.lock
  
  unset latencyAVG
  unset lost

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
  lost=`cat ${script}.tmp | tail -n2 | head -n1 | cut -d\, -f3 | cut -d\  -f2 | sed 's/[^0-9 \.]//g'`
  latencyAVG=`cat ${script}.tmp | tail -n1 | cut -d= -f2 | cut -d\/ -f2`

  if [ -z $latencyAVG ]
  then
    latencyAVG=null
  fi  
  if [ -z $lost ]
  then 
    lost=null
  fi

  echo -e "{\"exitCode\":0, \"content\":{\"ip\":\"$1\", \"lost\":$lost, \"latency\":$latencyAVG }}" >> ${script}.txt  
 
  rm ${script}.tmp 
  rm ${script}.lock
  exit

fi
