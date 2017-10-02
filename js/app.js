(function (window, document, undefined) {

    const questions = [
        { id: 1, title: 'Your name', type: 'text', mandatory: true, has_options: false },
        { id: 2, title: 'Your email', type: 'email', mandatory: true, has_options: false },
        { id: 3, title: 'Your contact number', type: 'number', mandatory: true, has_options: false },
        { id: 4, title: 'How likely is that you recommend this survey to a friend or a colleague?', type: 'rating', mandatory: true, has_options: false },
        { id: 5, title: 'Overall how satisfied or dissatisfied are you with this survey?', type: 'radio', mandatory: true, has_options: true, options: [
            { value: 'satisfied', label: 'Satisfied' },
            { value: 'somewhat_safisfied', label: 'Somewhat satisfied' },
            { value: 'dissatisfied', label: 'Dissatisfied' },
            { value: 'somewhat_dissafisfied', label: 'Somewhat dissatisfied' },
            { value: 'neither', label: 'Neither satisfied not dissatisfied' }
        ] },
        { id: 6, title: 'Which of the following words would you use to describe our product? Select all that apply', type: 'checkbox', mandatory: true, has_options: true, options: [
            { value: 'reliable', label: 'Reliable' },
            { value: 'useful', label: 'Useful' },
            { value: 'unique', label: 'Unique' },
            { value: 'overpriced', label: 'Overpriced' },
            { value: 'impratical', label: 'Impractical' },
            { value: 'ineffective', label: 'Ineffective' },
        ] },
        { id: 7, title: 'Do you have any comments or concerns?', type: 'textarea', mandatory: false, has_options: false },
    ];

    const mainWrapper = document.getElementsByClassName('main-content');
    const link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', '../components/dv-card.html');
    link.onload = function () {
        // do stuff with import content
        addQuestions(questions);
        addSubmitBtn();
    };
    document.body.appendChild(link);

    function addQuestions(questions) {
        questions.forEach((question) => {
            const dvCardComponent = document.createElement('dv-card');
            dvCardComponent.setAttribute('question', JSON.stringify(question));
            mainWrapper[0].append(dvCardComponent);
        });
    }

    function addSubmitBtn() {
        const submitBtn = document.createElement('button');
        submitBtn.className ='btn-large submit-btn';
        submitBtn.innerHTML = ('Submit').toUpperCase();
        submitBtn.addEventListener('click', submitBtnEventHandler.bind(this));
        mainWrapper[0].appendChild(submitBtn);
    }

    function submitBtnEventHandler() {
        const allDvCards = document.querySelectorAll('dv-card');
        let isAllAnswersValid = true;
        allDvCards.forEach((dvCard) => {
            const isAnswerValid = dvCard.shadowRoot.querySelector('dv-answer').isAnswerValid;
            if (!isAnswerValid) {
                isAllAnswersValid = false;
            }
        });

        if (isAllAnswersValid) {
            showSuccessBox();
        }
    }

    function showSuccessBox() {
        mainWrapper[0].innerHTML = '';
        const successBoxHTML = `
            <div class="success-box center-align">
                <div class="card small">
                    <div class="card-content">
                        <h2 class="congrats-text">Congrats!</h2>
                        <h4 class="flow-text">
                            Your responses has been recorded. Thank you for your time.
                        </h4>
                    </div>
                </div>
            </div>  
        `;
        mainWrapper[0].innerHTML = successBoxHTML;
    }

})(window, document);