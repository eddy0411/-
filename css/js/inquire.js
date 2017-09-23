var fdb = new ForerunnerDB();
var db = fdb.db("account");
var accountingCollectio = db.collection('account');
accountingCollectio.load();

function createAccountingHTMLSting(date, categorry, item, cost, manner,_id) {
    return "<tr><td>" + date + "</td><td>" + categorry + "</td><td>" + item + "</td><td>" + cost + "</td><td>" + manner + "</td><td><button class='deleteButton btn btn-danger' data-id='"+_id+"'>刪除</button></td></tr>"
}

$("#lookup").click(function() {
    if ($('input[name=method]:checked').val() == "curMonth") {
        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var dateString = year + "-" + month + "-" + "01";
        var accountings = accountingCollectio.find({
            date: {
                $gte: dateString
            }
        })
        console.log(accountings)
        if (accountings.length == 0) {
			alert("你沒有記帳")
			return
		} 
        for (var i = 0; i < accountings.length; i++) {
            $("#accountingTable").append(createAccountingHTMLSting(accountings[i].date,accountings[i].project,accountings[i].category,accountings[i].money,accountings[i].Payment,accountings[i]._id))
        }
        var eatCost = 0;
        var playCost = 0;
        var clothesCost = 0;
        var liveCost = 0;
        var trafficCost = 0;
        var educationCost = 0;

        for (var i = 0; i < accountings.length; i++) {
            if (accountings[i].category == "吃的") {
                eatCost += accountings[i].cost / 1;
            } else if (accountings[i].category == "玩的") {
                eatCost += accountings[i].cost / 1;
            } else if (accountings[i].category == "衣的") {
                eatCost += accountings[i].cost / 1;
            } else if (accountings[i].category == "住的") {
                eatCost += accountings[i].cost / 1;
            } else if (accountings[i].category == "行的") {
                eatCost += accountings[i].cost / 1;
            } else if (accountings[i].category == "育的") {
                eatCost += accountings[i].cost / 1;
            }
        }
        var Cost = eatCost + playCost + clothesCost + liveCost + trafficCost + educationCost;
        $("#eatCost").text(eatCost)
        $("#eatProportion").text(Math.round((eatCost / totalCost) * 100) + "%")
        $("#eatCost").text(playCost)
        $("#eatProportion").text(Math.round((eatCost / totalCost) * 100) + "%")
        $("#eatCost").text(clothesCost)
        $("#eatProportion").text(Math.round((eatCost / totalCost) * 100) + "%")
        $("#eatCost").text(liveCost)
        $("#eatProportion").text(Math.round((eatCost / totalCost) * 100) + "%")
        $("#eatCost").text(trafficCost)
        $("#eatProportion").text(Math.round((eatCost / totalCost) * 100) + "%")
        $("#eatCost").text(educationCost)
        $("#eatProportion").text(Math.round((eatCost / totalCost) * 100) + "%")
    } else {
        var fromTime = $("#fromTime").val();
        var toTime = $("#toTime").val();
        var accountings = accountingCollectio.find({
            date: {
                $gte: fromTime,
                $lte: toTime
            }
        });
        for (var i = 0; i < accountings.length; i++) {
            $("#accountingTable").append(createAccountingHTMLSting(accountings[i].date,accountings[i].project,accountings[i].category,accountings[i].money,accountings[i].Payment))
        }

        var eatCost = 0;
        var playCost = 0;
        var otherCost = 0;
        for (var i = 0; i < accountings.length; i++) {
            if (accountings[i].category == "吃的") {
                eatCost += accountings[i].cost / 1;
            } else if (accountings[i].category == "玩的") {
                playCost += accountings[i].cost / 1;
            } else if (accountings[i].category == "其他") {
                otherCost += accountings[i].cost / 1;
            }
        }
        var totalCost = eatCost + playCost + otherCost;
        $("#eatCost").text(eatCost)
        $("#eatProportion").text(Math.round((eatCost / totalCost) * 100) + "%")
        $("#playCost").text(playCost)
        $("#playProportion").text(Math.round((playCost / totalCost) * 100) + "%")
        $("#otherCost").text(otherCost)
        $("#otherProportion").text(Math.round((otherCost / totalCost) * 100) + "%")
        $("#totalCost").text(totalCost)
    }
})
function deleteData(){
	var id = $(this).attr("data-id")
	console.log(id)
	accountingCollectio.remove({
	    _id: id
	});
	accountingCollectio.save()


	$(this).parents("tr").remove()
}
$("#accountingTable").on("click", ".deleteButton", deleteData)
