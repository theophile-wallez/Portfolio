import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-knot',
  templateUrl: './three-knot.component.html',
  styleUrls: ['./three-knot.component.scss'],
})
export class ThreeKnotComponent implements OnInit, OnDestroy {
  constructor() {}
  @ViewChild('threeContainer') threeContainer!: ElementRef;

  camera!: THREE.PerspectiveCamera;
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;

  torusMesh!: THREE.Mesh;
  meshTexture!: THREE.Texture;
  normalTexture!: THREE.Texture;

  textureOffset: number = 0;

  rotateX: number = 0.003;
  rotateY: number = 0.004;
  screenRatio: number = 16 / 9;

  ngOnInit(): void {
    this.handleMeshTexture();
    window.addEventListener(
      'mousemove',
      this.onDocumentMouseMove.bind(this),
      false
    );
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener(
      'mousemove',
      this.onDocumentMouseMove.bind(this),
      false
    );
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  initTheeScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    this.camera.position.set(0, 0, 120);

    this.screenRatio = Math.round(window.innerWidth / window.innerHeight);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.threeContainer.nativeElement.offsetHeight,
      this.threeContainer.nativeElement.offsetHeight
    );
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    let geometry: any = new THREE.TorusKnotGeometry(18, 8, 400, 140, 2, 3);
    let material: any = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      map: this.meshTexture,
      normalMap: this.normalTexture,
      normalScale: new THREE.Vector2(1, 1),
    });

    this.torusMesh = new THREE.Mesh(geometry, material);

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    let directionalLight = new THREE.DirectionalLight();
    directionalLight.color = new THREE.Color(0xffffff);
    directionalLight.intensity = 0.7;
    directionalLight.position.set(90, 0, 10);

    this.scene.add(directionalLight, ambientLight);
    this.scene.add(this.torusMesh);

    this.threeContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
  render() {
    this.offSetMeshTexture();

    var xAxis = new THREE.Vector3(1, 0, 0);
    var yAxis = new THREE.Vector3(0, 1, 0);

    this.torusMesh.rotateOnWorldAxis(xAxis, this.rotateY);
    this.torusMesh.rotateOnWorldAxis(yAxis, this.rotateX);

    this.renderer.render(this.scene, this.camera);
  }

  handleMeshTexture() {
    this.meshTexture = new THREE.TextureLoader().load(
      '../../assets/textures/texture.webp',
      () => {
        this.meshTexture.encoding = THREE.sRGBEncoding;
        this.meshTexture.wrapS = this.meshTexture.wrapT = THREE.RepeatWrapping;
        this.meshTexture.offset.set(0, 0);
        this.meshTexture.repeat.set(2, 2);

        this.normalTexture = new THREE.TextureLoader().load(
          '../../assets/textures/normal.webp',
          () => {
            this.normalTexture.wrapS = this.normalTexture.wrapT =
              THREE.MirroredRepeatWrapping;
            this.initTheeScene();
          }
        );
      }
    );
  }

  offSetMeshTexture() {
    this.textureOffset += 0.0001;
    let offsetSpeedCoefficient = 4;
    this.meshTexture.offset = new THREE.Vector2(
      this.textureOffset * offsetSpeedCoefficient,
      this.textureOffset * offsetSpeedCoefficient
    );
  }

  mouseSpeedCoefficient: number = 0.01;
  onDocumentMouseMove(mouseEvent: MouseEvent) {
    let centerX: number = 0.5 * window.innerWidth;
    let centerY: number = 0.5 * window.innerHeight;
    this.rotateX =
      ((mouseEvent.x - centerX) / (window.innerWidth / 2)) *
      this.mouseSpeedCoefficient;
    this.rotateY =
      ((mouseEvent.y - centerY) / (window.innerWidth / 2)) *
      this.mouseSpeedCoefficient;
  }

  onWindowResize() {
    const width = this.threeContainer.nativeElement.offsetHeight;
    this.camera.aspect = 1;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, width);
  }
}
