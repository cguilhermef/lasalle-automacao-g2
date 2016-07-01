#!/bin/bash
#Buscar status de Porta por IP. Deve ser informado as portas a serem testadas.
#O Script recebe o Enderço IP por parametro. As portas a serem monitoradas devem estar no arquivo portmonitor.txt
unset RESULT
unset DATA
unset IPENTRADA

#IPENTRADA=$1
#DATA=$(date +%d-%m-%Y)
DATA=$(date '+%d%m%y_%H-%M')

if [ -e mPortMonitor.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch mPortMonitor.lock     #cria o arquivo de .lock
  
    if [ -e mPortMonitor.txt ]   # testa se o arquivo existe, se for positivo remove o mesmo
    then  

    rm mPortMonitor.txt         #remove o .txt de saída de alguma execução anterior

    fi

for ip in `cat ipmonitor.txt`
do

for i in `cat portmonitor.txt`  # Deve ser passado os endereços de porta no arquivo portmonitor.txt para que seja realizado o monitoramento
do
#nc -z -w 5 $ip $i > /dev/null

netstat -a -n | grep -E "udp|tcp" | grep "$ip" | grep -w "$i" > tempport.txt

if [ $? -eq 0 ]
then
echo "$ip $i Sucesso" >> logporta_$DATA.txt # Arquivo onde será gravado o retorno da consulta.
else
echo "$ip $i Insucesso" >> logporta_$DATA.txt # Arquivo onde será gravado o retorno da consulta.
fi
done

done

  RESULT=$(cat logporta_$DATA.txt) # somente para teste de debug
  echo "$RESULT"
  rm mPortMonitor.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi