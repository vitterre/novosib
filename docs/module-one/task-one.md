---
layout: doc
---

# Задание 1
Выполните базовую настройку всех устройств.

## a. Присвоить имена в соответствии с топологией

**На ISP**
```bash
hostnamectl set-hostname isp; exec bash
```

**На HQ-R**
```bash
hostnamectl set-hostname hq-r.hq.work; exec bash
```
**На HQ-SRV**
```bash
hostnamectl set-hostname hq-srv.hq.work; exec bash
```
**На BR-R**
```bash
hostnamectl set-hostname br-r.branch.work; exec bash
```

**На BR-SRV**
```bash
hostnamectl set-hostname br-srv.branch.work; exec bash
```

## b. Рассчитайте  IP-адресацию  IPv4  и  IPv6
Необходимо  заполнить  таблицу  №1,  чтобы эксперты могли проверить ваше рабочее место.

Таблица №1
| Имя устройства | IPv4                   | IPv6            |
| -------------- | ---------------------  | --------------- |
| CLI            | DHCP провайдера (inet) |                 |
| ISP            | DHCP провайдера (inet) |                 |
|                | 10.10.10.1/30 (HQ-ISP) | 2001:DE:1::1/64 |
|                | 10.10.20.1/30 (BR-ISP) | 2001:DE:2::1/64 |
| HQ-R           | 10.10.10.2/30 (HQ-ISP) | 2001:DE:1::2/64 |
|                | 192.168.100.1/26 (HQ)  | 2001:DE:3::1/64 |
| HQ-SRV         | 192.168.100.2/26 (HQ)  | 2001:DE:3::2/64 |
| BR-R           | 10.10.20.2/30 (BR-ISP) | 2001:DE:2::2/64 |
|                | 192.168.200.1/28 (BR)  | 2001:DE:4::1/64 |
| BR-SRV         | 192.168.200.2/28 (BR)  | 2001:DE:4::2/64 |
| HQ-CLI         |                        |                 |
| HQ-AD          |                        |                 |

## c. Пул адресов для сети офиса BRANCH - не более 16

## d. Пул адресов для сети офиса HQ - не более 64

## Решение

### На ISP
Копируем каталог с настройками сетевого интерфейса `enp0s3` в каталог для сетевого интерфейса `enp0s8`
```bash
cp –r /etc/net/ifaces/enp0s3/ /etc/net/ifaces/enp0s8/
```

Открываем на редактирование файл `/etc/net/ifaces/enp0s8/options`
```bash
vim /etc/net/ifaces/enp0s8/options
```

Меняем параметр `BOOTPROTO`, который отвечает за способ получения сетевой картой сетевого адреса, вместо значения `dhcp` указываем `static`. Копируем каталог с настройками сетевого интерфейса `enp0s8` в каталог для сетевого интерфейса `enp0s9`
```bash
cp –r /etc/net/ifaces/enp0s8/ /etc/net/ifaces/enp0s9/
```

Если что, вот полный конфиг `BOOTPROTO` для ISP
```bash
NM_CONTROLLED=no
SYSTEMD_CONTROLLED=yes
DISABLED=no
TYPE=eth
CONFIG_WIRELESS=no
BOOTPROTO=static
SYSTEMD_BOOTPROTO=static
CONFIG_IPV4=yes
ONBOOT=yes
```

Для enp0s8
```bash
NM_CONTROLLED=no
SYSTEMD_CONTROLLED=yes
DISABLED=no
TYPE=eth
CONFIG_WIRELESS=no
BOOTPROTO=dhcp
SYSTEMD_BOOTPROTO=dhcp4
CONFIG_IPV4=yes
ONBOOT=yes
```

Назначаем IP-адреса на интерфейсы `enp0s8` и `enp0s9`
```bash
echo 10.10.10.1/30 > /etc/net/ifaces/enp0s8/ipv4address
echo 10.10.20.1/30 > /etc/net/ifaces/enp0s9/ipv4address
```

Для применения настроек необходимо перезапустить сеть
```bash
systemctl restart network
```

**Для доступа в интернет устройств HQ-R и BR-R**
```bash
iptables -t nat -A POSTROUTING -o enp0s3 -j MASQUERADE
```

### На HQ-R
Открываем на редактирование файл `/etc/net/ifaces/enp0s3/options`
```bash
vim /etc/net/ifaces/enp0s3/options
```

Меняем параметр `BOOTPROTO`, который отвечает за способ получения сетевой картой сетевого адреса, вместо значения `dhcp` указываем `static`. Копируем каталог с настройками сетевого интерфейса `enp0s3` в каталог для сетевого интерфейса `enp0s8`
```bash
cp –r /etc/net/ifaces/enp0s3/ /etc/net/ifaces/enp0s8/
```

Если что, вот полный конфиг `BOOTPROTO` для HQ-R
```bash
NM_CONTROLLED=no
SYSTEMD_CONTROLLED=yes
DISABLED=no
TYPE=eth
CONFIG_WIRELESS=no
BOOTPROTO=static
SYSTEMD_BOOTPROTO=static
CONFIG_IPV4=yes
ONBOOT=yes
```

Для enp0s8
```bash
NM_CONTROLLED=no
SYSTEMD_CONTROLLED=yes
DISABLED=no
TYPE=eth
CONFIG_WIRELESS=no
BOOTPROTO=dhcp
SYSTEMD_BOOTPROTO=dhcp4
CONFIG_IPV4=yes
ONBOOT=yes
```

