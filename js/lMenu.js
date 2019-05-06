
(function($){
	var $body = $('body');
	//メニュー設定
	var $gn = $('#globalNavi');
	var $ln = $gn.find('ul.localNavi').hide();
	
	var lM = $('#lMenu');
	var bt = $('#lMenuButton').find('img');
	var wrap = $('#wrapper');
	var lMenuWrapper;

	//画像読み込みが終わったらlMenuの高さを調整
	$(window).load(function(){
		lM.height(wrap.height() + 100);
	})

	//localNaviがクリックされたら、hashタグを変更する
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

	$gn.delegate('li.outerList','click tap',function(e,pankuzu){
		e.stopPropagation();
		var target = $(this);
		var targetClass = target.attr("class");
		var disp = target.attr("id");
		var dispLn = target.find('ul.localNavi');
		var pankuzuY;
		if(target.hasClass("active")){
			target.removeClass("active");
			dispLn.hide();
		}else if(pankuzu == 'pankuzu'){//pankuzuからのclick
			initMenu();
			if(isPhone){
				dispLn.css({
					top:80,
					left:290,
					display:'block',
					width:$body.width() * 0.9
				});
			}else{
				dispLn.css({
					top:80,
					left:380,
					display:'block'
				});
			}
			dispLn.fadeIn('fast');
			target.addClass('active');
		}else{
			//$ln.hide();//初期化
			//$gn.find("li.active").removeClass("active");
			initMenu();
			if(isPhone){
				$body.animate({ scrollTop: target.offset().top - 50 });
			}else{
				var dispLnH = dispLn.height();
				var dispLnY = target.offset().top - 60;
				var bodyH = $body.height();
				var dispLnH_Revised;
				//bodyH >= dispLnH + dispLnY ?
				targetClass.indexOf("sita") === -1 ?
					dispLnH_Revised = dispLnY + 20:
					dispLnH_Revised = dispLnY - dispLnH + 30;
				if(dispLnH_Revised < 0){
					dispLnH_Revised = 0;
				}
				dispLn.css({
					top:dispLnH_Revised,
					left:220
				});
			}
			dispLn.fadeIn("fast");
			target.addClass("active");
		}
	});
	//wrapperの大きさが変わるため
	$(window).resize(function(){
		if($(this).width() > 650){
			lMenuWrapper && lMenuManager.removeMenu();
			lM.height(wrap.height() + 100);
		}
	});
	
	//パンくずドロップメニュー表示
	$('#pankuzu').find('.root').click(function(e){
		var attr = $(this).find('a').attr('href');
		e.preventDefault();
		e.stopPropagation();
		var target = attr.split("#");
		$('#' + target[1]).trigger('click','pankuzu');
	});

})(jQuery);
