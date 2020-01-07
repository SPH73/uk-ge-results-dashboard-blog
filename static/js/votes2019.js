queue()
    .defer(d3.tsv, "data/seats-to-votes2019.tsv")
    .await(makeGraphs)

function makeGraphs(error, latestData) {
    if (error) throw error;

    let ndx = crossfilter(latestData);

    // filter null values
    let filteredData = latestData.filter(function (d) {
        if (d.seats >= 1) {
            return d.value;
        }
    })
    // parse data
    latestData.forEach(function (d) {
        d.party = d.party
        d.votes = +d.votes;
        d.seats = +d.seats;
        d.votesShare = +d.votesShare
    });


    show_votes(ndx)
    show_seats(ndx)

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

function show_seats(ndx) {


    let party_dim = ndx.dimension(dc.pluck("party"));
    let seats_per_party = party_dim.group().reduceSum(dc.pluck("seats"));


    dc.pieChart("#votes-2019")
        .height(340)
        .radius(150)
        .useViewBoxResizing(true)
        .transitionDuration(1000)
        .dimension(party_dim)
        .group(seats_per_party)



}