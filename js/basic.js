(function(){
	
var explorer = window.navigator.userAgent.toUpperCase();
if(explorer.indexOf("MSIE")!=-1){
	alert("为了页面效果能更好的展示，请使用高版本的浏览器浏览次页面！")
}

var boxOne=document.getElementsByClassName('boxOne')[0];
var star=document.getElementById('star');
var divStar=star.getElementsByTagName('div');
var boxBj=document.getElementById('boxBj');
var divBoxBj=boxBj.children[0].getElementsByTagName('div');
var bjArrX=[];
var bjArrY=[];
var starArrX=[];
var starArrY=[];


setTimeout(function(){
	clearClass(divStar);
	for(var i=0;i<3;i++){
		divStar[i].onmouseover=function(){
			var em=this.getElementsByTagName('em')[0];
			var i=this.getElementsByTagName('i')[0];
			var span=this.getElementsByTagName('span')[0];
			var strong=this.getElementsByTagName('strong')[0];
			var a=this.getElementsByTagName('a')[0];
			if(a.className==""){
				em.className="em";
				i.className="i";
				span.className="span";
				strong.className="strong";
				a.className="a";
			}
			setTimeout(function(){
				em.className="";
				i.className="";
				span.className="";
				strong.className="";
				a.className="";
			},6000)
		}
	}
},6000);

for(var i=0;i<divBoxBj.length;i++){
	bjArrX.push(divBoxBj[i].offsetLeft);
	bjArrY.push(divBoxBj[i].offsetTop);
}
for(var i=0;i<divStar.length;i++){
	starArrX.push(divStar[i].offsetLeft);
	starArrY.push(divStar[i].offsetTop);
}
boxOne.addEventListener('mousemove',function(e){
	var e=e||window.event;
	var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
	var dx=e.clientX-boxBj.offsetWidth/2;
	var dy=e.clientY+scrollT-boxBj.offsetHeight/2;
	for(var i=0;i<divBoxBj.length;i++){
		if(i==0){
			divBoxBj[0].style.left=bjArrX[0]-dx/120+"px";
			divBoxBj[0].style.top=bjArrY[0]-dy/120+"px";
		}else{
			divBoxBj[i].style.left=bjArrX[i]-dx/(10*(i*i+1))+"px";
			divBoxBj[i].style.top=bjArrY[i]-dy/(10*(i*i+1))+"px";
		}
	}
	for(var i=0;i<3;i++){
		divStar[i].style.left=starArrX[i]-dx/30+"px";
		divStar[i].style.top=starArrY[i]-dy/30+"px";
	}
	for(var i=3;i<7;i++){
		divStar[i].style.left=starArrX[i]-dx/80+"px";
		divStar[i].style.top=starArrY[i]-dy/80+"px";
	}
	divStar[7].style.left=starArrX[7]-dx/120+"px";
	divStar[7].style.top=starArrY[7]-dy/120+"px";
});


})();

	
	
	
	
	
	
	





































