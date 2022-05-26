$(document).ready(function() {
    $('[data-fancybox="images"]').fancybox({
        loop: true,
        infobar: true,
    });

    let filter = $("[data-filter]");
    filter.click(function (event){
        event.preventDefault();
        let cat = $(this).attr('data-filter');
        $(this).addClass("_active").siblings().removeClass("_active");
        if (cat == 'all') {
            $(".room").animate({"max-height":"400px", "margin":"0 0 20px 0"}, 600);
        } else {
            $(`.room[data-cat="${cat}"]`).animate({"max-height":"0", "margin":"0"}, 600);
            $(`.room[data-cat!="${cat}"]`).animate({"max-height":"400px", "margin":"0 0 20px 0"}, 600);
        }
        animOnScroll();
    });

    $(".room-iframe").click(function() {
        $(".modal").addClass("_active");
        $(".contentit").html($(this).prev('modal').html());
        // $(this).children('modal').clone().appendTo('.content');
    });
    $(".close").click(function() {
        $(".modal").removeClass("_active");
    });

    let animItems = $(".room");
        $(window).scroll(animOnScroll);
        function animOnScroll(params) {
            const windowHeight = $(window).innerHeight();
            const scrollTop = $(window).scrollTop();
            const customOffset = 200;
            animItems.each(function() {
                const offsetTop = $(this).offset().top;
                if( windowHeight + scrollTop + customOffset >= offsetTop ) {
                   $(this).addClass("_active");
                }
            });
        }
        animOnScroll();
        function sortingRoom() {
            animItems.each(function() {
                let target_elements = $(this).children(".hidden-carousel-room").children("a").clone();
                target_elements.
                removeAttr("data-fancybox").
                attr({href:"javascript:;", "data-fancybox-index": "0","data-fancybox-trigger":"images 0"});
                $(this).children('.owl-carousel').html(target_elements);
                $(this).children(".owl-carousel").owlCarousel({
                    items: 1,
                    dots: true,
                    lazyLoad: true,
                    autoplay: true,
                    autoplayTimeout: 8000,
                    autoplayHoverPause: true,
                    loop: true,
                });
            });
        }
    sortingRoom();

});