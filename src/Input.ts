export class Action {
    constructor(public event: Event) {  }
}

let actions: Action[] = [];

export function initializeInputListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener('keydown', function(event) {
        actions.push(new Action(event));
    });

    canvas.addEventListener('click', function(event) {
        actions.push(new Action(event));
    });
}


export function ProcessInputFunction() {
    console.log("processing input...");

    while (actions.length !== 0) {
        let nextAction = actions.shift();

        if (typeof nextAction !== 'undefined') {
            console.log("Responding to action: " + nextAction.event);
        }
    }
}