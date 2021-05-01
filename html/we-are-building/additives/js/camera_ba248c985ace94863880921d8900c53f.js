function init(){container=document.createElement("div"),document.body.appendChild(container);var e=document.createElement("div");e.style.position="absolute",e.style.top="10px",e.style.width="100%",e.style.textAlign="center",e.innerHTML="",container.appendChild(e),scene=new THREE.Scene,camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.1,10),scene.add(camera),room=new THREE.Mesh(new THREE.BoxGeometry(6,6,6,8,8,8)),scene.add(room),scene.add(new THREE.HemisphereLight(15724527,13421772));var n=new THREE.DirectionalLight(16777215);n.position.set(2,7,2).normalize(),scene.add(n);for(var o=new THREE.BoxGeometry(.15,.15,.15),t=0;t<200;t++){var r=new THREE.Mesh(o,new THREE.MeshLambertMaterial({color:13421772}));r.position.x=4*Math.random()-2,r.position.y=4*Math.random()-2,r.position.z=4*Math.random()-2,r.rotation.x=2*Math.random()*Math.PI,r.rotation.y=2*Math.random()*Math.PI,r.rotation.z=2*Math.random()*Math.PI,r.scale.x=Math.random()+.5,r.scale.y=Math.random()+.5,r.scale.z=Math.random()+.5,r.userData.velocity=new THREE.Vector3,r.userData.velocity.x=.01*Math.random()-.005,r.userData.velocity.y=.01*Math.random()-.005,r.userData.velocity.z=.01*Math.random()-.005,room.add(r)}raycaster=new THREE.Raycaster,(renderer=new THREE.WebGLRenderer({antialias:!0})).setClearColor(1250068),renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),renderer.sortObjects=!1,container.appendChild(renderer.domElement),renderer.vr.enabled=!0,renderer.domElement.addEventListener("mousedown",onMouseDown,!1),renderer.domElement.addEventListener("mouseup",onMouseUp,!1),renderer.domElement.addEventListener("touchstart",onMouseDown,!1),renderer.domElement.addEventListener("touchend",onMouseUp,!1),window.addEventListener("resize",onWindowResize,!1)}function onMouseDown(){isMouseDown=!1}function onMouseUp(){isMouseDown=!1}function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function animate(){renderer.animate(render)}function render(){var e=60*clock.getDelta();if(!0===isMouseDown){var n=room.children[0];room.remove(n),n.position.set(0,0,-.75),n.position.applyQuaternion(camera.quaternion),n.userData.velocity.x=.02*(Math.random()-.5)*e,n.userData.velocity.y=.02*(Math.random()-.5)*e,n.userData.velocity.z=(.01*Math.random()-.05)*e,n.userData.velocity.applyQuaternion(camera.quaternion),room.add(n)}raycaster.setFromCamera({x:0,y:0},camera);var o=raycaster.intersectObjects(room.children);o.length>0?INTERSECTED!=o[0].object&&(INTERSECTED&&INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex),INTERSECTED=void 0):(INTERSECTED&&INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex),INTERSECTED=void 0);for(var t=0;t<room.children.length;t++)(n=room.children[t]).userData.velocity.multiplyScalar(1-.001*e),n.position.add(n.userData.velocity),(n.position.x<-3||n.position.x>3)&&(n.position.x=THREE.Math.clamp(n.position.x,-3,3),n.userData.velocity.x=-n.userData.velocity.x),(n.position.y<-3||n.position.y>3)&&(n.position.y=THREE.Math.clamp(n.position.y,-3,3),n.userData.velocity.y=-n.userData.velocity.y),(n.position.z<-3||n.position.z>3)&&(n.position.z=THREE.Math.clamp(n.position.z,-3,3),n.userData.velocity.z=-n.userData.velocity.z),n.rotation.x+=2*n.userData.velocity.x*e,n.rotation.y+=2*n.userData.velocity.y*e,n.rotation.z+=2*n.userData.velocity.z*e;renderer.render(scene,camera)}var clock=new THREE.Clock,container,camera,scene,raycaster,renderer,room,isMouseDown=!1,INTERSECTED,crosshair;init(),animate();