//文字输入
var text=document.getElementById('text');
var textSpan=text.getElementsByTagName('span');
var textNum=0;
var shakeLine=document.getElementById("shakeLine");
var tTimer=null;
var baozhi=document.getElementById("baozhi");


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




































