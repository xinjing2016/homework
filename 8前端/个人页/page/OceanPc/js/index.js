
$(function(){

	//header 
/*$("input").eq(0).keydown(function(e){
	console.log(e.which);
	if (e.which==13)
	{
		$("input").eq(1).trigger('click');
	}
	return false;
})*/

//banner
	$("div.bigShade").mousemove(function(e){
	$("div.dolphin").css({"top":(e.clientY/50)+"px","left":(e.clientX/30)+"px"});
	$("div.whale").css({"top":(e.clientY/20-20)+"px","left":(-e.clientX/20)+"px"});
	$("div.star").css({"top":(-e.clientY/50)+"px","left":(-e.clientX/50)+"px"});
	$("div.three").css({"top":(e.clientY/50)+"px","left":(e.clientX/50)+"px"});
	});

	$(".poster-main").mouseover(function(){
		$("div.poster-btn-bg").stop().fadeIn(300);
	}).mouseout(function(){
		$("div.poster-btn-bg").stop().fadeOut(300);
	});

//return to top
$(window).scroll(function() {	
		if($(window).scrollTop() >= 120){ 
			$(".top").fadeIn(300); 
		}else{    
			$(".top").fadeOut(300);
		}  
});
	$(".top").click(function(){$('html,body').animate({scrollTop: '0px'}, 800);}); 

//banner .banner ul.notice-list

var $noticeLi = $(".banner ul.notice-list li");
var timer2 = setInterval(function(){
	var $fL = $(".banner ul.notice-list li:first");
	$(".banner ul.notice-list").append($fL);
},3000)
$noticeLi.mouseover(function(){clearInterval(timer2);})
		 .mouseout(function(){timer2 = setInterval(function(){
	var $fL = $(".banner ul.notice-list li:first");
	$(".banner ul.notice-list").append($fL);
},3000)})


//content start
var $contli = $("div.content-lists");// li
var $cont_picli = $contli.find("div.body-pic");
$cont_picli.mouseover(function(){
	$(this).find("div.body-pic-des").animate({bottom:"0px"},200)})
	.mouseout(function(){
	$(this).find("div.body-pic-des").animate({bottom:"-27px"},200)
	})

var $artli =  $("ul.foot-lists li");
//给每个li添加title属性
$artli.each(function(i){
	$(this).attr("title",$(this).find("div").text());
})
//little arrow 
$artli.mouseover(function(){
	$(this).find("span").stop().fadeIn(100).animate({"right":"0px"},500);
	$(this).find("div").css("color","#A2F5C7");
	})
	  .mouseout(function(){$(this).find("span").css({right:"15px",display:"none"});
		$(this).find("div").css("color","#fff");
		})

var $prevBtn = $(".content-prev-btn");//左按钮
var $nextBtn = $(".content-next-btn");//右按钮
var $ul = $("ul.pic-lists");//ul
var $li = $ul.find("li");//li

//clone and add dom
for (var i=0;i<4;i++ )
{
	var $fli = $li.eq(i).clone(true);
	$ul.append($fli);
}
for (var j=7;j>=4 ;j-- )
{
	var $nli = $li.eq(j).clone(true);
	$ul.prepend($nli);
}

//prevBtn
$prevBtn.click(function(){
	clearInterval(timer1);
	var marginL = $ul.css("marginLeft");
	var ml = parseInt(marginL);
	if (ml<=-2580)
	{
		$ul.css("marginLeft","-860px");
		$ul.stop().animate({"marginLeft":"-=215px"},1000);
	}
	else{
		$ul.stop().animate({"marginLeft":"-=215px"},1000);
		ml-=215;
	}
})
$nextBtn.click(turnR)

 function turnR(){//defind next function
	var marginL = $ul.css("marginLeft");
	var ml = parseInt(marginL);
	if (ml>=0)
	{
		$ul.css("marginLeft","-1720px");
		$ul.stop().animate({"marginLeft":"+=215px"},1000);
	}
	else{
		$ul.stop().animate({"marginLeft":"+=215px"},1000);
		ml+=215;
	}
}

var timer1 = setInterval(turnR,3000)

$ul.mouseover(function(){
	clearInterval(timer1);
	})
	.mouseout(function(){
	clearInterval(timer1);
	timer1 = setInterval(turnR,3000)})
//content end



var $tuttle = $("div.footer div.tuttle");//tuttle animation
var $fish = $("div.footer div.fish");//fish animation
var $buble = $("div.footer div.bubble");//bubble animation
var $bubble1 = $("div.footer div.bubble1");
var $bubble2 = $("div.footer div.bubble2");
var $shanhu1 = $('div.footer div.shanhu1');
var $tuttLeft = $tuttle.position().left;
var $tuttleTop = $tuttle.position().top;
$fish.css({left:"-700px",top:"0px"});

function bubble(obj1,topmax,leftmax,topmin){//气泡函数 批量操作
	obj1.css({display:"block",left:leftmax});

	if (obj1.position().top <= 0)
	{
		obj1.css({top:topmax,left:leftmax});
	}else{

		obj1.animate({top:topmin,left:leftmax},3000).fadeOut(300);
	}
}

function fish(){//鱼动画
	if ($fish.position().left >1550)
{
	$fish.css({left:-700,top:0});
}
		$fish.animate({left:300,top:50}, 5000,"linear",
		function()
		{
			$fish.animate({left:1600,top:0},6000,"linear");
		});
}

function shanhu(obj,top1,top2,left1,left2){//珊瑚动画
	obj.animate({top:top2,left:left2},1000);
	obj.animate({top:top1,left:left1},1000);
}

setInterval(function(){
	shanhu($("div.shanhu1"),0,0,0,-10);
	shanhu($("div.shanhu2"),0,10,0,-10);
	shanhu($("div.shanhu3"),0,10,0,10);
	shanhu($("div.shanhu4"),0,-10,0,-10);
	shanhu($("div.shanhu5"),0,10,0,10);
},2000)

fish();
setInterval(function(){//fish animate ,the frist type of animation
fish();
},13000)

setInterval(function(){//tuttle animate ,the second type of animation
	if ($tuttle.position().left >= -500  )
	{
		$tuttle.css({left:"-=5px",top:"+=1px"});
	}else if ($tuttle.position().left >= -2000)
	{
		$tuttle.css({left:"-=5px",top:"-=1px"});
	}else
	{
		$tuttle.css({left:$tuttLeft+"px",top:$tuttleTop+"1px"});
	}
},30)

	//气泡动画，先执行一次然后启动定时器
bubble($buble,250,0,-72);
setInterval(function(){
	bubble($buble,250,0,-80);
	bubble($bubble1,200,500,-30);
	bubble($bubble2,200,200,0);
},3500)




})
