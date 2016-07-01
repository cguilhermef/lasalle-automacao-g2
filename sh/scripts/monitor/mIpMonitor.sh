#!/bin/bash
#Buscar status de endereços de IP.
unset RESULT
unset DATA

#DATA=$(date +%d-%m-%Y)
DATA=$(date '+%d%m%y_%H-%M')

if [ -e mIpMonitor.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch mIpMonitor.lock     #cria o arquivo de .lock
  
    if [ -e mIpMonitor.txt ]   # testa se o arquivo existe, se for positivo remove o mesmo
    then  

    rm mIpMonitor.txt         #remove o .txt de saída de alguma execução anterior

    fi

for i in `cat ipmonitor.txt`  # Deve ser passado os endereços de ip no arquivo ipmonitor.txt para que seja realizado o monitoramento
do
ping -q -c1 $i > /dev/null

if [ $? -eq 0 ]
then
echo $i "Sucesso" >> logip_$DATA.txt # Arquivo onde será gravado o retorno da consulta.
else
echo $i "Insucesso" >> logip_$DATA.txt # Arquivo onde será gravado o retorno da consulta.
fi
done



  RESULT=$(cat logip_$DATA.txt) # somente para teste de debug
  echo "$RESULT"
  rm mIpMonitor.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi
