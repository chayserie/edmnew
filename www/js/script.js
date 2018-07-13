//SCRIPT for edm
var map;
var lat = undefined;
var lng = undefined;
var id;
//var accuracy;
document.addEventListener("deviceready",onDeviceReady,false);

//EZ Access
/*
	#menu [dashboard]
	#database [list of entered markers]
	#showall [not used?]
	#geolocation [page with maps]
	#info [structural building types]
	#addmarker [adding markers form]
	
*/
//for camera
function cameratakephotos(){
	navigator.camera.getPicture(onsuc,onfail,{
		quality:50,
		correctOrientation:true,
		saveToPhotoAlbum:true,
		destinationType: Camera.DestinationType.FILE_URI
	});
	function onsuc(imageData){
		var image = document.getElementById('myimg');
		image.src = "data:image/jpeg;base64," + imageData;	
	}
	function onfail(message){
		alert("Fail Because " + message);
		
	}
}

function onDeviceReady(){
	//Load database during runtime
	database();
	
	//Load Google Maps before loading the maps page
		navigator.geolocation.getCurrentPosition(onSuccess, onError,{enableHighAccuracy:true});
	//load the camera plugin
		document.getElementById("cameratakephotos").addEventListener
		("click",cameratakephotos);
		
	$("#dbButton").click(function(){
		db.transaction(function(tx){
			tx.executeSql("Select * from bldg_template",[],function(tx,res){
				$("#dblist").html("");
				for(var x=0;x<res.rows.length;x++){
					id = res.rows.item(x)._id;
					$("#dblist").append("<li data-id='"+id+"'><a href='#' class='viewdetails'><img src="+res.rows.item(x).PHOTO1+">"+"<h3>"+res.rows.item(x).BLDG_NAME+"</h3>"+"<p>"+res.rows.item(x).STR_NAME+"</p></a><a href='#' class='editButton'></a></li>");
				}
				$("#dblist").listview("refresh");
			
		//for showing each data in full details from database
		$(".viewdetails").click(function(){
			id = $(this).parent().attr("data-id");
			db.transaction(function(tx){
				tx.executeSql("select * from bldg_template where _id = '"+id+"'",[],function(tx,res){
					for(var x=0;x<res.rows.length;x++){
					$("#showheader").html(res.rows.item(x).BLDG_NAME);
					$("#tbldetail").html(
						"<tr><td colspan='2' class='title'>GEOGRAPHY</td></tr>"+
						"<tr><td class='red'>DATA ID :</td><td>"+res.rows.item(x)._id+"</td></tr>"+
						"<tr><td class='red'>Unit ID: </td><td>"+res.rows.item(x).UNIT+"</td></tr>"+
						"<tr><td class='red'>Unit ID: </td><td>"+res.rows.item(x).UNIT+"</td></tr>"+
						"<tr><td class='red'>Latitude:</td><td>"+res.rows.item(x).LATITUDE+"</td></tr>"+
						"<tr><td class='red'>Longitude :</td><td>"+res.rows.item(x).LONGITUDE+"</td></tr>"+
						"<tr><td  class='red'>Province Name:</td><td>"+res.rows.item(x).PROVINCE+"</td></tr>"+
						"<tr><td  class='red'>Municipality Name:</td><td>"+res.rows.item(x).CITY+"</td></tr>"+
						"<tr><td  class='red'>Barangay :</td><td>"+res.rows.item(x).BARANGAY+"</td></tr>"+
						"<tr><td  class='red'>Street Name:</td><td>"+res.rows.item(x).STR_NAME+"</td></tr>"+
						"<tr><td  class='red'>Building Name :</td><td>"+res.rows.item(x).BLDG_NAME+"</td></tr>"+
						"<tr><td colspan='2' class='title'>BUILDING PHOTOS</td></tr>"+
						"<tr><td  class='red'>Photo 1 :</td><td>"+res.rows.item(x).PHOTO1+"</td></tr>"+
						"<tr><td  class='red'>Photo 2 :</td><td>"+res.rows.item(x).PHOTO2+"</td></tr>"+
						"<tr><td  class='red'>Photo 3 :</td><td>"+res.rows.item(x).PHOTO3+"</td></tr>"+
						"<tr><td  class='red'>Photo 4 :</td><td>"+res.rows.item(x).PHOTO4+"</td></tr>"+
						"<tr><td colspan='2' class='title'>BUILDING USAGE</td></tr>"+
						"<tr><td class='red'>Building Use :</td><td>"+res.rows.item(x).USE1+"</td></tr>"+
						"<tr><td class='red'>Land Use Level 4 :</td><td>"+res.rows.item(x).lu_l4+"</td></tr>"+
						"<tr><td class='red'>Number of Occupants :</td><td>"+res.rows.item(x).USE1_PPL+"</td></tr>"+
						"<tr><td colspan='2' class='title'>ROOF AND WALL ATTRIBUTES</td></tr>"+
						"<tr><td class='red'>Roof Materials :</td><td>"+res.rows.item(x).ROOF1+"</td></tr>"+
						"<tr><td class='red'>Roof Pitch :</td><td>"+res.rows.item(x).ROOF_PITCH+"</td></tr>"+
						"<tr><td class='red'>Wall Materials :</td><td>"+res.rows.item(x).WALL1+"</td></tr>"+
						"<tr><td colspan='2' class='title'>FLOOR AND FACADE ATTRIBUTES</td></tr>"+
						"<tr><td class='red'>Basement Level :</td><td>"+res.rows.item(x).BASEMENT+"</td></tr>"+
						"<tr><td class='red'>Floor Elevation :</td><td>"+res.rows.item(x).FL_ELEV+"</td></tr>"+
						"<tr><td class='red'>Foundation Type :</td><td>"+res.rows.item(x).FOUNDTN+"</td></tr>"+
						"<tr><td class='red'>Maximum Flood Level :</td><td>"+res.rows.item(x).MAX_FLOOD+"</td></tr>"+
						"<tr><td class='red'>Window Type :</td><td>"+res.rows.item(x).WIND_TYPE+"</td></tr>"+
						"<tr><td colspan='2' class='title'>BUILDING STRUCTURAL SYSTEM</td></tr>"+
						"<tr><td class='red'>Year Built :</td><td>"+res.rows.item(x).YRBUILT_R+"</td></tr>"+
						"<tr><td class='red'>Building Type :</td><td>"+res.rows.item(x).BLDG_TYPE+"</td></tr>"+
						"<tr><td class='red'>Vertical Plan Shape :</td><td>"+res.rows.item(x).VERTSHAPE1+"</td></tr>"+
						"<tr><td class='red'>Horizontal Plan Shape :</td><td>"+res.rows.item(x).HORZ_SHAPE+"</td></tr>"+
						"<tr><td class='red'>Building Width :</td><td>"+res.rows.item(x).WIDTH_M+"</td></tr>"+
						"<tr><td class='red'>Building Depth :</td><td>"+res.rows.item(x).DEPTH_M+"</td></tr>"+
						"<tr><td class='red'>Number of Storeys :</td><td>"+res.rows.item(x).NO_STOREYS+"</td></tr>"+
						"<tr><td class='red'>Building Condition :</td><td>"+res.rows.item(x).BLDG_CNDTN+"</td></tr>"+
						"<tr><td class='red'>Roof Frame Material :</td><td>"+res.rows.item(x).roof_frame_mat+"</td></tr>"+
						"<tr><td class='red'>Bracing Material :</td><td>"+res.rows.item(x).bracing_mat+"</td></tr>"+
						"<tr><td class='red'>Beam Material :</td><td>"+res.rows.item(x).beam_mat+"</td></tr>"+
						"<tr><td class='red'>Column Material :</td><td>"+res.rows.item(x).column_mat+"</td></tr>"+
						"<tr><td class='red'>Structural System Type :</td><td>"+res.rows.item(x).STRSYS_TYP+"</td></tr>"
						);//end of html table
					}//end of for loop
					$.mobile.navigate( "#show" );//navigate to show page
				});//end of sql
			});//end of transaction
		});	//end of .viewdetails
		
		//pop up for edit and delete button
		
		$(".editButton").click(function(){
		id = $(this).parent().attr("data-id");
		$("#dataID").val(id);
		db.transaction(function(tx){
			tx.executeSql("select * from bldg_template where _id = '"+id+"'",[],function(tx,res){
				$("#elat").val(res.rows.item(0).LATITUDE);
				$("#elng").val(res.rows.item(0).LONGITUDE);
				$("#eprov").val(res.rows.item(0).PROVINCE);
				var eprov = res.rows.item(0).PROVINCE;
				var emuni = res.rows.item(0).CITY;
				var ebrgy = res.rows.item(0).BARANGAY;
				tx.executeSql("SELECT DISTINCT(MUNICIPALITY_CITY) as MUNICIPALITY_CITY from barangays where PROVINCE = '" + eprov + "'",[],function(tx,res1){
					//loop add municipalities
					for(var x=0; x < res1.rows.length;x++){
					$("#emuni").append("<option value='"+res1.rows.item(x).MUNICIPALITY_CITY+"'>"+res1.rows.item(x).MUNICIPALITY_CITY+ "</option>");
					}
					$("#emuni").val(emuni).attr("selected",true).siblings("option").removeAttr("selected");
					$("#emuni").selectmenu();
					$("#emuni").selectmenu("refresh",true);

					
				});
				tx.executeSql("select distinct(BARANGAY_NAME) AS BARANGAY_NAME from barangays where PROVINCE = '"+eprov+"' and MUNICIPALITY_CITY = '"+emuni+"'",[],function(tx,res2){
					//loop for add barangays
					for(var x=0; x < res2.rows.length;x++){
						$("#ebrgy").append("<option value='"+res2.rows.item(x).BARANGAY_NAME+"'>"+res2.rows.item(x).BARANGAY_NAME+"</option>");
					}
						$("#ebrgy").val(ebrgy).attr("selected",true).siblings("option").removeAttr("selected");
						$("#ebrgy").selectmenu();
						$("#ebrgy").selectmenu("refresh",true);	
					
				});
				$("#estreet").val(res.rows.item(0).STR_NAME);
				$("#ebldg").val(res.rows.item(0).BLDG_NAME);
				$("#ebuse-menu").val(res.rows.item(0).USE1);
				$("#eluse-menu").val(res.rows.item(0).lu_l4);
				$("#enumOcc-menu").val(res.rows.item(0).USE1_PPL);
				$("#eroofMat-menu").val(res.rows.item(0).ROOF1);
				$("#erPitch-menu").val(res.rows.item(0).ROOF_PITCH);
				$("#ewallMat-menu").val(res.rows.item(0).WALL1);
				$("#efElev-menu").val(res.rows.item(0).FL_ELEV);
				$("#enumBase-menu").val(res.rows.item(0).BASEMENT);
				$("#efType-menu").val(res.rows.item(0).FOUNDTN);
				$("#eMaxflood").val(res.rows.item(0).MAX_FLOOD);
				$("#eWtype").val(res.rows.item(0).WIND_TYPE);
				$("#eybuilt").val(res.rows.item(0).YRBUILT_R);
				$("#ebtype").val(res.rows.item(0).BLDG_TYPE);
				$("#evshape").val(res.rows.item(0).VERTSHAPE1);
				$("#ehshape").val(res.rows.item(0).HORZ_SHAPE);
				$("#ebwidth").val(res.rows.item(0).WIDTH_M);
				$("#ebdepth").val(res.rows.item(0).DEPTH_M);
				$("#efloor").val(res.rows.item(0).NO_STOREYS);
				$("#ebcondition").val(res.rows.item(0).BLDG_CNDTN);
				$("#erfmaterial").val(res.rows.item(0).roof_frame_mat);
				$("#ebrmaterial").val(res.rows.item(0).bracing_mat);
				$("#ebmmaterial").val(res.rows.item(0).beam_mat);
				$("#eclmaterial").val(res.rows.item(0).column_mat);
				$("#estype").val(res.rows.item(0).STRSYS_TYP);
	//NAVIGATE TO edit form		
				$(":mobile-pagecontainer").pagecontainer("change", "#edit", {reloadPage:false});

			
			});
		},
		function onError(error){
			alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
		}
		);	
		});
	//for update function	
			
		$("#editdata").click(function(){
				db.transaction(function(tx){
				//28 items
				var eprov = $('#eprov').find(":selected").text();
				var emuni = $('#emuni').find(":selected").text();
				var ebrgy = $('#ebrgy').find(":selected").text();
				var estreet = $('input:text[id=estreet]').val();
				var ebldg = $('input:text[id=ebldg]').val();
				var efloor = $('#efloor').val();
				var ebuse = $('#ebuse-menu').find(":selected").text();
				var eluse = $('#eluse-menu').find(":selected").text();
				var enumocc = $('#enumOcc-menu').find(":selected").text();
				var erf = $('#eroofMat-menu').find(":selected").text();
				var erpitch = $('#erPitch-menu').find(":selected").text();
				var ewall = $('#ewallMat-menu').find(":selected").text();
				var efelev = $('#efElev-menu').find(":selected").text();
				var enumbase = $('#enumBase-menu').find(":selected").text();
				var eftype = $('#efType-menu').find(":selected").text();
				var eflood = $('#eMaxflood').find(":selected").text();
				var ewtype = $('#eWtype').find(":selected").text();
				var eybuilt = $('#eybuilt').find(":selected").text();
				var ebtype = $('#ebtype').find(":selected").text();
				var evshape = $('#evshape').find(":selected").text();
				var ehshape = $('#ehshape').find(":selected").text();
				var ebwidth = $('#ebwidth').find(":selected").text();
				var ebdepth = $('#ebdepth').find(":selected").text();
				var ebcon = $('#ebcondition').find(":selected").text();
				var erf = $('#erfmaterial').find(":selected").text();
				var ebr = $('#ebrmaterial').find(":selected").text();
				var ebm = $('#ebmmaterial').find(":selected").text();
				var ecl = $('#eclmaterial').find(":selected").text();
				var estype = $('#estype').find(":selected").text();	
	//for update button
				var updatesql = "update bldg_template set PROVINCE = '"+eprov+"', CITY = '"+emuni+"', BARANGAY = '"+ebrgy+"',STR_NAME = '"+estreet+"', BLDG_NAME = '"+ebldg+"',USE1 = '"+ebuse+"', lu_l4 = '"+eluse+"',USE1_PPL = '"+enumocc+"',ROOF1='"+erf+"',ROOF_PITCH='"+erpitch+"',WALL1='"+ewall+"',BASEMENT='"+enumbase+"',FL_ELEV='"+efelev+"',FOUNDTN='"+eftype+"',MAX_FLOOD='"+eflood+"',WIND_TYPE='"+ewtype+"',YRBUILT_R='"+eybuilt+"',BLDG_TYPE='"+ebtype+"',VERTSHAPE1='"+evshape+"',HORZ_SHAPE='"+ehshape+"',WIDTH_M='"+ebwidth+"',DEPTH_M='"+ebdepth+"',NO_STOREYS='"+efloor+"',BLDG_CNDTN='"+ebcon+"',roof_frame_mat='"+erf+"',bracing_mat='"+ebr+"',beam_mat='"+ebm+"',column_mat='"+ecl+"',STRSYS_TYP='"+estype+"' where _id = '"+id+"' ";
				tx.executeSql(updatesql);
				$(":mobile-pagecontainer").pagecontainer("change", "#database", {reloadPage:false});
				$("#" + id).find("h3").html(ebldg);
				$("#" + id).find("h3").html(estreet);
				//$("#dblist").append("<li data-id='"+id+"'><a href='#' class='viewdetails'>"+"<h3>"+ebldg+"</h3>"+"<p>"+estreet+"</p></a><a href='#' class='editButton'></a></li>");
				alert("Save Successfully!");
				$("#dblist").listview("refresh");
			},
		function onError(error){
			alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
		}
			)
		});
	});
	});
	});
	
}//end of device ready



