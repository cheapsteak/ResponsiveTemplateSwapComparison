var repos = [{"name":"bootstrap","owner":{"html_url":"https://github.com/twbs","login":"twbs"},"html_url":"https://github.com/twbs/bootstrap","size":"64893","forks":"20018","open_issues":"159","watchers":"58229"},{"name":"node","owner":{"html_url":"https://github.com/joyent","login":"joyent"},"html_url":"https://github.com/joyent/node","size":"380079","forks":"4731","open_issues":"633","watchers":"24526"},{"name":"jquery","owner":{"html_url":"https://github.com/jquery","login":"jquery"},"html_url":"https://github.com/jquery/jquery","size":"22400","forks":"4899","open_issues":"7","watchers":"23630"},{"name":"html5-boilerplate","owner":{"html_url":"https://github.com/h5bp","login":"h5bp"},"html_url":"https://github.com/h5bp/html5-boilerplate","size":"73410","forks":"5422","open_issues":"8","watchers":"22283"},{"name":"rails","owner":{"html_url":"https://github.com/rails","login":"rails"},"html_url":"https://github.com/rails/rails","size":"220428","forks":"6557","open_issues":"741","watchers":"19587"}];

var tableTemplate = Handlebars.compile($('#table-template').html()),
    listTemplate = Handlebars.compile($('#list-template').html());

var ResponsiveView = Backbone.View.extend({
    initialize: function () {
        var self = this;
        if (window.matchMedia) {
            var mqlHandler = function (mql) {
            if (mql.matches) {
                self.template = tableTemplate;
            } else {
                self.template = listTemplate;
            }
                self.render();
            };
            var widthCheck = window.matchMedia("(min-width: 44.375em)");
            widthCheck.addListener(mqlHandler);
            mqlHandler(widthCheck);
        } else {
            self.template = tableTemplate; //IE9 and older
        }
    },
    render: function () {
        var html = this.template({repos: repos});
        this.$el.html(html);
    },
});

new ResponsiveView({
    el: '#gitRepos'
});
