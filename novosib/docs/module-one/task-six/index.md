---
layout: doc
---

# Задание 6
Составьте backup скрипты для сохранения конфигурации сетевых устройств, а именно HQ-R BR-R. Продемонстрируйте их работу.

### На HQ-R
```bash
mkdir backup 
vim backup_script.sh 
 
#!/bin/sh 
#defining variables   
NET_DIR="/etc/net/ifaces/ens18/ /etc/net/ifaces/ens19/" 
BACKUP_DIR="$HOME/backup" 
#create archive file 
tar -czf $BACKUP_DIR/net_config_$(date +"%d.%m.%y").tgz $NET_DIR

chmod +x backup_srcipt.sh       - выполнить backup_srcipt 
                                - проверить наличие архивного файла 
ssh network_admin@10.2.2.2 mkdir backup bin  - создаем каталоги на BR-R 
 
scp backup_srcipt.sh network_admin@10.2.2.2:/home/network_admin     - копируем скрипт 

```

### На BR-R
Войти под `network_admin/bin`. Выполнить `backup_script`   проверить наличие архивного файла.
