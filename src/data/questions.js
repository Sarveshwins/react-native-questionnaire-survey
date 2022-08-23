export default [
  {
    id: 1,
    question: "Do you smoke?",
    questionType: "RADIOBUTTON",
    options: [
      {
        optionText: "Yes",
        optionValue: "yes",
      },
      {
        optionText: "No",
        optionValue: "no",
      },
    ],
    validation: [
      {
        type: "REQUIRED",
        message: "This field is required",
        dataType: "STRING",
      },
      {
        type: "MINLENGTH",
        message: "This field must be at least 2 characters long",
        value: 2,
      },
      {
        type: "MAXLENGTH",
        message: "This field must be less than 10 characters long",
        value: 10,
      },
    ],

    answer: "",
  },
  {
    id: 2,
    question: "What is your age?",
    questionType: "NUMBER",
    placeholder: "Enter your age",
    options: [],
    answer: "",
  },
  {
    id: 3,
    question: "What is your name",
    questionType: "TEXT",
    placeholder: "Enter your name",
    options: [],
    answer: "",
  },
  {
    id: 4,
    question: "What is your hometown?",
    questionType: "TEXT",
    placeholder: "Enter your hometown",
    options: [],
    answer: "",
  },
  {
    id: 5,
    questionType: "MULTIINPUT",
    question: "fill the basics details",
    subQuestion: [
      {
        id: "firstName",
        placeholder: "Enter your first name",
        answer: "",
        label: "First Name",
        type: "text",
        keyBoard: "default",
      },
      {
        id: "lastName",
        placeholder: "Enter your last name",
        answer: "",
        label: "Last Name",
        type: "text",
        keyBoard: "default",
      },
      {
        id: "email",
        placeholder: "Enter your email",
        answer: "",
        label: "Email",
        type: "email",
        keyBoard: "email-address",
      },
      {
        id: "phone",
        placeholder: "Enter your phone number",
        answer: "",
        label: "Phone",
        type: "number",
        keyBoard: "phone-pad",
      },
      {
        id: "gender",
        label: "Gender",
        placeholder: "Enter your gender",
        type: "select",
        answer: "",
        options: [
          // { value: "", label: "- None Selected - " },
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Female" },
          { value: "OTHER", label: "Other" },
        ],
      },
    ],
  },
  {
    id: 6,
    question: "answer the following options?",
    questionType: "MULTICHECKBOX",
    options: [
      {
        optionText: "do you like to travel?",
        optionValue: "do you like to travel?",
      },
      {
        optionText: "do you excercise?",
        optionValue: "do you excercise?",
      },
      {
        optionText: "do you like to read?",
        optionValue: "do you like to read?",
      },
      {
        optionText: "do you like to play?",
        optionValue: "do you like to play?",
      },
      {
        optionText: "do you like to code?",
        optionValue: "do you like to code?",
      },
    ],
    answer: [],
  },
];
