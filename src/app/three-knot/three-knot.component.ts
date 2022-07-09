import {
  Component,
  OnInit,
  AfterViewInit,
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
export class ThreeKnotComponent implements OnInit, AfterViewInit {
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
    this.initTheeScene();
    this.animate();
  }

  ngAfterViewInit() {
    window.addEventListener(
      'mousemove',
      this.onDocumentMouseMove.bind(this),
      false
    );

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.threeContainer.nativeElement.offsetHeight,
      this.threeContainer.nativeElement.offsetHeight
    );
    this.screenRatio = Math.round(window.innerWidth / window.innerHeight);

    this.threeContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  initTheeScene() {
    this.camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    this.camera.position.set(0, 0, 120);

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.handleMeshTexture();

    let geometry: any = new THREE.TorusKnotGeometry(18, 8, 400, 140, 2, 3);
    let material: any = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      map: this.meshTexture,
      normalMap: this.normalTexture,
      normalScale: new THREE.Vector2(1, 1),
    });

    this.torusMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.torusMesh);

    //! LIGHTING

    let ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.7;

    let directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(
      0xffffff
    );
    directionalLight.intensity = 0.7;
    directionalLight.position.set(90, 0, 10);

    this.scene.add(directionalLight, ambientLight);

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
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
      '../../assets/textures/texture.webp'
    );

    this.meshTexture.encoding = THREE.sRGBEncoding;
    this.meshTexture.wrapS = this.meshTexture.wrapT = THREE.RepeatWrapping;
    this.meshTexture.offset.set(0, 0);
    this.meshTexture.repeat.set(2, 2);

    this.normalTexture = new THREE.TextureLoader().load(
      '../../assets/textures/normal.webp'
    );

    this.normalTexture.wrapS = this.normalTexture.wrapT =
      THREE.MirroredRepeatWrapping;
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
}
