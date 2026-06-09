const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();

window.addEventListener("resize", resize);

const particles = [];

function heart(t){

    return{
        x:16*Math.pow(Math.sin(t),3),

        y:-(13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t))
    };

}

class Particle{

    constructor(){

        const t = Math.random()*Math.PI*2;
        const p = heart(t);

        this.x = canvas.width/2 + p.x*20;
        this.y = canvas.height/2 + p.y*20;

        this.vx = (Math.random()-0.5)*1;
        this.vy = (Math.random()-0.5)*1;

        this.life = 100;
        this.size = Math.random()*2+1;

    }

    update(){

        this.x += this.vx;
        this.y += this.vy;
        this.life--;

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle =
        `rgba(255,0,0,${this.life/100})`;

        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 20;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

function animate(){

    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for(let i=0;i<30;i++){
        particles.push(new Particle());
    }

    particles.forEach((p,index)=>{

        p.update();
        p.draw();

        if(p.life<=0){
            particles.splice(index,1);
        }

    });

    requestAnimationFrame(animate);

}

animate();