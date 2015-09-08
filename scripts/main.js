 //$(document).ready(function() {
 // category
 //initialize swiper when document ready  
 var mySwiper = new Swiper('.nav-warp', {
     // Optional parameters
     direction: 'vertical',
     slidesPerView: 'auto'

 });



 // 模型定义 

 var app = {};



 app.refreashDishSwiper = function() {
     return new Swiper('.foods', {
         // Optional parameters
         direction: 'vertical',
     });
 }

 // 菜品模型
 app.dish_model = Backbone.Model.extend({
     defaults: {
         id: 1,
         dish_name: '参茶',
         dish_type_id: 8,
         shop_price: 8.9,
         main_picture: '/images/test.jpg',
         dish_attribute: '少辣',
         dish_description: '姜汤一碗',
         sold: 0

     }
 });
 // 菜品集合模型
 app.dish_collection = Backbone.Collection.extend({
     model: app.dish_model
 });

app.DISH_ADD=true;
app.DISH_SUB=false;
 // 菜品集合实例
 app.dishes = new app.dish_collection;

 // 菜品视图模型
 app.dish_view = Backbone.View.extend({
     model: app.dish_model,
     tagName: 'div',
     className: 'swiper-slide',
     events: {
         "click .dish-img": "showDescription",
         "click .glyphicon-minus": "subSlod",
         "click .glyphicon-plus": "addSlod",
     },
     subSlod: function() {
        this.computedSold(app.DISH_SUB);
     },
     addSlod: function() {
         this.computedSold(app.DISH_ADD);
     },
     computedSold: function(type) {
         var sold = this.model.get("sold");
         sold = parseInt(sold);
         if (type) {
             sold += 1;
         } else {
             sold -= 1;
         }
         sold = sold <= 0 ? 0 : sold;
         this.model.set('sold', sold);
     },
     initialize: function() {
         this.listenTo(this.model, "change", this.render);
     },
     render: function() {
         this.$el.html(this.template(this.model.toJSON()));
         return this;
     },
     template: _.template($("#dishes_template").html()),
     showDescription: function(model) {
         app.setModal(this.model);
         app.modal.show();
     }
 });
 // 菜品视图实例 
 app.dishes_view = Backbone.View.extend({
     el: $('#dishes'),
     initialize: function() {
         this.listenTo(app.dishes, 'all', this.render);
     },
     render: function() {
         this.$el.html('');
         app.dishes.each(function(data) {
             var view = new app.dish_view({
                 model: data
             });
             this.$el.append(view.render().$el);
         }, this);

     },

 });
 // 菜品视图实例
 app.dishes_view = new app.dishes_view;


 // 菜品分类相关

 // 菜品类型模型
 app.dish_category = Backbone.Model.extend({
     defaults: {
         id: 1,
         type_name: '蛋汤',
     }
 });
 // 菜品类型视图模型
 app.dish_category_view = Backbone.View.extend({
     tagName: "div",
     className: "swiper-slide tag",
     model: app.dish_category,
     template: _.template('<a href="#"><%= type_name %></a>'),
     events: {
         'click a': 'active'
     },
     active: function(e) {
         e.preventDefault();
         app.dishes.set(app.dishes_bak.filter(function(model) {
             return this.model.get('id') == model.get('dish_type_id');
         }, this));
         // remove other tag's active class
         app.categories.each(function(model) {
                 model.set("active", false);
             })
             // add active class
         this.model.set('active', true);
         // swiper
         app.refreashDishSwiper();
     },
     initialize: function() {
         this.listenTo(this.model, "change", this.render);
     },
     render: function() {
         this.el.className = this.model.get('active') ? "swiper-slide tag active" : "swiper-slide tag";
         this.$el.html(this.template(this.model.toJSON()));
         return this;
     },

 });
 // 菜品集合模型
 app.dish_category_collection = Backbone.Collection.extend({
     model: app.dish_category
 });
 app.categories = new app.dish_category_collection;
 // 菜品分类视图
 app.category_view = Backbone.View.extend({
     el: $('#categories'),
     initialize: function() {
         this.listenTo(app.categories, 'all', this.render);
     },
     render: function() {
         this.$el.html('');
         app.categories.each(function(data) {
             var view = new app.dish_category_view({
                 model: data
             });
             this.$el.append(view.render().$el);
         }, this);
     }
 });
 app.category_view = new app.category_view;
 // 测试数据
 var dishes = [{
     id: 1,
     dish_name: '姜汤',
     dish_type_id: 2,
     shop_price: 9.9,
     main_picture: './images/s01.jpg',
     dish_attribute: '少辣',
     dish_description: '姜汤一碗',

 }, {
     id: 2,
     dish_name: '西湖牛肉羹',
     dish_type_id: 2,
     shop_price: 8.5,
     main_picture: './images/s02.jpg',
     dish_attribute: '少辣',
     dish_description: '西湖牛肉羹一碗',

 }, {
     id: 3,
     dish_name: '紫菜蛋汤',
     dish_type_id: 1,
     shop_price: 7.9,
     main_picture: './images/s03.jpg',
     dish_attribute: '少辣',
     dish_description: '紫菜蛋汤一碗',

 }, {
     id: 4,
     dish_name: '参茶',
     dish_type_id: 1,
     shop_price: 9.9,
     main_picture: './images/s04.jpg',
     dish_attribute: '少辣',
     dish_description: '参茶一碗',

 }, ];
 var categories = [{
         id: 1,
         type_name: '蛋汤',
         active: false
     }, {
         id: 2,
         type_name: '肉食',
         active: false
     }

 ];

 _.each(dishes, function(data) {
     app.dishes.add(data);
 });

 _.each(categories, function(data) {
     app.categories.add(data);
 });



 // modal

 app.modal = {};
 app.modal.show = function() {
     $("#modal-bg").removeClass('hide');
     $("#dish-modal").removeClass('hide');
 }
 app.modal.hide = function() {
     $('#modal-bg').addClass('hide');
     $("#dish-modal").addClass('hide');
 }
 app.setModal = function(model) {
         $("#dish-modal .dish-title p").text(model.get('dish_name'));
         $("#dish-modal .dish-image img").attr("src", model.get('main_picture'));
         $("#dish-modal .dish-p-des").text(model.get('dish_description'));
     }
     /*modal hide function*/
 $("#modal-bg").click(app.modal.hide);
 $("#dish-modal").click(app.modal.hide);

