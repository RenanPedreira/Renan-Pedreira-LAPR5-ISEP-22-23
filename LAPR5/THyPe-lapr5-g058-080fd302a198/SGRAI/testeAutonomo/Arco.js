import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";

export default class Arco {
    constructor(xi, xj, yi, yj, zi, zj, comprimento, orientacao, inclinacao, projecao, desnivel) {
        THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
        this.redeViaria = new RedeViaria();
        this.scene = this.redeViaria.scene;

        this.comp=comprimento;
        this.ori=orientacao;
        this.inc=inclinacao;
        this.proj=projecao;
        this.des=desnivel;

        const texture = new THREE.TextureLoader().load('./textures/road.jpg');
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create the tilted rectangle (arco)
        //let largura = this.calcularLarguraAleatoria();
        let geometry = new THREE.PlaneGeometry(comprimento, 2);
        let material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture });
        this.arco = new THREE.Mesh(geometry, material);

        let y = (yi + yj) / 2;
        let x = (xi + xj) / 2;
        let z = (zi + zj) / 2;

        this.arco.position.set(x, y, z);

        this.arco.rotation.set(0, -inclinacao, orientacao, "XZY");
        this.scene.add(this.arco);

        //Eixo Z
        this.z1 = zi;
        this.z2 = zj;

//transparent:true, opacity:0

        // Create the hitbox
        let geometryHit = new THREE.PlaneGeometry( 1, 1 );
        let materialHit1 = new THREE.MeshBasicMaterial({ transparent:true, opacity:0 });
        let materialHit2 = new THREE.MeshBasicMaterial({ transparent:true, opacity:0 });

        //Origem
        this.hit1 = new THREE.Mesh( geometryHit, materialHit1 );
        this.hit1.position.set(xi, yi, zi+1);
        this.hit1.rotation.set(0, -inclinacao, orientacao, "XZY");
        this.hit1.translateX(3);
        this.hit1.translateY(-0.5);
        this.scene.add(this.hit1);
        
        //Destino
        this.hit2 = new THREE.Mesh( geometryHit, materialHit2 );
        this.hit2.position.set(xj, yj, zj+1);
        this.hit2.rotation.set(0, -inclinacao, orientacao, "XZY");
        this.hit2.translateX(-3);
        this.hit2.translateY(0);
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

        if(this.z1<this.z2){
            this.minz = this.z1;
            this.maxz = this.z2;
        }
        else{
            this.minz = this.z2;
            this.maxz = this.z1;
        }

        this.altura = this.maxz - this.minz;

    }

    containF(actualCamiao, xi,yi,zi, xp,yp,zp){
        if(this.minx<=xp && xp<=this.maxx && this.miny<=yp && yp<=this.maxy && this.minz<zp && zp<this.maxz+1){
            
            let diferencaX = xp - xi;
            let quadradoDiferencaX = Math.pow(diferencaX, 2);

            let diferencaY = yp - yi;
            let quadradoDiferencaY = Math.pow(diferencaY, 2);

            let soma = quadradoDiferencaX + quadradoDiferencaY;

            let deslocamento = Math.sqrt(soma);

            let newZ = (deslocamento * this.altura)/this.comp


            console.log("alura: "+newZ);
           

            actualCamiao.position.set(xp,yp,zp);
            if(this.hit1.position.z<this.hit2.position.z){
                actualCamiao.position.add(new THREE.Vector3(0.0, 0.0, newZ));
            }
            if(this.hit1.position.z>this.hit2.position.z){
                actualCamiao.position.add(new THREE.Vector3(0.0, 0.0, -newZ));
            }

        }
        else{
            actualCamiao.position.set(xi,yi,zi);
        }
    }

    containB(actualCamiao, xi,yi,zi, xp,yp,zp){
        if(this.minx<=xp && xp<=this.maxx && this.miny<=yp && yp<=this.maxy && this.minz<zp && zp<this.maxz+1){
            actualCamiao.rotation.set
            actualCamiao.position.set(xp,yp,zp);
            if(this.hit1.position.z<this.hit2.position.z){
                actualCamiao.position.add(new THREE.Vector3(0.0, 0.0, -0.0197));
            }
            if(this.hit1.position.z>this.hit2.position.z){
                actualCamiao.position.add(new THREE.Vector3(0.0, 0.0, 0.0197));
            }

        }
        else{
            actualCamiao.position.set(xi,yi,zi);
        }
    }

    tuto(actualCamiao, xi,yi,zi, xp,yp,zp){

        let xip = (xp-xi)*Math.cos(this.ori) + (yp-yi)*Math.sin(this.ori);
        let yip = ((yp-yi)*Math.cos(this.ori)) + ((xp-xi)*Math.sin(this.ori));

        
        if(3<xip && xip<3+this.proj && -1<=yip && yip<=1){

           // zp = zi + (xip-3)/this.proj*this.des + 1;
            actualCamiao.position.set(xp,zp,yp);
        }
 
        actualCamiao.position.set(xp,zp,-yp);
        zp = zi - (xip-3)/this.proj*this.des + 1;
        //actualCamiao.position.set(xip,yip,zp);
    }

}