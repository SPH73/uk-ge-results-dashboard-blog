queue()
    .defer(d3.tsv, "data/Full-results-2019-BBC.tsv")
    .await(makeGraphs)

function makeGraphs(error, latestData) {
    if (error) throw error;

    let ndx = crossfilter(latestData);

    // parse data
    latestData.forEach(function (d) {
        d.party = d.party
        d.votes = +d.votes;
        d.seats = +d.seats;
        d.seatChange = +d.seatChange
        d.voteShare = +d.voteShare
        d.voteShareChange = +d.voteShareChange
    });


    show_votes(ndx)
    show_seats(ndx)

}

function show_votes(ndx) {
    let party_dim = ndx.dimension(dc.pluck("party"));
    let votes_per_party = party_dim.group().reduceSum(dc.pluck("votes"));

    dc.pieChart("#votes-2019")
        .height(340)
        .radius(150)
        .useViewBoxResizing(true)
        .transitionDuration(1000)
        .dimension(party_dim)
        .group(votes_per_party)


    dc.renderAll();
}

function show_seats(ndx) {


    let party_dim = ndx.dimension(dc.pluck("party"));
    let seats_per_party = party_dim.group().reduceSum(dc.pluck("seats"));


    dc.pieChart("#seats-2019")
        .height(340)
        .radius(150)
        .useViewBoxResizing(true)
        .transitionDuration(1000)
        .dimension(party_dim)
        .group(seats_per_party)


    dc.renderAll();
}




function resetChart() {
    window.location.reload();
}