/**
 * Created by hzc on 2017-8-4.
 */
$(function(){
    //开锁借伞
    function openDock(){
        //获取URL后的伞桩id
        var url = window.location.search;
        var deviceId = url.split("=")[1];
        $.ajax({
            url: "https://staging.jiebasan.com/borrowing_requests",//开锁借伞
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization":window.localStorage.token
            },
            contentType: "application/json",
            dataType: "json",
            data:JSON.stringify({"dock_device_id": deviceId}),
            success:function(res){
                window.sessionStorage.id = res.body.id;
                window.location.href ="jiesan.html";
            },
            error:function(res){
                console.log(res);
                $(".popup").show();
                $(".popup").text(res.meta.message);
                setTimeout('$(".popup").hide(),$(".popup").text("")',2000);
            }
        });
    }
    //判断有没有充押金
    function judgeDeposit(){
        $.ajax({
            url:"https://staging.jiebasan.com/users/profile" ,
            method:"GET",
            headers:{
                "Accept": "application/json",
                "Authorization":window.localStorage.token
            },
            contentType: "application/json",
            dataType: "json",
            //data: JSON.stringify({"name":$(".nickname").val()}),
            success:function(res){
                if(res.body.balance_pledge<=0.0){
                    window.location.href = "rechargeDeposit.html";
                }else if(res.body.balance_normal<=0.0){
                    $(".popup").show();
                    $(".popup").text("您的余额为负");
                    setTimeout('$(".popup").text(""),$(".popup").hide(),window.location.href = "rechargeDeposit.html"',1500);
                }else{
                    openDock();
                }
            },
            error:function(res){
                //console.log(res);
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