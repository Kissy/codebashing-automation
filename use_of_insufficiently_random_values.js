var MAPPING = {
    'Which of the following session token creation algorithms is secure?': '1. A random value generated using a secure random number generator'
};

function clickIfAvailable(selector) {
    var elem = document.querySelector(selector);
    if (elem) { elem.click(); }
}

function findReact(dom, traverseUp = 0) {// from https://stackoverflow.com/a/39165137/4831179
    const key = Object.keys(dom).find(key=>key.startsWith("__reactInternalInstance$"));
    const domFiber = dom[key];
    if (domFiber == null) return null;

    // react <16
    if (domFiber._currentElement) {
        let compFiber = domFiber._currentElement._owner;
        for (let i = 0; i < traverseUp; i++) {
            compFiber = compFiber._currentElement._owner;
        }
        return compFiber._instance;
    }

    // react 16+
    const GetCompFiber = fiber=>{
        //return fiber._debugOwner; // this also works, but is __DEV__ only
        let parentFiber = fiber.return;
        while (typeof parentFiber.type == "string") {
            parentFiber = parentFiber.return;
        }
        return parentFiber;
    };
    let compFiber = GetCompFiber(domFiber);
    for (let i = 0; i < traverseUp; i++) {
        compFiber = GetCompFiber(compFiber);
    }
    return compFiber.stateNode;
}

function forwardQuizzSQLInjection() {
    var activeMenu = document.querySelector('.menu .active');
    if (!activeMenu) {
        clickIfAvailable('button.StartPage__button___29qjW');
        var finalQuestion = document.querySelector('.QuestionWithOutCode__questionTitle___31uV8');
        if (finalQuestion) {
            var rightAnswer = MAPPING[finalQuestion.textContent.trim()];
            if (rightAnswer) {
                var answers = document.querySelectorAll('.QuestionWithOutCode__answerBtn___2Q0sK');
                for (var i = 0; i < answers.length; i++) {
                    var currentAnswer = answers[i].textContent.trim();
                    if (rightAnswer === currentAnswer) {
                        answers[i].click();
                        document.querySelector('.QuestionWithOutCode__submitBtn___1acUP').click();
                        break;
                    }
                }
            } else {
                console.log("QUESTION NOT FOUND");
            }
        }
        clickIfAvailable('button.QuizFeedback__try-again___2X19Z');
        clickIfAvailable('button#finish');
    } else {
        switch (activeMenu.textContent) {
            case "1":
                clickIfAvailable('a.-action-Login-');
                break;
            case "2":
                clickIfAvailable('button.next-button');
                break;
            case "3":
                clickIfAvailable('button.next-button');
                clickIfAvailable('button.-action-add-session-');
                break;
            case "4":
                clickIfAvailable('button > i.play');
                clickIfAvailable('button.blue-button-small[data-label="play"]');
                clickIfAvailable('button.blue-button-small[data-label="stop"]');
                clickIfAvailable('button.next-button');
                break;
        }
    }
}

window.setInterval(forwardQuizzSQLInjection, 1000);
