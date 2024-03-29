---
title: 'Инструкция INDEX'
---

Инструкция `INDEX` - создание нового [индекса](Indexes.md).

### Синтаксис

```
INDEX field1, ..., fieldN;
```

Каждое поле [таблицы](Tables.md) `fieldi`, по которому должен быть построен индекс, может быть описано либо с помощью указания [свойства](Properties.md), хранящегося в этой таблице:

```
propertyId(param1, ..., paramN)
```

либо с помощью указания типизированного параметра, указывающего на соответствующее ключевое поле: 

```
param
```

### Описание

Инструкция `INDEX` добавляет в систему новый индекс по упорядоченному списку полей некоторой таблицы. Список должен содержать хотя бы одно свойство. По первому указанному свойству в списке определяется таблица, для которой должен быть построен индекс. Также по переданным этому свойству параметрам определяется соответствие параметров ключевым полям таблицы. Соответственно все остальные свойства, содержащиеся в списке, должны иметь такое же количество параметров и храниться в той же таблице, что и первое указанное свойство. Указанные в списке параметры будут соответствовать ключевым полям таблицы.

### Параметры

- `propertyId`

    [Идентификатор свойства](IDs.md#propertyid), которое должно храниться в таблице, для которой создается индекс.

- `param1, ..., paramN`

    Список параметров свойства. Каждый элемент списка является [типизированным параметром](IDs.md#paramid).

- `param`

    Типизированный параметр, определяющий ключевое таблицы.

### Примеры

```lsf
INDEX customer(Order o);

date = DATA DATE (Order);
INDEX date(Order o), o;

INDEX supplier(Sku s, DATE d), s, price(s, d), d;
```
