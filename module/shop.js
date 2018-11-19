define(["jquery","template","content","cookie"],function($,template,content){
	function Shop(){
	
	}
 	var cartt = $.cookie("cart");
 	console.log(cartt);
	if(cartt){
		var carttt = JSON.parse(cartt);
	}
 	//；
	Shop.prototype.cart = function(){
		//拼接到页面
		var html = template("shopcart",{catt:carttt});
		$("#shop-content").html(html);
	},	
	Shop.prototype.check = function(){
		$(function(){
			var allnum = 0;
			//全选并且计算价格
			$("#check").click(function(){
				$(".chec").prop('checked',this.checked);
				//遍历所有价格乘以数量
					allnum = 0;
					for(var item of carttt){
					allnum+=item.price * item.num;
					$(".pri").text(allnum);
					}
			
			});
			//单选计算价格
			$(".chec").click(function(){
				var jiage = 0;
				$.each($(".chec:checked"),function(){
					//遍历选中的框计算选中价格
 					var $arr=$(this).parent().siblings(".price").children(".spanprice").text();
 					var aa = $(this).parent().siblings(".number").children(".number-box").children(".num").text();
 					var a = Number($arr);
					console.log(aa);
					console.log($arr);
 					var b = Number(aa);
 					jiage += a*b;

				})
				$(".pri").text(jiage);
				if($(".chec").length == $(".chec:checked").length){
					$("#check").prop('checked',true);
				}else{
					$("#check").prop('checked',false);
				}
			})
		})		
	},
	Shop.prototype.num = function(){
		var $plus = $(".plus");
		var $reduce = $(".reduce");
		console.log($plus);
		$plus.click(function(){
			var plus = parseInt($(this).prev().text())+1;
			$(this).prev().text(plus);
		})
		$reduce.click(function(){
			var reduce = parseInt($(this).prev().prev().text())-1;
			console.log(reduce);
			if(reduce < 1){
				$(this).prev().prev().text(1);
			}else{
				$(this).prev().prev().text(reduce);
				
			}
		})
	},
	Shop.prototype.del = function(){
		$(".del").click(function(){
			//删除单条页面数据，cookie数据暂时不会清除
			$(this).parent().parent().remove();
		})
	}
	
	
	
	return new Shop();
})