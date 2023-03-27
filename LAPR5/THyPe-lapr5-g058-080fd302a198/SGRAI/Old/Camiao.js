import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";

export default class Camiao {
    constructor(){
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;
        this.resources = this.redeViaria.resources;
        this.camiao = this.resources.items.camiao;
        this.actualCamiao = this.camiao.scene;

        this.actualCamiao.position.set(38.4080 ,-21.8394,22.18);
        this.actualCamiao.scale.set(1,1);
        this.actualCamiao.rotateX(Math.PI/2);
        
        this.scene.add(this.actualCamiao);

        //this.setModel();
    }
}