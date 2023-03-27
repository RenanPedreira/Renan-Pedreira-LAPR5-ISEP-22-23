import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";

export default class ElementoLigacao {
    constructor(xi, yi, zi, orientacao) {
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;
        this.ori = orientacao;

        const texture = new THREE.TextureLoader().load('./textures/connection_element.jpg');
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create the rectangle (elemento de ligação)
        let geometry = new THREE.PlaneGeometry( 4, 2 );
        let material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture });
        this.elementoLigacao = new THREE.Mesh( geometry, material );

        this.elementoLigacao.position.set(xi, yi, zi);
        this.elementoLigacao.rotation.set(0,0,orientacao);
        this.elementoLigacao.translateX(1);

        this.scene.add(this.elementoLigacao);

        // Create the hitbox
        let geometryHit = new THREE.PlaneGeometry( 1, 1 );
        let materialHit1 = new THREE.MeshBasicMaterial({ transparent:true, opacity:0 });
        let materialHit2 = new THREE.MeshBasicMaterial({ transparent:true, opacity:0 });

        //Origem
        this.hit1 = new THREE.Mesh( geometryHit, materialHit1 );
        this.hit1.position.set(this.elementoLigacao.position.x, this.elementoLigacao.position.y, zi+1);
        this.hit1.rotation.set(0,0,orientacao);
        this.hit1.translateX(-2);
        this.hit1.translateY(-0.5);

        this.scene.add(this.hit1);
        
        //Destino
        this.hit2 = new THREE.Mesh( geometryHit, materialHit2 );
        this.hit2.position.set(this.elementoLigacao.position.x, this.elementoLigacao.position.y, zi+1);
        this.hit2.rotation.set(0,0,orientacao);
        this.hit2.translateX(2);
        this.hit2.translateY(0.5);
        
        this.scene.add(this.hit2);


        if(this.hit1.position.x<this.hit2.position.x){
            this.minx = this.hit1.position.x;
            this.maxx = this.hit2.position.x;
        }
        else{
            this.minx = this.hit2.position.x;
            this.maxx = this.hit1.position.x;
        }


        if(this.hit1.position.y<this.hit2.position.y){
            this.miny = this.hit1.position.y;
            this.maxy = this.hit2.position.y;
        }
        else{
            this.miny = this.hit2.position.y;
            this.maxy = this.hit1.position.y;
        }
    }

    contain(actualCamiao, xi,yi,zi, xp,yp,zp){
        if(this.minx<xp && xp<this.maxx && this.miny<yp && yp<this.maxy){
            actualCamiao.position.set(xp,yp,this.elementoLigacao.position.z+0.315);
        }
        else{
            actualCamiao.position.set(xi,yi,zi);
        }
    }


}

