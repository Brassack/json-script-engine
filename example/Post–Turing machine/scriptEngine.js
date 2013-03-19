var se=(function(){
function runTrigger(trigger)
{
	function checkForCalcValues(arr)
	{
		var l=arr[0].length;
		for(var i=0;i<l;i++)
		{
			if(type(arr[0][i])=='array')arr[0][i]=getCalcValue(arr[0][i]);
		}
	}

	function runDo(d)//принимает массив действий
	{
		var leng=d.length;
		for(var i=0;i<leng;i++)
		{
			var param=d[i].slice(1);
			checkForCalcValues(param);
			var what=d[i][0];
			doing(what)(param);
		}
	}

	function checkTerms(t)//принимает массив условий
	{
		var l=t.length;
		for(var i=0;i<l;i++){
			if(!terms(t[i][0])(t[i].slice(1)))return false;}
		return true;
	}

	//trigger=JSON.parse(JSON.stringify(triggerSt[trigger]));
	trigger=clone(triggerSt[trigger]);
	
	if(trigger.beforeFunction!=0)
		runDo(trigger.beforeFunction);

	if(trigger.terms!=0)
	{
		var def=true;//default
		var count=trigger.terms;
		var length=trigger.doing.length;


		for(var i=1;i<length;i++)
		{
			if(checkTerms(trigger.doing[i][1]))
			{

				if(count!='@')count--;
				runDo(trigger.doing[i][0]);
				def=false;
			}

			if(count!='@')if(count<=0)break;
		}
		
		
	}

	if(def&&trigger.doing[0]!=0)runDo(trigger.doing[0]);

	if(trigger.afterFunction!=0)
		runDo(trigger.afterFunction);
}

function getFunc(func){/*console.log('function='+func)*/;return window[func];}

function type(elem)//тип, возвращает только строчными буквами
{
	if(typeof elem ==='undefined')return 'undefined';
	if(isFinite(elem)&&!isNaN(elem)) return 'infinity';
	if(typeof elem ==='boolean')return 'boolean';
	if(typeof elem == 'function')return 'function';
	if(elem instanceof window.Array)return 'array';
	if(elem instanceof window.Object)return 'object';
	if (Number(elem)!==NaN)return 'number';
	return 'string';
}

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;
    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function deleteFromArray(array, index)
{
	if(type(array)=='array')
	{	
		array.splice(index ,1)
	}
	else delete array[index];
	
}

function compare(first, operator, second)
{

	switch(operator)
	{
		case '<':return first<second;
		case '>':return	first>second;
		case '==':return first==second;
		case '!=':return first!=second;
		case '<=':return first<=second;
		case '>=':return first>=second;
		case '===':return first===second;
		case '!==':return first!==second;
	}
}

function value(path)
{

	return (function(subj,deep)
	{

		if(deep<path.length-1||subj[0]!='#')
		{
			if (type(subj)=='array'||type(subj)=='object')
			{
				if(subj[0]=='#')//проверяем нулевой элемент если # то там данные 
				{
					switch(path[deep+1])
					{
						case '@':
							if(path[deep+2]=="#")
							{
								if (type(subj)=='array')
								{
									var buffer=[];
										for(var i=1; i<subj.length; i++)//длина 
											if(subj[i][0]=='#')
												console.log('get @ # error it`s no link array')
											else buffer[i-1]=subj[i];
								}
								else 
									{
										var buffer={};
										for(var i in subj)
											if(i!="0")
												buffer[i]=subj[path[deep+1]];
									}
							}else{
									if (type(subj)=='array')
									{
										var buffer=[];
										for(var i=1; i<subj.length; i++)//['#', ['locationList', 2, 1], ['locationList', 1, 2]]
										{
											buffer[i-1]=arguments.callee(subj[i],deep+1);	
										}
									}
									else 
									{
										var buffer={};
										for(var i in subj)
											if(i!="0")
												buffer[i]=arguments.callee(subj[i],deep+1);
									}
								}
							return buffer;
							break;

							default:deep++;return arguments.callee(subj[path[deep]],deep);
					}
				}
					else//иначе ссылка на элемент
					{
						switch(path[deep+1])
						{
							case '#': 
								if(type(subj)=='array')
								{
									return subj.slice(1);

								}else if(type(subj)=='object')
								{
									var buffer={};
									for(var i in subj[path[deep]])
										if(i!="0")
											buffer[i]=subj[i];
									return buffer
								} else{console.log('Not array or object'); return false}
							break;

							default:	

								if (type(subj)=='array')
								{
									var buffer=[];
									buffer[0]='#';
									for(var i=1; i<subj.length; i++)
										buffer[i]=data[subj[0]][subj[i]];
								}
								else
									{
										var buffer={};
										for(var i in subj)
											{
												buffer[i]=i=="0"?'#':buffer[i]=data[subj[0]][subj[i]];//данные найденные по 	имени ярлыка и по индексу находящему в искомом объекте
											}
									}
	
								return arguments.callee(buffer,deep);
	
						}
					}
				}
				else {/*console.log("end="+subj);*/ return subj}
		}
		else {/*console.log("End="+subj);*/return subj}
	})(data[path[0]],0);
}

function getCalcValue(param)//# path, $ type param 
{

	var l=param[1].length;
	for(var i=0;i<l;i++)
		if(type(param[1][i])=='array')
				param[1][i]=getCalcValue(param[1][i]);//}

	if(param[0]=='#')return getValue(param[1]);
	if(param[0]=='$')return doing(param[1])(param[2]);
	return false;
}

function getFullPath(value, arr)
{
	var length=arr.length;
	for(var i=0;i<length;i++)
	{
		if(arr[i]=='_')arr[i]=value;
	}
	return arr;
}


function getValue(path)
{
	var length=path.length;
	for(var i=0;i<length;i++)
		if(type(path[i])=='array')path[i]=getCalcValue(path[i]);

	return value(path, 'get', false);
}
//['test','@','#'], ['_', '==', '1']
function setValue(chValue, setTo,terms)//['item','2','type'] ['bagpack', '@', 'type']
{

	var last=chValue.length - 1;//
	var length=chValue.length;
	for(var i=0;i<length;i++)
		if(type(chValue[i])=='array')chValue[i]=getCalcValue(chValue[i]);



	function compareValue(value)
	{
		if(!terms||type(value)=='undefined')return true;
		//console.log('term is exist');
		var comparedValue;
		switch(terms[2])
		{
			case '#':
			case '$':comparedValue=getCalcValue(
							getFullPath(value,terms.slice(2))
							);break

			case '_':comparedValue=value;break

			default:comparedValue=terms[2];
		}


		if(terms[0]==='_') return compare(value, terms[1], comparedValue);
		if(type(terms[0])=='array')
			return compare(
							getValue(getFullPath(value, terms[0])), 
							terms[1], 
							comparedValue
							);
	}

	switch(chValue[last])
	{
		case '@':
			var valueSt=getValue(chValue.slice(0,last));
	
			if(type(valueSt)=='array')
			{
				var l=valueSt.length;
				
	
				for(var i=1;i<l;i++)
					if(compareValue(valueSt[i]))
						{if(setTo===false)deleteFromArray(valueSt, i);
						else valueSt[i]=setTo;/*console.log('ok')*/}
			}
			else if(type(valueSt)=='object')
				{
					//console.log('object ok');
				}
				else if(setTo===false)deleteFromArray(valueSt, last)
					else valueSt[last]=setTo;
		break;

		case '#':
				function compareAndSet(arr, index)
				{
					if(compareValue(arr[index]))
						if(setTo===false){deleteFromArray(arr, index);return true}
						else arr[index]=setTo;

					return false;
				}

				if(chValue.length>2)var valueSt=getValue(chValue.slice(0,last-1));
				else var valueSt=data;
				switch(chValue[last-1])
				{
					case '@':
						switch(type(valueSt))
						{
							case 'array':
								var length=valueSt.length;
								for(var i=1;i<length;i++)
								{
									var l=valueSt[i].length;
									for(var ii=1;ii<l;ii++)
										compareAndSet(valueSt[i], ii);
								}
							break;

							case 'object':
								for(var i in valueSt)
								{
									if (i=='0')break;
									var l=valueSt[i].length;
									for(var ii=1;ii<l;ii++)
										compareAndSet(valueSt[i], ii);
								}
							break;

							default:
								if(setTo===false)deleteFromArray(valueSt, last)
									else valueSt[last]=setTo;
						}
					break;

					default:
						var penult=valueSt[chValue[last-1]];//предпоследний, received from penult point of value path

						switch(type(penult))
						{
							case 'array':

								for(var i=1;i<penult.length;i++)
									if(compareAndSet(penult, i))i--;
							break;
							case 'object':
								for(var i in penult)
									compareAndSet(penult, i);
								break;
							default:console.log(' Set # error:Not array or object'+penult);
						}

				}

		break;

		default:
				switch(chValue[last-1]) 
				{
					case '#':
						if(chValue.length>3)var valueSt=getValue(chValue.slice(0,last-2));
						else var valueSt=data;
						valueSt=valueSt[chValue[last-2]];

						if(compareValue(valueSt[chValue[last]]))
						{
		
							if(setTo===false)deleteFromArray(valueSt, chValue[last]);
								else valueSt[chValue[last]]=setTo;
						}
					break;

					default:
						if(chValue.length==1)var valueSt=data;
							else var valueSt=getValue(chValue.slice(0,last));

						if(compareValue(valueSt[chValue[last]]))
							{

								if(setTo===false)deleteFromArray(valueSt, chValue[last]);
									else valueSt[chValue[last]]=setTo;
							}
				}
	}
}

function delValue(changedValue, terms)//['locationList', '@'],['_','==','test']
{
	if(terms)return setValue(changedValue, false, terms);
	else return setValue(changedValue, false, false);
}



var terms=
(function(){
	termsList=
	{
		value:function(param){//receivedValue, typeCompare,value если value # то это ссылка на элемент
								var receivedValue=getValue(param[0]);
								var value;

								if(param[2]=='#'||param[2]=='$')value=getCalcValue(param.slice(2));
								else value=param[2];

								return compare(receivedValue, param[1], value)
								
								},

		isExist:function(param){
									var list=getValue(param[0]);
									if(type(list)=='object')
									{
										for(var i in list)
											if(list[i]===param[1])return true;
									}

									else if (type(list)=='array')
									{
										for(var i=0; i<list.length; i++)
											if(list[i]===param[1])return true;
									}else if(list===param[1]&&type(list)!=='undefined')return true;
										

									return false;
								},

		notExist:function(param){//where,what
									var list=getValue(param[0]);
									if(type(list)=='object')
									{
										for(var i in list)
											if(list[i]===param[1])return false;
									}

									else if (type(list)=='array')
									{
										for(var i=0; i<list.length; i++)
											if(list[i]===param[1])return false;
									}else if(list===param[1]&&type(list)!=='undefined')return false;
										
									return true;
								}

	}

	return function(what){return termsList[what]}
})()

var doing=
(function(){
	doList=
	{
		func:function(param){getFunc(param[0])(param[1])},//func,param
		change:function(param){//changedValue, setTo

								if(param[1]=='#'||param[1]=='$'||param[1]=='*')param[1]=getCalcValue(param.slice(1))
								setValue(param[0], param[1],false)
								},
		trigger:function(param)
								{
									//console.log('trigger');
									//console.log(param);
									//console.log('curCommand');
									//console.log(data.curCommand);
									if(param[0]=='#'||param[0]=='$')
									//if(type(param[0])=='#'||type(param[0])=='$'){alert(1234);
										param[0]=getCalcValue(param);
									runTrigger(param[0])
								},//trigger
		arith:function(param){//changedValue, operator, value

								var value;
								if (param[2]=='#')value=getValue(param[3]);else value=param[2];
								switch(param[1])
									{
										case '+':setValue(param[0], Math.round(getValue(param[0])*1+value*1));break;
										case '-':setValue(param[0], Math.round(getValue(param[0])-value));break;
										case '*':setValue(param[0], Math.round(getValue(param[0])*value));break;
										case '/':setValue(param[0], Math.round(getValue(param[0])/value));break;
										case '%':setValue(param[0], Math.round(getValue(param[0])%value));break;
									}
							},
		sum:function(param){//where,what
								var list=getValue(param[0]);

								var responce=0;
								if(type(list)=='object')
								{
									for(var i in list)
										if(list[i]===param[1])responce+=list[i];
								}
								else if (type(list)=='array')
								{

									for(var i=0; i<list.length; i++)
										responce+=list[i];
								}else if(type(list)!=='undefined')return list;
									
								return responce;
							},
		count:function(param){//where,what
								var list=getValue(param[0]);
								var responce=0;
								if(type(list)=='object')
								{
								if(type(param[1])!=='undefined')
									{for(var i in list)
										if(list[i]===param[1])responce++;}
								else for(var i in list)
										if(list[i]===param[1])responce++;
								}

								else if (type(list)=='array')
								{
								if(type(param[1])!=='undefined')
									{for(var i=0; i<list.length; i++)
										if(list[i]===param[1])responce++;}
								else responce = list.length ;
								}else if(type(list)!=='undefined')return 1;
									
								return responce;
							},				
		eval:function(param){/*console.log(param);*/eval(param[0])},//codeStr
		del:function(param)//path, terms
		{
			delValue(param[0],param.slice(1))
		},
		getLastIndex:function(param)
		{
			var arr=getValue(param);
			if(type(arr)=='array')return arr.length-1;
			//console.log('getLastIndex error: Not array');
			//console.log(param);
			return false;
		},
		getNextIndex:function(param)
		{
			var arr=getValue(param);
			if(type(arr)=='array')return arr.length;

			return false;
		}
	}
	return function(what){return doList[what]}

})()

return {run:runTrigger}
})()