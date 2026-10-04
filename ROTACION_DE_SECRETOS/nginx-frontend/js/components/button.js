export function Button(
    text,
    onClick = () => {
        console.log('I was clicked, please add a comprehensive callback')
    }
) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('py-2');
    button.classList.add('px-6');
    button.classList.add('my-4');
    button.classList.add('ml-2');
    button.classList.add('border');
    button.classList.add('border-grey-200');
    button.classList.add('rounded-md');
    button.classList.add('bg-grey-100');
    button.innerText = text;

    button.addEventListener('click', () => { onClick() })

    return button;
}