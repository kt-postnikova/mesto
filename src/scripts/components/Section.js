export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this.data = data;
        this.renderer = renderer;
        this.container = containerSelector;
    }

    setItems(element) {
        this.container.append(element);
    }

    renderItems() {
        this.data.forEach((cardInfo) => {
            this.renderer(cardInfo);
        })
    }
}