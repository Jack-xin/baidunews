$(function() {
    // 打开后台系统，获取mysql中的数据，并刷新表格
    refreshTable();

    // 手动添加新闻
    $('#submitsubscribe').on('click', function(e) {
        e.preventDefault();

        // 验证表单
        var validform = function() {
            var flag = 0,
                items = $('#add_subscribe input'),
                length = items.size();

            for (var i = 0; i < length; i++) {
                if (!items.eq(i).val()) {
                    flag += 1;
                    items.eq(i).parent().addClass('has-error');

                } else {
                    items.eq(i).parent().removeClass('has-error');
                }
            }

            if (flag == 0) {
                return true;
            } else {
                return false;
            }
        }

        if (validform()) {
            // 提交新闻
            var sendsubscribe = {
                "listvalue": $('#subscribetitle').val(),
                "listsrc": $('#subscribesrc').val(),
                "listtime": $('#subscribetime').val(),
                "listindex": $('#subscribeindex').val()
            }

            $.ajax({
                url: 'src/sever/addsubscribe.php',
                type: 'POST',
                dataTypes: 'json',
                data: {
                    "newNews": JSON.stringify(sendsubscribe)
                },
                success: function(data) {
                    $('#subscribetable tbody').empty();
                    $('#add_subscribe input').val('');
                    // 刷新新闻列表
                    refreshTable();
                }
            });
        }

    });

    // 删除新闻
    $('#subscribetable tbody').on('click', '.btn-danger', function() {
        $('#del_listvalue').remove();
        var listvalue = $(this).parent().prevAll().eq(3).html(),
            p = $('<p id="del_listvalue"></p>');

        p.html(listvalue);
        $('#deleteModal .modal-body').append(p);

        $('#deleteModal').modal('show');
    });

    // 确认删除新闻
    $('#confirmDelete').on('click', function() {
        $.ajax({
            url: 'src/sever/deletesubscribe.php',
            type: 'POST',
            data: {
                'del_listvalue': $('#del_listvalue').html()
            },
            success: function(data) {
                $('#deleteModal').modal('hide');
                // 刷新新闻列表
                $('#subscribetable tbody').empty();
                refreshTable();
            },
            error: function(data) {
                console.log(data);
            }
        });
    });

    // 编辑新闻
    var listid = null;
    $('#subscribetable tbody').on('click', '.btn-primary', function() {
    	var _this = $(this);

        // 显示被修改新闻内容
        $.ajax({
            url: 'src/sever/getsubscribelist.php',
            type: 'GET',
            dataTypes: 'json',
            success: function(data) {
                var updatelist = null,
                	originalvalue = _this.parent().prevAll().eq(3).html();
                	// optionValue = null;
               	// 循环得出将要被修改的新闻列表
                $.each(data, function(index, element) {
                    if (data[index]['listvalue'] == originalvalue) {
                    	updatelist = data[index];
                    	return false;
                    }
                });

                // 获取新闻图片显示类型
                // optionValue = $('#uflag').children().eq(updatelist['flag']).val();

                $('#usubscribetitle').val(updatelist['listvalue']);
                $('#usubscribeindex').val(updatelist['listindex']);
                $('#usubscribetime').val(updatelist['listtime']);
                $('#usubscribesrc').val(updatelist['listsrc']);
                
                listid = updatelist['id'];
            },
            error: function(data) {
                console.log(data);
            }
        });

        $('#updateModal').modal('show');
    });

    // 保存编辑好的新闻
    $('#updatesubscribe').on('click', function() {
    	var updateData = {
            "listvalue": $('#usubscribetitle').val(),
            "listsrc": $('#usubscribesrc').val(),
            "listtime": $('#usubscribetime').val(),
            "listindex": $('#usubscribeindex').val(),
            "listid": listid
        }

        $.ajax({
        	url: 'src/sever/updatesubscribe.php',
        	type: 'POST',
        	data: {
        		'update': JSON.stringify(updateData)
        	},
        	success: function(data) {
        		$('#updateModal').modal('hide');
        		// 刷新新闻列表
        		$('#subscribetable tbody').empty();
        		refreshTable();
        	},
        	error: function(data) {
        		console.log(data);
        	}
        });

    });

    $('.datetimepicker').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        minView: 2,
        weekStart: 0
    });

    function refreshTable() {
        $.ajax({
            url: 'src/sever/getsubscribelist.php',
            type: 'GET',
            dataTypes: 'json',
            success: function(data) {
                var tbody = $('#subscribetable tbody');

                $.each(data, function(index, element) {
                    // 插入新闻
                    var tr = $('<tr></tr>'),
                        listvalue = $('<td></td>').html(data[index]['listvalue']),
                        listindex = $('<td></td>').html(data[index]['listindex']),
                        listtime = $('<td></td>').html(data[index]['listtime']),
                        listsrc = $('<td></td>').html(data[index]['listsrc']);
                        editwrap = $('<td></td>');
                    listupdate = $('<button type="button" class="btn btn-primary btn-xs">编辑</button>'),
                        listdelete = $('<button type="button" class="btn btn-danger btn-xs">删除</button>');

                    editwrap.append(listupdate)
                        .append(listdelete);

                    tr.append(listvalue)
                      .append(listindex)
                      .append(listtime)
                      .append(listsrc)
                      .append(editwrap);

                    tbody.prepend(tr);
                });
            },
            error: function(data) {
                console.log(data);
            }
        });
    }

});
