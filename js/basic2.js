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
var spanNum = onePieceSpan.length+twoPieceSpan.length/2+threePieceSpan.length;



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
	
}
for(var i=0;i<twoPieceSpan.length/2;i++){
	if(data[arr[i+onePieceSpan.length]].sex=="man"){
		twoPieceSpan[i].className=twoPieceSpan[i+twoPieceSpan.length/2].className=manName[manNum%manName.length];
		manNum++;
	}else{
		twoPieceSpan[i].className=twoPieceSpan[i+twoPieceSpan.length/2].className=womanName[womanNum%womanName.length];
		womanNum++;
	}
	
}
for(var i=0;i<threePieceSpan.length;i++){
	if(data[arr[i+onePieceSpan.length+twoPieceSpan.length/2]].sex=="man"){
		threePieceSpan[i].className=manName[manNum%manName.length];
		manNum++;
	}else{
		threePieceSpan[i].className=womanName[womanNum%womanName.length];
		womanNum++;
	}
}













sessionStorage.setItem('username','daocao');





























































