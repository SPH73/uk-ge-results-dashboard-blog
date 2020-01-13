queue()
    .defer(d3.tsv, "data/Full-results-2019-BBC.tsv")
    .await(makeGraphs);

function makeGraphs(error, latestData) {
    if (error) throw error;

    let ndx = crossfilter(latestData);

    // parse data
    latestData.forEach(function (d) {
        d.party = d.party;
        d.votes = Number(+d.votes);
        d.seats = +d.seats;
        d.seatChange = +d.seatChange;
        d.voteShare = +d.voteShare;
        d.voteShareChange = +d.voteShareChange;
    });



    show_range_selector(ndx);
    show_votes(ndx);
    show_seats(ndx);
    show_correlation(ndx);

    dc.renderAll();

}
// Range select menu to provide user functionality on the chart data
function show_range_selector(ndx) {

    let dim = ndx.dimension(dc.pluck('range'));
    let group = dim.group();

    dc.selectMenu("#range-menu")
        .dimension(dim)
        .group(group)
        .title(function (d) {
            return d.key + ' seats';
        });

}
// Pie-Chart to display the votes won data
function show_votes(ndx) {

    let party_dim = ndx.dimension(dc.pluck("party"));
    let votes_per_party = party_dim.group().reduceSum(dc.pluck("votes"));

    dc.pieChart("#votes-2019")
        .height(200)
        .radius(250)
        .useViewBoxResizing(true) //viewBox will be set on the svg root element instead of width and height
        .transitionDuration(1500)
        .dimension(party_dim)
        .group(votes_per_party);


}
// Pie-Chart to display the seats won data
function show_seats(ndx) {

    let party_dim = ndx.dimension(dc.pluck("party"));
    let seats_per_party = party_dim.group().reduceSum(dc.pluck("seats"));


    dc.pieChart("#seats-2019")
        .height(200)
        .radius(250)
        .useViewBoxResizing(true) //viewBox will be set on the svg root element instead of width and height
        .transitionDuration(1500)
        .dimension(party_dim)
        .group(seats_per_party);

}

// Bubble Chart that takes both the voes and seats data per party to output to individual bubbles
function show_correlation(ndx) {

    // filter the dimensions to create the min and max range for the chart
    let seat_dim = ndx.dimension(dc.pluck("seats"));
    let minSeats = seat_dim.bottom(1)[0].seats
    let maxSeats = seat_dim.top(1)[0].seats;

    let votes_dim = ndx.dimension(dc.pluck("votes"));
    let minVotes = votes_dim.bottom(1)[0].votes
    let maxVotes = votes_dim.top(1)[0].votes;

    // filter the data for the bubbles
    let bubble_dim = ndx.dimension(function (d) {
        return [d.party, d.votes, d.seats];
    });

    // group the data
    let bubble_group = bubble_dim.group();

    // develop chart
    dc.bubbleChart("#seat-votes")
        .width(500)
        .height(250)
        .useViewBoxResizing(true) //viewBox will be set on the svg root element instead of width and height
        .margins({
            top: 10,
            right: 60,
            bottom: 40,
            left: 60
        })
        .dimension(bubble_dim)
        .group(bubble_group)
        .y(d3.scale.linear().domain([minSeats, maxSeats]))
        .x(d3.scale.linear().domain([minVotes, maxVotes]))

        // develop bubbles
        .radiusValueAccessor(function (d) {
            return d.value;
        })
        .r(d3.scale.log([0, 20])) //bubble size
        .keyAccessor(function (d) {
            return d.key[1];
        }) //position on x axis
        .valueAccessor(function (d) {
            return d.key[2];
        }) //position on y axis
        .clipPadding(70) //allow bubble to over-flow axes

        // set colours and label
        .colorAccessor(function (d) {
            return d.key;
        })
        .colors(d3.scale.category20b())
        .yAxisLabel("Seats")
        .xAxisLabel("Votes")
        .renderLabel(false) // avoiding clutter on the closely plotted bubbles
        .title(function (d) {
            return (d.key[0] + " won " + d.key[1] + " votes and " + d.key[2] + " seats");
        }) //tooltip style custom label for bubbles
        .transitionDuration(500);

}