
// Selecciona el elemento con tipo selector clase
const card = document.querySelector('.card');
const cardFront = document.querySelector('.intern');
const cardBack = document.querySelector('.back');
const cardContainer = document.querySelector('.container-right');
// Inicializa la variable 'isFlipped' como false
let isFlipped = false;

// Agrega un event listener al elemento con la clase container-right cuando se hace click
cardContainer.addEventListener('click', function () {
  // Invierte el valor de la variable 'isFlipped'
  isFlipped = !isFlipped;
   // Agrega o remueve la clase flipped del elemento con la clase card según el valor de isFlipped
  card.classList.toggle('flipped');
});

// Agrega un event listener al elemento con la clase card cuando la transición termina
card.addEventListener('transitionend', function () {
  // Si isFlipped es verdadero, oculta cardFront y muestra cardBack
  if (isFlipped) {
    cardFront.style.display = 'none';
    cardBack.style.display = 'block';
  // Si no, muestra cardFront y oculta cardBack
  } else {
    cardFront.style.display = 'block';
    cardBack.style.display = 'none';
  }
});

// Logica de formulario para tarjeta de credito
const form = document.querySelector('#credit-card');

const cardNumber = document.querySelector('#card-number');
const cardHolder = document.querySelector('#name-text');
const cardExpiration = document.querySelector('#valid-thru-text');
const cardCVV = document.querySelector('#cvv-text');

const cardNumberText = document.querySelector('.number-v1');
const cardHolderText = document.querySelector('.name-v1');
const cardHolderTextBack = document.querySelector('.holder');
const cardExpirationText = document.querySelector(".expiration-v1");
const cardCVVText = document.querySelector(".cvv-v2");


// Selecciona el elemento del input de número de tarjeta de crédito
cardNumber.addEventListener("keyup", (e) => {
  // Si no hay un valor en el input, se establece un número predeterminado
  if (!e.target.value) {
    cardNumberText.innerText = "1234 5678 9101 1121";
  } else {
    // Remueve cualquier espacio en blanco en el valor del input
    const valuesOfInput = e.target.value.replaceAll(" ", "");

    // Si el número de dígitos en el input es mayor que 14, se formatea en grupos de cuatro dígitos separados por espacios
    if (e.target.value.length > 14) {
      e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
      cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
    } 
    // Si el número de dígitos en el input es mayor que 9, pero menor o igual a 14, se formatea en grupos de cuatro dígitos separados por espacios
    else if (e.target.value.length > 9) {
      e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
      cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
    } 
    // Si el número de dígitos en el input es mayor que 4, pero menor o igual a 9, se formatea en grupos de cuatro dígitos separados por espacios
    else if (e.target.value.length > 4) {
      e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})/, "$1 $2");
      cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})/, "$1 $2");
    } 
    // Si el número de dígitos en el input es menor o igual a 4, no se realiza ningún formateo
    else {
      cardNumberText.innerHTML = valuesOfInput;
    }
  }
});

cardHolder.addEventListener("keyup", (e) => { // Se agrega un evento de escucha en el input del titular de la tarjeta que se activa cuando se suelta una tecla
  const name = e.target.value; // Se almacena el valor del input en la variable "name"

  if (!name) { // Si el input está vacío
    cardHolderText.innerHTML = "Jorge Mendez"; // Se muestra un valor predeterminado
    cardHolderTextBack.innerHTML = "Jorge Mendez";
  } else { // Si hay algún valor en el input
    let nameArr = name.split(" "); // Se separa el valor ingresado en una matriz donde cada elemento es una parte del nombre separada por un espacio en blanco
    let firstName = nameArr[0]; // Se toma la primera parte del nombre como el primer nombre
    let lastName = nameArr.slice(1).join(" "); // Se toman las partes del nombre después del primer nombre y se unen en una cadena que representa el apellido
    cardHolderText.innerHTML = firstName + " " + lastName; // Se actualiza el texto que se muestra en la tarjeta con el nombre completo
    cardHolderTextBack.innerHTML = firstName + " " + lastName.slice(0, lastName.indexOf(" ") + 1); // Se actualiza el texto que se muestra en la parte posterior de la tarjeta con el primer nombre y la primera letra del apellido
  }
});

// Agregando el formato para fecha 
cardExpiration.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardExpirationText.innerHTML = "02/40";
  } else {
    const valuesOfInput = e.target.value.replace("/", "");
    if (e.target.value.length > 2) {
      e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
      cardExpirationText.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
    } else {
      cardExpirationText.innerHTML = valuesOfInput;
    }
  }
});


cardCVV.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    cardCVVText.innerHTML = "123";
  } else {
    cardCVVText.innerHTML = e.target.value;
  }
})

// Función para generar números de tarjeta de crédito aleatorios
function generateCardNumber() {
  let cardNumber = "";
  for (let i = 0; i < 16; i++) {
    cardNumber += Math.floor(Math.random() * 10);
    if ((i + 1) % 4 === 0 && i !== 15) {
      cardNumber += " ";
    }
  }
  return cardNumber;
}

// Funcion que detecta la marca de la tarjeta
function getCardBrand(cardNumber) {
  // Visa: Empieza con el número 4, longitud 16 o 13
  if (/^4/.test(cardNumber)) {
    return "visa";
  }
  // Mastercard: Empieza con el número 5, longitud 16
  else if (/^5/.test(cardNumber)) {
    return "mastercard";
  }
  // Si no es ni Visa ni Mastercard, retorna null
  else {
    return null;
  }
}

// Cambiar el logo de la tarjeta según la marca detectada
function changeCardLogo(cardBrand) {
  const cardLogo = document.getElementById("cardType");
  if (cardBrand === "visa") {
    cardLogo.src = "image/visa.png";
  } else if (cardBrand === "mastercard") {
    cardLogo.src = "image/mastercard.png";
  } else {
    cardLogo.src = "image/american-express.png";
  }
}

const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Llenar el campo de número de tarjeta con un número generado aleatoriamente
  const cardNumberInput = document.getElementById("card-number");
  const randomCardNumber = generateCardNumber(); // utilizando la funcion
  cardNumberInput.value = randomCardNumber;
  // Actualizar el texto del elemento cardNumberText
  cardNumberText.innerHTML = randomCardNumber;
  // Identificar la marca de la tarjeta y cambiar el logo
  const cardBrand = getCardBrand(randomCardNumber);
  changeCardLogo(cardBrand);
});
