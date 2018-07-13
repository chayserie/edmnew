/*Project Info
Project Name: REDAS EDM
Institution: PHIVOLCS
Author: Chayserie Moises
Date Started: 3/4/2017
LAST UPDATE: 9/25/2017
VERSION:1.3.2
*/

//Global Services
var map; //Google Maps Api Handler
var db; //Sqlite Database Handler
var fs; //File Storage API Handle
//Global Variables
var lat; 
var lng;
var bldgid;
var unitid;
var sdate;
var stime;
//for login page
$(document).ready(function(){
	$("#btnlogin").click(function(){
		unitid = $("#unit").val();
		var id = unitid.substring(0,1);
		unitid=unitid.substring(1);
		if($("#remember").is(":checked")){
			localStorage.setItem("id",unitid);
		}
		if(id == '#'){
			alert("Your Unit ID is: "+ unitid);	
			location = "index.html#menu";
		}
		else if (id != '#' && id != ''){
			alert("Wrong Unit ID");
		}
	});
	
	$("#logout").click(function(){
	localStorage.removeItem("id");
	alert("Logged Out");
	$.mobile.navigate("#login");
	});
});

//load when device is ready
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady(){
	unitid = localStorage.getItem("id");
	console.log("unitid" + unitid);
	if(unitid == "" || unitid == "undefined" || unitid == null){
		alert("Please Enter Unit ID");
	}
	else if(unitid !== ""){
		alert("welcome back  : " + unitid)
		$.mobile.navigate("#menu")
	}
	
	//Load Google Maps before loading the maps page
		navigator.geolocation.getCurrentPosition(onSuccess, onError,{enableHighAccuracy:true});
		
		//Load Database (Insert default values, Load and Fill data views)
	database();
	//for quit button
	$("#quit").click(function(){
		navigator.app.exitApp();
	});
	
	$("#c1").click(startcam);
	$("#c2").click(startcam);
	$("#c3").click(startcam);
	$("#c4").click(startcam);
	
	function startcam(){
        var imgID = this.getAttribute("data-target");
        navigator.camera.getPicture(onSuccess,onFail,{quality:50,destinationType:Camera.DestinationType.FILE_URI, correctOrientation:true});
        function onSuccess(imageURI){
            var image = document.getElementById(imgID);
            image.src=imageURI;
			
            //move the picture to folder
            
            window.resolveLocalFileSystemURL(imageURI,function(fileEntry){
                window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
                    fs.root.getDirectory("EDM",{create:true,exclusive:false},function(edmDir){
                        edmDir.getDirectory("images",{create:true,exclusive:false},function(imgDir){
							var lt=$("#lat").val();
							var lg=$("#lng").val();
                           var fname =  unitid +'_'+lt+lg+'_'+ imgID + ".jpg";
						   fileEntry.moveTo(imgDir,fname,function(){
                                image.setAttribute("data-filename",fname);
								
                            },function(e){
                                alert("Cant move picture");
                            });
                        },function(e){
                            alert("Cant open images folder");
                        });
                    },function(e){
                        alert("Cant open EDM Folder");
                    });
                },function(e){
                    alert("Cant open EDM File System")
                });
            },function(e){
                alert("Cant find picture file");
            })
            
        }

        function onFail(e){
            alert("Failed because: " + e);
        }
	}
	
	function getPictureUrl(fname,imgID){
	//	alert("getPictureUrl fname: " + fname);
	//	alert("getPictureUrl imgID: " + imgID);
		window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
			fs.root.getDirectory("EDM",{create:true,exclusive:false},function(edmDir){
				edmDir.getDirectory("images",{create:true,exclusive:false},function(imgDir){
				   imgDir.getFile(fname,{create:false,exclusive:false},function(imgFileEntry){
					   $("#" + imgID).attr("src",imgFileEntry.toURL());
				   });
				},function(e){
					alert("Cant open images folder");
				});
			},function(e){
				alert("Cant open EDM Folder");
			});
		},function(e){
			alert("Cant open EDM File System")
		});
	}
	function datesurvey(){
		var curdate = new Date();
		var year = curdate.getFullYear();
		var month = ('0'+(curdate.getMonth() + 1)).slice(-2);
		var day = ('0'+ curdate.getDate()).slice(-2);
		var hour = ('0'+curdate.getHours()).slice(-2);
		var minutes = ('0'+curdate.getMinutes()).slice(-2);
		var sec = ('0'+curdate.getSeconds()).slice(-2);
		sdate = year +'-'+ month +'-'+ day;
		stime = hour + ':' + minutes+':'+sec;
	}
	//Functionalities //Button, element events, etc.
	//for drop down menu of municipalities and barangays'
	//saving data
	
	$("#savedata").click(function(){
	//get the current date and time;
	datesurvey();
	db.transaction(function(tx){
	var lat = $('input:text[id=lat]').val();
	var lng = $('input:text[id=lng]').val();
	//28 items
	//geography
	var sprov = $('#prov').find(":selected").text();
	var smuni = $('#muni').find(":selected").text();
	var sbrgy = $('#brgy').find(":selected").text();
	var strname = $('input:text[id=street]').val().toString().replace(/,/g, "");
	var bname = $('input:text[id=bldg]').val().toString().replace(/,/g, "");
	//building usage
	var buse = $('#buse-menu').find(":selected").text();
	var luse = $('#luse-menu').find(":selected").text();
	var numOcc = $('#numOcc-menu').find(":selected").text();
	//roof and wall attributes
	var rf = $('#roofMat-menu').find(":selected").text();
	var rpitch = $('#rPitch-menu').find(":selected").text();
	var wallmat = $('#wallMat-menu').find(":selected").text();
	//floor and facade attributes
	var felev = $('#fElev-menu').find(":selected").text();
	var numbase = $('#numBase-menu').find(":selected").text();
	var ftype = $('#fType-menu').find(":selected").text();
	var maxflood = $('#Maxflood').find(":selected").text();
	var wtype = $('#Wtype').find(":selected").text();
	//building structural system
	var ybuilt = $('#ybuilt').find(":selected").text();
	var btype = $('#btype').find(":selected").text();
	var vshape = $('#vshape').find(":selected").text();
	var hshape = $('#hshape').find(":selected").text();
	var bwidth = $('#bwidth').find(":selected").text();
	var bdepth = $('#bdepth').find(":selected").text();
	var storeys = $('#storeys').val();
	var bcondition = $('#bcondition').find(":selected").text();
	var rfmaterial = $('#rfmaterial').find(":selected").text();
	var bracing = $('#brmaterial').find(":selected").text();
	var bmmaterial = $('#bmmaterial').find(":selected").text();
	var clmaterial = $('#clmaterial').find(":selected").text();
	var stype = $('#stype').find(":selected").text();
	
	//required field
	$(".req").find("span").remove();
	$(".req").removeClass("req");
	var isSaveOK=true;
	if(sprov=="Select Province"){
		isSaveOK=false;
		$("#req1").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(smuni=="Select Municipality"){
		isSaveOK=false;
		$("#req2").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(sbrgy=="Select Barangay"){
		isSaveOK=false;
		$("#req3").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(strname==""){
		isSaveOK=false;
		$("#req4").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(bname==""){
		isSaveOK=false;
		$("#req5").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(numOcc=="Select Number of Occupants"){
		isSaveOK=false;
		$("#req6").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(felev=="Select Floor Elevation"){
		isSaveOK=false;	
		$("#req7").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(numbase=="Select Number of Basement Levels"){
		isSaveOK=false;	
		$("#req8").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(ftype=="Select Foundation Type"){
		isSaveOK=false;
		$("#req9").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(maxflood=="Select Maximum Flood Level"){
		isSaveOK=false;
		$("#req10").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(ybuilt=="Select Year Built"){
		isSaveOK=false;
		$("#req11").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(bwidth=="Select Building Width"){
		isSaveOK=false;
		$("#req12").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(bdepth=="Select Building Depth"){
		isSaveOK=false;
		$("#req13").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(storeys==""){
		isSaveOK=false;
		$("#req18").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	if(stype =="Select Structural System Type"){
		isSaveOK=false;
		$("#req14").addClass("req");
		$(":mobile-pagecontainer").pagecontainer("change", "#addmarker", {reloadPage:false});
	}
	
	$(".req").append("<span style='color:red; font-weight:bold;'> \n Required Field </span>");
	
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
	
	if(isSaveOK==false){
	alert("Please complete all the required fields");
	}
	//add all validations here
	//if true then insert the data in the db.
	if(isSaveOK){
		var fname1=$("#t1").attr("data-filename");
		var fname2=$("#t2").attr("data-filename");
		var fname3=$("#t3").attr("data-filename");
		var fname4=$("#t4").attr("data-filename");
		var sql = "INSERT into bldg_template(LATITUDE,LONGITUDE,PROVINCE,CITY,BARANGAY,STR_NAME,BLDG_NAME,USE1,lu_l4,USE1_PPL,ROOF1,ROOF_PITCH,WALL1,BASEMENT,FL_ELEV,FOUNDTN,UNIT,DATE_SURV,TIME_SURV,MAX_FLOOD,WIND_TYPE,YRBUILT_R,BLDG_TYPE,VERTSHAPE1,HORZ_SHAPE,WIDTH_M,DEPTH_M,NO_STOREYS,BLDG_CNDTN,roof_frame_mat,bracing_mat,beam_mat,column_mat,STRSYS_TYP,PHOTO1,PHOTO2,PHOTO3,PHOTO4)VALUES('" + lat + "','" + lng + "','" + sprov + "','" + smuni + "','" + sbrgy + "','" + strname + "','" + bname + "','" + buse + "','" + luse + "','" + numOcc + "','" + rf +"','" + rpitch + "','" + wallmat + "','" + numbase + "','" + felev + "','" + ftype + "','" + unitid + "','" + sdate + "','" + stime + "','" + maxflood + "','" + wtype  + "','" + ybuilt + "','" + btype + "','" + vshape + "','" + hshape + "','" + bwidth + "','" + bdepth + "','" + storeys + "','" + bcondition + "','" + rfmaterial + "','" + bracing + "','" + bmmaterial + "','" + clmaterial + "','" + stype + "','" + fname1 + "','" + fname2 + "','" + fname3 + "','" + fname4 + "')";
		tx.executeSql(sql);
	
		//refresh form
		$("#t1").attr('src', 'img/bldg/noimg.png');
		$("#t2").attr('src', 'img/bldg/noimg.png');
		$("#t3").attr('src', 'img/bldg/noimg.png');
		$("#t4").attr('src', 'img/bldg/noimg.png');
		$('#addmarker input[type=text]').val("");
		$('#addmarker input[type=number]').val("");
		$("#addmarker option[value='default']").attr('selected', 'selected');
		$("#addmarker select").selectmenu("refresh",true);
		//navigate to geolocation
		$(":mobile-pagecontainer").pagecontainer("change", "#geolocation", {reloadPage:false});
		alert("Save Successfully!");
		var latLng = new plugin.google.maps.LatLng(lat,lng);
		map.addMarker({
			//convert lat + lng to lnglng
			position:latLng,
			title:bname,
			animation:plugin.google.maps.Animation.DROP
			});
	}

		},function(e){
	alert("ERROR:" + e.message)
	});//end of transaction

});//end of save function	


	
}//end of device ready

function onSuccess(position){
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	//accuracy = position.coords.accuracy;
	getMap(lat,lng);

}
function onError(error){
	alert('code' +error.code +'\n'+ 'message:' +error.message);
}


function handleBldg(id){
	var sel = "#" + id;
}

function fillMuni(province,emuni){
	$("#emuni").html("<option value selected>Select Municipality</option>");
	db.transaction(function(tx){
		tx.executeSql("SELECT DISTINCT(MUNICIPALITY_CITY) AS 'CITY' FROM barangays where PROVINCE='"+ province +"' ORDER BY MUNICIPALITY_CITY ASC", [], function(tx,res){
			for(var x=0; x < res.rows.length;x++){
			$("#emuni").append("<option value='"+res.rows.item(x).CITY+"'>"+res.rows.item(x).CITY+ "</option>");
			}
			
			$("#emuni").val(emuni).attr("selected",true).siblings("option").removeAttr("selected");
			$("#emuni").selectmenu();
			$("#emuni").selectmenu("refresh",true);
		});
	},
	function(e){
	alert("ERROR:" + e.message)
	});
}

function fillBrgy(province,muni,ebrgy){
	$("#ebrgy").html("<option value selected>Select Barangay</option>");
		db.transaction(function(tx){
			tx.executeSql("SELECT * FROM barangays where PROVINCE='"+province+"' and MUNICIPALITY_CITY='"+muni+"' ORDER BY BARANGAY_NAME ASC", [], function(tx,res){
				for(var x=0; x<res.rows.length;x++){
				$("#ebrgy").append("<option value='"+res.rows.item(x).BARANGAY_NAME+"'>"+res.rows.item(x).BARANGAY_NAME+"</option>");
				}
				
				$("#ebrgy").val(ebrgy).attr("selected",true).siblings("option").removeAttr("selected");
				$("#ebrgy").selectmenu();
				$("#ebrgy").selectmenu("refresh",true);
			});
		});
}

function database(){
	//loading default data from database
	//database connection
	db = window.sqlitePlugin.openDatabase({
		name:"bdb.db",
		createFromLocation:1,
		androidDatabaseImplemantation: 2,
		androidLockWorkaround:1
	});
	//getting province name for select menu
	db.transaction(function(tx){
		tx.executeSql("SELECT distinct(PROVINCE) AS 'PROVINCE' FROM barangays ORDER BY PROVINCE ASC",[],function(tx,res){
			$("#prov").html("<option value selected>Select Province</option>");
			for(var x = 0; x < res.rows.length;x++){
				$("#prov").append("<option value='"+res.rows.item(x).PROVINCE+"'>" + res.rows.item(x).PROVINCE + "</option>");
			}
			
		});
	},
	function(e){
		alert("Error: " + e.message)
	});
	//getting province name for select menu
	db.transaction(function(tx){
		tx.executeSql("SELECT distinct(PROVINCE) AS 'PROVINCE' FROM barangays ORDER BY PROVINCE ASC",[],function(tx,res){
			$("#eprov").html("<option value selected>Select Province</option>");
			for(var x = 0; x < res.rows.length;x++){
				$("#eprov").append("<option value='"+res.rows.item(x).PROVINCE+"'>" + res.rows.item(x).PROVINCE + "</option>");
			}
			
		});
	},
	function(e){
		alert("Error: " + e.message)
	});
	//for the municipality select menu,change depend on the selected province
	
	$("#prov").change(function(){
		var prov = $("#prov").val();
		$("#muni").html("<option value selected>Select Municipality</option>");
		db.transaction(function(tx){
			tx.executeSql("SELECT DISTINCT(MUNICIPALITY_CITY) AS 'CITY' FROM barangays where PROVINCE='"+ prov +"' order by MUNICIPALITY_CITY ASC", [], function(tx,res){
				for(var x=0; x < res.rows.length;x++){
				$("#muni").append("<option value='"+res.rows.item(x).CITY+"'>"+res.rows.item(x).CITY+ "</option>");
				}
			});
		},
		function(e){
		alert("ERROR:" + e.message)
		});
		//for the barangay select menu depend on the selected municipality
		$("#muni").change(function(){
		var muni = $("#muni").val();
		$("#brgy").html("<option value selected>Select Barangay</option>");
			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM barangays where PROVINCE='"+prov+"' and MUNICIPALITY_CITY='"+muni+"' ORDER BY BARANGAY_NAME ASC", [], function(tx,res){
					for(var x=0; x<res.rows.length;x++){
					$("#brgy").append("<option value='"+res.rows.item(x).BARANGAY_NAME+"'>"+res.rows.item(x).BARANGAY_NAME+"</option>");
					}
				});
			});
		});
	});
	
	//Export DATA
	$("#exportbtn").click(function(){
		//use db transaction, 
		//alert("calling");
		var exp="_id,DATA_ID,LONGITUDE,LATITUDE,BLDG_NAME,STR_NUMBER,STR_NAME,BARANGAY,DISTRICT,CITY,PROVINCE,YRBUILT_R,YRBUILT_Y,BLDG_TYPE,STRSYS_L,STRSYS_TYP,VERTSHAPE1,VERTSHAPE2,HORZ_SHAPE,WIDTH_M,DEPTH_M,NO_STOREYS,BLDG_CNDTN,SEISMSEP_L$,SEISMSEP_R,USE1,USE1_PC,USE1_PPL,USE2,USE2_PC,USE2_PPL,USE3,USE3_PC,USE3_PPL,R_ATTACH1,R_ATTACH2,ATTACH_HT,ROOF_PITCH,ROOF1,ROOF1_PC,ROOF2,ROOF2_PC,DECORATION,WALL1,WALL1_LOW,WALL1_HIGH,WALL2,WALL2_LOW,WALL2_HIGH,W_ATTACH1,W_ATTACH2,FL_SYSTEM,FL_TYPE,FL_ELEV,SUBFL_PC,SUBFL_USE,BASEMENT,SLOPE,FOUNDTN,FACADE1,FACADE2,FAC_PROJ,WIND_TYPE,COMMENTS,SURV_BY,UNIT,DATE_SURV,CONFIDENCE,PHOTO1,PHOTO2,PHOTO3,PHOTO4,TIME_SURV,MAX_FLOOD,CRIT_FAC_ID,CRIT_FAC_NAME,taxable,attic,bracing_mat,roof_frame_mat,beam_mat,column_mat,roof_sup,roof_fast,roof_sys,roof_frsys,roof_frcon,wall_int,wall_open,sus_flmat,car_park,basement_lev,building_id,lot_id,lu_l4,lu_l4_code,lu_l5,lu_poly_id,xx7,xx8,xx9,xx10,dummy\n";
		//alert(exp);
		db.transaction(function(tx){
			tx.executeSql("select * from bldg_template order by _id asc", [],function(tx,res){
				for(var a=0;a<res.rows.length;a++){
					exp = exp +res.rows.item(a)._id + ", "
					+"null,"
					+res.rows.item(a).LONGITUDE + ","
					+res.rows.item(a).LATITUDE + ","
					+res.rows.item(a).BLDG_NAME + ","
					+"null,"
					+res.rows.item(a).STR_NAME + ","
					+res.rows.item(a).BARANGAY + ","
					+"null,"
					+res.rows.item(a).CITY + ","
					+res.rows.item(a).PROVINCE + ","
					+res.rows.item(a).YRBUILT_R + ","
					+"null,"
					+res.rows.item(a).BLDG_TYPE + ","
					+"null,"
					+res.rows.item(a).STRSYS_TYP + ","
					+res.rows.item(a).VERTSHAPE1 + ","
					+"null,"
					+res.rows.item(a).HORZ_SHAPE + ","
					+res.rows.item(a).WIDTH_M + ","
					+res.rows.item(a).DEPTH_M + ","
					+res.rows.item(a).NO_STOREYS + ","
					+res.rows.item(a).BLDG_CNDTN + ","
					+"null,"
					+"null,"
					+res.rows.item(a).USE1 + ","
					+"null,"
					+res.rows.item(a).USE1_PPL + ","
					+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"
					+res.rows.item(a).ROOF_PITCH + ","
					+res.rows.item(a).ROOF1 + ","
					+"null,"+"null,"+"null,"+"null,"
					+res.rows.item(a).WALL1 + ","
					+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"
					+res.rows.item(a).FL_ELEV + ","
					+"null,"+"null,"
					+res.rows.item(a).BASEMENT + ","
					+"null,"
					+res.rows.item(a).FOUNDTN + ","
					+"null,"+"null,"+"null,"
					+res.rows.item(a).WIND_TYPE + ","
					+"null,"
					+"null,"
					+res.rows.item(a).UNIT + ","
					+res.rows.item(a).DATE_SURV + ","
					+"null,"
					+res.rows.item(a).PHOTO1 + ","
					+res.rows.item(a).PHOTO2 + ","
					+res.rows.item(a).PHOTO3 + ","
					+res.rows.item(a).PHOTO4 + ","
					+res.rows.item(a).TIME_SURV + ","
					+res.rows.item(a).MAX_FLOOD + ","
					+"null,"+"null,"+"null,"+"null,"
					+res.rows.item(a).bracing_mat + ","
					+res.rows.item(a).roof_frame_mat + ","
					+res.rows.item(a).beam_mat + ","
					+res.rows.item(a).column_mat + ","
					+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"
					+res.rows.item(a).lu_l4 + ","
					+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null,"+"null \n";
				}
				exportDb(exp);
				
			},function(error){
				alert("ExecuteSql Error: " + error);
			});
		},function(error){
			alert("error"+error);
		});
	});
	
	function exportDb(exp){
		  window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
				fs.root.getDirectory("EDM",{create:true},function(fdir){
					var d = new Date();
					var y = d.getFullYear();
					var m = d.getMonth() + 1;
					if(m < 10) m = "0" + m;
					var dt = d.getDate();
					if(dt < 10) dt = "0" + dt;
					var exportfilename = "EDM_Export_" + y +"-" + m + "-" + dt +  ".csv";
					fdir.getFile(exportfilename,{create:true,exclusive:false},function(fileEntry){
						//alert("File Okay? " + fileEntry.isFile.toString());
						//alert("File Ready: " + fileEntry.fullPath);
						//write now
						fileEntry.createWriter(function(fileWriter){
							fileWriter.onwriteend=function(){
								alert("Successfully written file to" + fileEntry.fullPath);
							}

							fileWriter.onerror = function(e){
								alert("Cant Write to File because: " + e.toString());
							}

							//var dataObj = new Blob([imageData],{type:'image/jpeg'});
							fileWriter.write(exp);
						});
					},function(){
						alert("Cant Create File");
					});
				});
			},function(){
				alert("Cant Open File System");
			});
	}
	
	//for list view
	$("#dbButton").click(function(){
		db.transaction(function(tx){
			tx.executeSql("Select * from bldg_template", [], function(tx,res){
				$("#dblist").html("");
				for(var x=0;x<res.rows.length;x++){
					bldgid=res.rows.item(x)._id;
					$("#dblist").append("<li data-id='"+bldgid+"'><a href='#' class='showdetails'><h3>"+res.rows.item(x).BLDG_NAME+"</h3><p>"+res.rows.item(x).STR_NAME+"</p></a><a href='#' class='editButton'></a></li>");
				}
				$("#dblist").listview("refresh");
				
				//show each data
				$(".showdetails").click(function(){
					bldgid = $(this).parent().attr("data-id");
					db.transaction(function(tx){	
						tx.executeSql("Select * from bldg_template where _id='"+bldgid+"'",[],function(tx,res){
							for(var x=0;x<res.rows.length;x++){
								$("table td").addClass("red");
								$("#showheader").html(res.rows.item(x).BLDG_NAME);
								$("#tbldetail").html(
								"<tr><td td colspan='2' class='title'>GEOGRAPHY</td></tr>"+
								"<tr><td>DATA ID</td><td>"+res.rows.item(x)._id+"</td></tr>"+
								"<tr><td>UNIT ID</td><td>"+res.rows.item(x).UNIT+"</td></tr>"+
								"<tr><td>DATE SURVEY</td><td>"+res.rows.item(x).DATE_SURV+"</td></tr>"+
								"<tr><td>TIME SURVEY</td><td>"+res.rows.item(x).TIME_SURV+"</td></tr>"+
								"<tr><td>LATITUDE</td><td>"+res.rows.item(x).LATITUDE+"</td></tr>"+
								"<tr><td>LONGITUDE</td><td>"+res.rows.item(x).LONGITUDE+"</td></tr>"+
								"<tr><td>PROVINCE NAME</td><td>"+res.rows.item(x).PROVINCE+"</td></tr>"+
								"<tr><td>MUNICIPALITY NAME</td><td>"+res.rows.item(x).CITY+"</td></tr>"+
								"<tr><td>BARANGAY NAME</td><td>"+res.rows.item(x).BARANGAY+"</td></tr>"+
								"<tr><td>STREET NAME</td><td>"+res.rows.item(x).STR_NAME+"</td></tr>"+
								"<tr><td>BUILDING NAME</td><td>"+res.rows.item(x).BLDG_NAME+"</td></tr>"+
								"<tr><td colspan='2' class='title'>BUILDING PHOTOS</td></tr>"+
								"<tr><td>PHOTO 1</td><td>"+res.rows.item(x).PHOTO1+"</td></tr>"+
								"<tr><td>PHOTO 2</td><td>"+res.rows.item(x).PHOTO2+"</td></tr>"+
								"<tr><td>PHOTO 3</td><td>"+res.rows.item(x).PHOTO3+"</td></tr>"+
								"<tr><td>PHOTO 4</td><td>"+res.rows.item(x).PHOTO4+"</td></tr>"+
								"<tr><td colspan='2' class='title'>BUILDING USAGE</td></tr>"+
								"<tr><td>BUILDING USE</td><td>"+res.rows.item(x).USE1+"</td></tr>"+
								"<tr><td>LAND USE</td><td>"+res.rows.item(x).lu_l4+"</td></tr>"+
								"<tr><td>NUMBER OF OCCUPANTS</td><td>"+res.rows.item(x).USE1_PPL+"</td></tr>"+
								"<tr><td colspan='2' class='title'>ROOF AND WALL ATTRIBUTES</td></tr>"+
								"<tr><td>ROOF MATERIALS</td><td>"+res.rows.item(x).ROOF1+"</td></tr>"+
								"<tr><td>ROOF PITCH</td><td>"+res.rows.item(x).ROOF_PITCH+"</td></tr>"+
								"<tr><td>WALL MATERIALS</td><td>"+res.rows.item(x).WALL1+"</td></tr>"+
								"<tr><td colspan='2' class='title'>FLOOR AND FACADE ATTRIBUTES</td></tr>"+
								"<tr><td>BASEMENT LEVEL</td><td>"+res.rows.item(x).BASEMENT+"</td></tr>"+
								"<tr><td>FLOOR ELEVATION</td><td>"+res.rows.item(x).FL_ELEV+"</td></tr>"+
								"<tr><td>FOUNDATION TYPE</td><td>"+res.rows.item(x).FOUNDTN+"</td></tr>"+
								"<tr><td>MAXIMUM FLOOD LEVEL</td><td>"+res.rows.item(x).MAX_FLOOD+"</td></tr>"+
								"<tr><td>WINDOW TYPE</td><td>"+res.rows.item(x).WIND_TYPE+"</td></tr>"+
								"<tr><td colspan='2' class='title'>BUILDING STRUCTURAL SYSTEM</td></tr>"+
								"<tr><td>YEAR BUILT</td><td>"+res.rows.item(x).YRBUILT_R+"</td></tr>"+
								"<tr><td>BUILDING TYPE</td><td>"+res.rows.item(x).BLDG_TYPE+"</td></tr>"+
								"<tr><td>VERTICAL PLAN SHAPE</td><td>"+res.rows.item(x).VERTSHAPE1+"</td></tr>"+
								"<tr><td>HORIZONTAL PLAN SHAPE</td><td>"+res.rows.item(x).HORZ_SHAPE+"</td></tr>"+
								"<tr><td>BUILDING WIDTH</td><td>"+res.rows.item(x).WIDTH_M+"</td></tr>"+
								"<tr><td>BUILDING DEPTH</td><td>"+res.rows.item(x).DEPTH_M+"</td></tr>"+
								"<tr><td>NUMBER OF STOREYS</td><td>"+res.rows.item(x).NO_STOREYS+"</td></tr>"+
								"<tr><td>BUILDING CONDITION</td><td>"+res.rows.item(x).BLDG_CNDTN+"</td></tr>"+
								"<tr><td>ROOF FRAME MATERIAL</td><td>"+res.rows.item(x).roof_frame_mat+"</td></tr>"+
								"<tr><td>BRACING MATERIAL</td><td>"+res.rows.item(x).bracing_mat+"</td></tr>"+
								"<tr><td>BEAM MATERIAL</td><td>"+res.rows.item(x).beam_mat+"</td></tr>"+
								"<tr><td>COLUMN MATERIAL</td><td>"+res.rows.item(x).column_mat+"</td></tr>"+
								"<tr><td>STRUCTURAL SYSTEM TYPE</td><td>"+res.rows.item(x).STRSYS_TYP+"</td></tr>"
								);	
								
								var p1 = res.rows.item(x).PHOTO1;
								var p2 = res.rows.item(x).PHOTO2;
								var p3 = res.rows.item(x).PHOTO3;
								var P4 = res.rows.item(x).PHOTO4;
								
								window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
									fs.root.getDirectory("EDM",{create:true,exclusive:false},function(edmDir){
										edmDir.getDirectory("images",{create:true,exclusive:false},function(imgDir){
											p1 = imgDir.toURL() + p1;
											$("#photo1").attr("src",p1);
										},function(e){
											alert("Cant open images folder");
										});
									},function(e){
										alert("Cant open EDM Folder");
									});
								},function(e){
									alert("Cant open EDM File System")
								});
							}
							$.mobile.navigate("#show");
						});
					});
				});
				
//code for editing of data

			$(".editButton").click(function(){
				
			id = $(this).parent().attr("data-id");
			bldgid = id;
			db.transaction(function(tx){
				tx.executeSql("select * from bldg_template where _id = '"+id+"'",[],function(tx,res){
					
					var pic1 = res.rows.item(0).PHOTO1;
					var pic2 = res.rows.item(0).PHOTO2;
					var pic3 = res.rows.item(0).PHOTO3;
					var pic4 = res.rows.item(0).PHOTO4;
					window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
						fs.root.getDirectory("EDM",{create:true,exclusive:false},function(edmDir){
							edmDir.getDirectory("images",{create:true,exclusive:false},function(imgDir){
							//	alert("inside images Directory" + imgDir.toURL());
								pic1 = imgDir.toURL() + pic1;
								pic2 = imgDir.toURL() + pic2;
								pic3 = imgDir.toURL() + pic3;
								pic4 = imgDir.toURL() + pic4;
								$("#img1").attr("src",pic1);
								$("#img2").attr("src",pic2);
								$("#img3").attr("src",pic3);	
								$("#img4").attr("src",pic4);	
							},function(e){
								alert("Cant open images folder");
							});
						},function(e){
							alert("Cant open EDM Folder");
						});
					},function(e){
						alert("Cant open EDM File System")
					});	
					
					var eprov = res.rows.item(0).PROVINCE;
					var emuni = res.rows.item(0).CITY;
					var ebrgy = res.rows.item(0).BARANGAY;
					
					$("#eprov").val(eprov).attr("selected",true).siblings("option").removeAttr("selected");
					$("#eprov").selectmenu();
					$("#eprov").selectmenu("refresh",true);
					
					fillMuni(eprov,emuni);
					$("#eprov").bind("change",function(){
						fillMuni($("#eprov").val());
					});
					
					//$("#emuni").val(emuni).attr("selected",true).siblings("option").removeAttr("selected");
					//$("#emuni").selectmenu();
					//$("#emuni").selectmenu("refresh",true);
					
					fillBrgy(eprov,emuni,ebrgy);
					$("#emuni").bind("change",function(){
						fillBrgy($("#eprov").val(),$("#emuni").val());
					});
					
					$("#ebrgy").val(ebrgy).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ebrgy").selectmenu();
					$("#ebrgy").selectmenu("refresh",true);
					
					$("#estreet").val(res.rows.item(0).STR_NAME);
					$("#ebldg").val(res.rows.item(0).BLDG_NAME);
					$("#ebuse-menu").val(res.rows.item(0).USE1).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ebuse-menu").selectmenu();
					$("#ebuse-menu").selectmenu("refresh",true);
					
					$("#eluse-menu").val(res.rows.item(0).lu_l4).attr("selected",true).siblings("option").removeAttr("selected");
					$("#eluse-menu").selectmenu();
					$("#eluse-menu").selectmenu("refresh",true);
					
					$("#enumOcc-menu").val(res.rows.item(0).USE1_PPL).attr("selected",true).siblings("option").removeAttr("selected");
					$("#enumOcc-menu").selectmenu();
					$("#enumOcc-menu").selectmenu("refresh",true);
					
					$("#eroofMat-menu").val(res.rows.item(0).ROOF1).attr("selected",true).siblings("option").removeAttr("selected");
					$("#eroofMat-menu").selectmenu();
					$("#eroofMat-menu").selectmenu("refresh",true);
					
					$("#erPitch-menu").val(res.rows.item(0).ROOF_PITCH).attr("selected",true).siblings("option").removeAttr("selected");
					$("#erPitch-menu").selectmenu();
					$("#erPitch-menu").selectmenu("refresh",true);
					
					$("#ewallMat-menu").val(res.rows.item(0).WALL1).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ewallMat-menu").selectmenu();
					$("#ewallMat-menu").selectmenu("refresh",true);
					
					$("#efElev-menu").val(res.rows.item(0).FL_ELEV).attr("selected",true).siblings("option").removeAttr("selected");
					$("#efElev-menu").selectmenu();
					$("#efElev-menu").selectmenu("refresh",true);
					
					$("#enumBase-menu").val(res.rows.item(0).BASEMENT).attr("selected",true).siblings("option").removeAttr("selected");
					$("#enumBase-menu").selectmenu();
					$("#enumBase-menu").selectmenu("refresh",true);
					
					$("#efType-menu").val(res.rows.item(0).FOUNDTN).attr("selected",true).siblings("option").removeAttr("selected");
					$("#efType-menu").selectmenu();
					$("#efType-menu").selectmenu("refresh",true);
					
					$("#eMaxflood").val(res.rows.item(0).MAX_FLOOD).attr("selected",true).siblings("option").removeAttr("selected");
					$("#eMaxflood").selectmenu();
					$("#eMaxflood").selectmenu("refresh",true);
					
					$("#eWtype").val(res.rows.item(0).WIND_TYPE).attr("selected",true).siblings("option").removeAttr("selected");
					$("#eWtype").selectmenu();
					$("#eWtype").selectmenu("refresh",true);
					
					$("#eybuilt").val(res.rows.item(0).YRBUILT_R).attr("selected",true).siblings("option").removeAttr("selected");
					$("#eybuilt").selectmenu();
					$("#eybuilt").selectmenu("refresh",true);
					
					$("#ebtype").val(res.rows.item(0).BLDG_TYPE).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ebtype").selectmenu();
					$("#ebtype").selectmenu("refresh",true);
					
					$("#evshape").val(res.rows.item(0).VERTSHAPE1).attr("selected",true).siblings("option").removeAttr("selected");
					$("#evshape").selectmenu();
					$("#evshape").selectmenu("refresh",true);
					
					$("#ehshape").val(res.rows.item(0).HORZ_SHAPE).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ehshape").selectmenu();
					$("#ehshape").selectmenu("refresh",true);
					
					$("#ebwidth").val(res.rows.item(0).WIDTH_M).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ebwidth").selectmenu();
					$("#ebwidth").selectmenu("refresh",true);
					
					$("#ebdepth").val(res.rows.item(0).DEPTH_M).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ebdepth").selectmenu();
					$("#ebdepth").selectmenu("refresh",true);
					
					$("#efloor").val(res.rows.item(0).NO_STOREYS).attr("selected",true).siblings("option").removeAttr("selected");
					$("#efloor").selectmenu();
					$("#efloor").selectmenu("refresh",true);
					
					$("#ebcondition").val(res.rows.item(0).BLDG_CNDTN).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ebcondition").selectmenu();
					$("#ebcondition").selectmenu("refresh",true);
					
					$("#erfmaterial").val(res.rows.item(0).roof_frame_mat).attr("selected",true).siblings("option").removeAttr("selected");
					$("#erfmaterial").selectmenu();
					$("#erfmaterial").selectmenu("refresh",true);
					
					$("#ebrmaterial").val(res.rows.item(0).bracing_mat).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ebrmaterial").selectmenu();
					$("#ebrmaterial").selectmenu("refresh",true);
					
					$("#ebmmaterial").val(res.rows.item(0).beam_mat).attr("selected",true).siblings("option").removeAttr("selected");
					$("#ebmmaterial").selectmenu();
					$("#ebmmaterial").selectmenu("refresh",true);
					
					$("#eclmaterial").val(res.rows.item(0).column_mat).attr("selected",true).siblings("option").removeAttr("selected");
					$("#eclmaterial").selectmenu();
					$("#eclmaterial").selectmenu("refresh",true);
					
					$("#estype").val(res.rows.item(0).STRSYS_TYP).attr("selected",true).siblings("option").removeAttr("selected");
					$("#estype").selectmenu();
					$("#estype").selectmenu("refresh",true);
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
					var isSaveOKEdit=true;	
					//28 items
					var eprov = $('#eprov').find(":selected").text();
					var emuni = $('#emuni').find(":selected").text();
					var ebrgy = $('#ebrgy').find(":selected").text();
					var estreet = $('input:text[id=estreet]').val().toString().replace(/,/g, "");
					var ebldg = $('input:text[id=ebldg]').val().toString().replace(/,/g, "");				
					$("li[data-id='" + id + "']").find("a").find("h3").html(ebldg);
					$("li[data-id='" + id + "']").find("a").find("p").html(estreet);
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
					var erfmaterial = $('#erfmaterial').find(":selected").text();
					var ebr = $('#ebrmaterial').find(":selected").text();
					var ebm = $('#ebmmaterial').find(":selected").text();
					var ecl = $('#eclmaterial').find(":selected").text();
					var estype = $('#estype').find(":selected").text();	
					
					//not required select
					if(ebuse=="" || ebuse == "Select Building Use" ){
						ebuse="null";
					}
					if(eluse=="" || eluse == "Select Land Use"){
					eluse="null";
					}
					if(erf=="" || erf == "Select Roof Material"){
					erf="null";
					}
					if(erpitch=="" || erpitch == "Select Roof Pitch"){
					erpitch="null";
					}
					if(ewall=="" || ewall == "Select Wall Material"){
					ewall="null";
					}
					if(ewtype=="" || ewtype == "Select Window Type"){
					ewtype="null";
					}
					if(ebtype=="" || ebtype == "Select Building Type"){
					ebtype="null";
					}
					if(evshape=="" || evshape == "Select Vertical Plan Shape"){
					evshape="null";
					}
					if(ehshape=="" || ehshape == "Select Horizontal Plan Shape"){
					ehshape="null";
					}
					if(ebcon=="" || ebcon == "Select Building Condition"){
					ebcon="null";
					}
					if(erfmaterial=="" || erfmaterial == "Select Roof Frame Material"){
					erfmaterial="null";
					}
					if(ebr=="" || ebr == "Select Bracing Material"){
					ebr="null";
					}
					if(ebm=="" || ebm == "Select Beam Material"){
					ebm="null";
					}
					if(ecl=="" || ecl == "Select Column Material"){
					ecl="null";
					}
	//for update button
					if(isSaveOKEdit){
						var updatesql = "update bldg_template set PROVINCE = '"+eprov+"', CITY = '"+emuni+"', BARANGAY = '"+ebrgy+"',STR_NAME = '"+estreet+"', BLDG_NAME = '"+ebldg+"',USE1 = '"+ebuse+"', lu_l4 = '"+eluse+"',USE1_PPL = '"+enumocc+"',ROOF1='"+erf+"',ROOF_PITCH='"+erpitch+"',WALL1='"+ewall+"',BASEMENT='"+enumbase+"',FL_ELEV='"+efelev+"',FOUNDTN='"+eftype+"',MAX_FLOOD='"+eflood+"',WIND_TYPE='"+ewtype+"',YRBUILT_R='"+eybuilt+"',BLDG_TYPE='"+ebtype+"',VERTSHAPE1='"+evshape+"',HORZ_SHAPE='"+ehshape+"',WIDTH_M='"+ebwidth+"',DEPTH_M='"+ebdepth+"',NO_STOREYS='"+efloor+"',BLDG_CNDTN='"+ebcon+"',roof_frame_mat='"+erfmaterial+"',bracing_mat='"+ebr+"',beam_mat='"+ebm+"',column_mat='"+ecl+"',STRSYS_TYP='"+estype+"' where _id = '"+id+"' ";
						tx.executeSql(updatesql);
						$("#" + id).find("h3").html(ebldg);
						$("#" + id).find("p").html(estreet);
						$("#img1").attr('src', 'img/bldg/noimg.png');
						$("#img2").attr('src', 'img/bldg/noimg.png');
						$("#dblist").listview("refresh");
						$(":mobile-pagecontainer").pagecontainer("change", "#database", {reloadPage:false});
						alert("Update Successfully!");
					}
					},
					function onError(error){
						alert('code: '    + error.code    + '\n' +
					  'message: ' + error.message + '\n');
					}
					);//end of editdata transaction
				});//end of editdata function
			});//end of execute sql for db button
		});//end of db transaction
	});//end of dbButton function
	
	//reset the database
	$("#reset").click(function(){
		db.transaction(function(tx){
			tx.executeSql("delete from bldg_template");
		});
		$(":mobile-pagecontainer").pagecontainer("change", "#menu", {reloadPage:false});
		alert("Successfully reset the database");
	});
}//end of database

//check if the gps setting is ready



function getMap(lat,lng){
//load the maps

var mapOptions = {
	'mapType': plugin.google.maps.MapTypeId.HYBRID,
	'controls':{
		'compass':true,
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
		tilt:20,
		bearing:50,
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
}
function camerapicture(){
	navigator.camera.getPicture(onSuccess, onFail,{
		quality:20,
		destinationType: Camera.DestinationType.FILE_URI,
		encodingType: Camera.EncodingType.JPEG,
		mediaType:Camera.MediaType.Picture,
		correctOrientation:true,
		targetWidth:200,
		targetHeight:200
		
		
	});
	function onSuccess(imageData) { 
      var image = document.getElementById('img1'); 
      image.src = "data:image/jpeg;base64," + imageData;
	  window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(fs){
			fs.root.getDirectory("EDM",{create:true},function(fdir){
				fdir.getFile("img.jpg",{create:true,exclusive:false},function(fileEntry){
					alert("File Okay? " + fileEntry.isFile.toString());
					alert("File Ready: " + fileEntry.fullPath);
					//write now
					fileEntry.createWriter(function(fileWriter){
						fileWriter.onwriteend=function(){
							alert("Successfully written file to /n" + fileEntry.fullPath);
						}

						fileWriter.onerror = function(e){
							alert("Cant Write to File because: " + e.toString());
						}

						//var dataObj = new Blob([imageData],{type:'image/jpeg'});
						fileWriter.write(imageData);
					});
				},function(){
					alert("Cant Create File");
				});
			});
		},function(){
			alert("Cant Open File System");
		});
   }  
   
   function onFail(message) { 
      alert('Failed because: ' + message); 
   } 
}
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}


