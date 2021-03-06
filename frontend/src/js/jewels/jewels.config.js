
function JewelsConfig($stateProvider) {
    // console.log("caxa")
    "ngInject";
    $stateProvider


        .state("app.jewels", {
            url: "/jewels_:filter",
            controller: "JewelsCtrl",
            controllerAs: "$ctrl",
            templateUrl: "jewels/jewels.html",
            title: "Lista de Noticias",
            resolve: {
                jewels: function (Jewels) {
                    return Jewels.getJewels().then(jewels => jewels);
                }
            }
        })

        .state("app.detailsJewels", {
            url: "/jewels/:slug",
            controller: "Jewels_det_Ctrl",
            controllerAs: "$ctrl",
            templateUrl: "jewels/jewelsdetails.html",
            title: "Details Jewels",
            resolve: {
                jewel: function (Jewels, $stateParams) {
                    //este nombre es el que recibe el controlador
                    return Jewels.getJewel($stateParams.slug).then(jewel => jewel); //recibo 1 jewel
                },
                comments: function (Comments, $stateParams) {
                    return Comments.getAll($stateParams.slug).then(comment => comment);//recibir los comentarios
                }
            }
        })
};

export default JewelsConfig;
