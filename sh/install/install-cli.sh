#!/bin/bash

path=/www/g2/
script=${path}install-cli

if [ -e ${script}.lock ]
then
	echo
	echo "Há uma instalação em andamento ou uma instalação anterior falhou!"
	echo "[erro: .lock encontrado]"
	exit
else
  echo 
	echo "Iniciando instalação..."	
	if [ ! `compgen -u | grep wux` ]
	then
		echo "Criando usuário wux..."
		
		useradd -d /home/wux -m -g 0 -s /bin/bash wux
	  adduser wux sudo	
		mkdir -p /home/wux/.ssh
		touch /home/wux/.ssh/authorized_keys
    
		echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCcMxlLfkSI4xKm0WOP1vd6CZKrLKSgSvvaMxOtlHDx403Fjg6b/X+p5wuSzZ49WlJQO5P4YXsfLVBq+Ep41UFlt8FNl1EAQkuPAddde0+4FagQtFEyKZR5MTFpQFPQTKNspSGGjMIl4hPvoeOv+7RzGRFkewIHydmJ1XanaexSc9fPhQsTlj5qOJ9ax8d6f44Xx6zLIpVns2JZyff6E8AolvaVgVZ4ZUxyEawdWg6aApsORbM5A7NqXouXQNuQNrOOggfuEp4FFaSS0MCfhNGfFRZlqEAdcXZd3npFXLNSLE8fg2qKJRcI/5b6ilOX99y8eOuUTV6N4puHqH3IOjHp wux@192.168.0.11" >> /home/wux/.ssh/authorized_keys
		
		echo "wux ALL=NOPASSWD: ALL" >> /etc/sudoers

	else
		echo "Usuário wux... ok"
	fi
  if [ ! -d /www ]
	then
    echo -e "Criando estrutura de pastas... \c"
    mkdir -p /www/g2/sh/backups
		echo "ok!"
    echo -e "Movendo arquivos... \c"
		mv scripts /www/g2/sh/scripts
    chown -Rf wux:root /www
	fi
	echo
  echo "Instalação concluída!"
	echo	
fi
