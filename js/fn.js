//清除obj下面的子元素的class
function clearClass(obj){
	for(var i=0;i<3;i++){
		var divStarChild=obj[i].children;
		for(var j=0;j<divStarChild.length;j++){
			divStarChild[j].className="";
		}
	}
}

//运动效果
function move(obj,json,duration,fx,callback){
	var timer=null;
	var d=duration||1000;  //duration持续时间
	var j={};
	var fx=fx||'linear';
	var time=new Date().getTime();
	for(var attr in json){
		j[attr] = {};
		if (attr == 'opacity'){
			if(json[attr]>1){
				j[attr].b = Math.round(css(obj, attr));
				j[attr].c = json[attr] - j[attr].b;
			}else{
				j[attr].b = Math.round(css(obj, attr));
				j[attr].c = json[attr]*100 - j[attr].b;
			}
		}else{
			j[attr].b = parseInt(css(obj, attr));
			j[attr].c = json[attr] - j[attr].b;
		}
	}
	timer=setInterval(function(){
		var t=new Date().getTime()-time;
		if(t>=d){
			t=d;
		}
		for (var attr in json) {
			var value = Tween[fx](t, j[attr].b, j[attr].c, d);
			css(obj,attr,value);
		}
		if(t==d){
			clearInterval(timer);
			callback && callback.call(obj);
		}
		
	},16);
	
}

function css(obj, attr, value){
	if(!obj){
		return false;
	}
	if(arguments.length==2){
		var value=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr];
		if(attr=='scaleX'||attr=='scaleY'|| attr=='rotateX'||attr=='rotateY'||attr=="translateZ"||attr=="translateX"||attr=="translateY"||attr=="skewY"||attr=="skewX"){
			if(!obj.$Transform){
				obj.$Transform={};
			}
			switch(attr){
				//case 'scale':
				case 'scaleX':
				case 'scaleY':
					return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:1;
					break;
				default:
					return obj.$Transform[attr]?obj.$Transform[attr]:0;
					break;
			}
			
		}
		if(attr=='opacity'){
			return Math.round((parseFloat(value)*100));
		}else{
			return parseInt(value);
		}
	}else if(arguments.length==3){
		switch(attr){
			//case 'scale':
			case 'scaleX':
			case 'scaleY':
			//case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'translateZ':
			case 'translateX':
			case 'translateY':
			case 'skewY':
			case 'skewX':
				setCss3(obj, attr, value);
				break;
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				if(typeof value=="string"){
					obj.style[attr]=value;
				}else{
					obj.style[attr]=value+"px";
				}
				break;
			case 'opacity':
				if(value>1){
					obj.style.filter="alpha(opacity:"+value+")";
					obj.style.opacity=value/100;
				}else{
					obj.style.filter="alpha(opacity:"+value*100+")";
					obj.style.opacity=value;
				}
				break;
			default:
				obj.style[attr]=value;
				break;
		}
	}
	
}

function setCss3(obj, attr, value){
	var sTr="";
	var sVal="";
	var arr=["Webkit","Moz","O","ms",""];
	if(! obj.$Transform){
		obj.$Transform={};
	}
	obj.$Transform[attr]=typeof(value)=='number'?value:parseInt(value);
	for( sTr in obj.$Transform){
		switch(sTr){
			//case 'scale':
			case 'scaleX':
			case 'scaleY':
				sVal+=sTr+"("+obj.$Transform[sTr]+") ";
				break;
			//case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'skewY':
			case 'skewX':
				sVal+=sTr+"("+obj.$Transform[sTr]+"deg) ";
				break;
			case 'translateZ':
			case 'translateX':
			case 'translateY':
				sVal+=sTr+"("+obj.$Transform[sTr]+"px) ";	
				break;
		}
	}
	for(var i=0;i<arr.length;i++){
		obj.style[arr[i]+"Transform"]=sVal;
	}
}




























