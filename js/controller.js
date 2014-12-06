function AqiCtrl ($scope, $http) {
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
	$scope.aqis = [];
	$http
		.get('/get_aqi_details_hangzhou')
		.success(function (data) {
			if(data[data.length-1].position_name === null){
				data[data.length-1].position_name = "杭州市平均值";
			}
			$scope.aqis = $scope.aqis.concat(data);
		});
	$http
		.get('/get_aqi_details_ningbo')
		.success(function (data) {
                        if(data[data.length-1].position_name === null){
                                data[data.length-1].position_name = "宁波市平均值";
                        }
			$scope.aqis = $scope.aqis.concat(data);
		});
	$http
		.get('/get_aqi_details_zhuji')
		.success(function (data) {
                        if(data[data.length-1].position_name === null){
                                data[data.length-1].position_name = "诸暨市平均值";
                        }
			$scope.aqis = $scope.aqis.concat(data);
		});
	$scope.search = '下沙';
	$scope.closeAqi = function (index) {
		$scope.aqis.splice(index, 1);
	};
}
angular.module("aqi", ["ui.bootstrap"]).controller("AqiCtrl", ["$scope", "$http", AqiCtrl]);
