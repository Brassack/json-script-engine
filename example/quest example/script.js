if(document.getElementsByClassName) {

	getElementsByClass = function(classList, node) {    
		return (node || document).getElementsByClassName(classList)
	}

} else {

	getElementsByClass = function(classList, node) {			
		var node = node || document,
		list = node.getElementsByTagName('*'), 
		length = list.length,  
		classArray = classList.split(/\s+/), 
		classes = classArray.length, 
		result = [], i,j
		for(i = 0; i < length; i++) {
			for(j = 0; j < classes; j++)  {
				if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
					result.push(list[i])
					break
				}
			}
		}
	
		return result
	}
}


function getE(id)
{
	return document.getElementById(id);
}

function getEbyC(cl)
{
	return document.getElementsByClassName(cl)[0];
}

function ajax(url,callback)
{
	var request = new XMLHttpRequest();
	request.onreadystatechange=function()
	{
		if (request.readyState == 4&&request.status == 200) 
		{
			if(callback)
				callback(request.responseText);
	    	return request.responseText;
    	}
	}
	request.open("GET", url, true);
	request.send(null);
}

function message(i){alert(i)}
function con(i){console.log(i)}


function createTrigger(terms, beforeFunction, doing, afterFunction)
{
	triggerSt[triggerSt.length]={terms:0, beforeFunction:0, doing:0, afterFunction:0};
	var trigger=triggerSt[triggerSt.length-1];
	trigger.terms=terms;
	trigger.beforeFunction=beforeFunction;
	trigger.doing=doing;
	trigger.afterFunction=afterFunction;
}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function add()
{
	se.run('add');
	refresh();
}

function del()
{
	se.run('del');
	refresh();
}

function level()
{
	data.varBuffer=getE('level').value;
	se.run('level');
	refresh();
}

function loc(value)
{
	data.varBuffer=value;
	se.run('location');
	refresh();
}

function refresh()
{
	getE('locationOut').innerHTML=data.location;
	getE('levelOut').innerHTML=data.level;
	getE('level').value=data.level;
	se.run('getBagpack');
	getE('bagpack').innerHTML=data.varBuffer;
	getE('location').value=data.location;
}

function enter()
{
	se.run('enter');
	refresh();
}

