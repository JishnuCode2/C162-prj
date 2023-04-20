AFRAME.registerComponent("shoot",{
    init: function(){
        this.shoot()
    },
    shoot: function(){
        window.addEventListener("keydown", (e)=>{
            if( e.key === "z"){
                var ball = document.createElement("a-entity")

                ball.setAttribute("gltf-model", "./models/models/bowling_ball/scene.gltf")

                var cam = document.querySelector("#camera");

                var pos = cam.getAttribute("position")
                ball.setAttribute("position", {x:pos.x, y: 0, z: (pos.z - 0.7)});

                var camera = document.querySelector("#camera").object3D

                var scene = document.querySelector("#scene")
            
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction);

                ball.setAttribute("dynamic-body",{shape: "sphere"});

                ball.setAttribute("velocity", direction.multiplyScalar(-10))

                ball.addEventListener("collide", this.removeBall);

                scene.appendChild(ball)

                
            }
        })
    },
    removeBall: function (e) {
        //bullet element
        var element = e.detail.target.el;
        //element which is hit
        var elementHit = e.detail.body.el;
        if (elementHit.id.includes ("pin")) {

            var impulse = new CANNON.Vec3(0,1,-15); 
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"));
            elementHit.body.applyImpulse(impulse, worldPoint);

            element.setAttribute("material", {transparent: true, opacity: 0.5})

            element.removeEventListener("collide", this.removeBall);

            var scene = document.querySelector("#scene"); 
            scene.removeChild(element);

            console.log(e, scene)
        } 
    }
})