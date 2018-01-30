var mucsicSrc=[
	{name:"邓紫棋",song:"回忆的沙漏",url:"音乐/邓紫棋 - 回忆的沙漏.mp3"},
	{name:"Jooyi",song:"Jooyi",url:"../KuGou/Jooyi - Pray.mp3"},
	{name:"带泪的鱼",song:"一个人的情歌",url:"../KuGou/带泪的鱼 - 一个人的情歌.mp3"},,
	{name:"邓紫棋",song:"回忆的沙漏",url:"音乐/邓紫棋 - 回忆的沙漏.mp3"},
	{name:"邓紫棋",song:"回忆的沙漏",url:"音乐/邓紫棋 - 回忆的沙漏.mp3"}
]


$(function(){
	var yinyue=$("#musicbox");
	var dom=$("#musicbox").get(0);
	var playerIndex=-1;
	if(typeof(Worker)=="function"){
		for(var mp3 in mucsicSrc){
			$("#musiclist").append("<li>"+mucsicSrc[mp3].name+" - "+mucsicSrc[mp3].song+"</li>");
			}
		next();
	}else{
		$("#player").html("你的浏览器不支持此播放器")
	};
	
	function next(){
		playerIndex+=1;
		if(playerIndex >= mucsicSrc.length){playerIndex=0};
		bofang(playerIndex);
		
	};
	function bofang(e){
		var lu=mucsicSrc[e];
		yinyue.attr("src",lu.url).get(0).play();
		$("#play").addClass("playing");
		$("#Loading").html("【正在播放】"+mucsicSrc[mp3].name+" - "+mucsicSrc[mp3].song);
		document.title="【正在播放】"+mucsicSrc[mp3].name+" - "+mucsicSrc[mp3].song;
		$("#musiclist li").removeClass("isplay").eq(e).addClass("isplay");
		musicSetTime();
		
	};
		function musicSetTime(){
		
			var allTime=yinyue.get(0).duration;
			var curTime=yinyue.get(0).currentTime;
			var pro=curTime/allTime * 100;
			if(isNaN(allTime)){
				$("#progress div").css({background:"url(images/load.png repeat-x)",width:"100px"});
			}else{
				$("#progress div").css({background:"url(images/load.png repeat-x)",width:pro+"px"});
				allTime=timeformat(allTime);
				curTime=timeformat(curTime);
				$("#time").html(curTime+" / "+allTime);
			}
			setTimeout(musicSetTime,1000);
			if(yinyue.get(0).ended){
				next();
			}
	};
	
	
	function timeformat(time) {
		var t = Math.round(time);
		var h = Math.floor(t / 3600);
		var m = Math.floor(t / 60);
		var s = t - h * 3600 - m * 60;
		if(h == 0) {
			str = m>9?m:("0"+m) + ":" + (s>9?s:("0"+s));
		} else {
			str = h>9?h:("0"+h) + ":" + (m>9?m:("0"+m)) + ":" + (s>9?s:("0"+s));
		}
		return str;
	};
	$("#play").click(function(){
		if($(this).attr("class")=="playing"){
			dom.pause();
			$(this).removeClass("playing")
		}else{
			dom.play();
			$(this).addClass("playing")
		}
	});
	$("#next").click(function(){
		next();
	})
})