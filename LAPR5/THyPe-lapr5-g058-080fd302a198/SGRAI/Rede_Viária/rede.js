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

        this.x=11.0000;
        this.y=-11.0000;
        this.z=27.8100;

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
        [30.0000, 10.0000, 15.6250],
        [10.0000, 30.0000, 12.5000],
        [30.0000, 30.0000, 24.3750],
        [10.0000, 10.0000, 33.7500],

        [30.0000, -10.0000, 21.8750],
        [10.0000, -30.0000, 26.8750],
        [30.0000, -30.0000, 10.0000],
        [10.0000, -10.0000, 27.5000],

        [-30.0000, 10.0000, 25.0000],
        [-10.0000, 30.0000, 10.2500],
        [-30.0000, 30.0000, 20.6250],
        [-10.0000, 10.0000, 18.7500],

        [-30.0000, -10.0000, 28.1250],
        [-10.0000, -30.0000, 13.1250],
        [-30.0000, -30.0000, 10.0000],
        [-10.0000, -10.0000, 19.3750],

        [-10.0000, 0.0000, 19.2500]
    ];
// 1-3 2-4 1-4 2-3
    connections = [
    //  1   2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17    
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], //2
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3
        [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0], //4

        [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5
        [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], //6
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], //8

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], //9
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], //10
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], //11
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1], //12

        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0], //13
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0], //14
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0], //15
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1], //16

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]  //17
    ];

/*
connections = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //starting point
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
*/
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