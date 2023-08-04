import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-weight: normal;
    }

    body {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    input, select, button {
        font-family: 'Montserrat', sans-serif;
    }

    fieldset {
        border: none;
        margin: 0;
        padding: 0;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance:textfield;
    }

    button, input[type=submit] {
        -webkit-appearance: none;
        border: none;
        font-style: inherit;
        cursor: pointer;
        margin: 0;
        outline: inherit;
    }
`;
