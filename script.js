const main = document.getElementById('main');
const ppImg = document.getElementById('pauseplay_img');

const collapsible = document.getElementsByClassName("collapsible");

const r1_slider = document.getElementById("r1_slider");
const r2_slider = document.getElementById("r2_slider");
const m1_slider = document.getElementById("m1_slider");
const m2_slider = document.getElementById("m2_slider");
const a1_slider = document.getElementById("a1_slider");
const a2_slider = document.getElementById("a2_slider");
const a1_v_slider = document.getElementById("a1_v_slider");
const a2_v_slider = document.getElementById("a2_v_slider");
const g_slider = document.getElementById("g_slider");
const resistance_slider = document.getElementById("resistance_slider");

const r1_value = document.getElementById("r1_value");
const r2_value = document.getElementById("r2_value");
const m1_value = document.getElementById("m1_value");
const m2_value = document.getElementById("m2_value");
const a1_value = document.getElementById("a1_value");
const a2_value = document.getElementById("a2_value");
const a1_v_value = document.getElementById("a1_v_value");
const a2_v_value = document.getElementById("a2_v_value");
const g_value = document.getElementById("g_value");
const resistance_value = document.getElementById("resistance_value");

const gravitag = document.getElementById("gravitag");

const track_checkbox = document.getElementById("track");

const secondo = document.getElementById("secondo");

let changes = false;
let track = false;

track_checkbox.addEventListener('change', function() {
    if(track_checkbox.checked) {
        track = true;
    } else {track = false}
})

let r1 = parseInt(r1_slider.value);
let r2 = parseInt(r2_slider.value);
let m1 = parseInt(m1_slider.value);
let m2 = parseInt(m2_slider.value);
let a1 = parseInt(90 - a1_slider.value) * Math.PI / 180;
let a2 = parseInt(90 - a2_slider.value) * Math.PI / 180;
let a1_v = -parseFloat(a1_v_slider.value) * Math.PI / 180;
let a2_v = -parseFloat(a2_v_slider.value) * Math.PI / 180;
let g = parseFloat(g_slider.value);
let resistance = 1 - parseFloat(resistance_slider.value) / 100;

let r1_default = 125;
let r2_default = 125;
let m1_default = 10;
let m2_default = 10;
let a1_default = 0;
let a2_default = 90;
let a1_v_default = 0;
let a2_v_default = 0;
let g_default = 1;
let resistance_default = 0;

function calcularAnchuraTexto(texto) {
    return anchuraTexto = context.measureText(texto).width;
}

var screen = {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
}

const body = document.getElementsByTagName('body')[0];
const track_div = document.getElementsByClassName('track')[0];
let canvas_dimension;
let min_screen_dimension = Math.min(screen.width, screen.height);
if (screen.width >= screen.height &&
    screen.width >= (0.15 * screen.height + 0.9 * screen.width))
    {
    canvas_dimension = min_screen_dimension * 0.85; // 0.8
    main.style.width = 'calc(90vw - var(--min-dimension) * 0.8)';
    main.style.height = 'calc(var(--min-dimension) * 0.85 / 10)';
} else {
    body.style.overflowY = 'visible';
    canvas_dimension = min_screen_dimension * 0.9;
    body.style.setProperty('--canvas-margin', ((screen.width - canvas_dimension)/2).toString() + 'px')
    document.getElementsByClassName('buttons')[0].style.marginLeft = ((screen.width - parseFloat(window.getComputedStyle(document.getElementsByClassName('buttons')[0]).getPropertyValue('width').slice(0,-2)))/2).toString() + 'px';
    main.style.width = 'calc(var(--min-dimension) * 0.925)'
    main.style.marginLeft = ((screen.width - parseFloat(window.getComputedStyle(main).getPropertyValue('width').slice(0,-2)))/2).toString() + 'px';
    main.style.marginTop = 'calc(var(--min-dimension) + .2vh)';
    track_div.style.marginTop = 'calc(var(--min-dimension) * 0.9 * (1 - 1/24))';
    track_div.style.marginLeft = ((screen.width - parseFloat(window.getComputedStyle(track_div).getPropertyValue('width').slice(0,-2)))/2).toString() + 'px';
    track_div.style.zIndex = '17';
}

