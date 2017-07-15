import { F1SchedulePage } from './app.po';

describe('f1-schedule App', () => {
  let page: F1SchedulePage;

  beforeEach(() => {
    page = new F1SchedulePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
