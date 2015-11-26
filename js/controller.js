function AqiCtrl ($scope, $http) {
	$scope.aqis = [];
	$http
		.get('/get_aqi_details_hangzhou')
		.success(function (data) {
			if(data[data.length-1].position_name === null){
				data[data.length-1].position_name = "杭州均值";
			}
			$scope.aqis = $scope.aqis.concat(data);
		});
	$http
		.get('/get_aqi_details_ningbo')
		.success(function (data) {
                        if(data[data.length-1].position_name === null){
                                data[data.length-1].position_name = "宁波均值";
                        }
			$scope.aqis = $scope.aqis.concat(data);
		});
	$scope.search = '西溪';
	$scope.keywords = ["西溪","下沙","杭州","宁波","均值"];
  $scope.closeAqi = function (index) {
		$scope.aqis.splice(index, 1);
	};
	$scope.aqiLevel = function (aqistr) {
                var aqinum = parseInt(aqistr);
                if (aqinum >= 150) {
                        return "danger";
                }
                else if (aqinum >= 100){
                        return "warning";
                }
                else if (aqinum >= 50){
                        return "info";
                }
                else if (aqinum > 0){
                        return "success";
                }
                else {
                        return "";
                }
        };
        $scope.changeKeyword = function(keyword){
                $scope.search = keyword;
        }
	$scope.switchTime = function(time){
		var d = new Date(time.replace("Z","+08:00"));
    return d.getDate()+"日"+d.getHours()+"点整";
	}
}
angular.module("aqi", ["ui.bootstrap"]).controller("AqiCtrl", ["$scope", "$http", AqiCtrl]);
