import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-homepage',
  templateUrl: 'about.component.html',
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef: ElementRef|undefined;

  public rotationSpeedX = 0.05;
  public rotationSpeedY = 0.05;
  public size = 200;
  public texture = '/assets/texture.webp';

  //? Helper Properties (Private Properties);
  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  //* Stage Properties
  @Input() public cameraZ = 400;
  @Input() public fieldofView = 1;
  @Input('nearClipping') public nearClippingPlane = 1;
  @Input('farClipping') public farClippingPlane = 1000;
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture) });
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  /**
   * Create the scene
   *
   * @private
   *@memberof CubeComponent
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color();
    this.scene.add(this.cube);
    //*Camera
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldofView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    const component: AboutComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }
}
