/**
 * Created by fanj on 16-8-15.
 */
$(document).ready(function(){
    jump_page();
    display_cart_count();
    CurentTime();
    write_cart_list();
    write_free_list_table();
    display_free_sum_money();
    display_sum_money();
    click_confirm_pay();
});
function jump_page() {
    $("#homepage").click(function(){
        get_homepage();});
    $("#go_list").click(function(){
        get_goods_list();});
    $("#goods_list").click(function(){
        get_goods_list();});
    $("#cart").click(function(){
        get_cart();  });
}
function get_goods_list() {
    var page="../html/goods_list.html";
    go_page(page)
}
function get_homepage() {
    var page="../html/homepage.html";
    go_page(page)
}
function get_cart() {
    var page="../html/cart.html";
    go_page(page)
}
function go_page(page) {
    window.location.href=page;
}
function get_local(key) {
    return JSON.parse(localStorage.getItem(key));
}
function display_cart_count() {
    var count=get_local("count");
    $("#count").html(count);
}
function CurentTime(){
    var now_times = moment().format('YYYY年MM月DD号 HH:mm:ss');
    $(".current_time").html(now_times);
}
function write_cart_list() {
    var cart_goods_obj=get_local("cart_goods");
    var cart_list=_.values(cart_goods_obj);
    $("#cart_list").tmpl(cart_list).appendTo(".cart_table");
}
function write_free_list_table() {
    var free_goods= judgment_free_goods();
    $("#free_list").tmpl(free_goods).appendTo(".free_table");
}
function display_free_sum_money() {
    var free_goods= judgment_free_goods();
    var free_sum_money=0;
    _.each (free_goods,function (one_free_goods) {
        free_sum_money+=Number(one_free_goods.free_money);
    })
    $("#save").html(free_sum_money.toFixed(2))
}
function judgment_free_goods() {
    var cart_goods_obj=get_local("cart_goods");
    var names=["可口可乐","雪碧","方便面"];
    var free_goods=[]
    _.each(names,function (name) {
        if(name in cart_goods_obj &&cart_goods_obj[name].count>=3){free_goods.push(cart_goods_obj[name])}
    });
    remove_free_list(free_goods);
    return free_goods;
}
function remove_free_list(free_goods) {
    if(free_goods.length==0){
        $(".free_goods,.free_table,.free_money").remove()
    };
}
function display_sum_money() {
    var sum_money=get_local("sum_money");
    $("#total").html(Number(sum_money).toFixed(2));
}
function click_confirm_pay() {
    $("#confirm").on("click",function () {
        clear_local_data();
        get_goods_list();
    })
}
function clear_local_data() {
    localStorage.clear();
}