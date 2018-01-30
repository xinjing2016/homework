$(function(){
	
	/*
	if(/(iPhone|iPad|iPod|ios|Android)/i.test(navigator.userAgent)){
	}else{	
	}
	
*/
	
	var regE = {
		qq  : /^[1,9]\d{4,9}$/,
		tel :/^1[3578]\d{9}$/,
		mail:/^\w+@[0-9A-Za-z]+(\.[a-zA-Z]{2,}){1,2}$/,
		idCard:/^[1-9]\d[16][\d|x]$/,
	}
	
	
	var bannerIn = 0;
	var bannerpic = $('.banner-list div a');//图片数组
	var bannerlen = bannerpic.length;//图片长度
	var bannerdot = $('#banner .dot span');//点点数组
	var arrowl= $('.barrowl');//左箭头
	var arrowr= $('.barrowr');//右箭头
	
		
//布局初始化
	$.each(bannerpic, function(i,elem){
	 	bannerdot.eq(i+1).css("background","rgb(9, 177, 199)");
        bannerpic.eq(i+1).css('display','none');
  });
	

	//自动轮播
	var timer = setInterval(function(){
		bannerIn++;
		auto();
	},6000);
	
	function auto(){//
		$.each(bannerpic, function(i,elem){bannerpic.eq(i).fadeOut();bannerdot.eq(i).css("background","rgb(9, 177, 199)");});
		if(bannerIn>=3) bannerIn=0;
		if(bannerIn<0) bannerIn=2;
		bannerpic.eq(bannerIn).fadeIn();
		bannerdot.eq(bannerIn).css("background","red");
	}
	
	//鼠标移入开启或停止轮播
	$('.banner-list').mouseover(function(){
		clearInterval(timer);
	}).mouseout(function(){
		clearInterval(timer);
		timer = setInterval(function(){
			bannerIn++;
			auto();
		},6000);
	})
	
	//左箭头
	arrowl.click(function(){
		clearInterval(timer);
		bannerIn--;
		auto();
	})
	//右箭头
	arrowr.click(function(){
		clearInterval(timer);
		bannerIn++;
		auto();
	})
	
	//点点
	bannerdot.click(function(){
		var dotIndex=$(this).index();
		clearInterval(timer);
		bannerIn=dotIndex;
		auto();
	})
	//轮播结束	
	
	//触屏事件
	var x = 0;
	
if($('.banner-list').get(0)){
	$('.banner-list').get(0).addEventListener("touchstart",function(e){
		clearInterval(timer);
		x = e.changedTouches[0].pageX;
	})
	$('.banner-list').get(0).addEventListener("touchmove",function(e){
	e.preventDefault();	
	})
	$('.banner-list').get(0).addEventListener("touchend",function(e){
		var xL = e.changedTouches[0].pageX - x;
		if(xL>0){
			bannerIn++;
			auto();
		}else{
			bannerIn--;
			auto();
		}
		timer = setInterval(function(){
			bannerIn++;
			auto();
		},6000);
	})	
}
	
	
	
	
	
//nav
var bignavli = $('.hnav .bignav li');
var subnavli =$(".hnav-wrapper .subnav div");


bignavli.mouseover(function(){
	var index = $(this).index()-1;
	if(index<0) index=10;
	subnavli.eq(index).addClass('navAct');
}).mouseout(function(){
	var index = $(this).index()-1;
	subnavli.eq(index).removeClass('navAct');
})

subnavli.mouseover(function(){
	var index = $(this).index();
	bignavli.eq(index+1).find('a').addClass('bignavact');
	subnavli.eq(index).addClass('navAct');
}).mouseout(function(){
	var index = $(this).index();
	bignavli.eq(index+1).find('a').removeClass('bignavact');
	subnavli.eq(index).removeClass('navAct');
})
	
$('.hnav ').hover(function(){
	$('.subnav').slideToggle();
})
	

//return to top
$(window).scroll(function(){
if( $('body').scrollTop() >100){$('.top').fadeIn();}
	else {$('.top').fadeOut();}
})


$('.top').click(function(){

$('body,html').animate({scrollTop:'0px'},800);

//alert($('body,html').scrollTop())

})	
	
	
	
	
	
	
	
	
//page contact

$('.forms .form-group .col-sm-7 input:eq(0)').blur(function(){
	
	if($(this).val()==""){
		$(this).closest('.form-group').find('.col-md-3').find('span').addClass('glyphicon glyphicon-remove input-success').removeClass('glyphicon-ok input-warn').text('联系人不能为空');	
	}else{
		$(this).closest('.form-group').find('.col-md-3').find('span').removeClass('glyphicon-remove input-success').addClass('glyphicon glyphicon-ok input-warn').text('欢迎');	
	}	
})

$('.forms .form-group .col-sm-7 input:eq(2)').blur(function(){
	
	if($(this).val()==""){
		$(this).closest('.form-group').find('.col-md-3').find('span').addClass('glyphicon glyphicon-remove input-success').removeClass('glyphicon-ok input-warn').text('电话不能为空');	
	}else if(regE.tel.test($(this).val())){
		$(this).closest('.form-group').find('.col-md-3').find('span').removeClass('glyphicon-remove input-success').addClass('glyphicon glyphicon-ok input-warn').text('欢迎');		
	}else{
		$(this).closest('.form-group').find('.col-md-3').find('span').addClass('glyphicon glyphicon-remove input-success').removeClass('glyphicon-ok input-warn').text('格式不正确');
	}
	
})
$('.forms .form-group .col-sm-7 input:eq(3)').blur(function(){
	
	if($(this).val()==""){
		$(this).closest('.form-group').find('.col-md-3').find('span').addClass('glyphicon glyphicon-remove input-success').removeClass('glyphicon-ok input-warn').text('邮箱不能为空');	
	}else if(regE.mail.test($(this).val())){
		$(this).closest('.form-group').find('.col-md-3').find('span').removeClass('glyphicon-remove input-success').addClass('glyphicon glyphicon-ok input-warn').text('欢迎');	
	}else{
		$(this).closest('.form-group').find('.col-md-3').find('span').addClass('glyphicon glyphicon-remove input-success').removeClass('glyphicon-ok input-warn').text('格式不正确');
	}
	
})



$(':reset').click(function(){
	$(".forms .form-group .col-sm-7 input:not(:reset)").val("");
	$(".forms textarea").val("");
})


  
    
   	
	
	
})
