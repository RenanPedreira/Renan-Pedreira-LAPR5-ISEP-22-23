import * as THREE from "three";
import Camera from "./Camera.js";
import Rede from "./Rede.js";
import assets from "./assets.js";
import Resources from "./Resources.js";
import Camiao from "./Camiao.js";
import No from "./No.js";
import Arco from "./Arco.js";
import ElementoLigacao from "./Elemento_ligacao.js";

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

        //K_BERMA = constante para auxiliar o cálculo da distância do camião à berma
        this.K_BERMA = 0.25;
        //Percurso a percorrer, adicionar nós
        this.ni = this.rede.nodeList[3];
        this.nj = this.rede.nodeList[2];
        this.nk = this.rede.nodeList[0];
        
        this.aij = this.rede.arcoList[7];
        this.ajk = this.rede.arcoList[4];
        
        this.ei = this.rede.elementoList[7];
        this.ej = this.rede.elementoList[5];
        this.ek = this.rede.elementoList[4];

        //wij = largura do arco PRECISO ALTERAR PARA OS VALORES CORRETOS
        this.wij = 1; 
        this.wjk = 1; 
        //bij = distância do camião à berma direita
        this.bij = this.K_BERMA * this.wij;
        this.bjk = this.K_BERMA * this.wjk;
        //wi = largura do nó - raio?
        this.wi = this.ni.radius;
        //bi = distância do camião à periferia do círculo
        this.bi = this.K_BERMA * this.wi;
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

    movimentoA(){ // Supõe-se que aij = aji, caso contrário, necessário corrigir
        //alfajk = ângulo
        let alfajk = this.ajk.ori;
        //alfaji = ângulo
        let alfaji = this.aij.ori;
        
        //rj = raio do nó
        let rj = this.nj.radius;
        //bj = distância do camião à periferia do círculo ARBITRARIO
        let bj = this.K_BERMA * (rj / 3);
        //raioF = raio da circunferência, cuja parte da periferia se pretende percorrer ARBITRARIO
        let raioB = bj / 3;
        //hip = hipotenusa do triângulo (fig. 4 do tutorial)
        let hip = rj - bj + raioB;
        //catt = cateto transversal do triângulo (fig. 4 do tutorial)
        let catt = this.wjk / 2 - this.bjk + raioB;
        //tetaij = ângulo
        let tetajk = Math.acos(catt / hip);

        //raioF = raio da circunferência, cuja parte da periferia se pretende percorrer ARBITRARIO
        let raioF = bj / 3;
        //hip = hipotenusa do triângulo (fig. 4 do tutorial)
        let hip1 = rj - bj + raioF;
        //catt = cateto transversal do triângulo (fig. 4 do tutorial)
        let catt1 = this.wij / 2 - this.bij + raioF;
        //tetaij = ângulo
        let tetaij = Math.acos(catt1 / hip1);

        //fiijk = ângulo
        let fiijk = alfajk - alfaji + tetaij + tetajk;

        //dijk = comprimento do arco
        let dijk = (rj - bj) * fiijk;
        if(dijk < 0){
            dijk = dijk * -1;
        }

        //velA = velocidade máxima no movimento elementar A
        let velA = this.camiao.walkingSpeed; 
        //n = número de fotogramas que compõe a animação do movimento elementar
        let n = Math.ceil(dijk / velA);
        //vela = velocidade angular
        let vela = fiijk * n;
        if(vela < 0){
            vela = vela * -1;
        }
        //velh = velocidade horizontal
        let velh = 2 * (rj - bj) * Math.sin(fiijk / n / 2);
        if(velh < 0){
            velh = velh * -1;
        }
        //velv = velocidade vertical
        let velv = 0;
        
        console.log(vela);
        console.log(velh);
        //ANIMAÇÃO DO MOVIMENTO
        for(let i = 0; i < n; i++){
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            this.dir = this.dir + vela;
            this.xp = this.xp + velh * Math.cos(this.dir);
            this.yp = this.yp + velh * Math.sin(this.dir);
            this.zp = this.zp + velv;
            this.camiao.actualCamiao.position.set(this.xp, this.yp, this.zp);
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            console.log("------");
        }
    }


    movimentoB(){
        //PREPARAÇÃO DO MOVIMENTO
        //rj = raio do nó
        let rj = this.nj.radius;
        //bj = distância do camião à periferia do círculo ARBITRARIO
        let bj = this.K_BERMA * (rj / 3);
        //raioF = raio da circunferência, cuja parte da periferia se pretende percorrer ARBITRARIO
        let raioB = bj / 3;
        //hip = hipotenusa do triângulo (fig. 4 do tutorial)
        let hip = rj - bj + raioB;
        //catt = cateto transversal do triângulo (fig. 4 do tutorial)
        let catt = this.wjk / 2 - this.bjk + raioB;
        //tetaij = ângulo
        let tetajk = Math.acos(catt / hip);
        //cij = comprimento do arco a percorrer
        let cjk = raioB * tetajk;

        //velB = velocidade máxima no movimento elementar B
        let velB = this.camiao.walkingSpeed; 
        //n = número de fotogramas que compõe a animação do movimento elementar
        let n = Math.ceil(cjk / velB);
        //vela = velocidade angular
        let vela = - tetajk * n;
        //velh = velocidade horizontal
        let velh = 2 * raioB * Math.sin(tetajk / n / 2);
        //velv = velocidade vertical
        let velv = 0;

        //ANIMAÇÃO DO MOVIMENTO
        for(let i = 0; i < n; i++){
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            this.dir = this.dir + vela;
            this.xp = this.xp + velh * Math.cos(this.dir);
            this.yp = this.yp + velh * Math.sin(this.dir);
            this.zp = this.zp + velv;
            this.camiao.actualCamiao.position.set(this.xp, this.yp, this.zp);
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            console.log("------");
        }
    }

    movimentoC(){
        //PREPARAÇÃO DO MOVIMENTO
        //rj = raio do nó
        let rj = this.nj.radius;
        //bj = distância do camião à periferia do círculo ARBITRARIO
        let bj = this.K_BERMA * (rj / 3);
        //raioF = raio da circunferência, cuja parte da periferia se pretende percorrer ARBITRARIO
        let raioB = bj / 3;
        //hip = hipotenusa do triângulo (fig. 4 do tutorial)
        let hip = rj - bj + raioB;
        //catt = cateto transversal do triângulo (fig. 4 do tutorial)
        let catt = this.wjk / 2 - this.bjk + raioB;
        //catl = cateto longitudinal do triângulo (fig. 4 do tutorial)
        let catl = Math.sqrt(hip * hip - catt * catt);
        //sj = comprimento do elemento de ligação - 2 ou 4?
        let sj = 2;
        //lij = comprimento do percurso a percorrer
        let ljk = sj - catl;

        //velC = velocidade máxima no movimento elementar C
        let velC = this.camiao.walkingSpeed; 
        //n = número de fotogramas que compõe a animação do movimento elementar
        let n = Math.ceil(ljk / velC);
        //vela = velocidade angular
        let vela = 0;
        //velh = velocidade horizontal
        let velh = ljk / n;
        //velv = velocidade vertical
        let velv = 0;

        //ANIMAÇÃO DO MOVIMENTO
        for(let i = 0; i < n; i++){
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            this.dir = this.dir + vela;
            this.xp = this.xp + velh * Math.cos(this.dir);
            this.yp = this.yp + velh * Math.sin(this.dir);
            this.zp = this.zp + velv;
            this.camiao.actualCamiao.position.set(this.xp, this.yp, this.zp);
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            console.log("------");
        }
    }

    movimentoD(){
        //PREPARAÇÃO DO MOVIMENTO
        //sij = comprimento do arco
        let sij = this.aij.comp;
        //velD = velocidade máxima no movimento elementar D
        let velD = this.camiao.walkingSpeed; 
        //n = número de fotogramas que compõe a animação do movimento elementar
        let n = Math.ceil(sij / velD);
        //vela = velocidade angular
        let vela = 0;
        //pij = comprimento da projeção da rampa(arco) no plano OXY
        let pij = this.aij.proj;
        //velh = velocidade horizontal
        let velh = pij / n;
        //hij = desnível da rampa(arco)
        let hij = this.aij.des;
        //velv = velocidade vertical
        let velv = hij / n;

        //ANIMAÇÃO DO MOVIMENTO
        for(let i = 0; i < n; i++){
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            this.dir = this.dir + vela;
            this.xp = this.xp + velh * Math.cos(this.dir);
            this.yp = this.yp + velh * Math.sin(this.dir);
            this.zp = this.zp + velv;
            this.camiao.actualCamiao.position.set(this.xp, this.yp, this.zp);
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            console.log("------");
        }
    }

    movimentoE(){
        //PREPARAÇÃO DO MOVIMENTO
        //rj = raio do nó
        let rj = this.nj.radius;
        //bj = distância do camião à periferia do círculo ARBITRARIO
        let bj = this.K_BERMA * (rj / 3);
        //raioF = raio da circunferência, cuja parte da periferia se pretende percorrer ARBITRARIO
        let raioF = bj / 3;
        //hip = hipotenusa do triângulo (fig. 4 do tutorial)
        let hip = rj - bj + raioF;
        //catt = cateto transversal do triângulo (fig. 4 do tutorial)
        let catt = this.wij / 2 - this.bij + raioF;
        //catl = cateto longitudinal do triângulo (fig. 4 do tutorial)
        let catl = Math.sqrt(hip * hip - catt * catt);
        //sj = comprimento do elemento de ligação - 2 ou 4?
        let sj = 2;
        //lij = comprimento do percurso a percorrer
        let lij = sj - catl;

        //velE = velocidade máxima no movimento elementar E
        let velE = this.camiao.walkingSpeed; 
        //n = número de fotogramas que compõe a animação do movimento elementar
        let n = Math.ceil(lij / velE);
        //vela = velocidade angular
        let vela = 0;
        //velh = velocidade horizontal
        let velh = lij / n;
        //velv = velocidade vertical
        let velv = 0;

        //ANIMAÇÃO DO MOVIMENTO
        for(let i = 0; i < n; i++){
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            this.dir = this.dir + vela;
            this.xp = this.xp + velh * Math.cos(this.dir);
            this.yp = this.yp + velh * Math.sin(this.dir);
            this.zp = this.zp + velv;
            this.camiao.actualCamiao.position.set(this.xp, this.yp, this.zp);
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            console.log("------");
        }
    }

    movimentoF(){
        //PREPARAÇÃO DO MOVIMENTO
        //rj = raio do nó
        let rj = this.nj.radius;
        //bj = distância do camião à periferia do círculo ARBITRARIO
        let bj = this.K_BERMA * (rj / 3);
        //raioF = raio da circunferência, cuja parte da periferia se pretende percorrer ARBITRARIO
        let raioF = bj / 3;
        //hip = hipotenusa do triângulo (fig. 4 do tutorial)
        let hip = rj - bj + raioF;
        //catt = cateto transversal do triângulo (fig. 4 do tutorial)
        let catt = this.wij / 2 - this.bij + raioF;
        //tetaij = ângulo
        let tetaij = Math.acos(catt / hip);
        //cij = comprimento do arco a percorrer
        let cij = raioF * tetaij;

        //velF = velocidade máxima no movimento elementar F
        let velF = this.camiao.walkingSpeed; 
        //n = número de fotogramas que compõe a animação do movimento elementar
        let n = Math.ceil(cij / velF);
        //vela = velocidade angular
        let vela = - tetaij * n;
        //velh = velocidade horizontal
        let velh = 2 * raioF * Math.sin(tetaij / n / 2);
        //velv = velocidade vertical
        let velv = 0;

        //ANIMAÇÃO DO MOVIMENTO
        for(let i = 0; i < n; i++){
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            this.dir = this.dir + vela;
            this.xp = this.xp + velh * Math.cos(this.dir);
            this.yp = this.yp + velh * Math.sin(this.dir);
            this.zp = this.zp + velv;
            this.camiao.actualCamiao.position.set(this.xp, this.yp, this.zp);
            console.log("dir = " + this.dir);
            console.log("xp = " + this.xp);
            console.log("yp = " + this.yp);
            console.log("zp = " + this.zp);
            console.log("------");
            console.log("------");
        }
    }

    //Posição e orientação iniciais do camião - nj
    inicializacaoCamiao(){
        //rj = raio do nó
        let rj = this.nj.radius;
        //bj = distância do camião à periferia do círculo ARBITRARIO
        let bj = this.K_BERMA * (rj / 3);;
        //raioF = raio da circunferência, cuja parte da periferia se pretende percorrer ARBITRARIO
        let raioF = bj / 3;
        //hip = hipotenusa do triângulo (fig. 4 do tutorial)
        let hip = rj - bj + raioF;

        //catt = cateto transversal do triângulo (fig. 4 do tutorial)
        let catt = this.wij / 2 - this.bij + raioF;

        let tetaij = Math.acos(catt / hip);

        let alfaji = this.aij.ori;
        //dir = direção
        this.dir = alfaji - tetaij;

        //xj, yj, zj = coordenadas do nó nj
        let xj = this.nj.nodeX;
        let yj = this.nj.nodeY;
        let zj = this.nj.nodeZ;

        //POSIÇÃO INICIAL
        this.xp = xj + (rj - bj) * Math.sin(this.dir);
        this.yp = yj - (rj - bj) * Math.cos(this.dir);
        this.zp = zj + this.camiao.eyeHeight / 2;

        this.camiao.actualCamiao.position.set(this.xp, this.yp, this.zp);
    }

    update() {


        if (this.gameRunning==false) {
            if (this.redeLoaded && this.camiaoLoaded) { // If all resources have been loaded
                
                //Adiciona a rede
                this.scene.add(this.rede);

                //Adiciona o camiao
                this.scene.add(this.camiao.actualCamiao);
                
                this.inicializacaoCamiao();
                //this.camiao.actualCamiao.position.set(10, 29, 8);

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

        this.movimentoA();
        //this.movimentoB();
        //this.movimentoC();
        //this.movimentoD();
        //this.movimentoE();
        //this.movimentoF();
    }
}