/**
 * Created by hzc on 2017-5-24.
 */
//提现
$(function(){
    FastClick.attach(document.body);
    function getUserInfo(){
        //我的钱包
        $.ajax({
            url:"https://www.jiebasan.com/users/profile" ,
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
                window.localStorage.pledgeAmount = res.body.pledge_amount;
                window.localStorage.have_unread_messages = res.body.have_unread_messages;
                window.sessionStorage.balance_pledge = res.body.balance_pledge;
                window.sessionStorage.balance_normal = res.body.balance_normal;
                window.sessionStorage.zhima_score = res.body.zhima_score;
                $(".recharge-num").text(res.body.pledge_amount);
                $(".balance-num").text(res.body.balance_normal);
                if(res.body.zhima_score == 'null'|| res.body.zhima_score == null){
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
                console.log(res);
            }
        });
    }
    getUserInfo();
    //$(".myDeposit").val("￥"+window.sessionStorage.balance_pledge)
    $(".withdraw_cash").click(function(){
        if(window.sessionStorage.zhima_score == null || window.sessionStorage.zhima_score == 'null'){
            if(window.sessionStorage.balance_pledge >0){
                $(".withdraw_cash").removeAttr('onclick');
                $(".tiXianWrap").css("display","block");
                $(".Popup-bg").css("display","block");
                //$(".withdraw_cash").css("background-color","#ffffff");
            }else{
                $(".popup").show().text("您还未冲押金");
                setTimeout('$(".popup").hide().text("")',2000);
                //$(".withdraw_cash").attr('disabled',"disabled").css({"background-color":"#ccc","color":"#fff"});
                //$(".withdraw_cash");
            }
        }else{
            $(".popup").show().text("您还未冲押金");
            setTimeout('$(".popup").hide().text("")',2000);
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
                window.location.href = "rechargeBalance.html";
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
                url: "https://www.jiebasan.com/user/pledge_withdraw",
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization":window.localStorage.token
                },
                contentType: "application/json",
                dataType: "json",
                //data:JSON.stringify({}),
                success:function(res){
                    $(".popup").show();
                    $(".popup").text("提现成功");
                    setTimeout('$(".popup").hide(),$(".popup").text(""),window.location.replace("https://www.jiebasan.com/webapp")',1500);
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