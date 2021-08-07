//Configuration Parameters
let canvas      = document.querySelector("#main_canvas");
let ww          = window.innerWidth;
let wh          = window.innerHeight;
let slowBrowser = false;
let isTested    = false;
let scaleToFit  = 3;
let ctx         = canvas.getContext("2d");
let particles   = [];
let amount      = 0;
let mouse       = {x: -9999, y: -9999};
let colors      = ["#695aa6","#444444", "#9370DB","#BA55D3"];
let text        = "< Aayush Sinha />";

let radius      = 150;
//Conditions for Responsiveness
if(ww <= 320)       { radius = 15;  }
else if(ww <= 375)  { radius = 20;  } 
else if(ww <= 768)  { radius = 40;  } 
else if(ww <= 1024) { radius = 50;  }  
else if(ww <= 1440) { radius = 75;  }
else if(ww <= 2048) { radius = 100; }

//Main Particle Class
class Particle {
    constructor(x, y) {
        this.x    = Math.random() * canvas.width;
        this.y    = Math.random() * canvas.height;
        this.vx   = (Math.random() - 0.5) * 10;
        this.vy   = (Math.random() - 0.5) * 10;
        let rand  = Math.random();
        this.dest = {x: x, y: y};
        
        //Condition for Responsiveness
        if (ww <= 425) {
            this.r = 1;
        } else if (ww <= 1024) {
            this.r = rand + 2;
        } else if (ww <= 2048) {
            this.r = (rand * 3) + 3;
        } else {
            this.r = (rand * 4) + 6;
        }

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

        this.color = colors[Math.floor(Math.random() * 4)];
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
    mouse.x = e.clientX;
    mouse.y = e.clientY;
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
    if(slowBrowser) {
        canvas.width = ww/scaleToFit;
        canvas.height = wh/scaleToFit;
    } else {
        canvas.width = ww;
        canvas.height = wh;
    }    

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Fill canas with text (Temporarily!)
    ctx.font = "bold "+(canvas.width/10)+"px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width/2, canvas.height/2);

    //Take snapshot and clear canvas
    let data  = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    //Let the fun games begin!
    particles = [];
    for(var i=0;i<canvas.width;i+=Math.round(canvas.width/150)){
        for(var j=0;j<wh;j+=Math.round(canvas.width/150)){
            if(data[ ((i + j*canvas.width)*4) + 3] > 150){
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
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        canvas.width                    = ww/scaleToFit;
        canvas.height                   = wh/scaleToFit;
        canvas.style.transformOrigin    = '0 0'; //Scale from the Top left corner
        canvas.style.transform          = 'scale(' + scaleToFit + ')';
        radius                          = 170/(2*scaleToFit);
        ctx                             = canvas.getContext("2d");
        particles                       = [];
        amount                          = 0;

        //Conditions for Responsiveness
        if(ww <= 320)       { radius = 25/(scaleToFit*2);  }
        else if(ww <= 375)  { radius = 20/(scaleToFit*2);  } 
        else if(ww <= 768)  { radius = 60/(scaleToFit*2);  } 
        else if(ww <= 1024) { radius = 80/(scaleToFit*2);  }  
        else if(ww <= 1440) { radius = 100/(scaleToFit*2); }
        else if(ww <= 2048) { radius = 140/(scaleToFit*2); }

        document.getElementById('slowBrowserMessage').style.display = "initial";

        initScene();
    }
}

//Initialize and Render
window.addEventListener("resize",    initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend",  onTouchEnd);
initScene();
requestAnimationFrame(render);