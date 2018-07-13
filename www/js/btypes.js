var btypes = [
    { "btype":"W1L", "desc":"Wood, Light Frame" },
	{ "btype":"W3L", "desc":"Bamboo" },
	{ "btype":"NL", "desc":"Makeshift" },
	{ "btype":"MWSL", "desc":"Concrete Hollow Blocks with Wood or Light Metal" },
	{ "btype":"CWSL", "desc":"Reinforced Concrete Moment Frames with Wood or Light Metal" },
	{ "btype":"CHBL", "desc":"Concrete Hollow Bloks" },
	{ "btype":"URAL", "desc":"Unreinforced Adobe or Stone Bearing Walls" },
	{ "btype":"URML", "desc":"Unreinforced Masonry Bearing Walls" },
	{ "btype":"C1L", "desc":"Concrete Moment Frames" },
	{ "btype":"CWSL", "desc":"Reinforced Concrete Moment Frames with Wood or Light Metal" },
	{ "btype":"C1M", "desc":"Concrete Shear Walls" },
	{ "btype":"C4M", "desc":"Concrete Shear Walls and Frames" },
	{ "btype":"C4H", "desc":"Concrete Shear Walls and Frames" },
	{ "btype":"PC2L", "desc":"Precast Concrete Frames w/ Concrete Shear Walls" },
	{ "btype":"PC2M", "desc":"Precast Concrete Frames w/ Concrete Shear Walls" },
	{ "btype":"S1L", "desc":"Steel Moment Frames" },
	{ "btype":"S1M", "desc":"Steel Moment Frames" },
	{ "btype":"S3L", "desc":"Light Metal Frames" },
	{ "btype":"S4M", "desc":"Steel Frames with Cast-in-Place Concrete Shear Walls" },
	{ "btype":"Unknown", "desc":"unknown" }
];
$.each(btypes,function(i,data){
	$("#btypes").append("<li><a href='#btypeinfo' data-rel='popup' data-position-to='window' data-transition='flip'><img src='img/bldg/" + data.btype + ".png'><h2>" + data.btype + "</h2><p>" + data.desc + "</p></a></li>");
});
$("#btypes li a").click(function(){
	var type = $(this).find("h2").html();
	var desc = $(this).find("p").html();
	$("#btypeinfo h3").html(type);
	$("#btypeinfo p").html(desc);
	$("#btypeinfo img").attr("src","img/bldg/" + type + ".png");
});