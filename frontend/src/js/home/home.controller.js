class HomeCtrl {
  constructor(User, jewels, Tags, AppConstants, $scope, $stateParams) {
    'ngInject';


    // console.log("home")
    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // $scope.jewels= jewels
    this.jewels = jewels


    let unique = [];
    let filters = []

    let all_filters = ['brand', 'type']

    // all_filters.forEach(element =>
    //   unique = Array.from(new Set((jewels).map(elm => {
    //     console.log(elm[element])
    //   }))),
    //   console.log(unique),
    // )

    let fils=[]

      for (i=0; i<all_filters.length; i++){
        console.log(all_filters[i])
        unique = Array.from(new Set((jewels).map(elm => (elm[all_filters[i]]))))
        console.log(unique)
        unique.forEach(element=>{
          fils.push({ 'filter': element, 'hwfilter': all_filters[i], 'img': 'img/' + element + '.png'})
        })
        console.log(fils)
      }

    // ///FILTER BRANDS


    // unique = Array.from(new Set((this.jewels).map(element => element.brand)))
    // let brands = []
    // unique.forEach(element => {
    //   brands.push({ 'filter': element, 'hwfilter': 'brand', 'img': 'img/' + element + '_logo.png' })
    // });
    // filters.push(brands);

    // ///////END FILTER BRANDS

    // ///FILTER TYPE

    // unique = Array.from(new Set((this.jewels).map(element => element.type)))
    // let type = []
    // unique.forEach(element => {
    //   type.push({ 'filter': element, 'hwfilter': 'type', 'img': 'img/' + element + '.jpg' })
    // });
    // filters.push(type);

    // ///////END FILTER TYPE

    console.log(fils)
    this.filters = fils

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


          j.push(all[l])


          all = all.filter(item => item !== all[l])


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
