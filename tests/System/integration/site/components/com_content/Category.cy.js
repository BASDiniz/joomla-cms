describe('Test that the articles category menu item type ', () => {
  ['default', 'blog'].forEach((layout) => {
    it(`can display a list of articles in the ${layout} layout in a menu item`, () => {
      cy.db_createArticle({ title: 'article 1' })
        .then(() => cy.db_createArticle({ title: 'article 2' }))
        .then(() => cy.db_createArticle({ title: 'article 3' }))
        .then(() => cy.db_createArticle({ title: 'article 4' }))
        .then(() => cy.db_createMenuItem({ title: 'automated test', link: `index.php?option=com_content&view=category&id=2&layout=${layout}` }))
        .then(() => {
          cy.visit('/');
          cy.get('a:contains(automated test)').click();

          cy.contains('article 1');
          cy.contains('article 2');
          cy.contains('article 3');
          cy.contains('article 4');
        });
    });

    it(`can display a list of articles in the ${layout} layout without a menu item`, () => {
      cy.db_createArticle({ title: 'article 1' })
        .then(() => cy.db_createArticle({ title: 'article 2' }))
        .then(() => cy.db_createArticle({ title: 'article 3' }))
        .then(() => cy.db_createArticle({ title: 'article 4' }))
        .then(() => {
          cy.visit(`/index.php?option=com_content&view=category&id=2&layout=${layout}`);

          cy.contains('article 1');
          cy.contains('article 2');
          cy.contains('article 3');
          cy.contains('article 4');
        });
    });
  });

  it('can open the article form in the default layout', () => {
    cy.db_createArticle({ title: 'article 1' })
      .then(() => cy.db_createMenuItem({ title: 'automated test', link: 'index.php?option=com_content&view=category&id=2&layout=default' }))
      .then(() => {
        cy.doFrontendLogin();
        cy.visit('/');
        cy.get('a:contains(article 1)').click();
        cy.get('.com-content-article a:contains(Edit)').click();

        cy.get('#adminForm').should('exist');
      });
  });
});