var data = [],
    width = 790,
    height = 714;

d3.csv('quakes.csv', function(d) {
	d.forEach(function(d) {
		data.push( d );
	});

	 var Xscale = d3.scale.linear()
	 	.domain(d3.extent(data, function(d) {return +d.longitude; })) //input (data) domain
	 	.range([0, width]);  //output range (pixels)

	 var Yscale = d3.scale.linear()
	 	.domain(d3.extent(data, function(d) {return +d.latitude; })) //input (data) domain
	 	.range([0, height]);  //output range (pixels)

	var svg = d3.select('body').append('svg')
		.attr('width', width)
		.attr('height',height);

	svg.append('image')		
		.attr('x', 0)		
		.attr('y', 0)
		.attr('width', width)
		.attr('height', height)
		.attr('xlink:href','img/OK-map.png');

	svg.selectAll('rect')			
		.data(data)
		.enter().append('circle')
		.attr("r", function(d) {return +d.mag*1.1;})
		.attr('cx', function(d) {return Xscale(+d.longitude); })
		.attr('cy', function(d) {return Yscale(+d.latitude); })
		.attr('fill', function(d) {
			return 'red';
			if(+d.time.substr(0,4) < 2000) {
				return 'blue';
			} else {
				//return 'red';
			}
		})
		.attr('opacity', function(d) {
			if(+d.time.substr(0,4) > 2000) {
				return '1';
			} else {
				return '0';
			}
		})
		
});