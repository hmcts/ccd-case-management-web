let CCDStringField = require('../../ccd-components/fields/ccdStringField.js');
let Collection = require('../../ccd-components/fields/ccdCollection.js');

class CreateQandAPage extends CreateCaseWizardPage {

  constructor() {
    super();

    this._qandaCollectionID = '#qanda';
    this.collectionOfQandA = new Collection('#qanda', new QuestionsAndAnswersCollection());
    this._judgeNotesCollectionID = '#judgeNotes';
    this.collectionOfjudgeNotes = new Collection('#judgeNotes', new JudgeNotesCollection());
  }

  async getCollectionOfQandA(index) {
    return await new Collection(this._qandaCollectionID, new QuestionsAndAnswersCollection()).getCollectionItem(index);
  }

  async getCollectionOfJudgeNotes(index) {
    return await new Collection(this._judgeNotesCollectionID, new JudgeNotesCollection()).getCollectionItem(index);
  }

  async clickAddNewQandAButton() {
    await this.collectionOfQandA.clickAddNewButton();
  }

  async clickAddNewjudgeNotesButton() {
    await this.collectionOfjudgeNotes.clickAddNewButton();
  }
}

class JudgeNotesCollection {
  async initialiseFields(collectionId, collectionOrderIndex) {
    this.id = collectionId;

    this.note = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(1) input`, `judgeNotes.${collectionOrderIndex}.note`);
  }

  async enterNote(text) {
    await this.note.enterText(text);
  }
}

class QuestionsAndAnswersCollection {

  async initialiseFields(collectionId, collectionOrderIndex) {
    this.id = collectionId;

    this.question = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(1) input`, `qanda.${collectionOrderIndex}.question`);
    this.answer = new CCDStringField(`${this.id} > ccd-field-write:nth-of-type(1) input`, `qanda.${collectionOrderIndex}.answer`);
  }

  async enterQuestion(text) {
    await this.question.enterText(text);
  }

  async enterAnswer(text) {
    await this.answer.enterText(text);
  }
}

module.exports = CreateQandAPage;
