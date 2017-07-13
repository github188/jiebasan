/**
 * Created by hzc on 2017-6-13.
 */
function judgeState(){
    $.ajax({
        url:"http://staging.jiebasan.com/borrowing_requests/request_borrowing_state" ,
        method:"GET",
        headers:{
            "Accept": "application/json"
        },
        contentType: "application/json",
        dataType: "json",
        data:{"borrowing_request_id":window.sessionStorage.id},
        success:function(res){
            console.log(res);
            if(res.body.state == "true"){
                window.location.href = "jiesanSuccess.html";
            }
            else {
                $(".popup").show();
                $(".popup").text("本次借伞超时，请重新扫码");
                //setTimeout('$(".popup").show(),$(".popup").text("本次借伞超时，请重新扫码"),window.history.go(-1)',58000);
                setTimeout('$(".popup").hide(),$(".popup").text(""),window.history.go(-1)',2000);
            }
            //console.log(res.body[0]);
            //window.location.href = "jiesanSuccess.html";
        },
        error:function(res){
            console.log(res);
            $(".popup").show();
            $(".popup").text(res.meta.message);
            setTimeout('$(".popup").hide(),$(".popup").text(""),window.history.go(-1)',2000);
        }
    });
}
setInterval("judgeState()",2000);