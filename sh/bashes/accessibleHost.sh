#!/bin/bash

nmap -sP 10.0.0.* | grep "report for" | cut -d\  -f5 | while read ip
do
  echo `nmblookup -A $ip | awk NR==2 | awk '{ print $1; }'`
done
#ping_pesq=`ping -q -c1 $1 | grep received | cut -d " " -f 4`
