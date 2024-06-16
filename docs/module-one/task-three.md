---
layout: doc
---

# Задание 3
Настройте автоматическое распределение IP-адресов на роутере HQ-R. 

## a. Учтите, что у сервера должен быть зарезервирован адрес.
**На HQ-R**
```bash
apt-get install dhcp-server 
vim /etc/sysconfig/dhcpd 
    DHCPDARGS=ens19         - включаем интерфейс 
cp /etc/dhcp/dhcpd.conf.sample /etc/dhcp/dhcpd.conf - копируем конфиг 
vim /etc/dhcp/dhcpd.conf
------------dhcpd.conf----------------
ddns-update-style none; 
 
    subnet 192.168.100.0 netmask 255.255.255.192 { 
    option routers                  192.168.100.1; 
    option subnet-mask              255.255.255.192; 
 
    option domain-name              "hq.work"; 
    option domain-name-servers      1.1.1.1; 
 
    range dynamic-bootp 192.168.100.10 192.168.100.20; 
      default-lease-time 21600; 
      max-lease-time 43200; 
    } 
 
    host hq-srv.hq.work { 
     hardware ethernet XX:XX:XX:XX:XX:XX; - MAC адрес HQ-SRV 
     fixed-address 192.168.100.2; 
    }

dhcpd -t 
systemctl enable --now dhcpd 
systemctl status dhcpd 
```