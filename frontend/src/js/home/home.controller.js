class HomeCtrl {
  constructor(User, jewels, Tags, AppConstants, $scope) {
    'ngInject';


    // console.log("home")
    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // $scope.jewels= jewels
    this.jewels = jewels


    // Get list of all tags
    Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

    var all = []
    all = this.jewels
    var j = [];
    let price = 0
    let slug = ""


    ///UN BUCLE HASTA QUE SE ACABE EL ARRAY
    do {
      // alert("para1")

      //BUSCAMOS CUAL ES EL PRECIO MAYOR DE LOS QUE TENEMOS EN LA ACTUAL ARRAY
      for (var i = 0; i < all.length; i++) {

        // console.log("primer for")
        // console.log("i= " + i)
        // console.log(all[i]);
        // console.log(all[i].price)
        // console.log(price)

        if ((all[i].price) > (price)) {
          price = all[i].price
          // console.log(price)
        }
      }

      //UNA VEZ SEPAMOS CUAL ES EL PRECIO MAYOR BUSCAMOS TODAS LAS JOYAS CON IGUAL PRECIO
      //Y LO AÑADIMOS A UNA ARRAY Y LO ELIMINAMOS DE LA ARRAY PRINCIPAL
      for (var l = 0; l < all.length; l++) {

        // console.log("segundo for")

        if ((all[l].price) >= (price)) {

          // console.log(all[l])
          // alert("para1")
          // console.log(j)
          // alert("para2")

          j.push(all[l])

          // console.log(j)
          // alert("para3")
          //   console.log(all)

          all = all.filter(item => item !== all[l])

          // console.log(all)
          // console.log(j)
          // console.log(all.length)
        }
      }

      //INICIALIZAMOS LAS VARIABLES PARA NO CREAR UN BUCLE INFINITO
      i = 0
      l = 0
      price = 0
      // alert("para2")


    } while (all.length != 0);

    //Y POR ULTUMO IGUALAMOS LOS DATOS QUE SE VERAN A LA ARRAY YA ORDENADA POR PRECIO MAYOR
    this.jewels = j
  }


  //-------------------------------------------------------IMPORTANTE---------------------------------------

  // LO BUENO DE ESTA FUNCION ES QUE LUEGO PODREMOS REUTILIZARLA Y HACERLA GENERAL ES DECIR:
  // CUANDO PONGAMOS FILTROS PODREMOS SUSTITUIR "PRICE" POR UNA VARIABLE LA CUAL SERA EL FILTRO QUE ELIJA EL USUARIO
  // POR LO TANTO ORDENARA POR DIFERENTES CAMPOS SEGUN QUIERA EL USUARIO


  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
