/* @flow */

import SleepTonight from "./SleepTonight";
import BaseQuestion, { append, remove } from "./BaseQuestion";

export default class HousingSubcategories extends BaseQuestion {
    static title = "Housing";
    static propTypes = BaseQuestion.propTypes;
    static defaultProps = {
        name: "sub-housing",
        question: "Which situation is most like yours?",
        answers: {
            "On the street": append("homeless"),
            "Couch surfing": append("homeless"),
            "In a rooming house": remove("housing")
                .append("community housing"),
            "Private rental": append("(transitional housing)")
                .append("(transitional accommodation)")
                .append("(bond scheme)")
                .append("(housing establishment fund)"),
            "Public housing": append("social housing"),
            "Mortgaged housing": append("(transitional housing)")
                .append("(transitional accommodation)")
                .append("(bond scheme)")
                .append("(housing establishment fund)"),
        },
    };

    static showQuestion() {
        /* only show this question if the user has someone to sleep tonight */
        return (SleepTonight.answer != "No");
    }
}
