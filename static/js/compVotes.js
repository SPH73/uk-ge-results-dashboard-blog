queue()
    .defer(d3.tsv, "data/votes-M.tsv")
    .await(makeGraphs);

function makeGraphs(error, votesData) {
    if (error) throw error;

    let ndx = crossfilter(votesData);

    show_votes_comparison_two(ndx);
}

function show_votes_comparison_two(ndx) {
    let year_dim = ndx.dimension(dc.pluck("Year"));

    function votes_per_year(party) {
        return function (d) {
            if (d.Party === party) {
                return +d.Votes;
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
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Votes in Millions per party per year")
        .margins({
            top: 10,
            right: 50,
            bottom: 50,
            left: 50
        })
        .legend(
            dc
            .legend()
            .x(60)
            .y(0)
            .itemHeight(15)
            .gap(5)
        );

    dc.renderAll();
}