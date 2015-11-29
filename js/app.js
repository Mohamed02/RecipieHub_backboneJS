$(function(){

var Todo= Backbone.Model.extend({
defaults:{
title:"",
completed:false
}
});
var myTodo=new Todo({
title:"check attribute property of logged mails",
})

var TodoView= Backbone.View.extend({
tagName:'ul',
id: 'todoso',
todoTpl: _.template($('#item-template').html()),
events:{
'dblclick label':'edit',
'keypress .edit':'updateOnEnter',
'blur .edit':'close',
},
initialize: function(){
this.$el = $('#todo');
},
render: function() {
this.$el.html(this.todoTpl(this.model.toJSON()));
this.input=this.$('.edit');
return this;
},
edit: function(){

},
updateOnEnter:function(){

},
close: function(){

}
});

var todoView= new TodoView({model:myTodo});
todoView.render();


var testView= Backbone.View.extend({
tagName:'ul',
className:'just',
id:'finish',
initialize: function(){
this.$el = $('#test2');

},
render: function() {
this.$el.html(_.template("<div>just for joke</div>"));
//return this;
},
});

var testview = new testView();
testview.setElement($('#test'));
console.log("The test view template is "+ testview.el);
testview.render();

});


