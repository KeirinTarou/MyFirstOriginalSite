'use strict';

(() => {
	class ClockDrawer {
		constructor(canvas)
		{
			this.ctx = canvas.getContext('2d');

			this.width = canvas.width;
			this.height = canvas.height;
		}

		draw(angle, func)
		{
			this.ctx.save();

			this.ctx.translate(this.width / 2, this.height / 2);
			this.ctx.rotate(((Math.PI * 2) / 360) * angle);

			this.ctx.beginPath();
			func(this.ctx);
			this.ctx.stroke();

			this.ctx.restore();
		}

		clear()
		{
			this.ctx.clearRect(0, 0, this.width, this.height);
		}
	}

	class Clock {
		constructor(drawer)
		{
			this.r = 100;
			this.drawer = drawer;
		}

		// #02(5)	`drawFace`メソッド追加
		drawFace()
		{
			for (let angle = 0; angle < 360; angle += 6) {	// #03(1)で追加
				// #07(1) 盤面の描画処理をまとめる	next => `ClockDrawer`クラスに`draw`メソッド追加
				this.drawer.draw(angle, (ctx) => {
					ctx.moveTo(0, -this.r);
					if (angle % 30 === 0) {
						// 角度が30の倍数のときのみ太線
						ctx.lineWidth = 2;
						ctx.lineTo(0, -this.r + 10);	// 少し長くする
						// 文字を入れる
						ctx.font = '13px Arial';
						ctx.textAlign = 'center';
						ctx.fillText(angle / 30 || 12, 0, -this.r + 25);	// arg1: 表示する文字, arg2: x, arg3: y
					} else {
						// 他の場合は通常の線
						ctx.lineTo(0, -this.r + 5);
					}
				});
			}
		}

		drawHands()
		{
			// 短針の描画
			this.drawer.draw(this.h * (360 / 12) + this.m * (30 / 60), (ctx) => {
				ctx.lineWidth = 6;
				ctx.moveTo(0, 10);
				ctx.lineTo(0, -(this.r - 50));	// 長針よりも手前に
			});

			// 長針の描画
			this.drawer.draw(this.m * (360 / 60) + this.s * (6 / 60), (ctx) => {
				ctx.lineWidth = 4;	// 短針よりもやや太く
				ctx.moveTo(0, 10);
				ctx.lineTo(0, -(this.r - 30));
			});

			// 秒針の描画
			this.drawer.draw(this.s * (360 / 60), (ctx) => {
				ctx.lineWidth = 1;	// 
				ctx.strokeStyle = 'red';
				ctx.moveTo(0,20);	// 反対側にも伸ばす
				ctx.lineTo(0, -(this.r - 10)); // 長針より少し長く
			});
		}

		update() {
			this.h = (new Date()).getHours();
			this.m = (new Date()).getMinutes();
			this.s = (new Date()).getSeconds();
		}

		run()
		{
			this.drawer.clear();

			this.update();

			this.drawFace();
			this.drawHands();

			setTimeout(() =>{
				this.run();
			}, 100);
		}
	}

	const canvas = document.querySelector('canvas');
	if (typeof canvas.getContext === 'undefined') {
		return;
	}

	const clock = new Clock(new ClockDrawer(canvas));	
	clock.run();
})(); 

{

	const ba90 = document.getElementById('ba-90');
	ba90.addEventListener('click', () => {
		alert('ち～んｗ');
	});

}