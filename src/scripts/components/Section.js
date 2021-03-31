export default class Section {
    constructor({ data, renderer }, containerSelector) {
        //this.data = data;
        this.renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }

    setItems(element) {
        this.container.append(element);
    }

    renderItems(data) {
        data.forEach((cardInfo) => {
            this.renderer(cardInfo);
        })
    }
}