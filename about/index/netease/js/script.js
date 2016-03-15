/* 
* @Author: Mertens
* @Date:   2015-11-20 19:18:43
* @Last Modified by:   Administrator
* @Last Modified time: 2016-03-06 15:13:39
*/

// 兼容版 children
  function getElemChildren(element){
    if(!element.children){
      var results = [];
      var nodeList = element.chilf-dnodes;
      for(var i=0;i<nodeList.length;i++){
        if(nodeList[i].nodeType ==1){
        results.push(nodeList[i]);
        }
      }
      return results;
    }
    else{
      return element.children;
    }
  }

// 兼容版 getElementsByClassName
  function getElementsByClassName(root, names){
    // if(root.getElementsByClassName(names)){
    //     return root.getElementsByClassName(names);
    // }
    // else{
        // 浏览器兼容
        var classNames = names.split(/\s+/),
            arr = [];
        var nodes = root.getElementsByTagName("*"); // 获取所有后代节点
        for(var i = 0,len = nodes.length ; i < len ; i++){
            // 遍历所有后代节点，检测它们是否包含传入的类名
            if( hasClass(nodes[i],classNames) ){
                arr.push(nodes[i]);
            }
        }
        return arr;
    // }
    function hasClass(node,classNames){
        for(var i = 0 ; i < classNames.length; i++){
            if(node.className.indexOf(classNames[i]) === -1){
                return false;
            }
        }
        return true;
    }
  }

// Ajax请求GET方法的封装
  function get(url,callback,options){
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
              if((xhr.status >=200 && xhr.status <300) || xhr.status ==304){
                  callback(xhr.responseText);
              }else{
                  alert("请求错误："+xhr.status+" "+xhr.statusText);
              }
          }
      }
      xhr.open("GET",url+"?"+serialize(options),true);
      xhr.send(null);
      function serialize(data){
          if(!data){
              return '';
          }
          var pairs = [];
          for(var name in data){
              if(!data.hasOwnProperty(name)){
                  continue;
              }
              if(typeof data[name] ==="function"){
                  continue;
              }
              var value = data[name].toString();
              name = encodeURIComponent(name);
              value = encodeURIComponent(value);
              pairs.push(name+'='+value);
          }
          return pairs.join('&');
      }
  }   

// 设置cookie
  function setCookie(name,value,expires,path,domain,secure){
  	var cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  	if(expires) 
  		cookie += "; expires=" + expires.toGMTString();
  	if(path)
  		cookie += "; path=" + path;
  	if(domain)
  		cookie += "; domain=" + domain;
  	if(secure)
  		cookie += "; secure=" + secure;
  	document.cookie = cookie;
  }

// 获取cookie
  function getCookie(){
    var cookie = {};
    var all = document.cookie;
    if(all === ""){
      return cookie;
    }
    var list = all.split(";");
    for(var i=0; i<list.length ; i++){
      var item = list[i];
      var p = item.indexOf("=");
      var name = item.substring(0,p);
      name = name.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"");
      name = decodeURIComponent(name);
      var value = item.substring(p+1);
      value = decodeURIComponent(value);
      cookie[name] = value;
    }
    return cookie;
  }

// 跨浏览器事件对象
  var EvenUtil = {
    // 跨浏览器添加事件处理程序 
      addHandler:function(element,type,handler){ 
        if(element.addEventListener){
          element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
          element.attachEvent("on"+type,handler);
        }else{
          element["on"+type] = null;
        }
      },
    // 跨浏览器移除事件处理程序
      removeHandler:function(element,type,handler){ 
        if(element.removeEventListener){
          element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
          element.detachEvent("on"+type,handler);
        }else{
          element["on"+type] = null;
        }
      }
  };

/*创建一个对象储存变量 */
  var m = {};

/*关闭顶部通知条*/
  m.headTop = document.getElementById("head-top");
  m.noRemind = m.headTop.getElementsByTagName("div")[1];
  // 点击关闭小黄条
    EvenUtil.addHandler(m.noRemind,"click",function(){
    	m.headTop.className = "f-dn";
    	setCookie("tip","hidden");
    });
  // 设置关闭后刷新不再显示
    EvenUtil.addHandler(window,"load",function(){
    	var cookies = getCookie();
    	var tip = cookies.tip;
    	if(tip == "hidden"){
    		m.headTop.className += "f-dn";
    	}
    });

