selected = 0

$(".gallery-image").on("click", function() {
    $(".gallery-preview").attr("src", $(this).attr("src"));
    $(".gallery-image.selected").removeClass("selected");
    $(this).addClass("selected");
});