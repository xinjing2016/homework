$(function(){

//小箭头
$(".btn-text").mouseover(function(){
$(this).find("span").stop().show().animate({left:"120px"},500,function(){
					$(this).animate({left:"100px"},800).fadeOut()})	
})

//app
var nowtime = new Date();
var aindex = 0;
     $("ul.app-active li.active-list").mouseenter(function(){
	if (new Date()-nowtime>200)
	{
		nowtime = new Date();
		aindex = $(this).index();
		$("ul.app-hide li.hide-list").eq(aindex).stop(false,true).fadeIn();
	}
}).mouseleave(function(){
	aindex = $(this).index();
	$("ul.app-hide li.hide-list").eq(aindex).stop(false,true).fadeOut();
})
	
$("ul.app-hide li.hide-list").mouseover(function(){
		$(this).stop().show();
}).mouseout(function(){
	$(this).stop(true).hide("fast");})

//linus无缝滚动
var $em = $("ul.linus-nav li.navlist em");
var $conList=$("ul.linus-nav li.navlist");
var $con = $("ul.linus-con");
var $listWidth=$("ul.linus-con li.linus-list").width();
var lindex = 0;
var $ren = $(".linus-con-wrapper .con-ren");

$em.eq(lindex).css("display","block");
$conList.eq(lindex).find("span").css({"fontWeight":"bold","color":"#197C77"});

$conList.hover(function(){
	lindex = $(this).index();
	switch (lindex)
	{
	case 0: $ren.stop().animate({"marginLeft":"104px"},500);
	break;
		case 1: $ren.stop().animate({"marginLeft":"282px"},500);
	break;
		case 2: $ren.stop().animate({"marginLeft":"482px"},500);
	break;
		case 3: $ren.stop().animate({"marginLeft":"670px"},500);
	break;
		case 4: $ren.stop().animate({"marginLeft":"848px"},500);
	break;
	
	}
	$em.css("display","none");
	$em.eq(lindex).css("display","block");
	$(this).siblings().find("span").css({"fontWeight":"nomal","color":"#05c8be"});
	$(this).find("span").css({"fontWeight":"bold","color":"#197C77"});
	$con.stop().animate({"marginLeft":(-$listWidth*lindex)+"px"},500);
})

//linus教学步骤
var $stepConList =$("ul.step-con li.stepList");
var $stepNavList = $(".stepnavlist ul li");
var sindex = 0;
var slength = $stepNavList.size();
$stepConList.eq(sindex).css("display","block");
$stepNavList.eq(sindex).css("background","#ff8949");
$stepNavList.mouseover(function(){
	sindex = $(this).index();
	for (var i = 0;i<=sindex ;i++ )
	{
		$stepNavList.eq(i).css("background","#ff8949");
	}
	for (var j = sindex+1;j<slength ;j++ )
	{
		$stepNavList.eq(j).css("background","#9efccf");
	}
	$stepConList.eq(sindex).fadeIn().siblings().fadeOut();
})

//linus more
var $moreCon = $("ul.more-con li");
var $moreNav = $("ul.more-list li");
var mindex = 0;
$moreNav.eq(mindex).css("background","yellow");
$moreCon.eq(mindex).css("display","block");
$moreNav.mouseover(function(){
	mindex = $(this).index();
		$moreNav.eq(mindex).css("background","yellow").siblings().css("background","#78eafa");
		
	$moreCon.eq(mindex).fadeIn().siblings().fadeOut();
})

//侧边导航
$(window).scroll(function(){
	if($(window).scrollTop() >= 400)
	{$(".sidebar").fadeIn();}
	else{$(".sidebar").fadeOut();}
})

$(".sidebar .side-top").click(function(){
	$('html,body').animate({scrollTop: '0px'}, 800);
})

$(".side-body li").hover(function(){
	var sdindex = $(this).index();
	$(".side-body li").eq(sdindex).find(".body-title").css("fontWeight","bold");
	$(".side-body li").eq(sdindex).find(".body-list").children("span").css("display","block");
},function(){
	var sdindex = $(this).index();
	$(".side-body li").eq(sdindex).find(".body-title").css("fontWeight","normal");
	$(".side-body li").eq(sdindex).find(".body-list").children("span").css("display","none");
})

$(".side-body li").click(function(){
var stindex = $(this).index();
var top = $(".team").eq(stindex).offset().top;
$('html,body').animate({scrollTop: top+'px'}, 500);
})

$(".banner-nav a").click(function(){
var stindex = $(this).index();
var top = $(".team").eq(stindex-1).offset().top;
$('html,body').animate({scrollTop: top+'px'}, 500);

})
})