function onSuccess(position){
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	//accuracy = position.coords.accuracy;
	
	getMap(lat,lng);

}
function onError(error){
	alert('code: '    + error.code    + '\n' +
  'message: ' + error.message + '\n');
}
//for google Map Function//

function getMap(lat,lng) {
var mapOptions = {
	'mapType': plugin.google.maps.MapTypeId.HYBRID,
	'controls':{
		'compass':true,
		'indoorPicker':true,
		'zoom': true
	},
	'gestures':{
		'scroll':true,
		'tilt':true,
		'rotate':true,
		'zoom':true
	},
	'controls':{
	myLocationButton:true
	}
}
var msg = ["Latitude:" + lat+"\n",
		"Longitude:" + lng];
		//"Accuracy:"+accuracy];
		
		

// Initialize the map view
map = plugin.google.maps.Map.getMap(document.getElementById("map"),mapOptions);
var addclick;
var latLng = new google.maps.LatLng(lat,lng);
map.one(plugin.google.maps.event.MAP_READY, function(){
	map.setMyLocationEnabled(true);
	console.log("maps work well");
	map.animateCamera({
		target:latLng,
		zoom:20,
		tilt:40,
		bearing:140,
		duration:1000
	});
	$("#add").click(function(){
		addclick=map.addEventListener(plugin.google.maps.event.MAP_CLICK,onMapClicked);
	
	});
	
	function onMapClicked(latLng){
	//	alert("call click");
	//	var markerLoc = latLng.toUrlValue();
		lat = latLng.lat.toFixed(6);
		lng = latLng.lng.toFixed(6);
		$("#lat").val(lat);
		$("#lng").val(lng);
		//alert("Lat: " + lat + "\nLng: " + lng);
			
			$.mobile.navigate("#addmarker");
			map.removeEventListener(plugin.google.maps.event.MAP_CLICK,onMapClicked);
		};
	});
};

