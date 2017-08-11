/**
 * Created by guojing on 2017-5-25.
 */
$(function(){
    FastClick.attach(document.body);
    //消费明细
    $.ajax({
        url:"http://www.jiebasan.com/cash_flows/outcome" ,
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
            if(res.body.length == 0){
                $(".no-more").css("display","none");
                $(".consumption-wrap").removeClass("bg-white");
                $(".consumption-wrap").append($("<div class='img-content'><img src='images/no-consume.png' alt=''><div class='no-consume' style=''>您还没有进行过消费呢</div></div>"))
            }else{

            }
        },
        error:function(res){
            console.log(res);
        }
    });
    //充值明细
    $("#rechargeDetail").click(function(){
        $(".recharge-wrap").empty();
        $.ajax({
            url:"http://www.jiebasan.com/cash_flows/income" ,
            method:"GET",
            headers:{
                "Accept": "application/json",
                "Authorization":window.localStorage.token
            },
            contentType: "application/json",
            dataType: "json",
            data: {"page":"","count":""},
            success:function(res){
                console.log(res);
                if(res.body.length == 0){
                    $(".no-more").css("display","none");
                    $(".recharge-wrap").removeClass("bg-white");
                    $(".recharge-wrap").append($("<div class='img-content'><img src='images/no-recharge.png' alt=''><div class='no-recharge' style=''>您还没有充值过呢</div></div>"))
                }else{
                    $.each(res.body,function(ind,obj){
                        console.log(obj.created_at)
                        var time = obj.created_at.substring(0,16).replace("T"," ");
                        $(".recharge-wrap").append($("<div class='border_bottom bg-white'><div class='transaction-content recharge-content relative'><div class='tile-wrap'><span>"+ obj.comment +"</span><br><span>"+ time +"</span></div><div class='recharge-money'>"+obj.amount+"元</div></div></div>"))
                    });
                    $(".no-more").css("display","block");
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    });
    //消费明细
    $("#consumption").click(function(){
        $(".consumption-wrap").empty();
        $.ajax({
            url:"http://www.jiebasan.com/cash_flows/outcome" ,
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
                if(res.body.length == 0){
                    $(".no-more").css("display","none");
                    $(".consumption-wrap").removeClass("bg-white");
                    $(".consumption-wrap").append($("<div class='img-content'><img src='images/no-consume.png' alt=''><div class='no-consume' style=''>您还没有进行过消费呢</div></div>"))
                }else{
                    $.each(res.body,function(ind,obj){
                        console.log(obj.created_at);
                        var time = obj.created_at.substring(0,16).replace("T"," ");
                        $(".consumption-wrap").append($("<div class='border_bottom bg-white'><div class='transaction-content consumption-content relative'><div class='tile-wrap'><span>"+ obj.comment +"</span><br><span>"+ time +"</span></div><div class='consumpt-money'>"+obj.amount+"元</div></div></div>"))
                    });
                }
            },
            error:function(res){
                console.log(res);
            }
        });
    });
});

