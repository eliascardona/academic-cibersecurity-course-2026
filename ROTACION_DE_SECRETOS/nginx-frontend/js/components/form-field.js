import { performHTTPRequest } from "../infrastructure/requester.js";
import { Button } from "./button.js";

export function LDAPLoginForm() {
    const layout = document.createElement('div');
    layout.classList.add('my-form', 'background-gray-50')

    async function performLDAPLogin(payload = { username: '', password: '' }) {

        if (payload.username.length < 1 
            || !payload.password.length < 1) return

        const requestBody = JSON.stringify(payload)

        console.log(`[payload]`, payload);
        console.log(`[Request body]`, requestBody);

        const apiPath = "/api/ldap/login"
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody
        };

        await performHTTPRequest(
            apiPath,
            requestOptions,
        );
    }

    let usernameValue = ""
    let passwordValue = ""

    const usernameField = Field(
        'field_id_username',
        'Username',
        'alice',
        'text',
        (inputValue) => { usernameValue = inputValue }
    );

    const passwordField = Field(
        'field_id_password',
        'Password',
        '******',
        'password',
        (inputValue) => { passwordValue = inputValue }
    );

    const payload = {
        username: usernameValue,
        password: passwordValue,
    }

    const submitButton = Button(
        'Login',
        async () => {
            console.log('click sobre el botón');
            await performLDAPLogin(payload)
        }
    );

    const formTitle = document.createElement('h2')
    formTitle.innerText = "Realiza un login"

    layout.append(
        formTitle,
        usernameField,
        passwordField,
        submitButton
    );

    return layout;
}

function Field(
    fieldId,
    labelText = 'Field label',
    placeholder = 'Placeholder...',
    fieldType  = 'text',
    onChange = (value) => {
        console.log('I was clicked, please add a comprehensive callback')
    }
) {
    const input = document.createElement('input');
    input.classList.add('input')

    const label = document.createElement('label');
    label.innerText = labelText;

    input.setAttribute('id', fieldId);

    input.setAttribute('type', fieldType);
    input.placeholder = placeholder;

    let inputValue = ""
    input.addEventListener('change', e => {
        inputValue = e.target.value
        console.log(`[Form field event] - Field with id=${e.target.id} exposed the value: ${inputValue}`);

        onChange(inputValue)
    })

    return input;
}