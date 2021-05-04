// Used to validate user entries
// All sections of the drink form must be filled out
export default function validateInfo(values) {
    let errors = {}

    if(!values.date){
        errors.date = "Date required"
    }

    if(!values.drink){
        errors.drink = "Drink name required"
    }

    if(!values.price){
        errors.price = "Price required"
    }

    if(!values.sweetness){
        errors.sweetness = "Sweetness level required"
    }else if(values.sweetness !== "low" 
    && values.sweetness !== "regular" 
    && values.sweetness !== "high"
    && values.sweetness !== "Low" 
    && values.sweetness !== "Regular" 
    && values.sweetness !== "High"){
        errors.sweetness = "Must be: low, regular, or high"
    }

    return errors;
}