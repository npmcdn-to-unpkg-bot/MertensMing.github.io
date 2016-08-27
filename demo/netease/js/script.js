/*
 * @Author: Administrator
 * @Date:   2016-02-28 10:43:35
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-03-30 14:59:09
 */

 /*
 * 关于本人
 * 姓名：刘志明
 * 肇庆学院 非计算机专业 本科大三在读 
 */

'use strict';

/*返回一个命名空间对象封装一些经常用到的方法*/
var NetEase = (function() {

	/*添加 class 到元素上或者移除元素上的 class*/
	// 判断 class 是否存在一个元素上
	var _hasClass = function(element, className) {
		if (!element) return;
		var pattern = new RegExp('(\\s|^)' + className + '(\\s|$)');
		return pattern.test(element.className);
	};
	// 给一个元素添加 class
	var addClass = function(element, className) {
		if (!element) return;
		if (!_hasClass(element, className)) {
			element.className += ' ' + className;
		}
	};
	// 移除元素上的 class
	var removeClass = function(element, className) {
		if (_hasClass(element, className)) {
			var pattern = new RegExp('(\\s|^)' + className + '(\\s|$)', 'g');
			element.className = element.className.replace(pattern, '');
		}
	};

	/*跨浏览器的事件对象*/
	var EvenUtil = (function() {
		// 跨浏览器添加事件处理程序 
		var addHandler = function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		};
		// 跨浏览器移除事件处理程序
		var removeHandler = function(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		};
		// 取得事件对象
		var getEvent = function(event) {
			return event || window.event;
		};
		// 取得事件目标
		var getTarget = function(event) {
			return event.target || event.srcElement;
		};
		return {
			addHandler: addHandler,
			removeHandler: removeHandler,
			getEvent: getEvent,
			getTarget: getTarget
		}
	})();

	/*操作 cookie*/
	var cookie = (function() {
		// 设置 cookie
		var set = function(name, value, expires, path, domain, secure) {
			var cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
			if (expires) cookie += "; expires=" + expires.toGMTString();
			if (path) cookie += "; path=" + path;
			if (domain) cookie += "; domain=" + domain;
			if (secure) cookie += "; secure=" + secure;
			document.cookie = cookie;
		};
		// 获取 cookie
		var get = function() {
			var cookie = {};
			var all = document.cookie;
			if (all === "") {
				return cookie;
			}
			var list = all.split(";");
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				var p = item.indexOf("=");
				var name = item.substring(0, p);
				name = name.replace(/^(\s|\u00A0)+|(\s|\u00A0)+NetEase/g, "");
				name = decodeURIComponent(name);
				var value = item.substring(p + 1);
				value = decodeURIComponent(value);
				cookie[name] = value;
			}
			return cookie;
		};
		return {
			get: get,
			set: set
		};
	})();

	/*ajax方法封装*/
	var ajax = (function() {
		// get 方法
		var get = function(url, callback, options) {
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
						callback(xhr.responseText);
					}
				}
			}
			xhr.open("get", url + "?" + serialize(options), true);
			xhr.send();

			function serialize(data) {
				if (!data) {
					return '';
				}
				var pairs = [];
				for (var name in data) {
					if (!data.hasOwnProperty(name)) {
						continue;
					}
					if (typeof data[name] === "function") {
						continue;
					}
					var value = data[name].toString();
					name = encodeURIComponent(name);
					value = encodeURIComponent(value);
					pairs.push(name + '=' + value);
				}
				return pairs.join('&');
			}
		};
		return {
			get: get
		};
	})();

	// 循环遍历数组和 NodeList
	var each = function(arr, callback) {
		for (var i = 0, len = arr.length; i < len; i++) {
			callback(arr[i], i, arr);
		}
	};

	return {
		addClass: addClass,
		removeClass: removeClass,
		EvenUtil: EvenUtil,
		cookie: cookie,
		ajax: ajax,
		each: each
	}
})();

