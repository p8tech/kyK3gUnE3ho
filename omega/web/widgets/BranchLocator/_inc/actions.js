$(document).ready(function(){


  $('ul.tabs li').click(function(){

    var tab_id = $(this).attr('data-tab');



    $('ul.tabs li').removeClass('current');

    $('.tab-content').removeClass('current');



    $(this).addClass('current');

    $("#"+tab_id).addClass('current');

  });

  

  $('ul.branch-category li').click(function(){

    var tab_id = $(this).attr('data-tab');

    

    $('ul.branch-category li').removeClass('current');

    $('.branch-content').removeClass('current');



    $(this).addClass('current');

    $("#"+tab_id).addClass('current');

  });

  

  $('.filter-cb').change(function() {

    if ($(this).is(':checked')) {

      $(".filter label[for='"+$(this).attr("id")+"']").addClass('cb-checked');

    }

    

    else {

      $(".filter label[for='"+$(this).attr("id")+"']").removeClass('cb-checked');

    }

  });

  

    

    $(window).on("resize", function() {  

      var screenHeight = $(window).height();

      var screenWidth = $(window).width();
      
      var mapCanvasWidth = $(window).width();
      
      var mapCanvasHeight = $(window).height();

      var dirHeight = $(window).height() - 202;

      var dircontHeight = $(window).height() - 232;

      var tabHeight = $(window).height() - 44;

      var resultsHeight = $(window).height() - 316;

      var branchHeight = $(window).height() - 310;
        

        if($(window).width() <= screenWidth) {

          $('#map-canvas').css('width', mapCanvasWidth);

        }
        
        
        if($(window).height() <= screenHeight) {

          $('#map-canvas').css('height', mapCanvasHeight);
          
          $('.direction-panel').css('height', dirHeight);

          $('.direction-container').css('height', dircontHeight);

          $('#tab-2, #tab-1').css('height', tabHeight);

          $('.results-container').css('height', resultsHeight);

          $('.branch-content').css('height', branchHeight);

        }                
        
        if( ($(window).width() <= 640) || ($(window).height() <= 480) ){
          
          $('#tab-2, #tab-1').css('height', screenHeight - 32);
          
          $('.results-container').css('height', screenHeight - 207);
          
          $('.branch-content').css('height', screenHeight - 207);
          
        }
    
        if( ($(window).width() <= 640) && ($(window).height() <= 480) || ($(window).width() <= 640) && ($(window).height() > 480) ){
              
              $('#tab-2, #tab-1').css('height', screenHeight - 32);
              
              $('.results-container').css('height', screenHeight - 207);
              
              $('.direction-panel').css('height', dirHeight + 12);
              
              $('.direction-container').css('height', dircontHeight + 30);
              
              $('.branch-content').css('height', screenHeight - 207);
              
        }

    })

    
    .resize();

    $(window).load(function(){

      $(".content, .direction-container, .outlet-results").mCustomScrollbar({
          theme:"msw",
      });

    });
    
    $('.c-hamburger').on('click', function() {
      
      $('#map-container ').toggleClass('isOpen');
      
    }); 


});