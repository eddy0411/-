var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountingCollectio = db.collection('account');
accountingCollectio.load();
function createAccountingHTMLSting (date,categorry,item,cost,manner,_id) {
	return "<tr><td>"+date+"</td><td>"+categorry+"</td><td>"+item+"</td><td>"+cost+"</td><td>"+manner+"</td><td><button class='deleteButton btn btn-danger' data-id='"+_id+"'>刪除</button></td></tr>"
}
setTimeout(function(date,categorry,item,cost,manner){
	var accountings = accountingCollectio.find(
			{},
			{
				$orderby : {"date":-1},
				$limit : 10
			}
		);
	console.log(accountings)
	        if (accountings.length == 0) {
			alert("你沒有記帳")
			location.href='index.html'
			return
		} 
	for (var i = 0; i < accountings.length; i++) {
		$("#accountingtable").append(createAccountingHTMLSting(accountings[i].date,accountings[i].project,accountings[i].category,accountings[i].money,accountings[i].Payment,accountings[i]._id))
	}
}, 500);
function deleteData(){
	var id = $(this).attr("data-id")
	console.log(id)
	accountingCollectio.remove({
	    _id: id
	});
	accountingCollectio.save()


	$(this).parents("tr").remove()
}
$("#accountingtable").on("click", ".deleteButton", deleteData)
