//index js
$(function(){
	//导航生成随机背景颜色
	$('.header ul li:not(".index")').mouseenter(function(){
		$(this).find('span').css("background",getColor()).animate({height:'70px'},300);
	}).mouseleave(function(){
		$(this).find('span').animate({height:'0px'},300);
	})
	
	$('.listRight .rNav .navWrap div:not(".navActive")').mouseenter(function(){
		$(this).css({"background":getColor()}).find("a").css("color","white");
	}).mouseleave(function(){
		$(this).css("background","none").find("a").css("color","black");
	})

	function getColor(){//随机获取颜色
		var color = Math.ceil(Math.random()*16777215).toString(16);
		if(color=='ffffff'){getColor();}
		return "#"+color;
	}
	
//banner text
	var $text = $('.banner .banner-text p');
	timer1 = setInterval(mov,8000);
	function mov(){
		$text.each(function(){
		$(this).slideDown(1000).delay(5000).fadeOut(1000);
		});
	}

//banner 头像旋转  music
	var angle = 0;
	var musicOnoff=0;
	var timer2='';
	var musicIndex = 0;
	function rotateimg(){
		angle+=3;
		$(".banner .con .banner-img").rotate(angle);
	}
	
	//点击事件
	$('.banner .con .banner-img').click(function(){
		if(!musicOnoff){
			clearInterval(timer2);
			timer2 = setInterval(rotateimg,50);
			$('#bjmusic').get(0).pause();
			$('#bjmusic').get(0).play();
			//$('#bjmusic').get(0).loop=true;
			musicOnoff=1;
		}else{
			clearInterval(timer2);
			$('#bjmusic').get(0).pause();
			musicOnoff=0;
		}
	})
	
//判断音乐停止，然后循环下一首	
/*$('#bjmusic').ended = function(){
		musicIndex++;
		if(musicIndex==3){musicIndex=0;}
		$('#bjmusic').attr('src','music/'+(musicIndex+1)+'.mp3').get(0).play();	
};*/
$('#bjmusic').on('ended', function(){
     musicIndex++;
	if(musicIndex==3){musicIndex=0;}
	$('#bjmusic').attr('src','music/'+(musicIndex+1)+'.mp3').get(0).play();
  });
	
	
//展示列表
	$('.works .worksCon ul li').mouseenter(function(){
		$(this).find('h3').show(500);
	}).mouseleave(function(){
		$(this).find('h3').fadeOut(500);
	})
	
//华丽丽的内容分割线
var $pageHeight = $(document.body).height();
var $top = $('.bigConLine').offset().top;
$('.bigConLine').css("height",($pageHeight-$top)+'px');

//.css("color","black")








	
})