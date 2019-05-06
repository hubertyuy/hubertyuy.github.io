
(function($){
	var $body = $('body');
	//メニュー設定
	var hash = location.hash;
	var $gn = $('#globalNavi');
	var $ln = $gn.find('ul.localNavi').hide();


	//localNaviがクリックされたら、hashタグを変更する
	var $ol = $('.outerList');
	$ol.delegate('ul.localNavi','click',function(){
		var newQuery = $(this).parents('li').attr('id');
		location.hash = newQuery;
	});

	var cur = $gn.find(hash);

	var initMenu = function(){
		$ln.hide();
		$gn.find("li.active").removeClass("active");
	};

	$gn.delegate('ul.localNavi','click tap',function(e){
		e.stopPropagation();
	});
	$(window).delegate($body,'click tap',function(){
		initMenu();
	});
	$gn.delegate('li.outerList','click tap',function(e){
		e.stopPropagation();
		var target = $(this);
		var targetClass = target.attr("class");
		var disp = target.attr("id");
		if(target.hasClass("active")){
			target.removeClass("active");
			target.find('ul.localNavi').hide();
		}else{
			var dispLn = target.find('ul.localNavi');
			//$ln.hide();//初期化
			//$gn.find("li.active").removeClass("active");
			initMenu();
			if(isPhone){
				$('body').animate({ scrollTop: target.offset().top - 50 });
			}else{
				var dispLnH = dispLn.height();
				var dispLnY = target.offset().top;
				var bodyH = $body.height();
				var dispLnH_Revised;
				console.log(targetClass.indexOf("sita"));
				//bodyH >= dispLnH + dispLnY ?
				targetClass.indexOf("sita") === -1 ?
					dispLnH_Revised = dispLnY - 10:
					dispLnH_Revised = dispLnY - dispLnH;
				if(dispLnH_Revised < 0){
					dispLnH_Revised = 0;
				}
				dispLn.css({
					top:dispLnH_Revised
				});
			}
			dispLn.fadeIn("fast");
			target.addClass("active");
		}
	});
	cur.trigger("click");



})(jQuery);
