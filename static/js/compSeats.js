queue()
    .defer(d3.tsv, "data/seats-won.tsv")
    .await(makeGraphs);

function makeGraphs(error, seatsData) {
    if (error) throw error;

    let ndx = crossfilter(seatsData);

    let parseYear = d3.time.format("%Y-%m").parse;

    seatsData.forEach(function (d) {
        d.year = parseYear(d.year);
    });

    show_seats_comparison(ndx);

}

function show_seats_comparison(ndx) {


    let year_dim = ndx.dimension(dc.pluck("year"));

    let minYear = year_dim.bottom(1)[0].year;
    let maxYear = year_dim.top(1)[0].year;

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
        .width(1150)
        .height(500)
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


    dc.renderAll();
}