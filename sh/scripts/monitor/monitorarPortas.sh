#!/bin/bash
#Buscar status de Porta por IP. Deve ser informado as portas a serem testadas.
#O Script recebe o Enderço IP por parametro. As portas a serem monitoradas devem estar no arquivo portmonitor.txt
path=/www/g2/sh/scripts/monitor/
script=${path}monitorarPortas

unset RESULT
unset DATA
unset IPENTRADA

#IPENTRADA=$1
#DATA=$(date +%d-%m-%Y)
DATA=$(date '+%s'000)
if [ -e ${script}.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch ${script}.lock     #cria o arquivo de .lock
  
    if [ -e ${script}.txt ]   # testa se o arquivo existe, se for positivo remove o mesmo
    then  

    rm ${script}.txt         #remove o .txt de saída de alguma execução anterior

    fi

	for ip in `cat ${path}ipmonitor.txt`
	do

		for i in `cat ${path}portmonitor.txt`  # Deve ser passado os endereços de porta no arquivo portmonitor.txt para que seja realizado o monitoramento
		do
			#nc -z -w 5 $ip $i > /dev/null

			netstat -a -n | grep -E "udp|tcp" | grep "$ip" | grep -w "$i" > ${path}tempport.txt

			if [ $? -eq 0 ]
			then
				echo "$ip $i true" >> ${path}logporta_${DATA}.txt # Arquivo onde será gravado o retorno da consulta.
			else
				echo "$ip $i false" >> ${path}logporta_${DATA}.txt # Arquivo onde será gravado o retorno da consulta.
			fi
		done
	done
	
	count=`cat ${path}logporta_${DATA}.txt | wc -l`

		echo -e "{\"exitCode\":0,
							\"content\": {
								\"log\":[" >> ${script}.txt
					
								cat ${path}logporta_${DATA}.txt | while read line
								do
									echo -e "{
														\"host\":\"`echo $line | awk '{ print $1 }'`\",
														\"porta\":\"`echo $line | awk '{ print $2 }'`\",
														\"sucesso\":`echo $line | awk '{ print $3 }'`,
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
