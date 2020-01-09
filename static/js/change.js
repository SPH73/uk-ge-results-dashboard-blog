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


    show_correlation(ndx)

    dc.renderAll();

}

function show_correlation(ndx) {

    let bubble_dim = ndx.dimension(function (d) {
        return [d.votes, d.seats];
    })
    let bubble_group = bubble_dim.group();

    console.log(bubble_group.all());


    dc.bubbleChart("#seat-votes")
        .width(1200)
        .height(500)
        .dimension(bubble_dim)
        .group(bubble_group)
        .yAxisLabel("Seats")
        .xAxisLabel("Votes")
        .y(d3.scale.linear().domain([0, 400]))
        .x(d3.scale.linear().domain([0, 1400000]))
        .radiusValueAccessor(function (d) {
            return d.value
        })
        .r(d3.scale.linear().domain([0, 50]))
        .keyAccessor(function (d) {
            return d.key[0];
        })
        .valueAccessor(function (d) {
            return d.key[1]
        })
        .maxBubbleRelativeSize(0.5)
        .clipPadding(100)
        .colorAccessor(function (d) {
            return d.value;
        })
        .colors(d3.scale.category10())






}