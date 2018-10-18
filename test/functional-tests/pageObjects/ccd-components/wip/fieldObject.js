
//experimental - ignore
class FieldObject {

  constructor(elem){
    this.element = elem;
    console.log('new field mapped!')
  }

  async getTagg(){
    let tag = await this.element.getTagName();
    console.log(tag);
    return tag;
  }

}

module.exports = FieldObject;
