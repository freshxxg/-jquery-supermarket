/**
 * Created by lenovo on 16-7-27.
 */
$(document).ready(function(){
    display_table_data();
    click_add_cart();
    jump_page();
    display_cart_count();
});
function go_homepage() {
    window.location.href="../html/homepage.html";
}
function go_cart() {
    window.location.href="../html/cart.html";
}
function get_local(key) {
    return JSON.parse(localStorage.getItem(key));
}
function set_local(key) {
    (typeof(key)=="number") ? localStorage.setItem("count",JSON.stringify(key)):localStorage.setItem("cart_goods",JSON.stringify(key));
}
function jump_page() {
    $("#homepage").click(function () {
        go_homepage();});
    $("#cart").click(function () {
        var count=localStorage.getItem("count")||0;
        (count>0) ? go_cart() : alert("您的购物车还没有添加商品");

    });
}
function display_cart_count() {
    var count=get_local("count")||0;
    $("#count").html(count);
}
function write_table_data() {
    var goods_info = [
        {"classification":"饮料","name":"可口可乐","price":"3","unit":"瓶"},
        {"classification":"饮料","name":"咖啡","price":"3","unit":"瓶"},
        {"classification":"饮料","name":"雪碧","price":"3","unit":"瓶"},
        {"classification":"水果","name":"苹果","price":"5.5","unit":"斤"},
        {"classification":"水果","name":"香蕉","price":"5.5","unit":"斤"},
        {"classification":"水果","name":"葡萄","price":"5.5","unit":"斤"},
        {"classification":"水果","name":"鸭梨","price":"5.5","unit":"斤"},
        {"classification":"水果","name":"橙子","price":"5.5","unit":"斤"},
        {"classification":"水果","name":"柚子","price":"5.5","unit":"斤"},
        {"classification":"水果","name":"荔枝","price":"2","unit":"斤"},
        {"classification":"生活用品","name":"电池","price":"15","unit":"个"},
        {"classification":"生活用品","name":"手电筒","price":"15","unit":"个"},
        {"classification":"生活用品","name":"垃圾桶","price":"15","unit":"个"},
        {"classification":"生活用品","name":"水杯","price":"15","unit":"个"},
        {"classification":"生活用品","name":"太阳镜","price":"15","unit":"个"},
        {"classification":"生活用品","name":"筷子","price":"15","unit":"包"},
        {"classification":"生活用品","name":"梳子","price":"15","unit":"个"},
        {"classification":"生活用品","name":"牙膏","price":"15","unit":"个"},
        {"classification":"食品","name":"方便面","price":"4.5","unit":"袋"},
        {"classification":"食品","name":"火腿","price":"13","unit":"个"},
        {"classification":"食品","name":"甜甜圈","price":"6","unit":"个"}
    ];
    return goods_info;
}
function display_table_data(){
    var goods_info=write_table_data();
    $("#list_table").tmpl(goods_info).appendTo("table");
}
function click_add_cart() {
    $("td button").on("click",function (){
        var name = $(this).attr("id");
        add_cart_count();
        get_goods_info(name);
    });
}
function add_cart_count() {
    var count=$("#count").html()||0
    count++;
    $("#count").html(count);
    set_local(count)
};
function get_goods_info(name) {
    var cart_goods_obj=get_local("cart_goods")||{};
    var goods_info = write_table_data();
    _.each(goods_info, function (i) {
        if(i.name == name && ((i.name) in cart_goods_obj))cart_goods_obj[i.name].count++;
        if (i.name == name && !((i.name) in cart_goods_obj)){
            cart_goods_obj[i.name]=i;
            cart_goods_obj[i.name].count=1;
        }
    });
    set_local(cart_goods_obj);
}