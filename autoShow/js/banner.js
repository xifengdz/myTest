var Banner = function(wrap,ul,prevBtn,nextBtn){
	this.autoPlay(wrap,ul,prevBtn,nextBtn);
}

Banner.prototype = {
	autoPlay: function(wrap,ul,prevBtn,nextBtn){
		console.log(this);
		console.log($(this));
		var _this = this;
			this.wrap = $(wrap);
			this.oUl = $(ul);
			this.prevBtn = $(prevBtn);
			this.nextBtn = $(nextBtn);
			this.oLi = this.wrap.find("li");
			this.boxWidth = this.wrap.width();
			this.len = this.oLi.length;
			this.iNow = "1";
			this.autoTimes;

			//设置ul宽度
			this.oUl.width(this.boxWidth * this.len);
			this.oUl.css({"left":-this.boxWidth});

			this.wrap.append("<div class='num-list'></div>");

			this.numList = $(".num-list");

			for(var i=0;i<=this.len-3;i++){
				this.numList.append("<span>"+(i+1)+"</span>");
			}

			this.num = this.numList.find("span");
			this.num.first().addClass("active");

			this.autoTimes = setInterval(function(){
				_this.next();
			},2500);

			this.oLi.hover(function(){
				clearInterval(_this.autoTimes);
			},function(){
				_this.autoTimes = setInterval(function(){
					_this.next();
				},2500);
			});

			this.num.click(function(){
				_this.iNow = $(this).index();
				_this.doMove();
			});

			this.wrap.hover(function(){
				_this.prevBtn.css({
					"opacity":'1'
				});
				_this.nextBtn.css({
					"opacity":'1'
				});
			},function(){
				_this.prevBtn.css({
					"opacity":'0.5'
				});
				_this.nextBtn.css({
					"opacity":'0.5'
				});
			});


			this.prevBtn.click(function(){
				_this.prevShow();
			});
			this.nextBtn.click(function(){
				_this.nextShow()
			});

	},

	next: function(){
		this.iNow++;
		this.iNow >= this.len ? this.iNow = 1 : this.iNow;
		this.doMove();
	},
	prevShow: function(){
		this.iNow = this.iNow-1;
		this.iNow < 0 ? this.iNow= this.len-2 : this.iNow;
		this.doMove();
	},
	nextShow: function(){
		this.next();
	},
	doMove: function(){
		var _this = this;
		clearInterval(_this.autoTimes);
		this.oUl.stop().animate({"left":-(_this.iNow * _this.boxWidth)},700,function(){
			if(_this.iNow == _this.len-1){
				_this.oUl.css({"left":-_this.boxWidth});
				_this.iNow = 1;
			}
			if(_this.iNow == 0){
				_this.oUl.css({"left":-((_this.len-2) * _this.boxWidth)});
				_this.iNow = _this.len-2;
			}
			_this.autoActive();
		});
		_this.autoTimes = setInterval(function(){
					_this.next();
				},2500);

	},
	autoActive: function(){
		this.num.eq(this.iNow-1).addClass("active").siblings("span").removeClass("active");
	},

}