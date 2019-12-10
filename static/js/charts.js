queue()
    .defer(d3.tsv, "data/vote-share.tsv")
    .await(makeCharts);

function makeCharts(error, votesData) {


}