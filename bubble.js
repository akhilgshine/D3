
var width = 1500;
var height = 1000;
var maxRecord = 0;
var minRecord = 0;
var clusterPadding = 6

d3.queue()
    .defer(d3.csv, 'databreaches.csv')
    .await(ready)











function ready(error, data) {
  var svg = d3.select("#chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")



      var forceXSeperate = d3.forceX(function(d) {
        let population = numeral(d['records']).value()
        alert(population)

          if (d.population > 380000) {
              return 600
          } else {
              return 800
          }


      }).
      strength(0.05)

      var forceXcombine = d3.forceX(function(d) {
          return width / 2
      }).strength(0.05)
      var forceY = d3.forceY(function(d) {
          return height / 2
      }).strength(0.05)

      var forceCollide = d3.forceCollide(function(d) {
          return radiusScale(numeral(d['records']).value())+(Math.random() * 20)
      })

      var simulation = d3.forceSimulation()
          .force("x", forceXcombine)
          .force("y", forceY)
          .force("collide", forceCollide)

          let minyear = d3.min(data, function (d) {
            return +d.YEAR;
          });
          let maxyear = d3.max(data, function (d) {
            return +d.YEAR;
          })
          let maxRecord = d3.max(data, function (d) {
            return numeral(d['records']).value();
          })
          let minRecord = d3.min(data, function (d) {
            return numeral(d['records']).value();
          });

          var radiusScale = d3.scalePow().exponent(0.5).domain([0, maxRecord]).range([20, 150]);

          var fillColor = d3.scaleOrdinal()

   .domain(['hacked','poor security','oops!'])
   .range(['#e3b172', '#d27533', '#d07132']);
          // var colorScale = d3.scaleSequential().domain([0, 1]).interpolator(d3.interpolateViridis);
          var groups = svg.selectAll(".circle_class")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "group")

            let circles = groups.append("circle")
            .attr("class", "circle_class")
            .attr("cx", function (d) {
              return radiusScale(numeral(d['records']).value()) + (Math.random() * 20)
            })
            .attr("cy", function (d) {
              return radiusScale(numeral(d['records']).value()) + (Math.random() * 20)
            })
            .attr("r", function (d) {
              return radiusScale(numeral(d['records']).value()) + (Math.random() * 20)
            })
            .style("fill", function(d){ return fillColor(d.METHOD); })
            .on("click", function (d) {
              console.log(d)
            })
            .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
    d3.select("#seperate").on('click', function() {
        simulation
            .force("x", forceXSeperate)
            .alphaTarget(0.5)
            .restart()
    })

    d3.select("#combine").on('click', function() {
        simulation
            .force("x", forceXcombine)
            .alphaTarget(0.5)
            .restart()
    })

    simulation.nodes(data)
        .on('tick', ticked)


    function ticked() {

        groups.attr("transform", (data)=>{return "translate("+ data.x +","+data.y+")"});

}
}
