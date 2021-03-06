import { injectGlobal } from 'styled-components'

/* eslint no-unused-expressions: 0 */
injectGlobal`

body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

}

.title-text-field {
  width: 100% !important;
}

.title-text-field label {
  color: rgba(0,0,0,.5) !important;
}

.form-container {
    padding: 20px
}

.storyText label {
  color: rgba(0,0,0,.5) !important;
}

.storyText {
  width:100% !important;
}
.storyText textarea::-webkit-scrollbar {
    width: 6px;
}

.storyText textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 2px rgba(15,15,15,1);
}

.storyText textarea::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }



  svg {
    background-color: #fafafa;
  }

  p,
  label {
    line-height: 1.5em;
  }


  .sectionContainer: {
        width: 800px
  }

  #bottom {
  height: 100px;
  background: #dbe8fc;
  font-size: 16px;
  padding: 10px;
  font-family: roboto;
  width:800px;
}

tbody tr:nth-child(odd) {
   background-color: #fff;
}

.navButtons {
   display: flex;
   justify-content: space-between;
}

body {
  font: 13px sans-serif;
  position: relative;

}
@media screen and (max-width:475px){
  .btn{
    font-size:.9em;
  }
}
.push-down {
  margin-bottom: 3px;
}

.node {
  fill: #004b7d;
  stroke: #FFF;
  stroke-width: 1.5px;
  cursor: pointer;
}

.node_selected {
  fill: #ff4a4a;
}

.node-warning {
  fill: #FFEB3B;
}

.link {
  stroke: #555555;
  stroke-width: 2;
  cursor: pointer;
}

.link-lock {
  fill: #000;
}

.link_selected {
  stroke: #ff7f0e;
}

.nodelabel {
  color: #fff;
  background: transparent;
  stroke-width: 0px;
  cursor: pointer;
}

.nodelabel div {
  overflow: hidden;
}

.mf-tooltip {
  position: fixed;
  line-height: 1;
  font-weight: bold;
  padding: 9px;
  background: #F5F5F5;
  border: 1px solid #AFAFAF;
  border-radius: 5px;
  width: 200px;
}

.mf-tooltip:after,
.mf-tooltip:before {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    color: transparent;
}

/* this border color controls the color of the triangle (what looks like the fill of the triangle) */
.mf-tooltip:after {
    top: 36px;
    left: 101px;
    border-top: 10px solid #F5F5F5;
    border-left: 10px solid transparent;
    border-right:10px solid transparent;
}

/* this border color controls the outside, thin border */
.mf-tooltip:before {
    top: 37px;
    left: 100px;
    border-top: 10px solid #858585;
    border-left: 11px solid transparent;
    border-right: 10px solid transparent;
}

tr.selected {
  background: #dbe8fc !important;
}

input.invalid {
  border: 1px solid red;
}

input.invalid:focus {
  outline-color: #fb9797;
}

div.button.disabled {
  color: #ccc;
}

div.button.active {
  color: black;
  background: #4991ff;
  border: 1px solid black;
}

.button {
  display: inline-block;
  background: white;
  float: right;
  padding: 1px 2px 3px 2px;
  border: 1px solid #858585;
  border-radius: 2px;
  margin-left: 3px;
  margin-right: 3px;
}

.button, .btn {
  cursor: pointer;
}
`
