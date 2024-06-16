---
layout: doc
---

# Настройка Network Manager
Более подробно про настройку сети с помощью NetworkManager можно почитать [тут](https://www.altlinux.org/NetworkManager).

Пример настройки сетевого интерфейса `enp0s3` в Network Manager, если он раньше управлялся Etcnet:
1. Внести изменения в файл `/etc/net/ifaces/enp0s3/options`:
```bash
BOOTPROTO=static
TYPE=eth
NM_CONTROLLED=yes
DISABLED=yes
CONFIG_WIRELESS=no
SYSTEMD_BOOTPROTO=static
CONFIG_IPV4=yes
SYSTEMD_CONTROLLED=no
ONBOOT=yes
CONFIG_IPV6=no
```

2. Удалить файл `/etc/net/ifaces/enp0s3/ipv4address`:
```bash
rm -rf /etc/net/ifaces/enp0s3/ipv4address
```

3. Перезапустить службы `network` NetworkManager:
```bash
systemctl restart network
systemctl restart NetworkManager
```

4. Просмотреть статус интерфейсов:
```bash
nmcli general status
STATE       CONNECTIVITY  WIFI-HW  WIFI      WWAN-HW  WWAN     
подключено  полностью     missing  включено  missing  включено
```

5. Создать новое подключение с именем `native_enp0s3` с DHCP:
```bash
nmcli connection add con-name "native_enp0s3" type ethernet ifname enp0s3
Подключение «native» (f3635967-1d55-47c9-8ed2-e68d737c572d) успешно добавлено.
```

6. Активировать подключение:
```bash
nmcli connection up native_enp0s3
Подключение успешно активировано (активный путь D-Bus: /org/freedesktop/NetworkManager/ActiveConnection/4)
```

7. Просмотреть состояние подключения:
```bash
nmcli connection show native_enp0s3
```

Если необходимо, изменить подключение `native_enp0s3` с DHCP на Static:
```bash
nmcli connection modify native_enp0s3 connection.autoconnect yes ipv4.method manual ipv4.address 192.168.0.40/24 ipv4.gateway 192.168.0.1 ipv4.dns 192.168.0.4 ipv4.dns-search test.alt
nmcli connection up native_enp0s3
```
где
* `connection.autoconnect yes` — поднимать соединение при загрузке системы;
* `ipv4.method manual` — соединение статическое;
* `ipv4.addresses` — IP-адрес и маска;
* `ipv4.gateway` — IP-адрес шлюза;
* `ipv4.dns` — IP-адрес DNS-сервера;
* `ipv4.dns-search` — домен поиска.

Содержимое конфигурационного файла `/etc/NetworkManager/system-connections/native_enp0s3.nmconnection`:
```bash
[connection]
id=native_enp0s3
uuid=bfafb5ea-6915-4f89-844c-d53b19477d80
type=ethernet
interface-name=enp0s3
timestamp=1697205960

[ethernet]

[ipv4]
address1=192.168.0.41/24,192.168.0.1
dns=192.168.0.4;
dns-search=test.alt;
method=manual

[ipv6]
addr-gen-mode=default
method=auto

[proxy]
```