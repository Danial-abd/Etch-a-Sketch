const container = document.querySelector(".container");
const countsize = document.querySelector(".countsize")
const colorButton = document.querySelector(".random");
const clearButton = document.querySelector(".white");
const colorPicker = document.querySelector(".colorPicker");

var slider = document.getElementById("myRange");
let colors = colorPicker.value;
let isShading = false;
let border = "showBorder"; //default value
let opacity = 1;

//set default size by html value
if (document.querySelector(".container-box") == null) {
    cellGrid(slider.value);
}

//slider to change size of the box
slider.addEventListener('input', (event) => {

    // alternative for deleting childElement
    // const containerBox = document.querySelectorAll(".container-box");
    // containerBox.forEach((item) => {
    //     item.remove();
    // })

    container.textContent = ""; //delete child element
    boxSize = event.target.value;
    cellGrid(boxSize);
})

//function to set size of the box
function cellGrid(boxSize){
    slider.value = boxSize;
    for (let i = 0; i < boxSize*boxSize; i++){
        const containerBox = document.createElement("div");
        const colorBox = document.createElement("div");
        containerBox.classList.add('container-box');
        containerBox.classList.add(border);
        colorBox.classList.add('box-color');
        colorBox.style.opacity = opacity;
        containerBox.style.width = `calc(100%/${boxSize})`;
        containerBox.style.height = `calc(100%/${boxSize})`;
        colorBox.style.height = `100%`;
        // containerBox.style.border = "1px dashed gray";
        container.appendChild(containerBox);
        containerBox.append(colorBox)
    }
    countsize.textContent = `${boxSize}px x ${boxSize}px`;
}

//new button color picker
const cpicker = document.querySelector(".btnCpicker");
const bgcpicker = document.querySelector(".picked-color");
bgcpicker.style.backgroundColor = colorPicker.value;

//set color picker
cpicker.addEventListener("click", function(e) {
    colorPicker.showPicker();
    cpicker.classList.add('active');
    colorButton.classList.remove('active');
    colors = colorPicker.value;
})

colorPicker.addEventListener('input', () => {
    colors = colorPicker.value;
    bgcpicker.style.backgroundColor = colorPicker.value;

})

function randomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  // Pad with leading zeros in case the string is less than 6 characters
  return `#${randomColor.padStart(6, '0')}`;
}

//show & hide border
const btnBorder = document.querySelector(".btnBorder");
const cbox = document.querySelector(".container-box");

btnBorder.addEventListener("click", (e) => {
    const cboxAll = document.querySelectorAll(".container-box");
    if (cboxAll[0].matches(".showBorder")) {
        cboxAll.forEach((item) => {
            item.classList.remove('showBorder')
            item.classList.add('hideBorder')
        });
        btnBorder.textContent = "Show Border";
        border = "hideBorder";
    } else {
        cboxAll.forEach((item) => {
            item.classList.remove('hideBorder')
            item.classList.add('showBorder')
        });
        btnBorder.textContent = "Hide Border";
        border = "showBorder";
    }
});

//clear
clearButton.addEventListener("click", (e) => {
    container.textContent= "";
    cellGrid(slider.value);
})

colorButton.addEventListener("click", (e) => {
    const target = e.target;
        target.classList.add('active');
        cpicker.classList.remove('active');
        colors = "random";
})

//shading
const btnShading = document.querySelector(".shading");
btnShading.addEventListener("click", () => {
    const cboxAll = document.querySelectorAll(".box-color");
    if (!isShading) {
        btnShading.classList.add('active');
        isShading = true;
        opacity = 0.1;
        cboxAll.forEach((item) => {
            let boxColor = window.getComputedStyle(item).backgroundColor;
            if (boxColor == 'rgba(0, 0, 0, 0)' || boxColor == 'rgb(255, 255, 255)') {
                item.style.opacity = 0.1;
            }
        })
    } else {
        btnShading.classList.remove('active');
        isShading = false
        opacity = 1
    }

})

container.addEventListener("mouseover", (e) => {
    const target = e.target;
    if (target.matches(".box-color")){
        target.style.backgroundColor = colors;
        if (isShading) {
            let styleOpa = parseFloat(window.getComputedStyle(e.target).opacity);
            let a = opacity + styleOpa;
            target.style.opacity = a;
        } else {
            target.style.opacity = 1;
        }
        if (colors == "random") {
            target.style.backgroundColor = randomColor();
        }
    }
})

//need holdclick eventlistener for drawing 


