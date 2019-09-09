// @flow
import React, { Component } from "react";
import * as d3 from "d3";

class PieChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {

    var width = 400
    var height = 200
    var margin = 10

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#myId2")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var data = { Graph:9, Arrays: 20, 
      Trees: 30, Math: 8}

    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(["Graphs", "Arrays", "Trees", "Math"])
      .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .sort(null) // Do not sort group by size
      .value(function (d) { return d.value; })
    var data_ready = pie(d3.entries(data))

    // The arc generator
    var arc = d3.arc()
      .innerRadius(radius * 0.5)         // This is the size of the donut hole
      .outerRadius(radius * 0.8)

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) { return (color(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Add the polylines between chart and labels:
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function (d) {
        var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
      })

    // Add the polylines between chart and labels:
    svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d) { console.log(d.data.key); return d.data.key })
      .attr('transform', function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
      })


    // var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    //   width = 220 - margin.right - margin.left,
    //   height = 220 - margin.top - margin.bottom,
    //   radius = width / 2;

    // // color range
    // var color = d3.scaleOrdinal()
    //   .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

    // // pie chart arc. Need to create arcs before generating pie
    // var arc = d3.arc()
    //   .outerRadius(radius - 10)
    //   .innerRadius(0);


    // // arc for the labels position
    // var labelArc = d3.arc()
    //   .outerRadius(radius - 50)
    //   .innerRadius(radius - 1);

    // // generate pie chart and donut chart
    // var pie = d3.pie()
    //   .sort(null)
    //   .value(function (d) { return d.count; });

    // // define the svg for pie chart
    // var svg = d3.select("#myId2").append("svg")
    //   .attr("width", width)
    //   .attr("height", height)
    //   .append("g")
    //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // // import data 
    // let data1 = d3.csvParse(`fruit,count
    // Graph,10 
    // Lists,20
    // DP,15
    // Arrays,20
    // Trees,30
    // `);

    // let data = data1;
    // // parse data
    // data.forEach(function (d) {
    //   d.count = +d.count;
    //   d.fruit = d.fruit;
    // })

    // // "g element is a container used to group other SVG elements"
    // var g = svg.selectAll(".arc")
    //   .data(pie(data))
    //   .enter().append("g")
    //   .attr("class", "arc");

    // // append path 
    // g.append("path")
    //   .attr("d", arc)
    //   .style("fill", function (d) { return color(d.data.fruit); })
    //   // transition 
    //   .transition()
    //   .ease(d3.easeLinear)
    //   .duration(2000)
    //   .attrTween("d", tweenPie);

    // // append text
    // let r = radius
    // g.append("text")
    //   .transition()
    //   .ease(d3.easeLinear)
    //   .duration(2000)
    //   .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
    //   .attr("dx", " 9px")
    //   .text(function (d) { return d.data.fruit; });


    // // "g element is a container used to group other SVG elements

    // // Helper function for animation of pie chart and donut chart
    // function tweenPie(b) {
    //   b.innerRadius = 0;
    //   var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    //   return function (t) { return arc(i(t)); };
    // }



  }

  render() {
    return <div id='myId2'></div>
  }
}

export default PieChart;