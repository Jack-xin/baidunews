$(function() {
    // 刷新新闻
    refresh('推荐');

    var scrollTouch = null,  // 存储创建的菜单滑动构造函数
        finished = true,     // 判断下拉刷新是否结束，每次下拉只让刷新一组新闻
        newsType = null,     // 新闻类型，用于菜单点击切换或者下拉刷新不同类型的新闻
        page = 1;            // 默认新闻获取页码

    getMenus()
        .then(function(data) {
            // 接收到的json数据进行排序，并赋给json变量
            var json = data.sort(compare('listindex'));
            // 循环输出li
            $.each(json, function(index, value) {
                var li = $('<li></li>');
                var a = $('<a></a>');
                li.append(a);

                $('#allMenus').append(li);
                $('#allMenus a').eq(index + 1).attr('href', json[index].listsrc);
                $('#allMenus a').eq(index + 1).html(json[index].listvalue);
            });

            return calculatedMenusSize();
        })
        .then(function() {
            // 创建ul元素
            $('.scrollNavWrap').append('<ul class="scrollNav" id="scrollMenus"></ul>');
            // 克隆
            $('#allMenus').children().clone().appendTo($('#scrollMenus'));

            var deviceWidth = $('body').width();

            //自动计算scrollNavWrap的宽度
            $('.scrollNavWrap').css({
                width: deviceWidth - $('.show-more').width()
            });

            // 自动计算scrollMenus的宽度
            $('#scrollMenus').css({
                width: function() {
                    var width = 0,
                        li = $(this).children(),
                        liMarginRight = parseInt(li.eq(0).css('margin-right'));

                    li.each(function() {
                        width += $(this).width();
                    });

                    width += li.size() * 2 * liMarginRight - liMarginRight;

                    return width;
                }
            });

            // 菜单滑动
            Transform($('#scrollMenus')[0]);
            scrollTouch = new AlloyTouch({
                touch: ".scrollNavWrap",
                vertical: false,
                target: $('#scrollMenus')[0],
                property: "translateX",
                min: -$('#scrollMenus').width() - $('.nav-placeholder').width() + $('.scrollNavWrap').width(),
                max: 0
            });
        });

    // 切换菜单事件
    $('.scrollNavWrap').on('touchstart', 'a', function(e) {
        e.preventDefault();
        $('#scrollMenus').children().children().removeClass('selected');

    }).on('touchend', 'a', function(e) {
        e.preventDefault();

        var index = $(this).parent().index(), //li标签的索引值
            parent = $('#scrollMenus'), //ul标签
            deviceWidth = $('body').width(); //设备宽度

        // 选中的a改为active状态
        $(this).addClass('selected');

        // 移动li标签到窗口中间位置
        // 1、index > 2并且小于倒数第三个li的索引值时
        if (index > 2 && index < parent.children().size() - 3) {
            var ulOffsetLeft = parent.offset().left;

            // 判断目标li标签的是否在最中间位置
            if ($(this).offset().left > deviceWidth / 2) {
                //在最中间位置的右侧，移动到最中间位置    
                var moveLeft = parseInt($(this).offset().left - deviceWidth / 2 + $(this).width() / 2);
                scrollTouch.to(ulOffsetLeft - moveLeft, 0);
            } else {
                //在最中间位置的左侧，移动到最中间位置
                var moveRight = parseInt(deviceWidth / 2 - $(this).offset().left - $(this).width() / 2);
                scrollTouch.to(ulOffsetLeft + moveRight, 0);
            }

        } else if (index >= parent.children().size() - 3) {
            var width = 0, //最后三个li标签的总宽度
                leftToParent = 0, //倒数第三个li距离ul的left值
                leftToWrap = 0, //倒数第三个li距离scrollNavWrap的left值
                liMarginRight = parseInt($(this).parent().css('margin-right'));

            for (var i = 0; i < 3; i++) {
                width += parent.children().eq(index + i).width();
            }


            width += 5 * liMarginRight; //3个li标签总共有5个marginRight，所以再加5 * liMarginRight

            leftToWrap = $('.scrollNavWrap').width() - width;
            leftToParent = parent.width() - width;

            scrollTouch.to(-leftToParent + leftToWrap - 25, 0); //25是修正值

        } else if (index <= 2) {
            //3、index <= 2不移动
            scrollTouch.to(0, 0);
        }

        // 切换新闻
        newsType = $(this).html();
        switchNews(newsType);
    });

    // 显示时切换导航栏点击事件
    $('#allMenus').on('touchstart', function() {
        $(this).children().children().removeClass('selected');
    }).on('touchend', function(e) {
        var index = $(e.target).parent().index();
        $(e.target).addClass('selected');

        $('.btnNavArea').hide();
        $('.mark').hide();
        // 模拟触发滑动导航栏点击事件
        $('#scrollMenus a').eq(index).trigger('touchstart').trigger('touchend');
    });

    // 导航栏点击显示下拉菜单
    $('.m-nav .show-more').on('touchend', function() {
        $('.btnNavArea').show();

        var allMenusWidth = $('#allMenus').width();

        // 自动计算allMenus下li的宽度
        $('#allMenus li').each(function() {
            if ($(this).children().html().length > 2) {
                $(this).css({
                    width: allMenusWidth / 3
                });
            } else {
                $(this).css({
                    width: allMenusWidth / 6
                });
            }
        });

        // 显示遮罩
        $('.mark').show();

        // 自动计算遮罩层的高度
        $('.mark').css({
            height: $(window).height()
        });
    });

    // 隐藏下拉菜单
    $('#show-more-hide').on('touchend', function() {
        $('.btnNavArea').hide();

        // 隐藏遮罩
        $('.mark').hide();
    });

    // 下拉显示更多
    $(window).on('scroll', function() {
        
        if (Math.ceil(document.body.scrollTop) > 500) {
            $('.back-to-top').show();
        } else {
            $('.back-to-top').hide();
        }

        loadMore(newsType);
    });

    // 回到顶部
    $('.back-to-top').on('touchend', function() {
        document.body.scrollTop = 0;
    });
   
    // 获取导航栏列表
    function getMenus() {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: 'src/sever/getsubscribelist.php',
                type: 'GET',
                dataTypes: 'json',
                success: function(response) {
                    resolve(response);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                }
            });
        });

        return promise;
    }

    // 为了书写好看，所以采用同步
    function calculatedMenusSize() {
        var promise = new Promise(function(resolve, reject) {
            resolve();
        });

        return promise;
    }

    // 切换新闻
    function switchNews(type) {
        // 清空新闻容器内列表
        $('#newslist-container').empty();
        $('#carousel').empty();
        $('.hot-scroll-news').empty();

        // 热点新闻在推荐页显示
        if (type == '推荐') {
            $('.hot-scroll-news').show();
        } else {
            $('.hot-scroll-news').hide();
        }
        $('.ui-refresh').eq(0).hide();
        $('.ui-refresh').eq(1).hide();
        // 重置page，切换新闻显示最新的新闻
        page = 1;
        refresh(type);
    }

    // 加载更多
    function loadMore(type) {
        var headerHeight = $('.g-hd').height(),
            totalHeight = Math.ceil(document.body.scrollTop + window.innerHeight),
            wrapperHeight = $('.wrapper').height();

        if (type == null) {
            type = '推荐';
        }

        if (finished && wrapperHeight == (totalHeight - headerHeight + 1)) {
            finished = false;
            $('.ui-refresh').eq(0).show();
            $('.ui-refresh').eq(1).hide();
            refreshNews(type);
        } else {
            $('.ui-refresh').eq(0).hide();
            $('.ui-refresh').eq(1).show();
        }
    }

    // 获取新闻
    function refresh(type) {
        // 获取轮播图新闻
        $.ajax({
            url: 'src/sever/getcarousel.php',
            type: 'GET',
            dataTypes: 'json',
            data: {
                'carouseltype': type == null ? '' : type
            },
            beforeSend: function() {
                var deviceWidth = $('body').width(),
                    deviceHeight = window.innerHeight,
                    headerHeight = $('.g-hd').height();

                $('.loadingNews').show().css({
                    left: deviceWidth / 2,
                    top: deviceHeight / 2 - headerHeight
                });
            },
            success: function(response) {
                $('.loadingNews').hide();

                var data = eval("(" + response + ")");

                // 创建轮播元素
                createCarousel(data);

                // 计算轮播图相应尺寸
                var deviceWidth = $('body').width(),
                    item = $('.carousel-item'),
                    wrapper = $('.carousel'),
                    contents = $('.carousel-content'),
                    content = $('.carousel-content')[0],
                    navItem = $('.carousel-nav-item'),
                    images = $('.carousel-content img'),
                    height = 0;

                item.width(deviceWidth);
                contents.width(item.width() * item.length);
                height = getBigHeight(images);
                $('.carousel-item div').height(height - 10);

                // 判断终端（安卓在轮播图预览不能缓存图片导致切换图片出现闪屏现象）
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isAndroid) {
                    contents.addClass('fixC');
                    item.addClass('fixI');
                }

                // 轮播新闻
                var carousel = new Carousel({
                    wrapper: wrapper,
                    content: content,
                    item: item,
                    navItem: navItem,
                    itemWidth: deviceWidth
                });

                carousel._cssTransform(content, 'translateX', 0);
                carousel._play();
                carousel.touchStart();
                carousel.touchMove();
                carousel.touchEnd();

                // 获取新闻列表（不在此ajax中，点击切换新闻会阻塞）
                refreshNews(type);
                refreshHot('hide');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }

    // 获取新闻列表
    function refreshNews(type) {
        $.ajax({
            url: 'src/sever/getNews.php',
            type: 'GET',
            dataTypes: 'json',
            data: {
                'newstype': type == null ? '' : type,
                'page': page
            },
            success: function(response) {

                var newsLength = response.substring(0, response.indexOf('[')),
                    newsdata = response.substring(response.indexOf('[')),
                    data = eval("(" + newsdata + ")");

                // 分页加载
                if (page > newsLength) {
                    // 每次加载10条新闻，当新闻总数不是10的倍数时，最后几条数据会反复加载，所以
                    // 此处将page多加1，让后台程序将$pagesize置为0，则最后几条新闻不再重复加载
                    page = Number(newsLength) + 1;
                } else {
                    page++;
                }

                data.forEach(function(element, index) {
                    var imgArray = data[index]['newsimg'].split(',');

                    if (imgArray.length == 0) {
                        // 一张图新闻
                        createNewsContainer(data[index]['newstype'], data[index]['newstitle'], imgArray, data[index]['newstime'], data[index]['newshot'], data[index]['newssrc'], data[index]['flag']);
                    } else if (imgArray.length == 1) {
                        // 三张图新闻
                        createNewsContainer(data[index]['newstype'], data[index]['newstitle'], imgArray, data[index]['newstime'], data[index]['newshot'], data[index]['newssrc'], data[index]['flag']);
                    } else {
                        // 无图新闻
                        createNewsContainer(data[index]['newstype'], data[index]['newstitle'], imgArray, data[index]['newstime'], data[index]['newshot'], data[index]['newssrc'], data[index]['flag']);
                    }
                });

                finished = true;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }

    // 获取热点新闻
    function refreshHot(type) {
       $.ajax({
            url: 'src/sever/getHot.php',
            type: 'GET',
            dataTypes: 'json',
            data: {
                'hottype': type == null ? '' : type
            },
            success: function(response) {
                var data = eval("(" + response + ")");

                // 创建热点新闻元素
                createScrollNews(data);

                // 滚动
                scrollHot();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        }); 
    }

    // 创建轮播图元素
    function createCarousel(jsondata) {
        var carouselContent = $('<div class="carousel-content"></div>'),
            carouselNav = $('<div class="carousel-nav"></div>');

        $.each(jsondata, function(index, element) {
            var carouselItem = $('<div class="carousel-item"></div>'),
                a = $('<a href="' + jsondata[index]['carouselsrc'] + '">'),
                div = $('<div></div>'),
                image = $('<img src="' + jsondata[index]['carouselimg'] + '">'),
                p = $('<p class="option-text">' + jsondata[index]['carouseltitle'] + '</p>');

            div.append(image);
            a.append(div).append(p);
            carouselItem.append(a);
            carouselContent.append(carouselItem);

            carouselNav.append('<span class="carousel-nav-item"></span>');
        });

        $('.carousel').append(carouselContent).append(carouselNav);
        $('.carousel-nav-item').eq(0).addClass('active');
        // 复制
        $('.carousel-content').append($('.carousel-item').clone(true));
    }

    // 创建新闻容器
    function createNewsContainer(type, title, images, time, hot, src, flag) {
        var indexListContainer = $('<div class="index-list-container"></div>'),
            indexListMain = $('<div class="index-list-main"></div>'),
            indexListImage = $('<div class="index-list-image"></div>'),
            img = $('<img>'),
            indexListMainText = $('<div class="index-list-main-text"></div>'),
            listTitle = $('<div class="list-title"></div>'),
            listBottom = $('<div class="list-bottom"></div>'),
            tipTime = $('<b class="tip-time"></b>'),
            tipHot = $('<b class="tip-hot"></b>'),
            listAlbumContainer = $('<div class="list-album-container"></div>');


        $('#newslist-container').append(indexListContainer);
        indexListContainer.append(indexListMain);
        listTitle.html(title);

        // 一张图片新闻
        if (flag == 0) {
            indexListMain.addClass('showleft');
            indexListMain.append(indexListImage);
            indexListMain.append(indexListMainText);
            indexListImage.append(img);
            img.attr('src', images[0]);
            indexListMainText.append(listTitle);
            indexListMainText.append(listBottom);

            // 三张图片新闻
        } else if (flag == 1) {
            indexListMain.append(listTitle);
            indexListMain.append(listAlbumContainer);
            indexListMain.append(listBottom);

            $.each(images, function(index, element) {
                var img = $('<img>'),
                    listAlbumItem = $('<div class="list-album-item"></div>');

                img.attr('src', images[index]);
                listAlbumItem.append(img);
                listAlbumContainer.append(listAlbumItem);
            });

            // 无图新闻
        } else {
            indexListMain.append(listTitle);
            indexListMain.append(listBottom);
        }

        listBottom.append(tipTime);
        tipTime.html(time);
        listBottom.append(tipHot);
        tipHot.html(hot);
    }

    // 创建滚动新闻
    function createScrollNews(json) {
        var hotNewsIcon = $('<div class="hot-news-icon"></div>'),
            span = $('<span>热点</span>'),
            wrapper = $('<div class="hot-news-wrapper"></div>'),
            content = $('<ul class="hot-news-content"></ul>');

        hotNewsIcon.append(span);
        wrapper.append(content);
        $('.hot-scroll-news').append(hotNewsIcon).append(wrapper);

        $.each(json, function(index, element) {
            var li = $('<li></li>'),
                a = $('<a></a>');

            li.append(a.attr('href', json[index]['hotsrc']).text(json[index]['hottitle']));
            content.append(li);
        });
    }

    // 滚动热点新闻
    function scrollHot() {
       var content = $('.hot-news-content')[0],
           top = 0,
           translateY = 0;

        cssTransform(content, 'translateY', 0);
        var timer = setInterval(function() {
            translateY = cssTransform(content, 'translateY');

            top -= 19;
            // 滚动7条新闻，所以是-96
            if (translateY <= -96) {
                content.style.transition = 'none';
                cssTransform(content, 'translateY', 0);
                top = 0;
            } else {
                content.style.transition = '1s';
                cssTransform(content, 'translateY', top);
            }
        },3000);

        // 设置并获取translateY属性值
        function cssTransform(element, attr, value) {
            if (!element.transform) {
                element.transform = {};
            }
            // 设置transform值
            if (arguments.length > 2) {
                var result = null;
                element.transform[attr] = value;

                for (var key in element.transform) {
                    result = key + "(" + element.transform[key] + "px)";
                    element.style.transform = result;
                    element.style.WebkitTransform = result;
                }
            } else {
                // 读取transform值
                value = element.transform[attr];
                // 设默认值
                if (typeof value == 'undefined') {
                    value = 0;
                }

                return value;
            }
        }
    }

    function compare(property) {
        return function(a, b) {
            var value1 = a[property],
                value2 = b[property];

            return value1 - value2;
        }
    }

    // 获取轮播图片中的最小高度，设置轮播父元素的高度
    function getBigHeight(elements) {
        var arr = [];

        for(var i = 0; i < elements.length; i++){
            arr.push(elements.eq(i).height());
        }

        return arr.sort(sortNum)[0];

        function sortNum(a,b) {
            return a - b;
        }
    }

});
