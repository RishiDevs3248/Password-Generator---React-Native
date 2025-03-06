import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

// YUP for validation 
import { object, number } from 'yup';

let PasswordSchema = object({
  passwordLength: number().required('This is a required field').positive().integer().min(4, 'Minimum Should be 4').max(12, 'maximum should be 12')
});

export default function App() {

  const [passowrd, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [LowerCase, setLowerCase] = useState(false)
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

    const passowrd = CreatePassowrd(passwordLength, characterList)
  }
  const CreatePassowrd = (passwordLength: number, characters: string) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }
  const ResetPassowrdState = () => {
    setPassword('')
    setLowerCase(true )
    setUpperCase(false)
    setNumber(false)
    setSymbol(false)
  }


  return (
    <View>
      <Text style={styles.text}>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#fff"
  }
})