// eslint-disable

import './App.css';
import {useState} from 'react';

function App() {
  let title = '제이스톨';
  let [글제목, 글제목변경] = useState(['JStory란 무엇인가','나는누구일까','NEWS']);
  let [좋아요, 좋아요변경] = useState(0);

  return (

    <div class="App">
      <header id= "header">
        <h3>JSTORY</h3>
      </header>
      
      <main id= "container" class = "main">
        <h3>{title}</h3>

        <div class= "work w1">
          <h4>{ 글제목[0] } <button onClick={ ()=> {좋아요변경(좋아요 + 1)} }>💕</button>: { 좋아요 }</h4>
          <p>5월 4일 발행</p>
        </div>

        <div class= "work w2">
          <h4>{ 글제목[1] } <button onClick={ ()=> {
            let copy = [...글제목];
            copy[1] = '안알려줌';
            글제목변경(copy);
          }}>누구인지보기</button> </h4>
          <p>5월 4일 발행</p>
        </div>

        <div class= "work w3">
          <h4>{ 글제목[2] }</h4>
          <p>5월 4일 발행</p>
        </div>

        <Modal></Modal>
        
      </main>

    </div>
  );

  function Modal() {
    return (
      <div class= "modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    )
  }
}

export default App;
