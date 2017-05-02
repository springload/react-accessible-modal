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
