dg={}

dg.getDg=function(subjDg,item)
{
	if(dgSt[subjDg][item].dgTr==0)return dgSt[subjDg];

	tr(dgSt[subjDg][item].dgTr,"dg");

	return dgStateSt[subjDg].concat(dgSt[subjDg]);
}

dg.initDg=function(subjDg)
{
	system.pause();
	ui.outDg(dg.getDg(subjDg,0));
}

[
[['val','>',33,'level'],['func','+','bozar','inventory']],
[['func',12345,'addExp']['func','bozar','addItem']],
]