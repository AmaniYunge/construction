function include(url){document.write('<script type="text/javascript" src="'+url+'"></script>')}

//------ base included scripts -------//
include('js/jquery.easing.js');
include('js/TMForm.js');
include('js/owl.carousel.js');
include('js/jquery.touchSwipe.min.js');

if(!FJSCore.mobile){
    include('js/spin.min.js');
    include('js/hoverIntent.js');
    include('js/superfish.js');
    include('js/greensock/TweenMax.min.js');
    include('js/jquery.superscrollorama.js');
    include('js/jquery.touchSwipe.min.js');
    include('js/tmMultimediaGallery.js');
} else{
    include('js/klass.min.js');
    include('js/code.photoswipe.jquery-3.0.5.js');
}
//------------------------------------//
var win = $(window),
    doc = $(document),
    previousState = currentState = '',
    defLocation,
    $fullGallery,
    currentIndex = 0,
    msie = (navigator.appVersion.indexOf("MSIE")!==-1);

function spinnerInit(){    
    var opts = {
        lines: 11,
        length: 10,
        width: 5,
        radius: 14, 
        corners: 1,
        color: '#fff',
        speed: 1.3,
        trail: 5
    },
    spinner = new Spinner(opts).spin($('#webSiteLoader')[0]);
}

function initPluginsPages(){
    (!FJSCore.mobile && previousState && (FJSCore.state != previousState))&&($('.history-back').attr('href','./'+previousState));
}

function initPlugins(){
    initPluginsPages();

     $('#form1').TMForm({
        ownerEmail:'#'
    });


    $("#owl").owlCarousel({
        items : 1,
        //itemsDesktop : [995,3],
        itemsDesktop : [195,3],
        itemsDesktopSmall : [767, 1],
        itemsTablet: [700, 1],
        itemsMobile : [479, 1],
        lazyLoad : true,
        pagination: true,
        navigation : true
    });

    if(!FJSCore.mobile){
        $('.desc_btn').css({'display': 'block'});
        $('.mobile_btn').css({'display': 'none'});

        $('.owl-carousel a.btn')
        .off('click')
        .on('click', function(){
            currentIndex = $(this).parents('.owl-item').index();

            // console.log('currentIndex = '+currentIndex);
            //initFullGallery();


        });
    }else{
        //$('.owl-carousel a.btn').on('click', function(){

        //}

        $('.desc_btn').css({'display': 'none'});
        $('.mobile_btn').css({'display': 'block'});

        var phSwipe = $(".photoSwipe1>li>a");
            phSwipe.length && phSwipe.photoSwipe({jQueryMobileDialogHash: false});

            // console.log(phSwipe.length);
            phSwipe.on("click",function(){
                return false;
            })
            

         function onChangeHeight(){
                $('#mobile-wrap').css('height', win.height());
            }

            win
            .on('closePhotoswipe',function(){
                $('#mobile-wrap').removeClass('ps-active');
                $(this).off('resize',onChangeHeight);
                $('#mobile-wrap').css('height','auto');
                $(this).trigger('restoreScrollPosition');
            }); 
    }


}

function toggleFullScreen() {
   if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
     if (document.documentElement.requestFullscreen) {
       document.documentElement.requestFullscreen();
     } else if (document.documentElement.mozRequestFullScreen) {
       document.documentElement.mozRequestFullScreen();
     } else if (document.documentElement.webkitRequestFullscreen) {
       document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
     }
   } else {
      if (document.cancelFullScreen) {
         document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
         document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
   }
}


function initFullGallery(){
    $fullGallery = $("#galleryHolder"); 
    $fullGallery.tmMultimediaGallery({
        container: '.galleryContainer',
        resizableContainer: true,
        animationSpeed: '1.2',
        autoPlayState: false,
        paginationDisplay: true,
        controlDisplay: true,
        autoPlayTime: 12,
        alignIMG: 'center',
        mobile: FJSCore.tablet,
        imageHolder: '#imageHolder', // imageHolder selector
        pagination: '#inner', // pagination selector
        outerPagination: false, // outer pagination
        description: '#galleryDescription', // description selector
        next: '#nextButton', // next button selector
        prev: '#prevButton', // prev button selector
        spinner: '#imgSpinner', // prev button selector
        startIndex: currentIndex,
        onShowActions: function(){
            // $('body').addClass('galleryOpen');
        },
        onHideActions: function(){
            // $('body').removeClass('galleryOpen')
        }
    })

    win.trigger('scrollEnable', 'false');
   

    $('.closeIconGallery').on('click', function(){
        $('#gallery-full').removeClass('openFull');
        $fullGallery && $fullGallery.trigger('hideGallery');
        $('body').removeClass('galleryOpen');

        win.trigger('scrollEnable', 'true');

        if (document.cancelFullScreen) {
             document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
             document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }

    });

    // setTimeout(function () { 
    //     win.trigger('resize'); 
    // }, 500);
    spinnerInit();

    $('.splash a').on('click', function(){
        return false;
    });

    $('.fullscr-btn').on('click', function(){
        toggleFullScreen();
    });
}

