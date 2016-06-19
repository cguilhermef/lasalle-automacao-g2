#!/bin/bash

path=/www/g2/sh/
script=${path}package-cli
pathToScripts=${path}scripts

if [ -e ${script}.lock ]
then
	exit 126
else
	
	touch ${script}.lock	

	if [ -e ${script}.tar ]
	then
		rm ${script}.tar
	fi

  tar -cf ${script}.tar --directory=${path}install install-cli.sh 
  tar -cf ${script}-scripts.tar --directory=${path} scripts/
 
  tar --concatenate --file=${script}.tar ${script}-scripts.tar
  rm ${script}-scripts.tar  
	rm ${script}.lock

	exit
fi
