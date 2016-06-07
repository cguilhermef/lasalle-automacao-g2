#!/bin/bash
path_scripts=./sh/scripts/

if [ -e ${path_scripts}accessibleHost.txt ]
then
  rm ${path_scripts}accessibleHost.txt 
fi

wanted=`echo $1 | tr '[:upper:]' '[:lower:]'`

nmap -sP 10.0.0.* | grep "report for" | cut -d\  -f5 | while read ip
do
  finded=`nmblookup -A $ip | awk NR==2 | awk '{ print $1; }' | tr [:upper:] [:lower:]`
  if [ $finded == $wanted ]
  then
    echo -e "{\"ip\":\""$ip"\", \"status\":\"up\"}" > ${path_scripts}accessibleHost.txt
  fi
done

if [ ! -e ${path_scripts}accessibleHost.txt ]
then
 echo -e "{\"ip\":\"null\", \"status\":\"down\"}" > ${path_scripts}accessibleHost.txt
fi
exit 1
