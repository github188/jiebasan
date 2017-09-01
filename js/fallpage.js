/**
 * Created by hzc on 2017-8-31.
 */
$(function(){
    FastClick.attach(document.body);
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    $(".fallPageButton").on("click touchstart",function(){
        if(isAndroid){
            window.location.href = "";
        }else if(isiOS){
            window.location.href = "https://itunes.apple.com/us/app/%25E5%2580%259F%25E6%258A%258A%25E4%25BC%259E/id1245560835?ls=1&mt=8";
        }
    });
});
