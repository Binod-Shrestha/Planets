
let current=0;
let total=0;
let planetArray=new Array();
function showInfo()
{
	$("#planetCount").html(current+1);
	$("#pname").html(planetArray[current].name);
	$("#protation").html(planetArray[current].rotation_period);
	$("#porbital").html(planetArray[current].orbital_period);
	$("#pdiameter").html(planetArray[current].diameter);
	$("#pclimate").html(planetArray[current].climate);
}
	
function showNext(){
	if(current==9){current=0;}
	else
	{
		current++;
	}
		showInfo();
}
	
function showPrevious(){
	if(current===0)
	{
		current=9;
	}
	else
	{
		current--;
	}
	showInfo();
}
	
function showPlanet()
{
	if($(`#planetNum`).val().length===0)
	{
		$("#messageId").html("");
	}
	else if(($(`#planetNum`).val()>10)||($(`#planetNum`).val()<1) || (isNaN($(`#planetNum`).val())))
	{
		$("#messageId").html("Invalid entry");
	}
	else
	{
		current= parseInt($(`#planetNum`).val())-1;
		console.log(current);
		$("#messageId").html("");
		showInfo();
	}
}
	
$(document).ready(function() {
	$.getJSON("https://swapi.co/api/planets/?format=json&page=1", function (data)
	{
		total=data.results.length;
		for (let x of data.results) {
			var planet = {
				"name":x.name,
				"rotation_period":x.rotation_period,
				"orbital_period":x.orbital_period,
				"diameter":x.diameter,
				"climate":x.climate
			};
			planetArray.push(planet);
		}
		
		showInfo();
				
		$("#btnnext").attr("disabled",false);
		$("#btnnext").click(showNext);
		$("#btnPrevious").click(showPrevious);
		$("#planetNum").keyup(showPlanet);
		$("#planetNum").click(showPlanet);
		$("#formId").mouseover(function()
		{
			$("#messageId").html("Please select a number between 1 and " + total + " or click 'Previous' or 'Next' button below");
			
		});
		
		$("#formId").mouseout(function()
		{
			$("#messageId").html("");
		});
		
		$(document).keydown(function(e)
		{
			if ((e.keyCode ==37)||(e.keyCode ==40)){showPrevious();}
			if ((e.keyCode ==39)||(e.keyCode ==38)){showNext();}    
		});
		
	});
	$("#pname").html("Loading ...");
});
