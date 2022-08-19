export default class ColumnChart {
    chartHeight = 50;
    subElements = {};

    constructor({data = [], label = "", link = "", value = 0, formatHeading = data => data} = {}) {
       this.data = data;
       this.label = label;
       this.link = link;
       this.value = formatHeading(value);

       this.render();
    }

    getTemplate() {
        return `
            <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
                <div class="column-chart__title">
                    Total ${this.label}
                    ${this.getLink()}
                </div>
                <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">
                        ${this.value}
                    </div>
                    <div data-element="body" class="column-chart__chart">
                        ${this.getColumn()}
                    </div>
                </div>
            </div>
        `
    }

    getLink() {
        return this.link ? `<a href="${this.link} class="column-chart__link">View all</a>` : '';
    }

    getColumn() {
        const maxValue = Math.max(...this.data);
        const scale = 50 / maxValue;

        return this.data.map(item => {
            const percent = ((item / maxValue) * 100).toFixed(0);

            return `
                <div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>
            `
        }).join("");
    }

    render() {
        const element = document.createElement("div");

        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;

        if(this.data.length) {
            this.element.classList.remove('column-chart_loading')
        }

        this.subElements = this.getSubElements(); 
    }

    getSubElements() {
        const resalt = {};

        const elements = this.element.querySelectorAll("[data-element='body']");

        for (const subElement of elements) {
            const name = subElement.dataset.element;

            resalt[name] = subElement;
        }

        return resalt;
    }

    update(data) {
        this.data = data;

        this.subElements.body.innerHTML = this.getColumn();
    }

    remove() {
        if (this.element) {
          this.element.remove();
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = {};
      }
}