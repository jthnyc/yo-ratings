import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
* {
    --light-blue: #6290c3;
    --dark-blue: #1a1b41;
    --light-green: #f1ffe7;
    --lime-green: #baff29;
    --teal-green: #c2e7da;
    --lime-yellow: #f1ff37;
}

body {
    font-family: "Barlow Semi Condensed", serif;
    margin: 0;
    padding: 0;
    background: var(--dark-blue)
}

`;

export default Global;
