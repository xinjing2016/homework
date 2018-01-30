/**
 * 
 * 旋转木马js插件封装
 * */
;(function($){
	/**
	 * 单个Carousel对象的方法
	 * */
	var Carousel = function(poster){
		var self = this;//存储this对象
		/**
		 * 保存单个poster对象
		 * */
		this.poster = poster;
		this.posterItemMain = poster.find("ul.poster-list");//获取下面的ul对象
		this.nextBtn = poster.find("div.poster-next-btn");//获取下个按钮
		this.prevBtn = poster.find("div.poster-prev-btn");//获取上一个按钮
		this.posterItems = poster.find("li.poster-item");//获取旋转木马的li对象
		/**
		 * 对图片对象数量进行判断如果是双数的话就把第一张克隆一份追加到后面重新给this.posterItems赋值
		 * [这样操作的是为了左右对齐，中间一张两边数量一致]
		 * */
		if(this.posterItems.size()%2==0){
			//克隆第一张追加到this.posterItemMain最后面
			this.posterItemMain.append(this.posterItems.eq(0).clone());
			//重新定义this.posterItems对象
			this.posterItems = this.posterItemMain.children();
		};
		this.posterFirstItem  = this.posterItems.first();//获取第一张图片
		this.posterLastItem  = this.posterItems.last();//获取第二张图片
		this.rotateFlag = true;//设置一个开关，开关是关闭的情况下不能点击切换，是开的时候就可以点击切换
		/**
		 * 设置默认参数
		 * */
		this.setting = {
							"width":1000,		//幻灯片的宽度
							"height":392,		//幻灯片的高度
							"posterWidth":713,	//幻灯片第一帧的宽度
							"posterHeight":392,	//幻灯片第一帧的高度
							"scale":0.9,					//记录显示比例关系
							"speed":500,
							"autoPlay":true,
							"delay":5000,
							"verticalAlign":"middle" //top bottom
						};
		/*参数的覆盖*/
		$.extend(this.setting,this.getSetting());
		/*调用下面给元素设置值的方法*/
		this.setSettingValue();//设置第一帧及按钮及外面盒子大小及ul
		this.setPosterPos();//设置其它帧的方法
		
		/*调用左右按钮的事件*/
		//左旋转按钮
		this.nextBtn.click(function(){
			/**
			 * 如果开关是开的时候执行函数carouseRotate
			 * 并点击后马上把开关关上
			 * */
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("left");
			};
		});
		//右旋转按钮
		this.prevBtn.click(function(){
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouseRotate("right");
			};
		});
		
		/**
		 * 是否开启自动轮播
		 * */
		//是否开启自动播放
		if(this.setting.autoPlay){
			this.autoPlay();
			/**
			 * 鼠标放在上面的时候清除定时器，移开的时候开启
			 * */
			this.poster.hover(function(){
											clearInterval(self.timer);
										},function(){
											self.autoPlay();
										});
			
		};
	};
	
	/************************************************************/
	/************************************************************/
	/**
	 * 定义Carousel的原型对象,Carousel方法会继承原型对象中的方法及属性
	 * [个人理解原型对象中定义公共的部分]
	 * this代表Carousel对象===》poster，如果发生偏移的话需要预先定义变量存起来
	 * */
	Carousel.prototype = {
		/**
		 * 设置自动轮播
		 * */
		autoPlay:function(){
			var self = this;
			this.timer = setInterval(function(){
				self.nextBtn.click();//直接调用右边点击的函数
			},this.setting.delay);

		},
		/**
		 * 设置点击左右切换的事件
		 * 原理：点击后将当期帧的css赋值给别的，然后他本身的css通过别的赋值
		 * */
		
		carouseRotate:function(dir){
			var _this_  = this;//临时存储this
			var zIndexArr = [];//定义一个存储index的空数组
			/**
			 * 通过判断是左边点击还是右边点击
			 * */
			if(dir === "left"){
				/*循环所有的li*/
				this.posterItems.each(function(){
					var self = $(this),
						/**
						 * 三目运算符号
						 * 如果它本身的上一个有节点的话就上一个，没有的话就是取li最后一个
						 * */
					    prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
					    width = prev.width(),
					    height =prev.height(),
					    zIndex = prev.css("zIndex"),
					    opacity = prev.css("opacity"),
					    left = prev.css("left"),
					    top = prev.css("top");
						zIndexArr.push(zIndex);	
				    self.animate({
				   					width:width,
									height:height,
									//zIndex:zIndex,
									opacity:opacity,
									left:left,
									top:top
									},_this_.setting.speed,function(){
										_this_.rotateFlag = true;//执行后把开关打开
								});
				});
				//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			}else if(dir == "right"){
				this.posterItems .each(function(){
					var self = $(this),
					    next = self.next().get(0)?self.next():_this_.posterFirstItem,
					    width = next.width(),
					    height =next.height(),
					    zIndex = next.css("zIndex"),
					    opacity = next.css("opacity"),
					    left = next.css("left"),
					    top = next.css("top");
					    zIndexArr.push(zIndex);	
				    self.animate({
				   					width:width,
									height:height,
									//zIndex:zIndex,
									opacity:opacity,
									left:left,
									top:top
									},_this_.setting.speed,function(){
										_this_.rotateFlag = true;//同样设置完成后就打开开关
								});
				});
				//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);
				});
			};
		},
		/**
		 * 
		 * 设置其它帧的位置
		 * */
		setPosterPos:function(){
			var self = this,//临时存储this
				sliceItems = this.posterItems.slice(1),//截取从第一帧开始到最后一帧，因为第一帧已经控制了，不需要再控制
				sliceSize = sliceItems.size()/2,//剩余总共多少帧,除以2那么左右各自多少
				rightSlice = sliceItems.slice(0,sliceSize),//表示右边的帧是从sliceItems第0 个开始到sliceSize
				leftSlice = sliceItems.slice(sliceSize),//表示左边的帧数，从sliceSize开始到最后
				level = Math.floor(this.posterItems.size()/2);//设置最大的图层数
			/*设置右边的宽度及高度*/
			var rw = this.setting.posterWidth,//获取用户设置的li的宽度
			    rh  = this.setting.posterHeight,//获取用户设置li的高度
			    gap = ((this.setting.width-this.setting.posterWidth)/2)/level;//右边每个li之间的间距，（总宽度 - 第一帧的宽度）/2  /右边总共多少
			/**
			 * 右边第一帧距离左边的距离
			 * 先计算右边总共多宽，然后 + 中间帧多宽，那么表示开始距离左边的位置
			 * */
			var firstLeft = (this.setting.width - this.setting.posterWidth)/2;//右边总共的宽度
			var fixOffsetLeft = firstLeft+rw;//右边距离左边的开始位置 = 中间大图宽+ 右边宽度
			/*循环右边所有的帧*/
			rightSlice.each(function(i){
				level--;//每往右边走就少1
				rw = rw *self.setting.scale;//高度与宽度每次都是前面的缩放
				rh = rh *self.setting.scale
				var j = i;
				$(this).css({
								zIndex:level,
								width:rw,
								height:rh,
								opacity:1/(++j),
								left:fixOffsetLeft+(++i)*gap-rw,
								top:self.setVerticalAlign(rh)
							});
			});
			/**
			 * 循环设置左边
			 * 原理是根据右边最后一帧的值来设置左边的
			 * 其实左边最后离视线最远的是接在右边最后一帧的，这样形成一个闭合的
			 * */
			var lw = rightSlice.last().width(),
			    lh  =rightSlice.last().height(),
			    oloop = Math.floor(this.posterItems.size()/2);
			/**
			 * 循环设置左边的
			 * 从最远处到最近===》是个从小到大的范围
			 * */
			leftSlice.each(function(i){
				$(this).css({
								zIndex:i,
								width:lw,
								height:lh,
								opacity:1/oloop,
								left:i*gap,
								top:self.setVerticalAlign(lh)
							});
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
				oloop--;
			});
		},
		
		/**
		 * 设置垂直上距离顶部高度的方法
		 * */
		setVerticalAlign:function(height){
			var verticalType  = this.setting.verticalAlign,//获取用户设置显示的位置
				top = 0;
			if(verticalType === "middle"){
				top = (this.setting.height-height)/2;
			}else if(verticalType === "top"){
				top = 0;
			}else if(verticalType === "bottom"){
				top = this.setting.height-height;
			}else{
				top = (this.setting.height-height)/2;
			};
			return top;
		},
		
		/**
		 * 设置宽度与高度去控制基本的高度与宽度
		 * */
		setSettingValue:function(){
			/*给对象设置宽高*/
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			/*给ul设置宽度与高度*/
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});
			/**
			 * 设置左右切换按钮的宽度
			 * 总宽度 - 第一帧的宽度 再除以2
			 * */
			var w = (this.setting.width - this.setting.posterWidth) / 2;
			/**
			 * 设置上下按钮的css样式
			 * */
			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)//层次感是根据总共多少个li/2向上取整
			});
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)//层次感是根据总共多少个li/2向上取整
			});
			/**
			 * 设置第一帧的位置
			 * */
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				left:w,
				zIndex:Math.floor(this.posterItems.size()/2)
			});
		},
		
		
		/**
		 * 获取人工配置参数
		 * */
		getSetting:function(){
			/*获取界面中默认参数*/
			var setting = this.poster.attr("data-setting");
			/**
			 * 如果存在且不为空的时候将其转换为json对象
			 * 方便直接取值
			 * */
			if(setting && setting != ""){
				return $.parseJSON(setting);
			}else{
				return {};
			}
		}
	};
	/************************************************************/
	/************************************************************/
	/**
	 * 如果传递进来的posters多个的话就用循环来new出对象
	 * 上面var Carousel = function(poster){
	 *
	 *      };
	 * 表示单个对象
	 * 
	 * */
	Carousel.init = function(posters){
		/**
		 * 存储this对象
		 * this表示Carousel
		 * */
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));
		});
	};
	window["Carousel"] = Carousel;
})(jQuery);
