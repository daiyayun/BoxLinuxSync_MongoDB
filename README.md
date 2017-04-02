# BoxLinuxSync_MongoDB
L'étape de préparation: 
utiliser le protocole WebDav pour monter l'espace Box à un répertoire dans le serveur.

Sync.js: une fonction pour synchoniser le dossier box avec la database.
Les paramètres: dir(l'adresse du répertoire pour le montage de l'espace Box), url(la base de données où on fait la synchronisation)
par example: dir = '/home/yayun/box/docs', url = 'mongodb://localhost:27017/grifs'
    
testTimer,js: appeler la fonction de synchronisation périodiquement

run_server.sh: il faut l'ajouter dans le répertoire /etc/init.d pour que le service marche automatiquement au démarrage du serveur.
