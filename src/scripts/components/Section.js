export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        this.containerSelector = document.querySelector(containerSelector);
    }

    renderItems() {
        this.items.forEach(cardInfo => {
            this.renderer(cardInfo)
        });
    }

    addDefaultCards(element) {
        this.containerSelector.append(element);
    }

    addNewCard(element) {
        this.containerSelector.prepend(element);
    }
}