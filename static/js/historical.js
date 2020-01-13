queue()
    .defer(d3.tsv, "data/historical-data.tsv")
    .await(makeGraphs);

function makeGraphs(error, historicalData) {
    if (error) throw error;

    let ndx = crossfilter(historicalData);

    let parseYear = d3.time.format("%Y-%m").parse;
    historicalData.forEach(function (d) {
        d.yearS = parseYear(d.yearS);
    });

    show_menu_selector(ndx);
    show_votes_comparison(ndx);
    show_seats_comparison(ndx);

    dc.renderAll();
}
// select menu for user selections to isolate data
function show_menu_selector(ndx) {

    // set dimension for data and then group
    let dim = ndx.dimension(dc.pluck("party"));
    let group = dim.group();

    // create the menu
    dc.selectMenu("#select-menu")
        .dimension(dim)
        .group(group)
        .title(function (d) {
            return d.key;
        }); //custom titles for dropdown selection
}
// create stacked bar chart to show all the votes data for each party
function show_votes_comparison(ndx) {
    // set the dimension
    let year_dim = ndx.dimension(dc.pluck("yearV"));

    // function to group the data for each party
    function votes_per_year(party) {
        return function (d) {
            if (d.party === party) {
                return +d.votes;
            } else {
                return 0;
            }
        };
    }
    // group the data for each party
    let votes_per_year_others = year_dim.group().reduceSum(votes_per_year("Other"));
    let votes_per_year_scot = year_dim.group().reduceSum(votes_per_year("PC/SNP"));
    let votes_per_year_LD3 = year_dim.group().reduceSum(votes_per_year("LD3"));
    let votes_per_year_LAB = year_dim.group().reduceSum(votes_per_year("LAB"));
    let votes_per_year_CON2 = year_dim.group().reduceSum(votes_per_year("CON2"));
    let stackedChart = dc.barChart("#votes");

    // create the chart
    stackedChart
        .width(1000)
        .height(500)
        .useViewBoxResizing(true) //sets the viewbox to the svg instead of width and height
        .margins({
            top: 10,
            right: 30,
            bottom: 90,
            left: 110
        })
        // add the dimension
        .dimension(year_dim)
        // add the group stacks
        .group(votes_per_year_others, "All Other")
        .stack(votes_per_year_scot, "PC/SNP")
        .stack(votes_per_year_LD3, "Lib Dem")
        .stack(votes_per_year_LAB, "Labour")
        .stack(votes_per_year_CON2, "Conservative")
        // axis/legend/colors
        .x(d3.scale.ordinal()) //x axis
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Votes (Millions) Per Party")
        .legend(dc.legend().x(0).y(10).itemHeight(10).gap(5))
        .colors(d3.scale.category10());
}


function show_seats_comparison(ndx) {

    // send data dimension to crossfilter
    let year_dim = ndx.dimension(dc.pluck("yearS"));

    // create year range for domain for axes
    let minYear = year_dim.bottom(1)[0].yearS;
    let maxYear = year_dim.top(1)[0].yearS;

    // function to group the dimension data per party
    function seats_per_year(party) {
        return function (d) {
            if (d.party === party) {
                return +d.seats;
            } else {
                return 0;
            }
        };
    }
    // create groups
    let other_seats = year_dim.group().reduceSum(seats_per_year("Other"));
    let scot_seats = year_dim.group().reduceSum(seats_per_year("PC/SNP"));
    let ld3_seats = year_dim.group().reduceSum(seats_per_year("LD3"));
    let lab_seats = year_dim.group().reduceSum(seats_per_year("LAB"));
    let con2_seats = year_dim.group().reduceSum(seats_per_year("CON2"));
    let compositeChart = dc.compositeChart("#composite");
    // create chart
    compositeChart
        .width(800)
        .height(400)
        .useViewBoxResizing(true)
        .dimension(year_dim)
        .legend(dc.legend().x(0).y(10).itemHeight(10).gap(5))
        .margins({
            top: 10,
            right: 30,
            bottom: 50,
            left: 100
        })
        .brushOn(false)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .yAxisLabel("Seats")
        .xAxisLabel("Election Year")
        .renderHorizontalGridLines(true) //helps to reference to axes 
        // create the data lines for each party
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