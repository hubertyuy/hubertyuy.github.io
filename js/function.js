var isPhone = 0;
var checkPhone;
var ttQuery = null;
(function($){
	var hashArr;
	var hash;
	var ltIe8 = !jQuery.support.opacity;
	var $body = $('body');
	var $wrapper = $('#wrapper');
	var $lMenu = $('#lMenu');
	var $pankuzu = $('#pankuzu');
	var fadeImg;

	//IE8未満判定
	if(ltIe8){
		$body.addClass("cantSvg");
	}

	//retina対応
	/*
	retinaImg.init();
	if(retinaImg.isRetina()){
		$body.addClass("retina");
	}
	*/

	//スマートフォン判定
	checkPhone = function(){
		if($(window).width() <= 650){
			isPhone = 1;
			return isPhone
		}else{
			isPhone = 0;
			return isPhone;
		}
	};
	checkPhone();


	//hoverで半透明に
	$("img.fadeImg").hover(
		function(){$(this).stop().fadeTo(200, 0.5);},
		function(){$(this).stop().fadeTo(200, 1);}
	);
	//tableの奇数行（odd）と偶数行（even）をクラスとして追加
	$('table.bw').each(function(){
		$(this).find('tr:odd').addClass('odd');
		$(this).find('tr:even').addClass('even');
	});

	//画像のfadeIn効果
	fadeImg = $body.find('img.delay');
	if(fadeImg.length){
		fadeImg.hide().fadeIn(700);
	}
	//ページ内リンク移動
	$('a[href^=#]').click(function() {
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('html,body').animate({scrollTop:position}, speed, 'swing');
		return false;
	});

	//windowが小さい場合に画像の横幅を画面に合わせるieはバグるので除外
	if($(window).width() <= 1020 && !ltIe8){
		$wrapper.find('img').each(function(){
			var $this = $(this);
			var w = $this.width();
			$this.css({
				maxWidth:w,
				width:"100%",
				height:"auto"
			});
		});
	}

	//アコーディオン式
	$('h1').not('.non').click(function(){
		var $this = $(this);
		isPhone ?
			$this.next('div').toggle(function(){
				$lMenu.height(($wrapper).height()+100);
			}):
			$this.next('div').slideToggle('fast',function(){
				$lMenu.height(($wrapper).height()+100);
			});

		$this.hasClass('open') ?
			$this.removeClass('open').addClass('close'):
			$this.removeClass('close').addClass('open');
	});

	//閉じるボタン
	$('div.mainDiv').delegate('.bt_close','click',function(){
		var $target = $(this);
		var parent = $target.closest('.mainDiv');
		var parentH1 = parent.prev('h1');
		parent.slideUp('fast',function(){
			$lMenu.height(($wrapper).height()+100);
		});
		parentH1.removeClass('open').addClass('close');
		location.href = "#" + parentH1.attr("id");
	});

	//ハッシュタグがある場合展開す

	hashArr = location.href.split("#");
	hash = hashArr[1];
	$('h1#' + hash).trigger('click');

	//パンくずセット#ttQueryはGlobal
	ttQuery = function(){
		var that = {
			init : function(){
				var __query = location.search.split("?");
				this.query = __query[1];
			},
			setPankuzu : function(title,hash){
				$pankuzu.find('.home a').attr({"href":"index.html" + hash});
				$pankuzu.find('.root a').html(title).attr({"href":"index.html" + hash});
				$('#header_panel').find('li.back a').attr({"href":"index.html" + hash});
				$('#pageBack').find('a').attr({"href":"index.html" + hash});
			}
		};
		return that;
	};

	//戻るボタン
	//$('#header_panel').find('li.back a').click(function(e){
	$('#pageBack').find('a').click(function(e){
		var ref = document.referrer;
		var host = location.hostname;
		var $this = $(this);
		e.preventDefault();
		!ref.match(/index.html/) && ref.match(host) ?//自host他ページからのリンクの場合はhistory.back
			history.back():
			location.href = $this.attr('href');
	});

	//言語設定
	var lanDiv = $('#selLan');
	lanDiv.change(function(){
		var url = document.URL;
		var urlArr = url.split("/");
		urlArr[urlArr.length-2] = $(this).val();
		var newUrl = urlArr.join("/");
		document.location = newUrl;
	});

	//To Debug
	/*
	var panHome = $pankuzu.find("li.home a");
	var panRoot = $pankuzu.find("li.root a");
	var footer = $('#pageBack').find('a');
	if(panHome.attr('href') !== panRoot.attr('href') || panHome.attr('href') !== footer.attr('href')){
		alert("Pankuzu home and Pankuzu root are not equal !! ");
	}
	*/

})(jQuery);