/*
const apply = document.getElementsByClassName('config_banner')[0].children[1]
apply.addEventListener('mouseover', function() {
    console.log('in');
    apply.style.borderTop = '1px var(--bg-color) outset';
	apply.style.borderLeft = '1px var(--bg-color) outset';
	apply.style.borderRight = '1px var(--bg-color) inset';
	apply.style.borderBottom = '1px var(--bg-color) inset';
})
apply.addEventListener('mouseout', function() {
    apply.style.border = 'none';
})*/

let dak_mode = false;

// No me agrada CSS
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    dark_mode = true
} else {dark_mode = false}

r1_slider.max = Math.floor((canvas_dimension) / 4) - m1_slider.max / 6;
r2_slider.max = Math.floor((canvas_dimension) / 4) - m2_slider.max / 6;

document.addEventListener("DOMContentLoaded", function(){
    // Odio CSS
    for(let i = 0; i < collapsible.length; i++) {
        collapsible[i].addEventListener("click", function() {
            var content = this.nextElementSibling;
            if(this.classList.contains('inactive')) {
                this.classList.replace('inactive', 'active');
                this.style.borderRight = '4px var(--border-color) solid'
                this.style.borderLeft = '4px var(--border-color) solid'
                content.style.borderRight = '4px var(--border-color) solid'
                content.style.borderLeft = '4px var(--border-color) solid'
                this.style.borderBottom = 'none';
                if(i+1 == collapsible.length) {
                    content.style.borderBottomRightRadius = 'var(--border-radius)';
                    content.style.borderBottomLeftRadius = 'var(--border-radius)';
                }
                if(i>0 && collapsible[i-1].classList.contains('active')) {
                    this.style.borderTop = 'none'
                } else {this.style.borderTop = '4px var(--border-color) solid'}
                if(i+1 == collapsible.length || collapsible[i+1].classList.contains('inactive')) {
                    content.style.borderBottom = '4px var(--border-color) solid';
                }
            } else {
                this.classList.replace('active', 'inactive');
                content.style.borderBottom = 'none';
                if(i+1 == collapsible.length || collapsible[i+1].classList.contains('inactive')) {
                  this.style.borderBottom = '4px var(--border-color) solid';
                }
                if(i > 0 && collapsible[i-1].classList.contains('active')) {
                    collapsible[i-1].nextElementSibling.style.borderBottom = '4px var(--border-color) solid';
                }
                if(i-1 < collapsible.lenght && collapsible[i+1].classList.contains('active')) {
                    collapsible[i+1].nextElementSibling.style.borderTop = '4px var(--border-color) solid';
                }
            }

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight * 2 + '%';
            }
        })

        collapsible[i].addEventListener('mouseenter', function() {
            this.style.borderRight = '4px var(--border-color) solid'
            this.style.borderLeft = '4px var(--border-color) solid'
            var content = this.nextElementSibling;
            if (i>0 && collapsible[i-1].classList.contains('active') && collapsible[i-1].nextElementSibling.style.borderBottom !== 'none') {
                collapsible[i-1].nextElementSibling.style.borderBottom = '4px var(--border-color) solid';
                this.style.borderTop = 'none';
            }
            if (i==0 || collapsible[i-1].classList.contains('inactive')
            || (collapsible[i-1].classList.contains('active') && collapsible[i-1].nextElementSibling.style.borderBottom == 'none')) {
                this.style.borderTop = '4px var(--border-color) solid'
            }
            if ((i+1 == collapsible.length || collapsible[i+1].classList.contains('inactive')) && this.classList.contains('inactive')) {
                this.style.borderBottom = '4px var(--border-color) solid';
            }
        });

        collapsible[i].addEventListener('mouseleave', function() {
            if (this.classList.contains('inactive')) {
                this.style.border = '1px var(--border-color) solid';
            }
        })
    };

    collapsible[4].addEventListener('click', function() {
        gravitag.classList.toggle('hidden');
    });

    r1_slider.addEventListener('mouseover', function() {
        r1_value.classList.add('bright');
        r1_value.classList.remove('dark');
    })

    r2_slider.addEventListener('mouseover', function() {
        r2_value.classList.add('bright');
        r2_value.classList.remove('dark');
    })

    m1_slider.addEventListener('mouseover', function() {
        m1_value.classList.add('bright');
        m1_value.classList.remove('dark');
    })

    m2_slider.addEventListener('mouseover', function() {
        m2_value.classList.add('bright');
        m2_value.classList.remove('dark');
    })

    a1_slider.addEventListener('mouseover', function() {
        a1_value.classList.add('bright');
        a1_value.classList.remove('dark');
    })

    a2_slider.addEventListener('mouseover', function() {
        a2_value.classList.add('bright');
        a2_value.classList.remove('dark');
    })
    
    a1_v_slider.addEventListener('mouseover', function() {
        a1_v_value.classList.add('bright');
        a1_v_value.classList.remove('dark');
    })
    
    a2_v_slider.addEventListener('mouseover', function() {
        a2_v_value.classList.add('bright');
        a2_v_value.classList.remove('dark');
    })
    
    g_slider.addEventListener('mouseover', function() {
        g_value.classList.add('bright');
        g_value.classList.remove('dark');
    })
    
    resistance_slider.addEventListener('mouseover', function() {
        resistance_value.classList.add('bright');
        resistance_value.classList.remove('dark');
    })
    

    r1_slider.addEventListener('mouseleave', function() {
        r1_value.classList.remove('bright');
        r1_value.classList.remove('dark');
    })

    r2_slider.addEventListener('mouseleave', function() {
        r2_value.classList.remove('bright');
        r2_value.classList.remove('dark');
    })

    m1_slider.addEventListener('mouseleave', function() {
        m1_value.classList.remove('bright');
        m1_value.classList.remove('dark');
    })

    m2_slider.addEventListener('mouseleave', function() {
        m2_value.classList.remove('bright');
        m2_value.classList.remove('dark');
    })

    a1_slider.addEventListener('mouseleave', function() {
        a1_value.classList.remove('bright');
        a1_value.classList.remove('dark');
    })

    a2_slider.addEventListener('mouseleave', function() {
        a2_value.classList.remove('bright');
        a2_value.classList.remove('dark');
    })
    
    a1_v_slider.addEventListener('mouseleave', function() {
        a1_v_value.classList.remove('bright');
        a1_v_value.classList.remove('dark');
    })
    
    a2_v_slider.addEventListener('mouseleave', function() {
        a2_v_value.classList.remove('bright');
        a2_v_value.classList.remove('dark');
    })
    
    g_slider.addEventListener('mouseleave', function() {
        g_value.classList.remove('bright');
        g_value.classList.remove('dark');
    })
    
    resistance_slider.addEventListener('mouseleave', function() {
        resistance_value.classList.remove('bright');
        resistance_value.classList.remove('dark');
    })
    

    r1_slider.addEventListener('mousedown', function() {
        r1_value.classList.remove('bright');
        r1_value.classList.add('dark');
    })

    r2_slider.addEventListener('mousedown', function() {
        r2_value.classList.remove('bright');
        r2_value.classList.add('dark');
    })

    m1_slider.addEventListener('mousedown', function() {
        m1_value.classList.remove('bright');
        m1_value.classList.add('dark');
    })

    m2_slider.addEventListener('mousedown', function() {
        m2_value.classList.remove('bright');
        m2_value.classList.add('dark');
    })

    a1_slider.addEventListener('mousedown', function() {
        a1_value.classList.remove('bright');
        a1_value.classList.add('dark');
    })

    a2_slider.addEventListener('mousedown', function() {
        a2_value.classList.remove('bright');
        a2_value.classList.add('dark');
    })
    
    a1_v_slider.addEventListener('mousedown', function() {
        a1_v_value.classList.remove('bright');
        a1_v_value.classList.add('dark');
    })
    
    a2_v_slider.addEventListener('mousedown', function() {
        a2_v_value.classList.remove('bright');
        a2_v_value.classList.add('dark');
    })
    
    g_slider.addEventListener('mousedown', function() {
        g_value.classList.remove('bright');
        g_value.classList.add('dark');
    })
    
    resistance_slider.addEventListener('mousedown', function() {
        resistance_value.classList.remove('bright');
        resistance_value.classList.add('dark');
    })
    
    
    r1_slider.addEventListener('mouseup', function() {
        r1_value.classList.add('bright');
        r1_value.classList.remove('dark');
    })

    r2_slider.addEventListener('mouseup', function() {
        r2_value.classList.add('bright');
        r2_value.classList.remove('dark');
    })

    m1_slider.addEventListener('mouseup', function() {
        m1_value.classList.add('bright');
        m1_value.classList.remove('dark');
    })

    m2_slider.addEventListener('mouseup', function() {
        m2_value.classList.add('bright');
        m2_value.classList.remove('dark');
    })

    a1_slider.addEventListener('mouseup', function() {
        a1_value.classList.add('bright');
        a1_value.classList.remove('dark');
    })

    a2_slider.addEventListener('mouseup', function() {
        a2_value.classList.add('bright');
        a2_value.classList.remove('dark');
    })
    
    a1_v_slider.addEventListener('mouseup', function() {
        a1_v_value.classList.add('bright');
        a1_v_value.classList.remove('dark');
    })
    
    a2_v_slider.addEventListener('mouseup', function() {
        a2_v_value.classList.add('bright');
        a2_v_value.classList.remove('dark');
    })
    
    g_slider.addEventListener('mouseup', function() {
        g_value.classList.add('bright');
        g_value.classList.remove('dark');
    })
    
    resistance_slider.addEventListener('mouseup', function() {
        resistance_value.classList.add('bright');
        resistance_value.classList.remove('dark');
    })

    const updateValuePosition = (slider, value) => {
        const sliderWidth = slider.offsetWidth;
        const valueWidth = value.offsetWidth;
        const thumbWidth = parseFloat(getComputedStyle(slider).getPropertyValue('--thumb-width')) || 0.5;
        const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100; 

        value.style.marginLeft = `${percentage - (valueWidth / sliderWidth) * percentage + thumbWidth * 0.5}%`;
        value.innerHTML = slider.value
    };

    updateValuePosition(r1_slider, r1_value);
    updateValuePosition(r2_slider, r2_value);
    updateValuePosition(m1_slider, m1_value);
    updateValuePosition(m2_slider, m2_value);
    updateValuePosition(a1_slider, a1_value);
    updateValuePosition(a2_slider, a2_value);
    updateValuePosition(a1_v_slider, a1_v_value);
    updateValuePosition(a2_v_slider, a2_v_value);
    updateValuePosition(g_slider, g_value);
    updateValuePosition(resistance_slider, resistance_value);

    r1_slider.addEventListener("input", function(){
        updateValuePosition(r1_slider, r1_value);
        changes = true;
    });
    r2_slider.addEventListener("input", function(){
        updateValuePosition(r2_slider, r2_value);
        changes = true;
    });
    m1_slider.addEventListener("input", function(){
        updateValuePosition(m1_slider, m1_value);
        changes = true;
    });
    m2_slider.addEventListener("input", function(){
        updateValuePosition(m2_slider, m2_value);
        changes = true;
    });
    a1_slider.addEventListener("input", function(){
        updateValuePosition(a1_slider, a1_value);
        changes = true;
    });
    a2_slider.addEventListener("input", function(){
        updateValuePosition(a2_slider, a2_value);
        changes = true;
    });
    a1_v_slider.addEventListener("input", function(){
        updateValuePosition(a1_v_slider, a1_v_value);
        changes = true;
    });
    a2_v_slider.addEventListener("input", function(){
        updateValuePosition(a2_v_slider, a2_v_value);
        changes = true;
    });
    g_slider.addEventListener("input", function(){
        updateValuePosition(g_slider, g_value);
        changes = true;
    });
    resistance_slider.addEventListener("input", function(){
        updateValuePosition(resistance_slider, resistance_value);
        changes = true;
    });
});

