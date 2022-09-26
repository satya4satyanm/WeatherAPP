class Utils{

    static formatDate(){
        let currentDate = new Date();
        let formatedDate = currentDate.toLocaleDateString("en-US", {
            weekday:'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })

        return formatedDate
    }
}

const CELCIUS_SYMBOL = '&#8451';
export {Utils, CELCIUS_SYMBOL}