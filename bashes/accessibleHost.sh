#!/bin/bash

wanted=`echo $1 | tr '[:upper:]' '[:lower:]'`

nmap -sP 10.0.0.* | grep "report for" | cut -d\  -f5 | while read ip
do
  finded=`nmblookup -A $ip | awk NR==2 | awk '{ print $1; }' | tr [:upper:] [:lower:]`
  if [ $finded == $wanted ]
  then
    exit 1
  fi
done

