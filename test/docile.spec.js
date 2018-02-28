window.addEventListener('DOMContentLoaded', function () {
    describe('Docile global', function () {
        var title = document.getElementsByTagName('title')[0];
        it('is an object', function () {
            expect(typeof Docile).toEqual('object');
        });
        it('has all attributes', function () {
            expect(typeof Docile.get).toEqual('function');
            expect(typeof Docile.set).toEqual('function');
            expect(typeof Docile.link).toEqual('function');
            expect(typeof Docile.store).toEqual('object');
            expect(typeof Docile.linkStore).toEqual('object');
        });
        it('can set and get data', function () {
            Docile.set(title, 'jelly beans');
            expect(Docile.get(title)).toEqual('jelly beans');
        });
        it('can set and get data using node ids', function () {
            title.setAttribute('id', 'title');
            Docile.set('title', 'caramel');
            expect(Docile.get(title)).toEqual('caramel');
        });
    });

    describe('Docile link', function () {
        var title = document.getElementsByTagName('title')[0];
        it('creates objects', function () {
            var titleLink = Docile.link(title);
            expect(typeof titleLink).toEqual('object');
        });
        it('has all attributes', function () {
            var titleLink = Docile.link(title);
            expect(typeof titleLink.id).toEqual('string');
            expect(typeof titleLink.set).toEqual('function');
            expect(typeof titleLink.get).toEqual('function');
            expect(typeof titleLink.getData).toEqual('function');
        });
        it('can set and get links', function () {
            var titleLink = Docile.link(title);
            titleLink.set('thehead', document.head);
            expect(titleLink.get('thehead')).toEqual(document.head);
            expect(titleLink.get().thehead).toEqual(document.head);
        });
        it('can get data from links', function () {
            var titleLink = Docile.link(title);
            Docile.set(document.head, 'chocolate');
            titleLink.set('brain', document.head);
            expect(titleLink.getData('brain')).toEqual('chocolate');
            expect(titleLink.getData().brain).toEqual('chocolate');
        });
    });
});

window.jasmine.getEnv().addReporter(new window.jasmine.JSReporter2());