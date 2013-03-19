triggerSt={
'v':{
	terms:'@',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[
		['change',//тип действия
			['string',['#', ['curIndex']]], '1']
	],//параметры действия
	doing:	
	[

	//действие 0 - по умолчанию
	[	['func','con', 'next']	],
	[	[['trigger',//тип действия
			'next']],//параметры действия
		[['value',['chBfExec'], '==', 1]]//условия
	]
	],
	afterFunction:0//callback
},
'x':{
	terms:'@',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[
		['change',//тип действия
			['string',['#', ['curIndex']]], '0']
	],//параметры действия
	doing:
	[

	//действие 0 - по умолчанию
	[	['func','con', 'next']	],
	[	[['trigger',//тип действия
			'next']],//параметры действия
		[['value',['chBfExec'], '==', 1]]//условия
	]
	],

	afterFunction:0//callback
},
'<':{
	terms:'@',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:0,

	doing://curIndex
	[

	//действие 0 - по умолчанию
	[	['func','message', 'Ошибка - выход за пределы хранилища данных']	],
	//действие 1
	[	[['arith',//тип действия
			['curIndex'], '-','1']],//параметры действия

		[['value',['curIndex'], '>', 1]],//условия
	],
	//действие 2
	[	[['trigger',//тип действия
			'next']
		],//параметры действия
		[['value',['chBfExec'], '==', 1], ['value',['curIndex'], '>', 1]],//условия
	]

	],//конец doing																				
	afterFunction:0//callback
},
'>':{
	terms:'@',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:0,

	doing://curIndex
	[

	//действие 0 - по умолчанию
	[	['func','message', 'Ошибка - выход за пределы хранилища данных']	],
	//действие 1
	[	[['arith',//тип действия
			['curIndex'], '+','1']],//параметры действия

		[['value',['curIndex'], '<', '$','getLastIndex', ['string']]],//условия
	],
	//действие 2
	[	[['trigger',//тип действия
			'next']
		],//параметры действия
		[['value',['chBfExec'], '==', 1], ['value',['curIndex'], '<', '$','getLastIndex', ['string']]],//условия
	]
	],//конец doing																				
	afterFunction:0//callback
},
'?':{
	terms:'@',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:0,

	doing://curIndex
	[

	//действие 0 - по умолчанию
	[	['change',//тип действия
			['curCommand'], '#',['command',['#', ['curCommand']], 'next2']],
		['trigger',//тип действия
			'#',['command',['#', ['curCommand']], 'command']]	],
	////действие 1
	[	[['change',//тип действия
			['curCommand'], '#',['command',['#', ['curCommand']], 'next']],
		['trigger',//тип действия
			'#',['command',['#', ['curCommand']], 'command']]],//параметры действия

		[['value',['string',['#',['curIndex']]], '==', '1']],//условия
	]

	],//конец doing																				
	afterFunction:0
},
'!':{
	terms:'0',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:0,
	doing:0,
	afterFunction:0//callback
},
'run':{
	terms:'0',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:	
	[['change',//тип действия
			['curCommand'], '1'],
		['trigger',//тип действия
			'#',['command',1, 'command']]
	],
	doing:0,
																			
	afterFunction:0//callback
},
next:{
	terms:'0',//@ - all, 0 - not doing run only before and after function, number - max count of running doing function
	beforeFunction:
	[['change',//тип действия
			['curCommand'], '#',['command',['#', ['curCommand']], 'next']],
	['trigger',//тип действия
		'#',['command',['#', ['curCommand']], 'command']]],

	doing:0,//curIndex																		
	afterFunction:0//callback
},
reset:{
	terms:'0',
	beforeFunction:
	[
		['eval',//тип действия
			"console.log(setValue(['string','@'],0,false))"]
	],//параметры действия
	doing:0,//конец doing

	afterFunction:0//callback
},
test:{
	terms:'0',
	beforeFunction:
	[
		['eval',//тип действия
			"console.log(setValue(['string','@'],0,false))"]
	],//параметры действия
	doing:0,//конец doing

	afterFunction:0//callback
}
}//end of trigger

data=
{
	curIndex:1,
	string:['#',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	curCommand:0,
	command:['#',
		{'0':'#',command:'v',next:2},//1
		{'0':'#',command:'>',next:3},//2
		{'0':'#',command:'?',next:5,next2:4},//3
		{'0':'#',command:'v',next:3},//4
		{'0':'#',command:'!'}//5
	 		],
	 chBfExec:1
}//end of data
//mark
//unmark
//left
//right
//if
/*
trigger('v'):
{
	do:#string.#curindex=1;
	terms all:
	{
		default:fun con('next');
		if(#chBfExec==1)trig next;
	}
	
	after:none;
}

trigger('<'):
{
	terms all:
	{
		default:fun message('выход за пределы хранаилища');
		if(#curIndex>0)#curIndex--;
		if(#curIndex>0&&#chBfExec==1)trig next;
	}
}
*/