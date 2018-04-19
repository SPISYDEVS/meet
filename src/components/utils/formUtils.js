/* expects format
   data = {
       key: {value: 'value1'},
       key2: {value: 'value2'},
       error: {key: '', key2: ''}
   }
 */
export const extractData = (data) => {
    const retData = {
        'data': {},
        'error': {}
    };

    Object.keys(data).forEach(function (key) {

        if (key !== "error") {
            let {value, validator, errorMessage} = data[key];

            if(validator === undefined || validator(value)){
                retData['data'][key] = value;
                retData['error'][key] = '';
            } else {
                retData['error'][key] = errorMessage;
            }

        }
    });

    return retData;
};

export const hasErrors = (errors) => {
    const keys = Object.keys(errors);

    for(const key of keys){
        if (errors[key].length > 0){
            return true;
        }
    }

    return false;
};

/* returns format
    data = {
        key1: {type: type, validator: validator, errorMessage: errorMessage, value: value !== undefined ? value : ''},
        key2: {type: type, validator: validator, errorMessage: errorMessage, value: value !== undefined ? value : ''},
        key3: {type: type, validator: validator, errorMessage: errorMessage, value: value !== undefined ? value : ''},
        error: {key1: '', key2: '', key3: ''}
    }
 */
export const createState = (fields) => {
    //create the state
    const state = {};
    state["error"] = {};

    const fieldKeys = Object.keys(fields);

    fieldKeys.forEach((key) => {
        const field = fields[key];
        let {type, validator, errorMessage, value} = field;
        state[key] = {type: type, validator: validator, errorMessage: errorMessage, value: value !== undefined ? value : ''};
        state['error'][key] = '';
    });

    return state;
};