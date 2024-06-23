const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 };
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1
const updateCoordinates = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);


function getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(
        Math.pow(diffX, 2) + Math.pow(diffY, 2)
    );
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
}


const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);

    pos.x += diffX * speed;
    pos.y += diffY * speed;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
    const rotate = 'rotate(' + angle + 'deg)';
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

    cursor.style.transform = translate;
    cursorCircle.style.transform = rotate + scale;
};

function loop() {
    updateCursor();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);



const cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
    curosrModifier.addEventListener('mouseenter', function() {
        const className = this.getAttribute('cursor-class');
        cursor.classList.add(className);
    });
    curosrModifier.addEventListener('mouseleave', function() {
        const className = this.getAttribute('cursor-class');
        cursor.classList.remove(className);
    });
});

let currentInd = 0;
const itemsToShow = 4;

function showSlides(index) {
    const slides = document.querySelectorAll('.product-item');
    if (index >= slides.length) currentInd = 0;
    if (index < 0) currentIndex = slides.length - itemsToShow;

    slides.forEach((slide, i) => {
        slide.style.display = (i >= currentInd && i < currentInd + itemsToShow) ? "block" : "none";
    });

    // Disable buttons at the edges
    document.getElementById('prevBtn').disabled = currentInd === 0;
    document.getElementById('nextBtn').disabled = currentInd + itemsToShow >= slides.length;
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentInd += itemsToShow;
    showSlides(currentInd);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentInd -= itemsToShow;
    showSlides(currentInd);
});

// Initialize the slideshow
showSlides(currentInd);





// Variables 
var houses = [{
        id: "gryffindor",
        color: "#740001",
        message: "Congrats, you're in Gryffindor!"
    },
    {
        id: "hufflepuff",
        color: "#ecb939",
        message: "Congrats, you're in Hufflepuff!"
    },
    {
        id: "ravenclaw",
        color: "#0e1a40",
        message: "Congrats, you're in Ravenclaw!"
    },
    {
        id: "slytherin",
        color: "#1a472a",
        message: "Congrats, you're in Slytherin!"
    },
];
var sortButton = document.getElementById("sortButton");

// Creates a Sort Function 
function sortHouse() {
    var selection = houses[Math.floor(Math.random() * houses.length)];
    document.getElementById("message").innerHTML = selection.message;
    // document.body.style.backgroundColor = selection.color;
    document.getElementById("wrap").style.backgroundColor = selection.color;
}

// Call Sort Function On Click
sortButton.addEventListener("click", function() {
    sortHouse();
    sortButton.remove();
});