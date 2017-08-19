var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountingCollectio = db.collection('account');

accountingCollectio.load();

$("save").click(function() {
	var  date = $("date").val();
	var  category = $("category").val();
	var  project = $("project").val();
	var  money = $("money").val();
	var  Payment = $("Payment").val();

	accountingCollectio.insert({
	date : date,
	category : category,
	project : project,
	money : money,
	Payment : Payment,
	});
	accountingCollectio.save();
	alert("儲存成功")

	$("date").val("");
	$("category").val("")
	$("project").val("");
	$("money").val("");
	$("Payment").val("");

});