//initFullGallery();

function scrolloramaInit(){
    var controller = $.superscrollorama();

    controller
        // page 1
        .addTween('.bigLogo', TweenMax.from( $('.bigLogo'), 0.8, {delay: 0.4, css:{opacity: 0, scale: 0.2, rotation: 270, marginTop: -200}, ease: Expo.easeOut}))
        .addTween('header', TweenMax.from( $('header'), .5, {delay: 0.8, css:{right: -600}, ease: Cubic.easeOut}))
        .addTween('#page1 .backgroundPlane', TweenMax.from( $('#page1 .backgroundPlane'), .3, {opacity: 0, width: 0, height: 0}), 300)

        // page 2
        .addTween('#page2 .logo', TweenMax.from( $('#page2 .logo'), .5, {delay: 2.0, css:{top: 200, opacity: 0, rotation: 90}, ease: Cubic.easeOut}), 300)
        .addTween('#page2 .backgroundPlane', TweenMax.from( $('#page2 .backgroundPlane'), .3, {opacity: 0, width: 0}), 200)
        .addTween('#page2_item1', TweenMax.from( $('#page2_item1'), 1.0, {delay: 1.4, css:{left: 1000, opacity: 0, rotation:  0}, ease: Cubic.easeOut}), 0)
        .addTween('#page2 h2', TweenMax.from( $('#page2 h2'), 1.7, {delay: 1.0, css:{top: 100, opacity: 0}, ease: Cubic.easeOut}), 100)
        .addTween('#page2 p', TweenMax.from( $('#page2 p'), 1.7, {delay: 1.0, css:{left: '-50%', opacity: 0}, ease: Cubic.easeOut}), -200)
        
        // page 3
        .addTween('#page3 .logo', TweenMax.from( $('#page3 .logo'), .5, {delay: 2.0, css:{top: 200, opacity: 0, rotation: 90}, ease: Cubic.easeOut}), 300)
        .addTween('#page3 .backgroundPlane', TweenMax.from( $('#page3 .backgroundPlane'), .3, {opacity: 0, width: 0}), 300)
        .addTween('#page3 p', TweenMax.from( $('#page3 p'), .7, {delay: 1.4, css:{left: '-50%', opacity: 0}, ease: Cubic.easeOut}), -150)
        .addTween('#page3 h3', TweenMax.from( $('#page3 h3'), .7, {delay: 1.6, css:{left: '-50%', opacity: 0}, ease: Cubic.easeOut}), -150)
        .addTween('#page3 .part1', TweenMax.from( $('#page3 .part1'), .7, {delay: 0.8, css:{left: '-100%', opacity: 0}, ease: Cubic.easeOut}))
        //.addTween('#page3 .anim_btn', TweenMax.from( $('#page3 .anim_btn'), .3, {opacity: 1}), 0, 300)
        
        // page 4
        .addTween('#page4 .logo', TweenMax.from( $('#page4 .logo'), .5, {delay: 2.0, css:{top: 200, opacity: 0, rotation: 90}, ease: Cubic.easeOut}), 300)
        .addTween('#page4 .backgroundPlane', TweenMax.from( $('#page4 .backgroundPlane'), .3, {opacity: 0, width: 0}), 300)
        .addTween('#page4_item1', TweenMax.from( $('#page4_item1'), .7, {delay: 1.4, css:{left: 1000, rotation: -30}, ease: Expo.easeOut}))
        .addTween('#page4 h3', TweenMax.from( $('#page4 h3'), .7, {delay: 1.6, css:{left: '-50%', opacity: 0}, ease: Cubic.easeOut}), -150)
        .addTween('#page4 .formHolder', TweenMax.from( $('#page4 .formHolder'), 1.2, {delay: 0.6, css:{left: '100%', opacity: 0}, ease: Cubic.easeOut}))
        .addTween('#page4 .anim_btn', TweenMax.from( $('#page4 .anim_btn'), .3, {opacity: 1}), 0, -300);
       
}


$(document).on('changeLocation',function (e){
    previousState = currentState;
    currentState = history.state;
    // console.log(FJSCore.state);
    // console.log(currentState);
})

