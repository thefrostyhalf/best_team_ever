var song_names = [];
var lyric_cnt = [];
var unique_cnt = [];
var lexical_div = [];

function init() {

    d3.csv("hiphop.csv", function(error, data) {
        data.forEach(function(d) {
            song_names.push(d.artist_title);
            lyric_cnt.push(parseInt(d.lyric_count));
            // console.log(lyric_cnt, "before");
            unique_cnt.push(parseInt(d.unique_count));
            lexical_div.push(parseFloat(d.lexical_diversity));
            
        });

        var data = [{
            y: lyric_cnt,
            x: song_names,
            type: "bar"
        }];
    
        var layout = {
            // title: "Lyric Count",
            height: 800,
            width: 1000,
            margin: {
                b:300,
            }
            
        };
    
        Plotly.plot("hiphop_bar", data, layout);

    });
}

function updatePlotly_hiphop(newx, newy, newtitle) {
    // Update the pie chart with the newdata array
    var $bar = document.getElementById("hiphop_bar");
    Plotly.restyle($bar, "x", [newx]);
    Plotly.restyle($bar, "y", [newy]);
    Plotly.restyle($bar, "title", [newtitle]);
}

// This function will get called from the dropdown event handler.
function getData_hiphop() {
    var y = [];
    var x = [];
    var title = [];
    // Retrieve the value of the dropdown menu
    var dataset = document.getElementById('selDataset_hiphop').value;

    // Select data array (YOUR CHOICE) depending on the value
    // of the dropdown menu.

    switch (dataset) {
    case "dataset1":
        console.log("Inside of dataset1");
        title = "Lyric Counts";
        y = lyric_cnt;
        x = song_names;
        break;
    case "dataset2":
        console.log("Inside of dataset2");
        title = "Unique Word Counts";
        y = unique_cnt;
        x = song_names;
        break;
    case "dataset3":
        console.log("Inside of dataset3");
        title = "Lexical Diversity (Unique Word Count/Total Lyric Count)";
        y = lexical_div;
        x = song_names;
        break;
    default:
        console.log("default");
        y = [
            1, 1, 1, 1
        ];
    }

    // Update plot with new data
    console.log('end', y)
    updatePlotly_hiphop(x, y, title);
}

init();
