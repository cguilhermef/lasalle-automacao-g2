#!/bin/bash
#Pesquisa nome de usuario. Esta busca nao e case sensitive. O mesmo retorna todos os usuarios que possuem parte do nome pesquisado
#se o mesmo nao for o nome de usuario completo. Parametros de entrada:  nome do usuario a ser pesquisado ou parte do nome.

unset LOGPESQ
unset RESULT
unset PESQ
unset DIRETORIO
unset SHELL
unset RESULTLOGIN
unset ULTIMOLOGIN 

LOGIN=$1

if [ -e uPesqNome.lock ]  # verifica se há um .lock para o script
then                        #se houver, encerra com código
    
    exit 126 
                                   #126 " Command invokend cannot execute" 
else                                           #se não houver
    touch uPesqNome.lock     #cria o arquivo de .lock
  
  if [ -e uPesqNome.txt ]   # testa se o arquivo existe, se for positivo remove o mesmo
  then

    rm uPesqNome.txt            #remove o .txt de saída de alguma execução anterior
  
  fi
    
  #Retorna o Usuario , diretorio e Interpretador
  #Neste filtro o sed substitui : por espaço 	     Esta busca por nome e insensitive devido ao grep -i
  LOGPESQ=$(cat /etc/passwd | cut -d ':' -f1,6,7 | grep -i $LOGIN | sed 's/:/ /g' > uPesqNome.txt)
  
  #Debug do arquivo
  RESULT=$(cat uPesqNome.txt | awk '{print $1}')
  DIRETORIO=$(cat uPesqNome.txt | awk '{print $2}') 
  SHELL=$(cat uPesqNome.txt | awk '{print $3}')
  
  
  rm uPesqNome.lock           # após a execução, remove o .lock
  exit                                                 # isso registra um exit code 0, ou seja,
                                                       #finalizado sem erros.
fi