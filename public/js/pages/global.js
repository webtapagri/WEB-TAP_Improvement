function globalAlert(customSettings){
	var defaultSettings = {
		title:"Improvement Alert",
		type:"success",
		msg:"",
		customFooter:""
	};
	var settings = $.extend({},defaultSettings,customSettings);
	var parent_modal = $("#globalModal");
	$(".modal-footer",parent_modal).remove();
	$(".modal-header",parent_modal).removeAttr("class").addClass("modal-header").addClass("alert-"+settings.type);
	$(".modal-title",parent_modal).html(settings.title);
	if(settings.msg&&settings.msg!=""){
		var customBody = $("<div class='modal-body'>");
		customBody.html(settings.msg);
		$(".modal-content",parent_modal).append(customBody);
	}
	if(settings.customFooter&&settings.customFooter!=""){
		var customFooter = $("<div class='modal-footer'>");
		customFooter.html(settings.customFooter);
		$(".modal-content",parent_modal).append(customFooter);
	}
	parent_modal.modal('show');
}