---
title: 'Представления формы'
---

Способы представления [формы](Forms.md) пользователю можно классифицировать следующим образом:

#### [Интерактивное](Interactive_view.md)

Представление, в котором пользователь может взаимодействовать с открытой формой: выбирать текущие объекты, вызывать [действия](Actions.md), изменять [первичные свойства](Data_properties_DATA.md) и так далее. Данные, как правило, читаются по мере необходимости в зависимости от действий пользователя. Именно это представление (вместе с [программным интерфейсом](Integration.md)) отвечает за ввод информации в систему.

#### [Статичное](Static_view.md)

В этом представлении на момент [открытия формы](Open_form.md) читаются сразу все ее данные, после чего эти данные преобразуются / передаются клиенту. Обратная связь при таком способе представления отсутствует.


:::info
По умолчанию преобразование, в зависимости от особенностей реализации, может осуществляться как на сервере (до передачи клиенту), так и непосредственно на самом клиенте.
:::

С точки зрения потоков данных интерактивное представление является внутренним, то есть данные остаются внутри сервера/родного клиента, а статичное - внешним, данные преобразуются и передаются подсистеме работы с отчетами, или операционной системе в виде файлов различных форматов. 

### Графическое представление {#graphic}

Часть представлений являются *графическими*, то есть для их отображения нужно расположить считанные данные в двухмерном пространстве: бумаге или экране устройства. Соответственно для этих представлений можно / нужно задавать дизайн:

-   [Дизайн формы](Form_design.md) - для [интерактивного](Interactive_view.md) представления.
-   [Дизайн отчетов](Report_design.md) - для [печатного](Print_view.md) представления.

### Стек

import FormPresentationRuSvg from './images/FormPresentationRu.svg';

<FormPresentationRuSvg />
