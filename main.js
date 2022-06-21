const readline = require('readline-sync'); //install the package readline-sync: npm install readline-sync -S
const fs = require('fs');
const questionnaireF = fs.readFileSync('questionnaire.json', 'utf8');
questionnaire = JSON.parse(questionnaireF);

try {
    //exist сhecking for result.json file.
    const oldJsonResultF = fs.readFileSync('result.json', 'utf8');
    oldParseJsonResult = JSON.parse(oldJsonResultF);
}
catch (err) {

}

let result = {
    paths: {
        number: null, list: [

        ]
    }
};

function getReplies(result) {
    result.paths.number = 1;
    let userReply = null;

    console.log(questionnaire.questionnaire[0].qn);
    userReply = readline.question((questionnaire.questionnaire[0].reply) + "\npositive answer - 1, negative answer - 0\n");
    switch (userReply == 1 ? questionnaire.questionnaire[0].reply[0] : questionnaire.questionnaire[0].reply[1]) {
        case "Married":
            result.paths.list.push({ [questionnaire.questionnaire[0].qn]: "Married" });
            console.log(questionnaire.questionnaire[2].qn);
            userReply = readline.question((questionnaire.questionnaire[2].reply) + "\npositive answer - 1, negative answer - 0\n");
            switch (userReply == 1 ? questionnaire.questionnaire[2].reply[0] : questionnaire.questionnaire[2].reply[1]) {
                case "More than a year":
                    result.paths.list.push({ [questionnaire.questionnaire[2].qn]: "More than a year" });
                    console.log(questionnaire.questionnaire[3].qn);
                    userReply = readline.question((questionnaire.questionnaire[3].reply) + "\npositive answer - 1, negative answer - 0\n");
                    switch (userReply == 1 ? questionnaire.questionnaire[3].reply[0] : questionnaire.questionnaire[3].reply[1]) {
                        case "Yes":
                            result.paths.list.push({ [questionnaire.questionnaire[3].qn]: "Yes" });
                            break;
                        case "No":
                            result.paths.list.push({ [questionnaire.questionnaire[3].qn]: "No" });
                            break;
                    }
                    break;
                case "Less than a year":
                    result.paths.list.push({ [questionnaire.questionnaire[2].qn]: "Less than a year" });
                    break;
            }
            break;
        case "Single":
            result.paths.list.push({ [questionnaire.questionnaire[0].qn]: "Single" });
            console.log(questionnaire.questionnaire[1].qn);
            userReply = readline.question((questionnaire.questionnaire[1].reply) + "\npositive answer - 1, negative answer - 0\n");
            switch (userReply == 1 ? questionnaire.questionnaire[1].reply[0] : questionnaire.questionnaire[1].reply[1]) {
                case "Yes":
                    result.paths.list.push({ [questionnaire.questionnaire[1].qn]: "Yes" });
                    break;
                case "No":
                    result.paths.list.push({ [questionnaire.questionnaire[1].qn]: "No" });
                    break;
            }
            break;
    }
    return result;
}

let newPaths = getReplies(result);

try {
    //exist сhecking for previous paths.
    oldParseJsonResult.paths.number += newPaths.paths.number;
    oldParseJsonResult.paths.list.push(newPaths.paths.list);
    const redyToWrite = JSON.stringify(oldParseJsonResult);
    fs.writeFileSync('result.json', redyToWrite);
}
catch (err) {
    let newPathsOnce = {
        paths: {
            number: newPaths.paths.number, list: [
                newPaths.paths.list,
            ]
        }
    };
    const redyToWrite = JSON.stringify(newPathsOnce);
    fs.writeFileSync('result.json', redyToWrite);
}