/*
* 顶部通知条
* 通过设置类名 f-dn 隐藏元素
* 判断 cookie 是否设置决定是否隐藏元素
*/
(function() {
	var headBar = document.querySelector('#head_bar'),
		noPrompt = document.querySelector('#no_prompt');
	// 点击关闭顶部提示
	NetEase.EvenUtil.addHandler(noPrompt, 'click', function() {
		// 隐藏
		NetEase.addClass(headBar, 'f-dn');
		// 设置 cookie
		NetEase.cookie.set('tip', 'hidden');
	});
	// 关闭后刷新不再显示
	NetEase.EvenUtil.addHandler(window, 'load', function() {
		var cookies = NetEase.cookie.get();
		// 如果已经设置过了 cookie，就隐藏
		if (cookies.tip === 'hidden') {
			NetEase.addClass(headBar, 'f-dn');
		}
	})
})();
/*end 顶部通知条*/

/*关注区域&登录*/
(function() {
	// 关注按钮
	var followBtn = document.querySelector('#follow'),
		// 登录框
		loginForm = document.querySelector('#login_block'),
		// 关注成功的区域
		unfollowBlock = document.querySelector('#unfollow_block'),
		// 登录失败提示
		loginTip = document.querySelector('#login_tip'),
		// 登录框关闭按钮
		closeBtn = document.querySelector('#login_block .js-close');

	// 关注
	(function() {
		// 调用关注 API
		var follow = function() {
			var followSuc = NetEase.cookie.get().followSuc;
			// 如果已经关注，不作为
			if (followSuc === 'true') return;
			var url = 'http://study.163.com/webDev/attention.htm';
			// 如果没关注，调用关注 API
			NetEase.ajax.get(url, function(responseText) {
				if (responseText == 1) {
					NetEase.cookie.set('followSuc', 'true');
					// 隐藏关注按钮
					NetEase.addClass(followBtn, 'f-dn');
					// 显示已关注区域
					unfollowBlock.style.display = 'block';
				}
			});
		};

		// 绑定点击关注按钮的事件
		NetEase.EvenUtil.addHandler(followBtn, 'click', function() {
			var cookies = NetEase.cookie.get(),
				loginSuc = cookies.loginSuc;
			// 如果没有登录
			if (loginSuc !== 'true') {
				// 显示登录框
				NetEase.removeClass(loginForm, 'f-dn');
			}
			// 如果已经登录,直接调用关注 API
			else if (loginSuc === 'true') {
				follow();
			};
		});

		// 刷新页面展示已关注状态
		NetEase.EvenUtil.addHandler(window, 'load', function() {
			var followSuc = NetEase.cookie.get().followSuc;
			if (followSuc === 'true') {
				NetEase.addClass(followBtn, 'f-dn');
				unfollowBlock.style.display = 'block';
			}
		});
	})();

	// 登录框
	(function() {
		// 登录
		var _login = function(url) {
			// 使用 md5 加密数据
			var account = hex_md5(loginForm.account.value),
				password = hex_md5(loginForm.password.value);
			var param = {
				'userName': account,
				'password': password
			};
			var url = 'http://study.163.com/webDev/login.htm';
			// 调用登录 API
			NetEase.ajax.get(url, function(responseText) {
				// 登录成功
				if (responseText == 1) {
					//成功后设置登录 cookie
					NetEase.cookie.set('loginSuc', 'true');
					// 隐藏登录框
					NetEase.addClass(loginForm, 'f-dn');
					// 调用关注 API
					follow();
				} else if (responseText == 0) {
					// 如果登录失败，显示提示信息
					NetEase.removeClass(loginTip, 'f-dn');
					// 重置表单
					loginForm.reset();
				};
			}, param);
		};
		// 隐藏提示
		var _hidetip = function() {
			NetEase.addClass(loginTip, 'f-dn');
		};
		// 隐藏登录框
		var _hideLogin = function() {
				NetEase.addClass(loginForm, 'f-dn');
			}
			// 提交表单时登录
		NetEase.EvenUtil.addHandler(loginForm, 'submit', _login);
		// 输入框获得焦点时隐藏提示
		NetEase.EvenUtil.addHandler(loginForm.account, 'focus', _hidetip);
		NetEase.EvenUtil.addHandler(loginForm.password, 'focus', _hidetip);

		// 点击关闭按钮，隐藏登录框
		NetEase.EvenUtil.addHandler(closeBtn, 'click', _hideLogin);
	})();
})();
/*end 关注区域&登录*/

