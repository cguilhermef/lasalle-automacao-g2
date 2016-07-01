#!/bin/bash

path=/www/g2/sh/scripts/backup/
targetPath=/www/g2/backups/
script=${path}executarBackup


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

  if [ -z $3 ]
	then
    echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Deve ser informado ao menos um item.\"}}" >> ${script}.txt
	fi

  ipOrigem=$1
  ipDestino=$2
  itens=`echo $* | cut -d\  -f3-`

  #executa a compactação no host que origina os arquivos de backup
  ssh wux@${ipOrigem} "${path}prepararBackup.sh $itens"
  #verifica se o "prepararBackup.sh" gerou algum arquivo de saída de erro
  houveErroPreparo=`ssh wux@${ipOrigem} "ls ${path} | grep -c \"prepararBackup.error\""`

	if [ $houveErroPreparo -eq 0 ]
	then
    #sem erros, obtem o nome do arquivo de backup gerado
		arquivo=`ssh wux@${ipOrigem} "ls ${path}temp/*.tar" | cut -d_ -f2`

		if [ $? -ne 0 ]
		then
      #caso não encontre nenhum arquivo na pasta temporária no host de origem, prepara a resposta de erro
    	echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao preparar os arquivos na origem.\"}}" >> ${script}.txt
		fi

  	if [ $ipOrigem != $ipDestino ]
		then
      #se a origem e o destino forem diferentes, executa o script que
      #moverá os arquivos da origem para o destino
      #temporária para  apasta final /www/g2/backups
    	${path}moverBackup.sh $ipOrigem $ipDestino

			if [ $? -ne 0 ]
			then
    	 echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao mover o backup, da origem para o destino.\"}}" >> ${script}.txt
			fi
		else
      #se a origem e o destino forem os mesmo, apenas move o arquivo da pasta
      #temporária para  apasta final /www/g2/backups
    	ssh wux@${ipOrigem} "sudo mv ${path}temp/*.tar ${targetPath}"
			if [ $? -ne 0 ]
			then
				ssh wux@${ipOrigem} "echo 'Ocorreu erro ao mover o arquivo de backup para a pasta final' >> ${path}moverBackup.error"
    		echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreu um erro ao mover o backup, da pasta temporária para a pasta final.\"}}" >> ${script}.txt
			fi

		fi


  	houveErroMover=`ssh wux@${ipOrigem} "ls ${path} | grep -c \"moverBackup.error\""`

		if [ $houveErroMover -eq 0 ]
  	then
   		dataExecucao=`date +%s000`
	  	echo -e "
	{
		\"exitCode\":0,
		\"content\":
			{
				\"message\":\"Backup realizado com sucesso!\",
				\"ipOrigem\":\"$ipOrigem\",
				\"ipDestino\":\"$ipDestino\",
				\"arquivoGerado\":\"$arquivo\",
				\"dataExecucao\":\"$dataExecucao\"
			}
	} " >> ${script}.txt

			echo "$dataExecucao $ipOrigem $ipDestino $arquivo" >> ${script}.log

		else
 	 	echo -e "{\"exitCode\":500,\"content\":{\"message\":\"Ocorreram erros durante o process.\"}}" >> ${script}.txt
		fi
  	rm ${script}.lock
	else # se houve erro na preparacao
		msgErro=`ssh wux@${ipOrigem} "cat ${path}prepararBackup.error"`
 	 	echo -e "{\"exitCode\":500,\"content\":{\"message\":\"$msgErro\"}}" >> ${script}.txt
  	rm ${script}.lock
  	exit
	fi
fi
