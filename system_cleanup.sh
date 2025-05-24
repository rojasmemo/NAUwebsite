#!/bin/bash

echo "Iniciando limpieza del sistema..."

# Actualizar la lista de paquetes
echo "Actualizando lista de paquetes..."
sudo apt update

# Limpiar paquetes innecesarios
echo "Limpiando paquetes no necesarios..."
sudo apt autoremove -y
sudo apt autoclean
sudo apt clean

# Limpiar la papelera
echo "Vaciando la papelera..."
rm -rf ~/.local/share/Trash/*

# Limpiar archivos temporales
echo "Limpiando archivos temporales..."
sudo rm -rf /tmp/*
sudo rm -rf /var/tmp/*

# Limpiar el cache de thumbnails
echo "Limpiando cache de miniaturas..."
rm -rf ~/.cache/thumbnails/*

# Limpiar registros antiguos
echo "Limpiando registros antiguos..."
sudo journalctl --vacuum-time=7d

# Limpiar carpeta .cursor
echo "Limpiando carpeta .cursor no utilizada..."
rm -rf ~/.cursor

echo "¡Limpieza completada!"
