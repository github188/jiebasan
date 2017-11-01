/**
 * Created by hzc on 2017-8-4.
 */
$(function(){
    FastClick.attach(document.body);
    var url = window.location.search;
    //var deviceId = url.split("=")[1];
    var deviceId = url.substr(url.length-6,url.length);
    window.sessionStorage.deviceId = deviceId;
    function getCurrent_order(){
        $.ajax({
            url: "https://www.jiebasan.com/borrowing_orders/current_order",//正在进行的订单
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization":window.localStorage.token
            },
            contentType: "application/json",
            dataType: "json",
            success:function(res){
                console.log(res);
            },
            error:function(res){
                console.log(res);
                $(".popup").show().text(res.meta.message);
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            }
        });
    }
    getCurrent_order();
    //开锁借伞
    function openDock(){
        //获取URL后的伞桩id
        $.ajax({
            url: "https://www.jiebasan.com/borrowing_requests",//开锁借伞
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
                if(res.meta.status == 200){
                    window.sessionStorage.id = res.body.id;
                    window.location.href ="jiesan.html";
                }else{
                    $(".popup").show().text(res.meta.message);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
                }
            },
            error:function(res){
                console.log(res);
                $(".popup").show().text(res.meta.message);
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            }
        });
    }
    //判断有没有充押金
    function judgeDeposit(){
        $.ajax({
            url:"https://www.jiebasan.com/users/profile",
            method:"GET",
            headers:{
                "Accept": "application/json",
                "Authorization":window.localStorage.token
            },
            contentType: "application/json",
            dataType: "json",
            //data: JSON.stringify({"name":$(".nickname").val()}),
            success:function(res){
                console.log(res);
                if(res.meta.status == 401 && res.meta.message == "Unauthorized!"){
                    location.href = "login.html"
                }else {
                    if(res.body.zhima_score == 'null' ||　res.body.zhima_score == null){
                        if(res.body.balance_pledge<=0.0){
                            window.location.href = "rechargeDeposit.html";
                        }else if(res.body.balance_normal < 0.0){
                            $(".popup").show().text("您的余额为负");
                            setTimeout('$(".popup").text(""),$(".popup").hide(),window.location.href = "rechargeDeposit.html"',2000);
                        }
                        else{
                            openDock();
                        }
                    } else{
                        openDock();
                    }
                }
            },
            error:function(res){
                $(".popup").show().text(res.meta.message);
                setTimeout('$(".popup").text("").hide()',2000);
            }
        });
    }
    $(".openLock").click(function(){
        window.sessionStorage.btnMark = "transition";
        if(window.localStorage.token == undefined){
            window.location.href = "login.html";
        }else{
            judgeDeposit();
        }
    });
});