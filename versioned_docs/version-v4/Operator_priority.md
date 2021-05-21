---
title: 'Operator priority'
---

When evaluating an [expression](Expression.md), [operators](Operators.md) are evaluated in a specific order depending on *operator priority*. The higher the operator’s priority, the earlier it will be executed. The table below lists the priorities of all operators in descending order.

|Operator|Description|Type|
|---|---|---|
|`(expression)`<br/>[`JOIN`](JOIN_operator.md)<br/>[`CASE`](CASE_operator.md), [`MULTI`](MULTI_operator.md), [`OVERRIDE`](OVERRIDE_operator.md), [`EXCLUSIVE`](EXCLUSIVE_operator.md), [`IF ... THEN`](IF_..._THEN_operator.md)<br/>[`PARTITION`](PARTITION_operator.md)<br/>[`RECURSION`](RECURSION_operator.md)<br/>[`GROUP`](GROUP_operator.md)<br/>[`STRUCT`](STRUCT_operator.md)<br/>[`MAX`](MAX_operator.md)/[`MIN`](MIN_operator.md)<br/>[`CONCAT`](CONCAT_operator.md)<br/>`INTEGER`, `DOUBLE`...<br/>[`PREV`](PREV_operator.md), [`CHANGED`, ...](Change_operators.md)<br/>[`CLASS`](Property_signature_CLASS_.md)<br/>[`ACTIVE`](ACTIVE_TAB_operator.md)<br/>[`literal`](Literals.md)|Expression in parentheses<br/>[Composition](Composition_JOIN_.md)<br/>[Selection](Selection_CASE_IF_MULTI_OVERRIDE_EXCLUSIVE_.md)<br/>[Partition/order](Partitioning_sorting_PARTITION_..._ORDER_.md)<br/>[Recursion](Recursion_RECURSION_.md)<br/>[Group](Grouping_GROUP_.md)<br/>[Structure creation](Structure_operations_STRUCT_.md)<br/>Maximum/minimum<br/>String concatenation<br/>[Type conversion](Type_conversion.md)<br/><br/>[Property signature](Property_signature_CLASS_.md)<br/>[Activity](Activity_ACTIVE_.md)<br/> [Constants](Constant.md)|<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/>Prefix<br/><br/>|
|[`[ ]`](Operator_.md)<br/>[`IS`](IS_AS_operators.md)<br/>[`AS`](IS_AS_operators.md)|[Structure element access](Structure_operations_STRUCT_.md)<br/>[Classification](Classification_IS_AS_.md)<br/>[Classification](Classification_IS_AS_.md)|Postfix<br/>Postfix<br/>Postfix|
|[`-`](Arithmetic_operators.md)|Unary minus|Prefix|
|[`*`](Arithmetic_operators.md)<br/>[`/`](Arithmetic_operators.md)|Multiplication<br/>Division|Binary<br/>Binary|
|[`+`](Arithmetic_operators.md)<br/>[`-`](Arithmetic_operators.md)|Addition<br/>Subtraction|Binary<br/>Binary|
|[`(+)`](Arithmetic_operators.md)<br/>[`(-)`](Arithmetic_operators.md)|Addition with `NULL` values<br/>Subtraction with `NULL` values|Binary<br/>Binary|
|[`<`](Comparison_operators.md)<br/>[`<=`](Comparison_operators.md)<br/>[`>`](Comparison_operators.md)<br/>[`>=`](Comparison_operators.md)|Less<br/>Less or equal<br/>Greater<br/>Greater or equal|Binary<br/>Binary<br/>Binary<br/>Binary|
|[`==`](Comparison_operators.md)<br/>[`!=`](Comparison_operators.md)|Equal<br/>Not equal|Binary<br/>Binary|
|[`NOT`](AND_OR_NOT_XOR_operators.md)|[Logical negation](Logical_operators_AND_OR_NOT_XOR_.md)|Prefix|
|[`AND`](AND_OR_NOT_XOR_operators.md)|[Logical AND](Logical_operators_AND_OR_NOT_XOR_.md)|Binary|
|[`XOR`](AND_OR_NOT_XOR_operators.md)|[Logical exclusive OR](Logical_operators_AND_OR_NOT_XOR_.md)|Binary|
|[`OR`](AND_OR_NOT_XOR_operators.md)|[Logical OR](Logical_operators_AND_OR_NOT_XOR_.md)|Binary|
|[`IF`](IF_operator.md)|Condition|Binary|
 
