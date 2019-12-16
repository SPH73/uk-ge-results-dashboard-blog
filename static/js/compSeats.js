queue()
    .defer(d3.tsv, "data/seats-won.tsv")
    .await(makeGraphs);

function makeGraphs(error, seatsData) {
    if (error) throw error;

    let ndx = crossfilter(seatsData);

    show_seats_comparison(ndx);

}

function show_seats_comparison(ndx) {

    let year_dim = ndx.dimension(function (d) {
        date = new Date(+d.Year)
        return date;
    });

    let minYear = year_dim.bottom(1)[0].Year;
    let maxYear = year_dim.top(1)[0].Year;

    console.log(minYear);
    console.log(maxYear);

    function seats_per_year(party) {
        return function (d) {
            if (d.Party === party) {
                return +d.Seats;
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
        .width(1200)
        .height(500)
        .dimension(year_dim)
        .legend(dc.legend().x(80).y(20).itemHeight(15).gap(5))
        .x(d3.scale.linear().domain([minYear, maxYear]))
        .yAxisLabel("Seats gained")
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
            .colors('black')
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
        ])
        .brushOn(false);

    dc.renderAll();
}