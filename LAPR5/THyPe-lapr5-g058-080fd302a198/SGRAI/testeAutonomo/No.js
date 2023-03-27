import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";

export default class No {
    constructor(x, y, z) {
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;

        this.radius=1.5;

        this.nodeX=x;
        this.nodeY=y;
        this.nodeZ=z;

        const texture = new THREE.TextureLoader().load('./textures/round_about.jpg');
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create the node (a circle)
        let geometry = new THREE.CircleGeometry(2, 40);
        let material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture });
        this.no = new THREE.Mesh(geometry, material);
        this.no.position.set(x, y, z);

        this.scene.add(this.no);
    }

    contain(actualCamiao, xi,yi,zi, xp,yp,zp){
        if(this.nodeX-this.radius<xp && xp<this.nodeX+this.radius
        && this.nodeY-this.radius<yp && yp<this.nodeY+this.radius
        && this.nodeZ-this.radius<zp && zp<this.nodeZ+this.radius){
            actualCamiao.position.set(xp,yp,zp);
        }
        else{
          actualCamiao.position.set(xi,yi,zi);  
        }  
    }
}