function updateValues() {
    r1 = parseInt(r1_slider.value);
    r2 = parseInt(r2_slider.value);
    m1 = parseInt(m1_slider.value);
    m2 = parseInt(m2_slider.value);
    a1 = parseInt(90 - a1_slider.value) * Math.PI / 180;
    a2 = parseInt(90 - a2_slider.value) * Math.PI / 180;
    a1_v = -parseFloat(a1_v_slider.value) * Math.PI / 180;
    a2_v = -parseFloat(a2_v_slider.value) * Math.PI / 180;
    g = parseInt(g_slider.value);
    resistance = 1 - parseFloat(resistance_slider.value / 100);
}

let px2, py2 = -1;
let cx, cy;

let buffer;
let play = true;

$('.pauseplay_btn').click(PausePlay)
$('.restart_btn').click(Restart)
/*
$('.addcanvas_btn').click(AddCanvas)
$('.config_btn').click(DisplayConfig)
$('.exitconfig_btn').click(ExitConfig)
*/
$('.apply_btn').click(Apply)


function PausePlay() {
    if (play) {
        ppImg.src = 'play.png';
    } else { ppImg.src = 'pause.png' }
    play = !play;
}
function Restart() {
    setup();
    updateValues();
    px2, py2 = undefined;
    frameCount = 0;
}
/*
function AddCanvas() {
    secondo.innerHTML = `
    <div class="buttons">
		<button class="pauseplay_btn"><img id="pauseplay_img" src="pause.png" alt=""></button>
        <button class="restart_btn"><img id="restart_img" src="restart.png" alt=""></button>
		<button class="config_btn"><img id="config_img" src="config.png" alt=""></button>
		<button class="delete_btn"><img id="delete_img" src="x.png" alt=""></button>
	</div>
    <h1>Aún no functiona el modo doble</h1>
	<div class="hidden" id="main2">
	<div class="config_banner">
		<h3>Configuración</h3>
		<button class="exitconfig_btn"><img id="exitconfig_img" src="x.png" alt=""></button>
	</div>
	<button class="collapsible inactive" id="firstcoll2"> Longitudes [m] </button>
		<div class="content">
			<div class="sliders">
				<div id="r1_value">50</div>
				<input type="range" id="r1_slider" value="125" min="5" max="150">
				
				<div id="r2_value" class="secondo">50</div>
				<input type="range" id="r2_slider" class="secondo" value="125" min="5" max="150">
			</div>
			<div class="literallysomespace"></div>		
		</div>

	<button class="collapsible inactive inactive"> Masas [kg] </button>
		<div class="content">
			<div class="sliders">
				<div id="m1_value">50</div>
			<input type="range" id="m1_slider" value="10" min="1" max="100">

			<div id="m2_value" class="secondo">50</div>
			<input type="range" id="m2_slider" class="secondo" value="10" min="1" max="100">
			</div>
			<div class="literallysomespace"></div>		
		</div>
	
	<button class="collapsible inactive"> Ángulos iniciales <h6>(en sentido horario)</h6></button>
		<div class="content">
			<div class="sliders">
				<div id="a1_value">50</div>
			<input type="range" id="a1_slider" value="90" min="0" max="360">

			<div id="a2_value" class="secondo">50</div>
			<input type="range" id="a2_slider" class="secondo" value="90" min="0" max="360">
			</div>
			<div class="literallysomespace"></div>		
		</div>
	
	<button class="collapsible inactive"> Velocidades angulares iniciales <h6>(positivo = rotación horaria)</h6></button>
		<div class="content" id="firstcontent">
			<div class="sliders">
				<div id="a1_v_value">50</div>
			<input type="range" id="a1_v_slider" value="0" min="-10" max="10" step="0.1">

			<div id="a2_v_value" class="secondo">50</div>
			<input type="range" id="a2_v_slider" class="secondo" value="0" min="-10" max="10" step="0.1">
			</div>
			<div class="literallysomespace"></div>		
		</div>
	
	<button class="collapsible inactive" id="lastcoll2"> Fuerzas externas </button>
		<div class="content">
			<div class="sliders">
				<h4>Gravedad <h5 id="gravitag" class="hidden">(negativo es antigravedad)</h5></h4>
				<div id="g_value">50</div>
				<input type="range" id="g_slider" value="1" min="-10" max="10" step="0.1">
				
				<h4>Resistencia</h4>
				<div id="resistance_value" class="secondo">50</div>
				<input type="range" id="resistance_slider" class="secondo" value="0" min="0" max="1" step="0.001">				
			</div>
			<div class="literallysomespace"></div>
		</div>
	</div>
    <canvas id="canvas2"></canvas>
	<div class="track">
		<input type="checkbox" id="track2">
		<h2>Mostrar estela</h2>
	</div>
    `
    document.getElementById('addcanvas_img').style.cursor = 'not-allowed';
    $('.delete_btn').click(DeleteCanvas)
}
function DisplayConfig() {
    play = false;
    ppImg.src = 'play.png';
    main.classList.remove('hidden');

    // No está funcionando el addEventListener
    window.addEventListener('keydown', (event) => {
        if (event.kew == 'Escape') {
            ExitConfig();
        }
    })
}
function ExitConfig() {
    console.log('exitconfig');
    play = true;
    ppImg.src = 'pause.png';
    main.classList.add('hidden');
    if (changes) {
        Restart();
    }
    changes = false;
}
*/
function Apply() {
    play = true;
    ppImg.src = 'pause.png';
    if (changes) {
        Restart();
    }
    changes = false;
}
function DeleteCanvas() {
    console.log('delete')
    secondo.innerHTML = '';
    document.getElementById('addcanvas_img').style.cursor = '';
}

