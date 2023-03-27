import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";

export default class No {
    constructor(x, y, z) {
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;

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
}