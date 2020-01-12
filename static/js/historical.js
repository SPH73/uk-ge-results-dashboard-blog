queue()
    .defer(d3.tsv, "data/historical-data.tsv")
    .await(makeGraphs);

function makeGraphs(error, historicalData) {
    if (error) throw error;

    let = ndx = crossfilter(historicalData)

    let parseYear = d3.time.format("%Y-%m").parse;
    historicalData.forEach(function (d) {
        d.yearS = parseYear(d.yearS);
    });

    show_menu_selector(ndx)
    show_votes_comparison(ndx);
    show_seats_comparison(ndx)

    dc.renderAll();
}

function show_menu_selector(ndx) {
    let dim = ndx.dimension(dc.pluck("party"));
    let group = dim.group();

    dc.selectMenu("#select-menu")
        .dimension(dim)
        .group(group);
}

function show_votes_comparison(ndx) {

    let year_dim = ndx.dimension(dc.pluck("yearV"));

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

    let stackedChart = dc.barChart("#votes");

    stackedChart
        .width(1000)
        .height(350)
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
        .xAxisLabel("Votes (Millions) Per Party")
        .legend(dc.legend().x(0).y(10).itemHeight(10).gap(5))
        .margins({
            top: 10,
            right: 50,
            bottom: 70,
            left: 100
        })
}

function show_seats_comparison(ndx) {

    let year_dim = ndx.dimension(dc.pluck("yearS"));

    let minYear = year_dim.bottom(1)[0].yearS;
    let maxYear = year_dim.top(1)[0].yearS;

    function seats_per_year(party) {
        return function (d) {
            if (d.party === party) {
                return +d.seats;
            } else {
                return 0;
            }
        }
    };

    let other_seats = year_dim.group().reduceSum(seats_per_year("Other"));

    let scot_seats = year_dim.group().reduceSum(seats_per_year("PC/SNP"));

    let ld3_seats = year_dim.group().reduceSum(seats_per_year("LD3"));

    let lab_seats = year_dim.group().reduceSum(seats_per_year("LAB"));

    let con2_seats = year_dim.group().reduceSum(seats_per_year("CON2"));

    let compositeChart = dc.compositeChart("#composite");
    compositeChart
        .width(1000)
        .height(350)
        .useViewBoxResizing(true)
        .dimension(year_dim)
        .legend(dc.legend().x(0).y(10).itemHeight(10).gap(5))
        .margins({
            top: 10,
            right: 50,
            bottom: 50,
            left: 100
        })
        .brushOn(false)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .yAxisLabel("Seats")
        .xAxisLabel("Election Year")
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
            .colors('#777777')
            .group(other_seats, 'Other'),
            dc.lineChart(compositeChart)
            .colors('#3F8428')
            .group(scot_seats, 'PC/SNP'),
            dc.lineChart(compositeChart)
            .colors('#FDBB30')
            .group(ld3_seats, 'LD3'),
            dc.lineChart(compositeChart)
            .colors('#d50000')
            .group(lab_seats, 'Labour'),
            dc.lineChart(compositeChart)
            .colors('#0087dc')
            .group(con2_seats, 'Conservative')
        ]);
}