Назначаем IP-адреса на интерфейсы `enp0s3` и `enp0s8`
```bash
echo 10.10.10.2/30 > /etc/net/ifaces/enp0s3/ipv4address
echo 192.168.100.1/26 > /etc/net/ifaces/enp0s8/ipv4address
```

Назначаем шлюз по умолчанию, DNS-сервер и домен поиска на интерфейс `enp0s3` (он подключен к ISP)
```bash
echo default via 10.10.10.1 > /etc/net/ifaces/enp0s3/ipv4route
echo nameserver 1.1.1.1  > /etc/net/ifaces/enp0s3/ resolv.conf
echo search hq.work branch.work  >> /etc/net/ifaces/enp0s3/ resolv.conf
```

Для применения настроек необходимо перезапустить сеть
```bash
systemctl restart network
```

### На HQ-SRV
Назначаем IP-адреса на интерфейс `enp0s3`
```bash
echo 192.168.100.2/26 > /etc/net/ifaces/enp0s3/ipv4address
```

Назначаем шлюз по умолчанию, DNS-сервер и домен поиска на интерфейс
```bash
echo default via 192.168.100.1 > /etc/net/ifaces/enp0s3/ipv4route
echo nameserver 1.1.1.1  > /etc/net/ifaces/enp0s3/resolv.conf
echo search hq.work branch.work  >> /etc/net/ifaces/enp0s3/ resolv.conf
```

Для применения настроек необходимо перезапустить сеть
```bash
systemct restart network
```

### На BR-R
Открываем на редактирование файл `/etc/net/ifaces/enp0s3/options`
```bash
vim /etc/net/ifaces/enp0s3/options
```

Меняем параметр `BOOTPROTO`, который отвечает за способ получения сетевой картой сетевого адреса, вместо значения `dhcp` указываем `static`. Копируем каталог с настройками сетевого интерфейса `enp0s3` в каталог для сетевого интерфейса `enp0s8`
```bash
cp –r /etc/net/ifaces/enp0s3/ /etc/net/ifaces/enp0s8/
```

Если что, вот полный конфиг `BOOTPROTO` для BR-R
```bash
NM_CONTROLLED=no
SYSTEMD_CONTROLLED=yes
DISABLED=no
TYPE=eth
CONFIG_WIRELESS=no
BOOTPROTO=static
SYSTEMD_BOOTPROTO=static
CONFIG_IPV4=yes
ONBOOT=yes
```

Для enp0s8
```bash
NM_CONTROLLED=no
SYSTEMD_CONTROLLED=yes
DISABLED=no
TYPE=eth
CONFIG_WIRELESS=no
BOOTPROTO=dhcp
SYSTEMD_BOOTPROTO=dhcp4
CONFIG_IPV4=yes
ONBOOT=yes
```

Назначаем IP-адреса на интерфейсы `enp0s3` и `enp0s8`
```bash
echo 10.10.20.2/30 > /etc/net/ifaces/enp0s3/ipv4address
echo 192.168.200.1/28 > /etc/net/ifaces/enp0s8/ipv4address
```

Назначаем шлюз по умолчанию, DNS-сервер и домен поиска на интерфейс `enp0s3` (он подключен к ISP)
```bash
echo default via 10.10.20.1 > /etc/net/ifaces/enp0s3/ipv4route
echo nameserver 1.1.1.1  > /etc/net/ifaces/enp0s3/resolv.conf
echo search hq.work branch.work  >> /etc/net/ifaces/enp0s3/resolv.conf
```

Для применения настроек необходимо перезапустить сеть
```bash
systemctl restart network
```

### На BR-SRV

Меняем параметр `BOOTPROTO`, который отвечает за способ получения сетевой картой сетевого адреса, вместо значения `dhcp` указываем `static`. Копируем каталог с настройками сетевого интерфейса `enp0s3` в каталог для сетевого интерфейса `enp0s8`
```bash
cp –r /etc/net/ifaces/enp0s3/ /etc/net/ifaces/enp0s8/
```

Если что, вот полный конфиг `BOOTPROTO` для BR-SRV
```bash
NM_CONTROLLED=no
SYSTEMD_CONTROLLED=yes
DISABLED=no
TYPE=eth
CONFIG_WIRELESS=no
BOOTPROTO=static
SYSTEMD_BOOTPROTO=static
CONFIG_IPV4=yes
ONBOOT=yes
```

Для enp0s8
```bash
NM_CONTROLLED=no
SYSTEMD_CONTROLLED=yes
DISABLED=no
TYPE=eth
CONFIG_WIRELESS=no
BOOTPROTO=dhcp
SYSTEMD_BOOTPROTO=dhcp4
CONFIG_IPV4=yes
ONBOOT=yes
```

Назначаем IP-адреса на интерфейс `enp0s3`
```bash
echo 192.168.200.2/28 > /etc/net/ifaces/enp0s3/ipv4address
```

Назначаем шлюз по умолчанию, DNS-сервер и домен поиска на интерфейс 

```bash
echo default via 192.168.200.1 > /etc/net/ifaces/enp0s3/ipv4route
echo nameserver 1.1.1.1  > /etc/net/ifaces/enp0s3/resolv.conf
echo search hq.work branch.work  >> /etc/net/ifaces/enp0s3/resolv.conf
```

Для применения настроек необходимо перезапустить сеть
```bash
systemctl restart network
```
