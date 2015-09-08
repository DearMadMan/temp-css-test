// $(document).ready(function(){

var app = {};


// clear localstore
app.clear = function() {
    console.log('store clear' + (new Date));
    app.store.clear();
}

// alias localStorage
app.store = localStorage;

// get order dishes
app.dishes = app.store.getItem('dishes');
app.dishes_set_time = app.store.getItem('set_dishes_time');

// detemine if submit dishes time is to long
app.now = (new Date).getTime();

if (app.dishes_set_time < app.now - 60 * 60 * 2 * 1000) {
    console.log(app.dishes_set_time + ":" + (app.now - 60 * 60 * 2 * 1000));
    app.clear();
    window.location.href = "dishes.html";
}
// console.log(app.dishes_set_time+":"+ (app.now-60*60*2*1000));


// dish model
app.dish_mode = Backbone.Model.extend({
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

app.dish_collection = Backbone.Collection.extend({
    model: app.dish_mode
});

app.dishes_string = app.dishes;
app.dishes = new app.dish_collection;
app.dishes_object = JSON.parse(app.dishes_string);



app.dish_view = Backbone.View.extend({
    tagName: 'tr',
    model: app.dish_mode,
    template: _.template($("#tr_template").html()),
    initialize: function() {
        this.listenTo(this.model, "all", this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

app.orders_view = Backbone.View.extend({
    el: $("#orders"),
    template: _.template($("#order_template").html()),
    events:{
        'click .dining-table-edit':'tableEdit'
    },
    tableEdit:function(){
        var table=app.store.getItem('dining_table');
        if(!_.isNaN(parseInt(table))){
            table=table;
            $(".dish-table").val(table);
        }
        app.showModal();
    }
    ,
    initialize: function() {
        console.log('orders_view.initialize');
        this.listenTo(app.dishes, "all", this.render);
    },
    getDiningTable:function(){
        var table=app.store.getItem('dining_table');
        var number="待定";
        if(!_.isNaN(parseInt(table))){
            nubmer=table;
        }
        return nubmer;
    },
    render: function() {
        this.$el.html(this.template({
          
                order_amount: this.getAmount(),
                dining_table: this.getDiningTable() 
        }));
        // append tr-view
        this.$el.find("tbody").html('');
        app.dishes.each(function(model){
            var tr_view=new app.dish_view({model:model});
            this.$el.find("tbody").append(tr_view.render().$el);
        },this);
    },
    getAmount: function() {
        // get orders amount
        var amount = 0;
        app.dishes.each(function(model) {
            amount += parseFloat(model.get('shop_price')) * parseInt(model.get('sold'));
        });
        return amount.toFixed(2);
    }
});

// orders view 

app.orders_view = new app.orders_view;

_.each(app.dishes_object, function(model) {
    app.dishes.add(model);
})

app.SHOW_MODAL=true;
app.HIDE_MODAL=false;
app.modalFunc=function(type){
    if(type){
        $("#modal-bg").removeClass('hide');
        $("#dish-modal").removeClass('hide');
    }else{
        $('#modal-bg').addClass('hide');
        $("#dish-modal").addClass('hide');
    }
}
app.showModal=function(){
    app.modalFunc(app.SHOW_MODAL);
}

app.hideModal=function(){
    app.modalFunc(app.HIDE_MODAL);
}
// determine dining-table nubmer
app.dining_table=app.store.getItem('dining_table');
if(_.isUndefined(app.dining_table)||_.isNull(app.dining_table)){
    app.showModal();
}

$(".btn-table").click(function(){
    // validate input value
    var table=$('.dish-table');
    if(_.isNaN(parseInt(table.val()))){
        table.val('');
        table.focus();
        return;
    }
    app.store.setItem('dining_table',table.val());
    app.hideModal();
    app.orders_view.render();
})




// });
