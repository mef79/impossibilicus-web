import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    margin:auto;
    height: 100%;
    width: 100%;
    background-color: #fafafa;
  }

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

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  #graph {
    background-color: #fafafa;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
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
}

#undo,
#redo {
  margin-left: 5px;
  margin-right: 5px;
  display: inline-block;
  cursor: pointer;
}
#load{
  align-self:flex-end;
}

.savebutton{
    width: 100px,
    align-self: flex-end
}

#undo.disabled,
#redo.disabled {
  cursor: not-allowed;
  color: #ccc;
}

#add-node {
  display: inline-block;
}

body {
  font: 13px sans-serif;
  position: relative;

}

form {
  position: absolute;
  bottom: 10px;
  left: 10px;
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

.link {
  stroke: #000;
  stroke-width: 2;
  cursor: pointer;
}

.link_selected {
  stroke: #ff7f0e;
}

.nodelabel {
  fill: #fff;
  stroke-width: 0px;
  cursor: pointer;
}

.tooltip {
  position: fixed;
  line-height: 1;
  font-weight: bold;
  padding: 9px;
  background: #F5F5F5;
  border: 1px solid #AFAFAF;
  border-radius: 5px;
  width: 200px;
}

.tooltip:after,
.tooltip:before {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    color: transparent;
}

/* this border color controls the color of the triangle (what looks like the fill of the triangle) */
.tooltip:after {
    top: 37px;
    left: 101px;
    border-top: 10px solid #F5F5F5;
    border-left: 10px solid transparent;
    border-right:10px solid transparent;
}

/* this border color controls the outside, thin border */
.tooltip:before {
    top: 37px;
    left: 100px;
    border-top: 11px solid #858585;
    border-left: 11px solid transparent;
    border-right:11px solid transparent;
}

.button {
    display: inline-block;
    background: white;
    float: right;
    padding: 1px 2px 3px 2px;
    border: 1px solid #858585;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 3px;
    margin-right: 3px;
}
`;
