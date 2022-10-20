		let arr = [];
		let html = [];
		let num = 0;
		let num2 = 0;
		const xhtml = document.getElementById('mostrar');

		/* Codigo de comprobaciones */

		if (localStorage.getItem('list') == undefined || localStorage.getItem('list') == null || localStorage.getItem('list') == '') { 
			localStorage.setItem('list', '');
			xhtml.innerHTML="<center><div id='noh'>No hay nada que mostrar.</div></center>";
			
		} else { 

			arr = localStorage.getItem('list').split(",");
		}

		if (!localStorage.getItem('list') == '') {
			cargarlista();
		}


		/* Codigo para agregar algo a la lista */
		
		function add() {
			var txt = document.getElementById('input1');

			if (txt.value == "") {
				Swal.fire('Rellena el campo!');
			}else{

				arr.unshift(txt.value);
				localStorage.setItem('list', arr);
				mostrar(txt.value);
				txt.value = "";

			}
		}

		/* Codigo extra */

		function mostrar(e) {
			const Toast = Swal.mixin({
			  toast: true,
			  position: 'top-end',
			  showConfirmButton: false,
			  timer: 1000,
			  timerProgressBar: true,
			  didOpen: (toast) => {
			    toast.addEventListener('mouseenter', Swal.stopTimer)
			    toast.addEventListener('mouseleave', Swal.resumeTimer)
			  }
			})

			Toast.fire({
			  icon: 'success',
			  title: 'Agregado'
			})
			xhtml.innerHTML="";
			cargarlista();
			
		}

		/* Codigo para mostrar la lista recargada */

		function cargarlista() {
			for (var i = 0; i <= arr.length; i++) {
				if (i == 0) {
					xhtml.innerHTML= xhtml.innerHTML + '<div id="li" data="'+ i +'">'+arr[0]+'<div><button id="edi" onclick="edi('+ i +')">E</button><button id="eli" onclick="eli('+ i +')">X</button></div></div></div>';
				} 
				if (i > 0 && i < arr.length) {
					xhtml.innerHTML= xhtml.innerHTML + '<div id="li" data="'+ i +'">'+arr[i]+'<div><button id="edi" onclick="edi('+ i +')">E</button><button id="eli" onclick="eli('+ i +')">X</button></div></div></div>';
				}
				
			}
			
		}

		/* Codigo para eliminar algo de la lista */

		function eli(e) {
			xhtml.innerHTML="";
			arr = localStorage.getItem('list').split(",");
			arr.splice(e,1);
			localStorage.setItem('list', arr);
			cargarlista();
			if (localStorage.getItem('list')==="") {
				xhtml.innerHTML="<center><div id='noh'>No hay nada que mostrar.</div></center>";
				num=1
				num2=1
			}
		}

		/* Codigo para mostrar el modal de editar */

		function edi(e) {
			document.getElementById('cont-edit').style.display="block";
			var r = document.querySelector('[data*="'+e+'"]').textContent;
			document.getElementById('input2').value = r.substring(0, r.length - 2);
			document.getElementById('input2').setAttribute("data",e);

		}

		/* Codigo para editar algo de la lista */

		function editar() {
			if (document.getElementById('input2').value=="") {
				Swal.fire('Rellena el campo!');
			} else {
			xhtml.innerHTML="";
			var w = document.getElementById('input2').value;
			var d = document.getElementById('input2').getAttribute("data");
			arr = localStorage.getItem('list').split(",");
			arr.splice(d,1,w);
			localStorage.setItem('list', arr);
			cargarlista();
			document.getElementById('cont-edit').style.display="none";
			}
		}

		/* Codigo para cambiar entre modo ocuro y claro */

		function switch1(e) {
			var foo = document.getElementById("switch-label").checked;
			if (foo == true) {
				document.body.style.backgroundImage = "url('./img/bg2cl.png')";
				document.getElementById("cont-edit").style.background="#30d7dbc7";
				document.getElementById("cont-edit2").style.background="#31afb2";
				document.getElementById("input1").style.background="#ffffff";
				document.getElementById("input2").style.background="#ffffff";
				document.getElementById("input1").style.color="#000000";
				document.getElementById("input2").style.color="#000000";
				document.getElementById("switch-label").checked = false;
				localStorage.setItem('modedark','false');
			} else { 
				document.body.style.backgroundImage = "url('./img/bg1os.png')"; 
				document.getElementById("cont-edit").style.background="#50a7a9c7";
				document.getElementById("cont-edit2").style.background="#1f7a7c";
				document.getElementById("input1").style.background="#7d8bd9";
				document.getElementById("input2").style.background="#7d8bd9";
				document.getElementById("input1").style.color="#e0e0e0";
				document.getElementById("input2").style.color="#e0e0e0";
				document.getElementById("switch-label").checked = true;
				localStorage.setItem('modedark','true');
			}
		}


		/* Codigo para comprobar si esta activo el modo oscuro */

		if (localStorage.getItem('modedark')==='true') {
			document.querySelector('.switch-button').click();
		}

		/* Codigo del reloj */

		setInterval(function (argument) {
			var t = new Date();
			var now = t.toLocaleString();
			document.getElementById("fh").innerHTML=now;
		}, 1000);


		/* Codigo para agreagr algo a la lista precionando el boton Enter */
		var input = document.getElementById("input1");
		input.addEventListener("keypress", function(event) {
		  if (event.key === "Enter") {
		    event.preventDefault();
		    add();
		  }
		});