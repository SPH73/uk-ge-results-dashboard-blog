queue()
    .defer(d3.tsv, "data/votes-M.tsv")
    .await(makeGraphs);

function makeGraphs(error, votesData) {
    if (error) throw error;

    let ndx = crossfilter(votesData);

    show_votes_comparison_two(ndx);
}

function show_votes_comparison_two(ndx) {
    let year_dim = ndx.dimension(dc.pluck("year"));

    function votes_per_year(party) {
        return function (d) {
            if (d.party === party) {
                return +d.votes;
            } else {
                return 0;
            }
        }
    };

    let votes_per_year_others = year_dim.group().reduceSum(votes_per_year("Other"));

    let votes_per_year_scot = year_dim.group().reduceSum(votes_per_year("PC/SNP"))

    let votes_per_year_LD3 = year_dim.group().reduceSum(votes_per_year("LD3"));

    let votes_per_year_LAB = year_dim.group().reduceSum(votes_per_year("LAB"));

    let votes_per_year_CON2 = year_dim.group().reduceSum(votes_per_year("CON2"));

    let stackedChart = dc.barChart("#compare-votes");

    stackedChart
        .width(1150)
        .height(500)
        .useViewBoxResizing(true)
        .dimension(year_dim)
        .group(votes_per_year_others, "All Other")
        .stack(votes_per_year_scot, "PC/SNP")
        .stack(votes_per_year_LD3, "Lib Dem")
        .stack(votes_per_year_LAB, "Labour")
        .stack(votes_per_year_CON2, "Conservative")
        .x(d3.scale.ordinal())
        .colors(d3.scale.category10())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Votes (Millions) per year")
        .legend(dc.legend().x(0).y(10).itemHeight(10).gap(5))
        .margins({
            top: 10,
            right: 50,
            bottom: 70,
            left: 100
        })
    dc.renderAll();
}