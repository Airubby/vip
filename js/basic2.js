(function(){
	
//摩天轮css样式
var wheel=document.getElementById('wheel');
var wheelSpan=wheel.getElementsByTagName('span');
//提示和点击加入vip的效果
var black=document.getElementById("black");
var popTwo=document.getElementById('popTwo');
var closeTwo=document.getElementById("closeTwo");
var popOne=document.getElementById('popOne');
var closeOne=document.getElementById("closeOne");
var ship=document.getElementById("ship");
var shipA=ship.getElementsByTagName('a')[0];
var shipStar=document.getElementById("shipStar");
//动态给页面span增加class
var arr=[];
var json={};
var manName = [ 'man', 'oldman', 'boy' ];
var womanName = [ 'woman', 'girl' ];
var manNum=0;
var womanNum=0;
var onePieceSpan=document.getElementById('pieceOne').getElementsByTagName('span');
var twoPieceSpan = document.getElementById('pieceTwo').getElementsByTagName('span');
var threePieceSpan = document.getElementById('pieceThree').getElementsByTagName('span');
var spanNum = onePieceSpan.length+twoPieceSpan.length/2+threePieceSpan.length-18;
//鼠标移入移除显示不显示
var boxTwo=document.getElementById('boxTwo');
var span=boxTwo.getElementsByTagName('span');
var randomInfo=document.getElementById('randomInfo');
var randomInfoChild=randomInfo.children;
//搜索事件
var search=document.getElementById('search');
var input=search.getElementsByTagName('input');
var searchBox=document.getElementById("searchBox");
var umbrella=document.getElementById("umbrella");
var umbrellaChild=umbrella.children;
var searchNum=null;
var spanArr=[];
var iTimer=null;
var bOff=true;
var shakeValue=0;
umbrella.bOff=false;
umbrella.uOff=true;
var peoples=document.getElementById('peoples');
var people=peoples.getElementsByTagName('span');
var activeNum=0;

css(wheelSpan[0],'rotate',0);
css(wheelSpan[1],'rotate',15);
css(wheelSpan[2],'rotate',30);
css(wheelSpan[3],'rotate',45);
css(wheelSpan[4],'rotate',59);
css(wheelSpan[5],'rotate',76);
css(wheelSpan[6],'rotate',90);
css(wheelSpan[7],'rotate',104);
css(wheelSpan[8],'rotate',121);
css(wheelSpan[9],'rotate',135);
css(wheelSpan[10],'rotate',150);
css(wheelSpan[11],'rotate',165);
css(wheelSpan[12],'rotate',180);
css(wheelSpan[13],'rotate',194);
css(wheelSpan[14],'rotate',212);
css(wheelSpan[15],'rotate',227);
css(wheelSpan[16],'rotate',239);
css(wheelSpan[17],'rotate',256);
css(wheelSpan[18],'rotate',270);
css(wheelSpan[19],'rotate',285);
css(wheelSpan[20],'rotate',298);
css(wheelSpan[21],'rotate',314);
css(wheelSpan[22],'rotate',330);
css(wheelSpan[23],'rotate',344);


//提示和点击加入vip的效果
if(!sessionStorage.getItem('username')){
	setTimeout(function(){
		black.style.display="block";
		//popTwo.style["WebkitTransform"]=popTwo.style["transform"]="translateY("+black.offsetHeight/2+"px)";
		css(popTwo,"translateY",black.offsetHeight/2);
		closeTwo.onclick=function(){
			clearInterval(this.timer);
			css(popTwo,"translateY",-black.offsetHeight/2);
			setTimeout(function(){
				black.style.display="none";
			},500);
		}
		closeTwo.timer=setTimeout(function(){
			css(popTwo,"translateY",-black.offsetHeight/2);
			setTimeout(function(){
				black.style.display="none";
			},500);
		},8000);
		
	},1000);
}
shipA.onclick=function(){
	shipA.style.WebkitTransform=shipA.style.transform='scale(0,0)';
	setTimeout(function(){
		ship.style.WebkitTransform=ship.style.transform="translateX(0) translateY(0)";
		move(ship, {translateY:-180,translateX:351}, 500, 'easeInStrong', function(){
			shipStar.style.WebkitTransform="skew(-30deg,-30deg) translate(40px,-24px)";
			shipStar.style.transform="skew(-30deg,-30deg) translate(40px,-24px)";
			shipStar.style.opacity = 0;
			setTimeout(function(){
				black.style.display="block";
				css(popOne,"translateY",black.offsetHeight/2);
				css(ship,"opacity",0);
				shipStar.style.WebkitTransform="skew(0deg,0deg) translate(0px,0px)";
				shipStar.style.transform="skew(0deg,0deg) translate(0px,0px)";
				css(ship,'translateX',-202);
				css(ship,'translateY',144);
			},500);
		});
	},500);
}
closeOne.onclick=function(){
	css(popOne,"translateY",-black.offsetHeight/2);
	setTimeout(function(){
		black.style.display="none";
		setTimeout(function(){
			move(ship,{opacity:1},500,'linear');
			move(ship, {translateX:0,translateY:0}, 1000, 'backOut',function(){
				css(shipStar,"opacity",1);
				shipA.style.WebkitTransform=shipA.style.transform='scale(1,1)';
			});
		},500);
	},500);
}

//动态给页面span增加class
while(arr.length<spanNum){
	var num=Math.floor(Math.random()*data.length);
	if(!json[num]){
		arr.push(num);
		json[num]=1;
	}
}
for(var i=0;i<onePieceSpan.length;i++){
	if(data[arr[i]].sex=="man"){
		onePieceSpan[i].className=manName[manNum%manName.length];
		manNum++;
	}else{
		onePieceSpan[i].className=womanName[womanNum%womanName.length];
		womanNum++;
	}
	onePieceSpan[i].name = data[arr[i]].name;
	onePieceSpan[i].time = data[arr[i]].time;
	onePieceSpan[i].sex = data[arr[i]].sex;
}
for(var i=0;i<twoPieceSpan.length/2;i++){
	if(data[arr[i+onePieceSpan.length]].sex=="man"){
		twoPieceSpan[i].className=twoPieceSpan[i+twoPieceSpan.length/2].className=manName[manNum%manName.length];
		manNum++;
	}else{
		twoPieceSpan[i].className=twoPieceSpan[i+twoPieceSpan.length/2].className=womanName[womanNum%womanName.length];
		womanNum++;
	}
	twoPieceSpan[i].name=twoPieceSpan[i+twoPieceSpan.length/2].name = data[arr[i+onePieceSpan.length]].name;
	twoPieceSpan[i].time=twoPieceSpan[i+twoPieceSpan.length/2].time = data[arr[i+onePieceSpan.length]].time;
	twoPieceSpan[i].sex=twoPieceSpan[i+twoPieceSpan.length/2].sex = data[arr[i+onePieceSpan.length]].sex;
}
for(var i=0;i<threePieceSpan.length-18;i++){
	if(i<7){
		if(data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex=="man"){
			threePieceSpan[i].className=manName[manNum%manName.length];
			manNum++;
		}else{
			threePieceSpan[i].className=womanName[womanNum%womanName.length];
			womanNum++;
		}
		threePieceSpan[i].name=data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].name;
		threePieceSpan[i].time=data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].time;
		threePieceSpan[i].sex=data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex;
	}else{
		if(data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex=="man"){
			threePieceSpan[i].className=threePieceSpan[i+6].className=manName[manNum%manName.length];
			manNum++;
		}else{
			threePieceSpan[i].className=threePieceSpan[i+6].className=womanName[womanNum%womanName.length];
			womanNum++;
		}
		threePieceSpan[i].name=threePieceSpan[i+6].name=data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].name;
		threePieceSpan[i].time=threePieceSpan[i+6].time=data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].time;
		threePieceSpan[i].sex=threePieceSpan[i+6].sex=data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex;
	}
}
for(var i=threePieceSpan.length-12;i<threePieceSpan.length;i++){
	threePieceSpan[i].className=threePieceSpan[i-12].className;
}