/*关注按钮和登录框*/ 
  m.head = document.getElementById("head");
  // 取消关注区域
  m.cBlock = getElementsByClassName(m.head,"m-cancel")[0];
  // 关注区域
  m.followBlock = getElementsByClassName(m.head,"m-follow")[0];
  // 取消关注按钮
  m.cancelBtn = m.cBlock.getElementsByTagName("a")[0];
  // 关注按钮
  m.followBtn = getElementsByClassName(m.followBlock,"u-btn ")[0];

  (function(){
    m.loginForm = document.forms.loginForm;
    var loginBlock = getElementsByClassName(document,"m-login")[0];

    // 刷新页面显示登录状态
      EvenUtil.addHandler(window,"load",function(){
        var cookies = getCookie();
        var followSuc = cookies.followSuc;
        if(followSuc == "true"){
          m.followBlock.style.display = "none";
          m.cBlock.style.display = "inline-block";
        }
      });

    // 刷新页面显示登录状态
      EvenUtil.addHandler(window,"load",function(){
        var cookies = getCookie();
        var followSuc = cookies.followSuc;
        if(followSuc == "true"){
          m.followBlock.style.display = "none";
          m.cBlock.style.display = "inline-block";
        }
      });

    // 点击取消关注按钮
      EvenUtil.addHandler(m.cancelBtn,"click",function(){
        setCookie("followSuc","false",0);
        m.followBlock.style.display = "inline-block";
        m.cBlock.style.display = "none";
      });
    
    // 点击关注按钮
      EvenUtil.addHandler(m.followBtn,"click",function(){
        var cookies = getCookie();
        var loginSuc = cookies.loginSuc;
        // 判断登录的 cookie 是否已设置（ loginSuc）
        if(loginSuc != "true"){
          // 如果未设置登录 cookie，则弹出登录框
          loginBlock.style.display = "block"; 
        }
        else if(loginSuc == "true"){
           // 调用关注 API
          get("http://study.163.com/webDev/attention.htm",function(text){
            if(text == 1){
              // 设置关注成功的 cookie（ followSuc）
              setCookie("followSuc","true");
              // 登录后“关注”按钮变成不可点的“已关注”状态
              m.followBlock.style.display = "none";
              m.cBlock.style.display = "inline-block";
            }
          });
        }
      });

    // 输入用户名、密码
      var unLabel = getElementsByClassName(m.loginForm,"u-tip0")[0];
      var psdLabel = getElementsByClassName(m.loginForm,"u-tip1")[0];
      EvenUtil.addHandler(m.loginForm.userName,"focus",function(){
        unLabel.style.display = "none";
      });
      EvenUtil.addHandler(m.loginForm.password,"focus",function(){
        psdLabel.style.display = "none";
      });
      EvenUtil.addHandler(m.loginForm.userName,"blur",function(){
        if(m.loginForm.userName.value.length == 0) unLabel.style.display = "block";
      });
      EvenUtil.addHandler(m.loginForm.password,"blur",function(){
        if(m.loginForm.password.value.length == 0) psdLabel.style.display = "block";
      });

    // 点击按钮关闭登陆框
      var lgnCloseBtn = getElementsByClassName(loginBlock,"u-close-btn")[0];
      EvenUtil.addHandler(lgnCloseBtn,"click",function(){
        loginBlock.style.display = "none";
      });

    // 为登录表单的 submit事件 添加事件处理程序
      EvenUtil.addHandler(m.loginForm,"submit",function(event){
        var userName = m.loginForm.userName;
        var password = m.loginForm.password;
      // 使用md5加密数据
        var account = hex_md5(userName.value);
        var pswd = hex_md5(password.value);
      // 使用 Ajax 登录 
        get("http://study.163.com/webDev/login.htm",function(status){
            if (status==1){
            //成功后设置登录 cookie
              setCookie("loginSuc","true");
              loginBlock.style.display = "none";
              get("http://study.163.com/webDev/attention.htm",function(text){
                if(text == 1){
                // 设置关注成功的 cookie（ followSuc）
                  setCookie("followSuc","true");
                // 登录后“关注”按钮变成不可点的“已关注”状态
                  m.followBlock.style.display = "none";
                  m.cBlock.style.display = "inline-block";
                }
              });
            }
            else if (status==0){
              alert("输入的用户名或密码错误！");




            };
        },{userName:account,password:pswd});
        m.loginForm.reset();
      });
    
  })();

