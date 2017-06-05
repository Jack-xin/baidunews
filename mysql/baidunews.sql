-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-05 13:35:08
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `carouselnews`
--

CREATE TABLE `carouselnews` (
  `id` int(11) NOT NULL,
  `carouseltype` varchar(200) NOT NULL,
  `carouseltitle` varchar(200) NOT NULL,
  `carouselsrc` varchar(200) NOT NULL,
  `carouseltime` date NOT NULL,
  `carouselimg` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `carouselnews`
--

INSERT INTO `carouselnews` (`id`, `carouseltype`, `carouseltitle`, `carouselsrc`, `carouseltime`, `carouselimg`) VALUES
(5, '推荐', '天津港一纸业公司着火', '###', '2017-06-01', 'src/images/carousel2.jpg'),
(4, '推荐', '文在寅向任命新国务总理', '###', '2017-06-01', 'src/images/carousel1.jpg'),
(6, '推荐', '天津大火震撼航拍 火势受控', '###', '2017-06-01', 'src/images/carousel3.jpg'),
(7, '本地', '六一迷你列车长的动车之旅', '###', '2017-06-01', 'src/images/carousel4.jpg'),
(8, '本地', '你遇到过这些街头骗局吗？', '###', '2017-06-01', 'src/images/carousel5.jpg'),
(9, '本地', '一家三口烧伤父亲绝食救幼女', '###', '2017-06-01', 'src/images/carousel6.jpg'),
(10, '本地', '释疑|公布年平均工资时“你为啥', '###', '2017-06-01', 'src/images/carousel8.jpg'),
(11, '推荐', '京东首家线下实体店上海开业', '###', '2017-06-01', 'src/images/carousel7.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `hotnews`
--

CREATE TABLE `hotnews` (
  `id` int(11) NOT NULL,
  `hottitle` varchar(200) NOT NULL,
  `hotsrc` varchar(200) NOT NULL,
  `hottime` date NOT NULL,
  `hottype` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `hotnews`
--

INSERT INTO `hotnews` (`id`, `hottitle`, `hotsrc`, `hottime`, `hottype`) VALUES
(3, '习近平将对哈萨克斯坦进行国事访问', '###', '2017-06-01', '推荐'),
(4, '北上广深二手房价和租金齐跌', '###', '2017-06-01', '推荐'),
(5, '无人机实名登记系统存漏洞', '###', '2017-06-01', '推荐'),
(6, '世界最大双机身飞机首次亮相', '###', '2017-06-01', '推荐'),
(7, '顺丰菜鸟数据断交', '###', '2017-06-01', '推荐'),
(8, '上海多小区禁入共享单车', '###', '2017-06-01', '推荐'),
(9, '阿里巴巴市值已位列全球前十', '###', '2017-06-01', '推荐'),
(10, '德国音乐节因受恐袭威胁紧急暂停', '###', '2017-06-01', '本地'),
(11, 'Facebook受压修改虚假新闻', '###', '2017-06-01', '本地'),
(12, '人民币兑美元创半年新高', '###', '2017-06-01', '本地'),
(13, '毕业展作品被盗皮皮虾也遭殃', '###', '2017-06-01', '本地'),
(14, '阿里入驻联华超市之背后分析', '###', '2017-06-01', '本地'),
(15, '美国宣布对朝鲜新制裁涉及两俄企', '###', '2017-06-01', '本地'),
(16, '茅台飞天背后的“价格烦恼”', '###', '2017-06-01', '本地');

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `newstype` char(200) NOT NULL,
  `newstitle` varchar(200) NOT NULL,
  `newssrc` char(100) NOT NULL,
  `newstime` date NOT NULL,
  `newshot` char(100) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `flag` char(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newstype`, `newstitle`, `newssrc`, `newstime`, `newshot`, `newsimg`, `flag`) VALUES
(57, '互联网', '腾讯数据生态化解行业痛点，车企客户关系管理走上智能快车道', '###', '2017-05-28', '大数据', 'src/images/test51.PNG,src/images/test52.PNG,src/images/test49.JPEG', '1'),
(25, '推荐', '王卫为什么不给马云面子？', '###', '2017-05-27', '猜你喜欢', 'src/images/test4.JPEG,src/images/test5.JPEG,src/images/test6.JPEG', '1'),
(58, '科技', '完胜人类后，AlphaGo 正式从棋坛 “退役”；支付宝刷脸支付半年后推出 | 雷锋早报', '###', '2017-05-28', '阿里巴巴', 'src/images/test54.JPEG,src/images/test55.JPEG,src/images/test56.JPEG', '1'),
(24, '推荐', '外媒：过不了多久 中国可能不得不让人民币贬值', '###', '2017-05-28', '猜你喜欢', 'src/images/test7.JPEG', '0'),
(26, '推荐', '政策：限购之后限售又会带来怎样的伤害 测试', '###', '2017-05-28', '猜你喜欢', 'src/images/test8.JPEG', '0'),
(27, '本地', '估值240亿乐视体育获“救命钱”，但贾跃亭不能再蒙眼狂奔了', '###', '2017-05-28', '头条', 'src/images/test9.JPEG,src/images/test10.JPEG,src/images/test11.JPEG', '1'),
(28, '推荐', '习近平:推动形成绿色发展方式和生活方式', '###', '2017-05-28', '热点', 'src/images/test12.jpg', '0'),
(29, '推荐', '韩志国私信叶檀：考虑你不懂股市 我忍了', '###', '2017-05-28', '猜你喜欢', '', '2'),
(30, '推荐', '阿里巴巴总裁金建杭：未来10年互联网将重新定义实体经济', '###', '2017-05-28', '猜你喜欢', '', '2'),
(31, '推荐', '余额宝个人限额100万降至25万，对你有什么影响吗？', '###', '2017-05-28', '凤凰网', 'src/images/test13.JPEG', '0'),
(32, '推荐', '柯洁父亲：柯洁实力纯属小宇宙爆发 还没女朋友', '###', '2017-05-28', '搜狐要闻', '', '2'),
(33, '推荐', '习近平对黄大年先进事迹指示引强烈反响', '###', '2017-05-27', '热点', 'src/images/test14.jpg', '0'),
(34, '推荐', '文玩拍卖连环骗卖家 有人卖婚房有人借高利贷', '###', '2017-05-27', '搜狐要闻', 'src/images/test15.JPEG', '0'),
(35, '推荐', '李彦宏数博会演讲有多火炎焱？单看会场外这三张图就知道了', '###', '2017-05-27', '搜狐要闻', 'src/images/test16.JPG', '0'),
(36, '推荐', '马化腾：未来的互联网 是在云端用人工智能方式处理大数据 ', '###', '2017-05-27', '猜你喜欢', 'src/images/test17.JPEG', '0'),
(37, '推荐', '柯洁与阿尔法狗最后一战 拒绝"安乐死"要拼死一搏', '###', '2017-05-27', '网易要闻', 'src/images/test18.JPEG,src/images/test19.JPEG,src/images/test20.JPEG', '1'),
(38, '推荐', '茅台与阿里巴巴在数博会上碰面了！这次又说了啥！', '###', '2017-05-27', '猜你喜欢', 'src/images/test21.JPEG,src/images/test22.JPEG,src/images/test23.JPEG', '1'),
(39, '推荐', '美股：Alphabet股价逼近1000美金 下一步呢？', '###', '2017-05-27', '猜你喜欢', 'src/images/test24.JPG,src/images/test25.JPG,src/images/test26.JPG', '1'),
(40, '推荐', '李彦宏：人工智能负面影响完全可控', '###', '2017-05-26', '猜你喜欢', 'src/images/test27.JPEG', '0'),
(41, '推荐', '滴滴打车新规收入解读 2017网约车新规市场分析', '###', '2017-05-26', '猜你喜欢', 'src/images/test28.JPEG,src/images/test29.JPEG,src/images/test30.JPEG', '1'),
(42, '推荐', '校园贷之后、培训贷又来袭 专家：须警惕向网络传销模式发展', '###', '2017-05-26', '搜狐要闻', '', '2'),
(43, '推荐', '西安现"搓衣板路"20米12个减速带 派出所:为安全', '###', '2017-05-26', '网易要闻', '', '2'),
(44, '推荐', '1.78亿变现后的同道大叔，不得不思考未来该何去何从，他说…', '###', '2017-05-26', '猜你喜欢', 'src/images/test31.JPEG', '0'),
(45, '推荐', '比特币翻倍狂涨，幕后推手竟是一家投资信托', '###', '2017-05-26', '猜你喜欢', 'src/images/test32.JPEG,src/images/test33.JPG,src/images/test34.JPG', '1'),
(46, '推荐', '人工智能打败柯洁后，我们应怎样拥抱它？', '###', '2017-05-25', '猜你喜欢', 'src/images/test35.JPEG,src/images/test36.JPEG,src/images/test37.JPEG', '1'),
(47, '推荐', '人大毕业生遇变故成低保户 称自己精神不正常', '###', '2017-05-25', '搜狐要闻', 'src/images/test38.JPEG', '0'),
(48, '推荐', '金融圈=名利场？网曝中金某首席欲潜规则女实习生', '###', '2017-05-25', '网易要闻', 'src/images/test39.JPEG,src/images/test40.JPEG,src/images/test41.JPEG', '1'),
(49, '推荐', 'vipabc更名tutorabc背后：野心与格局', '###', '2017-05-25', '随便啦', 'src/images/test42.JPEG,src/images/test43.JPEG,src/images/test44.JPEG', '1'),
(50, '推荐', '腾讯广告体系再调整，背后有一盘更大的棋 | 营销观察', '###', '2017-05-25', '猜你喜欢', '', '2'),
(51, '推荐', '人均超12万 去年IT业年平均工资首超金融居首位', '###', '2017-05-25', '猜你喜欢', '', '2'),
(52, '推荐', '特朗普又“炮轰”德国：对美出口太多汽车 德国人太坏', '###', '2017-05-25', '搜狐要闻', 'src/images/test45.JPEG', '0'),
(53, '推荐', '街电创始团队怒怼海翼声明不实，背后矛盾究竟是什么？', '###', '2017-05-25', '猜你喜欢', 'src/images/test46.JPEG', '0'),
(54, '推荐', '微鲸CEO李怀宇：从火烧连营的乐视身上我们“学”到了这些', '###', '2017-05-25', '猜你喜欢', '', '2'),
(55, '推荐', '之道出行事件曝新证 疑CEO指使“交保护费后即可刷单”', '###', '2017-05-25', '猜你喜欢', 'src/images/test47.JPEG,src/images/test48.JPEG,src/images/test49.JPEG', '1'),
(56, '本地', '北京多条高速发生事故 出京方向爆堵', '###', '2017-05-28', '北京', 'src/images/test50.JPEG', '0'),
(59, '财经', '宋清辉：只有完善交易制度方能有效舒缓减持压力', '###', '2017-05-28', '财经', 'src/images/test57.JPEG', '0'),
(60, '国际', '安倍与法国总统马克龙会谈 拟在多领域展开合作', '###', '2017-05-28', '安倍晋三', 'src/images/test58.JPEG', '0'),
(61, '创意', '展厅设计搭建中企业文化特色的重要性', '###', '2017-05-28', '创意', 'src/images/test59.JPEG', '0'),
(62, '本地', '北京空气质量最新预报：未来三天空气不错 偶有污染臭氧是“主角”', '###', '2017-05-29', '本地', 'src/images/test60.JPEG', '0'),
(63, '本地', '北京市属公园今天迎客有望超过40万 颐和园动物园游客最多', '###', '2017-05-29', '新华网', 'src/images/test61.JPEG', '0'),
(64, '本地', '北京天气最新预报：今起告别高温天儿 雨水来京“过节”', '###', '2017-05-29', '不知道', 'src/images/test62.JPEG', '0'),
(65, '本地', '北上广深房屋租赁价格下滑 租房还是买房？', '###', '2017-05-28', '还是不知道', '', '2'),
(66, '本地', '北京全聚德通州店举办“欢乐粽情 畅享端午”活动', '###', '2017-05-28', '北京晨报', 'src/images/test63.JPEG,src/images/test64.JPEG,src/images/test65.JPEG', '1'),
(67, '本地', '3天端午小长假最多能休8天 北京人最爱“拼假”出游', '###', '2017-05-28', '不知道', 'src/images/test66.JPEG', '0'),
(68, '本地', '北京市旅游条例8月起施行 非法一日游最高罚10万', '###', '2017-05-27', '北京晚报', 'src/images/test67.JPEG', '0'),
(69, '本地', '京多区入学严卡学区房 部分区为购房设截止日期', '###', '2017-05-26', '北京晚报', '', '2'),
(70, '本地', '限售正成为本轮楼市调控的最新特点', '###', '2017-05-25', '房改政策', '', '2'),
(71, '本地', '林斌：从1到100，小米之家的每一步都埋着一个“雷”', '###', '2017-05-25', '周光平', 'src/images/test68.JPEG', '0'),
(72, '本地', '陈吉宁任北京市副市长、代理市长', '###', '2017-05-25', '陈吉宁', '', '2');

-- --------------------------------------------------------

--
-- 表的结构 `subscribe`
--

CREATE TABLE `subscribe` (
  `id` int(11) NOT NULL,
  `listvalue` char(200) NOT NULL,
  `listindex` char(200) NOT NULL,
  `listsrc` varchar(200) NOT NULL,
  `listtime` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `subscribe`
--

INSERT INTO `subscribe` (`id`, `listvalue`, `listindex`, `listsrc`, `listtime`) VALUES
(1, '本地', '0', '###', '2017-05-27'),
(2, '互联网', '2', '###', '2017-05-26'),
(5, '社会', '6', '###', '2017-05-27'),
(6, '军事', '9', '###', '2017-05-27'),
(7, '娱乐', '8', '###', '2017-05-26'),
(8, '科技', '1', '###', '2017-05-27'),
(9, '搞笑', '11', '###', '2017-05-27'),
(10, '生活', '10', '###', '2017-05-27'),
(11, '女人', '12', '###', '2017-05-27'),
(12, '汽车', '13', '###', '2017-05-27'),
(13, '国际', '3', '###', '2017-05-27'),
(14, '国内', '15', '###', '2017-05-26'),
(15, '体育', '14', '###', '2017-05-26'),
(16, '财经', '4', '###', '2017-05-26'),
(17, '军情观察', '16', '###', '2017-05-27'),
(18, '创意', '5', '###', '2017-05-26'),
(19, '时尚', '17', '###', '2017-05-27'),
(20, '互联网+', '7', '###', '2017-05-27'),
(21, '苹果公司', '18', '###', '2017-05-27'),
(22, '教育', '19', '###', '2017-05-27'),
(23, '旅游', '21', '###', '2017-05-27'),
(24, '人文', '20', '###', '2017-05-27'),
(25, '房产', '22', '###', '2017-05-27'),
(26, '头条', '23', '###', '2017-05-27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carouselnews`
--
ALTER TABLE `carouselnews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotnews`
--
ALTER TABLE `hotnews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribe`
--
ALTER TABLE `subscribe`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `carouselnews`
--
ALTER TABLE `carouselnews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `hotnews`
--
ALTER TABLE `hotnews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- 使用表AUTO_INCREMENT `subscribe`
--
ALTER TABLE `subscribe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
