/**
 * Created by hzc on 2017-7-14.
 */
$(function(){
    FastClick.attach(document.body);
    if(window.sessionStorage.rechargeBtn == "rechargeYe"){
        $(".rechargeSuccessFont").text("余额充值成功");
    }else if(window.sessionStorage.rechargeBtn == "rechargeYj"){
        $(".rechargeSuccessFont").text("押金充值成功");
    }
    $(".rechargeBack").click(function(){
        if(window.sessionStorage.btnMark == 'index'){
            window.location.href = "index.html";
        }else if(window.sessionStorage.btnMark == "wallet"){
            window.location.href = "wallet.html";
        }else if(window.sessionStorage.btnMark == "transition"){
            window.location.href = "transition.html";
        }
    });
});
