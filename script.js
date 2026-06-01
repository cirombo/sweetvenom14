import * as THREE from "three";

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(
    0x000000,
    5,
    20
);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias:false
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(
    renderer.domElement
);

camera.position.set(
    0,
    1.7,
    5
);

const ambient = new THREE.AmbientLight(
    0x332211,
    0.5
);

scene.add(ambient);

const torchLight = new THREE.PointLight(
    0xff8844,
    4,
    12
);

torchLight.position.set(
    0,
    2,
    0
);

scene.add(torchLight);

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30,30),
    new THREE.MeshStandardMaterial({
        color:0x444444
    })
);

floor.rotation.x = -Math.PI/2;

scene.add(floor);

function wall(x,z,w,h,d,color){
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w,h,d),
        new THREE.MeshStandardMaterial({
            color
        })
    );

    mesh.position.set(
        x,
        h/2,
        z
    );

    scene.add(mesh);

    return mesh;
}

wall(0,-5,10,4,0.5,0x777777);
wall(-5,-10,0.5,4,10,0x777777);
wall(5,-10,0.5,4,10,0x777777);

const keys = {};

window.addEventListener("keydown",e=>{
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup",e=>{
    keys[e.key.toLowerCase()] = false;
});

function move(){

    let speed = 0.04;

    if(keys.shift){
        speed = 0.08;
    }

    if(keys.w){
        camera.position.z -= speed;
    }

    if(keys.s){
        camera.position.z += speed;
    }

    if(keys.a){
        camera.position.x -= speed;
    }

    if(keys.d){
        camera.position.x += speed;
    }
}

function animate(){

    requestAnimationFrame(
        animate
    );

    move();

    torchLight.intensity =
        3.5 +
        Math.sin(
            performance.now()*0.01
        ) * 0.5;

    renderer.render(
        scene,
        camera
    );
}

animate();

window.addEventListener(
    "resize",
    ()=>{
        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);
