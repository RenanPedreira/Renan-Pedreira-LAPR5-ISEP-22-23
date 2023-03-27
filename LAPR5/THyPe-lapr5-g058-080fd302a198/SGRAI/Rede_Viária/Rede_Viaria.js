import * as THREE from "three";
import Camera from "./Camera.js";
import Rede from "./Rede.js";
import assets from "./assets.js";
import Resources from "./Resources.js";
import Camiao from "./Camiao.js";

export default class RedeViaria {
    static instance;
    constructor() {

        this.redeLoaded=false;
        this.camiaoLoaded=false;
        this.deltaT = 0.05;

        if (RedeViaria.instance) {
            return RedeViaria.instance;
        }
        RedeViaria.instance = this;
        THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
        this.resources = new Resources(assets);

        // Cria a cena
        this.scene = new THREE.Scene();
        
        // Cria a camara
        this.camera = new Camera();

        // Cria a rede
        this.rede = new Rede();
        this.redeLoaded=true;

        //Cria o camião
        this.resources.on("ready", () => {
            this.camiao = new Camiao();
        });
        this.camiaoLoaded=true;

        // Set the game state
        this.gameRunning = false;

        //Comandos
        // key press
        document.addEventListener("keydown", event => this.keyChange(event, true));
        // key release
        document.addEventListener("keyup", event => this.keyChange(event, false));

        //Obtem os armazens da base de dados
        // let xmlHttpReq = new XMLHttpRequest();
        // xmlHttpReq.open("GET", "https://gestorarmazem.azurewebsites.net/api/Armazens", false);
        // xmlHttpReq.send(null);

        // //Array com os armazéns
        // this.armazens = JSON.parse(xmlHttpReq.responseText);

        //console.log(obj[0].latitude);
        // console.log(xmlHttpReq.responseText);
    }

    //Movimentação do camião
    keyChange(event, state) {

        if (["horizontal", "vertical", "distance", "zoom"].indexOf(event.target.id) < 0) {
            event.target.blur();
        }


        if (document.activeElement == document.body) {
            // Prevent the "Space" and "Arrow" keys from scrolling the document's content
            if (event.code == "Space" || event.code == "ArrowLeft" || event.code == "ArrowRight" || event.code == "ArrowDown" || event.code == "ArrowUp") {
                event.preventDefault();
            }

            if (event.code == "ArrowLeft") {
                this.camiao.actualCamiao.rotateY(Math.PI/18);
                this.camiao.actualCamiao.direction -= Math.PI/18;
            }

            else if (event.code == "ArrowRight") {
                this.camiao.actualCamiao.rotateY(-Math.PI/18);
                this.camiao.actualCamiao.direction += Math.PI/18;
            }

            if (event.code == "ArrowDown") {
                let coveredDistance = this.camiao.walkingSpeed * this.deltaT;
                const newPosition = new THREE.Vector3(-coveredDistance * Math.sin(this.camiao.actualCamiao.direction), -coveredDistance * Math.cos(this.camiao.actualCamiao.direction), 0.0).add(this.camiao.actualCamiao.position);
                
                //Pertença a uma rotunda
                this.belongsToNode(newPosition);

                //Pertença a um elemento de ligação
                this.belongsToElement(newPosition);

                //Pertença a uma estrada
                this.belongsToArcB(newPosition);
            }

            else if (event.code == "ArrowUp") {
                let coveredDistance = this.camiao.walkingSpeed * this.deltaT;
                const newPosition = new THREE.Vector3(coveredDistance * Math.sin(this.camiao.actualCamiao.direction), coveredDistance * Math.cos(this.camiao.actualCamiao.direction), 0.0).add(this.camiao.actualCamiao.position);
                
                //Pertença a uma rotunda
                this.belongsToNode(newPosition);

                //Pertença a um elemento de ligação
                this.belongsToElement(newPosition);

                //Pertença a uma estrada
                this.belongsToArcF(newPosition);
            }
        }
    }

    belongsToNode(newPosition){
        for(let i=0; i<this.rede.nodeList.length; i++){
            this.rede.nodeList[i].contain(this.camiao.actualCamiao, this.camiao.actualCamiao.position.x, this.camiao.actualCamiao.position.y, this.camiao.actualCamiao.position.z, newPosition.x, newPosition.y, newPosition.z);
        }
    }

    belongsToElement(newPosition){
        for(let i=0; i<this.rede.elementoList.length; i++){
            this.rede.elementoList[i].contain(this.camiao.actualCamiao, this.camiao.actualCamiao.position.x, this.camiao.actualCamiao.position.y, this.camiao.actualCamiao.position.z, newPosition.x, newPosition.y, newPosition.z);
        }
    }

    belongsToArcF(newPosition){
        for(let i=0; i<this.rede.arcoList.length; i++){
            this.rede.arcoList[i].containF(this.camiao.actualCamiao, this.camiao.actualCamiao.position.x, this.camiao.actualCamiao.position.y, this.camiao.actualCamiao.position.z, newPosition.x, newPosition.y, newPosition.z);
        }
    }

    belongsToArcB(newPosition){
        for(let i=0; i<this.rede.arcoList.length; i++){
            this.rede.arcoList[i].containB(this.camiao.actualCamiao, this.camiao.actualCamiao.position.x, this.camiao.actualCamiao.position.y, this.camiao.actualCamiao.position.z, newPosition.x, newPosition.y, newPosition.z);
        }
    }

    test(xi,yi,zi,xp,yp,zp){
        for(let i=0; i<this.rede.elementoList.length; i++){
            if(this.rede.arcoList[i].testa(this.camiao.actualCamiao, xi,yi,zi, xp,yp,zp)){
                return true;
            };
        }
        return false;
    }



    update() {
        if (this.gameRunning==false) {
            if (this.redeLoaded && this.camiaoLoaded) { // If all resources have been loaded
                
                //Adiciona a rede
                this.scene.add(this.rede);

                //Adiciona o camiao
                this.scene.add(this.camiao.actualCamiao);
                
                //Posição inicial do camião
                this.camiao.actualCamiao.position.set(this.rede.x, this.rede.y, this.rede.z);
                //this.camiao.actualCamiao.position.x=
                
                //Direção inicial do camião
                this.camiao.actualCamiao.direction = this.rede.initialDirection;

                // Create the clock
                this.clock = new THREE.Clock();

                // Start the game
                //console.log(this.camiao.position.x);
                this.gameRunning = true;
                }
        }

        else {
            this.camera.update();
            const deltaT = this.clock.getDelta();
        }
    }
}