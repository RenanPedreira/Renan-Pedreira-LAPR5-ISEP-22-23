import * as THREE from "three";
import Camera from "./Camera.js";
import Rede from "./Rede.js";
import assets from "./assets.js";
import Resources from "./Resources.js";

export default class RedeViaria {
    static instance;
    constructor() {

        if (RedeViaria.instance) {
            return RedeViaria.instance;
        }
        RedeViaria.instance = this;

        this.scene = new THREE.Scene();
        THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
        this.camera = new Camera();

        this.resources = new Resources(assets);
        this.rede = new Rede();



        let xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open("GET", "https://gestorarmazem.azurewebsites.net/api/Armazens", false);
        xmlHttpReq.send(null);

        //Array com os armazéns
        this.armazens = JSON.parse(xmlHttpReq.responseText);

        //console.log(obj[0].latitude);
        // console.log(xmlHttpReq.responseText);
    }

    update() {
        this.camera.update();
    }
}