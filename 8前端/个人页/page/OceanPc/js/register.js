//register 

$(function(){
	
	
$('#email').blur(function(){
	var mail=$(this).val();
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(mail)) return true;
		else {
		alert('您的电子邮件格式不正确');
		return false;
		}
})

var regexEnum = 
{
	email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	letter:"^[A-Za-z]+$",					//字母
	letter_u:"^[A-Z]+$",					//大写字母
	letter_l:"^[a-z]+$",					//小写字母
	idcard:"^[1-9]([0-9]{14}|[0-9]{17})$",	//身份证
	ps_username:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D_\\w]+$" //中文、字母、数字 _
}	
	
	

	
	
	
})













