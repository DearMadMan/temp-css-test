 $(document).ready(function() {
     //initialize swiper when document ready  
     var mySwiper = new Swiper('.nav-warp', {
         // Optional parameters
         direction: 'vertical',
         slidesPerView : 'auto'

     });
     var dishes = new Swiper('.foods', {
         // Optional parameters
         direction: 'vertical',
     })
 });
