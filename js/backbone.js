var repos = [{"name":"bootstrap","owner":{"html_url":"https://github.com/twbs","login":"twbs"},"html_url":"https://github.com/twbs/bootstrap","size":"64893","forks":"20018","open_issues":"159","watchers":"58229"},{"name":"node","owner":{"html_url":"https://github.com/joyent","login":"joyent"},"html_url":"https://github.com/joyent/node","size":"380079","forks":"4731","open_issues":"633","watchers":"24526"},{"name":"jquery","owner":{"html_url":"https://github.com/jquery","login":"jquery"},"html_url":"https://github.com/jquery/jquery","size":"22400","forks":"4899","open_issues":"7","watchers":"23630"},{"name":"html5-boilerplate","owner":{"html_url":"https://github.com/h5bp","login":"h5bp"},"html_url":"https://github.com/h5bp/html5-boilerplate","size":"73410","forks":"5422","open_issues":"8","watchers":"22283"},{"name":"rails","owner":{"html_url":"https://github.com/rails","login":"rails"},"html_url":"https://github.com/rails/rails","size":"220428","forks":"6557","open_issues":"741","watchers":"19587"}];
// Normally a Backbone Model would be used to fetch data

var ResponsiveView = Backbone.View.extend({
    mqlListener: function (mql, matchedTemplate, unmatchedTemplate) {
        if (mql.matches) {
            this.template = matchedTemplate;
        } else {
            this.template = unmatchedTemplate;
        }
        this.render();
    },
    initialize: function (options) {
        var matchedTemplate = options.matchedTemplate,
            unmatchedTemplate = options.unmatchedTemplate;
        if (window.matchMedia) {
            this.mql = window.matchMedia("("+options.breakpoint+")");
            this.mql.addListener(_.bind(this.mqlListener, this, this.mql, matchedTemplate, unmatchedTemplate));
            this.mqlListener(this.mql, matchedTemplate, unmatchedTemplate); //do an initial check when page loads
        } else {
            this.template = matchedTemplate; //IE9 and older
        }
    },
    render: function () {
        var html = this.template({repos: repos});
        this.$el.html(html);
    },
    remove: function () {
        this.mql.removeListener(this.mqlListener);
        Backbone.View.prototype.remove.call(this);
    }
});

$(function () {
    var tableTemplate = Handlebars.compile($('#table-template').html()),
        cardTemplate = Handlebars.compile($('#card-template').html());
    new ResponsiveView({
        el: '#gitRepos',
        breakpoint: 'min-width: 44.375em',
        matchedTemplate: tableTemplate,
        unmatchedTemplate: cardTemplate
    });
});