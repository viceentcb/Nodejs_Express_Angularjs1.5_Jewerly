class JewelsCtrl {
    constructor(jewels, $scope, $stateParams, ) {
        "ngInject";
        console.log("controlador_jewel")


          this._$scope = $scope;

          
          // console.log(jewels)
          console.log($stateParams)

          // console.log($stateParams.filter)

          if(jewels){

            if($stateParams.filter){
              // console.log(jewels)
              let all_filter= $stateParams.filter.split(',')
              console.log(all_filter)
               let filter=all_filter[0]
              let hwfilter=all_filter[1]
              console.log(hwfilter)
              console.log(jewels)
              
              this.jewels= jewels.filter(element=>element[hwfilter]==filter)

              console.log(this.jewels)
            }else{
              this.jewels=jewels
  
            }

          }

        }
    }

    export default JewelsCtrl;