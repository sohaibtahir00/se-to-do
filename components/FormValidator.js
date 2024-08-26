class FormValidator {
    constructor(settings, formEl) {
        this._settings = settings;
        this._formEl = formEl;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;

        this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        // Check if any input is invalid or if any input is empty
        return this._inputList.some(inputElement => !inputElement.validity.valid || inputElement.value.trim() === '');
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });

        this._formEl.addEventListener("reset", () => {
            this.resetValidation(); // Reset the form validation when form is reset
        });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault(); // Prevent the form from submitting
        });
        this._setEventListeners();
    }

    resetValidation() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
            inputElement.value = ''; 
        });
        this._toggleButtonState(); // Ensure the button is disabled after resetting the form
    }
}

export default FormValidator;