//鼠标移入移除显示不显示
for(var i=0;i<span.length;i++){
	span[i].index=i;
	span[i].addEventListener('mousemove',show,false);
	span[i].addEventListener('mouseout',hidden,false);
}
function show(e){
	var e=e||window.event;
	var s=document.documentElement.scrollTop||document.body.scrollTop;
	var left=e.clientX;
	var top=e.clientY+s-randomInfo.offsetHeight-20;
	randomInfo.style.visibility="visible";
	randomInfo.style.left=left+"px";
	randomInfo.style.top=top+"px";
	randomInfoChild[0].innerHTML=this.name;
	randomInfoChild[1].innerHTML=this.time;
	if(spanArr.length!=0){
		for(var i=0;i<spanArr.length;i++){
			if(this.inum==spanArr[i]){
				for(var j=0;j<spanArr.length;j++){
					clearInterval(span[spanArr[j]].nTimer);
				}
			}
		}
	}
	
}
function hidden(){
	randomInfo.style.visibility="hidden";
}
//搜索事件
input[0].onfocus=function(){
	var _this=this;
	if(this.value!==''){
		searchBox.style.display="block";
	}
	document.onkeyup=function(e){
		var e=e||window.event;
		var num=0;
		searchBox.info=true;
		if(_this.value==''){
			searchBox.style.display="none";
			searchBox.innerHTML='';
		}else{
			searchBox.innerHTML='';
			for(var s in data){
				var reg=new RegExp(input[0].value);
				if(reg.test(data[s].name)&&num<8){
					searchBox.style.display="block";
					var p=document.createElement('p');
					p.innerHTML=data[s].name;
					searchBox.appendChild(p);
					num++;
					p.index=s;
					p.onclick=function(){
						input[0].value=data[this.index].name;
						searchNum=this.index;
						searchBox.style.display="none";
					}
					searchBox.info=false;
				}
				
			}
			
			if(e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=13){
				activeNum=0;
			}
			if(!searchBox.info){
				var searchP=searchBox.getElementsByTagName('p');
				for(var i=0;i<searchP.length;i++){
					searchP[i].index=i;
					searchP[i].onmouseover=function(){
						activeNum=this.index;
					}
					searchP[i].onclick=function(){
						input[0].value=searchP[this.index].innerHTML;
						searchBox.style.display="none";
						for(var s in data){
							var regExp=new RegExp(searchP[this.index].innerHTML);
							if(regExp.test(data[s].name)){
								searchNum=s;
							}
						}
					}
				}
				switch(e.keyCode){
					case 38:
						activeNum--;
						if(activeNum<0){
							activeNum=searchP.length-1;
						}
						break;
					case 40:
						activeNum++;
						if(activeNum>=searchP.length){
							activeNum=0;
						}
						break;
					case 13:
						if(searchP.length!=0){
							input[0].value=searchP[activeNum].innerHTML;
							for(var s in data){
								if(data[s].name === input[0].value){
									searchNum = s;
									findPeople();
								}
							}
							input[0].value = '';
							searchBox.innerHTML = '';
							searchBox.style.display = 'none';
						}
						break;
				}
				if(searchP.length!=0){
					searchP[activeNum].style.background="#09c";
				}
				
			}
			
			
			if(searchBox.info){
				var div=document.createElement('div');
				div.style.color="red";
				div.innerHTML='很抱歉未找到您的用户名';
				searchBox.appendChild(div);
			}
			
		}
		
		
		
	}
}
input[1].onclick=function(){
	searchBox.style.display="none";
	for(var s in data){
		if(data[s].name===input[0].value){
			searchNum=s;
			findPeople();
		}
	}
	input[0].value='';
}
function findPeople(){
	for(var i=0;i<spanArr.length;i++){
		clearInterval(span[spanArr[i]].nTimer);
		//move(span[spanArr[i]],{translateY: 0},500,'bounceOut');
		move(span[span[spanArr[i]].inum],{translateY: 0},500,'bounceOut');
	}
	umbrella.bOff=false;
	spanArr.splice(0,spanArr.length);
	for(var i=0;i<span.length;i++){
		if(span[i].name==input[0].value){
			umbrella.bOff=true;
			spanArr.push(i);
		}
	}
	if(umbrella.bOff){
		var scrollNum=document.documentElement.scrollTop || document.body.scrollTop;
		clearInterval(iTimer);
		if(spanArr[0]<onePieceSpan.length){
			if(scrollNum<783){
				iTimer=setInterval(function(){
					scrollNum+=20;
					if(scrollNum>=783){
						scrollNum=783;
						clearInterval(iTimer);
					}
					document.documentElement.scrollTop = document.body.scrollTop=scrollNum;
				},30);
			}
			if(scrollNum>783){
				iTimer=setInterval(function(){
					scrollNum-=20;
					if(scrollNum<=783){
						scrollNum=783;
						clearInterval(iTimer);
					}
					document.documentElement.scrollTop = document.body.scrollTop=scrollNum;
				},30);
			}
		}else if(spanArr[0]>=onePieceSpan.length&&spanArr[0]<onePieceSpan.length+twoPieceSpan.length){
			if(scrollNum<1165){
				iTimer=setInterval(function(){
					scrollNum+=20;
					if(scrollNum>=1165){
						scrollNum=1165;
						clearInterval(iTimer);
					}
					document.documentElement.scrollTop = document.body.scrollTop=scrollNum;
				},30);
			}
			if(scrollNum>1165){
				iTimer=setInterval(function(){
					scrollNum-=20;
					if(scrollNum<=1165){
						scrollNum=1165;
						clearInterval(iTimer);
					}
					document.documentElement.scrollTop = document.body.scrollTop=scrollNum;
				},30);
			}
		}else if(spanArr[0]>=onePieceSpan.length+twoPieceSpan.length){
			if(scrollNum<1736){
				iTimer=setInterval(function(){
					scrollNum+=20;
					if(scrollNum>=1736){
						scrollNum=1736;
						clearInterval(iTimer);
					}
					document.documentElement.scrollTop = document.body.scrollTop=scrollNum;
				},30);
			}
			if(scrollNum>1736){
				iTimer=setInterval(function(){
					scrollNum-=20;
					if(scrollNum<=1736){
						scrollNum=1736;
						clearInterval(iTimer);
					}
					document.documentElement.scrollTop = document.body.scrollTop=scrollNum;
				},30);
			}
		}
		for(var i=0;i<spanArr.length;i++){
			span[spanArr[i]].inum=spanArr[i];
			(function(i){
				move(span[span[spanArr[i]].inum],{translateY: -20},200,'linear',function(){
					move(span[span[spanArr[i]].inum],{translateY: 0},500,'bounceOut');
				});
				span[spanArr[i]].nTimer=setInterval(function(){
					move(span[span[spanArr[i]].inum],{translateY: -20},200,'linear',function(){
						move(span[span[spanArr[i]].inum],{translateY: 0},500,'bounceOut');
					});
				},1000);
			})(i);
		}
	}else{
		doshake();
	}
}

