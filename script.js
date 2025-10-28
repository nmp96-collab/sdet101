document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("changeBtn");
    const message= document.getElementById("message");
    const msgInput= document.getElementById("msgInput");
    const applyBtn= document.getElementById("applyBtn");
    const countEl= document.getElementById("count");
    const themeBtn= document.getElementById("themeBtn");

    let count= parseInt(countEl.textContent, 10)||0;

    button.addEventListener("click", function(){

        count +=1;
        countEl.textContent=String(count);

        message.classList.toggle('alt');

        if (message.classList.contains('alt')){
            message.textContent = "I am learning JavaScript";
        }else{
            message.textContent = "The color and text have been changed!";
        }
        
    });

    applyBtn.addEventListener("click", function(){
        const val= msgInput.value.trim();
        if (val) {
            message.textContent=val;
        }
    });
    themeBtn.addEventListener("click", function(){
        document.body.classList.toggle("theme-dark");
    });
});