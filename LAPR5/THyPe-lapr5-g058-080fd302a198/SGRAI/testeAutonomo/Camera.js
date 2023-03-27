import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";
import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;

        this.createPerspectiveCamera();
        this.setLights();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);

        //Definir fundo da cena
        let scene = this.scene;
        const loader = new THREE.TextureLoader();
        loader.load('./textures/ground.jpg' , function(texture){
            scene.background = texture;  
        });

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        const axesHelper = new THREE.AxesHelper(50);
        this.scene.add(axesHelper);

        this.perspectiveCamera.position.set(60, 40, 50);
    }

    setLights(){
        const directionalLight = new THREE.AmbientLight( 0x404040, 5); 
        this.scene.add( directionalLight );
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.renderer.domElement);
    } 

    update() {
        this.controls.update();
        this.renderer.render(this.scene, this.perspectiveCamera);
   }
}