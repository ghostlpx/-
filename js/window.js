
//jqueryUI模块被导入之后，jquery对象就自动新增了一些方法，事实上这里$UI其实并没有用到
define(['widget','jquery','jqueryUI'],function(widget,$,$UI){	//导入widget抽象类
	
	function Window(){
		this.cfg = {
			width : 500,
			height : 300,
			title : '系统消息',
			content : '',
			text4AlertBtn : '确定',	//定制按钮文案
			text4ConfirmBtn : '确定',
			text4CancelBtn : '取消',
			text4PromptBtn : '确定',
			isPromptInputPassword : false,
			defaultValue4PromptInput : '',
			maxlength4PromptInput : 10,
			hasMask : true, 	//模态弹窗
			hasCloseBtn : false,
			skinClassName : null,	//皮肤接口
			isDraggable : true,		//拖拽接口
			dragHandle : null,		//拖拽把手
			handler4AlertBtn : null,	//所要执行的回调函数
			handler4CloseBtn : null	,	
			handler4ConfirmBtn : null,
			handler4CancelBtn : null,
			handler4PromptBtn : null
		};
	};
	
	Window.prototype = $.extend({},new widget.Widget(),{	//Window.prototype继承自widget抽象类
		renderUI : function(){	//增添DOM节点
			var footContent = '';
			switch(this.cfg.winType){
				case 'alert':
					footContent = '<input type="button" value='+ this.cfg.text4AlertBtn +' class="window_alertBtn" />';
					break;
				case 'confirm':
					footContent = '<input type="button" value='+ this.cfg.text4ConfirmBtn +
					' class="window_confirmBtn" /><input type="button" value='+ 
					this.cfg.text4CancelBtn +' class="window_cancelBtn" />';
					break;
				case 'prompt':
					this.cfg.content += '<p class="window_promptInputWrapper"><input type="'+
					(this.cfg.isPromptInputPassword?"password":"text")+'" value="'+ this.cfg.defaultValue4PromptInput
					+'" maxlength="'+ this.cfg.maxlength4PromptInput +'" class="window_promptInput" /></p>';
					
					footContent = '<input type="button" value='+ this.cfg.text4PromptBtn +
					' class="window_promptBtn" /><input type="button" value='+ 
					this.cfg.text4CancelBtn +' class="window_cancelBtn" />';
					break;
			}
			
			this.boundingBox = $('<div class="window_boundingBox">'+
				'<div class="window_body">'+ this.cfg.content +'</div>'
			+'</div>');	
			if( this.cfg.winType != 'common' ){
				this.boundingBox.prepend('<div class="window_header">'+ this.cfg.title +'</div>');
				this.boundingBox.append('<div class="window_footer">'+ footContent +'</div>');
			}
			if( this.cfg.hasMask ){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo('body');
			}
			if( this.cfg.hasCloseBtn ){
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			}
			this.boundingBox.appendTo(document.body);
			this._promptInput = this.boundingBox.find('.window_promptInput');
		},
		
		bindUI : function(){	//事件绑定和触发
			var This = this;
			this.boundingBox.delegate('.window_alertBtn','click',function(){
				This.fire('alert');
				This.destroy();
			}).delegate('.window_closeBtn','click',function(){
				This.fire('close');
				This.destroy();
			}).delegate('.window_confirmBtn','click',function(){
				This.fire('confirm');
				This.destroy();
			}).delegate('.window_cancelBtn','click',function(){
				This.fire('cancel');
				This.destroy();
			}).delegate('.window_promptBtn','click',function(){
				This.fire('prompt',This._promptInput.val());
				This.destroy();
			});
			
			if(this.cfg.handler4AlertBtn){
				this.on( 'alert',this.cfg.handler4AlertBtn );
			}
			if(this.cfg.handler4CloseBtn){
				this.on( 'close',this.cfg.handler4CloseBtn );
			}
			if(this.cfg.handler4ConfirmBtn){
				this.on( 'confirm',this.cfg.handler4ConfirmBtn );
			}
			if(this.cfg.handler4CancelBtn){
				this.on( 'cancel',this.cfg.handler4CancelBtn );
			}
			if(this.cfg.handler4PromptBtn){
				this.on( 'prompt',this.cfg.handler4PromptBtn );
			}
		},
		
		syncUI : function(){	//初始化组件属性
			this.boundingBox.css({
				width : this.cfg.width + 'px',
				height : this.cfg.height + 'px',
				left : ( this.cfg.x || (window.innerWidth - this.cfg.width)/2 ) + 'px',
				top : ( this.cfg.y || ( window.innerHeight - this.cfg.height )/2 ) + 'px'
			});
			if( this.cfg.skinClassName ){
				boundingBox.addClass(this.cfg.skinClassName);
			}
			if( this.cfg.isDraggable ){
				if( this.cfg.dragHandle ){
					this.boundingBox.draggable({ handle:this.cfg.dragHandle });	//默认情况下jquery是没有draggable方法的，这是导入jqueryUI模块后增加的
				}else{
					this.boundingBox.draggable();
				}
			}
		},
		
		destructor : function(){
			this._mask && this._mask.remove();
		},
		
		//alert已经被简化到如下
		alert : function(cfg){
			$.extend(this.cfg, cfg, {winType:'alert'});
			this.render();
			return this;
		},
		
		confirm : function(cfg){
			$.extend(this.cfg, cfg, {winType:'confirm'});
			this.render();
			return this;
		},
		
		prompt : function(cfg){
			$.extend(this.cfg, cfg, {winType:'prompt'});
			this.render();
			this._promptInput.focus();
			return this;
		},
		
		common : function(cfg){
			$.extend(this.cfg, cfg, {winType:'common'});
			this.render();
			return this;
		}
	});
	
	return {
		Window:Window
	};
});