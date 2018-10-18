//Experimental class - Ignore

async function Field(element){
  console.log('pppppppppppppp')
    this.element = element;
    this.optional = isOptionalBoolean(element);
    this.label = getLabel(element);
    this.tagName = getTag(element);


    async function toString() {
      console.log(`label=${this.label} | tag=${this.tagName}`)
    }
    // this.fieldType = tod
  }

  async function getTag(element){
      let tag = await element.getTagName();
      console.log(tag);
      return tag;
  }



  async function getLabel(element) {
    let label =  await element.getAttribute('form-label');
    console.log('label: ' + label);
    return label
  }

  async function isOptionalBoolean(element){
    let optional;
    let attribute = await element.getAttribute('class');
    console.log(attribute);
    if (attribute.contains('ng-valid')){
      console.log('attribute contain valid: this is an optional field');
      optional = true;
    } else if (attribute.contains('ng-invalid')){
      console.log('attribute contain valid: this is a mandatory field');
      optional = false
    } else {
      cosole.log('error')
    }

    return optional;

  }


