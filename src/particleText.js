let ww = window.innerWidth;
let wh = window.innerHeight;

function initParticleJS(elementSelector, customConfigObject) {

  //The main Object which will be returned exposing the Properties and Methods
  let particleJS = {
    'isAnimating': false,
  };

  //Validation assert which will stop further execution of the script.
  let assertStop = function(cond, text, dontThrow) {
    if (cond)  return;
    if (dontThrow) {
      debugger;
    } else {
      throw new Error(text || "Assertion failed!");
    }
  };

  let calculateExplosionRadius = function(configObject) {
    let defaultExplosionRadius = prepareDefaultConfig().explosionRadius;
    let configExplosionRadius  = configObject.explosionRadius;
    let radius = defaultExplosionRadius.xxxs;
    let lastDefinedConfigExplosionRadius = "";
    
    if(ww <= 170) { //This is XXXS
      if(configExplosionRadius.xxxs !== undefined) {
        radius = configExplosionRadius.xxxs;
        lastDefinedConfigExplosionRadius = radius;
      } else {
        radius = defaultExplosionRadius.xxxs;
      }
    }
    if(ww >= 320) { //This ix XXS
      if(configExplosionRadius.xxs !== undefined) {
        radius = configExplosionRadius.xxs;
        lastDefinedConfigExplosionRadius = radius;
      } else if(lastDefinedConfigExplosionRadius !== "") {
        radius = lastDefinedConfigExplosionRadius;
      } else {
        radius = defaultExplosionRadius.xxs;
      }
    }
    if(ww >= 375) { //This is XS
      if(configExplosionRadius.xs !== undefined) {
        radius = configExplosionRadius.xs;
        lastDefinedConfigExplosionRadius = radius;
      } else if(lastDefinedConfigExplosionRadius !== "") {
        radius = lastDefinedConfigExplosionRadius;
      } else {
        radius = defaultExplosionRadius.xs;
      }
    }
    if(ww >= 768) { //This is SM
      if(configExplosionRadius.sm !== undefined) {
        radius = configExplosionRadius.sm;
        lastDefinedConfigExplosionRadius = radius;
      } else if(lastDefinedConfigExplosionRadius !== "") {
        radius = lastDefinedConfigExplosionRadius;
      } else {
        radius = defaultExplosionRadius.sm;
      }
    }
    if(ww >= 1024) { //This is MD
      if(configExplosionRadius.md !== undefined) {
        radius = configExplosionRadius.md;
        lastDefinedConfigExplosionRadius = radius;
      } else if(lastDefinedConfigExplosionRadius !== "") {
        radius = lastDefinedConfigExplosionRadius;
      } else {
        radius = defaultExplosionRadius.md;
      }
    }
    if(ww >= 1440) { //This is LG
      if(configExplosionRadius.lg !== undefined) {
        radius = configExplosionRadius.lg;
        lastDefinedConfigExplosionRadius = radius;
      } else if(lastDefinedConfigExplosionRadius !== "") {
        radius = lastDefinedConfigExplosionRadius;
      } else {
        radius = defaultExplosionRadius.lg;
      }
    }
    if(ww >= 2560) { //This is XL
      if(configExplosionRadius.xl !== undefined) {
        radius = configExplosionRadius.xl;
        lastDefinedConfigExplosionRadius = radius;
      } else if(lastDefinedConfigExplosionRadius !== "") {
        radius = lastDefinedConfigExplosionRadius;
      } else {
        radius = defaultExplosionRadius.xl;
      }
    }
    if(ww >= 3440) { //This is XXL
      if(configExplosionRadius.xxl !== undefined) {
        radius = configExplosionRadius.xxl;
        lastDefinedConfigExplosionRadius = radius;
      } else if(lastDefinedConfigExplosionRadius !== "") {
        radius = lastDefinedConfigExplosionRadius;
      } else {
        radius = defaultExplosionRadius.xxl;
      }
    }
    if(ww >= 3840) { //This is XXXL
      if(configExplosionRadius.xxxl !== undefined) {
        radius = configExplosionRadius.xxxl;
        lastDefinedConfigExplosionRadius = radius;
      } else if(lastDefinedConfigExplosionRadius !== "") {
        radius = lastDefinedConfigExplosionRadius;
      } else {
        radius = defaultExplosionRadius.xxxl;
      }
    }

    return radius;

  };

  //The default config parameters.
  let prepareDefaultConfig = function(element) {
    let config = {
      'colors': ["#000000"],
      'fontWeight': 'bold',
      'textAlign': 'center',
      //TODO: Adjust the default Values
      'particleRadius': {
        'xxxs': {
          'base': 1,
          'rand': 2,
        },
        'xxs': {
          'base': 2,
          'rand': 1,
        },
        'xs': {
          'base': 2,
          'rand': 1,
        },
        'sm': {
          'base': 2,
          'rand': 1,
        },
        'md': {
          'base': 2,
          'rand': 1,
        },
        'lg': {
          'base': 2,
          'rand': 1,
        },
        "xl": {
          'base': 2,
          'rand': 1,
        },
        'xxl': {
          'base': 2,
          'rand': 1,
        }, 
        'xxxl': {
          'base': 2,
          'rand': 1,
        },
      },
      //TODO: Adjust the Default Values
      'explosionRadius': {
        'xxxs': 150,
        'xxs':  150,
        'xs':   150,
        'sm':   150,
        'md':   150,
        'lg':   150,
        'xl':   150,
        'xxl':  150,
        'xxxl': 150,
      },
      'autoAnimate': true,
      'friction': {
        'base': 0.9,
        'rand': 0.05
      },
    };

    if(element !== undefined) {
      config.fontSize = element.height / 2;
    }

    return config;
  }


  let element = document.querySelector(elementSelector);
  assertStop(element.tagName.toUpperCase() === "CANVAS", "Required element Canvas, found " + element.tagName + ".");

  let configObject = prepareDefaultConfig(element);
  for (const key in customConfigObject) {
    configObject[key] = customConfigObject[key];
  }

  let text = element.dataset.text;
  if (configObject.text !== undefined) {
    text = configObject.text;
  }
  assertStop(text !== undefined, 'Theere is no text passed, Check Documentation.');
  
  if(!Array.isArray(configObject.colors)) {
    configObject.colors = [configObject.colors];
  }

  assertStop(configObject.colors.length != 0, "Atleast 1 color should be present");
  configObject.colors.forEach(function validateHex(element) {
    assertStop(/^#[0-9A-F]{6}$/i.test(element), "The color " + element + " is not valid.");
  });



  let slowBrowser = false;
  let isTested    = true;
  let scaleToFit  = 3;
  let ctx         = element.getContext("2d");
  let particles   = [];
  let amount      = 0;
  let mouse       = {x: -9999, y: -9999};

  let radius      = calculateExplosionRadius(configObject);
  console.log(radius)

  //Main Particle Class
  class Particle {
    constructor(x, y) {
      this.x    = Math.random() * element.width;
      this.y    = Math.random() * element.height;
      this.vx   = (Math.random() - 0.5) * 10;
      this.vy   = (Math.random() - 0.5) * 10;
      let rand  = Math.random();
      this.dest = {x: x, y: y};
        
      //Condition for Responsiveness
      // if (ww <= 425) {
      //     this.r = 1;
      // } else if (ww <= 1024) {
      //     this.r = rand + 2;
      // } else if (ww <= 2048) {
      //     this.r = (rand * 3) + 3;
      // } else {
      //     this.r = (rand * 4) + 6;
      // }
      this.r = (rand * 2) + 1;

      if(slowBrowser) {
          if (ww <= 2048) {
              this.r = 1;
          } else if(ww <= 3000) {
              this.r = (rand * 1) + 2;
          } else {
              this.r = (rand * 2) + 2;
          }
      }
        

      this.accX = 0;
      this.accY = 0;
      this.friction = Math.random() * 0.05 + 0.9;
      if(slowBrowser) {
          this.friction /= 1.1;
      }

      this.color = configObject.colors[Math.floor(Math.random() * configObject.colors.length)];
    }

    //Rended method
    render() {
      this.accX = (this.dest.x - this.x) / 100;
      this.accY = (this.dest.y - this.y) / 100;
      if(slowBrowser) {
        this.accX *= 8;
        this.accY *= 8;
      }
      this.vx  += this.accX;
      this.vy  += this.accY;
      this.vx  *= this.friction;
      this.vy  *= this.friction;
      this.x   += this.vx;
      this.y   += this.vy;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(Math.floor(this.x), Math.floor(this.y), Math.floor(this.r), Math.PI * 2, false);
      ctx.fill();

      //Exploding logic on Mouse Move
      let a = this.x - mouse.x;
      let b = this.y - mouse.y;
      var distance  = Math.sqrt(a * a + b * b);
      if (distance  < (radius)) {
        this.accX = (this.x - mouse.x) / 10;
        this.accY = (this.y - mouse.y) / 10;
        if(slowBrowser) {
          this.accX *= 4;
          this.accY *= 4;
        }
        this.vx  += this.accX;
        this.vy  += this.accY;
      }
    }
  }


  //Change mouse pointers on mouse movement
  function onMouseMove(e){
    mouse.x = e.clientX - element.offsetLeft;
    mouse.y = e.clientY - element.offsetTop;
    if(slowBrowser) {
      mouse.x /= scaleToFit;
      mouse.y /= scaleToFit;
    }
  }

  //Handling for touch inputs. Take only first touch. (For multi touch devices)
  function onTouchMove(e){
    if(e.touches.length > 0 ){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      if(slowBrowser) {
        mouse.x /= scaleToFit;
        mouse.y /= scaleToFit;
      }
    }
  }

  //For touch devices - Need to reset when finger is lifted.
  function onTouchEnd(e){
    mouse.x = -9999;
    mouse.y = -9999;
  }

  //Initialization Function
  function initScene(){
    ww = window.innerWidth;
    wh = window.innerHeight;
    // if(slowBrowser) {
    //   element.width = ww/scaleToFit;
    //   element.height = wh/scaleToFit;
    // } else {
    //   // element.width = ww;
    //   // element.height = wh;
    // }    

    ctx.clearRect(0, 0, element.width, element.height);

    //Fill canvas with text (Temporarily!)
    ctx.font =  configObject.fontWeight + " "+configObject.fontSize+"px sans-serif";  
    ctx.textAlign = configObject.textAlign;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, element.width/2, element.height/2);

    // Take snapshot and clear canvas
    let data  = ctx.getImageData(0, 0, element.width, element.height).data;
    ctx.clearRect(0, 0, element.width, element.height);
    ctx.globalCompositeOperation = "screen";

    //Let the fun games begin!
    particles = [];
    for(var i=0;i<element.width;i+=Math.round(element.width/150)){
      for(var j=0;j<wh;j+=Math.round(element.width/150)){
        if(data[ ((i + j*element.width)*4) + 3] > 150){
          particles.push(new Particle(i,j));
        }
      }
    }
    amount = particles.length; //For easy tracking and looping
  }

  //Event Looooooooooooop
  function render(a) {
    requestAnimationFrame(render);

    let t0 = 0;
    if(!isTested) {
      t0 = performance.now();
    }
    
    ctx.clearRect(0, 0, element.width, element.height);
    for (var i = 0; i < amount; i++) {
      particles[i].render();
    }

    let t1 = 0;
    if(!isTested) {
      t1 = performance.now();
      if(t1-t0>15) {
        slowBrowser = true;
        browserIsSlow();
      }
      isTested = true;
    }
  };

  function browserIsSlow() {
    if(slowBrowser) {
      if(ww <= 320) {
        scaleToFit = 1;
      }
      element.width                    = ww/scaleToFit;
      element.height                   = wh/scaleToFit;
      element.style.transformOrigin    = '0 0'; //Scale from the Top left corner
      element.style.transform          = 'scale(' + scaleToFit + ')';
      radius                          = 170/(2*scaleToFit);
      ctx                             = element.getContext("2d");
      particles                       = [];
      amount                          = 0;

      //Conditions for Responsiveness
      if(ww <= 320)       { radius = 25/(scaleToFit*2);  }
      else if(ww <= 375)  { radius = 20/(scaleToFit*2);  } 
      else if(ww <= 768)  { radius = 60/(scaleToFit*2);  } 
      else if(ww <= 1024) { radius = 80/(scaleToFit*2);  }  
      else if(ww <= 1440) { radius = 100/(scaleToFit*2); }
      else if(ww <= 2048) { radius = 140/(scaleToFit*2); }

      // document.getElementById('slowBrowserMessage').style.display = "initial";

      initScene();
    }
  }

  //Initialize and Render
  window.addEventListener("resize",    initScene);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove);
  window.addEventListener("touchend",  onTouchEnd);
  initScene();
  if(configObject.autoAnimate) {
    particleJS.isAnimating = true;
    requestAnimationFrame(render);
  }

  particleJS.startAnimation = function() {
    if(!particleJS.isAnimating) {
      particleJS.isAnimating = true;
      requestAnimationFrame(render);
    }
  }
  

  return particleJS;
}
