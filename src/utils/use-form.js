function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
    if (isLoading) {
      button.textContent = loadingText
    } else {
      button.textContent = buttonText
    }
}

export function handleSubmit(request, event, loadingText = "Сохранение...") {
    event.preventDefault();
       
    const submitButton = event.submitter;
    const initialText = submitButton.textContent;

    renderLoading(true, submitButton, initialText, loadingText);
    
    request()
        .then(() => {
            event.target.reset();
        })
        .catch((error) => {
            console.error(`Текст ошибки: "${error.message}"`);
        })
        .finally(() => {
            renderLoading(false, submitButton, initialText);
        })

}
