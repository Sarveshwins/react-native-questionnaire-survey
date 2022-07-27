import Questions from '../../data/questions';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  TextInput,
  SafeAreaView,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import RadioButton from '../../components/RadioButton';

const HorizontalScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [multiFocus, setMultiFocus] = useState(null);
  const [score, setScore] = useState(null);
  const [focused, setFocused] = useState(false);
  const [inputField, setInputField] = useState([]);
  const [indicator, setIndicator] = useState(100 / Questions.length);

  useEffect(() => {
    if (indexNumber >= 0 && indexNumber < Questions.length) {
      setQuestions(Questions[indexNumber]);
    }
    if (questions?.questionType === 'MULTIINPUT') {
      setMultiFocus(
        questions?.subQuestion.map(questions => {
          return {
            id: questions.id,
            focused: false,
          };
        }),
      );
    }
  }, [indexNumber]);

  const isSelected = optionText => {
    return selectedOption.includes(optionText);
  };
  const onContinue = () => {
    if (questions?.questionType !== 'MULTIINPUT' && !selectedOption) {
      Alert.alert('you cannot continue without attempting the question');
      return;
    }
    setIndexNumber(indexNumber + 1);
    if (indexNumber <= Questions?.length - 1) {
      setIndicator(prevIndicator => {
        if (indexNumber < Questions.length) {
          return prevIndicator + Math.floor(100 / Questions.length);
        }
      });
      if (questions.questionType === 'RADIOBUTTON') {
        setScore({
          ...score,
          [indexNumber]: {
            ...questions,
            answer: selectedOption,
          },
        });
      } else if (
        questions.questionType === 'NUMBER' ||
        questions.questionType === 'TEXT'
      ) {
        setScore({
          ...score,
          [indexNumber]: {
            ...questions,
            answer: selectedOption,
          },
        });
      } else if (questions?.questionType === 'MULTIINPUT') {
        setScore({
          ...score,
          [indexNumber]: questions,
        });
      } else if (questions?.questionType === 'MULTICHECKBOX') {
        setScore({
          ...score,
          [indexNumber]: {
            ...questions,
            answer: selectedOption,
          },
        });
      }
      setSelectedOption('');
    } else {
      Alert.alert('You have finished the quiz');
    }
  };

  const onPrevious = () => {
    if (indexNumber > 0) {
      setIndexNumber(indexNumber - 1);
      setIndicator(prevIndicator => {
        if (indexNumber < Questions.length && indexNumber > 0) {
          return prevIndicator - Math.floor(100 / Questions.length);
        }
      });

      setSelectedOption('');
    } else {
      Alert.alert('You are at the first question');
    }
  };
  const isMultiSelected = props => {
    const {id} = props;
    setInputField(prev => {
      return prev.filter(input => input !== id);
    });
  };

  const isMultiSelectedFocus = props => {
    const {id} = props;
    setInputField(prev => {
      return [...prev, id];
    });
  };
  const inputFieldSelected = props => {
    const {id} = props;
    return inputField.includes(id);
  };
  const isActive = options => {
    return selectedOption.includes(options.optionValue);
  };
  const onSelect = optionText => {
    setSelectedOption(prevOption => {
      if (prevOption.includes(optionText)) {
        return prevOption.filter(option => option !== optionText);
      } else {
        return [...prevOption, optionText];
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView
        style={{
          width: '80%',

          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 10, color: '#C057D8'}}>
            {indexNumber + 1}/{Questions.length}
          </Text>
          <Text style={{fontSize: 10, color: '#C057D8'}}>
            {indicator >= 95
              ? `${Math.floor(Math.max(indicator, 100))}%`
              : `${Math.floor(indicator)}%`}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: '#C4C4C4',
            borderRadius: 10,
            marginBottom: 50,
          }}>
          <View></View>
          <View
            style={{
              width:
                indicator >= 95
                  ? `${Math.max(indicator, 100)}%`
                  : `${Math.floor(indicator)}%`,
              height: '100%',
              backgroundColor: '#C057D8',
              borderRadius: 10,
              position: 'absolute',
            }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          width: '80%',
          height: '80%',
          justifyContent: 'center',
        }}>
        {questions?.questionType === 'RADIOBUTTON' && (
          <View style={{}}>
            <Text style={styles.questionText}>
              {`${questions.id}. ${questions.question}`}
            </Text>
            <View style={{}}>
              {questions?.options?.map((options, index) => (
                <RadioButton
                  isSelected={isSelected}
                  setSelectedOption={setSelectedOption}
                  options={options}
                  index={index}
                />
              ))}
            </View>
          </View>
        )}

        {(questions?.questionType === 'NUMBER' ||
          questions?.questionType === 'TEXT') && (
          <View style={styles.question}>
            <Text style={styles.questionText}>
              {`${questions.id}. ${questions.question}`}
            </Text>

            <TextInput
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={selectedOption}
              keyboardType={
                questions?.questionType === 'NUMBER' ? 'numeric' : 'default'
              }
              onChangeText={setSelectedOption}
              style={{
                height: 40,
                borderWidth: 0.5,
                borderRadius: 5,
                borderColor: focused ? '#C057D8' : '#C4C4C4',
                paddingHorizontal: 10,
              }}
            />
          </View>
        )}
        {questions?.questionType === 'MULTIINPUT' && (
          <View style={{width: '100%'}}>
            {questions?.subQuestion?.map((options, index) => (
              <View key={index}>
                <Text style={styles.optionText}>{options?.label}</Text>

                <TextInput
                  autoCapitalize="none"
                  placeholder={options?.placeholder}
                  onChangeText={text => {
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
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 5,
                    borderColor: inputFieldSelected({
                      id: options?.id,
                    })
                      ? '#C057D8'
                      : '#C4C4C4',
                    borderWidth: 0.5,
                    paddingHorizontal: 10,
                  }}
                />
              </View>
            ))}
          </View>
        )}
        {questions?.questionType === 'MULTICHECKBOX' && (
          <View style={{width: '100%'}}>
            <Text style={styles.questionText}>
              {`${questions.id}. ${questions.question}`}
            </Text>
            {questions?.options?.map((options, index) => (
              <Pressable
                onPress={() => onSelect(options?.optionValue)}
                key={index}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  height: 50,
                  width: '100%',
                  backgroundColor: isActive(options) ? '#f4f1f5' : '#fff',
                  marginVertical: 5,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: '#C4C4C4',
                }}>
                <Text style={styles.optionText}>{options?.optionText}</Text>
                <Pressable onPress={() => onSelect(options?.optionValue)}>
                  <Fontisto
                    name={
                      isActive(options) ? 'checkbox-active' : 'checkbox-passive'
                    }
                    size={20}
                    color={isActive(options) ? '#C057D8' : '#C4C4C4'}
                  />
                </Pressable>
              </Pressable>
            ))}
          </View>
        )}
        <View
          style={[
            styles.ButtonContainer,
            {justifyContent: indexNumber === 0 ? 'flex-end' : 'space-between'},
          ]}>
          {indexNumber > 0 && (
            <Pressable style={styles.button} onPress={onPrevious}>
              <Text style={styles.buttonText}>Previous</Text>
            </Pressable>
          )}
          <Pressable
            onPress={onContinue}
            style={[
              styles.button,
              {borderColor: selectedOption ? '#C057D8' : '#C4C4C4'},
            ]}>
            <Text style={styles.buttonText}>
              {indexNumber + 1 === Questions.length ? 'Done' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HorizontalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    padding: 10,
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  radioButtonCard: {
    // marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    marginVertical: 3,
    width: '100%',
    borderColor: '#C4C4C4',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  question: {},
  circle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#C057D8',
  },
  circleHighlight: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 25,
  },
  ButtonContainer: {
    width: '100%',
    height: 40,

    borderRadius: 5,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#C4C4C4',
  },
});