//for database function
function database(){
	db = window.sqlitePlugin.openDatabase({
		name:"bdb.db",
		createFromLocation:1,
		androidDatabaseImplementation: 2,
		androidLockWorkaround: 1
	});
	//for adding function
	//for the province select menu
	db.transaction(function(tx){
		tx.executeSql("SELECT distinct(PROVINCE) AS 'PROVINCE' FROM barangays ORDER BY PROVINCE ASC",[],function(tx,res){
			$("#prov").html("<option disabled selected value>Select Province</option>");
			for(var x = 0; x < res.rows.length;x++){
				$("#prov").append("<option value='"+res.rows.item(x).PROVINCE+"'>" + res.rows.item(x).PROVINCE + "</option>");
			}
			
		});
	},
	function(e){
		alert("Error: " + e.message)
	});
	//for the municipality select menu,change depend on the selected province
	
	$("#prov").change(function(){
	var prov = $("#prov").val();
	$("#muni").html("<option disabled selected value>Select Municipality</option>");
	db.transaction(function(tx){
		tx.executeSql("SELECT DISTINCT(MUNICIPALITY_CITY) AS 'CITY' FROM barangays where PROVINCE='"+ prov +"'", [], function(tx,res){
			for(var x=0; x < res.rows.length;x++){
			$("#muni").append("<option value='"+res.rows.item(x).CITY+"'>"+res.rows.item(x).CITY+ "</option>");
			}
		});
	},
	function(e){
	alert("ERROR:" + e.message)
	}
	);
	//for the barangay select menu depend on the selected municipality
	$("#muni").change(function(){
	var muni = $("#muni").val();
	$("#brgy").html("<option disabled selected value>Select Barangay</option>");
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM barangays where PROVINCE='"+prov+"' and MUNICIPALITY_CITY='"+muni+"'", [], function(tx,res){
			for(var x=0; x<res.rows.length;x++){
			$("#brgy").append("<option value='"+res.rows.item(x).BARANGAY_NAME+"'>"+res.rows.item(x).BARANGAY_NAME+"</option>");
			}
		});
	});
	});
	});
	
	
