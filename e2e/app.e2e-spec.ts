import { Ng2CrudTablePage } from './app.po';

describe('ng2-crud-table App', () => {
  let page: Ng2CrudTablePage;

  beforeEach(() => {
    page = new Ng2CrudTablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
