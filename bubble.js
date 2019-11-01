// var width = 1500;
// var height = 1000;
// var maxRecord = 0;
// var minRecord0;
//
//
// d3.queue()
//   .defer(d3.csv, 'databreaches.csv')
//   .await(ready)
//
//
// function ready(error, data) {
//
//   console.log(data)
//   var svg = d3.select("#chart")
//     .append("svg")
//     .attr("height", height)
//     .attr("width", width)
//     .append("g").attr("class", "group")
//
//   var forceXSeperate = d3.forceX(function (d) {
//     let population = numeral(d['records']).value()
//     if (population < 9900000) {
//       return 200
//     }
//     else {
//       return 800
//     }
//
//
//   }).strength(0.05)
//
//   var forceXcombine = d3.forceX(function (d) {
//     return width / 2
//   }).strength(0.05)
//   var forceY = d3.forceY(function (d) {
//     return height / 2
//   }).strength(0.05)
//
//   var forceCollide = d3.forceCollide(function (d) {
//     return radiusScale(numeral(d['records']).value()+(Math.random() * 20))
//   })
//
//   var simulation = d3.forceSimulation()
//     .force("x", forceXcombine)
//     .force("y", forceY)
//     .force("collide", forceCollide)
//   let minyear = d3.min(data, function (d) {
//     return +d.YEAR;
//   });
//   let maxyear = d3.max(data, function (d) {
//     return +d.YEAR;
//   })
//   let maxRecord = d3.max(data, function (d) {
//     return numeral(d['records']).value();
//   })
//   let minRecord = d3.min(data, function (d) {
//     return numeral(d['records']).value();
//   });
//   var xScale = d3.scaleLinear().domain([0, 1]).range([10, width - 150]);
//   var yScale = d3.scaleLinear().domain([minyear, maxyear]).range([10, height - 150]);
//   var xAxis = d3.axisBottom().scale(xScale).ticks(20)
//   var yAxis = d3.axisLeft().scale(yScale).ticks(20)
//   var radiusScale = d3.scaleLinear().domain([minRecord, maxRecord]).range([20, 150]);
//   var colorScale = d3.scaleSequential().domain([0, 1]).interpolator(d3.interpolateViridis);
//   var colorScale = d3.scaleOrdinal().domain(['hacked','poor security','oops!'])
//    .range(['lightblue', '#b3f0ff', '#d07132']);
//
//   var groups = svg.selectAll(".circle_class")
//     .data(data)
//     .enter()
//     .append("g")
//     .attr("class", "group")
//
//     let circles = groups.append("circle")
//     .attr("class", "circle_class")
//     .attr("cx", function (d) {
//       return radiusScale(numeral(d['records']).value()+ (Math.random() * 20))
//     })
//     .attr("cy", function (d) {
//       return radiusScale(numeral(d['records']).value() + (Math.random() * 20))
//     })
//     .attr("r", function (d) {
//       return radiusScale(numeral(d['records']).value()+ (Math.random() * 20) )
//     }).style("fill", function(d){
//       return colorScale(Math.random())
//     }).on("click", function (d) {
//       console.log(d)
//     })
//
//     let texts = groups.append("text")
//     .style('fill', 'black')
//     .style("text-anchor", "middle")
//     .attr('font-size',15)//font size
//     .attr("x", 0)
//     .attr("y", 10)
//     texts.selectAll("tspan.text")
//     .data(d => d.Entity.split(" "))
//     .enter()
//     .append("tspan")
//     .attr("class", "text")
//     .text(d => d)
//     .attr("x", 20)
//     .attr("dx", 10)
//     .attr("dy", 10);
//   d3.select("#seperate").on('click', function () {
//     simulation
//       .force("x", forceXSeperate)
//       .alphaTarget(0.5)
//       .restart()
//   })
//
//   d3.select("#combine").on('click', function () {
//     simulation
//       .force("x", forceXcombine)
//       .alphaTarget(0.5)
//       .restart()
//   })
//
//   simulation.nodes(data)
//     .on('tick', ticked)
//
//
//   function ticked() {
//     groups.attr("transform", (data)=>{return "translate("+ data.x +","+data.y+")"});
//     // texts.attr("x", function (d) {
//     //   return d.x
//     // })
//     // .attr("y", function (d) {
//     //   return d.y
//     // });
//     // circles
//       // .attr("cx", function (d) {
//       //   return d.x
//       // })
//       // .attr("cy", function (d) {
//       //   return d.y
//       // })
//   }
//
//
// }
