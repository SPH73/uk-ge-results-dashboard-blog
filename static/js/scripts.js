// Navbar Collapsible menu icon
$(".navbar-nav li a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
});

// Refresh button
function resetChart() {
    window.location.reload();
}