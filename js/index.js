var allSelected = tools.$(".allSelected")[0];///全选按钮  ***注意因为class是一组所有[0]不能少***
var filesSet = tools.$('.filesSet')[0];
var content = tools.$('.content')[0];
var lis = tools.$('li',filesSet);//filesSet下面的li
var checkInput = tools.$(".checkInput",filesSet);//每一个按钮
var icon = tools.$(".icon",filesSet);//filesSet下面的icon
var selectdeNum = 0;////统计多少条被选中了
//全选按钮
tools.addEvent(allSelected,"click",function (){
	//常规思路是这样写
	/*for (var i = 0; i < icon.length; i++) {
		if(this.checked){
			icon[i].style.borderColor = '#2e80dc';
			checkInput[i].style.display = 'block';
		}else{
			icon[i].style.borderColor = '#fff';
			checkInput[i].style.display = 'none';
		}
		checkInput[i].checked = this.checked;
	}*/
	
	//三目写法是这样写
	/*for( var i = 0; i < icon.length; i++ ){
		icon[i].style.borderColor = this.checked ? "#2e80dc" : "#fff";
		checkInput[i].style.display = this.checked ? "block" : "none";
		checkInput[i].checked = this.checked;
	};*/
	var _this = this;
	tools.each(icon,function (item,i){
		icon[i].style.borderColor = _this.checked ? "#2e80dc" : "#fff";
		checkInput[i].style.display = _this.checked ? "block" : "none";
		checkInput[i].checked = _this.checked;	
	});
//	seletedNum = this.checked ? checkInput.length : 0;
});
//每一个按钮
tools.each(checkInput,function(item,index){
	tools.addEvent(item,'click',function(){
		if(this.checked){
			allSelected.checked = true;
			tools.each(checkInput,function(item1){
				if(!item1.checked){
					allSelected.checked = false;
				}
			});
//			seletedNum++;
		}else{
			allSelected.checked = false;
//			seletedNum--;
		}
	})
});
//碰撞检测

//tools.addEvent(document,'mousedown',function(ev){
//	
//})
tools.addEvent(content,'mousedown',function(ev){
	var e = ev || event;
	var disX = e.clientX;
	var disY = e.clientY;
	var oDiv = document.createElement('div');
	oDiv.className = 'collision';
	oDiv.style.left = e.clientX + 'px';
	oDiv.style.top = e.clientY + 'px';
	document.body.appendChild(oDiv);
	document.onmousemove = function(ev){
		var e = ev || event;
		if(e.clientX>disX){
			oDiv.style.left = disX + 'px';
		}else{
			oDiv.style.left = e.clientX + 'px';
		}
		if(e.clientY>disY){
			oDiv.style.top = disY + 'px';
		}else{
			oDiv.style.top = e.clientY + 'px';
		}
		oDiv.style.width = Math.abs(e.clientX -disX) + 'px';
		oDiv.style.height = Math.abs(e.clientY -disY) + 'px';
		for (var i = 0; i < lis.length; i++) {
			if(tools.collisionRect(oDiv,lis[i])){
				icon[i].style.borderColor = '#2e80dc';
				checkInput[i].style.display = 'block';
				checkInput[i].checked = true;
			}else{
				icon[i].style.borderColor = '#fff';
				checkInput[i].style.display = 'none';
				checkInput[i].checked = false;
			}
		}
	}
	document.onmouseup = function(){
		document.body.removeChild(oDiv)
		document.onmousemove=document.onmouseup = null;
	}
	ev.preventDefault();
});
	

