var busemenu = ["Commercial","Mixed Commercial","Residential","Industrial","Government","Religion","Hospital","Office","Agriculture","Education","Others"];
var lusemenu = ["Formal Settlements","Informal Settlements","Education","Health and Welfare","Government","Emergency and Defense","Cultural","Leisure","Energy Production","Water Supply","Communication","Waste Management","Transportation","Heavy Industry","Major Commercial","Food Security","Flood Control","Rural Residential","Agriculture","Horticulture","Aquaculture","Livestock","Forestry","Poultry","Market Gardening","Mixed Farming","Mixed Farming","Vacant Areas","Natural Areas","Reserved Areas","Reclamation"];
var occupants = ["1 to 5","6 to 10","11 to 20","21 to 50","51 to 100","101 to 500","501 to 1000","1001 to 5000",">5000","Unknown"];
var roofmaterial = ["Galvanized Iron","Aluminum","Tile Concrete","Clay","Wood","Cogon","Nipa","Anahaw","Asbestos","Mixed Galvanized Iron and Concrete","Improvised Materials","Concrete Slab","Synthetic Tile","Others","Unknown"];
var roofpitch=["Gentle","Moderate","Steep","Curved","Dome","Mixed","Others","Unknown"];
var wallmaterial=["Concrete","Brick","Stone","Wood","Mixed Concrete and Wood","Galvanized Iron","Aluminum","Bamboo","Sawali","Cogon","Nipa","Asbestos","Glass","Improvised Materials","Decorative Hollow Brick","Decorative Solid Brick","Others","No Wall","Unknown"];
var floorelev=["> 2 meters","1.5 to 2.0 meters","1.0 to 1.5 meters","0.5 to 1.0 meters","0.25 to 0.5 meters","0 to 0.25 meters","0 meters","0 to -0.25 meters","-0.25 to -0.5 meters","-0.5 to -1.0 meters","-1.0 to -1.5 meters","-1.5 meters to -2.0 meters","<-2.0 meters"];
var basement=["None","0 level","1 level","2 levels","3 levels","4 levels","5 levels",">6 levels"];
var foundation=["Hard Rock","Rock","Dense Soil and Soft Soil","Stiff Soil Profile","Soft Soil","Unknown"];
var maxflood=["Unknown","<0.5","0.5 to 1","1 to 2","2 to 3","3 to 4","4 to 5","5 to 6","6 to 7","7 to 8","8 to 9","9 to 10","10"];
var windowtype=["None","Glass Panels","Louvre","Glass Blocks","Screens","Protrouding","Jalousie","Other","Unknown"];
var yearbuilt=["Pre 1972","1972 to 1992","1992 to 2010","> 2010"];
var buildingtype=["One Family Dwelling","Two Family Dwelling","Multiple Dwelling","Row House","Apartment House","Hotel","Boarding House","Lodging House","Accessory Building","Office Building","Theater","Warehouse/Bodega/Cold Storage","Supermarket/Shopping Center","Factory Building","Recreation Building","Saw Mills and Lumber Sheds","Gasoline Service Station","Others","Unknown"];
var vertical=["Setback Floors","Multiple Towers","Split Levels","Non-Uniform Distribution of Mass","Heavy Ornaments","Long Canteliver","Tall Tower or Chimney","Soft Story","Large or Irregular Openings in Shear Walls","Transfer Structures","Interruptions of Beams","Opening in Floors(Atria)","Mixed Structural System","Building on Hillsides","Not Applicable"];
var horizontal=["Square","Rectangular","L-Shaped","T-Shaped","Hollow","Triangular","Circular","Polygonal","U-shaped","X-cranked","X-cruciform","Irregular"];
var buildingwidth=["<5","5-10","10-15","15-20","20-25","25-50",">50"];
var buildingdepth=["<5","5-10","10-15","15-20","20-25","25-50",">50"];
var bcondition=["Good","Fair","Poor","Under Construction"];
var roof=["None","Steel","Reinforced Concrete","Wood","Other","Unknown"];
var bracing=["None","Steel","Reinforced Concrete","Wood","Other","Unknown"];
var beam=["None","Steel","Reinforced Concrete","Wood","Other","Unknown"];
var column=["None","Steel","Reinforced Concrete","Wood","Other","Unknown"];
var structure=["W1L","W3L","NL","MWSL","CWSL","CHBL","URAL","C1L","C1M","C4M","C4H","PC2L","PC2M","S1L","S1M","S3L","S4M","Unknown"];
 //POPULATE FOR UPDATING OF DATA
$.each(busemenu,function(i,data){
	$("#ebuse-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(lusemenu,function(i,data){
	$("#eluse-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(occupants,function(i,data){
	$("#enumOcc-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(roofmaterial,function(i,data){
	$("#eroofMat-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(roofpitch,function(i,data){
	$("#erPitch-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(wallmaterial,function(i,data){
	$("#ewallMat-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(floorelev,function(i,data){
	$("#efElev-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(basement,function(i,data){
	$("#enumBase-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(foundation,function(i,data){
	$("#efType-menu").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(maxflood,function(i,data){
	$("#eMaxflood").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(windowtype,function(i,data){
	$("#eWtype").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(yearbuilt,function(i,data){
	$("#eybuilt").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(buildingtype,function(i,data){
	$("#ebtype").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(vertical,function(i,data){
	$("#evshape").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(horizontal,function(i,data){
	$("#ehshape").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(buildingwidth,function(i,data){
	$("#ebwidth").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(buildingdepth,function(i,data){
	$("#ebdepth").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(bcondition,function(i,data){
	$("#ebcondition").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(roof,function(i,data){
	$("#erfmaterial").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(bracing,function(i,data){
	$("#ebrmaterial").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(beam,function(i,data){
	$("#ebmmaterial").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(column,function(i,data){
	$("#eclmaterial").append("<option value='" + data + "'>" + data + "</option>");
});
$.each(structure,function(i,data){
	$("#estype").append("<option value='" + data + "'>" + data + "</option>");
});
  