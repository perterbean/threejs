import {
    SphereGeometry,
    MeshStandardMaterial,
    Mesh,
    TextureLoader
} from 'https://unpkg.com/three@0.137.5/build/three.module.js';

import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.16/+esm';
import BaseExample from './base-example.js';


class ThreejsExample extends BaseExample {
    constructor(canvas) {
        super(canvas);
        this.createLights();
        this.loadTexture();
        this.createMesh();
        requestAnimationFrame(this.render.bind(this));
        this.createControlsGui();
    }

    loadTexture() {
        const textureLoader = new TextureLoader();
        const colorTexture = textureLoader.load('../textures/blocks/blocks_color.jpg');
        const bumpTexture = textureLoader.load('../textures/blocks/blocks_bump.jpg');
        this.bumpMaps = {
            none: null,
            blocks: bumpTexture
        };
        this.material = new MeshStandardMaterial({
            map: colorTexture,
            bumpMap: bumpTexture,
            // bumpScale: 1,
            roughness: 0.07
        });
    }

    createMesh() {
        const geometry = new SphereGeometry(0.4);
        const mesh = new Mesh(geometry, this.material);
        this.scene.add(mesh);
    }

    createControlsGui() {
        const bumpMapKeys = this.getObjectsKeys(this.bumpMaps);
        const gui = new GUI();
        const controls = {
            bumpMap: bumpMapKeys[1]
        };
        gui.add(controls, 'bumpMap', bumpMapKeys)
            .onChange(this.updateTexture(this.material, 'bumpMap', this.bumpMaps));
        gui.add(this.material, 'bumpScale', -3, 3);
    }
}


new ThreejsExample(document.querySelector('#webglOutput'));