/*轮播图*/
(function() {
	var slide = document.querySelector('.m-slide'),
		// 图片元素集合
		imageLists = document.querySelectorAll('.m-slide li'),
		// 指示器元素集合
		pointerLists = document.querySelectorAll('.m-slide i');

	// 动态修改轮播图的高度，适应轮播图的自适应宽高
	(function() {
		var setHeight = function() {
			var height = imageLists[0].offsetHeight + 'px';
			slide.style.height = height;
		}
		NetEase.EvenUtil.addHandler(window, 'load', setHeight);
		NetEase.EvenUtil.addHandler(window, 'resize', setHeight);
	})();

	// 将要展示的图片
	var next = 0;
	// 切换开始动画之前，展示的那张图片
	var crt = 0;

	// 图片和指示器的切换方法封装
	var toggleSwitch = function(list, next, className) {

		// 判断浏览器是否支持 animate 属性
		var flag = (function(temp) {
			if (temp.style['animation'] !== undefined) {
				return true;
			}
			return false;
		})(document.createElement('div'));

		/*
		* 轮播图显示动画
		* 如果浏览器支持 animate 属性，则通过添加类名 z-crt 实现 css 动画
		* 否则用 js 实现动画， js 动画支持 IE9+，不支持 IE8
		*/
		var show = function(element) {
			NetEase.addClass(element, className);
			if (!flag) {
				fadeIn(element, 0.02);
			}

			// js 动画
			function fadeIn(element, stepLen) {
				var offset = 0;
				element.style.opacity = 0;
				var step = function() {
					var temp = offset + stepLen;
					if (temp < 1) {
						element.style.opacity = temp;
						offset = temp;
					} else {
						element.style.opacity = 1;
						clearInterval(intervalID);
					}
				}
				var intervalID = setInterval(step, 10);
			}
		};
		// 清除所有元素类名重置状态
		var init = function(element) {
			NetEase.removeClass(element, className);
			NetEase.removeClass(element, 'crt');
		};

		/*
		* 重置所有元素的状态
		* 先设置当前图片的 z-index 为 19
		* 再设置将要展示的图片的 z-index 为 20
		* 这样淡入动画就不会太突兀
		* 动画结束后重置 crt
		*/
		NetEase.each(list, init);
		NetEase.addClass(list[crt], 'crt');
		show(list[next]);
		crt = next;
	};

	// 定时切换
	(function() {
		var len = imageLists.length;
		// 定时切换方法
		var timingSwitch = function(time) {
			var intervalID = setInterval(function() {
				// 定时切换：下一张 = 当前 + 1
				next = crt + 1;
				// 如果下一张的 index 等于图片总数，下一张的 index = 0
				if (next === len) next = 0;
				toggleSwitch(imageLists, next, 'z-crt');
				toggleSwitch(pointerLists, next, 'z-crt');
			}, time);
			return intervalID;
		};
		// 开启定时切换
		var intervalID = timingSwitch(5000);

		// 鼠标悬停在焦点图上停止定时切换
		NetEase.EvenUtil.addHandler(slide, 'mouseover', function() {
			clearInterval(intervalID);
		});

		// 鼠标移开焦点图开启定时切换
		NetEase.EvenUtil.addHandler(slide, 'mouseout', function() {
			intervalID = timingSwitch(5000);
		});
	})();

	// 点击指示器切换
	(function() {
		// 给每个指示器设置一个 index
		NetEase.each(pointerLists, function(item, index) {
			item.index = index;
		});
		var indicatorSwitch = function(event) {
			event = NetEase.EvenUtil.getEvent(event);
			var target = NetEase.EvenUtil.getTarget(event);
			// 下一张的 index = 被点击指示器的 index
			next = target.index;
			// 如果点击到指示器的父容器的其他地方，而不是指示器，不做切换
			if (typeof next !== 'number') return;
			toggleSwitch(imageLists, next, 'z-crt');
			toggleSwitch(pointerLists, next, 'z-crt');
		};
		var pointer = document.querySelector('.u-pointer');

		// 把点击事件委托给指示器的父元素
		NetEase.EvenUtil.addHandler(pointer, 'click', indicatorSwitch);
	})();
})();
/*end 轮播图*/

