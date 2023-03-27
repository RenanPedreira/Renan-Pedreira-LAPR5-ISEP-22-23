import * as THREE from "three";
import No from "./No.js";
import ElementoLigacao from "./Elemento_ligacao.js";
import Arco from "./Arco.js";
import RedeViaria from "./Rede_Viaria.js";
import { GLTFLoader } from "../three.js-master/examples/jsm/loaders/GLTFLoader.js"
import EventEmitter from "./Emitter.js";


export default class Rede extends EventEmitter{
    constructor() {
        super();
        this.redeViaria = new RedeViaria();
        this.resources = this.redeViaria.resources;
        this.scene = this.redeViaria.scene;

        this.initialDirection= 2*Math.PI; // Expressed in degrees
        // this.x=38.4080;
        // this.y=-21.8394;
        // this.z=22.18;

        this.x=31.0000;
        this.y=31.0000;
        this.z=5.3250;

        this.nodeList = [];
        this.elementoList = [];
        this.arcoList = [];

        this.createNos();
        this.createArcosAndElementosDeLigacao();

        /*
        this.armazens = this.redeViaria.armazens;
        this.calculateCoordinates();
        this.createNos();
        this.createArcosAndElementosDeLigacao();
        */
    }

     coordinates = [
        [10.0000, 10.0000, 2.0000],
        [30.0000, 10.0000, 5.0000],
        [10.0000, 30.0000, 8.0000],
        [30.0000, 30.0000, 5.0000],

        [37.4080, -22.8394, 12.5000],
        [-5.0756, -50.0000, 12.5000],
        [-33.4754, -21.2052, 12.5000],
        [24.3898, -24.9214, 12.5000],

        [49.9225, -7.4403, 12.5000],
        [8.7369, -43.0783, 12.5000],
        [-5.6955, -10.3708, 12.5000],
        [-2.4215, -45.1446, 12.5000],

        [11.0035, -10.6851, 12.5000],
        [-20.8446, -49.6622, 12.5000],
        [-0.9492, -22.5016, 12.5000],
        [47.4041, -9.6952, 12.5000],
        [21.0384, -27.5927, 12.5000]
    ];
/*
    coordinates = [
        [-50.0000, -42.6618, 15.6250],
        [50.0000, 30.6618, 12.5000],
        [50.0000, 50.0000, 12.5000],
        [26.6951, -36.7615, 34.3750],
        [22.8206, -19.4217, 43.7500],
        [37.4080, -22.8394, 21.8750],
        [-5.0756, -50.0000, 46.8750],
        [-5.0756, -50.0000, 12.5000],
        [-33.4754, -21.2052, 0.0000],
        [24.3898, -24.9214, 37.5000],
        [49.9225, -7.4403, 25.0000],
        [8.7369, -43.0783, 6.2500],
        [-5.6955, -10.3708, 40.6250],
        [-2.4215, -45.1446, 18.7500],
        [11.0035, -10.6851, 28.1250],
        [-20.8446, -49.6622, 3.1250],
        [-0.9492, -22.5016, 50.0000],
        [47.4041, -9.6952, 9.3750],
        [21.0384, -27.5927, 31.2500]
    ];
*/
/*
    connections = [
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0]
    ];
*/

connections = [
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //starting point
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

    calculateCoordinates(){
        this.coordinates = new Array(this.armazens.length);

        for (let i = 0; i < this.armazens.length; i++) {
            let x = (100/(8.7613 - 8.2451)) * (this.armazens[i].longitude - 8.2451) + (-50);
            let y = (100/(42.1115 - 40.8387)) * (this.armazens[i].latitude - 40.8387) + (-50);;
            let z = (50/800) * this.armazens[i].altitude;

            this.coordinates[i] = new Array(x, y, z);
        }
    }
    
    createNos() {
        for (let i = 0; i < this.coordinates.length; i++) {
            let node = new No(this.coordinates[i][0], this.coordinates[i][1], this.coordinates[i][2]+0.05);
            this.nodeList.push(node);
        }
    }

    createArcosAndElementosDeLigacao() {
        for (let i = 0; i < this.connections.length; i++) {
            for (let j = 0; j < this.connections.length; j++) {
                if (this.connections[i][j] == 1) {
                    let xi = this.coordinates[i][0];
                    let xj = this.coordinates[j][0];

                    let yi = this.coordinates[i][1];
                    let yj = this.coordinates[j][1];

                    let diferencaX = xj - xi;
                    let quadradoDiferencaX = Math.pow(diferencaX, 2);

                    let diferencaY = yj - yi;
                    let quadradoDiferencaY = Math.pow(diferencaY, 2);

                    let soma = quadradoDiferencaX + quadradoDiferencaY;

                    let zi = this.coordinates[i][2];
                    let zj = this.coordinates[j][2];

                    let desnivel = this.coordinates[j][2] - this.coordinates[i][2];

                    let comprimentoProjecao = Math.sqrt(soma) - 6;
                    let comprimento = Math.sqrt(Math.pow(comprimentoProjecao, 2) + (Math.pow(desnivel, 2)));

                    let orientacao = Math.atan2(diferencaY, diferencaX);
                    let inclinacao = Math.atan(desnivel / comprimentoProjecao);

                    let elem =new ElementoLigacao(xi, yi, zi, orientacao);
                    this.elementoList.push(elem);
                    let arc = new Arco(xi, xj, yi, yj, zi, zj, comprimento, orientacao, inclinacao, comprimentoProjecao, desnivel);
                    this.arcoList.push(arc);

                    let scene = this.scene;
                    const gltfLoader = new GLTFLoader();
                    let spotLight = new THREE.SpotLight(0xFFFFFF);
                   
                    gltfLoader.load('./models/armazem.glb', function (gltf) {
                        let model = gltf.scene;
                        model.position.set(xi, yi, zi+0.5);
                        model.scale.set(3,3);
                        model.rotateX(Math.PI/2);
                        spotLight.position.set(xi, yi, zi);
                        scene.add(gltf.scene);
                    })
                }
            }
        }
    } 
}