import { PlayerPage } from './app.po';

describe('player App', () => {
  let page: PlayerPage;

  beforeEach(() => {
    page = new PlayerPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
