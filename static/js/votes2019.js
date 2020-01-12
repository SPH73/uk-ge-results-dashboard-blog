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

    show_range_selector(ndx)
    show_votes(ndx)
    show_seats(ndx)
    show_correlation(ndx)

    dc.renderAll();

}

function show_range_selector(ndx) {

    let dim = ndx.dimension(dc.pluck('range'));
    let group = dim.group();

    dc.selectMenu("#range-menu")
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
        .transitionDuration(1500)
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
        .transitionDuration(1500)
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
        .width(1000)
        .height(250)
        .useViewBoxResizing(true)
        .margins({
            top: 10,
            right: 30,
            bottom: 30,
            left: 30
        })
        .dimension(bubble_dim)
        .group(bubble_group)
        .y(d3.scale.linear().domain([0, 365]))
        .x(d3.scale.linear().domain([0, 14000000]))
        .radiusValueAccessor(function (d) {
            return d.value
        })
        .r(d3.scale.log([0, 20]))
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
        .colors(d3.scale.category20b())
        .yAxisLabel("Seats")
        .xAxisLabel("Votes")
        .renderLabel(false)
        .title(function (d) {
            return (d.key[0] + " won " + d.key[1].toString() + " votes and " + d.key[2] + " seats")
        })
        .transitionDuration(500)

}