import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  position: relative;
  overflow-x: hidden;
}

*,
::after,
::before {
  box-sizing: border-box;
  outline: 0;
  -webkit-tap-highlight-color: transparent;
}

img {
  display: inline-block;
  color: transparent;
  border: 0;
}

a {
  display: inline-block;
  color: #000;
  color: inherit;
  text-decoration: none;
  outline: none;
}

ul,
ol {
  list-style-type: none;
}

article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
main {
  display: block;
}

body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
form,
input,
button,
textarea,
p,
th,
td {
  margin: 0;
  padding: 0;
}

input,
button {
  outline: none;
}

button::placeholder {
  color: rgb(194, 197, 210);
}

input::-ms-clear {
  display: none;
}

input::-ms-reveal {
  display: none;
}

input::-webkit-credentials-auto-fill-button {
  position: absolute;
  right: 0;
  display: none !important;
  visibility: hidden;
  pointer-events: none;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #9b9b9b;
  font-weight: 500;
  font-size: 12px;
}

.hide,
.hidden {
  display: none !important;
}

.speed {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -ms-perspective: 1000px;
  perspective: 1000px;
}
\``;

export const tpl_src_reset = {
  tpl
};

export default tplEngineInit(tpl_src_reset, 'tpl');