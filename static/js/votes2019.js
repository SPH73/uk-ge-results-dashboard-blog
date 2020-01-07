queue()
    .defer(d3.tsv, "data/seats-to-votes2019.tsv")
    .await(makeGraphs)

function makeGraphs(error, latestData) {
    if (error) throw error;

    let ndx = crossfilter(latestData);

    // parse data
    latestData.forEach(function (d) {
        d.party = d.party
        d.votes = +d.votes;
        d.seats = +d.seats;
    });

    show_votes(ndx)

    dc.renderAll();

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

}
