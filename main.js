import * as THREE from "three"
import{PeppersGhostEffect} from "three/examples/jsm/effects/PeppersGhostEffect"



let container;

			let camera, scene, renderer, effect;
			let group;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

				scene = new THREE.Scene();

				group = new THREE.Group();
				scene.add( group );

				// Cube

				const geometry = new THREE.TetrahedronGeometry(1,0); // ensure unique vertices for each triangle

				const position = geometry.attributes.position;
				const colors = [];
				const color = new THREE.Color();

				// generate for each side of the Sphere a different color

				for ( let i = 0; i < position.count; i += 1 ) {

					color.setHex( Math.random() * 0xffffff );

					// first face

					colors.push( color.r, color.g, color.b );
				
					


				}

				geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 1 ) );

				const material = new THREE.MeshBasicMaterial( { vertexColors: true } );

				for ( let i = 0; i < 10; i ++ ) {

					const Sphere = new THREE.Mesh( geometry, material );
					
					Sphere.scale.multiplyScalar( Math.random() + 0. );
					group.add( Sphere );

				}

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				container.appendChild( renderer.domElement );

				effect = new PeppersGhostEffect( renderer );
				effect.setSize( window.innerWidth, window.innerHeight );
				effect.cameraDistance = 5;

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				effect.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				group.rotation.y += 0.01;

				effect.render( scene, camera );

			}

;