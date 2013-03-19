triggerSt={
enter:{
	terms:'@',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[
		['arith',//тип действия
			['authority','metroRat'], '-', '#',['attempts']],//параметры действия системные значения: # - путь к значению, $ - сравнить с вычисляемым значением
		['arith',//тип действия
			['authority','metroRat'], '-', 1],
		['del',
			['locationList','@'], ['locationList','@'], '==', 'test']
	],//параметры действия
	doing:
	[

	//действие 0 - по умолчанию
	[	['func','message', 'ошибка надо 12 уровень,  гауссовка,  и находится в локации "Заброшеное метро"']	],
	//действие 1
	[	[['change',//тип действия
			['location'], 'mutantBase'],
		['trigger','del']],//параметры действия
		[['value',['level'], '>', 11],['value',['level'], '<', 16],['isExist',['bagpack', '@','type'] ,'gaussRifle'],['value',['location'], '==','derelictMetro']],//условия
	],
	//действие 2
	[	[

		['change',//тип действия
			['location'], 'mutantBase']//параметры действия
		],
		[['value',['level'], '>', 15],['isExist',['bagpack', '@','type'], 'gaussRifle']],['value',['location'], '==','derelictMetro']//условия
	]
	],//конец doing

	afterFunction:[['func',"con",0]]//callback
},
add:{
	terms:'0',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[
		['change',//тип действия
			['bagpack', '#',['$', 'getNextIndex', ['bagpack']]], '1']
	],//параметры действия
	doing:0,//конец doing

	afterFunction:0//callback
},
del:{
	terms:'0',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[
		['del',//тип действия
			['bagpack', '#'], '_', '==', 1]
	],//параметры действия
	doing:0,//конец doing

	afterFunction:0//callback
},

level:{
	terms:'0',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[
		['change',//тип действия
			['level'], '#',['varBuffer']]
	],//параметры действия
	doing:0,//конец doing

	afterFunction:0//callback
},
location:{
	terms:'0',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[
		['change',//тип действия
			['location'], '#',['varBuffer']]
	],//параметры действия
	doing:0,//конец doing

	afterFunction:0//callback
},
getBagpack:{
	terms:'0',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[
		['change',//тип действия
			['varBuffer'], '#',['bagpack', '@', 'type']]
	],//параметры действия
	doing:0,//конец doing

	afterFunction:0//callback
},
test:{
	terms:'0',
	beforeFunction:
	[
		['eval',//тип действия
			//"alert(getValue(['test', '@']))"]
			"console.log(getValue(['bagpack','@','type']))"]
	],//параметры действия
	doing:0,//конец doing

	afterFunction:0//callback
}

}//end of trigger

data=
{
	varBuffer:'rtyu',
	buffer:0,
	level:12,
	authority:{0:'#',metroRat:60},
	test:['#', ['locationList', 2, 1], ['locationList', 1, 2]],
	location:'derelictMetro',
	locationList:['#', ['#','derelictMetro','rat'], ['#','mutantBase','rat'], ['#','test','rat']], 
	bagpack:["item",//что хранится в данном массиве # - Хранятся просто данные
			'1','2'//,"rareItem"
			],
	item://справочник в нём хранятся только массивы и объекты
	['#',
	{0:'#',type:'gaussRifle', state:'12'},
	{0:'#',type:'stimulator'}
	],
	attempts:2
	//locationList:[]
}//end of data
