export class PixiFps extends PIXI.Container {
    private fpsTextField: PIXI.Text;
    private fpsTicker: PIXI.ticker.Ticker;

    private timeValues: number[];
    private lastTime: number;

    constructor(style?: PIXI.TextStyle) {
        super();

        const textStyle = new PIXI.TextStyle({
            fontSize: 30
        });

        if (style) {
            for (const key in style) {
                if (style.hasOwnProperty(key)) {
                    (textStyle as any)[key] = (style as any)[key];
                }
            }
        }
        this.timeValues = [];
        this.lastTime = new Date().getTime();
        this.fpsTextField = new PIXI.Text("", textStyle);

        this.fpsTicker = new PIXI.ticker.Ticker();
        this.fpsTicker.add(this.measureFPS.bind(this));
        this.fpsTicker.start();

        this.addChild(this.fpsTextField);
    }

    private measureFPS(): void {
        const currentTime = new Date().getTime();
        this.timeValues.push(1000 / (currentTime - this.lastTime));

        if (this.timeValues.length === 30) {
            let total = 0;
            for (let i = 0; i < 30; i++) {
                total += this.timeValues[i];
            }

            this.fpsTextField.text = (total / 30).toFixed(2);

            this.timeValues.length = 0;
        }

        this.lastTime = currentTime;
    }
}
