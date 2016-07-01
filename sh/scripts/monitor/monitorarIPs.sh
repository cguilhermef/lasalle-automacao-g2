#!/bin/bash
#Buscar status de endereços de IP.
path=/www/g2/sh/scripts/monitor/
script=${path}monitorarIPs

unset RESULT
unset DATA

#DATA=$(date +%d-%m-%Y)
DATA=$(date '+%s'000)

if [ -e ${script}.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    echo -e "{\"exitCode\":500, \"content\":{\"message\":\"Já existe um processo em andamento.\"}}" >> ${script}.txt
    exit 126 
                                 #126 " Command invokend cannot execute" 
else
                                           #se não houver
    touch ${script}.lock     #cria o arquivo de .lock
  
    if [ -e ${script}.txt ]   # testa se o arquivo existe, se for positivo remove o mesmo
    then  

    	rm ${script}.txt         #remove o .txt de saída de alguma execução anterior

    fi

						
		for i in `cat ${path}ipmonitor.txt`  # Deve ser passado os endereços de ip no arquivo ipmonitor.txt para que seja realizado o monitoramento
		do
			ping -q -c1 $i > /dev/null

			if [ $? -eq 0 ]
			then
				echo "$i true" >> ${path}logip_${DATA}.txt # Arquivo onde será gravado o retorno da consulta.
			else
				echo "$i false" >> ${path}logip_${DATA}.txt # Arquivo onde será gravado o retorno da consulta.
			fi
		done
		
		count=`cat ${path}logip_${DATA}.txt | wc -l`

		echo -e "{\"exitCode\":0,
							\"content\": {
								\"log\":[" >> ${script}.txt
					
								cat ${path}logip_${DATA}.txt | while read line
								do
									echo -e "{
														\"host\":\"`echo $line | awk '{ print $1 }'`\",
														\"sucesso\":`echo $line | awk '{ print $2 }'`,
														\"data\":`echo ${DATA}`
													 }" >> ${script}.txt
									count=$((count-1))
									if [ $count -gt 0 ]
									then
										echo "," >> ${script}.txt
									fi
								done

		echo -e "]}}" >> ${script}.txt
		

  rm ${script}.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi
