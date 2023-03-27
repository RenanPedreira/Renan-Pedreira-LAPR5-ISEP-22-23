import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";

export default class Arco {
    constructor(xi, xj, yi, yj, zi, zj, comprimento, orientacao, inclinacao) {
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;

        const texture = new THREE.TextureLoader().load('./textures/road.jpg');
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create the tilted rectangle (arco)
        let largura = this.calcularLarguraAleatoria();
        let geometry = new THREE.PlaneGeometry(comprimento, 1);
        let material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture });
        this.arco = new THREE.Mesh(geometry, material);

        let y = (yi + yj) / 2;
        let x = (xi + xj) / 2;
        let z = (zi + zj) / 2;

        this.arco.position.set(x, y, z);

        this.arco.rotation.set(0, -inclinacao, orientacao, "XZY");
        this.scene.add(this.arco);
    }

    //A largura do arco é arbitrária e deverá variar entre 1 e 8
    calcularLarguraAleatoria() {
        return Math.floor(Math.random() * (8)) + 1
    }
}