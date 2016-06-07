(function(){
//	tools.store("baidu",data.files);
	function createLi(options){
		options = options || {};
		//传进来的对象，某些调用函数的时候，可能只不会传入很多值，只会传入需要的值
		var defaults = {
			name:options.name || "新建文件夹",
			id:options.id || 0
		};
		var li = document.createElement("li");
		var str =   '<div class="icon">'
							+'<input type="checkbox"  class="checkInput" />'
						+'</div>'
						+'<strong>'+defaults.name+'</strong>'
						+'<div class="clearFix edtor">'
							+'<input type="text" value="'+defaults.name+'" class="names"  />'
							+'<input type="button" value="√" class="ok" />'
							+'<input type="button" value="×" class="cancel" />'
						+'</div>';
		li.innerHTML = str;
		li.id = defaults.id;
		return li;
	}
	var filesSet = tools.$(".filesSet")[0];
	var createFile = tools.$(".createFile")[0];//创建文件夹按钮
	var allLi = tools.$("li",filesSet);//获取到所有的li
	var names = null;
	getPidChild(0);
	function getPidChild(id){
//		如果files中没有数据，那么就不再生成li
		if(!files.length){
			return;
		}
		tools.each(files,function (item){
			if( item.pid == id ){
				var newLi = createLi({
					name:item.name,
					id:item.id   //传入id，挂载在生成的li上
				});
				filesSet.appendChild(newLi);
				
			}
		});
	}
	tools.addEvent(createFile,"click",function (){
		if( this.isCreateStatus ){
			names.select();
			return;
		};
		var newLi = createLi();
		filesSet.appendChild(newLi);
		names = tools.$(".names",newLi)[0];
		var strong = tools.$("strong",newLi)[0];
		var edtor = tools.$(".edtor",newLi)[0];
		strong.style.display = "none";
		edtor.style.display = "block";
		names.select();
		this.isCreateStatus = true;
		handleLi(newLi);
		
	});
	tools.each(allLi,function (itemLi){
		handleLi(itemLi)
	});
	function handleLi(li){
		var icon = tools.$(".icon",li)[0];
		var checkInput = tools.$(".checkInput",li)[0];
		var ok = tools.$(".ok",li)[0];
		var cancel = tools.$(".cancel",li)[0];
		var strong = tools.$("strong",li)[0];
		var edtor = tools.$(".edtor",li)[0];
		var names = tools.$(".names",li)[0];
		tools.addEvent(ok,"click",function(ev){
			strong.style.display = "block";
			edtor.style.display = "none";
			strong.innerHTML = names.value;
			createFile.isCreateStatus = false;
			ev.stopPropagation();
		})
		tools.addEvent(cancel,"click",function (ev){
			filesSet.removeChild(li);
			createFile.isCreateStatus = false;
			ev.stopPropagation();
		})
		tools.addEvent(li,"mouseenter",function (){
			if( !createFile.isCreateStatus ){
				icon.style.borderColor = "#2e80dc";	
				checkInput.style.display = "block";	
			}
			
		})
		tools.addEvent(li,"mouseleave",function (){
			if( !checkInput.checked ){
				icon.style.borderColor = "#fff";	
				checkInput.style.display = "none";	
			}
		});
		tools.addEvent(li,"click",function (){
			filesSet.innerHTML = "";

		});
		
	};
	
})()
