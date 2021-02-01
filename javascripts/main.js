window.addEventListener('load',function(){
  setInitialValueForColorScheme();
  
  let checkElement = document.querySelector("#dark-toggle");
  checkElement.checked = isUsingDarkMode();

  


  checkElement.addEventListener("change",function(ev){
    let bodyElement = document.querySelector("body");
    if(this.checked){
      bodyElement.classList.remove("force-light");
      setDarkModeValueFromLS("dark");
      return bodyElement.classList.add("force-dark");    
    }
    setDarkModeValueFromLS("light");
    bodyElement.classList.remove("force-dark");
    return bodyElement.classList.add("force-light");    
  });
});

function setInitialValueForColorScheme(){
  let bodyElement = document.querySelector("body");
  let savedValue = getDarkModeValueFromLS();
  if(!savedValue) return;

  if (savedValue === "light") return bodyElement.classList.add("force-light"); 
  bodyElement.classList.add("force-dark"); 

}

function getDarkModeValueFromLS(){
  if(!window.localStorage) return;
  return window.localStorage.getItem("mp--color-scheme");
}

function setDarkModeValueFromLS(value) {
  // value: dark, light
  if (!window.localStorage) return;
  window.localStorage.setItem("mp--color-scheme",value)

}

function isUsingDarkMode(){


  let bodyElement = document.querySelector("body");

  let blackColor = getComputedStyle(bodyElement).getPropertyValue("--black");
  let bodyBg = getComputedStyle(bodyElement).backgroundColor;
  return blackColor.trim() == rgb2hex(bodyBg);
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return ("#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])).toUpperCase();
}