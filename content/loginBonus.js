var today;
var lastLoginDay;

function startUp() {
	getDayData();
	chkLogin();

	writeDay();
	urlList();
	saveLastLoginDay();

}

var getDayData = function () {
	today = new Date();
	lastLoginDay = new Date(localStorage.getItem("lastLoginDay"));
}

var saveLastLoginDay = function () {
	localStorage.setItem("lastLoginDay", today);
}

var chkLogin = function () {
	// 最終ログイン日のクローンを作成
	var tmpDay = new Date(lastLoginDay.getTime());

	// 午前4時に設定
	tmpDay.setHours(4);
	tmpDay.setMinutes(0);
	tmpDay.setSeconds(0);
	tmpDay.setMilliseconds(0);

	// 最終ログイン日が4時以降のとき次の日の4時が更新日となる
	// (逆に最終ログイン日が0~4時のとき同じ日の4時が更新日となる)
	if (lastLoginDay > tmpDay) {
		tmpDay.setDate(lastLoginDay.getDate() + 1);
	}

	// tmpDayに入った更新日と現在時刻を比較し更新日のほうが先の場合windowを閉じる
	if (today < tmpDay) {
		// window.close();
		// console.log('window close')
	}
}

// 日付をサイトに書き込む
var writeDay = function () {
	document.getElementById('today').innerHTML = today.toLocaleDateString();
	document.getElementById('lastLoginDay').innerHTML = lastLoginDay.toLocaleDateString();
}

var urlOpenButton = function () {
	var urlNum = url.length;
	for (var k = 0; k < urlNum; k++) {
		window.open(url[k][1], "_blank");
	}
}

// urlを表示するhtmlコードを作成して表示
var urlList = function () {
	var urlNum = url.length;

	var linkHTML = "";

	for (var k = 0; k < urlNum; k++) {
		linkHTML = linkHTML + "<a href=\"" + url[k][1] + "\" target=\"_brank\">" + url[k][0] + "</a><br>";
	}
	document.getElementById('linkList').innerHTML = linkHTML;
}
