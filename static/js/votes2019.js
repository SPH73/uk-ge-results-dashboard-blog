queue()
    .defer(d3.tsv, "data/Full-results-2019-BBC.tsv")
    .await(makeGraphs)

function makeGraphs(error, latestData) {
    if (error) throw error;

    let ndx = crossfilter(latestData);

    // parse data
    latestData.forEach(function (d) {
        d.party = d.party
        d.votes = Number(+d.votes);
        d.seats = +d.seats;
        d.seatChange = +d.seatChange
        d.voteShare = +d.voteShare
        d.voteShareChange = +d.voteShareChange
    });

    show_party_selector(ndx)
    show_votes(ndx)
    show_seats(ndx)
    show_correlation(ndx)

    dc.renderAll();

}

function show_party_selector(ndx) {

    let dim = ndx.dimension(dc.pluck('party'));
    let group = dim.group();

    dc.selectMenu("#select-menu")
        .dimension(dim)
        .group(group);
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


    dc.pieChart("#seats-2019")
        .height(340)
        .radius(150)
        .useViewBoxResizing(true)
        .transitionDuration(1000)
        .dimension(party_dim)
        .group(seats_per_party)

}

function show_correlation(ndx) {

    let bubble_dim = ndx.dimension(function (d) {
        return [d.party, d.votes, d.seats];
    })
    let bubble_group = bubble_dim.group();

    console.log(bubble_group.all());


    dc.bubbleChart("#seat-votes")
        .width(1200)
        .height(500)
        .useViewBoxResizing(true)
        .margins({
            top: 10,
            right: 50,
            bottom: 60,
            left: 50
        })
        .dimension(bubble_dim)
        .group(bubble_group)
        .yAxisLabel("Votes")
        .xAxisLabel("Seats")
        .y(d3.scale.linear().domain([0, 400]))
        .x(d3.scale.linear().domain([0, 14000000]))
        .radiusValueAccessor(function (d) {
            return d.value
        })
        .r(d3.scale.linear().domain([0, 20]))
        .keyAccessor(function (d) {
            return d.key[1];
        })
        .valueAccessor(function (d) {
            return d.key[2]
        })
        .clipPadding(70)
        .colorAccessor(function (d) {
            return d.key;
        })
        .colors(d3.scale.category20())
        .title(function (d) {
            return (d.key[0] + " received " + d.key[1] + " votes and " + d.key[2] + " seats")
        })

}

function resetChart() {
    window.location.reload();
}