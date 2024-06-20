import { MessageDescriptor, defineMessage } from "react-intl";

type AirdropCommonQuestion = {
  question: MessageDescriptor;
  answer: MessageDescriptor;
};

export const AIRDROPS_COMMON_QUESTIONS: AirdropCommonQuestion[] = [
  {
    question: defineMessage({
      id: "airdrops.commonQuestions.question1",
      description:
        "Question 1 in the common questions section in the airdrops page",
      defaultMessage:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    }),
    answer: defineMessage({
      id: "airdrops.commonQuestions.answer1",
      description:
        "Answer 1 in the common questions section in the airdrops page",
      defaultMessage:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis fringilla diam. Vivamus ipsum metus, ultricies nec pellentesque eu, rhoncus a ligula. Quisque ut facilisis urna, dictum ultrices nisl.",
    }),
  },
  {
    question: defineMessage({
      id: "airdrops.commonQuestions.question2",
      description:
        "Question 1 in the common questions section in the airdrops page",
      defaultMessage:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    }),
    answer: defineMessage({
      id: "airdrops.commonQuestions.answer2",
      description:
        "Answer 1 in the common questions section in the airdrops page",
      defaultMessage:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis fringilla diam. Vivamus ipsum metus, ultricies nec pellentesque eu, rhoncus a ligula. Quisque ut facilisis urna, dictum ultrices nisl. Curabitur ornare eu est a mollis. Vivamus mollis hendrerit ipsum at scelerisque.",
    }),
  },
];
