// Slider Image ...
import sliderImgOne from '../../assets/images/Slider/sliderImg_4.png';
import sliderImgTwo from '../../assets/images/Slider/sliderImg_5.png';
import sliderImgThree from '../../assets/images/Slider/sliderImg_6.png';
// Help Customer Services Image ... 
import shippingImg from '../../assets/images/help-services/free-delivery.png';
import supportImg from '../../assets/images/help-services/support.png';
import returnImg from '../../assets/images/help-services/money.png';
import secureImg from '../../assets/images/help-services/exchange.png';
// Special Offer Images ... 
import serviceOfferImgOne  from '../../assets/images/special-offers/special_offer_1.png';
import serviceOfferImgTwo from '../../assets/images/special-offers/special_offer_2.png';
import serviceOfferImgThree  from '../../assets/images/special-offers/special_offer_3.png';


const SliderImages = [
    {
        image: sliderImgOne
    },
    {
        image: sliderImgTwo
    },
    {
        image: sliderImgThree
    }
]

const HelpServices = [
    {
        icon: shippingImg,
        title: "Free Shipping",
        desc: "Free shipping on all US order or order above $200."
    },
    {
        icon: supportImg,
        title: "Support 24/7",
        desc: "Contact us 24 hours a day, 7 days a week."
    },
    {
        icon: returnImg,
        title: "60-Day Returns",
        desc: "If you don’t love it, you have 60 days to return it."
    },
    {
        icon: secureImg,
        title: "100% Payment Secure",
        desc: "We ensure secure payment with 101% grantee."
    }
]


const SpecialOffers = [
    {
        image: serviceOfferImgOne
    },
    {
        image: serviceOfferImgTwo
    },
    {
        image: serviceOfferImgTwo
    }
]





export {SliderImages, HelpServices, SpecialOffers};