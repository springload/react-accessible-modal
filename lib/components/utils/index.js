export function whichAnimationEvent() {
    let tr;
    const el = document.createElement('fakeelement');
    const transitions = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
    };

    for (tr in transitions) {
        if (el.style[tr] !== undefined) {
            return transitions[tr];
        }
    }
}


// Returns event target, supporting IE6-8
export function getEventTarget(event) {
    if (event) {
        return event.target || event.srcElement;
    }
    return false;
}

