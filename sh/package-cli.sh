#!/bin/bash

path=/www/g2/sh/
script=${path}package-cli

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

	rm ${script}.lock

	exit
fi
