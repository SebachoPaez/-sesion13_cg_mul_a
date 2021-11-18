//Gustavo Leon
var scene = new THREE.Scene();

function cubo(x, y, z, r,g,b, material, alambrado) {
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch (material) {
        case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({wireframe: alambrado });
                         cubeMaterial.color.setRGB(r,g,b);
            break;

        case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({ wireframe: alambrado });
        cubeMaterial.color.setRGB(r,g,b);
            break;

        case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({ wireframe: alambrado });
        cubeMaterial.color.setRGB(r,g,b);
            break;

        case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({ wireframe: alambrado });
        cubeMaterial.color.setRGB(r,g,b);
            break;

        case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({ wireframe: alambrado });
        cubeMaterial.color.setRGB(r,g,b);
                        
            break;
    }

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cube);
    return (cube);
}

function init() {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xFFFFFF));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axes = new THREE.AxesHelper(50);
    scene.add(axes);

    Cubo = [];   // Definir un array unidimensional

    var dimension = prompt('Digite la dimension del cubo', 5);
    var dim1 = parseInt(dimension, 10);

    dim = dim1; // dimensiones iniciales de los cubos, acá se modifica el tamaño inicial de los cubos.
    dimscale = dim / dim; //dimensiones convertidas para la funcion scale.set ya que el valor inicial es 1 entonces toca dividir 6/6 para convertirlo a 1
    dim2 = dimscale / 2; //dimensiones del cubo 1 escaladas a la mitad generando el 2 cubo
    dim3 = dimscale / 4;  //dimensiones del cubo 2 escaladas a la mitad generando el 3 cubo
    angulo=(Math.PI/6);
    angulo1=(Math.PI/4)-angulo;

    delta = dim / 2; // Valor para trasladar fuera del origen los cubos
    beta = dim + delta; //Valor para trasladar el cubo 2 al centro del cubo 1
    alpha2 = delta * 2.5; //Valor para trasladar el cubo 2 en el eje Y y quede tangente al cubo 1
    alpha3 = delta * 3.25; //Valor para trasladar el cubo 3 en el eje Y y quede tangente al cubo 2

    Cubo.push(cubo(dim, dim, dim, 0.55, 0.55, 0, 'Lambert', false));
    Cubo.push(cubo(dim, dim, dim, 0.5, 1.8, 0, 'Lambert', false));
    Cubo.push(cubo(dim, dim, dim, 0.5, 1.8, 0, 'Lambert', false));

    Cubo[0].translateX(delta); //Cubo 1 trasladado desde el origen hasta quedar tangente a los ejes
    Cubo[0].translateY(delta);
    Cubo[0].translateZ(delta);

    Cubo[1].translateX(delta); //Cubo 2 trasladado al centro del cubo 1
    Cubo[1].translateY(alpha2); //Cubo 2 trasladado en el eje Y para quedar tangente al cubo 1
    Cubo[1].translateZ(delta);
    Cubo[1].scale.set(dim2, dim2, dim2); //Cubo 2 escalado a la mitad del cubo 1

    Cubo[2].translateX(delta); //Cubo 3 trasladado al centro del cubo 2
    Cubo[2].translateY(alpha3); //Cubo 3 trasladado en el eje Y para quedar tangente al cubo 2
    Cubo[2].translateZ(delta);
    Cubo[2].scale.set(dim3, dim3, dim3); //Cubo 3 escalado a la mitad del cubo 2

    light = new THREE.PointLight(0xFFFF00); //  Luz proveniente de un punto en el espacio, semejante al sol.
    light.position.set((dim/2)+dim, ((dim/3)*2)+dim*2, (dim*3)+dim*3); //  Localización de la luz. (x, y, z).
    scene.add(light);

    camera.position.set((dim/2)+dim, ((dim/3)*2)+dim*2, (dim*3)+dim*3);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);
}
//Gustavo Leon