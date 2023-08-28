const planet = document.querySelector('#planet'),
	display = planet.style.display || getComputedStyle(planet).display;
!(function () {
	if (planet && 'none' !== display) {
		const k = document.createElement('div'),
			T =
				(k.classList.add('canvas-container'),
				planet.appendChild(k),
				document.createElement('div'));
		T.classList.add('image-loader');
		var e = document.createElement('div'),
			t =
				(e.classList.add('image-content'),
				T.appendChild(e),
				document.createElement('img')),
			e =
				((t.src = 'https://mlp-two.vercel.app/assets/planet.webp'),
				e.appendChild(t),
				planet.getAttribute('data-active'));
		e && 'false' == e
			? planet.appendChild(T)
			: ((T.innerHTML +=
					'<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'),
			  planet.appendChild(T),
			  (T.children[0].style.height = k.offsetWidth + 'px'),
			  (async function () {
					const {
						Vector2: e,
						Color: i,
						Mesh: o,
						ACESFilmicToneMapping: t,
						sRGBEncoding: n,
						Scene: a,
						PerspectiveCamera: d,
						WebGLRenderer: l,
						AmbientLight: r,
						LoadingManager: s,
					} = await import('https://cdn.skypack.dev/three@0.137');
					var p = (
						await import(
							'https://cdn.skypack.dev/three-stdlib@2.8.5/controls/OrbitControls'
						)
					)['OrbitControls'];
					const c = (
							await import(
								'https://cdn.skypack.dev/three-stdlib@2.8.5/loaders/OBJLoader'
							)
						)['OBJLoader'],
						m = (
							await import(
								'https://cdn.skypack.dev/three-stdlib@2.8.5/loaders/MTLLoader'
							)
						)['MTLLoader'],
						v = new s();
					let h = !1,
						u = null;
					(v.onStart = function (e, t, n) {
						u = new Date().getTime();
					}),
						(v.onLoad = function () {
							(h = !0), T.remove();
						}),
						(v.onProgress = function (e, t, n) {
							t === n &&
								console.log('Loading complete!', u - new Date().getTime());
						}),
						setTimeout(() => {
							h ? console.log('run') : v.removeHandler();
						}, 2e3),
						(v.onError = function (e) {
							console.log('There was an error loading ' + e);
						});
					const w = new a(),
						g = new d(45, 1, 0.1, 1e3),
						f =
							(g.position.set(0, 15, 80), new l({ antialias: !0, alpha: !0 }));
					var y = planet.offsetWidth;
					f.setSize(y, y),
						(f.toneMapping = t),
						(f.outputEncoding = n),
						(f.physicallyCorrectLights = !0),
						k.appendChild(f.domElement);
					const L = new p(g, f.domElement),
						_ =
							(L.target.set(0, 0, 0),
							(L.dampingFactor = 0.05),
							(L.enableDamping = !0),
							(L.enablePan = !1),
							(L.enableZoom = !1),
							(L.autoRotate = !0),
							(L.autoRotateSpeed *= -0.5),
							new r(16734039, 3.5)),
						b = (w.add(_), new r(5176657, 1.5)),
						C = (w.add(b), new r(10395294, 1.6));
					w.add(C);
					let E = new e(0, 0);
					window.addEventListener('mousemove', e => {
						var t = e.clientX - 0.5 * innerWidth,
							e = e.clientY - 0.5 * innerHeight;
						(E.x = 3e-4 * t), (E.y = 3e-4 * e);
					}),
						(async function () {
							let a = void 0;
							new m(v).load(
								'https://mlp-two.vercel.app/assets/Planete.mtl',
								function (e) {
									Object.entries(e.materialsInfo).reduce((e, [t, n]) => {
										var a;
										return (
											n.map_kd &&
												((a = n.map_kd.split('\\').pop()),
												(n.map_kd =
													'https://mlp-two.vercel.app/assets/Textureperf/' +
													a)),
											n.map_d &&
												((a = n.map_d.split('\\').pop()),
												(n.map_d =
													'https://mlp-two.vercel.app/assets/Textureperf/' +
													a)),
											(e[t] = n),
											e
										);
									}, {}),
										e.preload();
									var t = new c(v);
									t.setMaterials(e),
										t.load(
											'https://mlp-two.vercel.app/assets/Planete.obj',
											function (e) {
												a = e;
												let n = null;
												a.children.forEach((e, t) => {
													'Continent_Grand_Blanc_NIV9' === e.name &&
														(n = e.material),
														'Continent_Volcan_NIV9' === e.name &&
															(a.children[t] = new o(e.geometry, n)),
														'nc_che_Un_observatoire' === e.name &&
															a.children.splice(t, 1),
														'ge_ret_Un_Sapin' === e.name &&
															a.children.splice(t, 1);
												}),
													w.add(a),
													t.load(
														'https://mlp-two.vercel.app/assets/text.obj',
														function (e) {
															e.children.forEach((e, t) => {
																e.material.color = new i(16579564);
															}),
																w.add(e);
														}
													);
											}
										);
								}
							),
								f.setAnimationLoop(() => {
									L.update(), f.render(w, g), (f.autoClear = !0);
								});
						})(),
						window.addEventListener('resize', () => {
							var e = planet.offsetWidth;
							f.setSize(e, e),
								(T.children[0].style.height = k.scrollWidth + 'px');
						});
			  })());
	}
})();
