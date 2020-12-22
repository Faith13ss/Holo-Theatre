selected = 0

$(".gallery-image").on("click", function() {
    $(".gallery-preview").attr("src", $(this).attr("src"));
    $(".gallery-selected").removeClass("selected");
    $(this).addClass("selected");
});