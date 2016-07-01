#!/bin/bash
path=/www/g2/sh/scripts/monitor/
script=${path}logCompleto

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

		if [ -e ${script}.tmp ]
		then
			rm ${script}.tmp
		fi
		if [ -e ${script}.tmp2 ]
		then
			rm ${script}.tmp2
		fi


#	for ip in `cat ${path}ipmonitor.txt`

#		for i in `cat ${path}portmonitor.txt`  # Deve ser passado os endereços de porta no arquivo portmonitor.txt para que seja realizado o monitoramento

	ls -l ${path} | grep logporta_ | awk '{print $9 }' | while read logPorta
	do
		cat "${path}${logPorta}" >> ${script}.tmp
	done
	ls -l ${path} | grep logip_ | awk '{print $9 }' | while read logIp
	do
		cat "${path}${logIp}" >> ${script}.tmp2
	done
	
#	count=`cat ${path}logporta_${DATA}.txt | wc -l`

#		echo -e "{\"exitCode\":0,
#							\"content\": {
#								\"log\":[" >> ${script}.txt
#					
#								cat ${path}logporta_${DATA}.txt | while read line
#								do
#									echo -e "{
#														\"host\":\"`echo $line | awk '{ print $1 }'`\",
#														\"porta\":\"`echo $line | awk '{ print $2 }'`\",
#														\"sucesso\":`echo $line | awk '{ print $3 }'`,
#														\"data\":`echo ${DATA}`
#													 }" >> ${script}.txt
#									count=$((count-1))
#									if [ $count -gt 0 ]
#									then
#										echo "," >> ${script}.txt
#									fi
#								done

#		echo -e "]}}" >> ${script}.txt
#		

  rm ${script}.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi
