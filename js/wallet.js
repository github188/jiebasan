/**
 * Created by hzc on 2017-5-24.
 */
//提现
$(function(){
    $(".myDeposit").val("￥"+window.sessionStorage.balance_pledge)
    $(".withdraw_cash").click(function(){
        if(window.sessionStorage.balance_pledge >0){
            $(".withdraw_cash").attr("disabled",false);
            $(".tiXianWrap").css("display","block");
            $(".Popup-bg").css("display","block");
            //$(".withdraw_cash").css("background-color","#ffffff");
        }else{
            $(".withdraw_cash").removeAttr('onclick');
            //$(".withdraw_cash").css("background-color","gray");
        }
    });
    $(".quxiao").click(function(){
        $(".tiXianWrap").css("display","none");
        $(".Popup-bg").css("display","none");
    });
    $(".queding").click(function(){
        $(".tiXianWrap").css("display","none");
        $(".Popup-bg").css("display","none");
        if(window.sessionStorage.balance_normal<0){
            $(".fuyue").css("display","block");
            $(".Popup-bg").css("display","block");
            $(".goRecharge").click(function(){
                $(".fuyue").css("display","none");
                $(".Popup-bg").css("display","none");
                window.location.href = "rechargeDeposit.html";
            });
        }else if(window.sessionStorage.billing == "billing"){
            $(".dingDaning").css("display","block");
            $(".Popup-bg").css("display","block");
            $(".zhiDao").click(function(){
                $(".dingDaning").css("display","none");
                $(".Popup-bg").css("display","none");
            });
        }else{
            $.ajax({
                url: "http://staging.jiebasan.com/user/pledge_withdraw",
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization":window.localStorage.token
                },
                contentType: "application/json",
                dataType: "json",
                //data:JSON.stringify({}),
                success:function(res){
                    //console.log(res);
                    //alert(res);
                    $(".popup").show();
                    $(".popup").text("提现成功");
                    setTimeout('$(".popup").hide(),$(".popup").text(""),window.history.go(-1)',1500);
                },
                error:function(res){
                    //console.log(res);
                    //alert(res);
                    //console.log(res.responseText.replace(/[^\u4e00-\u9fa5]/gi,""));
                    var message = res.responseText.replace(/[^\u4e00-\u9fa5]/gi,"");
                    //if(message=="没有找到当前用户的充值交易单无法进行退款"){
                    //    var message = "您还没有充值交易单";
                    //}
                    $(".popup").show();
                    $(".popup").text(message);
                    setTimeout('$(".popup").hide(),$(".popup").text("")',2500);
                }
            });
        }
    });
});