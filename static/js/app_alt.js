var song_names_alt = [];
var lyric_cnt_alt = [];
var unique_cnt_alt = [];
var lexical_div_alt = [];

function init_alt() {

    var queryURL = "/song_lyrics";
    Plotly.d3.json(queryURL, function (error, response) {
        if (error) return console.warn(error);

        var lyric_data = response;

        for (var i = 0; i < lyric_data.length; i++) {

            var artist_titles = lyric_data[i].artist_title;
            var lyric_text = lyric_data[i].lyrics;
            var genres = lyric_data[i].genre;

            if (genres == "alternative") {
                var song_title = artist_titles;
                var lyric_count = WordCount(lyric_text);
                var unique_count = uni_count(lyric_text);
                var lex_div = unique_count/lyric_count;
                
                song_names_alt.push(song_title);
                lyric_cnt_alt.push(lyric_count);
                unique_cnt_alt.push(unique_count);
                lexical_div_alt.push(lex_div);
            }
        }
        var data = [{
            y: lyric_cnt_alt,
            x: song_names_alt,
            type: "bar"
        }];
        var layout = {
            height: 800,
            width: 1000,
            margin: {
                b:300,
                r: 200
            }
        };
    Plotly.plot("alt_bar", data, layout);
    });
}

function updatePlotly_alt(newx, newy, newtitle) {
    // Update the pie chart with the newdata array
    var $bar = document.getElementById("alt_bar");
    Plotly.restyle($bar, "x", [newx]);
    Plotly.restyle($bar, "y", [newy]);
    Plotly.restyle($bar, "title", [newtitle]);
}

// This function will get called from the dropdown event handler.
function getData_alt() {
    var y = [];
    var x = [];
    var title = [];
    // Retrieve the value of the dropdown menu
    var dataset = document.getElementById('selDataset_alt').value;

    // Select data array (YOUR CHOICE) depending on the value
    // of the dropdown menu.

    switch (dataset) {
    case "dataset1":
        console.log("Inside of dataset1");
        title = "Lyric Counts";
        y = lyric_cnt_alt;
        x = song_names_alt;
        break;
    case "dataset2":
        console.log("Inside of dataset2");
        title = "Unique Word Counts";
        y = unique_cnt_alt;
        x = song_names_alt;
        break;
    case "dataset3":
        console.log("Inside of dataset3");
        title = "Lexical Diversity (Unique Word Count/Total Lyric Count)";
        y = lexical_div_alt;
        x = song_names_alt;
        break;
    default:
        console.log("default");
        y = [
            1, 1, 1, 1
        ];
    }

    // Update plot with new data
    console.log('end', y)
    updatePlotly_alt(x, y, title);
}

init_alt();
