// esLint-disable

import './App.css';
import { useState } from 'react';

function App() {
  let title = "JSTORY";
  let [글제목, 글제목변경]= useState(['Jstory란..?','JH는 누구일까?','나의 채널']);
  let [좋아요,좋아요변경] = useState(0);

  return (
    <div className = "App">
      <div class = "blackNav">
        <h3>{title}</h3>
      </div>
      <div class = "list">
        <h4>{글제목[0]} <span onClick={()=>{ 좋아요변경(좋아요 + 1) }}>💕</span> {좋아요} </h4>
        <p>23.05.02 발행</p>
      </div>
      <div class = "list">
        <h4>{글제목[1]} <span onClick={()=>{ 
            글제목[1] = '안알려쥼';
            글제목변경(글제목);
          }}>누구인지 보기</span></h4>
        <p>23.05.02 발행</p>
      </div>
      <div class = "list">
        <h4>{글제목[2]}</h4>
        <p>23.05.02 발행</p>
      </div>
    </div>
  );
}

export default App;
