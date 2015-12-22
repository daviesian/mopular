import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";

@Component({
    selector: "slider",
    template: `
        <div #outer class="outer" (mousemove)="onMouseMove($event, outer)" (mousedown)="onMouseMove($event, outer)">
            <div class="inner" [style.width.%]="value*100"></div>
            <div class="dot" [style.left.%]="value*100"></div>
        </div>
    `,
    styles: [`
        .outer {
            height: 20px;
            background: #e0efff;
            position: relative;
            cursor: pointer;
            border: 1px solid black;
            border-bottom:none;
        }

        .inner {
            position: absolute;
            left: 0;
            width: 0%;
            top: 9px;
            height: 2px;
            background: black;
        }
        .dot {
            position: absolute;
            margin-left: -5px;
            border-radius: 8px;
            top: 3px;
            width: 10px;
            height: 10px;
            border: 2px solid black;
            background: white;
        }
    `],
})
export class SliderComponent {

    @Input() value;
    @Output() valueChanged = new EventEmitter();

    onMouseMove(e, outer) {
        if (e.which > 0) {
            var f = e.layerX / outer.clientWidth;

            this.value = Math.round(f*100)/100.0;
            this.valueChanged.emit(f);

        }
    }
}