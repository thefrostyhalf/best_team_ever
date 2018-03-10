// Init function to generate dropdrown items and fetch songs and genres
function init() {
    var queryURL = "/song_data";
    d3.json(queryURL, function (error, response) {
        if (error) return console.warn(error);
        for (var i = 0; i < response.length; i++) {
            var select = document.getElementById('selDataset');
            option = document.createElement('option');
            option.value = response[i]; 
            option.text = response[i];
            select.appendChild(option);
        }
    });
}
init();


function optionChanged() {
    var selection = document.getElementById('selDataset').value
    updateCloud(selection);
}

//  Variable linked to the lyrics, this should be linked to the lyric key / variable of the database
var lyric_test = "Another night, another dream but always you It's like a vision of love that seems to be true Another night another dream but always you In the night I dream of love so true  Just another night, another vision of love You feel joy, you feel pain, 'cuz nothing will be the same Just another night is all that it takes To understand the difference between lovers and fakes  So baby, I talk talk, I talk to you In the night in your dream of love so true I talk talk, I talk to you In the night in your dream of love so true  In the night, in my dreams, I'm in love with you 'Cuz you talk to me like lovers do I feel joy, I feel pain, 'cuz it's still the same When the night is gone I'll be alone  ...  ";

// this creates a variable stripping the lyrics of commas, be without commas
var lyric_no_comma = lyric_test.toLowerCase().replace(/,|0|1|2|3|4|5|6|7|8|9/g,'');

// This function will separate the individual words in lyrics and append to a list (copied this function from online lol)
function separate(sentence) {
    var list = sentence.split(' ');
    var words = {};
    for (var i = 0; i < list.length; i++) {
      if (!(words.hasOwnProperty(list[i]))) {
        words[list[i]] = 0;
      }
      ++words[list[i]];
    }
    return words;
};

// This is simply a quality test to ensure the lyrics indeed have no commas
//console.log(lyric_no_comma);

// The display variable is an array of the individual words of the lyrics
var display = separate(lyric_no_comma);

// Quality test to ensure individual words are separated into an array i.e. checking that separate function works
//console.log(display);

// Initialize empty list called frequency_list that will eventually contain the individual words and their text
var frequency_list = []; // create an empty array

// variables text_keys and size_values will be arrays holding what text to display and the size of the text
var text_keys = Object.keys(display);
var size_values = Object.values(display);

// Quality test that text_keys and size_values are the arrays you want i.e. the text and their intended size on the word cloud
// size_value correlates with the frequency the word appears in the lyrics
//console.log(text_keys);
//console.log(size_values);

// Loop through text_keys and size_values and push to frequency_list
for (var i = 0; i < text_keys.length; i++) {

    frequency_list.push({
        "text":  text_keys[i],
        "size": size_values[i]*10 // Multiplied by 10 here to increase the size of word cloud, this could be changed depending on how big you wish the word cloud to be
    });

};

// Quality check frequency_list contains the intended text and their respective size value 
//console.log(frequency_list);

    // This piece of code is copied from online
    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

    d3.layout.cloud().size([800, 300])
            .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    function draw(words) {
        d3.select("body").append("svg")
                .attr("width", 850)
                .attr("height", 350)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(320,200)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }

function updateCloud(selection) {
    d3.select("svg").remove();
    var url = "/lyrics/" + selection;
    d3.json(url, function (error, response) {
        if (error) return console.warn(error);
        var lyric_no_comma = response.toString().toLowerCase().replace(/,|0|1|2|3|4|5|6|7|8|9|"/g,'');
        var display = separate(lyric_no_comma);
        var frequency_list = [];
        var text_keys = Object.keys(display);
        var size_values = Object.values(display);
        for (var i = 0; i < text_keys.length; i++) {
            var size = size_values[i];
            frequency_list.push({
                "text":  text_keys[i],
                "size": Math.min(90, Math.floor(Math.log(size)*10) + 10)
            });
        };
        console.log(frequency_list)
        d3.layout.cloud().size([800, 300])
        .words(frequency_list)
        .rotate(0)
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();
})};