angular.module('MyApp', [])
    .controller('MainCtrl', function($scope, $http) {
        $scope.model = {
            screenName: "Kunal_innocent",
            tweets: []
        }

        $scope.getTwitterProfile = function() {
            $http({
                method: 'GET',
                url: '/twitterProfile',
                params: {
                    screenName: $scope.model.screenName
                }
            }).then(function successCallback(response) {
                $scope.model.tweets = response.data.tweets;
				
                Highcharts.chart('chart', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Twitter Account Details of '+ $scope.model.tweets[0].user.name
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: [{
                            name: 'Tweets',
                            y: $scope.model.tweets.length
                        }, {
                            name: 'Following',
                            y: $scope.model.tweets[0].user.followers_count ,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Followers',
                            y:$scope.model.tweets[0].user.friends_count 
                        }]
                    }]
                });
            }, function errorCallback(response) {
                $scope.model.tweets = [];
            });
        }

        $scope.getTwitterProfile();
    });