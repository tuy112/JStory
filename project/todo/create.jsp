<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@page import="java.sql.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<link rel="stylesheet" type="text/css" href="/JSP_Board/css/layout.css"/>
<title>게시판</title>
<script type="text/javascript">
    function check(){
        //form 의 요소를 가지고 올 때에는 form의 이름을 사용하여 가져와야 한다. getElementById는 안댕
        var title = document.create.title;
        var name = document.create.name;
        var text = document.create.text;
                
        if(title.value==""){
            alert("제목을 입력해주세요.");
            title.focus();
            return false;
        }else if(name.value==""){
            alert("이름을 입력해주세요.");
            name.focus();
            return false;
        }else if(text.value==""){
            alert("내용을 입력해주세요.");
            text.focus();
            return false;
        }else{
            alert("글이 등록됩니다!");
            return true;
        }
    }
</script>
</head>
<body>
    <div>
        <h1>글쓰기</h1>
    </div>
    
    <div> <!-- form 전송 전 데이터 유효성 체크 onsubmit  -->
        <form name="create" action="insert.jsp" method=post onsubmit="return check()">
            제목 : <input type="text" id="title" name="title"/><br>
            작성자 : <input type="text" id="name" name="name" /><br/><br/>
            =============================================<br/>
            <textarea rows="10" cols="50" id="text" name="text"></textarea>
    <div>
            <input type=submit value="등록"/>
            <input type=reset value="취소"/>
            <input type=button value="목록" onclick="location.href='list.jsp'"/>
        </div>
        </form>
    </div>
    
</body>
</html>