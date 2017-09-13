/**
 * Created by hzc on 2017-5-31.
 */
    // 百度地图API功能
$(function(){
    FastClick.attach(document.body);
    function map(){
        var map = new BMap.Map("allmap");  // 创建Map实例
        var geolocation = new BMap.Geolocation();
        var geolocationControl = new BMap.GeolocationControl();
        geolocation.getCurrentPosition(function(r){

            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                //自定义图标
                var myIcon = new BMap.Icon(' http://www.jiebasan.com/assets/webapp/currentLocation-ace3f5474758effab13970226d67946aa3aab497f5788416cb213b24f9803c0d.png', new BMap.Size(32,32));
                var mk = new BMap.Marker(r.point,{icon:myIcon});//创建点
                map.addOverlay(mk); // 将标注添加到地图中
                var point = new BMap.Point(r.point.lng, r.point.lat);
                var lat = r.point.lat;
                var lng = r.point.lng;
                map.centerAndZoom(point,16);
                //获取附近的伞桩坐标
                $.ajax({
                    url:"https://www.jiebasan.com/dock_devices/nearby",
                    method:"GET",
                    headers:{
                        "Accept": "application/json",
                        "Authorization":window.localStorage.token
                    },
                    contentType: "application/json",
                    dataType: "json",
                    data: {"latitude":'0.0',"longitude":'0.0'},
                    success:function(res){
                        console.log(res.body);
                        $.each(res.body,function(ind,obj){
                            console.log(obj);
                            var latitude = obj.latitude;
                            var longitude = obj.longitude;
                            var content = obj.deploy_address + "</br><div><div style='width: 6px;!important;height: 6px;!important;border-radius: 100%;background: #ff6d5b; display: inline-block;margin-bottom:0.096618357rem;vertical-align: middle'></div>\n伞位数量"+obj.umbrella_slot + "</div><div><div style='width: 6px;!important;height: 6px;!important;border-radius: 100%;background: #ff6d5b; display: inline-block;vertical-align: middle;margin-bottom:0.096618357rem;'></div>\n可用雨伞<span style='color: #ff6d5b;'>"+obj.current_umbrella_count+"</span>把</div>";
                            var point = new BMap.Point(longitude,latitude);
                            var opts = {
                                paddingTop:60,
                                width : 150,     // 信息窗口宽度
                                height: 78,     // 信息窗口高度
                                title :  "", // 信息窗口标题
                                enableMessage:true//设置允许信息窗发送短息
                            };
                            function addClickHandler(content,marker){
                                marker.addEventListener("click",function(e){
                                    openInfo(content,e)}
                                );
                            }
                            function openInfo(content,e){
                                var p = e.target;
                                //console.log(p);
                                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                                var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                                map.openInfoWindow(infoWindow,point); //开启信息窗口
                            }
                            //坐标转换完之后的回调函数
                            translateCallback = function (data){
                                if(data.status === 0) {
                                    var myIcon = new BMap.Icon('http://www.jiebasan.com/assets/webapp/umbrellaIcon-4e6b0243941cf580916f85743ad01de7dbf2439aa25b60e6301576c804f77727.png', new BMap.Size(32,32));
                                    var marker = new BMap.Marker(data.points[0],{icon:myIcon});
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
                        //console.log(res);
                        //console.log("错了")
                    }
                });
                $(".locationIcon").click(function(){
                    map.centerAndZoom(point,16);
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
                        url:"https://www.jiebasan.com/dock_devices/nearby",
                        method:"GET",
                        headers:{
                            "Accept": "application/json",
                            "Authorization":window.localStorage.token
                        },
                        contentType: "application/json",
                        dataType: "json",
                        data: {"latitude":center.lat,"longitude":center.lng},
                        success:function(res){
                            //console.log(res.body)
                            $.each(res.body,function(ind,obj){
                                //console.log(obj)
                                var latitude = obj.latitude;
                                var longitude = obj.longitude;
                                var content = obj.deploy_address + "</br><div><div style='width: 6px;!important;height: 6px;!important;border-radius: 100%;background: #ff6d5b; display: inline-block;margin-bottom:0.096618357rem;vertical-align: middle'></div>\n伞位数量"+obj.umbrella_slot + "</div><div><div style='width: 6px;!important;height: 6px;!important;border-radius: 100%;background: #ff6d5b; display: inline-block;vertical-align: middle;margin-bottom:0.096618357rem;'></div>\n可用雨伞<span style='color: #ff6d5b;'>"+obj.current_umbrella_count+"</span>把</div>";
                                var point = new BMap.Point(longitude,latitude);
                                //console.log(point);
                                //console.log(123)
                                //addMarker(point);
                                var opts = {
                                    paddingTop:60,
                                    width : 150,     // 信息窗口宽度
                                    height: 78,     // 信息窗口高度
                                    title :  "", // 信息窗口标题
                                    enableMessage:true//设置允许信息窗发送短息
                                };
                                function addClickHandler(content,marker){
                                    marker.addEventListener("click",function(e){
                                        //console.log(e);
                                        //console.log(111);
                                        openInfo(content,e)}
                                    );
                                }
                                function openInfo(content,e){
                                    var p = e.target;
                                    //console.log(p);
                                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                                    var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                                    map.openInfoWindow(infoWindow,point); //开启信息窗口
                                }
                                //坐标转换完之后的回调函数
                                translateCallback = function (data){
                                    //alert(data.status)
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
                //alert('failed'+this.getStatus());
            };{enableHighAccuracy:true}});
        // 初始化地图,用城市名设置地图中心点
        map.addControl(new BMap.NavigationControl());
        map.getCenter();
    }
    map();
    //调整放缩控件位置
    $("#allmap").height($(window).height());
});

