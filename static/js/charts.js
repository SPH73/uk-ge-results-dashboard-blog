queue()
    .defer(d3.json, "data/votes-M.json")
    .await(makeGraphs);

function makeGraphs(error, votesData) {
    if (error) throw error;

    var ndx = crossfilter(votesData);

    var year_dim = ndx.dimension(dc.pluck("YEAR"));
    var total_votes_per_year = year_dim.group().reduceSum(dc.pluck("CON2"));

    dc.barChart("#CON2-votes-per-year")
        .width(800)
        .height(350)
        .margins({
            top: 10,
            right: 50,
            bottom: 40,
            left: 20
        })
        .dimension(year_dim)
        .group(total_votes_per_year)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Votes (Millions) per Year")

        .yAxis().ticks(10);

    dc.renderAll();
}

queue()
    .defer(d3.tsv, "data/votes-M-transp.tsv")
    .await(compareVotes);

function compareVotes(error, votesData) {
    if (error) throw error;

    var ndx = crossfilter(votesData);

    var party_dim = ndx.dimension(dc.pluck("Party"));
    var total_votes_per_year = party_dim.group().reduceSum(dc.pluck("1917"));

    dc.barChart("#compare-votes-per-year")
        .width(800)
        .height(350)
        .margins({
            top: 10,
            right: 50,
            bottom: 40,
            left: 20
        })
        .dimension(party_dim)
        .group(total_votes_per_year)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Votes (Millions) per Year")

        .yAxis().ticks(10);

    dc.renderAll();
}