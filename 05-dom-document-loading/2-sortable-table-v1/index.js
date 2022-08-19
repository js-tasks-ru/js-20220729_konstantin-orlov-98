export default class SortableTable {
  subElements = {};
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render()
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getColumnHeader()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getColumnBody()}
          </div>
        </div>
      </div>
    `
  }

  getColumnHeader() {
    return this.headerConfig.map(item => {
        return `
          <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
            <span>${item.title}</span>
            <span data-element="arrow" class="sortable-table__sort-arrow"> <span class="sort-arrow"></span> </span>
          </div>
        `
    }).join("");
  }

  getColumnBody(arr = this.data) {
    return arr.map(item => {
      return `
        <a href='/products/${item.id}' class="sortable-table__row">
          ${this.headerConfig.map(elem => {
            if(elem.id === 'images') return elem.template(item.images);

            return `
              <div class="sortable-table__cell">${item[elem.id]}</div>
            `
          }).join("")}
        </a>
      `
    }).join("");
  }

  sort(field, order) {
    const obj = this.sortData(field, order);

    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);
    console.log(currentColumn)

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getColumnBody(obj)
  }

  sortData(field, order = 'asc') {
    const newArr = [...this.data]
    const column = this.headerConfig.find(j => j.id === field);

    const directions = {
      asc: 1,
      desc: -1
    }
    const direction = directions[order];

    return newArr.sort((a, b) => {
      if (column.sortType === 'string') {
        return direction * (a[field].localeCompare(b[field], ['ru', 'en'], {caseFirst: 'upper', sensitivity: 'case'}));
      } else if (column.sortType === 'number') {
        return direction * (a[field] - b[field])
      }
    })
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.getTemplate();

    const element = wrapper.firstElementChild;
    this.element = element;
    this.subElements = this.getSubElements(element);
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  remove () {
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