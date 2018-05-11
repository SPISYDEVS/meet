Forms contain a nested object structure that will be used to create state.

Example:

--------------------------------------------------------------
this.form = {
    fields: {
        title: {
            options:{
                placeholder: "Title",
                type: "text",
                multiline: true,
            }
            value: '',
            validator: (title) => !isEmpty(title),
            errorMessage: 'Title is required'
        },
        description: {
            options: {
                placeholder: "Description",
                multiline: true,
            }
            type: "text",
        },
        date: {
            options: {
                format: DATE_FORMAT,
                minuteInterval: 5,
                mode: 'datetime',
            },
            value: moment().format(DATE_FORMAT),
            type: 'date',
        },
    }
}
--------------------------------------------------------------

A form object will contain the key 'fields', which contains an object per form input field

In the example, we see that there is a key 'title' in the fields object;
This represents a text input that is accessible by the key word 'title'

Within the text input for 'title', we have the options object which is used to represent props that will
be passed into the text input. The props in options are -static- and will never change.

Aside from options, we have a 'value', which holds the current value that the user has inputted.
Omitting the 'value' property (as in the description input field) will by default leave it an empty string.

The 'validator' and 'errorMessage' keys are used to provide error feedback to the user. These are optional.
The validator is a function that takes the value and returns a boolean to check if the input is valid.
The errorMessage is displayed if the validator fails (returns false).

If a component needs dynamic props, don't use the key 'options', use the key 'other'.

Then, once you have defined your form object, you can create the state based off it by calling

--------------------------------------------------------------
import {createState} from "../../../common/utils/formUtils";
this.state = createState(this.form.fields);
--------------------------------------------------------------



The state will then look like this....

--------------------------------------------------------------
data = {
    title: {type: type, other: other, validator: validator, errorMessage: errorMessage, value: value !== undefined ? value : ''},
    description: {type: type, other: other, validator: validator, errorMessage: errorMessage, value: value !== undefined ? value : ''},
    date: {type: type, other: other, validator: validator, errorMessage: errorMessage, value: value !== undefined ? value : ''},
    error: {title: '', description: '', date: ''}
}
--------------------------------------------------------------

From there you have access to your form data through state!

For example, to access the value for the title text input, you'd write

--------------------------------------------------------------

this.state.title.value (equivalent to this.state['title']['value'])

--------------------------------------------------------------


