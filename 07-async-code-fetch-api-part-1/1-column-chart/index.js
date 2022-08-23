import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {
    chartHeight = 50;
    subElements = {};

    constructor({
        data = [],
        url = '',
        range = {
          from,
          to
        } = {},
        label = "", 
        link = "", 
        value = 0, 
        formatHeading = data => data} = {}) {
       this.data = data;
       this.url = url;
       this.range = range;
    //    this.range.from = range.from;
    //    this.range.to = range.to;
       this.label = label;
       this.link = link;
       this.value = formatHeading(value);

       this.render();
       this.loadData(this.range.from, this.range.to);
       
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
        const scale = this.chartHeight / maxValue;

        return this.data.map(item => {
            const percent = ((item / maxValue) * 100).toFixed(0);

            return `
                <div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>
            `
        }).join("");
    }

    loadData(from = this.range.from, to = this.range.to) {
        fetch(BACKEND_URL + '/' + this.url + '?' + from.toISOString() + to.toISOString())
            .then(response => {
                const data = response.json();
                return data;
            }).then(data => {
                const result = Object.values(data);
                this.update(result)
            })
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
        const result = {};

        const elements = this.element.querySelectorAll("[data-element='body']");

        for (const subElement of elements) {
            const name = subElement.dataset.element;

            result[name] = subElement;
        }

        return result;
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
