import * as THREE from "three";

export default class Chao {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }

        this.object = new THREE.Group(); 

        const texture = new THREE.TextureLoader().load(this.textureUrl);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create a ground plane 
        const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
        const material = new THREE.MeshBasicMaterial({ color: 'green', map: texture });
        let chao = new THREE.Mesh(geometry, material);
        //chao.rotateX(-Math.PI / 2.0);

        this.object.add(chao);
    }
}