export default class Section {
    constructor({ items, renderer }, containerSelector) {
        //this.items = items;
        this.renderer = renderer;
        this.containerSelector = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(cardInfo => {
            this.renderer(cardInfo)
        });
    }

    addItem(isNewCard, element) {
        if (isNewCard) {
            this.containerSelector.prepend(element);
        }
        else {
            this.containerSelector.append(element);
        }
    }
}