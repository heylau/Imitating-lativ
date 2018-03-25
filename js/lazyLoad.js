/**
 * Created by F on 2018/3/18.
 */
(function () {
    window.onload = function() {
        //运行瀑布流主函数
        //PBL('waterFall', 'box');
        //模拟数据
        var data = [{'src': '1.jpg', 'title': '瀑布流'}, {'src': '2.jpg', 'title': '手册网'}, {'src': '3.jpg', 'title': '瀑布流'}, {'src': '4.jpg', 'title': '瀑布流'}, {'src': '5.jpg', 'title': '瀑布流'}, {'src': '6.jpg', 'title': '瀑布流'}, {'src': '7.jpg', 'title': '瀑布流'}, {'src': '8.jpg', 'title': '瀑布流'}, {'src': '9.jpg', 'title': '瀑布流'}, {'src': '10.jpg', 'title': '瀑布流'},{'src': '11.jpg', 'title': '瀑布流'},{'src': '12.jpg', 'title': '瀑布流'},{'src': '13.jpg', 'title': '瀑布流'},{'src': '14.jpg', 'title': '瀑布流'}];
        //设置滚动加载
        window.onscroll = function() {
            //校验数据请求
            if (getCheck()) {
                var wrap = document.getElementById('waterFall');
                for (i in data) {
                    var noteT = template("tmp",data[i]);
                    wrap.innerHTML+=noteT;
                }
                setTimeout(function () {
                    PBL('waterFall', 'box');
                },200)

            }
        }
    }
    /**
     * 瀑布流主函数
     * @param  wrap	[Str] 外层元素的ID
     * @param  box 	[Str] 每一个box的类名
     */
    function PBL(wrap, box) {
        //	1.获得外层以及每一个box
        var wrap = document.getElementById(wrap);
        var boxs = getClass(wrap, box);
        //	2.获得屏幕可显示的列数
        var boxW = boxs[0].offsetWidth;
        var colsNum = Math.floor(wrap.offsetWidth / boxW);
//            wrap.style.width = boxW * colsNum + 'px';//为外层赋值宽度
        //	3.循环出所有的box并按照瀑布流排列
        var everyH = [];//定义一个数组存储每一列的高度
        for (var i = 0; i < boxs.length; i++) {
            if (i < colsNum) {
                everyH[i] = boxs[i].offsetHeight;
                //everyH.push(boxs[i].offsetHeight);
            } else {
                var minH = Math.min.apply(null, everyH);//获得最小的列的高度
                var minIndex = getIndex(minH, everyH); //获得最小列的索引
                getStyle(boxs[i], minH, boxs[minIndex].offsetLeft, i);
                everyH[minIndex] += boxs[i].offsetHeight;//更新最小列的高度
            }
        }

    }
    /**
     * 获取类元素
     * @param  warp		[Obj] 外层
     * @param  className	[Str] 类名
     */
    function getClass(wrap, className) {
        var obj = wrap.getElementsByTagName('*');
        var arr = [];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].className == className) {
                arr.push(obj[i]);
            }
        }
        return arr;
    }
    /**
     * 获取最小列的索引
     * @param  minH	 [Num] 最小高度
     * @param  everyH [Arr] 所有列高度的数组
     */
    function getIndex(minH, everyH) {
        for (index in everyH) {
            if (everyH[index] == minH)
                return index;
        }
    }
    /**
     * 数据请求检验
     */
    function getCheck() {
        //var documentH = document.documentElement.clientHeight;
        //var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
        //return documentH + scrollH >= getLastH() ? true : false;
        return getCheck = function () {
            return false;
        }
    }
    /**
     * 获得最后一个box所在列的高度
     */
    function getLastH() {
        var wrap = document.getElementById('waterFall');
        var boxs = getClass(wrap, 'box');
        return boxs[boxs.length - 1].offsetTop + boxs[boxs.length - 1].offsetHeight;
    }
    /**
     * 设置加载样式
     * @param  box 	[obj] 设置的Box
     * @param  top 	[Num] box的top值
     * @param  left 	[Num] box的left值
     * @param  index [Num] box的第几个
     */
    var getStartNum = 0;//设置请求加载的条数的位置
    function getStyle(box, top, left, index) {
        if (getStartNum >= index)
            return;
        $(box).css({
            'position': 'absolute',
            'top': top,
            "left": left,
            "opacity": "0"
        });
        $(box).stop().animate({
            "opacity": "1"
        }, 999);
        getStartNum = index;//更新请求数据的条数位置
    }

})()

