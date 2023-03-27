import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";

export default class ElementoLigacao {
    constructor(xi, yi, zi, orientacao) {
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;

        const texture = new THREE.TextureLoader().load('./textures/connection_element.jpg');
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create the rectangle (elemento de ligação)
        let geometry = new THREE.PlaneGeometry( 4, 1 );
        let material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture });
        this.elementoLigacao = new THREE.Mesh( geometry, material );

        this.elementoLigacao.position.set(xi, yi, zi);
        this.elementoLigacao.rotation.set(0,0,orientacao);
        this.elementoLigacao.translateX(1);

        this.scene.add(this.elementoLigacao);
    }
}

