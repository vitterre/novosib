---
layout: doc
---

# Задание 7
Настройте подключение по SSH для удалённого конфигурирования устройства HQ-SRV по порту 2222. Учтите, что вам необходимо перенаправить трафик на этот порт посредством контроля трафика.

### На всех устройствах
Правило проброса портов
```bash
iptables -t nat -A PREROUTING -p tcp --dport 2222 -d 192.168.100.2 -j DNAT --to-destination 192.168.100.2:22 
```

Правило запрета для доступа по порту 22 на HQ-SRV 
```bash
iptables -A FORWARD -p tcp --dport 22 -d 192.168.100.2 -m conntrack ! --ctstate DNAT -j DROP

iptables -S 
iptables -t nat -S 
```

Для сохранения правил:
```bash
systemctl enable --now iptables 
iptables-save > /etc/sysconfig/iptables 
```

```bash
ssh admin@192.168.100.1 -p 22 
ssh admin@192.168.100.2 -p 22 
ssh admin@192.168.100.2 -p 2222 
```
