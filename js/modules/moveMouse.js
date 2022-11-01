function moveMouse() {
    const imgArr = document.querySelectorAll('book__img');

    imgArr.forEach(item => {
        item.onmousedown = function(e) { // 1. отследить нажатие
            // подготовить к перемещению
            // 2. разместить на том же месте, но в абсолютных координатах
            item.style.position = 'absolute';
            moveAt(e);
            // переместим в body, чтобы мяч был точно не внутри position:relative
            document.body.appendChild(item);
        
            item.style.zIndex = 1000; // показывать мяч над другими элементами
        
            // передвинуть мяч под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            function moveAt(e) {
                item.style.left = e.pageX - item.offsetWidth / 2 + 'px';
                item.style.top = e.pageY - item.offsetHeight / 2 + 'px';
            }
        
            // 3, перемещать по экрану
            document.onmousemove = function(e) {
                moveAt(e);
            }
        
            // 4. отследить окончание переноса
            item.onmouseup = function() {
                document.onmousemove = null;
                item.onmouseup = null;
        
                
            }
        }
    })
}



export default moveMouse;