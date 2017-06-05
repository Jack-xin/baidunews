$(function() {
    // 打开后台系统，获取mysql中的数据，并刷新表格
    refreshTable();
    
    // 添加新闻新闻类型从后台加载得出
    $.ajax({
        url: 'src/sever/getsubscribelist.php',
        type: 'GET',
        dataTypes: 'json',
        success: function(data) {
            var newstypewrap = $('#carouseltype');
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
                items = $('#add_carousel input'),
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
            var sendNews = {
                "carouseltype": $('#carouseltype').val(),
                "carouseltitle": $('#carouseltitle').val(),
                "carouselsrc": $('#carouselsrc').val(),
                "carouseltime": $('#carouseltime').val(),
                "carouselimg": $('#carouselimg').val()
            }

            $.ajax({
                url: 'src/sever/addcarousel.php',
                type: 'POST',
                dataTypes: 'json',
                data: {
                    "newCarousel": JSON.stringify(sendNews)
                },
                success: function(data) {
                    $('#newstable tbody').empty();
                    $('#add_carousel input').val('');
                    $('#carouseltype').val('推荐');
                    // 刷新新闻列表
                    refreshTable();
                }
            });
        }

    });

    // 删除新闻
    $('#newstable tbody').on('click', '.btn-danger', function() {
        $('#del_news_title').remove();
        var carouseltitle = $(this).parent().prevAll().eq(1).html(),
            p = $('<p id="del_news_title"></p>');

        p.html(carouseltitle);
        $('#deleteModal .modal-body').append(p);

        $('#deleteModal').modal('show');
    });

    // 确认删除新闻
    $('#confirmDelete').on('click', function() {
        $.ajax({
            url: 'src/sever/deletecarousel.php',
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
    var carouselid = null;
    $('#newstable tbody').on('click', '.btn-primary', function() {
    	var _this = $(this);
    	// 获取订阅列表
        $.ajax({
            url: 'src/sever/getsubscribelist.php',
            type: 'GET',
            dataTypes: 'json',
            success: function(data) {
                var newstypewrap = $('#ucarouseltype');
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
            url: 'src/sever/getcarousel.php',
            type: 'GET',
            dataTypes: 'json',
            data: {
                carouseltype: ''
            },
            success: function(response) {
                var updatelist = null,
                	originaltitle = _this.parent().prevAll().eq(1).html(),
                	optionValue = null,
                    data = eval("(" + response + ")");
               	// 循环得出将要被修改的新闻列表
                $.each(data, function(index, element) {
                    if (data[index]['carouseltitle'] == originaltitle) {
                    	updatelist = data[index];
                    	return false;
                    }
                });

                $('#ucarouseltype').val(updatelist['carouseltype']);
                $('#ucarouseltitle').val(updatelist['carouseltitle']);
                $('#ucarouselsrc').val(updatelist['carouselsrc']);
                $('#ucarouseltime').val(updatelist['carouseltime']);
                $('#ucarouselimg').val(updatelist['carouselimg']);
                carouselid = updatelist['id'];
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
            "carouseltype": $('#ucarouseltype').val(),
            "carouseltitle": $('#ucarouseltitle').val(),
            "carouselsrc": $('#ucarouselsrc').val(),
            "carouseltime": $('#ucarouseltime').val(),
            "carouselimg": $('#ucarouselimg').val(),
            'carouselid': carouselid
        }

        $.ajax({
        	url: 'src/sever/updatecarousel.php',
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
            url: 'src/sever/getcarousel.php',
            type: 'GET',
            dataTypes: 'json',
            data: {
                'carouseltype': ''
            },
            success: function(response) {
                var tbody = $('#newstable tbody'),
                    data = eval("(" + response + ")");

                data.forEach( function(element, index) {
                    // 插入新闻
                    var tr = $('<tr></tr>'),
                        carouseltype = $('<td></td>').html(data[index]['carouseltype']),
                        carouseltitle = $('<td></td>').html(data[index]['carouseltitle']),
                        carouseltime = $('<td></td>').html(data[index]['carouseltime']),
                        editwrap = $('<td></td>'),
                        newsedit = $('<button type="button" class="btn btn-primary btn-xs">编辑</button>'),
                        newsdelete = $('<button type="button" class="btn btn-danger btn-xs">删除</button>');

                    editwrap.append(newsedit)
                        .append(newsdelete);

                    tr.append(carouseltype)
                        .append(carouseltitle)
                        .append(carouseltime)
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