/*轮播图*/

  m.banFix = document.getElementById("ban-fix");
  m.banImg = m.banFix.getElementsByTagName("img")[0];
  m.bContainer = getElementsByClassName(m.banFix,"u-btn")[0];
  m.buttons = m.banFix.getElementsByTagName("span");
  m.banLink = m.banFix.getElementsByTagName("a")[0];

  //设置轮播图内容居中
    (function (){
        var setBanCenter = function(){
          var gap = 1652 - document.body.clientWidth;
          var mWidth = document.body.clientWidth;
          var buttonsLeft = (document.body.clientWidth - 52)/2;
          m.banFix.style.width = mWidth+"px";
          m.banImg.style.marginLeft = "-"+gap/2+"px";
          m.bContainer.style.left = buttonsLeft+"px";
        }
        EvenUtil.addHandler(window,"resize",setBanCenter);
        EvenUtil.addHandler(window,"load",setBanCenter);
    })();

  // 设置图片轮播
    (function(){
      var mSrc = ["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg"];
      var mHref = ["http://open.163.com/","http://study.163.com/","http://www.icourse163.org/"];
      var index = 1;

      // 淡出显示
        var show = function(){
          var stepLength = 1 / 100;
          var offset = 0;
          var step = function(){
            var tmpOffset = offset + stepLength;
            if (tmpOffset < 1) {
              m.banImg.style.opacity = 0 + tmpOffset;
              offset = tmpOffset;
            }else{
              m.banImg.style.opacity = 1;
              clearInterval(intervalID);
            }
          }
          m.banImg.style.opacity = 0;
          var intervalID = setInterval(step,5);
        }

      // 按钮切换
        for(var i = 0; i < m.buttons.length; i++){
          m.buttons[i].onclick = (function(j){
            return function(){
              m.banImg.src = mSrc[j];
              m.banLink.href = mHref[j];
              for(var i = 0; i < m.buttons.length; i++){
                m.buttons[i].className = "";
              }
              m.buttons[j].className = "active";
              index = j+1;
              if(index==3)index=0;
              show();
            }
          })(i);
        }

      // 定时切换
        var toSwitch = function(){
          m.banImg.src = mSrc[index];
          m.banLink.href = mHref[index];
          for(var i = 0; i < m.buttons.length; i++){
                m.buttons[i].className = "";
              }
          m.buttons[index].className = "active";
          show();
          index += 1;
          if(index == 3){
            index = 0;
          }
        }
        var intervalID = setInterval(toSwitch,5000);

      // 鼠标悬停，暂停切换  
        EvenUtil.addHandler(m.banFix,"mouseover",function(){
          clearInterval(intervalID);
        });

      // 鼠标离开，继续切换
        EvenUtil.addHandler(m.banFix,"mouseout",function(){
          intervalID = setInterval(toSwitch,5000)
        });
    })();

