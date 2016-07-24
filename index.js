
var inputval=document.querySelector(".val");
var nowul=document.querySelector(".nowul");
var comul=document.querySelector(".comul");
var nowTips=document.querySelector(".num1");
var comTips=document.querySelector(".num2");
console.log(nowTips)

inputval.onkeydown=function(e){
	if(e.keyCode==13)
	{
		var val=inputval.value;
		if(val.length==0)
		{
			alert("请添加ToDo");
			return;
		}	
		var data=getData();
		data.push({title:val,status:false});
		this.value="";
		saveData(data);
		reload();

	}
}
reload()
function saveData(data)
{
	localStorage.setItem("todos",JSON.stringify(data));
}

function getData(){
	var data=JSON.parse(localStorage.getItem("todos"));
	return data||[];
}


function reload(){
	var nowStr="",comStr="",nowNum=0,comNum=0;
	var data=getData();
	for(var i=0;i<data.length;i++)
	{
		if(data[i].status==false)
		{	
			nowStr+='<li><input type=checkbox class=check onclick=changeStatus('+i+',true)><div class=text contenteditable onblur=changeContent('+i+',this.innerHTML)>'+data[i].title+'</div><div class=del onclick=del('+i+')>--</div></li>'
			nowNum++;
		}else{
			comStr+='<li><input type=checkbox class=check onclick=changeStatus('+i+',false) checked><div class=text contenteditable onblur=changeContent('+i+',this.innerHTML)>'+data[i].title+'</div><div class=del onclick=del('+i+')>--</div></li>'
			comNum++;
		}
		nowul.innerHTML=nowStr;
		comul.innerHTML=comStr;
		nowTips.innerHTML=nowNum;
		comTips.innerHTML=comNum;
		// console.log(nowNum)
	}
}

function changeStatus(i,sta)
{
	var data=getData();
	data[i].status=sta;
	saveData(data);
	reload();
}

function changeContent(i,content)
{
	var data=getData();
	data[i].title=content;
	saveData(data);
}

function del(i)
{
	var data=getData();
	data.splice(i,1);
	saveData(data);
	reload();
}
