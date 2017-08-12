import { TestAngular2Page } from './app.po';

describe('test-angular2 App', () => {
  let page: TestAngular2Page;

  beforeEach(() => {
    page = new TestAngular2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
