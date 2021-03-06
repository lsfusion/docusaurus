---
title: 'Открытие формы'
---

Оператор *открытия формы* создает [действие](Actions.md), которое открывает заданную [форму](Forms.md).

### Выбор формы {#form}

Кроме явного указания формы, которую необходимо открыть, в платформе также существует возможность открыть форму [выбора / редактирования](Interactive_view.md#edtClass) объектов заданного класса. В этом случае достаточно указать соответствующую опцию и вместо формы задать пользовательский класс, форму выбора / редактирования которого надо вызвать.

### Выбор представления

При открытии формы необходимо определить, какой именно из видов [представления](Form_views.md) будет использован для отображения формы:

-   [В интерактивном представлении (`SHOW`, `DIALOG`)](In_an_interactive_view_SHOW_DIALOG.md)
-   В статичном представлении :
    -   [В печатном представлении (`PRINT`)](In_a_print_view_PRINT.md)
    -   [В структурированном представлении (`EXPORT`, `IMPORT`)](In_a_structured_view_EXPORT_IMPORT.md)

### Передача объектов {#params}

При открытии формы для любого ее объекта можно передать значение из контекста вызова, которое в зависимости от представления будет использовано следующим образом:

-   В интерактивном представлении - переданное значение установлено в качестве [текущего](Form_structure.md#currentObject) объекта.
-   В статичном представлении - будет установлен дополнительный [фильтр](Form_structure.md#filters): объект должен быть [равен](Comparison_operators_=_etc.md) переданному значению.

По умолчанию все передаваемые значения объектов должны быть определены (не `NULL`), в противном случае действие не выполнится и просто передаст управление следующему за ним действию. Впрочем, в интерактивном представлении такое поведение разработчик может изменить при помощи соответствующей опции (то есть разрешив `NULL` значения). В этом случае (как и в случае когда объект вообще не передается) в качестве текущего объекта будет выбран [объект по умолчанию](Interactive_view.md#defaultobject). 


:::info
Стоит отметить, что передача объектов в интерактивном представлении по сути эквивалентна выполнению операции [поиска объектов](Search_SEEK.md) сразу после открытия формы. При этом переданные объекты являются объектами поиска, а [направление поиска](Search_SEEK.md#direction) определяется типом объекта по умолчанию (`PREV` при этом эквивалентен `FIRST`).
:::
