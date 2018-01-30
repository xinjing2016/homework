// JavaScript Document



//添加到收藏
function addCookie()
{
 if (document.all)
    {
       window.external.addFavorite('http://www.kepu.gov.cn/','中国科普网');
    }
    else if (window.sidebar)
    {
       window.sidebar.addPanel('中国科普网', 'http://www.kepu.gov.cn/', "科学生活 创新圆梦");
 }
}

//标签栏切换
function setTab(name,cursel,n){
for(i=1;i<=n;i++){
var menu=document.getElementById(name+i);
var con=document.getElementById("con_"+name+"_"+i);
menu.className=i==cursel?"hover":"";
con.style.display=i==cursel?"block":"none";
}
}



//打印内容
function LoadPrintJsCallBack(){
  if(typeof forSPrint == "object" && forSPrint.Print){
    forSPrint.Print();
  }
}
function LoadPrintJs(){
  var jsFile = "http://css.wokeji.com/css/newweb/shouye/js/print_main1.js";  //打印主js文件url
  jsFile += "?t="+ (new Date()).getTime();
  var js = document.createElement("script");
  js.setAttribute("src",jsFile); 
  js.setAttribute("type","text\/javascript");
  js.setAttribute( "id", "sinaPrintJsUrl");
  //for ie
  js.onreadystatechange = function(){
  if(js.readyState=="loaded"){
     LoadPrintJsCallBack();
  }
};
//for ff
js.onload = LoadPrintJsCallBack;
  document.body.insertBefore(js,null); // null for ff
}



//字号大小变化
function zoom(){
	try{var s=document.getElementById("zhengwen").style.fontSize;var size=parseInt(s)+1;
	document.getElementById("zhengwen").style.fontSize=size+"px";}catch(e){}
	}
function zoom_(){
	try{var s=document.getElementById("zhengwen").style.fontSize;
	var size=parseInt(s)-1;document.getElementById("zhengwen").style.fontSize=size+"px";
	}catch(e){}
	}

//设为首页
function setHomepage()
{
 if (document.all)
    {
        document.body.style.behavior='url(#default#homepage)';
  document.body.setHomePage('http://www.kepu.gov.cn/');
 
    }
    else if (window.sidebar)
    {
    if(window.netscape)
    {
         try
   {  
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
         }  
         catch (e)  
         {  
    alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );  
         }
    } 
    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
    prefs.setCharPref('browser.startup.homepage','http://www.kepu.gov.cn');
 }
}