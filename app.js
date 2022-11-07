//нам нужно менять цвет колонок, но
//прежде надо генерировать эти цвета:
//функция ниже не будет ничего принемать,
//а будет отдавть нам код рандомно созданного цвета.
//цвета в js показываются в 16-ти ричной системе исчислени я
//RGB
//#FF0000 - чисто красный цвет
//#00FF00 - чисто зеленый
//#0000FF - чисто синий

//то есть , у нас есть диапазон от 0 до F  - это 16тиричная система исчисления
//6 - так как нам нужно получить всего лишь 6 значений!
//функция, которая нам дает случайный цвет!!function generateRandomColor()
//Как нам определить оттенок!!function setTextColor
//функция, которая принимает в себя текст(дом элемент) и color
//далее, с помощью библиотеки chroma, которую мы подключили, мы можем передать
//пердать тот цвет и у этого объекта, котор мы получаем , вызвать метод luminance
//также создать переменную. куда все это положить
//идея следующая-если константа будет больше, чем 0,5, то в таком  случае цвет шрифта черный
//если меньше 0,5, то белый
//все это с помощью тернарного оператора
//function setTextColor - определяем оттенок текста и кнопки, чтобы было видно на фоне(черный или белый, или какой-то другой в последствии)
//document.addEventListener("keydown", (event) => - вешаем событие для того,чтобы обновлять цвета с помощью пробела (space, например), но само событие, если проверить в консоле что такое event.code , нам показывает кнопки при нажатии на них на клавиатуре
//далее, замок у нас открытый по умолчанию, делаем так,чтобы при нажатии мы фиксировали нужный цвет и замок закрывался
//то есть,первым делом надо обработать клик по этому элементу!
//eventDiligation - добавляем один слушатель клика на весь документ и далее уже определяем, по какому конкретно элементу мы совершили клик.
//в HTML добавляем data-type в значении lock для кнопки и для иконки!!!(иначе при нажатии на замочек не будет срабатывать, а только при нажатии на область вокруг замочка будет срабатывать скрипт)
//дата атрибуты нужны ,чтобы добавлять какие-то свои данные непосредственно на элемент
//document.addEventListener('click', event=>{ - далее мы можем спросить - по какому элементу совершен клик
//мы можем спросить у скрипта, есть ли у этого элемента дата-атрибут со значением lock!
// в dataset хранится объект всех дата-атрибутов, которые есть!!
//класс нужно менять у тега i, чтобы замочек закрывался, но клик возможен и покнопке!
//поэтому, добавляем проверку: if (type === "lock") { и так далее смотри в коде
//длее,если замок закрыт, то сам замочек не должен менять цвет при клике на пробел
//поэтому , в setRandomsColors создаем константу isLocked и прописываем функционал
// и ниже   if (isLocked) {return;} - если закрыто, то ретерн - то есть, ничего не меняем!!

//теперь сделать так, чтобы при клике на заголовок(#FG56YH) ЦВЕТ КОПИРОВАЛСЯ - реализуем функцию copyToClickboard()
//теперь у нас есть метод copyToClickboard
//дальше мы можем обработать click по заголовку h2
//добавляем в html к заголовку <h2 data-type="copy"></h2>
//хотим подобрать цвета, сохранить и отправить дизайнеру, например
//мы можем это сделать с помощью URL адреса, есть такая штука - хэш
//document.location.hash = '424242' - в консоли
const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  //если мы нажали пробел:
  if (event.code.toLowerCase() === "space") {
    setRandomsColors(); //то нам необходимо обновить цвета
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i" //проверка - и теперь при клике на баттон и на иконку будет всегда иконка
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open"); //classList предназначен для работы с классами, у него можно вызвать метод toggle(переключать!!)
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
  }
});

function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF"; //символы, которые могут нам сгенирировать любой цвет!
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}
//при клике будем сохранять нужный цвет в кликбоард - реализуем метод
function copyToClickboard(text) {
  return navigator.clipboard.writeText(text); //эта конструкция возвращает промис, поэтому пишем return, если нужно будет его обработать
}

function setRandomsColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []; //только при загрузке страницы - если isInitial - то возьмем цвета из хэша, если нет,то пустой массив. То есть,теперь у нас потенциально в массиве colors присутствует набо цветов имы с ними можем поработать, на самом деле тогда, когда мы генерируем цвет.

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    //то есть, в случае, если это первичная загрузка, то нам нужно получить значение цвета не рандомно, а имено из массива colors!!Но это массив, здесь нужно получить правильный индекс - к методу forEach() добавляем index !!
    //const color = chroma.random(); //рандомная генерация цвета!!установили библиотеку и вместо generateRandomColor() написали chroma.random()
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    //если это первоначальная загрузка, то нам не нужно будет складывать новый цвет при первоначальной в массив, массив colors у нас как бы есть! поэтому, штуку ниже colors.push(color) мы будем делать только в том случае, если это не первоначальная загрузка
    //- это не первоначальная загрузка?? Тогда складывваем цвет в массив, а если она, то не складываем!
    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

//делаем это в url адресе: #ac27fd-981ffc-adc469-027fee-e1dc63
function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}
//делаем вот так: массив из названий цветов:
//getColorsFromHash()
//(5) ['#ac27fd', '#981ffc', '#adc469', '#027fee', '#e1dc63']
function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    //document.location.hash - сейчас это строчка и ниже нужно привести ее к массиву!!(split)
    return document.location.hash
      .substring(1) // - убираем # вначале строки можно увидеть в консоле document.location.hash
      .split("-") //все цвета разделены дефисом, мы делаем сплит по дефису! Эта вся штука нам вернет список всех цветов в массиве, но без решетки!!
      .map((color) => "#" + color); //добавим # для каждого элемента
  }
  return [];
}
//вызываем в консоле getColorsFromHash() - получаем массив цветов с #
setRandomsColors(true);