/*办公区域水平滚动*/
(function() {
	var boxWrap = document.querySelector('.slide-box-wrap');
	// copy 一份数据水平滚动用
	boxWrap.innerHTML += boxWrap.innerHTML;
	var slideBox = document.querySelector('.slide-box');

	// 传入要滚动的元素、滚动步长、临界点
	function scroll(root, stepLen, criticalPoint) {
		var offset = 0;
		var step = function() {
			var tempOffset = offset + stepLen;
			if (tempOffset < criticalPoint) {
				root.style.left = '-' + tempOffset + 'px';
				offset = tempOffset;
			} else {
				root.style.left = 0;
				offset = 0;
			}
		}
		var intervalID = setInterval(step, 20);
		NetEase.EvenUtil.addHandler(root, 'mouseover', function() {
			clearInterval(intervalID);
		})
		NetEase.EvenUtil.addHandler(root, 'mouseleave', function() {
			intervalID = setInterval(step, 20);
		})
	}
	NetEase.EvenUtil.addHandler(window, 'load', function() {
		scroll(boxWrap, 1, slideBox.offsetWidth);
	});
})();;
/* end 办公区域水平滚动*

/*tab选项卡*/
(function(url, psize) {

	// 获取数据并且缓存、填充数据
	function getData(root, url, page, psize, type) {

		// 设置请求参数
		var param = {
			pageNo: page,
			psize: psize,
			type: type
		};
		// 调用接口
		NetEase.ajax.get(url, addData, param);

		// 缓存数据、填充信息列表
		function addData(data) {
			data = JSON.parse(data);
			// 数据列表
			var dataList = data.list;
			// root 是元素集合
			// 遍历集合内的元素
			NetEase.each(root, function(item, index) {
				// 在元素内添加一个名为参数 type 的属性，用来储存这个 type 的数据
				if (!item[type]) {
					item[type] = {};
				}
				item[type][page] = dataList[index];
			});

			// 缓存完数据之后，填充数据到元素上
			fillData(root, type, page);
		};
	}

	// 填充数据到元素上
	function fillData(root, type, page) {
		// 处理价格，如果是0，就标为免费，并将样式换成灰色
		var handlerPrice = function(price, item) {
			if (price === 0) {
				NetEase.addClass(item, 'free');
				return '免费';
			} else {
				return '￥' + price;
			}
		};
		// 循环遍历元素列表，填充数据
		NetEase.each(root, function(item, index) {
			var tempObj = item[type][page];
			NetEase.each(item.querySelectorAll('img'), function(item) {
				item.setAttribute('src', tempObj['middlePhotoUrl']);
			});
			NetEase.each(item.querySelectorAll('.u-name'), function(item) {
				item.innerHTML = tempObj['name'];
			});
			NetEase.each(item.querySelectorAll('.u-provider'), function(item) {
				if (item.innerHTML.substring(0, 4) === '发布者：') {
					item.innerHTML = '发布者：' + tempObj['provider'];
				} else {
					item.innerHTML = tempObj['provider'];
				}
			});
			NetEase.each(item.querySelectorAll('.u-count'), function(item) {
				item.innerHTML = tempObj['learnerCount'];
			});
			NetEase.each(item.querySelectorAll('.u-price'), function(item) {
				var price = handlerPrice(tempObj['price'], item);
				item.innerHTML = price;
			});
			NetEase.each(item.querySelectorAll('.u-categorty'), function(item) {
				item.innerHTML = tempObj['categoryName'];
			});
			NetEase.each(item.querySelectorAll('.u-description'), function(item) {
				item.innerHTML = '<p>' + tempObj['description'] + '</p>';
			});
		});
	}

	// 选择选项卡
	(function() {
		var itemList = document.querySelectorAll('.m-commodities li');

		var tabNavList = document.querySelectorAll('#tab_nav li');

		// 选择某个选项卡
		function tabSwitch(root, url, page, psize, type) {
			var tempItem = root[0];
			if (!tempItem[type]) {
				getData(root, url, page, psize, type);
			} else if (!tempItem[type][page]) {
				getData(root, url, page, psize, type);
			} else {
				fillData(root, type, page);
			}
		};

		// 给 产品设计 / 编程语言 区域添加点击事件，点击选择某个选项卡
		NetEase.each(tabNavList, function(item, index) {
			// 将 index 储存在元素里面
			item.index = index;
			// 根据 index 的值设置参数，调用选择选项卡的函数
			NetEase.EvenUtil.addHandler(item, 'click', function() {
				if (item.index === 0) {
					tabSwitch(itemList, url, 1, psize, 10);
				} else if (item.index === 1) {
					tabSwitch(itemList, url, 1, psize, 20);
				}
				NetEase.each(tabNavList, function(item) {
					NetEase.removeClass(item, 'z-crt');
				});
				NetEase.addClass(item, 'z-crt');
			})
		});

		// 默认填充第一个选项卡，第一页
		NetEase.EvenUtil.addHandler(window, 'load', function() {
			tabSwitch(itemList, url, 1, psize, 10);
		});
	})();
	// 因为 url 和 psize 相对固定，在此传入
})('http://study.163.com/webDev/couresByCategory.htm', 20);
/*end 选项卡*/

