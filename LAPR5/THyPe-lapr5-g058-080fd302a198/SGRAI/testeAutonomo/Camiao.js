import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";

export default class Camiao {
    constructor(){
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;
        this.resources = this.redeViaria.resources;
        this.camiao = this.resources.items.camiao;
        this.actualCamiao = this.camiao.scene;

        this.actualCamiao.scale.set(1,1);
        this.actualCamiao.rotateX(Math.PI/2);
        this.actualCamiao.rotateY(Math.PI);

        this.eyeHeight= 0.8; // % of character height
        this.scale= new THREE.Vector3(0.1, 0.1, 0.1);
        this.walkingSpeed= 2.0;
        this.turningSpeed= 75.0; // Expressed in degrees / second
        this.runningFactor= 2.0; // Affects walking speed and turning speed
        this.keyCodes= { fixedView: "Digit1", firstPersonView: "Digit2", thirdPersonView: "Digit3", run: "KeyR", left: "ArrowLeft", right: "ArrowRight2", backward: "ArrowDown", forward: "ArrowUp"};
        this.falcringe = "ArrowRight";
    }
}