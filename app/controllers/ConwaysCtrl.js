app.controller('ConwaysCtrl', ['$scope', '$interval', function ($scope, $interval)
{   
    getScore = function (grid, x, y)
    {
        score = 0;
        for (t = -1; t < 2; t++)
        {
          for (r = -1; r < 2; r++)
          {
              if (grid[y - t] !== undefined && grid[y - t][x - r] !== undefined)
              {
                  if (r != 0 || t != 0)
                        score += grid[y - t][x - r]; 
              }     
          }
       }      
       return (score);
    };


    $scope.initGrid = function (grid, x, y)
    {
        grid = new Array(y);
        for (i = 0; i < y; i++)
        {
            grid[i] = new Array(x);
            for (j = 0; j < x; j++)
            {
               grid[i][j] = 0;
            }
        }
        grid = $scope.blincker(grid);
        
        return (grid);
    };
    
    $scope.nextTick = function ()
    {
        var news = $scope.initGrid([], $scope.grid.length, $scope.grid[0].length);
        for (i = 0; i < $scope.grid.length; i++)
        {
            for (j = 0; j < $scope.grid[i].length; j++)
            {
                score = getScore($scope.grid, j, i);
                if (score == 3)
                    news[i][j] = 1;
                else if (score != 2)
                    news[i][j] = 0;
                else 
                    news[i][j] = $scope.grid[i][j]; 
            }
        }
        return (news);
    };
    
    $scope.run = false;
    $scope.getLabel = function ()
    {
      return ($scope.run == true ? 'Stop' : 'Start');  
    };
    $scope.toggleTime = function()
    {
        $scope.run = !$scope.run;
    };
    $scope.grid = $scope.initGrid([], 35, 35);
    $scope.update = function ()
    {
        if ($scope.run)
            $scope.grid = $scope.nextTick();  
    };
    
    $scope.toggleCell = function (y, x)
    {
        $scope.grid[y][x] = $scope.grid[y][x] == 1 ? 0 : 1;
    };
    
    $interval($scope.update, 500);
    
    $scope.getClass = function (score)
    {
      if (score == 1)
        return "black";
      else if (score == 2)
        return "blue";  
    };
}]);