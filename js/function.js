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

	//IE8��������
	if(ltIe8){
		$body.addClass("cantSvg");
	}

	//retina�Ή�
	/*
	retinaImg.init();
	if(retinaImg.isRetina()){
		$body.addClass("retina");
	}
	*/

	//�X�}�[�g�t�H������
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


	//hover�Ŕ�������
	$("img.fadeImg").hover(
		function(){$(this).stop().fadeTo(200, 0.5);},
		function(){$(this).stop().fadeTo(200, 1);}
	);
	//table�̊�s�iodd�j�Ƌ����s�ieven�j���N���X�Ƃ��Ēǉ�
	$('table.bw').each(function(){
		$(this).find('tr:odd').addClass('odd');
		$(this).find('tr:even').addClass('even');
	});

	//�摜��fadeIn����
	fadeImg = $body.find('img.delay');
	if(fadeImg.length){
		fadeImg.hide().fadeIn(700);
	}
	//�y�[�W�������N�ړ�
	$('a[href^=#]').click(function() {
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('html,body').animate({scrollTop:position}, speed, 'swing');
		return false;
	});

	//window���������ꍇ�ɉ摜�̉�������ʂɍ��킹��ie�̓o�O��̂ŏ��O
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

	//�A�R�[�f�B�I����
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

	//����{�^��
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

	//�n�b�V���^�O������ꍇ�W�J��

	hashArr = location.href.split("#");
	hash = hashArr[1];
	$('h1#' + hash).trigger('click');

	//�p�������Z�b�g#ttQuery��Global
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

	//�߂�{�^��
	//$('#header_panel').find('li.back a').click(function(e){
	$('#pageBack').find('a').click(function(e){
		var ref = document.referrer;
		var host = location.hostname;
		var $this = $(this);
		e.preventDefault();
		!ref.match(/index.html/) && ref.match(host) ?//��host���y�[�W����̃����N�̏ꍇ��history.back
			history.back():
			location.href = $this.attr('href');
	});

	//����ݒ�
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


