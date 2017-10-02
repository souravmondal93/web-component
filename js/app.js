(function (window, document, undefined) {

    const serverURL = '//localhost';
    const port = '8000';

    const serverFullURL = serverURL + ':' + port;
    const endpoint = '/questions';
    const optionsEndpoint = '/options?question=';

    const mainWrapper = document.getElementsByClassName('main-content');
    const link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', '../components/dv-card.html');
    link.onload = function () {
        // do stuff with import content
        getHttpRequest(serverFullURL + endpoint, function(response) {
            let allQuestions = JSON.parse(response);
            allQuestions.forEach((question, idx) => {
                if (question['has_options']) {
                    getHttpRequest(serverFullURL + optionsEndpoint + question['id'], function(optionsResponse) {
                        allQuestions[idx]['options'] = JSON.parse(optionsResponse);

                        if (question['id'] === 6) {
                            addQuestions(allQuestions);
                            addSubmitBtn();
                        }
                    });
                }
            });
        });
    };
    document.body.appendChild(link);

    function getHttpRequest(url, callback) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        };
        xmlHttp.open('GET', url, true);
        xmlHttp.send(null);
    }

    function addQuestions(questions) {
        questions.forEach((question) => {
            const dvCardComponent = document.createElement('dv-card');
            dvCardComponent.setAttribute('question', JSON.stringify(question));
            mainWrapper[0].append(dvCardComponent);
        });
    }

    function addSubmitBtn() {
        const submitBtn = document.createElement('button');
        submitBtn.className ='btn-large submit-btn red';
        submitBtn.innerHTML = ('Submit').toUpperCase();
        submitBtn.addEventListener('click', submitBtnEventHandler.bind(this));
        mainWrapper[0].appendChild(submitBtn);
    }

    function submitBtnEventHandler() {
        const allDvCards = document.querySelectorAll('dv-card');
        let isAllAnswersValid = true;
        allDvCards.forEach((dvCard, idx) => {
            const isAnswerValid = dvCard.shadowRoot.querySelector('dv-answer').isAnswerValid;
            if (!isAnswerValid) {
                isAllAnswersValid = false;
                addInvalidStatus(idx);
            } else {
                removeInvalidStatus(idx);
            }
        });

        if (isAllAnswersValid) {
            showSuccessBox();
        }
    }

    function addInvalidStatus(idx) {
        const selectedDvCard = document.querySelectorAll('dv-card')[idx];
        const cardTitle = selectedDvCard.shadowRoot.querySelector('.dv-card-title');
        if (!cardTitle.classList.contains('red-text')) {
            cardTitle.innerHTML += '<small class="required-text">This is a required field.</small>';
            cardTitle.classList.add('red-text');
        }
    }

    function removeInvalidStatus(idx) {
        const selectedDvCard = document.querySelectorAll('dv-card')[idx];
        const cardTitle = selectedDvCard.shadowRoot.querySelector('.dv-card-title');
        if (cardTitle.classList.contains('red-text')) {
            cardTitle.removeChild(cardTitle.childNodes[1]);
            cardTitle.classList.remove('red-text');
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