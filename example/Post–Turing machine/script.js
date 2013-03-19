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

function delEl(id)
{
	var el=getE(id);
	el.parentNode.removeChild(el);
}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var amount=1;

function newCommand()
{
	amount++;
	var number=document.createElement('span');
	number.innerHTML=amount;
	number.id=amount+'_span';
	var command=document.createElement('input');
	command.type='text';
	command.id=amount+"_text";
	var br=document.createElement('br');
	br.id=amount+"_br";
	var parent=getE('container');
	parent.appendChild(br);
	parent.appendChild(number);
	parent.appendChild(command);
	getE('!_span').innerHTML=amount+1;
	/*getE('container').innerHTML+="<br/><span id='"+amount+"_span'></span><input id='"+amount+"_text' onkeydown='newCommand()' type='text'></input>";*/
}

function delCommand()
{
	delEl(amount+"_span");
	delEl(amount+"_text");
	delEl(amount+"_br");
	amount--;
	getE('!_span').innerHTML=amount+1;
}

function printMachine()
{
	var table='<table>';
	table+=printMachine.indexString;
	table+='<tr>';
	for(var i=1;i<41;i++)
		if(i==data.curIndex)table+='<td style="border:solid">'+data.string[i]+'</td>';
		else table+='<td >'+data.string[i]+'</td>';
	table+='</tr>';

	table+='</table>';
	getE('machine').innerHTML=table;
	getE('command').innerHTML=data.curCommand;
}

printMachine.indexString='<tr>';
for(var i=0;i<40;i++)
	if(i<10)printMachine.indexString+='<td >0'+i+'</td>';
	else printMachine.indexString+='<td >'+i+'</td>';
printMachine.indexString+='</tr>';



function initCommand()
{
	delete data.command;
	data.command=['#'];
	for(var i=1;i<=amount;i++)
	{

		data.command[i]={'0':'#'}
		var comm=getE(i+"_text").value;
		if(comm.charAt(0)=='?')
			{
				data.command[i]['command']='?';
				data.command[i]['next']=comm.slice(1).split(':')[0];
				data.command[i]['next2']=comm.slice(1).split(':')[1];
			}
		else
			{
				data.command[i]['command']=comm.charAt(0);
				data.command[i]['next']=comm.slice(1);
			}
	}
	data.command[amount+1]={'0':'#','command':'!'}
}

function run() 
{
	reset();
	initCommand();
	se.run('run');
	printMachine();
}

function reset()
{
	se.run('reset');
	data.chBfExec=1;
	data.curCommand=0;
	data.curIndex=1;
	printMachine();
}

function next()
{
	initCommand();
	data.chBfExec=0;
	if(data.curCommand==0)se.run('run');
	else se.run('next');
	printMachine();
}

