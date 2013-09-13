var tableTemplate = Handlebars.compile($('#table-template').html()),
    listTemplate = Handlebars.compile($('#list-template').html());

var Repos = Backbone.Model.extend({
    url: "http://query.yahooapis.com/v1/public/yql?q=select%20name%2Cowner.login%2C%20owner.html_url%2Chtml_url%2Csize%2Cwatchers%2Cforks%2Copen_issues%20from%20github.repo%20where%20(repo%3D'bootstrap'%20and%20id%3D'twbs')%20OR%20(repo%3D'node'%20and%20id%3D'joyent')%20OR%20(repo%3D'jquery'%20and%20id%3D'jquery')%20%20OR%20(repo%3D'html5-boilerplate'%20and%20id%3D'h5bp')%20OR%20(repo%3D'rails'%20and%20id%3D'rails')&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?",
    initialize: function () {
        this.fetch();
    }
});

var LoadingView = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.model, 'request', this.show);
        this.listenTo(this.model, 'change', this.hide);
    },
    show: function () {
        this.$el.removeClass('hidden');
    },
    hide: function () {
        this.$el.addClass('hidden');
    }
});
var ResponsiveView = Backbone.View.extend({
    initialize: function () {
        var self = this;
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
        this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
        if (!this.model.attributes.query) { return; } //don't draw empty table with headers if model doesn't have data
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
    },
});

var repos = new Repos();

new ResponsiveView({
    model: repos,
    el: '#gitRepos'
});

new LoadingView({
    model: repos,
    el: '.loading'
});