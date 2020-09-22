// document.getElementById("pr").innerHTML = "new HTML"



class JewelsCtrl {
    constructor(jewels, $state, $scope, $stateParams) {
        "ngInject";
        console.log("controlador_jewel")


          this._$scope = $scope;
          //this.jewels = jewels.jewel; SI VAMOS POR GRAPHQL

          $scope.jewels= jewels

          
          this.filter = $stateParams.filter;


        //   var joyasFiltrados = new Array();
        //   this.jewels.forEach(jewel => {
        //     if (jewel.category == this.filter) {
        //       joyasFiltrados.push(jewel);
        //     }
        //   });
        //   $scope.joyasFiltrados = joyasFiltrados;

          this._$scope.openDetails = function () {
            $state.go("app.detailsJewels", { slug: this.jewel["slug"] });
          };
        }
    }

    export default JewelsCtrl;