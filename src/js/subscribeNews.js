$(function(){
		
	var oldIndex = [];  //定义变量获取排序前的li的_index的值，并存入oldIndex中

	// 输出li
	$.ajax({
		// url: 'src/sever/getSubscribe.php',
		url: 'src/sever/getsubscribelist.php',
		type: 'GET',
		dataTypes: 'json',
		success: function(data) {
			// 对接收到的json数据进行排序，并赋给json变量
			var json = data.sort(compare('listindex'));	
			// 循环插入li
			$.each(json, function(index, value){
				var li = $('<li class="ui-state-default"></li>');
				li.append(function(){
					var arr = [
							'<a class="name"></a>',
							'<span class="delete"></span>',
							'<span class="handle">移动</span>',
							'<span class="confirm-delete">删除</span>'
						];

					return $.each(arr, function(key, value){
						arr[key];
					});
				});

				$('#sortable').append(li);
				$('#sortable li').eq(index).attr('_index', json[index].listindex);
				$('#sortable li a').eq(index).attr('href', json[index].listsrc);
				$('#sortable li a').eq(index).html(json[index].listvalue);
			});

			// 获取排序前的li的_index的值，并存入oldIndex中
			var items = $('#sortable li');
			items.each(function(index) {
				oldIndex.push(items.eq(index).attr('_index'));
			});

			// h3标签内显示有多少个子元素
			$('#lists_num').html(function(){
				return $('#sortable').children().size() + 1;
			});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
	});

	//显示删除 
	$('#sortable').on('touchstart', '.delete', function (){
		var index = $(this).parent().index();

		if (!$(this).hasClass('rotate')) {
			$(this).addClass('rotate');
			$('.confirm-delete').eq(index).show();
		} else {
			$(this).removeClass('rotate');
			$('.confirm-delete').eq(index).hide();
		}		
	});

	// 删除元素
	$('#sortable').on('touchend', '.confirm-delete', function() {
		var _this = $(this);
		var listvalue = _this.parent().find('a').html();
		$.ajax({
			url: 'src/sever/deletesubscribe.php',
			type: 'POST',
			data: {
				// 'listvalue' : listvalue
				'del_listvalue': listvalue
			},
			success: function(response) {
				_this.parent().remove();
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
		});
	});

	// 拖拽排序
	var sortable = new Sortable($('#sortable')[0],{
		sort: true,
		animation: 100,
		handle: '.handle',
		ghostClass: 'ghost'	
	});

	// 返回上一页
	$('.btn_back a').on('touchend', function(e) {
		e.preventDefault();
		window.history.back();
		location.reload();
	});

	//点击完成 
	$('.btn_close a').on('touchend', function(){
		var sendIndex_value = null,
			sendIndex_key = [],
			sendIndex = {},
			items = $('#sortable li a');

		items.each(function(index) {
			sendIndex_key.push(items.eq(index).html());
		});

		sendIndex_value = oldIndex;

		// 组合成新的json数据，用于传输到后台
		for (var i = 0; i < sendIndex_key.length; i++) {
			sendIndex[sendIndex_key[i]] = sendIndex_value[i];
		}
		
		$.ajax({
			url: 'src/sever/sortSubscribe.php',
			type: 'POST',
			dataTypes: 'json',
			data: {
				'newListIndex': JSON.stringify(sendIndex)
			},
			success: function(data) {
				console.log('success');
			},
			// error: function(XMLHttpRequest, textStatus, errorThrown) {
   //              console.log(XMLHttpRequest.status);
   //              console.log(XMLHttpRequest.readyState);
   //              console.log(textStatus);
   //          }
		});

	});

	// 将得到的json数据按照listindex属性排序
	function compare(property) {
        return function(a, b) {
            var value1 = a[property],
            	value2 = b[property];

            return value1 - value2;
        }
    }

}); 