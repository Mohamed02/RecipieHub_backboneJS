$(function(){
var foodie_model= Backbone.Model.extend({
});

/* var food_1= new foodie_model({"id":1,name:"Dosa", rating:3, category:"south", image:"images/Dosa.jpg",recipe:"If fresh mint is not available, you can use a couple teaspoons of dried mint from herbal mint tea. You can also vary the vegetables depending on what you have on hand. Spring peas in their pods instead of shucked peas, for example. Or you could add some chopped fresh zucchini or corn. My mother often puts a couple extra tablespoons of chopped fresh mint directly into the soup. Feel free to substitute ground turkey for the ground beef, we do it often."});
var food_2= new foodie_model({"id":2,name:"Puttu", rating:3, category:"south", image:"images/puttu.jpg",recipe:"If fresh mint is not available, you can use a couple teaspoons of dried mint from herbal mint tea. You can also vary the vegetables depending on what you have on hand. Spring peas in their pods instead of shucked peas, for example. Or you could add some chopped fresh zucchini or corn. My mother often puts a couple extra tablespoons of chopped fresh mint directly into the soup. Feel free to substitute ground turkey for the ground beef, we do it often."});
var food_3= new foodie_model({"id":3,name:"Kappa", rating:3, category:"south", image:"images/Kappa.jpg",recipe:"If fresh mint is not available, you can use a couple teaspoons of dried mint from herbal mint tea. You can also vary the vegetables depending on what you have on hand. Spring peas in their pods instead of shucked peas, for example. Or you could add some chopped fresh zucchini or corn. My mother often puts a couple extra tablespoons of chopped fresh mint directly into the soup. Feel free to substitute ground turkey for the ground beef, we do it often."});
var food_4= new foodie_model({"id":4,name:"Sundae", rating:3, category:"dessert",image:"images/sundae.jpg",recipe:"If fresh mint is not available, you can use a couple teaspoons of dried mint from herbal mint tea. You can also vary the vegetables depending on what you have on hand. Spring peas in their pods instead of shucked peas, for example. Or you could add some chopped fresh zucchini or corn. My mother often puts a couple extra tablespoons of chopped fresh mint directly into the soup. Feel free to substitute ground turkey for the ground beef, we do it often."});
var food_5= new foodie_model({"id":5,name:"Dum Biriyani", rating:3, category:"north",image:"images/Dum.jpg",recipe:"If fresh mint is not available, you can use a couple teaspoons of dried mint from herbal mint tea. You can also vary the vegetables depending on what you have on hand. Spring peas in their pods instead of shucked peas, for example. Or you could add some chopped fresh zucchini or corn. My mother often puts a couple extra tablespoons of chopped fresh mint directly into the soup. Feel free to substitute ground turkey for the ground beef, we do it often."});
var food_6= new foodie_model({"id":6,name:"ChocoBurger", rating:3, category:"dessert",image:"images/choco-burger.jpg",recipe:"If fresh mint is not available, you can use a couple teaspoons of dried mint from herbal mint tea. You can also vary the vegetables depending on what you have on hand. Spring peas in their pods instead of shucked peas, for example. Or you could add some chopped fresh zucchini or corn. My mother often puts a couple extra tablespoons of chopped fresh mint directly into the soup. Feel free to substitute ground turkey for the ground beef, we do it often."});
 */


var foodie_collection= Backbone.Collection.extend({
model:foodie_model,
url:"dish.json"
});

//var food_all=new foodie_collection([food_1,food_2, food_3,food_4, food_5, food_6]);
//var food_all=new foodie_collection();


	console.log("*****************");
		var food_all=new foodie_collection();
		


var foodie_view= Backbone.View.extend({
	initialize: function(){
	this.render(); 
		},
	el:$('#main'),
	template:$('#food_list_templates').html(),
	render: function(){
	  this.el.html(_.template(this.template, {'dishes': this.collection.toJSON()}));
	  return this;
				},
	clicked:function(){
	console.log("the id is clicked");
	}
});

var foodie_description_view=Backbone.View.extend({

	initialize:function(){
		this.render();  
	},
	e1:$('#main'),
	template:$('#food_item_description').html(),
	render: function(){
		  this.el.html(_.template(this.template,this.model.toJSON()));
		  return this;
				}

});



var foodie_router= Backbone.Router.extend({
	routes:{
	"dish/:id": "dish",
	"": "index",
	"category/:type":"groupdishes",
	"check": "check"
	},
	dish:function(id){
	console.log("the index function called"+id);
	console.log("the length of food collection is "+food_all.length);
	var dish_model;
	food_all.forEach(function(model){
	if(model.get("id")==id){
	dish_model=model;
	return model;
	}
	});
	console.log("the selected model is "+dish_model.get("name"));
	var mainview2= new foodie_description_view({el:$('#main'), model:dish_model});
	},
	index: function(){
	
	food_all.fetch({
		success: function(food_all){
		if(food_all.length){
		console.log("the data retrieved successfully and the length is"+ food_all.length);
		}
		else{
		console.log("the data retrieve failed");
		}
		},
		error: function(){
		console.log("the data retrieve error");
		}
		}).done(function(){
		var mainview= new foodie_view({el:$('#main'),collection:food_all});
		});
	
	
	

	},
	groupdishes:function(category){
	var food_selected= new foodie_collection();
	if(category){
	food_all.forEach(function(model){
	if(model.get("category")==category){
	food_selected.add(model);
	return model;
	}
	});
	}
	var mainview= new foodie_view({el:$('#main'),collection:food_selected});
	},
	intro: function(value){
	console.log("clicked something"+ value);
	var food_selected= new foodie_collection();
	if(value){
	value=value.toLowerCase();
	console.log("total number of food val is "+ food_all.length);
	food_all.forEach(function(model){
	console.log("index of puttu is "+  model.get("name")+"the match is"+ (model.get("name")).indexOf(value) );
	if((model.get("name")).toLowerCase().indexOf(value)!=-1 || (model.get("category")).toLowerCase().indexOf(value)!=-1){
	console.log("insied if condition");
	food_selected.add(model);
	return model;
	}
	});
	console.log("clicked something food selected"+ food_selected.length);
	}
	var mainview= new foodie_view({el:$('#main'),collection:food_selected});
	},
	check: function(){
	},								
	initialize: function(){
	return this;
	}	

});
  var router1 = new foodie_router();
   Backbone.history.start();
   $('#homebtn').click(function(){
   router1.index();
   });
   $('#searchbtn').click(function(){
   router1.intro($('#searchval').val());
   });
   
})
