/**
 * Created by hzc on 2017-6-7.
 */
$(function(){
    //判断是不是在微信里访问
    function is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {//微信里
            //充余额
            $(".rechargeYe").click(function(){
                window.sessionStorage.rechargeBtn = "rechargeYe";
                //alert("充余额");
                if($(".balance").hasClass("borderRed")){
                    if($('.checkedWrap').hasClass("checkedBg")){
                        //console.log(111);
                        $.ajax({
                            url: "http://staging.jiebasan.com/deposit_trades",//创建余额充值交易单
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Authorization":window.localStorage.token
                            },
                            contentType: "application/json",
                            dataType: "json",
                            data:JSON.stringify({total_amount: parseFloat($(".borderRed").text().substring(1)),online_payment_method:'wechat',trade_type:'JSAPI'}),
                            success:function(res){
                                //console.log(res.body);
                                //console.log(res.body.prepay_data);
                                if(res.body.number == undefined){
                                    var oauthLogin = res.body.oauth_login;
                                    window.location.href = oauthLogin;
                                }else{
                                    var appId  = res.body.prepay_data.appId;
                                    var timeStamp  = res.body.prepay_data.timeStamp;
                                    var nonceStr = res.body.prepay_data.nonceStr;
                                    var package = res.body.prepay_data.package;
                                    var paySign = res.body.prepay_data.paySign;
                                    function onBridgeReady(){
                                        WeixinJSBridge.invoke(
                                            'getBrandWCPayRequest', {
                                                "appId":appId,     //公众号名称，由商户传入
                                                "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
                                                "nonceStr": nonceStr, //随机串
                                                "package":package,
                                                "signType":"MD5",         //微信签名方式：
                                                "paySign":paySign //微信签名
                                            },
                                            function(res){
                                                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                                    alert('get_brand_wcpay_request:ok');
                                                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                            }
                                        );
                                    }
                                    onBridgeReady();
                                    if (typeof WeixinJSBridge == "undefined"){
                                        if( document.addEventListener ){
                                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, true);
                                        }else if (document.attachEvent){
                                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                        }
                                    }else{
                                        onBridgeReady();
                                    }
                                    window.location.href = "rechargesuccess.html";
                                }
                                //alert(res);
                            },
                            error:function(res){
                                console.log(res);
                                //alert(res);
                            }
                        });
                    }
                    else{
                        $(".popup").show();
                        $(".popup").text("请选择支付方式");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
                    }
                }else{
                    $(".popup").show();
                    $(".popup").text("请选择充值金额");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
                }
            });
            //充押金
            $(".rechargeYj").click(function(){
                window.sessionStorage.rechargeBtn = "rechargeYj";
                //alert("充押金");
                $.ajax({
                    url: "http://staging.jiebasan.com/deposit_trades/pledge",//创建余额充值交易单
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Authorization":window.localStorage.token
                    },
                    contentType: "application/json",
                    dataType: "json",
                    data:JSON.stringify({online_payment_method:'wechat',trade_type:'JSAPI'}),
                    success:function(res){
                        //console.log(res);
                        //alert(res);
                        if(res.body.number == undefined){
                            var oauthLogin = res.body.oauth_login;
                            window.location.href = oauthLogin;
                        }else{
                            var appId  = res.body.prepay_data.appId;
                            var timeStamp  = res.body.prepay_data.timeStamp;
                            var nonceStr = res.body.prepay_data.nonceStr;
                            var package = res.body.prepay_data.package;
                            var paySign = res.body.prepay_data.paySign;
                            function onBridgeReady(){
                                WeixinJSBridge.invoke(
                                    'getBrandWCPayRequest', {
                                        "appId":appId,     //公众号名称，由商户传入
                                        "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
                                        "nonceStr": nonceStr, //随机串
                                        "package":package,
                                        "signType":"MD5",         //微信签名方式：
                                        "paySign":paySign //微信签名
                                    },
                                    function(res){
                                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                            alert('get_brand_wcpay_request:ok');
                                        }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                    }
                                );
                            }
                            if (typeof WeixinJSBridge == "undefined"){
                                if( document.addEventListener ){
                                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                }else if (document.attachEvent){
                                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                }
                            }else{
                                onBridgeReady();
                            }
                            window.location.href = "rechargesuccess.html";
                        }
                    },
                    error:function(res){
                        //console.log(res);
                        //alert(res);
                    }
                });
            });
        } else {//微信外..............................
            //充余额
            $(".rechargeYe").click(function(){
                //alert('充余额')
                if($(".balance").hasClass("borderRed")){
                    if($('.checkedWrap').hasClass("checkedBg")){
                        //console.log(111)
                        $.ajax({
                            url: "http://staging.jiebasan.com/deposit_trades",//创建余额充值交易单
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Authorization":window.localStorage.token
                            },
                            contentType: "application/json",
                            dataType: "json",
                            data:JSON.stringify({total_amount: parseFloat($(".borderRed").text().substring(1)),online_payment_method:'alipay',trade_type:'JSAPI'}),
                            success:function(res){
                                //console.log(res);
                                //console.log(res.body.prepay_data.order_string);
                                var order_string = res.body.prepay_data.order_string;
                                window.location.href =  order_string;
                            },
                            error:function(res){
                                console.log(res);
                            }
                        });
                    }
                    else{
                        $(".popup").show();
                        $(".popup").text("请选择支付方式");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
                    }
                }else{
                    $(".popup").show();
                    $(".popup").text("请选择充值金额");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
                }

            });
            //充押金
            $(".rechargeYj").click(function(){
                //alert("充押金");
                //console.log('充押金');
                if($('.checkedWrap').hasClass("checkedBg")) {
                    $.ajax({
                        url: "http://staging.jiebasan.com/deposit_trades/pledge",//创建余额充值交易单
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Authorization": window.localStorage.token
                        },
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify({online_payment_method: 'alipay', trade_type: 'JSAPI'}),
                        success: function (res) {
                            //console.log(res);
                            var orderString = res.body.prepay_data.order_string;
                            console.log(orderString);
                            window.location.href = orderString;
                        },
                        error: function (res) {
                            //console.log(res);
                        }
                    });
                }else{
                    $(".popup").show();
                    $(".popup").text("请选择支付方式");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
                }
            });
        }
    }
    is_weixn();
});
