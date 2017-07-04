/**
 * Created by guojing on 2017-5-31.
 */
    // 百度地图API功能
$(function(){
    function map(){
        var map = new BMap.Map("allmap");  // 创建Map实例
        var geolocation = new BMap.Geolocation();
        var geolocationControl = new BMap.GeolocationControl();
        //console.log(map.getCenter());
        //console.log(geolocationControl);
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                //自定义图标
                var myIcon = new BMap.Icon('http://bbs.zhaocaibank.com/template/fujian/icon/currentLocation.png', new BMap.Size(32,32));
                var mk = new BMap.Marker(r.point,{icon:myIcon});//创建点
                //var mk = new BMap.Marker(r.point);
                map.addOverlay(mk); // 将标注添加到地图中
                var point = new BMap.Point(r.point.lng, r.point.lat);
                var lat = r.point.lat;
                var lng = r.point.lng;
                //console.log(lat,lng);
                map.centerAndZoom(point,16);
                //获取附近的伞桩坐标
                $.ajax({
                    url:"http://staging.jiebasan.com/dock_devices/nearby",
                    method:"GET",
                    headers:{
                        "Accept": "application/json",
                        "Authorization":window.localStorage.token
                    },
                    contentType: "application/json",
                    dataType: "json",
                    data: {"latitude":lat,"longitude":lng},
                    success:function(res){
                        //console.log(lat,lng);
                        //console.log(r.point.lat);
                        //console.log(res.body);
                        $.each(res.body,function(ind,obj){
                            //console.log(obj)
                            var latitude = obj.latitude;
                            var longitude = obj.longitude;
                            var content = obj.deploy_address + "</br><div><div style='width: 6px;!important;height: 6px;!important;border-radius: 100%;background: #ff6d5b; display: inline-block;margin-bottom:0.096618357rem;vertical-align: middle'></div>\n伞位数量"+obj.umbrella_slot + "</div><div><div style='width: 6px;!important;height: 6px;!important;border-radius: 100%;background: #ff6d5b; display: inline-block;vertical-align: middle;margin-bottom:0.096618357rem;'></div>\n可用雨伞<span style='color: #ff6d5b;'>"+obj.current_umbrella_count+"</span>把</div>";
                            //console.log(latitude,longitude);
                            //function addMarker(point){
                            //    //map.addOverlay(marker);
                            //    //console.log(marker)
                            //}
                            var point = new BMap.Point(longitude,latitude);
                            console.log(point);
                            console.log(123)
                            //addMarker(point);
                            var opts = {
                                paddingTop:60,
                                width : 150,     // 信息窗口宽度
                                height: 78,     // 信息窗口高度
                                title :  "", // 信息窗口标题
                                enableMessage:true//设置允许信息窗发送短息
                                // searchTypes   :[
                                // 	BMAPLIB_TAB_SEARCH,   //周边检索
                                // 	BMAPLIB_TAB_TO_HERE,  //到这里去
                                // 	BMAPLIB_TAB_FROM_HERE //从这里出发
                                // ]
                            };
                            function addClickHandler(content,marker){
                                marker.addEventListener("click",function(e){
                                    console.log(e);
                                    console.log(111);
                                    openInfo(content,e)}
                                );
                            }
                            function openInfo(content,e){
                                var p = e.target;
                                console.log(p);
                                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                                var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                                map.openInfoWindow(infoWindow,point); //开启信息窗口
                            }
                            //坐标转换完之后的回调函数
                            translateCallback = function (data){
                                if(data.status === 0) {
                                    var myIcon = new BMap.Icon('http://bbs.zhaocaibank.com/template/fujian/icon/umbrellaIcon.png', new BMap.Size(32,32));
                                    var marker = new BMap.Marker(data.points[0],{icon:myIcon});
                                    //var marker = new BMap.Marker();
                                    map.addOverlay(marker); // 将标注添加到地图中
                                    addClickHandler(content,marker);
                                }
                            };
                            var convertor = new BMap.Convertor();
                            var pointArr = [];
                            pointArr.push(point);
                            convertor.translate(pointArr, 3, 5, translateCallback);
                        })

                    },
                    error:function(res){
                        console.log(res);
                        console.log("错了")
                    }
                });
                $(".locationIcon").click(function(){
                    map.centerAndZoom(point,16);

                    //map.panTo((lng,lat),false);
                    //var sContent =
                    //    '<div style="width:4.64rem;position: absolute;top:250px;left:50px;z-index: 100000;background: #fff;display: none;">' +
                    //    '<div style="padding-top:7px;">'+
                    //    '<span style="display: inline-block;vertical-align: middle; width:4px;height: 4px;background: #ff6d5b;border-radius: 100%;margin-left: 11px;margin-right: 5px;">'+'</span>'+
                    //    '<span>伞位数量40</span>'+
                    //    '</div>'+
                    //    '<div style="padding-bottom:7px;">'+
                    //    '<span style="display: inline-block;vertical-align: middle; width:4px;height: 4px;background: #ff6d5b;border-radius: 100%;margin-left: 11px;margin-right: 5px;">'+'</span>'+
                    //    '<span>可用雨伞<i style="color:#ff6d5b;font-style:normal;">12</i>把</span>'+
                    //    '</div>'+
                    //    '<div style="border-top:1px solid #cecece;display: flex;">'+
                    //    '<div style="flex: 55;border-right: 1px solid #cecece;line-height: 30px;">'+'<div style="margin-left: 11px">张江高科地铁5号</div>'+'</div>'+
                    //    '<div style="flex: 30;color: #ff6d5b;line-height: 30px;">'+'+<div style="text-align: center;">去这里</div>'+'</div>'+
                    //    '</div>'+
                    //    '</div>';
                    //// var map = new BMap.Map("allmap");
                    //var point = map.getCenter();   // new BMap.Point(116.404, 39.915);
                    //var marker = new BMap.Marker(point);
                    //var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
                    //map.centerAndZoom(point, 18);
                    //map.addOverlay(marker);
                    //marker.addEventListener("click", function(){
                    //    this.openInfoWindow(infoWindow);
                    //    //图片加载完毕重绘infowindow
                    //
                    //});
                    //map.openInfoWindow(infoWindow,point); //开启信息窗口
                });
                $("#refreshImg").click(function(){
                    $("#refreshImg").rotate({
                        bind:
                        {
                            click: function() {
                                $(this).rotate({angle: 0, animateTo: 180, easing: $.easing.easeInOutExpo})
                            }
                        }
                    });
                    var center = map.getCenter();
                    $.ajax({
                        url:"http://staging.jiebasan.com/dock_devices/nearby",
                        method:"GET",
                        headers:{
                            "Accept": "application/json",
                            "Authorization":window.localStorage.token
                        },
                        contentType: "application/json",
                        dataType: "json",
                        data: {"latitude":center.lat,"longitude":center.lng},
                        success:function(res){
                            //$("#refreshImg").unbind();
                            //console.log(lat,lng);
                            //console.log(r.point.lat);
                            //console.log(res.body);
                            $.each(res.body,function(ind,obj){
                                //console.log(obj)
                                var latitude = obj.latitude;
                                var longitude = obj.longitude;
                                var content = obj.deploy_address + "</br><div><div style='width: 6px;!important;height: 6px;!important;border-radius: 100%;background: #ff6d5b; display: inline-block;margin-bottom:0.096618357rem;vertical-align: middle'></div>\n伞位数量"+obj.umbrella_slot + "</div><div><div style='width: 6px;!important;height: 6px;!important;border-radius: 100%;background: #ff6d5b; display: inline-block;vertical-align: middle;margin-bottom:0.096618357rem;'></div>\n可用雨伞<span style='color: #ff6d5b;'>"+obj.current_umbrella_count+"</span>把</div>";
                                //console.log(latitude,longitude);
                                //function addMarker(point){
                                //    //map.addOverlay(marker);
                                //    //console.log(marker)
                                //}
                                var point = new BMap.Point(longitude,latitude);
                                console.log(point);
                                console.log(123)
                                //addMarker(point);
                                var opts = {
                                    paddingTop:60,
                                    width : 150,     // 信息窗口宽度
                                    height: 78,     // 信息窗口高度
                                    title :  "", // 信息窗口标题
                                    enableMessage:true//设置允许信息窗发送短息
                                    // searchTypes   :[
                                    // 	BMAPLIB_TAB_SEARCH,   //周边检索
                                    // 	BMAPLIB_TAB_TO_HERE,  //到这里去
                                    // 	BMAPLIB_TAB_FROM_HERE //从这里出发
                                    // ]
                                };
                                function addClickHandler(content,marker){
                                    marker.addEventListener("click",function(e){
                                        console.log(e);
                                        console.log(111);
                                        openInfo(content,e)}
                                    );
                                }
                                function openInfo(content,e){
                                    var p = e.target;
                                    console.log(p);
                                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                                    var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                                    map.openInfoWindow(infoWindow,point); //开启信息窗口
                                }
                                //坐标转换完之后的回调函数
                                translateCallback = function (data){
                                    if(data.status === 0) {
                                        var myIcon = new BMap.Icon('http://bbs.zhaocaibank.com/template/fujian/icon/umbrellaIcon.png', new BMap.Size(32,32));
                                        var marker = new BMap.Marker(data.points[0],{icon:myIcon});
                                        //var marker = new BMap.Marker();
                                        map.addOverlay(marker); // 将标注添加到地图中
                                        addClickHandler(content,marker);
                                    }
                                };
                                var convertor = new BMap.Convertor();
                                var pointArr = [];
                                pointArr.push(point);
                                convertor.translate(pointArr, 3, 5, translateCallback);


                            })

                        },
                        error:function(res){
                            console.log(res);
                            console.log("错了")
                        }
                    });
                });
            }
            else {
                alert('failed'+this.getStatus());
            }
            ;{enableHighAccuracy:true}});

        // 初始化地图,用城市名设置地图中心点
        map.addControl(new BMap.NavigationControl());
        //map.addControl(new GeolocationControl());
        map.getCenter();
        //testTip(map);
        //console.log(map.getCenter());
    }
    map();
    //调整放缩控件位置

    $("#allmap").height($(window).height());
    //console.log($("#allmap"));
    //$("#allmap").find(" .BMap_stdMpCtrl").addClass("scalingBtn");
    //console.log(111);
    //$(".BMap_stdMpCtrl").css("bottom","1.813333333rem");
});

