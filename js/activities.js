$(document).ready(function(){
	$('.slider').slider({
      	height: 302,
      	indicators:true
    });
});
window.onload=function(){
	$('.left_list_item ').click(function(){
		jumpTo($(this).attr('id'));
	});
};

function jumpTo(tabID){
	$('.left_list_item').attr('class','left_list_item collection-item green-text');
	document.getElementById(tabID).setAttribute('class','left_list_item collection-item active green');
}