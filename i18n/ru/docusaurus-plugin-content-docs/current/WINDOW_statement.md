---
title: 'Инструкция WINDOW'
---

Инструкция `WINDOW` - создание нового [окна](Navigator_design.md).

### Синтаксис

```
WINDOW name [caption] type [options]
```

Опции, которые идут в конце инструкции, имеют следующий вид (синтаксис каждой опции указан в отдельной строке):

```
HIDETITLE 
HIDESCROLLBARS 
VERTICAL | HORIZONTAL
POSITION(x, y, width, height)
LEFT | RIGHT | TOP | BOTTOM
HALIGN(alignType)
VALING(alignType) 
TEXTHALIGN(alignType)
TEXTVALIGN(alignType)
```

### Описание

Инструкция `WINDOW` объявляет новое окно и добавляет его в текущий [модуль](Modules.md). Опции перечисляются друг за другом в произвольном порядке через пробел или переводы строк. В зависимости от выбранного типа окна: `TOOLBAR`, `PANEL`, `TREE` или `MENU`, будет создан тулбар, панель, дерево или меню соответственно.

### Параметры

- `name`

    Имя окна. [Простой идентификатор](IDs.md#id). Имя должно быть уникально в пределах текущего [пространства имен](Naming.md#namespace).

- `caption`

    Заголовок окна. [Строковый литерал](Literals.md#strliteral). Если заголовок не задан, то заголовком окна будет являться его имя.  

- `type`

    Тип создаваемого окна. Задается одним из ключевых слов `TOOLBAR`, `PANEL`, `TREE` или `MENU`.

- `options`

    - `HIDETITLE`

        Указание на отсутствие заголовка в пользовательском интерфейсе.

    - `HIDESCROLLBARS`

        Указание на отсутствие скроллбаров для компонента данного окна.

    - `VERTICAL` | `HORIZONTAL`

        Указание вертикальной или горизонтальной ориентации создаваемого тулбара или панели. `VERTICAL` используется по умолчанию. Опция имеет смысл только для окон типа `TOOLBAR` или `PANEL`.

    - `POSITION(x, y, width, height)`

        Указание размеров и местоположения окна. 

        - `x`

            Крайняя левая координата окна. [Целочисленный литерал](Literals.md#intliteral) в диапазоне от `0` до `100`.

        - `y`

            Крайняя верхняя координата окна. Целочисленный литерал в диапазоне от `0` до `100`.

        - `width`

            Ширина окна. Целочисленный литерал в диапазоне от `0` до `100`.

        - `height`

            Высота окна. Целочисленный литерал в диапазоне от `0` до `100`.

    - `LEFT` | `RIGHT` | `TOP` | `BOTTOM`

        Указание фиксированного расположения окна на рабочем столе, которое не позволяет пользователю изменять его положение и размер. Размер окна в таком случае выбирается автоматически исходя из предпочитаемых размеров компонента. Окно будет расположено слева, справа, сверху, снизу от рабочего стола соответственно. Опция имеет смыл только для окон типа `TOOLBAR` и не может быть использована одновременно с опцией `POSITION`.

    - `HALIGN(alignType)`

        Указание горизонтального выравнивания кнопок в вертикальном тулбаре. Опция имеет смысл только для окон типа `TOOLBAR` с ориентацией `VERTICAL`.

        - `alignType`

            Тип выравнивания. задается с помощью одного из ключевых слов:

            - `START` - все кнопки будут иметь одинаковую левую координату. Используется по умолчанию.
            - `CENTER` - все кнопки будут иметь одинаковый центр по оси X.
            - `END` - все кнопки будут иметь одинаковую правую координату.

    - `TEXTHALIGN(alignType)`

        Указание горизонтального выравнивания текста на кнопках в вертикальном тулбаре. Опция имеет смысл только для окон типа `TOOLBAR` с ориентацией `VERTICAL`. 

        - `alignType`

            Тип выравнивания. задается с помощью одного из ключевых слов:

            - `START` - текст будет расположен на кнопке слева. Используется по умолчанию.
            - `CENTER` - текст будет расположен на кнопке по центру.
            - `END` - текст будет расположен на кнопке справа.

    - `VALIGN(alignType)`

        Указание вертикального выравнивания кнопок в горизонтальном тулбаре. Опция имеет смысл только для окон типа `TOOLBAR` с ориентацией `HORIZONTAL`. 

        - `alignType`

            Тип выравнивания. задается с помощью одного из ключевых слов:

            - `START` - все кнопки будут иметь одинаковую верхнюю координату. Используется по умолчанию.
            - `CENTER` - все кнопки будут иметь одинаковый центр по оси Y.
            - `END` - все кнопки будут иметь одинаковую нижнюю координату.

    - `TEXTVALIGN(alignType)`

        Указание вертикального выравнивания текста на кнопках в горизонтальном тулбаре. Опция имеет смысл только для окон типа `TOOLBAR` с ориентацией `HORIZONTAL`. 

        - `alignType`

            Тип выравнивания. задается с помощью одного из ключевых слов:

            - `START` - текст будет расположен на кнопке сверху.
            - `CENTER` - текст будет расположен на кнопке по центру. Используется по умолчанию.
            - `END` - текст будет расположен на кнопке снизу.  
          

### Примеры


```lsf
// cоздание системных окон в модуле System
WINDOW root 'Корень' TOOLBAR HIDETITLE HIDESCROLLBARS HORIZONTAL POSITION(0, 0, 100, 6);
WINDOW toolbar 'Тулбар' TOOLBAR HIDETITLE VERTICAL POSITION(0, 6, 20, 64);
WINDOW tree 'Дерево' TOOLBAR HIDETITLE POSITION(0, 6, 20, 64);

// меню без скроллбаров
WINDOW menu MENU HIDESCROLLBARS POSITION(20, 6, 80, 4);

// горизонтальный тулбар внизу рабочего стола, в котором все кнопки будут выравниваться по центру, а текст выравниваться вверх
// в этот тулбар можно, например, помещать формы для быстрого открытия
WINDOW hotforms TOOLBAR HORIZONTAL VALIGN(CENTER) TEXTVALIGN(START) BOTTOM;
```

