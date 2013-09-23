$(function() {
		jQuery(".form_contato").validationEngine({
			ajaxFormValidation: true
		});
		
		$('ul.nav a').bind('click',function(event){
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollLeft: $($anchor.attr('href')).offset().left
			}, 1000);
			event.preventDefault();
		});
		
		$('html, body').stop().animate({
			scrollLeft: $('#home').offset().left
		}, 1000);
		
		$('.bt_right a, .bt_left a').bind('click', function (event) {
			var $anchor = $(this);
			moverpagina($anchor);
		});
		 $('ul.nav a').bind('click',function(event){
			 var $anchor = $(this);
			 moverpagina($anchor);
		 });
		
		$(".bt_contato a").click(function(e) {
			var formulario = $(this).data('formulario');
			$("#"+formulario).toggle('slow');
		});
		
		//Coloca o map na posicao
		var mapOptions = {
			zoom: 5,
			center: new google.maps.LatLng(-33, 151),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		 }
		 var map = new google.maps.Map($('#mapa', mapOptions));
		
		$('.form_contato').submit(function() {
			$(this).find('p').text('Enviando...');
			var dados = jQuery( this ).serialize();
			jQuery.ajax({
				type: 'POST',
				url: "enviar.php",
				data: dados,
				success: function( data ) {
					alert(data);
				}
			});
			$(this).find(':input').each(function () {
				switch(this.type) {
				case 'text':
				case 'textarea':
					$(this).val('');
					break;
				}
			});
			$(this).find('p').text('Email enviado');
			return false;
		});
		
	});
	$(document).ready(function() {
		$(".icones img[title]").tooltips();
		
		$(".zoom").elevateZoom({
			zoomWindowWidth:550,
			zoomWindowHeight:450
		});
		ajustatamanhos();
	});
	$(window).resize(function() {
		ajustatamanhos();
	});
	
	function ajustatamanhos() {
		larguratela = $(window).width();
		alturatela = $(window).height();
		$('.inner').css('width', (larguratela - 60 ));
		$('.inner').css('height',(alturatela - 60 ));
	}
	
	
	
	$(document).ready(function() {
		
		$('.planta_cobertura').click( function() {
			ocultarCoberturas();
			var selt = $(this);
			togglePlanta(true, selt);
			//mostrarMenu();
		});	
		
		$('.imagens_cobertura .grupo').click(function () {
		
		togglePlanta(false);	
		
		//$('#imagens_cobertura .grupo img').stop().animate({width: '218px', height:'115px', background: '#82cfca',paddingleft:'75px'});
		//$('#imagens_cobertura .grupo img').removeClass('imagem_grande');
		var selt = this;
		$('.imagens_cobertura .grupo').each(function(e) {
			if(this != selt && $(this).children('img').hasClass('imagem_grande')) {
				//alert('entrou');
				//$(this).children('img').stop().animate({width: '188px', height:'100px', background: '#82cfca',paddingleft:'75px'});
				$(this).children('img').removeClass('imagem_grande');
				$(this).children('img').removeClass('esticada');
				$(this).children('.fundo_verde').show('slow');
			}
		});
		
		if($(this).children('img').hasClass('imagem_grande')){
			$(this).children('img').removeClass('imagem_grande');
			$(this).children('img').removeClass('esticada');
			//$(this).children('img').stop().animate({width: "188px",height: "100px"});
			$(this).children('.fundo_verde').show('slow');
			$('.imagens_cobertura').stop().animate({marginTop: "0px"});
			//$('.nav').show('slow');
		}else {
			$(this).children('img').addClass('imagem_grande');
			$(this).children('img').addClass('esticada');
			//$(this).children('img').stop().animate({width: "600px",height: "380px"});
			$(this).children('.fundo_verde').hide('slow');
			//$(this).
			$(".imagens_cobertura").animate({marginTop: -105}, 400);
			//$('.nav').hide('slow');
		}
	});
		
	});
	
	function togglePlanta(ocultar, self) {
		if(typeof(ocultar) === 'undefined') ocultar = true;
		if(ocultar) {
			$($(self).children('.planta')).toggle( 'slow',function () {} );
		}else {
			$('#planta').hide('slow', function() {
				$('#bt_verplanta h4').text('Ver planta');
				$( "#bt_verplanta" ).removeClass( "ver_planta_ativo" );
			});
		}
	}
	
	function ocultarCoberturas() {
		$('.imagens_cobertura .grupo img').removeClass('esticada');
		$('.imagens_cobertura .grupo img').removeClass('imagem_grande');
		$('.imagens_cobertura .grupo').children('.fundo_verde').show('slow');
		$('.imagens_cobertura').stop().animate({marginTop: "0px"});
	}
	function moverpagina(anchor) {
		executou = false;
		var $anchor = $(anchor);
		$($anchor.attr('href')).css('opacity', '0');
		
		$('html, body').stop().animate({
			scrollLeft: $(anchor.attr('href')).offset().left
		}, 1000 , function () {
			if(!executou) {
				executou = true;
				$($anchor.attr('href')).find('.inner .detalhe').fadeIn().css('display','inline-table');
				moveandar($anchor.attr('href'));
				
				$($anchor.attr('href')).stop().animate({opacity: 1},1500);
				//$($anchor.attr('href')).find('.back').stop().animate({opacity: 0.7},800);
				
				if($anchor.attr('href') == '#home') {
					$('.bt_left a').prop('href', '#home');
					$('.bt_right a').prop('href', '#cobertura');
					return;
				}else if($anchor.attr('href') == '#cobertura') {
					$('.bt_left a').prop('href', '#home');
					$('.bt_right a').prop('href', '#apartamentos');
					return;
				}else if($anchor.attr('href') == '#apartamentos') {
					$('.bt_left a').prop('href', '#cobertura');
					$('.bt_right a').prop('href', '#comerciais');
					return;
				}else if($anchor.attr('href') == '#comerciais') {
					$('.bt_left a').prop('href', '#apartamentos');
					$('.bt_right a').prop('href', '#localizacao');
					return;
				}else if($anchor.attr('href') == '#localizacao') {
					$('.bt_left a').prop('href', '#comerciais');
					return;
				}
			}
		});
		event.preventDefault();
	}
	function moveandar(andar) {
		if(andar == '#home') {
			$('.andar p').stop().hide().animate({marginTop: "0px"});		
		}else if(andar == '#cobertura') {
			$('.andar p').stop().show('slow').animate({marginTop: "10px"});
		}else if(andar == '#apartamentos') {
			$('.andar p').stop().show('slow').animate({marginTop: "40px"});
		}else if(andar == '#comerciais') {
			$('.andar p').stop().show('slow').animate({marginTop: "80px"});
		}else if(andar == '#localizacao') {
			$('.andar p').stop().hide();
		}
	}
	//Geração do mapa com a logo da empresa
	function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-24.725515,-53.731969),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapa"),
            mapOptions);
        
        var Latlng = new google.maps.LatLng(-24.725515,-53.741969); 	        
        var image = 'assets/images/icon_mapa.png';
        var marker = new google.maps.Marker({
            position: Latlng,
            map: map,
            title: 'Residencial Dona Elvira',
            icon: image
          });
         
        /*var proizLatlng = new google.maps.LatLng(-24.7319617,-53.7379156);  
        var markerProiz = new google.maps.Marker({
        	position: proizLatlng,
        	map: map,
        	title: 'Proiz',
        	icon: 'assets/images/logo_proiz.png'
        });*/
      }
google.maps.event.addDomListener(window, 'load', initialize);
