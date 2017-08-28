/**
 * Created by hzc on 2017-6-13.
 */
$(function(){
    FastClick.attach(document.body);
    var count;
    function judgeState(){
        $.ajax({
            url:"https://www.jiebasan.com/borrowing_requests/request_borrowing_state" ,
            method:"GET",
            headers:{
                "Accept": "application/json"
            },
            contentType: "application/json",
            dataType: "json",
            data:{"borrowing_request_id":window.sessionStorage.id},
            success:function(res){
                console.log(res);
                //alert(JSON.stringify(res));
                if(res.body.state == "true"){
                    window.location.href = "jiesanSuccess.html";
                }
                else {
                    count ++;
                    if(count>=30){
                        $(".popup").show();
                        $(".popup").text("本次借伞超时，请重新扫码");
                        //setTimeout('$(".popup").show(),$(".popup").text("本次借伞超时，请重新扫码"),window.history.go(-1)',58000);
                        if(window.sessionStorage.btnMark == "transition") {
                            window.location.href = "transition.html";
                        }
                    }
                }
                //console.log(res.body[0]);
                //window.location.href = "jiesanSuccess.html";
            },
            error:function(res){
                //alert(JSON.stringify(res));
                console.log(res);
                $(".popup").show();
                $(".popup").text(res.meta.message);
                setTimeout('$(".popup").hide(),$(".popup").text(""),window.history.go(-1)',2000);
            }
        });
    }
    setInterval("judgeState()",1000);
});


