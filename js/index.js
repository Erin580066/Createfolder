function createNewFile(data,onOff){
	var li = document.createElement('li')
	var str = '';
	str += '<div class="icon">'+
				'<input type="checkbox"  class="checkInput" />'+
				'</div>';
			if(onOff){
				str+='<strong style="display:block;">'+data.name+'</strong>';
			}else{
				str+='<strong style="display:none;">'+data.name+'</strong>';
			}
			if(onOff){
				str += '<div class="clearFix edtor"  style="display:none;">';
			}else{
				str += '<div class="clearFix edtor"  style="display:block;">';
			}		
			str+='<input type="text" value="'+data.name+'" class="createInputBtn"  />'+
					'<input type="button" value="√" />'+
					'<input type="button" value="×" />'+
				'</div>';
	li.innerHTML = str
	return li;
}
//createNewFile(data.files,true);
var allSelected = tools.$(".allSelected")[0];///全选按钮  ***注意因为class是一组所有[0]不能少***
var filesSet = tools.$('.filesSet')[0];
var content = tools.$('.content')[0];
var lis = tools.$('li',filesSet);//filesSet下面的li
var icon = tools.$(".icon",filesSet);//filesSet下面的icon
var selectdeNum = 0;////统计多少条被选中了
var createFolder = tools.$('.createFile')[0];//创建文件夹按钮
var info = tools.$('.info')[0];
var selectNum = tools.$('.selectNum')[0];
var span =tools.$('span',selectNum)[0];

////生成动态文件夹
filesSet.innerHTML = '';
for(var i=0;i<data.files.length;i++){
	var newLi = createNewFile(data.files[i],true);
	filesSet.appendChild(newLi);
}

var checkInput = tools.$(".checkInput",filesSet);//每一个按钮

//创建文件夹
tools.addEvent(createFolder,'click',function(){
	var newLi = createNewFile();
	filesSet.appendChild(newLi);
	
})
//全选按钮
tools.addEvent(allSelected,"click",function (){
	//常规思路是这样写
	for (var i = 0; i < icon.length; i++) {
		if(this.checked){
			icon[i].style.borderColor = '#2e80dc';
			checkInput[i].style.display = 'block';
			info.style.display = 'block';
			span.innerHTML = icon.length;
		}else{
			icon[i].style.borderColor = '#fff';
			checkInput[i].style.display = 'none';
			info.style.display = 'none';
		}
		checkInput[i].checked = this.checked;
	}
	//三目写法是这样写
	/*for( var i = 0; i < icon.length; i++ ){
		icon[i].style.borderColor = this.checked ? "#2e80dc" : "#fff";
		checkInput[i].style.display = this.checked ? "block" : "none";
		checkInput[i].checked = this.checked;
	};*/
//	var _this = this;
//	tools.each(icon,function (item,i){
//		icon[i].style.borderColor = _this.checked ? "#2e80dc" : "#fff";
//		checkInput[i].style.display = _this.checked ? "block" : "none";
//		checkInput[i].checked = _this.checked;
//	});
	seletedNum = this.checked ? checkInput.length : 0;
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
			seletedNum++;
		}else{
			this.parentNode.style.borderColor = '#fff';
			this.style.display = 'none';
			allSelected.checked = false;
			seletedNum--;
			if(seletedNum==0){
				info.style.display = 'none';
			}
		}
		span.innerHTML = seletedNum;
	})
});

//碰撞检测
tools.addEvent(content,'mousedown',function(ev){
	var e = ev || event;
	var disX = e.clientX;
	var disY = e.clientY;
	var num11=0;
	var oDiv = document.createElement('div');
	oDiv.className = 'collision';
	document.body.appendChild(oDiv);
	tools.addEvent(document,'mousemove',handleMove);
	tools.addEvent(document,'mouseup',up);
	
		function handleMove(ev){
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
			selectdeNum=0;
			for (var i = 0; i < lis.length; i++) {
				if(tools.collisionRect(oDiv,lis[i])){
					icon[i].style.borderColor = '#2e80dc';
					checkInput[i].style.display = 'block';
					checkInput[i].checked = true;
					selectdeNum++;
				}else{
					icon[i].style.borderColor = '#fff';
					checkInput[i].style.display = 'none';
					checkInput[i].checked = false;
				}
				info.style.display = 'block';
			}
			if(selectdeNum==lis.length){
				allSelected.checked = true;
			}else{
				allSelected.checked = false;
			}
			console.log(span)
			span.innerHTML = selectdeNum;
		}
	function up(){
		tools.removeEvent(document,'mousemove',handleMove );
		tools.removeEvent(document,'mouseup',up );
		if(oDiv){
			document.body.removeChild(oDiv);
		}
		
	}
	ev.preventDefault();
});

	

