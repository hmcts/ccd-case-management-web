class Collection {

  constructor(css){
      this.css = css;
      this.label = this.getLabel();

  }

  async getLabel(){
    return await $(`${this.css} h3:nth-of-type(1)`).getText();
  }

}

module.exports = Collection;
