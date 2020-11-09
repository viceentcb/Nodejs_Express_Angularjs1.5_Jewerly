class SliderCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [{ image: 'img/watch_slider.jpg', id: 0 },
        { image: 'img/61XxwpWjAaL._AC_UY500_.jpg', id: 1 }
            , { image: 'img/8acbd265b95703af084675ed53973296.jpg', id: 2 }];

    }//end_constructor
}//end_class

let Slider = {
    controller: SliderCtrl,
    templateUrl: 'components/slider-helpers/slider.html'
};
export default Slider;


