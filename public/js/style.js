
$( document ).ready(function() {
	console.log( "ready!" );
});
// Tráo vị trí các câu hỏi
function shuffle(array) {
		let currentIndex = array.length, randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);

			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}

		return array;
	}
	let data = [];
	var categoryId= $(" #category_id ").val();
	var page=$("#page").val();
	a2 = $.ajax({
		url: 'http://web_tu_lam.khaiho.io/api/list_question_width_category/' + categoryId + '/'+ page,
		type: 'GET',
		dataType: 'json', // added data type
	}).then(function (res) {
		console.log("res",res);
		if (res.length == 0) {
			window.location.href = "http://web.btgcp-en.io/404_override.html"
		}
		res.map(i => {
			data.push(i);
		});
        console.log("DATA",data);
		var new_data = shuffle(data);
		$("#demo").html(' <input type="hidden" id="s" value="0">');
		$("#title").html('<strong id="title" style="font-size: 160% ">'+new_data[0].category_name+' , câu hỏi 1  </strong>');
		$("#question_main").html('<h2>' + new_data[0].question + '</h2>');
		$("#image").html('<img style="width: 300px" src="'+new_data[0].image+'" alt="">');
		$("#select_a").html('<button value="'+JSON.parse(new_data[0].select).A+'" style="width: 100%"><div class="alert alert-warning"><strong style="font-size: 150%">Đáp án A :</strong> <label style="font-weight: bold ; font-size: 200%">' + JSON.parse(new_data[0].select).A + '</label></div></button>');
		$("#select_b").html('<button value="'+JSON.parse(new_data[0].select).B+'"  style="width: 100%"><div class="alert alert-warning"><strong style="font-size: 150%">Đáp án B :</strong> <label style="font-weight: bold ; font-size: 200%">' + JSON.parse(new_data[0].select).B + '</label></div></button>');
		$("#select_c").html('<button value="'+JSON.parse(new_data[0].select).C+'" style="width: 100%"><div class="alert alert-warning"><strong style="font-size: 150%">Đáp án C :</strong> <label style="font-weight: bold ; font-size: 200%">' + JSON.parse(new_data[0].select).C + '</label></div></button>');
		$("#select_d").html('<button value="'+JSON.parse(new_data[0].select).D+'" style="width: 100%"><div class="alert alert-warning"><strong style="font-size: 150%">Đáp án D :</strong> <label style="font-weight: bold ; font-size: 200%">' + JSON.parse(new_data[0].select).D + '</label></div></button>');
		$("#s_time").html('<input type="hidden" value="' + new_data[0].countdown + '" id="s_input"><div><i style="font-size: 50px" class="fas fa-clock"></i><lable style="margin-left: 10px;font-weight: bold;font-size: 30px">' + new_data[0].countdown + '</lable></div>');
		function time(s) {
			$("#demo").html(' <input type="hidden" id="s" value="' + s + '">');
			$("#title").html('<strong id="title" style="font-size: 160% ">'+new_data[0].category_name+' , câu hỏi '+(parseInt(s) + 1)+'  </strong>');
			$("#question_main").html('<h1 style="width: 100%;">' + new_data[s].question + '</h1>');
			$("#image").html('<img style="width: 300px" src="'+new_data[s].image+'" alt="">');
			$("#select_a").html('<button value="' + JSON.parse(new_data[s].select).A + '"  style="width: 100%"><div class="alert alert-warning"><strong style="font-size: 150%">Đáp án A :</strong> <label style="font-weight: bold ; font-size: 200%">' + JSON.parse(new_data[s].select).A + '</label></div></button>');
			$("#select_b").html('<button value="' + JSON.parse(new_data[s].select).B + '" style="width: 100%"><div class="alert alert-warning"><strong style="font-size: 150%">Đáp án B :</strong> <label style="font-weight: bold ; font-size: 200%">' + JSON.parse(new_data[s].select).B + '</label></div></button>');
			$("#select_c").html('<button value="' + JSON.parse(new_data[s].select).C + '" style="width: 100%"><div class="alert alert-warning"><strong style="font-size: 150%">Đáp án C :</strong> <label style="font-weight: bold ; font-size: 200%">' + JSON.parse(new_data[s].select).C + '</label></div></button>');
			$("#select_d").html('<button value="' + JSON.parse(new_data[s].select).D + '" style="width: 100%"><div class="alert alert-warning"><strong style="font-size: 150%">Đáp án D :</strong> <label style="font-weight: bold ; font-size: 200%">' + JSON.parse(new_data[s].select).D + '</label></div></button>');
			$("#s_time").html('\t<i style="font-size: 50px" class="fas fa-clock"></i><lable style="font-size: 300%">' + new_data[s].countdown + '</lable>\n<input type="hidden" value="' + new_data[s].countdown + '" id="s_input">');
			// $("#countdown").html('<input type="text" value="'+new_data[s].countdown+'"  id="s_input">');

		}
		var timeout = null;
		function click() {
			$("button").click(function () {
				var select = $(this).val();
				var countdown = $(" #countdown").val();
				var question = new_data[j].question;
				var count_data = new_data.length;
				var answer = new_data[j].answer;
				console.log("Cau hoi", select)
				if (select == answer) {
					localStorage.setItem('select' + categoryId + (j + 1), '{"question" : "' + question + '","check" : "true" ,"id" : ' + (j + 1) + ' , "answer" : ' + '"' + answer + '"' + ' , "select" : ' + '"' + select + '"' + '}');
				} else {
					localStorage.setItem('select' + categoryId + (j + 1), '{"question" : "' + question + '","check" : "false" ,"id" : ' + (j + 1) + ' ,"answer" : ' + '"' + answer + '"' + ' , "select" : ' + '"' + select + '"' + '}');
				}
				if (j + 1 < new_data.length) {
					time(j + 1);
				}

				// clearTimeout(timeOut);
			})
		}
		click()
		function start(s = $(" input#s_input").val()) {
			$("#s_time").html('<input type="hidden" value="' + s + '" id="s_input"><div><i style="font-size: 50px" class="fas fa-clock"></i><lable style="margin-left: 10px;font-weight: bold;font-size: 30px">' + s + '</lable></div>');
			var s = s;
			j = parseInt($("#s").val());
			if (s === -1) {
				j = parseInt($("#s").val());
				console.log("j++", j + 1);
				if (j + 1 < new_data.length) {
					time(j + 1);
					clearTimeout()
				}
				clearTimeout(timeOut)
			}
			if ((j + 1) == new_data.length) {

				if (s === 0) {
					var table = '<div class=\"row\" style=\"text-align: center\"><div class=\"col-2\"></div><div class=\"col-8\"><table style="font-size: 20px" class=\"table table-bordered\"><thead><tr><th class=\"col-1\">STT</th><th class=\"col-4\">Câu hỏi </th><th  class=\"col-4\">Đáp án đúng</th><th  class=\"col-3\">Bạn trả lời</th></tr></thead><tbody>';
					let keysLocal = Object.keys(localStorage);
					var count_key_true = 0;
					var count_key_false = 0;
					keysLocal.map(i => {
						if (i.includes("select" + categoryId)) {
							if (JSON.parse(localStorage.getItem(i)).check == "true") {
								table += '<tr><td class="col-1">' + JSON.parse(localStorage.getItem(i)).id + '</td><td  class="col-4">' + JSON.parse(localStorage.getItem(i)).question + '</td><td  class="col-4">' + JSON.parse(localStorage.getItem(i)).answer + '</td><td  class="col-3">Đáp án bạn đã chọn : ' + JSON.parse(localStorage.getItem(i)).select + '<i style="color: #0f9e60 ; font-size: 25px" class="far fa-check-circle"></i></td></tr>'
								count_key_true += 1;
								console.log("TRUE");
							}
							if (JSON.parse(localStorage.getItem(i)).check == "false") {
								console.log("DÃ FALE");
								table += '<tr><td class="col-1">' + JSON.parse(localStorage.getItem(i)).id + '</td><td  class="col-4">' + JSON.parse(localStorage.getItem(i)).question + '</td><td  class="col-4">' + JSON.parse(localStorage.getItem(i)).answer + '</td><td  class="col-3">Đáp án bạn đã chọn : ' + JSON.parse(localStorage.getItem(i)).select + '<i style="color: red ; font-size: 25px" class="far fa-check-circle"></i></td></tr>'
								count_key_false += 1;
							}
							console.log("JSON.parse(localStorage.getItem(i)).select",JSON.parse(localStorage.getItem(i)).select);
						}

					});
					var scores = Math.round((parseInt(count_key_true) * 100) / parseInt(new_data.length));
					table += '</tbody></table></div><div class=\"col-2\"></div></div>\n';
					$("#show").html("<div class=\"loader\"></div><div><h1 style='text-align:center'>Đang load kết quả</h1></div>");
					setTimeout(function () {
						$("#result").html('<div style="background:aliceblue"><div class="row"><div class="col-12" style="text-align: center"><h1 style="color: yellowgreen">Bạn đã trả lời đúng ' + count_key_true + '/ ' + new_data.length + ' câu </h1></div><div class="col-12"><div class="row"><div class="col-2"></div><div style="text-align: center" class="col-4"><lable style="text-align: center;font-size: 40px;color: #0f9e60">' + count_key_true + '</lable><i style="color: #0f9e60 ; font-size: 36px" class="far fa-check-circle"></i></div><div style="text-align: center" class="col-4"><lable style="text-align: center;font-size: 40px;color: orangered">' + count_key_false + '</lable><i style="color: red;font-size: 36px" class="far fa-check-circle"></i></div><div class="col-2"></div></div></div></div></div>\n');
						$("#end").html(table);
						$("#scores").html('<div class="row"><div class="col-2"></div><div style="text-align: center" class="col-8"><h1>Điểm của bạn : ' + scores + ' </h1><h1><a href="http://web.btgcp-en.io/jquerry/v1/demo2">Chơi lại</a></h1></div><div class="col-2"></div></div>\n');
					}, 2000);
					for (i = 1; i <= new_data.length; i++) {
						console.log("Đã xóa ", i)
						 localStorage.removeItem("select" + categoryId + i);
					}
					clearTimeout(timeout)
				} else {
					$(" button ").click(function () {
						var select = $(this).val();
						var countdown = $(" #countdown").val();
						var question = new_data[j].question;
						var count_data = new_data.length;
						var answer = new_data[j].answer;
						console.log("Cau hoi", select)
						if (select == answer) {
							localStorage.setItem('select' + categoryId + (j + 1), '{"question" : "' + question + '","check" : "true" ,"id" : ' + (j + 1) + ' , "answer" : ' + '"' + answer + '"' + ' , "select" : ' + '"' + select + '"' + '}');
						} else {
							localStorage.setItem('select' + categoryId + (j + 1), '{"question" : "' + question + '","check" : "false" ,"id" : ' + (j + 1) + ' ,"answer" : ' + '"' + answer + '"' + ' , "select" : ' + '"' + select + '"' + '}');
						}
						console.log("TUI DA CLICK")
						$("#show").html("<div class=\"loader\"></div><div><h1 style='text-align:center'>Đang load kết quả</h1></div>");
						// setTimeout(function () {
							var table = '<div class=\"row\" style=\"text-align: center\"><div class=\"col-2\"></div><div class=\"col-8\"><table style="font-size: 20px" class=\"table table-bordered\"><thead><tr><th class=\"col-1\">STT</th><th class=\"col-4\">Câu hỏi </th><th  class=\"col-4\">Đáp án đúng</th><th  class=\"col-3\">Bạn trả lời</th></tr></thead><tbody>';
							let keysLocal = Object.keys(localStorage);
							var count_key_true = 0;
							var count_key_false = 0;
							keysLocal.map(i => {
								if (i.includes("select" + categoryId)) {
									if (JSON.parse(localStorage.getItem(i)).check == "true") {
										table += '<tr><td class="col-1">' + JSON.parse(localStorage.getItem(i)).id + '</td><td  class="col-4">' + JSON.parse(localStorage.getItem(i)).question + '</td><td  class="col-4">' + JSON.parse(localStorage.getItem(i)).answer + '</td><td  class="col-3">Đáp án bạn đã chọn : ' + JSON.parse(localStorage.getItem(i)).select + '<i style="color: #0f9e60 ; font-size: 25px" class="far fa-check-circle"></i></td></tr>'
										count_key_true += 1;
										console.log("TRUE");
									}
									if (JSON.parse(localStorage.getItem(i)).check == "false") {
										console.log("DÃ FALE");
										table += '<tr><td class="col-1">' + JSON.parse(localStorage.getItem(i)).id + '</td><td  class="col-4">' + JSON.parse(localStorage.getItem(i)).question + '</td><td  class="col-4">' + JSON.parse(localStorage.getItem(i)).answer + '</td><td  class="col-3">Đáp án bạn đã chọn : ' + JSON.parse(localStorage.getItem(i)).select + '<i style="color: red ; font-size: 25px" class="far fa-check-circle"></i></td></tr>'
										count_key_false += 1;
									}
								}

							});
							var scores = Math.round((parseInt(count_key_true) * 100) / parseInt(new_data.length));
							table += '</tbody></table></div><div class=\"col-2\"></div></div>\n';
							$("#result").html('<div style="background:aliceblue" ><div class="row"><div class="col-12" style="text-align: center"><h1 style="color: yellowgreen">Bạn đã trả lời đúng ' + count_key_true + '/ ' + new_data.length + ' câu </h1></div><div class="col-12"><div class="row"><div class="col-2"></div><div style="text-align: center" class="col-4"><lable style="text-align: center;font-size: 40px;color: #0f9e60">' + count_key_true + '</lable><i style="color: #0f9e60 ; font-size: 36px" class="far fa-check-circle"></i></div><div style="text-align: center" class="col-4"><lable style="text-align: center;font-size: 40px;color: orangered">' + count_key_false + '</lable><i style="color: red;font-size: 36px" class="far fa-check-circle"></i></div><div class="col-2"></div></div></div></div></div>\n');
							$("#end").html(table);
							$("#scores").html('<div class="row"><div class="col-2"></div><div style="text-align: center" class="col-8"><h1>Điểm của bạn : ' + scores + ' </h1><h1><a href="http://web_tu_lam.khaiho.io/QuestionGame/">Chơi lại</a></h1></div><div class="col-2"></div></div>\n');
							$.ajax({
								url: 'http://web_tu_lam.khaiho.io/api/list_page_question/'+categoryId,
								type: 'GET',
								dataType: 'json', // added data type
							}).then(function (res) {
								console.log("RES",res);
								var total_page = res.total_page;
								var str = '';
								for (var i = 1 ; i <= total_page ; i ++){
									str += '<li class="page-item"><a href="http://web_tu_lam.khaiho.io/QuestionGame/'+res.slug_category+'?page='+i+'" class="page-link">'+i+'</a></li>';
								}
								$(" #list_paginate ").html(str);

							})
							// }, 2000);
						setTimeout(function () {
							for (i = 1; i <= new_data.length; i++) {
								console.log("Đã xóa ", i)
								 localStorage.removeItem("select" + categoryId + i);
							}
						},4000)
						// clearTimeout(timeout)
					});
					timeout = setTimeout(function () {
						s = parseInt($("input#s_input").val());
						start(s - 1);
					}, 1000);

				}

			}
			if ((j + 1) < new_data.length) {
				click()
				timeout = setTimeout(function () {
					s = parseInt($("input#s_input").val());
					start(s - 1);
				}, 1000);
			} else {
				clearTimeout(timeOut)
			}

		}

		j = parseInt($("#s").val());
		let timeOut = setTimeout(function () {
			start();

		}, 1000);

	});
// Used like so
