 //$(document).ready(function() {
 // categroy
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


 // 

 var app = {};
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
 app.dish_collection = Backbone.Collection.extend({
     model: app.dish_model
 });

 app.dishes = new app.dish_collection;

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

 app.dishes_view = Backbone.View.extend({
     el: $('#dishes'),
     initialize: function() {
         this.listenTo(app.dishes, 'all', this.render);
     },
     render: function() {
             this.$el.html('');
            app.dishes.each(function(data){
                 var view= new app.dish_view({model:data});
                 app.d=view;
                 this.$el.append(view.render().$el);
            },this);

     },

 });
 app.dishes_view = new app.dishes_view;



 // test data
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
 var categroies = [{
         id: 1,
         type_name: '蛋汤',
     }, {
         id: 2,
         type_name: '肉食'
     }

 ];

 _.each(dishes, function(data) {
     app.dishes.add(data);
 })









 //});
