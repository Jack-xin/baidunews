;(function() {
    function Carousel(option) {
        this.wrapper = option.wrapper;           //必须，被触摸元素
        this.content = option.content;           //必须，被轮播元素的包裹元素
        this.item = option.item;                 //必须，被轮播元素
        this.navItem = option.navItem;           //必须，轮播nav小标点      
        this.itemWidth = option.itemWidth;       //必须，被轮播元素宽度
        this.attr = option.attr == null ? 'translateX' : option.attr;     //可选，轮播方向，默认横向轮播
        this.direction = option.direction == null ? 'pageX' : option.direction;
        this.switchTime = option.switchTime == null ? 3000 : option.switchTime;     //可选，轮播切换时间，默认2s
        this.animateTime = option.animateTime == null ? '0.3s' : option.animateTime;    //可选，轮播切换动画时间，默认0.3s
        this.startPoint = 0;                     //触摸开始的坐标
        this.startMove = 0;                      //触摸开始的translate值
        this.index = 0;                          //轮播元素索引
        this.timer = 0;                          //定时器

        this.touchStart = function() {
            var _this = this;
            _this.wrapper.on('touchstart', function(e) {
                clearInterval(_this.timer);
                _this.content.style.transition = "none";
                var moveX = _this._cssTransform(_this.content, _this.attr);
                _this.index = Math.round(-moveX / _this.itemWidth);

                // 修正this.index的值
                if (_this.index == 0) {
                    _this.index = _this.navItem.length;
                } else if (_this.index == _this.item.length - 1) {
                    _this.index = _this.navItem.length - 1;
                }

                _this._cssTransform(_this.content, _this.attr, -_this.index * _this.itemWidth);
                // 获取触摸的坐标点以及translate值
                // _this.startPoint = e.originalEvent.changedTouches[0].pageX;
                _this.startPoint = e.originalEvent.changedTouches[0][_this.direction];
                _this.startMove = _this._cssTransform(_this.content, _this.attr);
            });
        };

        this.touchMove = function() {
            var _this = this;
            _this.wrapper.on('touchmove', function(e) {
                // var endPoint = e.originalEvent.changedTouches[0].pageX;
                var endPoint = e.originalEvent.changedTouches[0][_this.direction];
                var disX = endPoint - _this.startPoint;
                // 移动相应的距离
                _this._cssTransform(_this.content, _this.attr, disX + _this.startMove);
            });
        };

        this.touchEnd = function() {
            var _this = this;
            // 当touchmove的距离大于5向右移动，当touchmove的距离小于-5向左移动
            _this.wrapper.on('touchend', function() {
                var moveX = _this._cssTransform(_this.content, _this.attr);
                
                if (Math.floor(moveX - _this.startMove) > 5) {
                    moveX += _this.itemWidth;
                } else if (Math.floor(moveX - _this.startMove) < -5) {
                    moveX -= _this.itemWidth;
                }

                // touchmove的距离大于5，this.index - 1；touchmove的距离小于-5，this.index + 1
                _this.index = Math.round(-moveX / _this.itemWidth);
                
                _this._tab();
                _this._play();
            });
        };
    }

    Carousel.prototype = {
        //自动轮播
        _play: function() {                           
            var _this = this;
            clearInterval(_this.timer);

            _this.timer = setInterval(function() {
                // 修正this.index的值
                if (_this.index == _this.item.length - 1) {
                    _this.index = _this.navItem.length - 1;
                }

                _this.content.style.transition = "none";
                // 移动轮播元素
                _this._cssTransform(_this.content, _this.attr, -_this.index * _this.itemWidth);
                // 每次执行this.index累加一次
                setTimeout(function() {
                    _this.index++;
                    _this._tab();
                }, 30);
            }, _this.switchTime);
        },
        // nav小标随着轮播元素改变
        _tab: function() {
            var _this = this;
            // 设置切换轮播元素时间
            _this.content.style.transition = _this.animateTime;
            // 移动轮播元素
            _this._cssTransform(_this.content, _this.attr, -_this.index * _this.itemWidth);
            // 切换nav小标
            for (var i = 0; i < _this.navItem.length; i++) {
                _this.navItem.eq(i).removeClass('active');
            };
            // 修正this.index的值和nav的index对应上
            _this.navItem.eq(_this.index % _this.navItem.length).addClass('active');
        },

        _cssTransform: function(element, attr, value) {
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
    
    window.Carousel = Carousel;

}());