/*热门推荐*/
(function(url) {

	var hotItemsWrap = document.querySelector('.m-hot .hot-items-wrap');

	// 填充热门列表，为了做滚动效果， copy 了一份数据列表
	(function() {
		// 复制一遍数据
		hotItemsWrap.innerHTML += hotItemsWrap.innerHTML;
		// 填充两个 ul 的数据
		(function(){
			NetEase.ajax.get(url, function(data){
				data = JSON.parse(data);
				NetEase.each(hotItemsWrap.querySelectorAll('ul'), function(item){
					var itemList = item.querySelectorAll('.hot-item');
					NetEase.each(itemList, function(item, index){
						var tempObj = data[index];
						item.querySelector('img').setAttribute('src', tempObj['smallPhotoUrl']);
						item.querySelector('.u-name').innerHTML = tempObj['name'];
						item.querySelector('.u-count').innerHTML = tempObj['learnerCount'];
					});
				});
			});
		})();
	})();

	// 设置自动滚动
	(function() {
		// 当前滚动了多长距离
		var primary = 0;
		var timmingScroll = function(root, stepLen, scrollHeight, criticalPoint) {

			// 滚动
			var scroll = function(root, stepLen, scrollHeight, primary) {
				// 储存当前已经滚动了多长
				var offset = primary;
				var scrollLen = offset + scrollHeight;
				var step = function() {
					// 将要滚动的距离 = 当前 + 步长
					var tempOffset = offset + stepLen;
					if (tempOffset < scrollLen) {
						root.scrollTop = tempOffset;
						offset = tempOffset;
					} else if (tempOffset > scrollLen) {
						root.scrollTop = scrollLen;
						clearInterval(intervalID);
					}
				}
				var intervalID = setInterval(step, 5);
			};

			// 将要滚动的距离是当前距离加上 scrollHeight
			var temp = primary + scrollHeight;

			// 如果将要滚动的距离小于临界值
			if (temp <= criticalPoint) {
				// 滚动
				scroll(root, stepLen, scrollHeight, primary);

				// 重新定义当前已经滚动的值
				primary = temp;
			} else if (temp > criticalPoint) {
				root.scrollTop = 0;
				primary = 0;
			}
		};
		setInterval(function() {
			timmingScroll(hotItemsWrap, 1, 75, 1500);
		}, 5000);
	})();
})('http://study.163.com/webDev/hotcouresByCategory.htm');
/*end 热门推荐*/

/*播放视频*/
(function() {
	var play = document.querySelector('.m-video .u-play');
	var videoWrap = document.querySelector('.video-wrap');
	var video = videoWrap.querySelector('video');
	var close = videoWrap.querySelector('.close');

	NetEase.EvenUtil.addHandler(play, 'click', function() {
		NetEase.removeClass(videoWrap, 'f-dn');
		if (video.play) {
			video.play();
		}
	});

	NetEase.EvenUtil.addHandler(close, 'click', function() {
		NetEase.addClass(videoWrap, 'f-dn');
		if (video.pause) {
			video.pause();
		}
	});
})();
/*end 播放视频*/