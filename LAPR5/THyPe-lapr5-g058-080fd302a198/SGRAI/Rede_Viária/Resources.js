import * as THREE from "three";
import RedeViaria from "./Rede_Viaria.js";
import { GLTFLoader } from "../three.js-master/examples/jsm/loaders/GLTFLoader.js"
import EventEmitter from "./Emitter.js"

export default class Resources extends EventEmitter{
    constructor(assets) {
        super();
        this.redeViaria = new RedeViaria();
        this.assets = assets; 

        this.items = {};

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
    }

    startLoading() {
        for (const asset of this.assets) {
            if (asset.type == "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            }
        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.emit("ready");
    }
}