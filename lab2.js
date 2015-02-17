/*
*	Katie Hadgis
*	CS452 Computer Graphics
*	Homework #2
*	02/17/15
*/
var gl;
var points;
var trans = [0,0];
var transLoc;
window.onload = function init()
{
	var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	//
	// Configure WebGL
	//
	gl.viewport( 0, 0, canvas.width, canvas.height );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	gl.program = program;

	var n = initVertexBuffers(gl);
	if(n<0){
		console.log('Error: Fewer than 0 vertices');
		return;
	}
	
	//translation
	transLoc = gl.getUniformLocation( gl.program, "translate");	
	document.onkeydown = function(e){
			switch(String.fromCharCode(e.keyCode)){
				case "W":
					trans[1] += 0.1; //trans = [x,y]
				break;
				case "S":
					trans[1] -= 0.1;
				break;
				case "A":
					trans[0] -= 0.1;
				break;
				case "D":
					trans[0] += 0.1;
				break;
				case "1":
					trans = [0,0];
				break;
			}
			render(n);	
	}

	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, n);
	render(n);
};

function initVertexBuffers(gl){
	var verticesColors = new Float32Array([
		//x,   y,   r,   g,   b
		 -0.13, 0.1, 1.0, 1.0, 1.0,
		  0.0, 0.8, 1.0, 0.0, 0.0,
		  0.13, 0.1, 1.0, 1.0, 1.0,
		  0.1, 0.1, 1.0, 1.0, 1.0,
		  0.8, 0.1, 1.0, 1.0, 0.0,
		  0.2, -0.1, 1.0, 1.0, 1.0,
		  0.2,-0.1, 1.0, 1.0, 1.0,
		  0.5,-0.8, 0.0, 1.0, 0.0,
		  0.0, -0.3, 1.0, 1.0, 1.0,
		  0.0, -0.3, 1.0, 1.0, 1.0,
		  0.2, -0.1, 1.0, 1.0, 1.0,
		  0.1, 0.1, 1.0, 1.0, 1.0,
		  0.13, 0.1, 1.0, 1.0, 1.0,
		  -0.13, 0.1, 1.0, 1.0, 1.0,
		  0.0, -0.3, 1.0, 1.0, 1.0,
		  0.0, -0.3, 1.0, 1.0, 1.0,
		  -0.2, -0.1, 1.0, 1.0, 1.0,
		  -0.1, 0.1, 1.0, 1.0, 1.0,
		  -0.1, 0.1, 1.0, 1.0, 1.0,
		  -0.2, -0.1, 1.0, 1.0, 1.0,
		  -0.8, 0.1, 1.0, 0.0, 1.0,		  
		  0.0, -0.3, 1.0, 1.0, 1.0,
		  -0.5, -0.8, 0.0, 0.0, 1.0,
		  -0.2, -0.1, 1.0, 1.0, 1.0
	]);
	var n = verticesColors.length/5;
	//create buffer
	var vertexColorBuffer = gl.createBuffer();
	if(!vertexColorBuffer){
		console.log('failed to create buffer obj');
		return false;
	}
	//bind buffer to array
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	
	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	
	//POSITION: get storage location, assign & enable buffer
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if(a_Position < 0){
		console.log('a_Position fail');
		return -1;
	}
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*5,0);
	gl.enableVertexAttribArray(a_Position);
	
	//COLOR: get storage location, assign & enable buffer
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color < 0){
		console.log('a_Color fail');
		return -1;
	}
	gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*5,FSIZE*2);
	gl.enableVertexAttribArray(a_Color);
	
	//Unbind
	gl.bindBuffer(gl.ARRAY_BUFFER,null);
	
	return n;
}

function render(n) {
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.uniform2fv(transLoc, trans);
	gl.drawArrays(gl.TRIANGLES,0,n);
}
