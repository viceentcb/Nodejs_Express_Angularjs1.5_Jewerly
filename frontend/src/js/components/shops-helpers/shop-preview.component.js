
class ShopsListCtrl {
    constructor() {
        "ngInject";

    }

    detail() {
        //Cuando hagamos click en alguna tienda abrira un modal con la informacion de la tienda
        // Asi todo lo controla el preview sin falta de un controllador y no necesitamos hacer otro endpoint
        //ya que la informacion de la tienda ya la tenemos

        var myModal = document.getElementById("myModal");

        let cities_names = (this.shop.city).filter(city => city.name)
        let cities = '';

        for (let i = 0; i < cities_names.length; i++) {
            cities += ` <li class="tag-default tag-pill tag-outline">${cities_names[i].name}</li>`
        }
        
        myModal.innerHTML = `
         <div class="modal-content">
            <span class="close">&times;</span>
            <h1>${ this.shop.name}</h1>
            <p>${ this.shop.count} ${this.shop.hwmny}</p>
            <ul class="tag-list">
            ${cities}
        </ul>
            </div>`;

        myModal.style.display = "block";

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            myModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == myModal) {
                myModal.style.display = "none";
            }
        }
    }

}
let ShopPreview = {
    controller: ShopsListCtrl,

    bindings: {
        shop: '='
    },
    templateUrl: 'components/shops-helpers/shop-preview.html'
};



export default ShopPreview;