$(function(){
    $("#year").text((new Date).getFullYear());

    previousState = currentState = history.state;

    var doMenuHide = false;

    $('#mainNav>ul>li>a').each(function(){
        var $this = $(this),
            txt = $this.text();
        $this.html('<div><span>'+ txt +'</span></div><div><span>'+ txt +'</span></div>');
    })
    // hide menu on events
    .parents('#mainNav')
        .on('mouseenter', function(){
            doMenuHide = false;
        })
        .on('mouseleave', function(){
            doMenuHide = true;
            setTimeout(function(){ 
                if (doMenuHide) {
                    $('#menuToggler').trigger('click', 'hide');
                }
            }, 3000)
        })

    $('#menuToggler').click(function(e, d){
        var $nav  = $('#mainNav');

        function showMenu(){
            // show menu
            $(this).addClass('pressed');
            $nav
                .css({"zIndex": 10})
                .removeClass('hideMenu')
                .off('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd')
                .on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(e) {
                    $(this).css({"zIndex": 50}) 
                })
        }

        function hideMenu(){
            // hide menu
            $(this).removeClass('pressed');
            $nav
                .addClass('hideMenu')
                .css({"zIndex": 10})
        }

        if (d) {
            switch (d){
                case 'show':
                    showMenu();
                break;
                case 'hide':
                    hideMenu();
                break;
            }
        } else{
            (!$nav.hasClass('hideMenu')) ? hideMenu() : showMenu();
        }
        return false;
    });
    
    initPlugins();
    
    if(FJSCore.mobile){
        $('body').css({'min-width':'inherit'});   

       // $('#mobile-navigation > option').eq(2).remove();

        $('#mobile-wrap').addClass('main_bg');

        $(document)
        .on('show','#mobile-content>*', function(e,d){    
            initPlugins();                
        })      
        .on('hide','#mobile-content>*',function(e,d){
        })
    } else {
        $('#mainNav').superfish({
            animation:     {height:'show'},
            animationOut:  {height:'hide'},
            delay: 500
        });

        spinnerInit();

        if(!FJSCore.tablet){
            scrolloramaInit();
        }else{

        }

        //initFullGallery();

        FJSCore.modules.responsiveContainer({
            container: '#other_pages',
            elementsSelector: '#other_pages>div',
            defStates: '',
            type: 'inner',
            affectSelectors: '',
            activePageSelector: '.active'
        });

        $('#mainNav').superfish({
            speed: 'fast',
            autoArrows:  false
        });

        spinnerInit();
        initPlugins();
    
        var otherPageContainer = $('#other_pages');
        otherPageContainer 
            .on('show','>*',function(e,d){
                $.when(d.elements)
                    .then(function(){

                        initPluginsPages();
                        initFullGallery();

                        $('body').addClass('show-sub-pages');

                        setTimeout(function(){
                            win.trigger('resize');
                        },100);

                        d.curr
                            .stop(true)
                            .css({'display':'block', 'opacity': '0'})
                            .animate({'opacity': '1' }, 300, function(){ 
                                $(this).addClass('active');
                                
                                $('body').trigger('resizeContent');

                                setTimeout(function(){
                                    win.trigger('resize');
                                },50);

                                setTimeout(function(){
                                    $('.close-icon, .prev, .next').addClass('no-delay');
                                },2000);

                            })
                    })         
            })
            .on('hide','>*',function(e,d){                
                $(this)
                    .removeClass('active')
                    .stop(true)
                    .animate({ 'opacity': '0' }, 500, function(){
                        $(this).css('display','none');
                        setTimeout(function(){
                            $('body').trigger('resizeContent');
                        },300);

                        $('body').removeClass('show-sub-pages');
                    });              
            }) 
    } 
})
/*---------------------- end ready -------------------------------*/
function onResize(){
    $('#content>div')
        .height(win.height())
        .each(function(){
            var $this = $(this),
                deltaValue = 0,
                designDeltaValue = 0,
                currHeight = $this.children('.container').height() + deltaValue;

               // console.log('currHeight   ' + currHeight);

                $this.find('.backgroundPlane').height(currHeight);

            $this.find('.backgroundPlane').css({'width':'125%'});

            if ($this.height() < currHeight) { 
                $this.height(currHeight + designDeltaValue);

                 $this.find('.backgroundPlane').css({'width':'125%'});
            }

        })
}

win
.on('resize', onResize)
.on('orientationchange', onResize)
.load(function(){  
    $("#webSiteLoader").fadeOut(500, 0, function(){
        $(this).remove();
        win
            .trigger('resize')
            .trigger('scroll')
            .trigger('afterload');

        $('body').trigger('resizeContent');       
    }); 

    FJSCore.modules.responsiveContainer({
        elementsSelector: '#other_pages>div',
        affectSelectors: '',
        type: 'inner',
        defStates: ',about,contacts,members'
    });

    win
        .trigger('resize');
    
    if(FJSCore.mobile){
        //----- mobile scripts ------//
        $('#mobile-header>*').wrapAll('<div class="container"></div>');
        $('#mobile-footer>*').wrapAll('<div class="container"></div>');
    }
});
