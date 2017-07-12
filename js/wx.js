$(function(){
    //判断是不是在微信里访问
    function is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger"){
            var originalUrl = window.location.href;
            $.ajax({
                url: "http://staging.jiebasan.com/wechat/signature",
                method: "GET",
                headers: {
                    "Accept": "application/json"
                    //"Authorization":window.localStorage.token
                },
                contentType: "application/json",
                dataType: "json",
                data:{"original_url":originalUrl},
                success:function(res){
                    var timestamp = res.body.timestamp;
                    var nonceStr = res.body.nonceStr;
                    var sig_string = res.body.sig_string;
                    var appId = res.body.appId;
                    //console.log(res);
                    wx.config({
                        debug:false,
                        appId: appId,
                        timestamp:timestamp,
                        nonceStr: nonceStr,
                        signature:  sig_string,
                        jsApiList: [
                            'checkJsApi',
                            'scanQRCode',
                            'chooseImage',
                            'chooseWXPays'
                        ]
                    });
                    wx.error(function(res){
                        //alert("出错了" +　res.errMsg);
                    });
                },
                error:function(res){
                    console.log(res);
                }
            });
            $(".borrowIcon").click(function(){
                if(window.localStorage.token == undefined){
                    window.location.href = "login.html";
                }else if(window.sessionStorage.balance_pledge <=0){
                    window.location.href = "rechargeDeposit.html";
                }else if(window.sessionStorage.balance_normal <0){
                    window.location.href = "rechargeBalance.html";
                }else {
                    wx.checkJsApi({
                        jsApiList: [
                            'scanQRCode'
                        ],
                        success: function (res) {
                            //alert(JSON.stringify(res));
                        }
                    });
                    //调扫一扫功能
                    wx.ready(function(){
                        //alert("1111");
                        wx.scanQRCode({
                            needResult: 1,
                            scanType: ["qrCode"],
                            success: function (result) {
                                //alert("result.resultStr:"+result.resultStr);
                                var urlStr = JSON.stringify(result.resultStr);
                                var deviceId = urlStr.split("=")[1];//获取伞桩id
                                //alert("urlStr:"+urlStr);
                                //alert(deviceId);
                                $.ajax({
                                    url: "http://staging.jiebasan.com/borrowing_requests",
                                    method: "POST",
                                    headers: {
                                        "Accept": "application/json",
                                        "Authorization":window.localStorage.token
                                    },
                                    contentType: "application/json",
                                    dataType: "json",
                                    data:JSON.stringify({"dock_device_id": deviceId}),
                                    success:function(res){
                                        //alert(121212);
                                        //console.log(res);
                                        //alert("res:"+res);
                                        //alert(res.body.id);
                                        window.sessionStorage.id = res.body.id;
                                        window.location.href = "jiesan.html";
                                    },
                                    error:function(res){
                                        console.log(res);
                                        //var message = res.responseText.replace(/[^\u4e00-\u9fa5]/gi,"");
                                        $(".popup").show();
                                        $(".popup").text(res.meta.message);
                                        setTimeout('$(".popup").hide(),$(".popup").text(""),window.history.go(-1)',2000);
                                        //alert(res);
                                    }
                                });
                            }
                        })
                    });
                }
            });
        } else {
            //获取URL后的伞桩id
            var url = window.location.search;
            var deviceId = url.split("=")[1];
            //点击借伞
            $(".borrowBtn").click(function(){
                if(window.localStorage.token == undefined){
                    window.location.href = "login.html";
                }else if(window.sessionStorage.balance_pledge <=0){
                    window.location.href = "rechargeDeposit.html";
                }else if(window.sessionStorage.balance_normal <0){
                    window.location.href = "rechargeBalance.html";
                }else {
                    $.ajax({
                        url: "http://staging.jiebasan.com/borrowing_requests",//开锁借伞
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Authorization":window.localStorage.token
                        },
                        contentType: "application/json",
                        dataType: "json",
                        data:JSON.stringify({"dock_device_id": deviceId}),
                        success:function(res){
                            console.log(res);
                            console.log(res.body.id);
                            window.sessionStorage.id = res.body.id;
                            window.location.href ="jiesan.html";
                        },
                        error:function(res){
                            console.log(res);
                            //console.log(res.responseText);

                            //var message = res.responseText.replace(/[^\u4e00-\u9fa5]/gi,"");
                            $(".popup").show();
                            $(".popup").text(res.meta.message);
                            setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                        }
                    });
                }
            });
        }
    }
    is_weixn();

});

