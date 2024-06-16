---
layout: doc
---

# Задание 4
Настройте локальные учетные записи на всех устройствах в соответствии с таблицей.

Таблица №2
| Учётная запись | Пароль   | Примечание       |
| -------------- | ------   | ---------------- |
| Admin          | P@ssword | CLI HQ-SRV HQ-R  |
| Branch admin   | P@ssword | BR-SRV BR-R      |
| Network admin  | P@ssword | HQ-R BR-R BR-SRV |

**На CLI, HQ-SRV, HQ-R**
```bash
useradd admin && passwd admin 
```

**На BR-SRV, BR-R**
```bash
useradd branch_admin && passwd branch_admin  
```

**На HQ-R, BR-R, BR-SRV**
```bash
useradd network_admin && passswd network_admin  
```