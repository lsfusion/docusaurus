// lsFusion syntax definition for Prism.
// Kept in sync with the platform lexer:
// platform/server/src/main/antlr3/lsfusion/server/language/LsfLogics.g (LEXER section)
// and the IntelliJ plugin lexer plugin-idea/src/com/lsfusion/lang/LSF.flex.

Prism.languages.lsf = {
	// CODE_LITERAL (INTERNAL <{ ... }>) is lexed as a single token, before strings:
	// the embedded Java may contain its own quotes.
	'code-literal': {
		pattern: /<\{[\s\S]*?\}>/,
		greedy: true,
		alias: 'string',
		inside: {
			'punctuation': /^<\{|\}>$/
		}
	},
	'comment': [
		{
			pattern: /\/\/.*/,
			greedy: true
		},
		{
			pattern: /\/\*[\s\S]*?\*\//,
			greedy: true
		}
	],
	// RAW_STRING_LITERAL: r'...' and the delimiter form rX'...'X, where X is any character
	// except letters, digits, '_', whitespace, a quote and + * , = < > ( ) [ ] { } #.
	'raw-string': [
		{
			pattern: /(^|[^\w'])[rR]([^\w\s'+*,=<>()\[\]{}#])'[\s\S]*?'\2/,
			lookbehind: true,
			greedy: true,
			alias: 'string'
		},
		{
			pattern: /(^|[^\w'])[rR]'[^']*'/,
			lookbehind: true,
			greedy: true,
			alias: 'string'
		}
	],
	// STRING_LITERAL: may span several lines, '\' escapes any character,
	// '${...}' interpolation blocks may contain nested braces and quotes.
	'string': {
		pattern: /'(?:\\[\s\S]|\$\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}|\$(?!\{)|[^'\\$])*'/,
		greedy: true,
		inside: {
			// '\$' escapes the dollar, so '{...}' after it is an ordinary localization block
			'interpolation': {
				pattern: /(^|[^\\])\$\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/,
				lookbehind: true,
				inside: {
					'punctuation': /^\$\{|\}$/,
					'expression': {
						pattern: /[\s\S]+/
						// inside is set to Prism.languages.lsf below
					}
				}
			},
			'inline': {
				pattern: /(^|[^\\])\$[IRM]\{[^{}]*\}/,
				lookbehind: true,
				alias: 'variable'
			},
			'escape': {
				pattern: /\\[\s\S]/,
				alias: 'char'
			},
			'localization': {
				pattern: /\{[^{}]*\}/,
				alias: 'variable'
			}
		}
	},
	'keyword': /\b(?:ABSTRACT|ACTION|ACTIONS|ACTIVATE|ACTIVE|AFTER|AGGR|ALL|AND|APPEND|APPLY|AS|ASK|ASON|ASYNCUPDATE|ATTACH|ATTR|AUTO|AUTOREFRESH|AUTOSET|BACKGROUND|BCC|BEFORE|BODY|BODYPARAMHEADERS|BODYPARAMNAMES|BODYURL|BOOLEAN|BOTTOM|BOX|BPISTRING|BPSTRING|BREAK|BY|CALENDAR|CANCEL|CANONICALNAME|CASE|CATCH|CC|CENTER|CHANGE|CHANGEABLE|CHANGECLASS|CHANGED|CHANGEKEY|CHANGEMOUSE|CHANGEWYS|CHARSET|CHARWIDTH|CHECK|CHECKED|CLASS|CLASSCHOOSER|CLASSES|CLIENT|CLOSE|COLLAPSE|COLOR|COLUMN|COLUMNS|COMPLEX|CONCAT|CONFIG|CONFIRM|CONNECTION|CONSTRAINT|CONSTRAINTFILTER|CONTAINER|CONTAINERH|CONTAINERV|CONTEXTMENU|CONTINUE|COOKIES|COOKIESTO|CSV|CSVFILE|CSVLINK|CUSTOM|CUSTOMS|CYCLES|DATA|DATE|DATETIME|DB|DBF|DBFFILE|DBFLINK|DEFAULT|DEFAULTCOMPARE|DELAY|DELETE|DESC|DESIGN|DIALOG|DISABLE|DISABLEIF|DO|DOC|DOCKED|DOCX|DOUBLE|DOWN|DRAW|DRAWROOT|DRILLDOWN|DROP|DROPCHANGED|DROPPED|ECHO|EDIT|ELSE|EMAIL|EMBEDDED|END|EQUAL|ERROR|ESCAPE|EVAL|EVENTID|EVENTS|EXCELFILE|EXCELLINK|EXCEPTLAST|EXCLUSIVE|EXEC|EXPAND|EXPORT|EXTEND|EXTERNAL|EXTID|EXTKEY|EXTNULL|FALSE|FIELDS|FILE|FILTER|FILTERBOX|FILTERCONTROLS|FILTERGROUP|FILTERGROUPS|FILTERS|FINALLY|FIRST|FIXED|FLEX|FLOAT|FOCUSED|FOLDER|FOOTER|FOR|FOREGROUND|FORM|FORMEXTID|FORMS|FORMULA|FROM|FULL|GET|GLOBAL|GOAFTER|GRID|GRIDBOX|GROUP|GROUPCHANGE|HALIGN|HEADER|HEADERS|HEADERSTO|HIDE|HIDESCROLLBARS|HIDETITLE|HINT|HINTNOUPDATE|HINTTABLE|HORIZONTAL|HOVER|HTML|HTMLFILE|HTMLLINK|HTMLTEXT|HTTP|IF|IMAGE|IMAGEFILE|IMAGELINK|IMPORT|IMPOSSIBLE|IN|INDEX|INDEXED|INFO|INIT|INLINE|INPUT|INTEGER|INTERNAL|INTERVAL|IS|ISCLASS|ISTRING|JAVA|JOIN|JSON|JSONFILE|JSONLINK|JSONTEXT|KEY|KEYPRESS|LAST|LAZY|LEFT|LIKE|LIMIT|LINK|LIST|LOCAL|LOCALASYNC|LOG|LOGGABLE|LONG|LSF|MANAGESESSION|MAP|MATCH|MATERIALIZED|MAX|MEASURE|MEASURES|MEMO|MENU|MESSAGE|META|MIN|MODULE|MOUSE|MOVE|MS|MULTI|NAGGR|NAME|NAMEDFILE|NAMESPACE|NATIVE|NAVIGATOR|NESTED|NESTEDSESSION|NEW|NEWCONNECTION|NEWEDIT|NEWEXECUTOR|NEWSESSION|NEWSQL|NEWTHREAD|NO|NOCANCEL|NOCHANGE|NOCLASSES|NOCOMPLEX|NOCONSTRAINTFILTER|NODEFAULT|NOENCODE|NOESCAPE|NOEXTID|NOFLEX|NOHEADER|NOHINT|NOIMAGE|NOINLINE|NOMANAGESESSION|NONULL|NOPREVIEW|NOREPLACE|NOSELECT|NOSETTINGS|NOSTICKY|NOT|NOWAIT|NULL|NUMERIC|OBJECT|OBJECTS|OFFSET|OK|ON|OPTIMISTICASYNC|OPTIONS|OR|ORDER|ORDERS|OVERRIDE|PAGESIZE|PANEL|PARAMS|PARENT|PARTITION|PASSWORD|PATCH|PATTERN|PDF|PDFFILE|PDFLINK|PERIOD|PG|PIVOT|POPUP|POSITION|POST|PREREAD|PREV|PREVIEW|PRINT|PRIORITY|PROPERTIES|PROPERTY|PROPERTYDRAW|PROPORTION|PUT|QUERYCLOSE|QUERYOK|QUICKFILTER|RAWFILE|RAWLINK|READ|READONLY|READONLYIF|RECALCULATE|RECURSION|REFLECTION|REGEXP|REMOVE|REPLACE|REPORT|REPORTFILES|REPORTS|REQUEST|REQUIRE|RESOLVE|RETURN|RGB|RICHTEXT|RIGHT|ROOT|ROUND|ROW|ROWS|RTF|SCHEDULE|SCREENSHOT|SCROLL|SEEK|SELECT|SELECTED|SELECTOR|SERIALIZABLE|SERVER|SET|SETCHANGED|SETDROPPED|SETTINGS|SHEET|SHOW|SHOWDEP|SHOWIF|SHOWREC|SHOWTYPE|SINGLE|SPLITH|SPLITV|SQL|START|STEP|STICKY|STRETCH|STRICT|STRING|STRONG|STRUCT|SUBJECT|SUBREPORT|SUCCESS|SUM|TAB|TABBED|TABLE|TABLEFILE|TABLELINK|TAG|TBOOLEAN|TCP|TEXT|TEXTFILE|TEXTHALIGN|TEXTLINK|TEXTVALIGN|TFALSE|THEN|THISSESSION|THREADS|TIME|TO|TOOLBAR|TOOLBARBOX|TOOLBARLEFT|TOOLBARRIGHT|TOOLBARSYSTEM|TOP|TREE|TRUE|TRY|TSQUERY|TSVECTOR|TTRUE|UDP|UNGROUP|UP|USER|USERFILTER|USERFILTERS|VALIGN|VALUE|VERTICAL|VIDEOFILE|VIDEOLINK|VIEW|VIEWTYPE|WAIT|WARN|WEAK|WHEN|WHERE|WHILE|WINDOW|WITHIN|WORDFILE|WORDLINK|WRITE|XLS|XLSX|XML|XMLFILE|XMLLINK|XOR|YEAR|YES|YESNO|ZDATETIME)\b/,
	'color': {
		pattern: /#[0-9a-fA-F]{6}\b/,
		alias: 'number'
	},
	'number': /\b\d{4}_\d\d_\d\d(?:_\d\d:\d\d(?::\d\d)?)?\b|\b\d\d:\d\d(?::\d\d)?\b|\b\d+\.\d*[dD]?\b|\b\d+\.|\b\d+[lL]?\b/,
	// RECURSIVE_PARAM
	'parameter': {
		pattern: /\$[a-zA-Z]\w*/,
		alias: 'variable'
	},
	// meta code usage, possibly with a namespace
	'function': /@[a-zA-Z]\w*(?:\.[a-zA-Z]\w*)?/,
	'operator': /<-|=>|==|!=|<=|>=|\(\+\)|\(-\)|###?|[-+*\/=<>?]/,
	'punctuation': /[;\[\](){},.]/
};

Prism.languages.lsf.string.inside.interpolation.inside.expression.inside = Prism.languages.lsf;

if (Prism.languages.java) {
	Prism.languages.lsf['code-literal'].inside.java = {
		pattern: /[\s\S]+/,
		inside: Prism.languages.java
	};
}
