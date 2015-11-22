describe('The homepage', function () {
    beforeEach(function () {
        browser.get('#/');
    });

    it('does stuff', function () {
        expect(element(by.css('.logo')).getText()).toBe('HDpuzzles.com');
    });
});