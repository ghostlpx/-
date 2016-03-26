//为Widget类添加统一的生命周期
define(function(){
	
	function Widget(){
		//this.handlers = {};
		this.boundingBox = {};		//属性：最外层容器
	}
	
	Widget.prototype = {
		on : function(type,handle){
			if( typeof this.handlers[type] == 'undefined' ){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handle);
			return this;
		},
		fire : function( type,data ){
			if( this.handlers[type] instanceof Array ){
				var handlers = this.handlers[type];
				for( var i=0; i<handlers.length; i++ ){
					handlers[i](data);
				}
			}
		},
		
		//调用render方法可直接执行子类实现的接口方法
		render : function(container){	//方法：渲染组件
			this.renderUI();
			this.handlers = {};		//DOM节点被删除之后，清空handlers
			this.bindUI();
			this.syncUI();
			$(container || document.body).append( this.boundingBox );
		},
		
		destroy : function(){			//方法：销毁组件
			this.destructor();
			this.boundingBox.off();		//取消对boundingBox节点的事件监听
			this.boundingBox.remove();
		},
		
		//以下4个接口需要子类去实现具体的方法
		renderUI : function(){},	//接口：添加DOM节点
		bindUI : function(){},		//接口：监听事件
		syncUI : function(){},		//接口：初始化组件属性
		destructor : function(){}	//接口：组件销毁前的处理函数
	}
	
	return {
		Widget : Widget
	}
});