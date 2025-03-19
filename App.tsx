import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

// YUP for validation 
import { object, number } from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

let PasswordSchema = object({
  passwordLength: number().required('This is a required field').positive().integer().min(4, 'Minimum Should be 4').max(12, 'maximum should be 12')
});

export default function App() {

  const [passowrd, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [LowerCase, setLowerCase] = useState(true)
  const [UpperCase, setUpperCase] = useState(false)
  const [Number, setNumber] = useState(false)
  const [Symbol, setSymbol] = useState(false)

  const GeneratePassowrdString = (passwordLength: number) => {
    let characterList = ''

    const CapLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const LowLetters = "abcdefghijklmnopqrstuvwxyz"
    const Numbers = "1234567890"
    const Symbols = "!@#$%^&*()-+"

    if (UpperCase) {
      characterList += CapLetters
    }
    if (LowerCase) {
      characterList += LowLetters
    }
    if (Number) {
      characterList += Numbers
    }
    if (Symbol) {
      characterList += Symbols
    }

    const passowrdresult = CreatePassowrd(passwordLength, characterList)
    setPassword(passowrdresult)
  }

  const CreatePassowrd = (passwordLength: number, characters: string) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    setIsPasswordGenerated(true)
    return result
  }

  const ResetPassowrdState = () => {
    setPassword('')
    setLowerCase(true)
    setUpperCase(false)
    setNumber(false)
    setSymbol(false)
    setIsPasswordGenerated(false)
  }


  return (
    <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator  >
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer} >
          <Text style={styles.title} >Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              console.log(values)
              GeneratePassowrdString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper} >
                  <View style={styles.inputColumn} >
                    <Text style={styles.heading} >Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Ex. 8'
                    keyboardType='numeric'
                  />
                </View>
                <View style={styles.inputWrapper} >
                  <View>
                    <Text style={styles.heading} >
                      Lower Case
                    </Text>
                  </View>
                  <View>
                    <BouncyCheckbox
                      isChecked={LowerCase}
                      fillColor="red"
                      onPress={() => { setLowerCase(!LowerCase) }}
                    > </BouncyCheckbox>
                  </View>
                </View>
                <View style={[styles.inputWrapper, styles.test]} >
                  <View>
                    <Text style={styles.heading} >
                      Upper Case
                    </Text>
                  </View>
                  <View>
                    <BouncyCheckbox
                      isChecked={UpperCase}
                      fillColor="green"
                      onPress={() => { setUpperCase(!UpperCase) }}
                    > </BouncyCheckbox></View>
                </View>
                <View style={styles.inputWrapper} >
                  <View>
                    <Text style={styles.heading} >
                      Number
                    </Text>
                  </View>
                  <View>
                    <BouncyCheckbox
                      isChecked={Number}
                      fillColor="blue"
                      onPress={() => { setNumber(!Number) }}
                    ></BouncyCheckbox>
                  </View>
                </View>
                <View style={styles.inputWrapper} >
                  <View>
                    <Text style={styles.heading} >
                      Symbol
                    </Text>
                  </View>
                  <View>
                    <BouncyCheckbox
                      isChecked={Symbol}
                      fillColor="orange"
                      onPress={() => { setSymbol(!Symbol) }}
                    > </BouncyCheckbox>
                  </View>
                </View>


                <View style={styles.formActions} >
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => (handleSubmit())}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      ResetPassowrdState()
                    }}

                  >
                    <Text style={styles.secondaryBtnTxt}  >Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result : </Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{passowrd}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  test: {
    // backgroundColor:"red",
    // display:'flex',
    // flexDirection:'row',
    // justifyContent:'space-around',

  },
  text: {
    color: "#fff"
  },
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    color: "#fff"
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
    color: "#fff"
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    color: "#fff"
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor:'#fff'
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    // color:'#fff'
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});