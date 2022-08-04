import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Questions from "../../data/questions";
import RadioButton from "../../components/RadioButton";

const VerticalScreen = () => {
  const [question, setQuestion] = useState(Questions[0]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [questionSet, setQuestionSet] = useState([]);
  const [focused, setFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputField, setInputField] = useState([]);
  useEffect(() => {
    setQuestionSet((prevQuestionSet) => {
      if (
        Questions[indexNumber]?.questionType === "NUMBER" ||
        Questions[indexNumber]?.questionType === "TEXT"
      ) {
        return [
          ...prevQuestionSet,
          {
            ...Questions[indexNumber],
            focused: false,
          },
        ];
      }
      return [...prevQuestionSet, Questions[indexNumber]];
    });
  }, [indexNumber]);
  const scrollItem = useRef(null);
  const isSelected = (optionText) => {
    return selectedOption.includes(optionText);
  };

  const onContinue = () => {
    if (indexNumber < Questions.length - 1) {
      if (
        Questions[indexNumber].questionType === "NUMBER" ||
        Questions[indexNumber].questionType === "TEXT"
      ) {
        setIndexNumber(indexNumber + 1);
        questionSet[indexNumber].answer = selectedOption;
        setSelectedOption("");
        questionSet[indexNumber].focused = false;
        setFocused(false);
        scrollItem.current.scrollToEnd({ animated: true });
      } else {
        setIndexNumber(indexNumber + 1);
        questionSet[indexNumber].answer = selectedOption;
        setSelectedOption("");
        scrollItem.current.scrollToEnd({ animated: true });
      }

      // setQuestionSet({
      //   ...questionSet,
      //   answer: selectedOption,
      // });
    }
  };
  const onPrevious = () => {};
  const isMultiSelected = (props) => {
    const { id } = props;
    setInputField((prev) => {
      return prev.filter((input) => input !== id);
    });
  };
  const isMultiSelectedFocus = (props) => {
    const { id } = props;
    setInputField((prev) => {
      return [...prev, id];
    });
  };
  const inputFieldSelected = (props) => {
    const { id } = props;
    return inputField.includes(id);
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 30 }}>
      <Text>VerticalScreen</Text>
      {/* {questionSet.map((item, index) => {
        return (
          <View style={{ width: "100%" }}>
            <Text>{item.question}</Text>
            <Text>{item.answer}</Text>
          </View>
        );
      })} */}
      <View style={{ padding: 10, flex: 1 }}>
        {
          <FlatList
            data={questionSet}
            ref={scrollItem}
            style={styles.list}
            onContentSizeChange={() => scrollItem.current.scrollToEnd()}
            renderItem={({ item }) => {
              return (
                <View style={{ width: "100%" }}>
                  {item.questionType === "RADIOBUTTON" && (
                    <View>
                      <Text style={styles.questionText}>
                        {`${item.id}. ${item.question}`}
                      </Text>
                      {item?.options?.map((options, index) => (
                        <RadioButton
                          answer={item.answer}
                          isSelected={isSelected}
                          setSelectedOption={setSelectedOption}
                          options={options}
                          index={index}
                        />
                      ))}
                    </View>
                  )}
                  {(item?.questionType === "NUMBER" ||
                    item?.questionType === "TEXT") && (
                    <View style={styles.question}>
                      <Text style={styles.questionText}>
                        {`${item.id}. ${item.question}`}
                      </Text>

                      <TextInput
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        value={item.answer || selectedOption}
                        keyboardType={
                          item?.questionType === "NUMBER"
                            ? "numeric"
                            : "default"
                        }
                        onChangeText={setSelectedOption}
                        style={{
                          height: 40,
                          borderWidth: 0.5,
                          borderRadius: 5,
                          borderColor: focused
                            ? "#C057D8"
                            : item.focused === false
                            ? "#C4C4C4"
                            : "#C057D8",
                          paddingHorizontal: 10,
                        }}
                      />
                    </View>
                  )}
                  {item?.questionType === "MULTIINPUT" && (
                    <View>
                      <Text style={styles.questionText}>
                        {`${item.id}. ${item.question}`}
                      </Text>
                      {item?.subQuestion?.map((options, index) => (
                        <View key={index}>
                          <Text style={styles.optionText}>
                            {options?.label}
                          </Text>

                          <TextInput
                            autoCapitalize="none"
                            placeholder={options?.placeholder}
                            onChangeText={(text) => {
                              options.answer = text;
                            }}
                            onBlur={() =>
                              isMultiSelected({
                                id: options?.id,
                              })
                            }
                            onFocus={() =>
                              isMultiSelectedFocus({
                                id: options?.id,
                              })
                            }
                            style={[
                              styles.focusField,
                              {
                                borderColor: inputFieldSelected({
                                  id: options?.id,
                                })
                                  ? "#C057D8"
                                  : "#C4C4C4",
                              },
                            ]}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            }}
          />
        }
      </View>
      <View
        style={[
          styles.ButtonContainer,
          {
            justifyContent: "center",
          },
        ]}
      >
        {/* {indexNumber > 20 && (
          <Pressable style={styles.button} onPress={onPrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </Pressable>
        )} */}
        <Pressable
          onPress={onContinue}
          style={[
            styles.button,
            { borderColor: selectedOption ? "#C057D8" : "#C4C4C4" },
          ]}
        >
          <Text style={styles.buttonText}>
            {indexNumber + 1 === Questions?.length ? "Done" : "Submit"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default VerticalScreen;

const styles = StyleSheet.create({
  list: { width: "100%", height: "100%" },
  questionText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  ButtonContainer: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "#C4C4C4",
    backgroundColor: "#C4C4C4",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  subQuestion: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 50,
    width: "100%",

    marginVertical: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#C4C4C4",
  },
  questionCard: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
  },
  focusField: {
    width: "100%",
    height: 40,
    borderRadius: 5,

    borderWidth: 0.5,
    paddingHorizontal: 10,
  },
});
