#!/bin/bash

path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}listarAgendamentos


if [ -e ${script}.lock ]
then
  echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Há um processo em andamento.\"}}" >> ${script}.txt
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
	
	crontab -l | sed 's/\*/A/g' > ${script}.tmp

	#	conta quantos agendamentos de backup existem feitos
	count=`cat ${script}.tmp | grep executarBackup -c`
  

  #inicia a saida formatada em JSON
	echo -e "
	{
		\"exitCode\":0,
		\"content\":
			{
				\"agendamentos\": [ " >> ${script}.txt
	#concatena na saida formatada cada linha do backup, como um novo objeto em notação JSON
	cat ${script}.tmp | while read agendamento
	do

		identificacao=`echo ${agendamento##* }`

		echo "{
						\"identificacao\": \"`echo "$identificacao"  | sed 's/#//'`\",
						\"minuto\":\"`echo ${agendamento} | awk '{print $1;}'`\",
						\"hora\":\"`echo ${agendamento} | awk '{print $2;}'`\",
						\"dia\":\"`echo ${agendamento} | awk '{print $3;}'`\",
						\"mes\":\"`echo ${agendamento} | awk '{print $4;}'`\",
						\"diaDaSemana\":\"`echo ${agendamento} | awk '{print $5;}'`\",
						\"backup\": {
							\"ipOrigem\":\"`echo ${agendamento} | awk '{print $7;}'`\",
							\"ipDestino\":\"`echo ${agendamento} | awk '{print $8;}'`\",
							\"itens\":[" >> ${script}.txt
						
						itens=`echo $agendamento | cut -d\  -f9- | sed "s/$identificacao/\ /g"`
  	        count2=`echo $itens | wc -w`
						for item in $itens
						do
							echo -e "\"${item}\"" >> ${script}.txt
							count2=$((count2 - 1))
							if [ $count2 -gt 0 ]
							then
								echo , >> ${script}.txt
							fi
						done
				  	echo "]}}" >> ${script}.txt

		count=$((count -1))

		if [ $count -gt 0 ]
		then
			echo , >> ${script}.txt
		fi
	done
  
	echo -e "]}}" >> ${script}.txt
			
	rm ${script}.lock
	exit
fi
