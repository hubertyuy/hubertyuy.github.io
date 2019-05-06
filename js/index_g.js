
(function($){
	var $body = $('body');
	//メニュー設定
	var hash = location.hash;
	var $gn = $('#globalNavi');
	var $ln = $gn.find('ul.localNavi').hide();
	var lnx = 420;//localNaviの表示位置
	var pw = $('#photoWrapper');

	//localNaviがクリックされたら、hashタグを変更する
	var $ol = $('.outerList');
	var olBg = $ol.css('backgroundColor');
	var olCr = $ol.css('color');
	$ol.delegate('ul.localNavi','click',function(){
		var newQuery = $(this).parents('li').attr('id');
		location.hash = newQuery;
	});

	var cur = $gn.find(hash);

	var initMenu = function(){
		$ln.hide();
		$ol.css({
			backgroundColor:olBg,
			color:olCr
		});
		$gn.find("li.active").removeClass("active");
	};

	$gn.delegate('ul.localNavi','click tap',function(e){
		e.stopPropagation();
	});
	$(window).delegate($body,'click tap',function(){
		initMenu();
	});

	$(window).resize(function(){
		pw.css('display') === "none" ? //while sp mode
			$ln.css({left:0}):
			$ln.css({left:lnx});
	});

	$gn.delegate('li.outerList','click tap',function(e){
		e.stopPropagation();
		var target = $(this);
		var targetClass = target.attr("class");
		var disp = target.attr("id");
		if(target.hasClass("active")){
			target.removeClass("active");
			initMenu();
		}else{
			var dispLn = target.find('ul.localNavi');
			var lny;
			initMenu();
			target.addClass("active");
			if(checkPhone()){
				$body.animate({ scrollTop: target.offset().top - 50 });
			}else{
				var others = target.parent().find('.outerList').not('.active');
				others.css({
					backgroundColor:"#111",
					color:'#ababab'
				});
				target.hasClass('sita') ?
					lny = 0:
					lny = target.offset().top;

				dispLn.css({
					top:lny,
					left:lnx
				});
			}
			dispLn.fadeIn("fast");
		}
	});

	cur.trigger("click");


})(jQuery);
