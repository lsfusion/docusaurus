---
title: 'Предыдущее значение (PREV)'
---

Оператор *предыдущего значения* создает [свойство](Properties.md), которое возвращает значение заданного свойства на начало сессии (то есть текущее значение в базе данных без учета изменений в сессии).

:::caution
Этот оператор вычисляется по другому внутри обработки [событий](Events.md#change) : в этом случае он возвращает значение на момент предыдущего возникновения этого события (а точнее, окончания выполнения всех его обработок).
:::

### Язык

Для объявления свойства, возвращающего предыдущее значение, используется [оператор `PREV`](PREV_operator.md). 

### Примеры


```lsf
f = DATA INTEGER (A);
// выдает по очереди все изменения f(a) в сессии
messageFChanges  {
    FOR CHANGED(f(A a)) DO
        MESSAGE 'In this session f(a) changed from ' + PREV(f(a)) + ' TO ' + f(a);
}

CLASS Document;
date = DATA DATE (Document);

CLASS Article;
price = DATA NUMERIC[14,2] (Document, Article);
// записать в цену документа, последнюю использованную цену в БД
// PREV важен чтобы не учитывалась цены введенные в этом документе
// это особенно важно, если последняя использованная цена будет материализованной, тогда платформа сможет просто считать это значение из таблицы
setPrice  {
    price(Document d, Article a) <- PREV((GROUP LAST price(d, a) ORDER date(d), d));
}
```