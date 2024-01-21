import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { useFonts } from "expo-font";

import { NativeWindStyleSheet } from "nativewind";
import { useEffect, useState } from "react";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Lalezar: require("./assets/font/Lalezar-Regular.ttf"),
  });
  const posRandom = Math.trunc(Math.random() * 9 + 1);
  const negRandom = Math.trunc(Math.random() * 9 + 1);
  const butRandom = Math.trunc(Math.random() * 9 + 1);
  const notRandom = Math.trunc(Math.random() * 9 + 1);
  const mainRandom = Math.trunc(Math.random() * 9 + 1);

  const [posNum, setPosNum] = useState(posRandom);
  const [negNum, setNegNum] = useState(negRandom);
  const [mainNum, setMainNum] = useState(mainRandom);
  const [butNum, setButNum] = useState(butRandom);
  const [notNum, setNotNum] = useState(notRandom);
  const [mainNumCol, setMainNumCol] = useState("rgb(14,165,233)");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    mainNum == butNum
      ? setMainNumCol("green") &
        setScore(score + 1) &
        setButNum(butRandom) &
        setNotNum(notRandom)
      : mainNum == notNum
      ? setMainNumCol("red") & setButNum(butRandom) & setNotNum(notRandom)
      : setMainNumCol("rgb(14,165,233)");
  }, [mainNum]);

  useEffect(() => {
    timer >= 100 && setTimer(0);
    const timerOut = setTimeout(() => {
      setTimer(timer + 2.5);
    }, 100);
    return () => clearInterval(timerOut);
  }, [timer]);

  const pressHandler = (num) => {
    setMainNum(mainNum + num);
    setTimer(0);
    setPosNum(posRandom);
    setNegNum(negRandom);
  };

  return (
    <View className="flex-1 bg-slate-950 items-center justify-center gap-5">
      <View className="bg-slate-50 h-5 w-4/5 rounded-2xl">
        <View
          style={{ width: timer + "%" }}
          className="bg-sky-500 h-5 rounded-2xl"
        ></View>
      </View>
      <Text className="text-4xl text-white font-Lalezar">امتیاز : {score}</Text>
      <Text className="text-white font-Lalezar">قوانین :</Text>
      <View className="flex flex-row w-4/5 justify-around items-center">
        <View className="bg-rose-500 p-7 items-center">
          <Text className="text-4xl">{notNum}</Text>
          <Text className="text-lg font-Lalezar">نخور</Text>
        </View>
        <Text style={{ backgroundColor: mainNumCol }} className="text-4xl p-7">
          {mainNum}
        </Text>
        <View className="bg-lime-500 p-7 items-center">
          <Text className="text-4xl">{butNum}</Text>
          <Text className="text-lg font-Lalezar">بخور</Text>
        </View>
      </View>
      <View className="flex flex-row w-4/6 justify-around items-center">
        <Pressable
          onPress={() => pressHandler(-negNum)}
          className="bg-rose-500 p-7 w-28 rounded-2xl border-4 border-slate-50 focus:bg-rose-800"
        >
          <Text className="text-4xl text-center">-{negNum}</Text>
        </Pressable>
        <Pressable
          onPress={() => pressHandler(posNum)}
          className="bg-lime-500 p-7 w-28 rounded-2xl border-4 border-slate-50 focus:bg-lime-800"
        >
          <Text className="text-4xl text-center">+{posNum}</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