let contrastColor;
let pendulum1Color;
let pendulum2Color;

if (dark_mode) {
    contrastColor = 255;
    pendulum1Color = '#439BFF';
    pendulum2Color = '#00EABE';
}   else {
    contrastColor = 25
    pendulum1Color = '#B3030C';
    pendulum2Color = '#89296F';
}

function setup() {
    const canvas = createCanvas(canvas_dimension, canvas_dimension);
    pixelDensity(1);
    cx = width / 2;
    cy = height / 2;
    buffer = createGraphics(width, height);
    if (dark_mode) {
        buffer.background(50);
    } else {buffer.background(205)}
  
    buffer.translate(cx, cy);
}

function draw() {
    imageMode(CORNER);
    image(buffer, 0, 0, width, height);

    let num1 = -g * (2 * m1 + m2) * sin(a1);
    let num2 = -m2 * g * sin(a1 - 2 * a2);
    let num3 = -2 * sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    a1_a = (num1 + num2 + num3 * num4) / den;
    
    num1 = 2 * sin(a1 - a2);
    num2 = a1_v * a1_v * r1 * (m1 + m2);
    num3 = g * (m1 + m2) * cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    a2_a = (num1 * (num2 + num3 + num4)) / den;

    translate(cx, cy);
    strokeWeight(2);

    let x1 = r1 * sin(a1);
    let y1 = r1 * cos(a1);
    let x2 = x1 + r2 * sin(a2);
    let y2 = y1 + r2 * cos(a2);

    stroke(pendulum1Color);
    line(0, 0, x1, y1);
    fill(pendulum1Color);
    ellipse(x1, y1, m1, m1);

    stroke(pendulum2Color);
    line(x1, y1, x2, y2);
    fill(pendulum2Color);
    ellipse(x2, y2, m2, m2);

    if (play) {
        a1_v += a1_a;
        a2_v += a2_a;
        a1 += a1_v;
        a2 += a2_v;

        a1_v *= resistance;
        a2_v *= resistance;

        if(!(Number.isFinite(a1) || Number.isFinite(a2) || Number.isFinite(a1_v) || Number.isFinite(a2_v))) {
            alert('El péndulo alcanzó velocidades infinitas, se le recomienda ajustar los valores para evitar que esto ocurra.')
            Restart();
            play = false;
            ppImg.src = 'play.png';
        }


        // I'd like to add a fade out effect for the buffer's  track.
        if (track) {
            buffer.stroke(contrastColor, contrastColor, contrastColor, 75);
            if (frameCount > 1) {
              buffer.line(px2, py2, x2, y2);
            }
        }

        px2 = x2;
        py2 = y2;
    }
}

/* Cosas por agregar

Dar la funcionalidad de agrear una simulación con el botón +.

Que los collapsibles se cierren al salir de la ventana de configuración.

Descubrir como reestablecer los valores de los sliders
(para cuando la simulación se crashee por velocidad infinita
y para agregar un botón a la ventana de configuración
para volver a los valores predeterminados (aún no sé que imagen)

Colocar péndulo 1 y péndulo 2 antes de los sliders.

Rayas para señalizar el inicio, la mitad y el final del slider.
No me termina de convencer esta idea.

Sistema deguardado basado en la creación elementos HTML
con la información en forma de texto*/