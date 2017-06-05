$(function() {
    // 打开后台系统，获取mysql中的数据，并刷新表格
    refreshTable();
    
    // 添加新闻新闻类型从后台加载得出
    $.ajax({
        url: 'src/sever/getsubscribelist.php',
        type: 'GET',
        dataTypes: 'json',
        success: function(data) {
            var newstypewrap = $('#newstype');
            $.each(data, function(index, element) {
                var option = $('<option></option>');
                option.html(data[index]['listvalue']);
                newstypewrap.append(option);
            });
        },
        error: function(data) {
            console.log(data);
        }
    });

    // 手动添加新闻
    $('#submitnews').on('click', function(e) {
        e.preventDefault();

        // 验证表单
        var validform = function() {
            var flag = 0,
                items = $('#add_news input'),
                length = items.size(),
                newsShowType = $('#flag').val(),
                newsimg = $('#newsimg');

            for (var i = 0; i < length; i++) {
                if (!items.eq(i).val()) {
                    flag += 1;
                    items.eq(i).parent().addClass('has-error');

                    if (newsShowType == '文字新闻') {
                        newsimg.parent().removeClass('has-error');
                    }

                } else {
                    items.eq(i).parent().removeClass('has-error');
                }
            }

            if (flag == 0) {
                return true;
            } else {
                var temp = $('#newstitle').val() != '' && $('#newssrc').val() != '' &&
                    $('#newstime').val() != '' && $('#newshot').val() != '';

                if ($('#flag').val() == '文字新闻' && temp) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        if (validform()) {
            // 提交新闻
            var sendNews = {
                "newstype": $('#newstype').val(),
                "newstitle": $('#newstitle').val(),
                "flag": $('#flag').val() == '多图新闻' ? 1 : $('#flag').val() == '文字新闻' ? 2 : 0,
                "newssrc": $('#newssrc').val(),
                "newstime": $('#newstime').val(),
                "newshot": $('#newshot').val(),
                "newsimg": $('#newsimg').val()
            }

            $.ajax({
                url: 'src/sever/addnews.php',
                type: 'POST',
                dataTypes: 'json',
                data: {
                    "newNews": JSON.stringify(sendNews)
                },
                success: function(data) {
                    $('#newstable tbody').empty();
                    $('#add_news input').val('');
                    $('#newstype').val('推荐');
                    $('#flag').val('单图新闻');
                    // 刷新新闻列表
                    refreshTable();
                }
            });
        }

    });

    // 删除新闻
    $('#newstable tbody').on('click', '.btn-danger', function() {
        $('#del_news_title').remove();
        var newstitle = $(this).parent().prevAll().eq(2).html(),
            p = $('<p id="del_news_title"></p>');

        p.html(newstitle);
        $('#deleteModal .modal-body').append(p);

        $('#deleteModal').modal('show');
    });

    // 确认删除新闻
    $('#confirmDelete').on('click', function() {
        $.ajax({
            url: 'src/sever/deletenews.php',
            type: 'POST',
            data: {
                'del_news_title': $('#del_news_title').html()
            },
            success: function(data) {
                $('#deleteModal').modal('hide');
                // 刷新新闻列表
                $('#newstable tbody').empty();
                refreshTable();
            },
            error: function(data) {
                console.log(data);
            }
        });
    });

    // 编辑新闻
    var newsid = null;
    $('#newstable tbody').on('click', '.btn-primary', function() {
    	var _this = $(this);
    	// 获取订阅列表
        $.ajax({
            url: 'src/sever/getsubscribelist.php',
            type: 'GET',
            dataTypes: 'json',
            success: function(data) {
                var newstypewrap = $('#unewstype');
                $.each(data, function(index, element) {
                    var option = $('<option></option>');
                    option.html(data[index]['listvalue']);
                    newstypewrap.append(option);
                });
            },
            error: function(data) {
                console.log(data);
            }
        });

        // 显示被修改新闻内容
        $.ajax({
            url: 'src/sever/getNews.php',
            type: 'GET',
            dataTypes: 'json',
            data: {
                newstype: ''
            },
            success: function(response) {
                var updatelist = null,
                	originaltitle = _this.parent().prevAll().eq(2).html(),
                	optionValue = null,
                    data = eval("(" + response + ")");
               	// 循环得出将要被修改的新闻列表
                $.each(data, function(index, element) {
                    if (data[index]['newstitle'] == originaltitle) {
                    	updatelist = data[index];
                    	return false;
                    }
                });

                // 获取新闻图片显示类型
                optionValue = $('#uflag').children().eq(updatelist['flag']).val();

                $('#unewstype').val(updatelist['newstype']);
                $('#unewstitle').val(updatelist['newstitle']);
                $('#uflag').val(optionValue);
                $('#unewssrc').val(updatelist['newssrc']);
                $('#unewstime').val(updatelist['newstime']);
                $('#unewshot').val(updatelist['newshot']);
                $('#unewsimg').val(updatelist['newsimg']);
                newsid = updatelist['id'];
            },
            error: function(data) {
                console.log(data);
            }
        });

        $('#updateModal').modal('show');
    });

    // 保存编辑好的新闻
    $('#updatenews').on('click', function() {
    	var updateData = {
            "newstype": $('#unewstype').val(),
            "newstitle": $('#unewstitle').val(),
            "flag": $('#uflag').val() == '多图新闻' ? 1 : $('#flag').val() == '文字新闻' ? 2 : 0,
            "newssrc": $('#unewssrc').val(),
            "newstime": $('#unewstime').val(),
            "newshot": $('#unewshot').val(),
            "newsimg": $('#unewsimg').val(),
            'newsid': newsid
        }

        $.ajax({
        	url: 'src/sever/updatenews.php',
        	type: 'POST',
        	data: {
        		'update': JSON.stringify(updateData)
        	},
        	success: function(data) {
        		$('#updateModal').modal('hide');
        		// 刷新新闻列表
        		$('#newstable tbody').empty();
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
            url: 'src/sever/getNews.php',
            type: 'GET',
            dataTypes: 'json',
            data: {
                'newstype': ''
            },
            success: function(response) {
                var tbody = $('#newstable tbody'),
                    data = eval("(" + response + ")");

                data.forEach( function(element, index) {
                    // 插入新闻
                    var tr = $('<tr></tr>'),
                        newstype = $('<td></td>').html(data[index]['newstype']),
                        newstitle = $('<td></td>').html(data[index]['newstitle']),
                        newstime = $('<td></td>').html(data[index]['newstime']),
                        newshot = $('<td></td>').html(data[index]['newshot']),
                        editwrap = $('<td></td>'),
                        newsedit = $('<button type="button" class="btn btn-primary btn-xs">编辑</button>'),
                        newsdelete = $('<button type="button" class="btn btn-danger btn-xs">删除</button>');

                    editwrap.append(newsedit)
                        .append(newsdelete);

                    tr.append(newstype)
                        .append(newstitle)
                        .append(newstime)
                        .append(newshot)
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
