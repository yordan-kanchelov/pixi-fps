import * as PIXI from 'pixi.js';

export class PixiFps extends PIXI.Container {
    private static readonly DEFAULT_FONT_SIZE: number = 30;
    private static readonly DEFAULT_FONT_COLOR: number = 0xff0000;

    private _fpsTextField: PIXI.Text;
    private _fpsTicker: PIXI.Ticker;

    private _timeValues: number[];
    private _lastTime: number;

    constructor(style?: PIXI.TextStyle) {
        super();

        const defaultStyle = new PIXI.TextStyle({
            fontSize: PixiFps.DEFAULT_FONT_SIZE,
            fill: PixiFps.DEFAULT_FONT_COLOR,
        });

        this._timeValues = [];
        this._lastTime = new Date().getTime();
        this._fpsTextField = new PIXI.Text("", { ...defaultStyle, ...style } as PIXI.TextStyle);

        this._fpsTicker = new PIXI.Ticker();
        this._fpsTicker.add(() => {
            this.measureFPS();
        });
        this._fpsTicker.start();

        this.addChild(this._fpsTextField);
    }

    set style(style: PIXI.TextStyle) {
        this._fpsTextField.style = style;
    }

    private measureFPS(): void {
        const currentTime = new Date().getTime();
        this._timeValues.push(1000 / (currentTime - this._lastTime));

        if (this._timeValues.length === 30) {
            let total = 0;
            for (let i = 0; i < 30; i++) {
                total += this._timeValues[i];
            }

            this._fpsTextField.text = (total / 30).toFixed(2);

            this._timeValues.length = 0;
        }

        this._lastTime = currentTime;
    }
}
