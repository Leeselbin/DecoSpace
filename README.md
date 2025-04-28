# node_module 설치(필수)

yarn install

# ios 연동

cd ios && pod install

# ios build ( 안해도 상관없음 안되면 하세요 )

yarn build:ios

# local 환경 구동

yarn start

# 안드로이드 실기기 연결

1. yarn start 로 서버실행
2. 안드로이드폰과 노트북 연결 (유선으로)
3. adb devices (프로젝트 루트경로에서 )명령어로 연결확인
4. adb reverse tcp:8081 tcp:8081 (프로젝트 루트경로에서 ) 명렁어 실행

# 안드로이드 실기기 연결이 안될시에

1. 터미널을 열어 루트경로로 간다 -> cd ~
2. 안드로이드 폴더로 진입 -> cd .android
3. adbkey 파일 삭제 -> rm -rf adbkey adbkey.pub


# 꺠알 팁

React native Modal 2개 사용시

- 1개의 모달을 사용하여 버튼을 이용하여 2번째 모달을 사용할시에
- android 에서는 잘작동하지만
- ios 에서는 첫번째 modal이 완전히 종료된뒤에 2번째modal을 띄어줘야 modal이 표시된다

ios에서 꼬인 디펜던시를 푸는 방법

1. ios 프로젝트에서 Pods, Podfile.lock 날리고 pod install 다시 하기
2. Xcode열고 Product -> ‘Clean Build Folder’ (cmd + Shift + K)
3. 3. metro 종료 후 재시작

onchange event 관리 react.js 와 react-native 차이가 있음

```
- React JS
 onChange={(event)=> console.log(event.target.value)}
- ReactNative
 onChange={(event) => console.log(event.nativeEvent.text)}
```
