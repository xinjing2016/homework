/*********
* 手机滑屏事件问题
1
2
3
4
5
****/
var _width = document.body.clientWidth; //clientWidth  可视页面宽度
			//alert(_width);
			var slider = {
				//判断设备是否支持 touch 事件
				touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
				slider:document.getElementById('slider'),

				//事件
				events:{
					index:0,  //显示元素的索引
					slider:this.slider,  //this 为 silder 对象
					
					icon:this.slider.getElementsByTagName('li'),
					////利用handleEvent 把 对象变成事件
					handleEvent:function(event){
						var self = this;  // this.是event 对象
						//touchstart  触摸开始的时候
						//touchmove  中间 触摸 移动
						//touchend  结束
						if(event.type == 'touchstart'){
							self.start(event);
						}else if(event.type == 'touchmove'){
							self.move(event);
						}else if(event.type == 'touchend'){
							self.end(event);
						}
					},
					//touchstart  触摸开始的时候
					start:function(event){
						//获取所有的touches  数组对象 取第一个    多点触摸
						var touch = event.targetTouches[0];
						// 去第一个 触摸点的位置 x y 
					  startPos = {x:touch.pageX,y:touch.pageY,time:+new Date}; 
						//  那个方向滑动
						 isScrolling = 0;
						//添加监听事件
						this.slider.addEventListener('touchmove',this,false);
						this.slider.addEventListener('touchend',this,false);
					},
					//touchmove  中间 触摸 移动
					move:function(event){
					// 判断页面是否有多个touch 或者 页面被缩放 就不执行了
						if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
						//恒等运算符 ===  !==
					 var touch = event.targetTouches[0];
					  endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
					 isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;
					// 1 纵  0 横
					 if(isScrolling === 0){
						event.preventDefault(); //阻止触摸默认事件 -》 滚屏
						this.slider.className = 'slider';
						this.slider.style.left = -this.index*_width + endPos.x + 'px';
					 }
					},
					//touchend  结束
					  end:function(event){
						var duration = +new Date - startPos.time;
						if(isScrolling === 0){ 
							//清空默认样式 12345
						
							if(Number(duration) > 10){
								//判断左移动还是右移动
								if(endPos.x > 10){
									if(this.index !== 0) this.index -= 1;
								}else if(endPos.x < -10){
									if(this.index !== this.icon.length-1) this.index += 1;
								}

							}
							var c_index = this.index;
							//alert(c_index);
							var opt = document.getElementsByClassName("box_1");
							//alert(opt);
							if(c_index==1){
								opt[0].className ="box_1 opt";
								opt[1].className ="box_1 opt";
							}else{
								opt[0].className ="box_1 ";
								opt[1].className ="box_1 ";
							}
							this.slider.className = 'slider anim';
							this.slider.style.left = -this.index*_width + 'px';
						}
						//解绑事件
						this.slider.removeEventListener('touchmove',this,false);
						this.slider.removeEventListener('touchend',this,false);
					}
				},
				//初始话
				init:function(){
					var self = this; // this 指silder
					if(!!self.touch) self.slider.addEventListener('touchstart',self.events,false); 
				}
			};
			slider.init();