/*tab区域*/ 
  m.course = document.getElementById("course").getElementsByTagName("ul")[0];
  m.courseList = m.course.getElementsByTagName("li");
  EvenUtil.addHandler(window,"load",function(){
    get("http://study.163.com/webDev/couresByCategory.htm",appendItem,{pageNo:1,psize:20,type:10});
  })
  // 填充课程列表
    function appendItem(data){
      var dataCopy = JSON.parse(data);
      // 在重新填充课程列表的时候，清除之前的事件
      (function(){
        for(var i=0; i<m.courseList.length-1; i++){
          m.courseList[i].getElementsByTagName("img")[0].onmouseover = null;
        }
      })();

      // 设置每个课程的自定义属性和信息
      (function(){
        for(var i=0; i<m.courseList.length-1; i++){
          var item = m.courseList[i];
          var myData = dataCopy.list[i];
          item.getElementsByTagName("img")[0].setAttribute("src",myData["middlePhotoUrl"]);
          item.getElementsByTagName("a")[1].innerHTML = myData["name"];
          getElementsByClassName(item,"u-pder")[0].innerHTML = myData["provider"];
          item.getElementsByTagName("span")[0].innerHTML = myData["learnerCount"];
          var itemPrice = myData["price"];
          if(itemPrice == 0){
            getElementsByClassName(item,"u-price")[0].style.color = "#999";
            itemPrice = "免费";
          }else{
            getElementsByClassName(item,"u-price")[0].style.fontWeight = "bold";
            itemPrice = "￥"+itemPrice;
          }
          getElementsByClassName(item,"u-price")[0].innerHTML = itemPrice;
        }
      })();

      //  hover 到图片上，去添加出现详细信息的效果
      (function(){
        for(var i = 0; i<m.courseList.length-1; i++){
          m.courseList[i].getElementsByTagName("img")[0].onmouseover = (function(i){
              return function(){
                var myData = dataCopy.list[i],
                    itemDetail = m.courseList[m.courseList.length-1];
                itemDetail.getElementsByTagName("img")[0].setAttribute("src",myData["middlePhotoUrl"]);
                itemDetail.getElementsByTagName("h3")[0].innerHTML = myData["name"];
                itemDetail.getElementsByTagName("span")[0].innerHTML = myData["learnerCount"]+" 人在学";
                getElementsByClassName(itemDetail,"u-pder")[0].innerHTML = "发布者：" + myData["provider"];
                getElementsByClassName(itemDetail,"u-ctn")[0].innerHTML = "分类：" + (myData["categoryName"] == "null" ? myData["categoryName"] : "" );
                var description = myData["description"];"" 
                if(description.length > 60){
                  description = description.substring(0,60) + " ……";
                }
                itemDetail.getElementsByTagName("p")[0].innerHTML = description;
                var index = i,
                    row = Math.floor(index/4),
                    col = index%4;
                itemDetail.style.top = (-8+(row*249))+"px";
                itemDetail.style.left = (-10+(col*246))+"px";
                itemDetail.style.display = "block";
              }
            })(i);
        }
      })();
      
      // hover 到非图片区域，阴影加重
      (function(){
        for(var i = 0; i<m.courseList.length-1; i++){
          getElementsByClassName(m.courseList[i],"m-item")[0].onmouseover = function(){
            this.style.boxShadow = "1px 2px 1px 0 #dfdfdf";
          }
          getElementsByClassName(m.courseList[i],"m-item")[0].onmouseleave = function(){
            this.style.boxShadow = "";
          }
        }
      })();

      // 鼠标移开信息卡片，卡片消失
      m.courseList[m.courseList.length-1].onmouseleave = function(i){
        this.style.display = "none";
      }
    }

  // tab 切换课程列表
    m.m_content = document.getElementById("ct");
    m.tabs = getElementsByClassName(m.m_content,"m-tab")[0].getElementsByTagName("div");
    function tabSwitch(){
      var mPageNo = 1,
          mPsize = 20;
      if(this.id == "pro-design" ){
        var  mType = 10;
        m.tabs[1].className = "";
      }else if(this.id == "pro-language"){
        mType = 20;
        m.tabs[0].className = "";
      }
      this.className = "active";
      get("http://study.163.com/webDev/couresByCategory.htm",appendItem,{pageNo:mPageNo,psize:mPsize,type:mType});
    }
    m.tabs[0].onclick = tabSwitch;
    m.tabs[1].onclick = tabSwitch;

/*介绍视频*/
  m.playVideo = getElementsByClassName(m.m_content,"m-video")[0].getElementsByTagName("a")[0]; 
  m.playBlock = document.getElementById("palyBlock");
  m.p_closeBtn = m.playBlock.getElementsByTagName("span")[0];
  m.video = m.playBlock.getElementsByTagName("video")[0];
  EvenUtil.addHandler(m.playVideo,"click",function(){
    m.playBlock.style.display = "block";
    m.video.play();
  });
  EvenUtil.addHandler(m.p_closeBtn,"click",function(){
    m.playBlock.style.display = "none";
    m.video.pause();
  });

/*热门推荐*/
  m.hotList = document.getElementById("hot-list");
  m.hotListItems = m.hotList.getElementsByTagName("li");
  var appendHot = function(data){
    var dataCopy = JSON.parse(data);
    var itemList = dataCopy;
    for(var i = 0; i<m.hotListItems.length; i++){
      var item = m.hotListItems[i];
      item.getElementsByTagName("img")[0].setAttribute("src",itemList[i]["smallPhotoUrl"]);
      item.getElementsByTagName("a")[0].innerHTML = itemList[i]["name"];
      item.getElementsByTagName("span")[0].innerHTML = itemList[i]["learnerCount"];
    }
    var intervalID = setInterval(function(){
      m.hotListItems[0].getElementsByTagName("img")[0].setAttribute("src",itemList[i]["smallPhotoUrl"]);
      m.hotListItems[0].getElementsByTagName("a")[0].innerHTML = itemList[i]["name"];
      m.hotListItems[0].getElementsByTagName("span")[0].innerHTML = itemList[i]["learnerCount"];
      m.hotList.appendChild(m.hotListItems[0]);
      i++;
      if(i == 20) i = 0;
    },5000);
  };
  EvenUtil.addHandler(window,"load",function(){
    get("http://study.163.com/webDev/hotcouresByCategory.htm",appendHot);
  })

