async function main() {
    //adding eventlistner to side bar
    document.querySelector(".hamburg").addEventListener("click", () => {
        document.getElementById("sidebar_id").style.left = "0px"
    })

    document.querySelector(".close_cont").addEventListener("click", () => {
        document.getElementById("sidebar_id").style.left = "-150%"
    })

    //addding eventlistner to theme 
    document.querySelector(".theme_cont").addEventListener("click", () => {
       let x = document.querySelector(".target_body");

       if(x.classList.contains("body_dark_theme")){
        document.querySelector(".theme_img").src = "https://cdn-icons-png.flaticon.com/512/1687/1687737.png"
        document.getElementById("main_body").style.background = "Whitesmoke"
        x.classList.replace("body_dark_theme", "body_light_theme")
       }
       else {
        document.querySelector(".theme_img").src = "https://cdn-icons-png.flaticon.com/512/4893/4893587.png "
        document.getElementById("main_body").style.background = "black"
        x.classList.replace("body_light_theme", "body_dark_theme")
       }
    })

    document.querySelector(".feature1").addEventListener("click", ()=>{
        alert("This feature is currently under construction");
    })
    document.querySelector(".feature2").addEventListener("click", ()=>{
        alert("This feature is currently under construction");
    })

}



main()