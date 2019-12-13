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

    let votes_per_year_others = year_dim.group().reduceSum(function (d) {
        if (d.Party === "Other") {
            return d.Votes;
        } else {
            return 0;
        }
    });

    let votes_per_year_scot = year_dim.group().reduceSum(function (d) {
        if (d.Party === "PC/SNP") {
            return d.Votes;
        } else {
            return 0;
        }
    });

    let votes_per_year_LD3 = year_dim.group().reduceSum(function (d) {
        if (d.Party === "LD3") {
            return d.Votes;
        } else {
            return 0;
        }
    });

    let votes_per_year_LAB = year_dim.group().reduceSum(function (d) {
        if (d.Party === "LAB") {
            return d.Votes;
        } else {
            return 0;
        }
    });

    let votes_per_year_CON2 = year_dim.group().reduceSum(function (d) {
        if (d.Party === "CON2") {
            return d.Votes;
        } else {
            return 0;
        }
    });

    let stackedChart = dc.barChart("#compare-2");

    stackedChart
        .width(1200)
        .height(500)
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