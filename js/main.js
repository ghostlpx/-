require.config({
	paths:{
		jquery:'jquery-1.10.2.min',
		jqueryUI:'jquery-ui.min'
	}
});

//程序入口，依赖jquery和window模块
require(['jquery','window'],function($,w){
	$('#a').click(function(){
		var win = new w.Window();
		win.alert({
			title : '提示',
			content : 'hello!',
			text4AlertBtn : 'OK',
			//skinClassName : 'window_skin_a',
			isDraggable : true,
			dragHandle : '.window_header',
			hasMask : true,
			handler4AlertBtn : function(){
				alert('you click the alert button.');
			},
			handler4CloseBtn : function(){
				alert('you click the close button.');
			},
			hasCloseBtn : true,
			width : 300,
			height : 150,
			y : 50
		}).on( 'alert',function(){
			alert('连缀绑定');
		}).on('close',function(){
			alert('连缀绑定');
		});
		
		win.on('alert',function(){alert('second alert');});	//可以再次监听alert事件
		win.on( 'close',function(){ alert('second close'); } );
	});
	
	$('#b').click(function(){
		var win = new w.Window();
		win.confirm({
			title : '系统消息',
			content : '您确定要删除这个文件吗？',
			width : 300,
			height : 150,
			y : 50,
			text4ConfirmBtn : '是',
			text4CancelBtn : '否',
			dragHandle : '.window_header'
		}).on('confirm',function(){
			alert('确定');
		}).on('cancel',function(){
			alert('取消');
		});
	});
	
	$('#c').click(function(){
		var win = new w.Window();
		win.prompt({
			title : '请输入您的姓名',
			content : '我们将会为您保密',
			width : 300,
			height : 150,
			y : 50,
			text4PromptBtn : '输入',
			text4CancelBtn : '取消',
			defaultValue4PromptInput : '张三',
			dragHandle : '.window_header',
			handler4PromptBtn : function(inputValue){
				alert('您输入的内容是：'+inputValue);
			},
			handler4CancelBtn : function(){
				alert('您取消了输入');
			}
		});
	});
	
	$('#d').click(function(){
		var win = new w.Window();
		win.common({
			content : '普通窗口',
			width : 300,
			height : 100,
			y : 50,
			hasCloseBtn : true
		});
	});
	
});