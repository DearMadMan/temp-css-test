 //$(document).ready(function() {
 // category
 //initialize swiper when document ready  
 var mySwiper = new Swiper('.nav-warp', {
     // Optional parameters
     direction: 'vertical',
     slidesPerView: 'auto'

 });
 // dishes
 var dishes = new Swiper('.foods', {
     // Optional parameters
     direction: 'vertical',
 })


 // 模型定义 

 var app = {};
 // 菜品模型
 app.dish_model = Backbone.Model.extend({
     default: {
         id: 1,
         dish_name: '参茶',
         dish_type_id: 8,
         shop_price: 8.9,
         main_picture: '/images/test.jpg',
         dish_attribute: '少辣',
         dish_description: '姜汤一碗',

     }
 });
 // 菜品集合模型
 app.dish_collection = Backbone.Collection.extend({
     model: app.dish_model
 });

 // 菜品集合实例
 app.dishes = new app.dish_collection;

 // 菜品视图模型
 app.dish_view = Backbone.View.extend({
     model: app.dish_model,
     tagName: 'div',
     className: 'swiper-slide',
     events: {
         "click": "test"
     },
     initialize: function() {
         //this.render();
     },
     render: function() {
         this.$el.html(this.template(this.model.toJSON()));
         return this;
     },
     template: _.template($("#dishes_template").html()),
     test: function() {
         console.log('click');
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
     model:app.dish_category,
     template: _.template('<a href="#"><%= type_name %></a>'),
     initialize: function() {

     },
     render: function() {
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
     dish_type_id: 8,
     shop_price: 9.9,
     main_picture: '/images/test.jpg',
     dish_attribute: '少辣',
     dish_description: '姜汤一碗',

 }, {
     id: 2,
     dish_name: '西湖牛肉羹',
     dish_type_id: 8,
     shop_price: 8.5,
     main_picture: '/images/test.jpg',
     dish_attribute: '少辣',
     dish_description: '姜汤一碗',

 }, {
     id: 3,
     dish_name: '紫菜蛋汤',
     dish_type_id: 8,
     shop_price: 7.9,
     main_picture: '/images/test.jpg',
     dish_attribute: '少辣',
     dish_description: '姜汤一碗',

 }, {
     id: 4,
     dish_name: '参茶',
     dish_type_id: 8,
     shop_price: 9.9,
     main_picture: '/images/test.jpg',
     dish_attribute: '少辣',
     dish_description: '姜汤一碗',

 }, ];
 var categories = [{
         id: 1,
         type_name: '蛋汤',
     }, {
         id: 2,
         type_name: '肉食'
     }

 ];

 _.each(dishes, function(data) {
     app.dishes.add(data);
 });

 _.each(categories, function(data) {
     app.categories.add(data);
 });







 //});
