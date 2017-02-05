/**
 * Created by fanj on 16-8-1.
 */
$(document).ready(function(){
    jump_page();
    write_cart_list();
    change_input();
    display_cart_count();
    display_sum_money();
    input_enter_null();
});
function jump_page() {
    $("#homepage").click(function(){
        get_homepage();});
    $("#go_list").click(function(){
        get_goods_list();});
    $("#goods_list").click(function(){
        get_goods_list();});
    $("#pay").click(function(){
        get_pay();  });
}
function get_goods_list() {
    var page="../html/goods_list.html";
    go_page(page)
}
function get_homepage() {
    var page="../html/homepage.html";
    go_page(page)
}
function get_pay() {
    var page="../html/pay.html";
    go_page(page)
}
function go_page(page) {
     window.location.href=page;
}
function display_cart_count() {
    var count=get_local("count")||0;
    $("#count").html(count);
}
function get_local(key) {
    return JSON.parse(localStorage.getItem(key));
}
function set_local(key) {
    if(typeof(key)=="number") {
        localStorage.setItem("count",JSON.stringify(key))
    }
    else{
        localStorage.setItem("cart_goods",JSON.stringify(key));
    }
}
function write_cart_list() {
    var cart_goods_obj=get_local("cart_goods");
    _.each(cart_goods_obj,function (one_goods) {
        var name=one_goods.name;
        get_free_info(name);
    });
    cart_goods_obj=get_local("cart_goods");
    var cart_list=_.values(cart_goods_obj);
    $("#cart_list").tmpl(cart_list).appendTo("table");
}
function change_input() {
    var cart_goods_obj=get_local("cart_goods");
    $("td div button").on("click",function(){
        var name =$(this).attr("class");
        var sign=Number($(this).text()+1);
        var one_kind_count=parseInt($(this).siblings("input").val())+sign;
        $(this).siblings("input").val(one_kind_count);
        cart_goods_obj[name].count=$(this).siblings("input").val();
        set_local(cart_goods_obj);
        update(name);
        cart_null_jump_list();
    });
    $("input").on("input propertychange",function () {
        var name =$(this).attr("class");
        cart_goods_obj[name].count=$(this).val();
        set_local(cart_goods_obj);
        update(name);
    });
}
function input_enter_null() {
    $("input").on("blur",function () {
        var cart_goods_obj=get_local("cart_goods");
        _.each(cart_goods_obj,function (one_goods) {
            if(one_goods.count==""){
                $("#"+one_goods.name) .remove();
                delete (cart_goods_obj[one_goods.name]);
            }
        })
        set_local(cart_goods_obj);
        cart_null_jump_list();
    })
}
function update(name) {
    display_subtotal(name);
    change_input_change_cart_count();
    delete_tr();
    display_sum_money();
}
function delete_tr() {
    var cart_goods_obj=get_local("cart_goods");
    _.each(cart_goods_obj,function (one_goods) {
        if(one_goods.count=="0"){
            $("#"+one_goods.name) .remove();
            delete (cart_goods_obj[one_goods.name]);
        }
    })
    set_local(cart_goods_obj)
}
function cart_null_jump_list(){
    var sum_count=get_local("count");
    if(sum_count==0){
        get_goods_list();
        localStorage.clear();
    }
}
function change_input_change_cart_count() {
    var cart_goods_obj=get_local("cart_goods");
    var count=0;
    _.each(cart_goods_obj,function (one_goods) {
        count+=Number(one_goods.count);
    });
    set_local(count);
    display_cart_count();
}
function display_subtotal(name) {
    var subtotal=get_free_info(name);
    $("#"+name+" #subtotal").html(subtotal);
}
function get_free_info(name) {
    var cart_goods_obj=get_local("cart_goods");
    var price=cart_goods_obj[name].price;
    var one_kind_count=cart_goods_obj[name].count;
    var result=determine_whether_deals(name,price,one_kind_count);
    var subtotal=result[0];
    var free_count=result[1];
    var free_money=result[2];
    cart_goods_obj[name].subtotal=subtotal;
    cart_goods_obj[name].free_count=free_count;
    cart_goods_obj[name].free_money=free_money;
    set_local(cart_goods_obj);
    return subtotal;
}
function determine_whether_deals(name,price,one_kind_count) {
    var names=["可口可乐","雪碧","方便面"];
    var subtotal;
    var free_count=0;
    var free_money=0;
    if(names.indexOf(name)!=-1 && one_kind_count>=3){
        free_count=Math.floor(one_kind_count/3);
        free_money=free_count*price;
        var pay_count=one_kind_count-free_count;
        subtotal=pay_count*price+"元"+"(原价:"+"&nbsp;&nbsp;&nbsp;&nbsp;"+one_kind_count*price+"元)";
    }
    else{
        subtotal=one_kind_count*price+"元";
    }
    return  [subtotal,free_count,free_money];
}
function display_sum_money() {
    var sum_money=get_sum_money();
    $("#total").html(sum_money.toFixed(2));
}
function get_sum_money() {
    var cart_goods_obj=get_local("cart_goods");
    var sum_money=0;
    _.each(cart_goods_obj, function (one_goods) {
            var one_kind_money_str=one_goods.subtotal;
            var one_kind_money=parseFloat(one_kind_money_str.split("元",1));
            sum_money+=one_kind_money;
        }
    );
    localStorage.setItem("sum_money",sum_money);
    return sum_money;
}
