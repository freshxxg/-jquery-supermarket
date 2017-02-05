/**
 * Created by lenovo on 16-7-26.
 */
$(document).ready(function(){
    jump_page();
    display_cart_count();
});
function get_goods_list() {
    var page="../html/goods_list.html";
    go_page(page)
}
function get_cart() {
    var page="../html/cart.html";
    go_page(page)
}
function go_page(page) {
    window.location.href=page;
}
function jump_page() {
    $("#go").click(function(){
        get_goods_list();});
    $("#go_list").click(function(){
        get_goods_list();});
    $("#goods_list").click(function(){
        get_goods_list();});
    $("#cart").click(function(){
        var count=localStorage.getItem("count")||0;
        (count>0) ? get_cart() : alert("您的购物车还没有添加商品");
    });
}
function display_cart_count() {
    var count=localStorage.getItem("count")||0;
    $("#count").html(count);
}


