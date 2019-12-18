queue()
    .defer(d3.tsv, "data/change-2019.tsv")
    .await(makeGraphs);

function makeGraphs(error, latestData) {
    if (error) throw error;

    let ndx = crossfilter(latestData);

    show_change(ndx);
}

function show_change(ndx) {

    let party_dim = ndx.dimension(dc.pluck("Party"));

    let party_group = party_dim.group

    let change_dim = ndx.dimension(dc.pluck("Change"));



    let pieChart = dc.pieChart("#pie-2019");

    pieChart
        .width(400)
        .height(400)
        .useViewBoxResizing(true)
        .dimension(party_dim)
        .group(party_dim)


}