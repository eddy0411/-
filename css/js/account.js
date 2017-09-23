var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountingCollectio = db.collection('account');
accountingCollectio.load();

$("#save").click(function() {
		var  date = $("#date").val();
		var  category = $("#category").val();
		var  project = $("#project").val();
		var  money = $("#money").val();
		var  Payment = $("#Payment").val();
	if (date == "" && category == "" && project == "" && money == "" && Payment == "") {
		alert("你有欄位沒填")
	} else {

		var result = accountingCollectio.insert({
		date : date,
		category : category,
		project : project,
		money : money,
		Payment : Payment,
		});
		accountingCollectio.save();
		alert("儲存成功")
		console.log(result.inserted[0]._id)
		$("#date").val("");
		$("#category").val("")
		$("#project").val("");
		$("#money").val("");
		$("#Payment").val("");	
	}

});
$("#category").change(function(){
   console.log($("#category").val());
   if($("#category").val()=="others"){
   	alert(3)
   }
});