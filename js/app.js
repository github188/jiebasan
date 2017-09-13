$(function(){
    FastClick.attach(document.body);
    $("#feedbackContent").focus();
    //判断是不是在微信里访问
    function is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            $(".shareWrapper").css("display","block");
            $(".zfBao").css("display","none");
            $(".zfBaoPay").css("display","none");
        } else {
            $(".shareWrapper").css("display","none");
            $(".wXin").css("display","none");
            $(".wXinPay").css("display","none");
        }
    }
    is_weixn();
    //$(".checkedWrap").click(function(){
    //    $(this).toggleClass("checkedBg");
    //});
    //$("input").focus();
    $("#phone").focus(function(){
        $("#phone").css("border","none");
    });
    //$(".login-wrapper").height($(document).height());
    //$(".Popup-bg").height($(window).height());
    $(".quit").click(function(){
        console.log(11);
        $(".Popup-bg").fadeIn();
        $(".quitPopup").fadeIn();
    });
    $(".tab-bar").find("span").click(function(){
        $(this).addClass("bottom-color").siblings().removeClass();
        $(".wrap-center").find(".tab").css("display","none");
        $(".wrap-center").find(".tab").eq($(this).index()).css("display","block");
    });
    $(".tab-bar").find("span").click(function(){
        $(this).addClass("bottom-color").siblings().removeClass();
        $(".wrap-center").find(".tabal").css("display","none");
        $(".wrap-center").find(".tabal").eq($(this).index()).css("display","block");
    });
    $(".quit").click(function(){
        console.log(11);
        $(".Popup-bg").fadeIn(200);
        $(".quitPopup").fadeIn(200);
    });
    $(".cancel").click(function(){
        console.log(11);
        $(".Popup-bg").fadeOut(200);
        $(".quitPopup").fadeOut(200);
        $(".fuyue").fadeOut(200);
    });
    $(".cancel-phone").click(function(){
        $(".call-service").css("display","none");
    });
    //$("#customPhone").click(function(){
    //    $(".call-service").css("display","block");
    //    $(".doc-oc-demo1").removeClass("am-active");
    //});
    //选择充值余额的金额
    $(".choose_wrap .balance").click(function(){
       $(this).toggleClass("borderRed").siblings().removeClass("borderRed");
        //console.log($(this).text().replace(/[^0-9]/ig,""));
    });
    $(".rechargeOther").click(function(){
        $(".others_pop").css("display","block");
        $(".Popup-bg").css("display","block");
    });
    $(".Popup-bg").click(function(){
        $(".others_pop").css("display","none");
        //$(".Popup-bg").css("display","none");
        $(".rechargeOther").addClass("borderRed");
        $(".dingDaning").css("display","none");
        //$(".tiXianWrap").css("display","none");
        //$(".others_pop").css("top","6.933333rem");
    });
    $(".closeIcon").click(function(){
        $(".others_pop").css("display","none");
        $(".Popup-bg").css("display","none");
        //$(".others_pop").css("top","6.933333rem");
    });
    //$(".others_num").focus(function(){
    //    var reg = /^0[0-9]{6}/;
    //    match(reg,str);
    //    return false
    //});
    $(".complete").click(function(){
        $(".rechargeOther").text("充"+$(".others_num").val()+"元");
        $(".others_pop").css("display","none");
        $(".Popup-bg").css("display","none");
        $(".rechargeOther").addClass("borderRed");
        if($(".others_num").val() === ""){
            $(".rechargeOther").text("其他");
        }
        //console.log($(".borderRed").text().replace(/[^0-9]/ig,""));
    });
    //故障上报
    $(".fault-type span").click(function(){
        $(this).addClass("faultActive").siblings().removeClass("faultActive");
        $(this).parents().siblings().find("span").removeClass("faultActive");
    });
    $(".others_num").focus(function(){
       $(".others_pop").css("top","4.933333rem");
    });
    $(".others_num").blur(function(){
        $(".others_pop").css("top","4.933333rem");
    });
    //登录页------------------------------------------------------------------------------------------------------------
    $(".getCode").click(function(){//获取验证码
        //console.log("验证码");
        if($("#phone").val()==""){
            $(".popup").show();
            $(".popup").text("请输入手机号");
            setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
            return;
        }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test($("#phone").val()))){//判断是否为11位中国手机号码
            $(".popup").show();
            $(".popup").text("号码格式错误");
            setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
            //$(".quitPopup").css("display","block");
        }else{
            function countDown(){
                var timer=setTimeout(function(){//按验证按钮后60秒按钮禁用
                    clearInterval(timer2);
                    $(".getCode").val("重新获取").css({
                        //"border":"1px solid #DDD",
                        //"background":"#fff",
                        "color":"#ff6d5b"
                    }).removeAttr("disabled");
                },60000);
                var i = 60;
                $(".getCode").val(i+'s').css({
                    //"border":"1px solid #DDD",
                    //"background":"#e1e1e1",
                    "color":"#ff6d5b"
                }).attr("disabled","true");
                var timer2=setInterval(function(){
                    i--;
                    $(".getCode").val(i+'s');
                },1000);
            }
            $.ajax({
                url: "https://www.jiebasan.com/phone_verifications",
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({"phone":$("#phone").val(),"type": "sign_up"}),
                success:function (res){
                    console.log(res);
                    if(res.meta.code == "0"){
                        countDown();
                        $(".popup").show();
                        $(".popup").text("验证码已发送");
                        setTimeout('$(".popup").hide(),$(".popup").text("")',1000);
                    }else {

                    }
                },
                error:function(res){
                    $(".popup").show().text(res.meta.message);
                    setTimeout('$(".popup").text("").hide()',2000);
                }
            });
        }
    });
    //点击登录
    $("#begin-btn").click(function(){
        if($("#phone").val()==""){
            $(".popup").show();
            $(".popup").text("请输入手机号");
            setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
            return;
        }else if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test($("#phone").val()))){//判断是否为11位中国手机号码
            $(".popup").show();
            $(".popup").text("号码格式错误");
            setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
            //$(".quitPopup").css("display","block");
        }
        else if($("#identifying").val()==""){
            $(".popup").show();
            $(".popup").text("请输入验证码");
            setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
            return;
        }if($(".checkedLogin").hasClass("checkedBg")){
            $.ajax({
                url: "https://www.jiebasan.com/sessions/phone",
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "token":window.localStorage.token
                },
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({"phone": $.trim($("#phone").val()), "code": $.trim($("#identifying").val())}),
                success:function(res){
                    console.log(res);
                    if(res.meta.message == "OK"){
                        $(".popup").hide();
                    }else{
                        $(".popup").show().text(res.meta.message);
                        setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
                    }
                    var phone = res.body.phone.substr(4,11);
                    window.localStorage.phone =phone;//手机号
                    window.localStorage.id = res.body.id;//用户id
                    window.localStorage.name = res.body.name;//用户名
                    window.localStorage.avatar = res.body.avatar;//头像
                    window.localStorage.token = res.body.jwt_token;
                    window.localStorage.access_token = res.body.access_token;
                    window.localStorage.invitation_code = res.body.invitation_code;//邀请码
                    window.sessionStorage.balance_normal = res.body.balance_normal;
                    window.sessionStorage.balance_pledge = res.body.balance_pledge;
                    if(window.sessionStorage.btnMark == "transition"){
                        window.location.href =  'https://www.jiebasan.com/webapp/transition?device_id='+ window.sessionStorage.deviceId;
                    }else{
                        location.href = "index.html";
                    }
                },
                error:function(res){
                    console.log(res);
                    $(".popup").show();
                    $(".popup").text("请求次数达到上限");
                    setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
                }
            });
        }else{
            $(".popup").show();
            $(".popup").text("请同意用户注册协议");
            setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
        }
    });
    function userInfo(){
        $(".register-wrap").css("display","none");
        $(".user-info").css("display","block");
        $(".revise-card").css("display","block");
    }
    $("#useGuide").click(function(){
        window.location.href = "useguide.html";
    });
    //----------------判断用户是否登录开始-----------------
    if(window.localStorage.token !== undefined){
        userInfo();
        $(".user-name").text(window.localStorage.name);
        $(".user-phone span").text(window.localStorage.phone);
        $(".user-head img").attr('src',window.localStorage.avatar);
    }else{
        $(".register-wrap").css("display","block");
        $(".user-info").css("display","none");
        $(".revise-card").css("display","none");
    }
    //故障上报
    $(".goFaultIcon").click(function(){
        if(window.localStorage.token == undefined){
            window.location.href = "login.html";
        }else{
            window.location.href = "faultReport.html";
        }
    });
    //--我的钱包
    $("#wallet").click(function(){
        if(window.localStorage.token == undefined){
            window.location.href = "login.html";
        }else{
            window.location.href = "bag.html";
        }
    });
    //--使用记录
    $("#useRecord").click(function(){
        if(window.localStorage.token == undefined){
            window.location.href = "login.html";
        }else{
            window.location.href = "useRecord.html";
        }
    });
    //--我的消息
    $("#message").click(function(){
        if(window.localStorage.token == undefined){
            window.location.href = "login.html";
        }else{
            window.location.href = "message.html";
        }
    });
    //--分享
    $("#share").click(function(){
        if(window.localStorage.token == undefined){
            window.location.href = "login.html";
        }else{
            window.location.href = "share.html";
        }
    });
    //--设置
    $("#setUp").click(function(){
        if(window.localStorage.token == undefined){
            window.location.href = "login.html";
        }else{
            window.location.href = "setup.html";
        }
    });
    //-----------判断用户是否登录结束-----------------------------------------------------------------------------------
    //正在使用
    $.ajax({
        url: "https://www.jiebasan.com/borrowing_orders/current_order",
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization":window.localStorage.token
        },
        contentType: "application/json",
        dataType: "json",
        success:function(res){
            //console.log("正在使用");
            //console.log(res.body);
            //$.each(res.body,function(ind,obj){
            window.sessionStorage.billing = res.body.state;
            var usedTime = "使用时长";
            if(res.body.state == "billing" || res.body.state == "unbilling"){
                //console.log(res.body)
                //res.body.splice($.inArray(this,res.body),1);
                //res.body.unshift(this);
                var usingTime = "已用时长";
                $("#userNow").css("display","block");
                $(".goFallPageWrap").css("left","0");
                if(res.body.state == "unbilling"){
                    $(".rightFont").text("待计费");
                }else{
                    $(".rightFont").text("计费中");
                }
                $(".goFaultIcon").css("top","6.2rem");
                $(".dingWeiFont").text(res.body.borrow_address);
                $(".shiChangFont").text(res.body.billing_time);
                $(".xiaoFeiFont").text(res.body.total_fee);
            }
                //$(".userRecord-wrap").append($("<section class='bg-white wrap-center interval'><div><div class='border_bottom'><div class='message-top relative'><div class='use-time'>"+obj.billing_time+"</div></div></div></div></section>"));
            //});
            //console.log(res.body.length);
        },
        error:function(res){
            $("#userNow").css("display","none");
            $(".goFallPageWrap").css("left","-6rem");
            $(".goFaultIcon").css("top","1.786666667rem");
            //console.log(res);
            //var text = eval("("+res.responseText+")");
            //console.log(text.meta.message);
            //$(".userRecord-wrap").append($("<div class='center'style='margin-top: 1rem;'>暂无使用记录</div>"));
        }
    });

    //查看交易明细
    $("#details").click(function(){
        window.location.href = "transaction.html";
    });
    //点击充值
    $(".recharge").click(function(){
        if(window.sessionStorage.zhima_score == 'null'){
            if(window.sessionStorage.balance_pledge <= 0.0){
                $(".quitPopup").css("display","block");
                $(".Popup-bg").css("display","block");
                $(".goRecharge").click(function(){
                    window.sessionStorage.btnMark = "wallet";
                    $(".quitPopup").css("display","none");
                    $(".Popup-bg").css("display","none");
                    window.location.href = "rechargeDeposit.html";
                });
            }
        }else if(window.sessionStorage.balance_normal <0.0){
            //$(".quitPopup").css("display","block");
            //$(".Popup-top").text("您的余额不足");
            //$(".Popup-bg").css("display","block");
            //$(".goRecharge").click(function(){
            window.sessionStorage.btnMark = "wallet";
            window.location.href = "rechargeBalance.html";
            //});
        }
        else{
            window.sessionStorage.btnMark = "wallet";
            window.location.href = "rechargeBalance.html";
        }
    });
    //查看我的优惠券
    $(".checkCoupon").click(function(){
        window.location.href = "coupon.html";
    });
    //提现
    //$(".withdraw_cash").click(function(){
    //
    //});
    //获取可用优惠券数据
    $.ajax({
        url:"https://www.jiebasan.com/coupons" ,
        method:"GET",
        headers:{
            "Accept": "application/json",
            "Authorization":window.localStorage.token
        },
        contentType: "application/json",
        dataType: "json",
        data: {"page":"1","count":"40"},
        success:function(res){
            //console.log(res.body);
            if(res.body.length == 0){//如果没有优惠券
                $("body").height($(document).height());
                //$("body"),height($(document).height);
                $(".coupon-bottom").css({
                    "position":"absolute",
                    "left":"0",
                    "right":"0",
                    "bottom":"0.56rem",
                    "margin":"auto"
                });
                $(".coupon-wrap").prepend($("<div class='noCoupon'><img src='images/no-coupon.png' alt=''><div class='noCouponFont'>您还没有优惠券呢</div></div>"));
            }else{
                $.each(res.body,function(ind,obj){
                    var valid_from = obj.valid_from.substr(0,10).replace(/\-/g,".");
                    var valid_to = obj.valid_to.substr(0,10).replace(/\-/g,".");
                    //console.log(obj);
                    $(".goExpireCoupon").before($("<div class='coupon-content'><div class='coupon-title'>"+obj.usage_days+"天使用券</div><div class='coupon-des'><div class='des1'>"+obj.title+"</div><div class='des2'></div><div class='validity-time'>有效期:"+valid_from+"～"+valid_to+"</div></div></div>"))
                });
            }
        },
        error:function(res){
            //console.log(res);
            $(".popup").show().text(res.meta.message);
            setTimeout('$(".popup").text("").hide()',2000);
        }
    });
    $(".goExpireCoupon").click(function(){
        window.location.href = "overdueCoupon.html";
    });
    //优惠卷使用说明
    $.ajax({
        url:"https://www.jiebasan.com/exception_declarations/coupon" ,
        method:"GET",
        headers:{
            "Accept": "application/json"
        },
        contentType: "application/json",
        dataType: "json",
        success:function(res){
            //console.log(res);
            //console.log(res.body[0]);
            $.each(res.body,function(ind,obj){
                $(".couponInfoWrap").append($("<div style='margin:0.2rem 0 0 0;font-size: 16px;'>"+obj.question+"</div><div style='margin:0.2rem 0 0 0;font-size: 14px;'>"+obj.answer+"</div>"));
            });
        },
        error:function(res){
            //console.log(res);
            $(".popup").show().text(res.meta.message);
            setTimeout('$(".popup").text("").hide()',2000);
        }
    });
    //查看过期优惠券
    $(".coupon-bottom").click(function(){
        window.location.href = "overdueCoupon";
    });
    $.ajax({
        url:"https://www.jiebasan.com/coupons/expired_or_used" ,
        method:"GET",
        headers:{
            "Accept": "application/json",
            "Authorization":window.localStorage.token
        },
        contentType: "application/json",
        dataType: "json",
        data: {"page":"","count":""},
        success:function(res){
            //console.log(res);
            if(res.body.length == 0){//如果没有优惠券
                $(".expireCouponWrap").append($("<div class='noCoupon'><img src='images/no-coupon.png' alt=''><div class='noCouponFont'>您还没有过期优惠券</div></div>"));
            }
            else{
                $.each(res.body,function(ind,obj){
                    var effectiveTime = obj.valid_from.substr(0,10)+"～"+obj.valid_to.substr(0,10)
                    $(".expireCouponWrap").append($("<div class='overdue-coupon'><div class='overdue-title'><div class='overdue-title-wrap'><span>"+obj.usage_days+"天使用券</span><br><span class='overdue-font'>-已过期-</span></div></div><div class='coupon-des'><div class='overdue-des1'>"+obj.title+"</div><div class='overdue-des2'></div><div class='validity-time'>有效期："+effectiveTime+"</div></div></div>"));
                });
                $(".no-more").css("display","block");
            }
        },
        error:function(res){
            //console.log(res);
            $(".popup").show().text(res.meta.message);
            setTimeout('$(".popup").text("").hide()',2000);
        }
    });

    //设置页
    $(".confirm").click(function(){
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "index.html";
    });
    $(".toFeedBack").click(function(){
       window.location.href = "feedback.html";
    });
    $("#aboutUs").click(function(){
        window.location.href = "about.html";
    });
    //修改名片
    $(".revise-container").click(function(){
        if(window.localStorage.token !== undefined){
            window.location.href = "revisecard.html";
        }
    });
    $(".change-user-head img").attr('src',window.localStorage.avatar);
    $(".invitationCode").val(window.localStorage.invitation_code);
    $(".nickname").val( window.localStorage.name);
    $(".save-revise").click(function(){
        $.ajax({
           url:"https://www.jiebasan.com/users/profile" ,
            method:"PUT",
            headers:{
                "Accept": "application/json",
                "Authorization":window.localStorage.token
            },
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({"name":$(".nickname").val()}),
            success:function(res){
                console.log(res);
                window.localStorage.name = res.body.name;
                $(".nickname").val(window.localStorage.name);
                //console.log(res);
                window.location.href = "index.html";
            },
            error:function(res){
                //console.log(res);
                $(".popup").show().text(res.meta.message);
                setTimeout('$(".popup").text("").hide()',2000);
            }
        });
    });
    //意见反馈
    $(".feedback").click(function(){
        if($.trim($("#feedbackContent").val())==""){
            $(".popup").show();
            $(".popup").text("请输入您的意见");
            setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
        }else {
            $.ajax({
                url: "https://www.jiebasan.com/feedbacks",
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization":window.localStorage.token
                },
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({"content":$("#feedbackContent").val()}),
                success:function(res){
                    //console.log(res);
                    $(".popup").show();
                    $(".popup").text("感谢您的意见");
                    setTimeout('$(".popup").hide(),$(".popup").text(""),window.history.go(-1)',1500);
                    //setTimeout(window.history.go(-1),5500)
                    //location.href = "index.html";
                },
                error:function(res){
                    //console.log(res);
                }
            })
        }
    });
    //使用记录
    $.ajax({
        url: "https://www.jiebasan.com/borrowing_orders",
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization":window.localStorage.token
        },
        contentType: "application/json",
        dataType: "json",
        success:function(res){
            //console.log("使用记录");
            //console.log(res);
            if(res.body.length == 0){
                $(".userRecord-wrap").append($("<div class='center' style='margin-top: 0.5rem;'><img src='images/no-consume.png' alt=''></div><div class='center'style='margin-top: 0.1rem;'>暂无使用记录</div>"));
            }else {
                $.each(res.body,function(ind,obj){
                    //console.log(typeof (obj.state))
                    //console.log(obj.state)
                    var usedTime = "使用时长";
                    var startTime = obj.billing_started_at.substring(0,16).replace("T"," ") ;
                    //console.log(startTime);
                    if(obj.billing_ended_at !== null){
                        var endTime = obj.billing_ended_at.substring(0,16).replace("T"," ") ;
                    }
                    //console.log();
                    if(obj.state == "billing"){
                        var state = "使用中";
                        var time = startTime;
                        var one = "当前费用："+ this.total_fee;
                        var two = "借伞点："+ this.borrow_address;
                        var three = "已用时长："+this.billing_time;
                        if(obj.state == "billing"){
                            var four = "持续计费中";
                        }else{
                            var four = "待计费";
                        }
                        //res.body.splice($.inArray(this,res.body),1);
                        ////数组头部插入
                        //res.body.unshift(this);
                        $(".userRecord-wrap").append($("<section class='bg-white wrap-center interval'><div><div class='border_bottom'><div class='message-top relative'><div class='use-time'>"+time+"</div><div class='user-state use-now'>"+state+"</div></div></div><div><div class='use-content'><div class='content-left'><div class='current-cost'><span class='now-money'>"+one+"</span></div><div class='borrow-point flex'><span class='umbrella-address flex2'>"+two+"</span><div class='continue-charging flex1'>"+four+"</div></div><div class='use-length'><span>"+three+"</span></div></div></div></div></div></section>"));
                    }else{
                        var state = "已完成";
                        var time = startTime+"～"+endTime;
                        var one = "借伞点："+ obj.borrow_address;
                        var two = "还伞点："+ obj.return_address;
                        var three = "使用时长："+obj.billing_time;
                        var four = obj.total_payment;
                        $(".userRecord-wrap").append($("<section class='bg-white wrap-center interval'><div><div class='border_bottom'><div class='message-top relative'><div class='use-time'>"+time+"</div><div class='user-state use-now'>"+state+"</div></div></div><div><div class='use-content'><div class='content-left'><div class='current-cost'><span class='now-money'>"+one+"</span></div><div class='borrow-point flex'><span class='umbrella-address flex2'>"+two+"</span><div class='charged flex1'>"+four+"</div></div><div class='use-length'><span>"+three+"</span></div></div></div></div></div></section>"));
                    }
                });
            }
        },
        error:function(res){
            //console.log(res);
            var text = eval("("+res.responseText+")");
            //console.log(text.meta.message);
            $(".userRecord-wrap").append($("<div class='center'style='margin-top: 1rem;'>暂无使用记录</div>"));
        }
    });
    //我的消息
    $.ajax({
        url: "https://www.jiebasan.com/messages",
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization":window.localStorage.token
        },
        contentType: "application/json",
        dataType: "json",
        success:function(res){
            //console.log("我的消息");
            //console.log(res);
            //console.log(res.body.length);
            if(res.body.length == 0){
                $(".messageWrap").append($("<div class='center' style='margin-top: 0.5rem;'><img src='images/no-consume.png' alt=''></div><div class='center'>暂无消息通知</div>"))
            }
            else{
                $.each(res.body,function(ind,obj){
                    var time = obj.created_at.substring(0,16).replace("T"," ") ;
                    //console.log(obj.read_at);
                    if(obj.read_at.length>0){
                        $(".messageWrap").append($("<section class='bg-white wrap-center interval'><div><div class='border_bottom'><div class='message-top relative'><div class='message-type'>"+obj.title+"</div><div class='message-date'>"+time+"</div></div></div><div><div class='message-content'>"+obj.body+"</div></div></div></section>"));

                    }else {
                        $(".messageWrap").append($("<section class='bg-white wrap-center interval'><div><div class='border_bottom'><div class='message-top relative'><span class='remind'><img src='images/redPoint.png' alt=''></span><div class='message-type'>"+obj.title+"</div><div class='message-date'>"+time+"</div></div></div><div><div class='message-content'>"+obj.body+"</div></div></div></section>"));
                    }
                    if(window.localStorage.have_unread_messages == "true"){
                        $(".messageWrap").find("section").find(".message-top").append($("<span class='remind'><img src='images/redPoint.png' alt=''></span>"));
                        $(".messageMark").css("display","inline-block");
                    }
                   else {
                        $(".remind").css("display","none");
                        $(".messageMark").css("display","none");
                    }
                })
            }
            //location.href = "index.html";
        },
        error:function(res){
            //console.log(res);
            $(".popup").show().text(res.meta.message);
            setTimeout('$(".popup").text("").hide()',2000);
        }
    });
    //使用指南(借伞说明, 还伞说明)
    $.ajax({
        url:"https://www.jiebasan.com/instructions" ,
        method:"GET",
        headers:{
            "Accept": "application/json"
        },
        contentType: "application/json",
        dataType: "json",
        success:function(res){
            //console.log(res.body);
            //console.log(res.body.back[0]);
            //console.log(res.body.borrow);
            $.each(res.body.borrow,function(ind,obj){
                //console.log(obj);
                //console.log(obj.question);
                $(".useInfo").append($("<div class='title2'>"+obj.question+"</div><div class='guide-img bg-white'><img src='"+obj.photo_url+"' alt=''></div>"));
            });
            $.each(res.body.back,function(ind,obj){
                //console.log(obj);
                //console.log(obj.question);
                $(".useInfo").append($("<div class='use-title backTile'>•还伞说明•</div><div class='title2'>"+obj.question+"</div><div class='guide-img bg-white'><img src='"+obj.photo_url+"' alt=''></div>"));
            });
        },
        error:function(res){
            //console.log(res);
            $(".popup").show().text(res.meta.message);
            setTimeout('$(".popup").text("").hide()',2000);
        }
    });
    // 异常说明
    $.ajax({
        url:"https://www.jiebasan.com/exception_declarations/abnormal" ,
        method:"GET",
        headers:{
            "Accept": "application/json"
        },
        contentType: "application/json",
        dataType: "json",
        success:function(res){
            //console.log(res.body);
            $.each(res.body,function(ind,obj){
                //console.log(obj.question);
                //console.log(obj.answer);
                $(".abnormalInfo").append($("<div style='margin:0.2rem 0 0 0;font-size: 16px;font-weight: 600;'>"+obj.question+"</div><div style='margin:0.2rem 0 0 0;font-size: 14px;'>"+obj.answer+"</div>"));
            });
        },
        error:function(res){
            console.log(res);
        }
    });
    //计费说明
    $.ajax({
        url:"https://www.jiebasan.com/exception_declarations/charging" ,
        method:"GET",
        headers:{
            "Accept": "application/json"
        },
        contentType: "application/json",
        dataType: "json",
        success:function(res){
            //console.log("计费说明");
            //console.log(res.body);
            //console.log(res.body[0].question);
            //console.log(typeof (res.body));
            $(".chargingWrap").append($("<div class='charging-wrap'><h3 style='margin:0.2rem 0 0.5rem 0;font-size:16px;color:#282828;'>"+res.body[0].question +"</h3>"+ res.body[0].answer+"</div>"));
        },
        error:function(res){
            //console.log(res);
            $(".popup").show().text(res.meta.message);
            setTimeout('$(".popup").text("").hide()',2000);
        }
    });
    //返回故障类型
    $.ajax({
        url:"https://www.jiebasan.com/failure_reports/failure_types" ,
        method:"GET",
        headers:{
            "Accept": "application/json"
        },
        contentType: "application/json",
        dataType: "json",
        success:function(res){
            $(".fault1").text(res.body[0].failure_type_alias);
            $(".fault2").text(res.body[1].failure_type_alias);
            $(".fault3").text(res.body[2].failure_type_alias);
            $(".fault4").text(res.body[3].failure_type_alias);
            $(".fault5").text(res.body[4].failure_type_alias);
            $(".faultOthers").text(res.body[5].failure_type_alias);
        },
        error:function(res){
            //console.log(res);
            $(".popup").show().text(res.meta.message);
            setTimeout('$(".popup").text("").hide()',2000);
        }
    });
    //故障上报提交
    $(".faultbtn").click(function(){
        if($(".fault-type").find("span").hasClass("faultActive")){
            $(this).attr("disabled",true);
            console.log(this);
            if($(".fault1").hasClass("faultActive")){
                var faultType =  "dock_lock_broken";
            }else if($(".fault2").hasClass("faultActive")){
                var faultType =  "handle_broken";
            }else if($(".fault3").hasClass("faultActive")){
                var faultType =  "face_broken";
            }else if($(".fault4").hasClass("faultActive")){
                var faultType =  "paint";
            }else if($(".fault5").hasClass("faultActive")){
                var faultType =  "lock_bone_broken";
            }else if($(".faultOthers").hasClass("faultActive")){
                var faultType =  "other";
            }
            $.ajax({
                url: "https://www.jiebasan.com/failure_reports",
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization":window.localStorage.token
                },
                contentType: "application/json",
                dataType: "json",
                data:JSON.stringify({
                    "failure_type":faultType,
                    "detail_address":$(".addr").val(),
                    "remark":$(".remarks").val(),
                    "image":"",
                    "latitude":"",
                    "longitude":""
                }),
                success:function(res){
                    $(".faultbtn").attr("disabled",false);
                    $(".popup").show();
                    $(".popup").text("感谢您的上报");
                    //setTimeout('$(".popup").hide(),$(".popup").text(""),window.history.go(-1)',1500);
                },
                error:function(res){
                    $(".popup").show().text(res.meta.message);
                    setTimeout('$(".popup").text("").hide()',2000);
                }
            });
        }else {
            console.log(this);
            $(".popup").show();
            $(".popup").text("请选择故障类型");
            setTimeout('$(".popup").hide(),$(".popup").text("")',1500);
        }

    });
    //我的钱包
    function getProfile(){
        $.ajax({
            url:"https://www.jiebasan.com/users/profile" ,
            method:"GET",
            headers:{
                "Accept": "application/json",
                "Authorization":window.localStorage.token
            },
            //contentType: "application/json",
            //dataType: "json",
            //data: JSON.stringify({"name":$(".nickname").val()}),
            success:function(res){
                console.log(res);
                window.localStorage.pledgeAmount = res.body.pledge_amount;
                window.localStorage.have_unread_messages = res.body.have_unread_messages;
                window.sessionStorage.balance_pledge = res.body.balance_pledge;
                window.sessionStorage.balance_normal = res.body.balance_normal;
                window.sessionStorage.zhima_score = res.body.zhima_score;
                $(".recharge-num").text(res.body.pledge_amount);
                $(".balance-num").text(res.body.balance_normal);
                if(res.body.zhima_score == 'null' || res.body.zhima_score == null){
                    if(res.body.balance_pledge<=0.0){
                        $(".myDeposit").css({'fontSize':'14px','color':'#ff6d5b'}).val("￥0.00").attr("disabled","false");
                    }else{
                        $(".myDeposit").val("￥"+res.body.balance_pledge);
                    }
                }else{
                    $(".myDeposit").val("芝麻信用"+res.body.zhima_score+"，免押金");
                }
            },
            error:function(res){
                //console.log(res);
                $(".popup").show().text(res.meta.message);
                setTimeout('$(".popup").text("").hide()',2000);
            }
        });
    }
    getProfile();
    $(".yajin").text( window.localStorage.pledgeAmount);
});
