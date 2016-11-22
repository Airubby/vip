(function(){
	
//文字输入
var text=document.getElementById('text');
var textSpan=text.getElementsByTagName('span');
var textNum=0;
var shakeLine=document.getElementById("shakeLine");
var tTimer=null;
var baozhi=document.getElementById("baozhi");
//球球
var boxOne1=document.getElementsByClassName('boxOne')[0];
var boxTwo1=document.getElementsByClassName('boxTwo')[0];
var boxThree=document.getElementsByClassName('boxThree')[0];
var planetTop=0;
var sTimer=null;
var planet=document.getElementById("planet");
var planetDiv=planet.getElementsByTagName('div');
var line=document.getElementById("line");
var lineEm=line.getElementsByTagName('em');
var oPlanetX=[];
var oPlanetY=[];
var nPlanetX=[];
var nPlanetY=[];
var lineX=[];
var lineY=[];
var attractObj={};
var attractX=null;
var attractY=null;
var iTimer=null;
var swapOff=true;
var time=3000;


//文字输入
function textShow(){
	if(baozhi.className==''){
		baozhi.className='baozhi';
	}
	textSpan[textNum].style.visibility="visible";
	shakeLine.style.left=230+14*((textNum+1)%6)+"px";
	if(textNum==5){
		shakeLine.style.left="230px";
		shakeLine.style.bottom="105px";
	}
	textNum++;
	if(textNum>=textSpan.length){
		clearInterval(tTimer);
		shakeLine.style.bottom="123px";
		shakeLine.style.display="none";
		textNum=0;
		setTimeout(function(){
			for(var i=0;i<textSpan.length;i++){
				textSpan[i].style.visibility="collapse";
			}
			baozhi.className='';
			setTimeout(function(){
				shakeLine.style.display="block";
				tTimer=setInterval(textShow,300);
			},2500);
		},800);
	}
	
}
tTimer=setInterval(textShow,300);

//球球
//iTimer = setInterval(swap,time);  //开始就监听自动运动
for(var i=0;i<lineEm.length;i++){
	lineX.push(lineEm[i].offsetLeft);
	lineY.push(lineEm[i].offsetTop);
}
for(var i=1;i<planetDiv.length;i++){
	planetDiv[i].index=i;
	nPlanetX.push(planetDiv[i].offsetLeft);
	nPlanetY.push(planetDiv[i].offsetTop);
	oPlanetX.push(planetDiv[i].offsetLeft);
	oPlanetY.push(planetDiv[i].offsetTop);
}

boxThree.addEventListener('mousemove',find,false);
function find(event){
	
	var e=event||window.event;
	var sTop=document.documentElement.scrollTop||document.body.scrollTop;
	planetTop=parseInt(boxOne1.offsetHeight)+parseInt(boxTwo1.offsetHeight);
	var mouseX=e.clientX-planet.offsetLeft;
	var mouseY=e.clientY+sTop-planetTop;
	for(var i=1;i<planetDiv.length;i++){
		var centerX=nPlanetX[i-1]+planetDiv[i].offsetWidth/2;
		var centerY=nPlanetY[i-1]+planetDiv[i].offsetHeight/2;
		
		if(i==1&&Math.abs(centerX-mouseX)<70&&Math.abs(centerY-mouseY)<70){
			console.log(1)
			clearInterval(iTimer);
			attractX=centerX;
			attractY=centerY;
			attractObj=planetDiv[i];
			boxThree.addEventListener('mousemove',attract,false);
			return;
		}
		if(i!=1&&Math.abs(centerX-mouseX)<50&&Math.abs(centerY-mouseY)<50){
			console.log(1)
			clearInterval(iTimer);
			attractX=centerX;
			attractY=centerY;
			attractObj=planetDiv[i];
			boxThree.addEventListener('mousemove',attract,false);
			return;
		}
		
	}
}
function attract(ev){
	boxThree.removeEventListener('mousemove',find,false);
	var e=ev||window.event;
	var sTop=document.documentElement.scrollTop||document.body.scrollTop;
	var mouseX=e.clientX-planet.offsetLeft;
	var mouseY=e.clientY+sTop-planetTop;
	
	attractObj.style.left=mouseX-attractObj.offsetWidth/2+"px";
	attractObj.style.top=mouseY-attractObj.offsetHeight/2+"px";
	attractObj.lineShake();
	
	if(Math.abs(attractX-mouseX)>=150||Math.abs(attractY-mouseY)>=150){
		
		boxThree.removeEventListener('mousemove',attract,false);
		clearTimeout(attractObj.iTime);
		
		attractObj.iTime = setTimeout(function(){
				
			attractObj.shake(function(){
				
				boxThree.addEventListener('mousemove',find,false);
				
			});
			iTimer = setInterval(swap,time);
		},15);
		
	}
}

planetDiv[1].lineShake=function(){
	
	linePlace(this,planetDiv[2],lineEm[0],false)
	linePlace(this,planetDiv[3],lineEm[2],true);
	linePlace(this,planetDiv[4],lineEm[4],false);
	
}
planetDiv[2].lineShake = function(){
		
	linePlace(this,planetDiv[1],lineEm[0],true);
	linePlace(this,planetDiv[3],lineEm[1],true);
	linePlace(this,planetDiv[4],lineEm[3],true);
	
}
planetDiv[3].lineShake = function(){
	
	linePlace(this,planetDiv[2],lineEm[1],false);
	linePlace(this,planetDiv[1],lineEm[2],false);
	linePlace(this,planetDiv[4],lineEm[5],false);
	
}
planetDiv[4].lineShake = function(){
	
	linePlace(this,planetDiv[2],lineEm[3],false);
	linePlace(this,planetDiv[1],lineEm[4],true);
	linePlace(this,planetDiv[3],lineEm[5],true);
	
}
	
function linePlace(obj1,obj2,obj3,boolean){
	
	var centerX1 = obj1.offsetLeft + obj1.offsetWidth/2;
	var centerY1 = obj1.offsetTop + obj1.offsetHeight/2;
	var centerX2=obj2.offsetLeft+obj2.offsetWidth/2;
	var centerY2=obj2.offsetTop+obj2.offsetHeight/2;
	var themDistanceX=Math.abs(centerX1-centerX2);
	var themDistanceY=Math.abs(centerY1-centerY2);
	var hudu=Math.atan2(themDistanceY,themDistanceX);
	var deg=hudu*180/Math.PI;
	var themDistance=Math.sqrt(themDistanceX*themDistanceX+themDistanceY*themDistanceY);
	
	if(boolean){
		if(centerX1>centerX2){
			deg=180-deg;
		}
		if(centerY1>centerY2){
			deg=-deg;
		}
		obj3.style.left = centerX1 + 'px';
		obj3.style.top = centerY1 + 'px';
	}else{
		if(centerX1<centerX2){
			deg=180-deg;
		}
		if(centerY1<centerY2){
			deg=-deg;
		}
	}
	obj3.style.WebkitTransform = 'rotate('+deg+'deg)';
	obj3.style.transform = 'rotate('+deg+'deg)';
	obj3.style.width = themDistance+'px';
	
}

for(var i=1; i<planetDiv.length; i++){
		
	planetDiv[i].shake = function(fn){
		
		var _this = this;
		var neg = -1;
		this.iTimer = setInterval(function(){
			
			var sX = _this.offsetLeft - nPlanetX[_this.index-1];
			var sY = _this.offsetTop - nPlanetY[_this.index-1];
			var speedX = sX/5;
			var speedY = sY/5;
			
			_this.style.left = nPlanetX[_this.index-1] + (sX-speedX)*neg + 'px';
			_this.style.top = nPlanetY[_this.index-1] + (sY-speedY)*neg + 'px';
			_this.lineShake();
			neg = -neg;
			if(Math.abs(sX)<=5&&Math.abs(sY)<=5){
				
				clearInterval(_this.iTimer);
				_this.style.left = nPlanetX[_this.index-1] + 'px';
				_this.style.top = nPlanetY[_this.index-1] + 'px';
				_this.lineShake();
				setTimeout(function(){
					
					fn&&fn();
					
				},150);
				
			}
			
		},15);
		
	}
	
}

function swap(){
	
	swapOff = false;
	boxThree.removeEventListener('mousemove',find,false);
	for (var i=1; i<planetDiv.length; i++) {
		
		var disX = Math.round(Math.random()*60-30);
		var disY = Math.round(Math.random()*60-30);
		var left = oPlanetX[i-1]+disX;
		var top = oPlanetY[i-1]+disY;
		move(planetDiv[i], { left: left, top: top }, 1000, 'easeBoth',function(){
			
			nPlanetX.length = 0;
			nPlanetY.length = 0;
			
			for(var i=0; i<lineEm.length; i++){
		
				lineX.push(lineEm[i].offsetLeft);
				lineY.push(lineEm[i].offsetTop);
				
			}
			for(var i=1; i<planetDiv.length; i++){
				
				nPlanetX.push(planetDiv[i].offsetLeft);
				nPlanetY.push(planetDiv[i].offsetTop);
			}
			swapOff = true;
			boxThree.addEventListener('mousemove',find,false);
			
		}, function(){
			
			for (var j=1; j<planetDiv.length; j++) {
				planetDiv[j].lineShake();
			}
			
		});
		
	}
	
}


for(var i=1;i<planetDiv.length;i++){
	planetDiv[i].addEventListener('mousedown',press,false);
}

function press(ev){
	
	if(!swapOff){
		return;
	}
	swapOff=false;
	clearInterval(iTimer);
	boxThree.removeEventListener('mousemove',find,false);
	boxThree.removeEventListener('mousemove',attract,false);
	
	var e=ev||window.event;
	var _this=this;
	var clientX=e.clientX;
	var clientY=e.clientY;
	var left = this.offsetLeft;
	var top = this.offsetTop;
	
	if(e.preventDefault){
		e.preventDefault();
	}else{
		window.event.returnValue = false;
	}
	
	boxThree.addEventListener('mousemove',drag,false);
	document.addEventListener('mouseup',clear,false);
	
	function drag(ev){
		
		var e = ev || window.event;
		_this.lineShake();
		for(var i=1; i<planetDiv.length; i++){
			if(i==_this.index){
				planetDiv[i].style.left = left + (e.clientX-clientX)/2 + "px";
				planetDiv[i].style.top = top + (e.clientY-clientY)/2 + "px";
			}else{
				planetDiv[i].style.left = nPlanetX[i-1] + (_this.offsetLeft - nPlanetX[_this.index-1])*Math.abs(_this.offsetLeft-planetDiv[i].offsetLeft)/3000 + "px";
				planetDiv[i].style.top = nPlanetY[i-1] + (_this.offsetTop - nPlanetY[_this.index-1])*Math.abs(_this.offsetTop-planetDiv[i].offsetTop)/3000 + "px";
			}
			planetDiv[i].lineShake();
		}
		
	}
	
	function clear(){
		boxThree.removeEventListener('mousemove',drag,false);
		document.removeEventListener('mouseup',clear,false);
		_this.removeEventListener('mousedown',press,false);
		planetDiv[_this.index].shake(function(){
			swapOff = true;
			_this.addEventListener('mousedown',press,false);
			boxThree.addEventListener('mousemove',find,false);
		});
		for (var i=1; i<planetDiv.length; i++) {
				
			if(i!=_this.index){
				
				planetDiv[i].shake();
				
			}
			
			
		}
		iTimer = setInterval(swap,time);
	}
	
	return false;
	
}







})();

