function doshake(){
	if(bOff){
		bOff=false;
		input[0].disabled = 'true';
		css(search,'opacity',0.5);
		var scrollNum=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollNum<783){
			dTimer=setInterval(function(){
				scrollNum+=60;
				if(scrollNum>=783){
					scrollNum=783;
					clearInterval(dTimer);
				}
				document.documentElement.scrollTop = document.body.scrollTop=scrollNum;
			},30);
		}else{
			dTimer=setInterval(function(){
				scrollNum-=60;
				if(scrollNum<=783){
					scrollNum=783;
					clearInterval(dTimer);
				}
				document.documentElement.scrollTop = document.body.scrollTop=scrollNum;
			},30);
		}
		umbrella.style.display="block";
		setTimeout(function(){
			move(umbrella,{opacity:1},1000);
		},1000);
		if(data[searchNum].sex=='man'){
			umbrellaChild[1].className=manName[manNum%manName.length];
			manNum++;
		}else{
			umbrellaChild[1].className=womanName[womanNum%womanName.length];
			womanNum++;
		}
		umbrellaChild[1].name=data[searchNum].name;
		umbrellaChild[1].sex=data[searchNum].sex;
		umbrellaChild[1].time=data[searchNum].time;
		umbrellaChild[1].addEventListener('mousemove',show,false);
		umbrella.uTimer=setInterval(shake,20);
		setTimeout(function(){
			move(umbrella,{top:335},4000,'linear',function(){
				clearInterval(umbrella.uTimer);
				css(umbrella,'rotate',0);
				move(umbrellaChild[0],{opacity:0},200);
				var addPeople=document.createElement('span');
				addPeople.className=umbrellaChild[1].className;
				addPeople.name=umbrellaChild[1].name;
				addPeople.time=umbrellaChild[1].time;
				addPeople.sex=umbrellaChild[1].sex;
				css(addPeople,'left',687);
				peoples.appendChild(addPeople);
				setTimeout(function(){
					css(umbrella,'top',0);
					css(umbrella,'opacity',0);
					css(umbrellaChild[0],'opacity',1);
					umbrella.style.display ='none';
					var left0 = people[0].offsetLeft;
					var left1 = people[1].offsetLeft;
					var left2 = people[2].offsetLeft;
					move(people[0],{opacity:0},3000,'linear');
					move(people[1],{left:Math.round(parseInt(left1)/2),opacity:0},2000,'linear',function(){
						move(people[1],{opacity:1,left:parseInt(left0)},2000,'linear',function(){
							peoples.removeChild(people[0]);
							arr.splice(27,1);
							arr.splice(29,0,searchNum);
							for(var i=0; i<span.length; i++){
								span[i].index = i;
								span[i].addEventListener('mousemove',show,false);
								span[i].addEventListener('mouseout',hidden,false);
							}
						});
					});
					move(people[2],{left:parseInt(left1)},2000,'linear');
					move(people[3],{left:parseInt(left2)},2000,'linear');
					addPeople.onmousemove = function(ev){
						var e=e||window.event;
						var s=document.documentElement.scrollTop||document.body.scrollTop;
						var left=e.clientX;
						var top=e.clientY+s-randomInfo.offsetHeight-20;
						randomInfo.style.visibility="visible";
						randomInfo.style.left=left+"px";
						randomInfo.style.top=top+"px";
						randomInfoChild[0].innerHTML=data[searchNum].name;
						randomInfoChild[1].innerHTML=data[searchNum].time;
						
					}
					addPeople.addEventListener('mouseleave',hidden,false);
					bOff=true;
					input[0].disabled = '';
					css(search,'opacity',1);
					input[0].focus();
				},1000);
				
			})
		},1500);
		
	}
}

function shake(){
	if(umbrella.uOff){
		shakeValue+=0.5;
		if(shakeValue>=15){
			shakeValue=15;
			umbrella.uOff=false;
		}
	}else{
		shakeValue-=0.5;
		if(shakeValue<=-15){
			shakeValue=-15;
			umbrella.uOff=true;
		}
	}
	css(umbrella,'rotate',shakeValue);
}










sessionStorage.setItem('username','daocao');





})();

























