//for update function

	//for the province select menu
	db.transaction(function(tx){
		tx.executeSql("SELECT distinct(PROVINCE) AS 'PROVINCE' FROM barangays ORDER BY PROVINCE ASC",[],function(tx,res){
			$("#eprov").html("<option disabled selected value>Select Province</option>");
			for(var x = 0; x < res.rows.length;x++){
				$("#eprov").append("<option value='"+res.rows.item(x).PROVINCE+"'>" + res.rows.item(x).PROVINCE + "</option>");
			}
			
		});
	},
	function(e){
		alert("Error: " + e.message)
	});
//this part is for saving the data to the database.
$("#savedata").click(function(){
	db.transaction(function(tx){
	var lat = $('input:text[id=lat]').val();
	var lng = $('input:text[id=lng]').val();
	//28 items
	var sprov = $('#prov').find(":selected").text();
	var smuni = $('#muni').find(":selected").text();
	var sbrgy = $('#brgy').find(":selected").text();
	var strname = $('input:text[id=street]').val();
	var bname = $('input:text[id=bldg]').val();
	var storeys = $('#floor').val();
	var buse = $('#buse-menu').find(":selected").text();
	var luse = $('#luse-menu').find(":selected").text();
	var numOcc = $('#numOcc-menu').find(":selected").text();
	var rf = $('#roofMat-menu').find(":selected").text();
	var rpitch = $('#rPitch-menu').find(":selected").text();
	var wallmat = $('#wallMat-menu').find(":selected").text();
	var felev = $('#fElev-menu').find(":selected").text();
	var numbase = $('#numBase-menu').find(":selected").text();
	var ftype = $('#fType-menu').find(":selected").text();
	var maxflood = $('#Maxflood').find(":selected").text();
	var wtype = $('#Wtype').find(":selected").text();
	var ybuilt = $('#ybuilt').find(":selected").text();
	var btype = $('#btype').find(":selected").text();
	var vshape = $('#vshape').find(":selected").text();
	var hshape = $('#hshape').find(":selected").text();
	var bwidth = $('#bwidth').find(":selected").text();
	var bdepth = $('#bdepth').find(":selected").text();
	var bcondition = $('#bcondition').find(":selected").text();
	var rfmaterial = $('#rfmaterial').find(":selected").text();
	var bracing = $('#brmaterial').find(":selected").text();
	var bmmaterial = $('#bmmaterial').find(":selected").text();
	var clmaterial = $('#clmaterial').find(":selected").text();
	var stype = $('#stype').find(":selected").text();
	
	//required field
	var isSaveOK=true;
	if(sprov=="Select Province"){
		isSaveOK=false;
	}
	if(smuni=="Select Municipality"){
		isSaveOK=false;
	}
	if(sbrgy=="Select Barangay"){
		isSaveOK=false;
	}
	if(strname==""){
		isSaveOK=false;
	}
	if(bname==""){
		isSaveOK=false;
	}
	if(numOcc=="Select Number of Occupants"){
		isSaveOK=false;
	}
	if(felev=="Select Floor Elevation"){
	//	alert(felev);
		isSaveOK=false;	
	}
	if(numbase=="Select Number of Basement Levels"){
	//	alert(numbase);
		isSaveOK=false;	
	}
	if(ftype=="Select Foundation Type"){
	//	alert(ftype);
		isSaveOK=false;	
	}
	if(maxflood=="Select Maximum Flood Level"){
	//	alert(maxflood);
		isSaveOK=false;
	}
	if(ybuilt=="Select Year Built"){
	//alert(ybuilt);
	isSaveOK=false;
	}
	if(bwidth=="Select Building Width"){
	//alert(bwidth);
	isSaveOK=false;
	
	}
	if(bdepth=="Select Building Width"){
	//alert(bwidth);
	isSaveOK=false;
	}
	
	//not required select
	if(buse=="Select Building Use"){
		buse="null";
	}
	if(luse=="Select Land Use"){
	luse="null";
	}
	if(rf=="Select Roof Material"){
	rf="null";
	}
	if(rpitch=="Select Roof Pitch"){
	rpitch="null";
	}
	if(wallmat=="Select Wall Material"){
	wallmat="null";
	}
	if(rf=="Select Roof Material"){
	rf="null";
	}
	if(wtype=="Select Window Type"){
	wtype="null";
	}
	if(btype=="Select Building Type"){
	btype="null";
	}
	if(vshape=="Select Vertical Plan Shape"){
	vshape="null";
	}
	if(hshape=="Select Horizontal Plan Shape"){
	hshape="null";
	}
	if(bcondition=="Select Building Condition"){
	bcondition="null";
	}
	if(rfmaterial=="Select Roof Frame Material"){
	rfmaterial="null";
	}
	if(bracing=="Select Bracing Material"){
	bracing="null";
	}
	if(bmmaterial=="Select Beam Material"){
	bmmaterial="null";
	}
	if(clmaterial=="Select Column Material"){
	clmaterial="null";
	}
	if(stype=="Select Structural System Type"){
	stype="null";
	}
	
	if(isSaveOK==false){
	alert(sprov + "\n" +smuni+ "\n" + sbrgy+ "\n" + "Input Street Name"+"\n" +"Input Building Name" +"\n" +numOcc + "\n"+felev+"\n"+numbase+"\n"+ftype+"\n"+maxflood+"\n"+ybuilt+"\n"+bwidth+"\n"+bdepth);
	$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	
	//add all validations here
	//if true then insert the data in the db.
	if(isSaveOK){
		
		var sql = "INSERT into bldg_template(LATITUDE,LONGITUDE,PROVINCE,CITY,BARANGAY,STR_NAME,BLDG_NAME,USE1,lu_l4,USE1_PPL,ROOF1,ROOF_PITCH,WALL1,BASEMENT,FL_ELEV,FOUNDTN,MAX_FLOOD,WIND_TYPE,YRBUILT_R,BLDG_TYPE,VERTSHAPE1,HORZ_SHAPE,WIDTH_M,DEPTH_M,NO_STOREYS,BLDG_CNDTN,roof_frame_mat,bracing_mat,beam_mat,column_mat,STRSYS_TYP)VALUES('" + lat + "','" + lng + "','" + sprov + "','" + smuni + "','" + sbrgy + "','" + strname + "','" + bname + "','" + buse + "','" + luse + "','" + numOcc + "','" + rf + "','" + rpitch + "','" + wallmat + "','" + numbase + "','" + felev + "','" + ftype + "','" + maxflood + "','" + wtype + "','" + ybuilt + "','" + btype + "','" + vshape + "','" + hshape + "','" + bwidth + "','" + bdepth + "','" + storeys + "','" + bcondition + "','" + rfmaterial + "','" + bracing + "','" + bmmaterial + "','" + clmaterial + "','" + stype + "')";
		tx.executeSql(sql);
		
		//refresh form
		$("#addmarker input").val("");
		$("#addmarker option[value='default']").attr('selected', 'selected');
		$("#addmarker select").selectmenu("refresh",true);
		//navigate to geolocation
		$(":mobile-pagecontainer").pagecontainer("change", "#geolocation", {reloadPage:false});
		alert("Save Successfully!");
		var latLng = new plugin.google.maps.LatLng(lat,lng);
		map.addMarker({
			//convert lat + lng to lnglng
			position:latLng,
			title:latLng,
			animation:plugin.google.maps.Animation.DROP
			});
	}

		},function(e){
	alert("ERROR:" + e.message)
	});//end of transaction

});//end of save function	



}//end of database-----

