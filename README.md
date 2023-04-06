# Project : Kakaotalk Generator

# Stack
- HTML 
- CSS 
- React
- Web Speech API

# 목표
Youtube에서 웃긴 카톡 대화를 보여주는 shorts를 보고 영감을 받아 코드로 구현 해 보고 싶었습니다.
1. 메세지를 입력하기.
2. 메세지를 읽어주는 TTS api를 이용해 메세지 재생하기.

# 기능
1. Talk 생성, 삭제
2. Talk마다 Message를 입력, 수정, 삭제 (Text, Image)
3. 재생할 음성의 선택, 조절 
4. Talk의 재생
5. localStorage에 저장

# 스크린샷

## Full
![image](https://user-images.githubusercontent.com/70611956/219977022-98551363-d477-448e-bdaa-9db03bdca533.png)

## Talk-List
![image](https://user-images.githubusercontent.com/70611956/219976947-9145d36a-77f4-453d-9b2b-2036688c83dd.png)

## Messages
![image](https://user-images.githubusercontent.com/70611956/219976983-e71a6122-bdb8-41ae-8ccf-35b31c25a343.png)

## Message Input
![image](https://user-images.githubusercontent.com/70611956/219976989-b748df8e-a269-4533-bfaf-b01d954f90eb.png)

## Voice option
![image](https://user-images.githubusercontent.com/70611956/219976994-a73f134a-9fdb-47cb-ae37-5cf0b7192a73.png)

## Play
![image](https://user-images.githubusercontent.com/70611956/219977003-a1d6ba79-d4b8-42fc-9878-220bfd43fbeb.png)

# 어려웠던점
### 1. state 의 값에 배열과 객체들이 중첩되어 불변성을 지키면서 setState를 하는 것이 어려웠습니다.
기본적인 state의 객체 추가, 업데이트, 삭제는 할 수 있었으나 객체와 배열이 중첩되는것 만으로 setState 코드의 난이도가 확 올라간 느낌이었습니다.
Immer를 사용할까도 했지만 어렵더라도 한번 도전해 보고 싶었습니다.
꼼꼼하게 console.log를 찍어 값을 확인하며 하다보니 처음에는 에러가 나서 아예 작동하지 않다가도 
점점 state에 의도치 않은 값이라도 들어가게되며 결국에는 원하는 결과를 얻을수 있었습니다.

### 2. Talk를 재생할때 현재 음성이 끝난 뒤에 다음 text가 재생되도록 하는 것이 어려웠습니다.
'음성이 끝났다' 라는 조건을 찾기 위해 MDN을 찾아봤지만 찾지 못했습니다. (알고 난뒤 찾으니 찾았습니다..)
그래서 TTS에서 제공하는 음성 데이터를 직접 확인해보았고 여기서 end라는 이벤트를 찾을 수 있었습니다.
메세지를 한줄씩 출력하고, 읽는 함수를 만들어서 end가 되었을때 다음 메세지를 읽도록 만들었습니다.







