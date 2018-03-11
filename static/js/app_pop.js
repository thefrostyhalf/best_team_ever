var song_names_pop = [];
var lyric_cnt_pop = [];
var unique_cnt_pop = [];
var lexical_div_pop = [];

function WordCount(str) { 
    return str.split(" ").length;
  }

function uni_count(sentence) {
    var list = sentence.split(' ');
    var words = {};
    for (var i = 0; i < list.length; i++) {
      if (!(words.hasOwnProperty(list[i]))) {
        words[list[i]] = 0;
      }
      ++words[list[i]];
    }
    return Object.keys(words).length;
}

function init_pop() {

    var queryURL = "/song_lyrics";
    Plotly.d3.json(queryURL, function (error, response) {
        if (error) return console.warn(error);

        var lyric_data = response;

        for (var i = 0; i < lyric_data.length; i++) {

            var artist_titles = lyric_data[i].artist_title;
            var lyric_text = lyric_data[i].lyrics;
            var genres = lyric_data[i].genre;

            if (genres == "pop") {
                var song_title = artist_titles;
                var lyric_count = WordCount(lyric_text);
                var unique_count = uni_count(lyric_text);
                var lex_div = unique_count/lyric_count;
                
                song_names_pop.push(song_title);
                lyric_cnt_pop.push(lyric_count);
                unique_cnt_pop.push(unique_count);
                lexical_div_pop.push(lex_div);
            }
        }
        var data = [{
            y: lyric_cnt_pop,
            x: song_names_pop,
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
    Plotly.plot("pop_bar", data, layout);
    });
}

function updatePlotly_pop(newx, newy, newtitle) {
    // Update the pie chart with the newdata array
    var $bar = document.getElementById("pop_bar");
    Plotly.restyle($bar, "x", [newx]);
    Plotly.restyle($bar, "y", [newy]);
    Plotly.restyle($bar, "title", [newtitle]);
}

// This function will get called from the dropdown event handler.
function getData_pop() {
    var y = [];
    var x = [];
    var title = [];
    // Retrieve the value of the dropdown menu
    var dataset = document.getElementById('selDataset_pop').value;

    // Select data array (YOUR CHOICE) depending on the value
    // of the dropdown menu.

    switch (dataset) {
    case "dataset1":
        console.log("Inside of dataset1");
        title = "Lyric Counts";
        y = lyric_cnt_pop;
        x = song_names_pop;
        break;
    case "dataset2":
        console.log("Inside of dataset2");
        title = "Unique Word Counts";
        y = unique_cnt_pop;
        x = song_names_pop;
        break;
    case "dataset3":
        console.log("Inside of dataset3");
        title = "Lexical Diversity (Unique Word Count/Total Lyric Count)";
        y = lexical_div_pop;
        x = song_names_pop;
        break;
    default:
        console.log("default");
        y = [
            1, 1, 1, 1
        ];
    }

    // Update plot with new data
    console.log('end', y)
    updatePlotly_pop(x, y, title);
}

init_pop();
