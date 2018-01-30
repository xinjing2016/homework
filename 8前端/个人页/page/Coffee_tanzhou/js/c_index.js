
//首页特效
//$(document).ready(function () {		}）
$(function(){
	getHeight();
 if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
	
	//怎么测试我们电脑或手机是什么系统
}else if (/(Android)/i.test(navigator.userAgent)) {
	//怎么测试我们电脑或手机是什么系统
}else {
	//怎么测试我们电脑或手机是什么系统
	// alert("pc");

}
//保证banner图的高度
function getHeight(){
	 var _width = $(window).width();
	 var _height = _width * 0.56;
	 $("#jq_banner").css({height:_height+'px'});
}
$(window).resize(function(){
	getHeight();
});
	$(".logo").on('click',function(){
			//alert("123");
		$("#head_list").toggleClass("up");
	});

/****
* 函数:判断滚轮滚动方向
* 参数：event
*返回： 方向 上 还是下
***/
	var i =0;
	var $screen = $("#jq_banner");
	var len = $("#jq_banner ul li").length-1;
	var _h;
		_h = $screen.height();
	var init =function init(){
		_h = $screen.height();
		$screen.css({top:-(i*_h)});
	}//每一次滚动的高度 top值
	var scrollFunc = function(e){
		//滚轮 必须是一次事件结束之后才开启下一次事件
		//i++;
		//console.log(i);测试
		if(!$screen.is(':animated')){ //不在执行动画的时候
			//滚轮的方向问题
			if(e.wheelDelta){
				//alert(e.wheelDelta);
				if(e.wheelDelta > 0){
					if(i==0) return;
						i--;
				}else{
					if(i==len) return;
						i++;
				}
			}
			$screen.animate({top:-(i*_h)},500);
			if(i==1){
				$(".box_1").addClass("opt");
			}else{
			$(".box_1").removeClass("opt");
			}
		}
	}
	//执行滚轮
	document.onmousewheel = scrollFunc;
	//页面出现大小发生改变的时候，在一次加载
	window.onresize = init;
	//如果滚轮效果要去火狐下执行要加载一个插件jquery.mousewheel.js

	//鼠标点击往下滚动
	//$("#jq_banner li a").parent('li').index();  获取父亲索引
	$("#jq_banner li a.up_click").click(function(){
			i++;
		//alert(i);
		$screen.animate({top:-(i*_h)},500);
		
	});
	//回到顶部
	$("#jq_banner li a#up_top").click(function(){
		i=0;// 回来顶部，一起还原，i必须为0；
		
		$screen.animate({top:-(i*_h)},500);
		
	});


});

////文字一个个输入
window.onload = function(){
	//文字输入
	
	var index=0; var _index=0; var _kaweh=0;
	var cff = document.getElementById("coffee_txt");
	var coffee = document.getElementById("coffee_text");
	var Kaweh = document.getElementById("coffee_Kaweh");
	var cff_text = cff.innerHTML;
	var coffee_text = coffee.innerHTML;
	var Kaweh_text = Kaweh.innerHTML;
//公共的部分
	function Print(obj,i,text){
		var str = text.substr(0,i);
		obj.innerHTML = str + "_";
	}
	//第一个打印文字的地方
	function cff_t(){
		Print(cff,index,cff_text);
			index++;
		var len = cff_text.length+30;
		if(index>len){
				index = 0;
		}
		setTimeout(cff_t,300);
	};
	//第二个打印文字的地方
	function coffee_t(){
		Print(coffee,_index,coffee_text);
			_index++;
		var len = coffee_text.length+30;
		if(_index>len){
				_index = 0;
		}
		setTimeout(coffee_t,300);
	};
	//第三个打印文字的地方
	function kaweh_t(){
		Print(Kaweh,_kaweh,Kaweh_text);
			_kaweh++;
		var len = Kaweh_text.length+30;
		if(_kaweh>len){
				_kaweh = 0;
		}
		setTimeout(kaweh_t,300);
	};
	cff_t();
	coffee_t();
	kaweh_t();

}