// cart model
app.cart=Backbone.Model.extend({
    defaults:{
        amount:0
    }

});


app.submit=function(){
    // 判断总额 
    var amount=app.cart_view.model.get('amount');
    if(parseInt(amount)>=0){
        // 存储所点餐饮信息
        var dishes=app.dishes_bak.filter(function(model){
            return parseInt(model.get('sold'))>0;
        });
        if(dishes.length>0){
            // 存档到loaclStorage
            localStorage.setItem('dishes',JSON.stringify(dishes));
            localStorage.setItem('set_dishes_time',(new Date()).getTime());
            window.location.href="order.html";
        }
    }
}

app.cart.view=Backbone.View.extend({
    el:$("#cart"),
    template:_.template($("#cart_template").html()),
    initialize:function(){
        this.model=new app.cart;
        this.listenTo(app.dishes_bak,"all",this.computed);
    },
    events:{
        'click .btn-order' : 'sbumit'
    },
    sbumit:function(){

        app.submit();

    },
    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
    },
    computed:function(){
        var amount=0;
        app.dishes_bak.each(function(model){
            amount+=parseInt(model.get("sold"))*parseFloat(model.get("shop_price"));
        });
        this.model.set('amount',amount.toFixed(2));
        if(amount>0){
            this.$el.removeClass('hide');
        }
        else
        {
            this.$el.addClass('hide');
        }
        this.render();
    }
})



 // 存储所有餐饮信息 用于分类输出
 app.dishes_bak = app.dishes.clone();

 app.cart_view=new app.cart.view;

 //  fire dishes swiper
 app.refreashDishSwiper();

 //});
