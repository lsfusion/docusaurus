---
title: 'Интерактивное представление'
---

Форма, открытая в *интерактивном* режиме, представляет из себя графический компонент определенного [дизайна](Form_design.md), в котором пользователь может инициировать различные [события](Form_events.md), и тем самым осуществлять навигацию по объектам системы, просматривать и изменять значения [свойств](Properties.md), выполнять [действия](Actions.md) и так далее. Также для этого представления разработчику доступен [дополнительный набор операторов](Form_operators.md), позволяющий управлять открытой формой.

### Представления объектов {#objects}

В интерактивном представлении группы объектов могут отображаться в виде таблицы. Рядами в этой таблице являются наборы объектов, а, соответственно, колонками - свойства. Записи, которые будут отображаться в таблице и их порядок определяются действующими на момент отображения [фильтрами](Form_structure.md#filters) и [сортировками](Form_structure.md#sort).

Изменение [текущих значений](Form_structure.md#currentObject) объектов может происходить либо в результате выполнения действия, созданного при помощи специального оператора [поиска (`SEEK`)](Search_SEEK.md), либо в результате изменения текущего ряда, если группа объектов отображается в виде таблицы.

При отображении группы объектов в виде таблицы количество отображаемых рядов (наборов объектов) может как определяться автоматически на основе высоты видимой части таблицы, так и задаваться разработчиком явно при создании формы.

### Деревья объектов {#tree}

В платформе также существует возможность, отображать несколько групп объектов в одной таблице одновременно. Происходит это по аналогии с [иерархией групп объектов](Static_view.md#hierarchy) в статичном представлении, то есть, если у нас есть две группы `A` и `B`, то в "объединенной" таблице сначала показывается первый набор объектов из `A`, затем все наборы объектов из `B` (подходящие под фильтры), после этого второй набор объектов из `A`, затем опять все наборы объектов из `B` и так далее. При этом, крайне желательно, чтобы фильтры для `B` использовали все объекты из `A`, так как иначе теряется смысл объединения таких групп в одно дерево. Первоначально, при открытии формы в таблице, отображаются объекты только самой верхней группы объектов, но при этом слева в таблице создается специальная колонка, при помощи, которой пользователь может самостоятельно раскрывать его узлы, и тем самым просматривать только интересующие его объекты в нижних группах объектов. Еще одной функцией создаваемой колонки, является демонстрация вложенности узлов за счет табуляции элементов внутри этой колонки (это позволяет пользователю лучше понимать на каком уровне иерархии он сейчас находится).

<a className="lsdoc-anchor" id="treegroup"/>

Деревья объектов также можно использовать для отображения иерархических данных (например классификаторов). В этом случае потомками набора объектов группы в дереве могут являться не только наборы объектов нижних групп, но и наборы объектов этой же группы (будем называть, такую группу объектов *иерархической*). Чтобы определять эти дочерние наборы объектов в такой иерархической группе объектов, для нее необходимо задать дополнительный фильтр, который в отличие от обычных фильтров, может обращаться не только к значениям фильтруемого набора объектов, но и к значениям "верхнего по дереву" набора объектов (эта техника очень похожа на аналогичную в операторе [рекурсии](Recursion_RECURSION.md)). При этом, крайне желательно, чтобы иерархический фильтр использовал все значения верхних наборов объектов, так как иначе, как и для фильтров между различными группами объектов, теряется смысл создания такого дерева. Первоначально считается, что все значения "верхнего по дереву" набора объектов равны `NULL`.


:::info
В текущей реализации платформы иерархические группы позволяют отображать только деревья (а не направленные графы). Соответственно, в качестве иерархического фильтра можно использовать только равенства значения верхнего набора объектов и свойства, принимающих на вход нижние (фильтруемые) значения объектов (так гарантируется что к одному узлу дерева нельзя придти различными путями)
:::

Свойства различных групп объектов в дереве выстраиваются в колонки друг под другом, то есть первая колонка отображает первые свойства каждой группы объектов, вторая колонка - вторые и так далее. При этом общее количество колонок дерева определяется последней группой объектов этого дерева (все "лишние" свойства верхних групп просто игнорируются).

### Представления свойств {#property}

Любое свойство или действие может отображаться на форме в одном из следующих *представлений*:

-   *Панель* (`PANEL`) - отдельный компонент, который отображает заголовок свойства на форме и значение этого свойства для текущих значений объектов формы.
-   *Тулбар* (`TOOLBAR`) - аналогично панели, только этот компонент имеет другое расположение по умолчанию (сразу под таблицей), и, если таблица, к которой относится этот тулбар, скрывается, тулбар скрывается вместе с ней.
-   *Колонка таблицы* (`GRID`) - отдельная колонка в таблице, которая отображает текущие значения свойства для всех наборов объектов (рядов) в таблице.

Для каждой группы объектов можно задать, в каком *представлении по умолчанию* будут отображаться свойства этой группы (по умолчанию таким представлением является колонка таблицы). Если у свойства нет параметров (то есть у него отсутствует группа отображения), оно отображается в панели. Действия всегда, по умолчанию, отображаются в панели.


:::info
В оставшейся части раздела поведение свойств и действий абсолютно одинаково, поэтому дальше будем использовать только термин свойство (для действий поведение абсолютно идентично).
:::

При необходимости разработчик может явно указать, какое представление должно использовать отображаемое свойство.

Если в таблицу группы объектов в какой-то момент времени не отображается ни одно свойство, она автоматически скрывается.

По умолчанию, в качестве заголовка каждого свойства на форме используется заголовок самого свойства. При необходимости, разработчик может указать другое значение заголовка, или, если нужна еще большая гибкость, использовать в качестве заголовка свойство, которому, в свою очередь, можно передавать на вход [верхние](Form_structure.md#groupcolumns) объекты отображаемого свойства. Также, стоит отметить, что если для свойства заданы [группы-в-колонки](Form_structure.md#groupcolumns), то для создаваемых колонок желательно иметь разные заголовки (чтобы как-то их различать), поэтому, в этом случае, рекомендуется в качестве заголовка использовать свойство, которое принимает на вход все (!) объекты заданных групп-в-колонки.

Кроме заголовков, для каждого представления свойства на форме можно задать цвета (как цвет фона, так и цвет текста), а также условие, при невыполнении которого свойство не будет отображаться. Как и заголовок, каждый из этих параметров задается при помощи некоторого свойства.

### Группы фильтров {#filtergroup}

Для того чтобы предоставить пользователю интерфейс по выбору применяемых фильтров, их можно объединить в *группы фильтров*. Для каждой из этих групп на форме будет создан специальный компонент, при помощи которого пользователь сможет выбирать один фильтр из группы в качестве текущего активного. Если несколько фильтров в одной группе применяются к разным группам объектов, то компонент будет отображаться для последней из них.

Для каждой группы фильтров разработчик может задать имя, при помощи которого к нему можно будет обращаться в дальнейшем (например в дизайне формы).

### Пользовательские фильтры / сортировки {#userfilters}

Пользователь может добавлять свои / изменять существующие сортировки, а также добавлять свои фильтры при помощи соответствующих интерфейсов:

-   Сортировки - путем двойного нажатия на заголовке колонки.
-   Фильтры - при помощи соответствующей кнопки под таблицей каждой группы объектов. По умолчанию, фильтр устанавливается на активное свойство в таблице, и для всех типов данных, кроме строковых регистронезависимых, фильтрует на равенство введенному значению (для строковых регистронезависимых типов фильтр ставится на включение введенной строки). При необходимости, разработчик может задать тип фильтрации по умолчанию явно при помощи соответствующей опции.

### Выбор объектов по умолчанию {#defaultobject}

В интерактивном представлении формы фильтры для групп объектов могут изменяться в результате различных действий пользователя (например, при изменении верхних объектов этих фильтров, выборе фильтров в группе фильтров и т.п.), после чего [текущие](Form_structure.md#currentObject) объекты могут уже не удовлетворять условиям новых фильтров. Кроме того, при [открытии формы](Open_form.md), некоторые объекты могут не [передаваться](Open_form.md#params), или передаваться равными `NULL`. В обоих этих случаях, для группы объектов необходимо изменить текущие объекты, на некоторые текущие *объекты по умолчанию. *В платформе существует несколько вариантов выбора новых текущих объектов:

-   Первый (`FIRST`) - первый набор объектов (в соответствии с текущим порядком)
-   Последний (`LAST`) - последний набор объектов.
-   Предыдущий (`PREV`) - предыдущий (или максимально близкий к нему) набор объектов.
-   Не определено (`NULL`) - набор `NULL` значений.

Если ни одна из этих опций не задана явно, платформа пытается сама определить являются ли постоянные фильтры в группе объектов а) взаимоисключающими при различных значениях верхних объектов (если таковые имеются), и / или б) фильтр отбирает очень малый процент от общего числа объектов заданных классов. В обоих этих случаях нет смысла искать предыдущий объект и, по умолчанию, выбирается первый (`FIRST`) объект, соответственно, во всех остальных случаях - предыдущий (`PREV`).


:::info
Стоит отметить, что выбор объектов по умолчанию по сути эквивалентен выполнению операции [поиска объектов](Search_SEEK.md), при этом объектами поиска являются:

-   для типа `PREV`
    -   при открытии формы - либо переданные объекты, либо, если их нет, последние использованные объекты для класса объекта формы.
    -   в остальных случаях - предыдущие текущие значения объектов
-   для остальных типов
    -   при открытии формы - переданные объекты
    -   в остальных случаях - пустое множество объектов

[Направление поиска](Search_SEEK.md#direction) определяется типом объекта по умолчанию (`PREV` при этом эквивалентен `FIRST`).
:::

### Операторы работы с объектами {#objectoperators}

При добавлении свойств на форму, вместо конкретных свойств можно использовать предопределенный набор операторов, которые реализуют наиболее частые сценарии работы с объектами (таким образом нет необходимости создавать и именовать такие свойства каждый раз за пределами формы):

-   Значение объекта (`VALUE`) - для [встроенных классов](Built-in_classes.md) будет добавлено специальное свойство с одним аргументом, которое показывает текущее значение объекта и позволяет пользователю его изменять. Для [пользовательских классов](User_classes.md) добавится свойство, которое показывает идентификатор объекта в базе данных, а при попытке изменения показывает диалог со списком соответствующих объектов. Выбранное значение будет использовано как текущее значение объекта на форме.
-   Создание нового объекта (`NEW`) - добавляет действие без аргументов, которое [добавляет](New_object_NEW.md) объект класса переданного объекта формы (или класса явно заданного разработчиком), после чего автоматически делает этот объект текущим. Если у класса есть потомки, то пользователю будет выдан диалог с возможностью выбора. Если на форме к объекту, для которого происходит добавление, применяются какие-нибудь фильтры, то система попытается вновь созданному объекту [изменить](Property_change_CHANGE.md) свойства таким образом, чтобы он удовлетворял этим фильтрам (как правило, для добавленных объектов в каждый из фильтров записывается [значение по умолчанию](Built-in_classes.md#defaultvalue) класса значения этого фильтра)
-   Редактирование объекта (`EDIT`) - добавляет действие с одним аргументом, которое вызывает действие `System.formEdit` (которое, в свою очередь, по умолчанию открывают [форму редактирования](#edtClass) объекта соответствующего класса). 
-   Создание и редактирование объекта (`NEWEDIT`) - добавляет действие без аргументов, которое добавляет объект соответствующего класса, вызывает действие редактирования объекта (`EDIT`), и если ввод не был [отменен](Value_input.md#result), устанавливает добавленный объект как текущий.
-   Удаление объекта (`DELETE`) - добавляет действие с одним аргументом, при выполнении которого удаляется текущий объект.

Также для последних четырех операторов можно задать опции (для всех остальных действий эти опции игнорируются):

-   [Новая сессия](New_session_NEWSESSION_NESTEDSESSION.md) (`NEWSESSION`) - в этом случае добавляемое на форму действие будет выполняться в новой сессии. При открытии форм в новой сессии важно помнить, что в них не будут видны изменения сделанные в текущей сессии (форме). Таким образом, этот механизм рекомендуется использовать только в случае, если открытие происходит из формы, в которой пользователю ничего нельзя изменять, или обе формы никак не пересекаются по свойствам или объектам. Отметим, что при использовании в новой сессии оператора создания нового объекта (`NEW`), вместо просто создания нового объекта выполняется создание и редактирование объекта (`NEWEDIT`) (в противном случае сессия сразу же закроется и изменения потеряются).
-   Вложенная сессия (`NESTEDSESSION`) - действие будет выполняться в новой вложенной сессии. Также как и в новой сессии `NEW` заменяется на `NEWEDIT`.

### Формы выбора / редактирования {#edtClass}

Для каждой формы можно указать, что она является формой по умолчанию для выбора / редактирования объектов заданного класса. В этом случае, при вызове действий, созданных при помощи операторов работы с объектами (создание / редактирование объекта), будет открываться именно эта форма. Эта же форма будет открываться и при использовании соответствующей опции [выбора формы](Open_form.md#form) в операторе открытия формы.

Если для класса форма выбора / редактирования не задана, платформа автоматически создаст такую форму. Эта форма будет состоять из одного объекта этого класса, а также всех свойств подходящих по классу и принадлежащих [группе свойств](Groups_of_properties_and_actions.md) `System.base`. Кроме того на эту форму автоматически будут добавлены действия [создания, редактирования и удаления](#objectoperators) объекта в [новой сессии](#objectoperators), а также свойство [значения объекта](#objectoperators), если не существует ни одного свойства из группы свойств `System.id`, подходящего по классу этому объекту (то есть на форму не добавлено ни одного "идентификатора" объекта).

### Собственник сессии {#owner}

Так как форма по умолчанию открывается в текущей сессии, применять / отменять изменения этой сессии может быть не всегда безопасно, так как, например, можно случайно применить "не свои" изменения. Чтобы избегать таких ситуаций, в платформе существует такое понятие как *собственник сессии* - форма, которая ответственна за управление жизненным циклом сессии (например, применение / отмена изменений). По умолчанию, считается, что форма является собственником сессии, если при [открытии](In_an_interactive_view_SHOW_DIALOG.md) формы у этой сессии не было других собственников.

Для реализации механизма работы с собственниками сессии в платформе используется числовое [локальное](Data_properties_DATA.md#local) свойство `System.sessionOwners`. Соответственно, это свойство увеличивается на `1` при открытии формы и уменьшается на `1 `при ее закрытии. Таким образом, оно показывает глубину вложенности "стека открытия форм" и равно `NULL` если у сессии нет собственника, и не `NULL` в обратном случае.

В случае необходимости, разработчик при открытии формы может явно указать, что открываемая форма является собственником сессии, которую она использует.


:::info
Владение сессией влияет только на отображение / поведение системных действий управления жизненным циклом формы / сессии. При использовании остальных действий рекомендуется самостоятельно учитывать риск применить "не свои" изменения (и, к примеру, использовать все то же свойство `System.sessionOwners`).
:::

### Системные действия для управления жизненным циклом формы/сессии {#sysactions}

На любую форму автоматически добавляется следующие системные действия (в скобках указаны их имена):

-   Обновить (`System.formRefresh`) - обновляет текущее состояние формы, перечитывая всю информацию из базы данных.
-   Сохранить (`System.formApply`) - сохраняет в базу данных изменения, сделанные в форме.
-   Отменить (`System.formCancel`) - отменяет все изменения, сделанные на *форме*.
-   OK (`System.formOk`) - закрывает текущую форму и, если форма является собственником сессии, то применяет изменения в базу данных.
-   Закрыть (`System.formClose`) - закрывает текущую *форму*, ничего не делая с изменениями.
-   Сбросить (`System.formDrop`) - закрывает текущую форму и возвращает в качестве выбранного объекта `NULL`.

По умолчанию у перечисленных системных действий следующие условия видимости:

|Действие|Условие|
|---|---|
|Обновить|Всегда|
|Сохранить, Отменить|Если форма является собственником и на форме могут вызываться действия, которые изменяют текущую сессию. Также Отменить может не показываться, если платформа определяет, что отмена изменений гарантированно приведет к изменению [начальных значений](Open_form.md#params) объектов формы (то есть выбору других объектов)|
|ОК, Закрыть|Если открытие формы [синхронное](In_an_interactive_view_SHOW_DIALOG.md#flow)|
|Сбросить|Если открытие формы синхронное, возвращает значение и разрешает передачу `NULL` значений|

При необходимости все эти действия можно отключить / включить, убрав соответствующие компоненты из [дизайна формы](Form_design.md) и / или использовав соответствующие опции в операторе [открытия формы](Open_form.md).

### Дополнительные возможности {#extra}

Для формы можно задать файл с картинкой, которая будет отображаться в качестве иконки формы.

Также, при необходимости, для формы можно включить режим *автоматического обновления*, в котором каждый заданный промежуток времени для формы будет выполняться действие `System.formRefresh`.

### Язык

Использование всех вышеперечисленных возможностей, как и задание структуры формы, осуществляется при помощи [инструкции `FORM`](FORM_statement.md).

### Открытие формы

Для отображения формы в интерактивном представлении используется соответствующий оператор [открытия формы](Open_form.md) в [интерактивном представлении](In_an_interactive_view_SHOW_DIALOG.md).

### Примеры

```lsf
date = DATA DATE (Order);
FORM showForm
    OBJECTS dateFrom = DATE, dateTo = DATE PANEL
    PROPERTIES VALUE(dateFrom), VALUE(dateTo)

    OBJECTS o = Order
    FILTERS date(o) >= dateFrom, date(o) <= dateTo
;

testShow ()  {
    SHOW showForm OBJECTS dateFrom = 2010_01_01, dateTo = 2010_12_31;

    NEWSESSION {
        NEW s = Sku {
            SHOW sku OBJECTS s = s FLOAT;
        }
    }
}
```

```lsf
FORM selectSku
    OBJECTS s = Sku
    PROPERTIES(s) id
;

testDialog  {
    DIALOG selectSku OBJECTS s INPUT DO {
        MESSAGE 'Selected sku : ' + id(s);
    }
}

sku = DATA Sku (OrderDetail);
idSku (OrderDetail d) = id(sku(d));

changeSku (OrderDetail d)  {
    DIALOG selectSku OBJECTS s = sku(d) CHANGE;

    //равносильно первому варианту
    DIALOG selectSku OBJECTS s = sku(d) INPUT NULL CONSTRAINTFILTER DO {
        sku(d) <- s;
    }
}
```
