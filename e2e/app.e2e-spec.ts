import { GithubIssuesPage } from './app.po';

describe('github-issues App', () => {
  let page: GithubIssuesPage;

  beforeEach(() => {
    page = new GithubIssuesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
