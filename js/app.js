(function (window, document, undefined) {

    const questions = [
        {id: 1, title: 'Your name', type: 'text', mandatory: true, has_options: false},
        {id: 2, title: 'Your email', type: 'email', mandatory: true, has_options: false},
        {id: 3, title: 'Your contact number', type: 'number', mandatory: true, has_options: false},
    ];

    const link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', '../components/dv-card.html');
    link.onload = function () {
        // do stuff with import content
        const dvCardComponent = document.createElement('dv-card');
        dvCardComponent.setAttribute('question', JSON.stringify(questions[0]));
        const mainWrapper = document.getElementsByClassName('main-content');
        mainWrapper[0].appendChild(dvCardComponent);
    };
    document.body.appendChild(link);

})(window, document);