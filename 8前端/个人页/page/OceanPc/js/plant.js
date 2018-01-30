

//plant
$(function(){
	
$('.header .time').text(new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+'日');
$('.header .week').text(getWeek());

//secondary nav
$(".subnav .secondNav-wrapper a").click(function(){
	var aIndex = $(this).index();
	var $plantContent =  $(".iContent");
	var pTop = $plantContent.eq(aIndex).offset().top;

	$('html,body').animate({
			scrollTop : pTop
		},500);
})




//return to top
$(window).scroll(function() {	
		if($(window).scrollTop() >= 120){ 
			$(".top").fadeIn(300); 
		}else{    
			$(".top").fadeOut(300);
		}  
});
$(".top").click(function(){$('html,body').animate({scrollTop: '0px'}, 800);}); 


//content ul li
$('.list-big').mouseenter(function(){
	$(this).find("div.big-text").animate({bottom:0},100);
}).mouseleave(function(){
	$(this).find("div.big-text").animate({bottom:-27},100);
})

$('div.ul-list ul li').mouseenter(function(){
	$(this).css("fontWeight","bold");
	$(this).find("span").stop().fadeIn(100);
}).mouseleave(function(){
	$(this).css("fontWeight","normal");
	$(this).find("span").css({right:"0px",display:"none"});

})


$('.iContent .con-new-body-r li').mouseenter(function(){
	$(this).find("div.new-body-r-text").animate({top:-3},100);
}).mouseleave(function(){
	$(this).find("div.new-body-r-text").animate({top: -126},100);
})

//评论功能
	$(".but img.imgface").click(function(e){
		$(".face").slideToggle();//慢慢向下展开
		e.stopPropagation();//阻冒泡

	});
	$(document).click(function(){
		$(".face").slideUp();//向上收缩
	});

	//点击发表
	$(".but span.msg_but").click(function(){
		var userName = $('.com-username').val();
		var txt=$(".editCon").html();
		if(txt=="" || userName==""){
			$(".editCon").focus();//获取焦点
		}else{

		$(".common-list").prepend("<li class='masInfo clearfix'><div class='list-face fl'><img src='images/guestbook/img/userface.png' width='40' height='40' /></div><div class='fl'><div class='list-info'><span class='info-username'>"+userName+"</span><span class='info-time'>"+GetDate()+"</span></div><div class='list-text'>"+txt+"</div></div></li>");
		$(".editCon").html("");
		$('.com-username').val('')};
		$('.list-more').text('加载更多');
	});

	$(".face ul li").click(function(){
		var img=$(this).find("img").clone();
		$(".editCon").append(img);//添加
	});

function GetDate(){
	var t = new Date();
	var y = t.getFullYear();
	var m = t.getMonth() + 1;
	var d = t.getDate();
	var h = t.getHours();
	var min = t.getMinutes();
	var s = t.getSeconds();
	var time = y + "-" + m + "-" + d + "&nbsp;&nbsp;" + h + ":" + min + ":" + s;
	return time;
}
function getWeek(){
var t = new Date();
var y = t.getFullYear();
var m = t.getMonth() + 1;
var d = t.getDate();
 var date = y + "/" + m + "/" + d ;    //此处也可以写成 17/07/2014 一样识别    也可以写成 07-17-2014  但需要正则转换   
 var day = new Date(Date.parse(date));   //需要正则转换的则 此处为 ： var day = new Date(Date.parse(date.replace(/-/g, '/')));  
 var today = new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');  
 var week = today[day.getDay()];  
 return week;
}








})

