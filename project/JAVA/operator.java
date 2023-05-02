public class operator {
    public static void main(String[] args) {
        
        int result = 1 + 2;
        System.out.println(result); 

        result = result - 3;
        System.out.println(result);

        String first = "This is ";
        String second = "Jae Hyeok";
        String third = first + second;
        System.out.println(third); 


        int c = 10;
        int d = 3;
        System.out.println(c / d);
        // 정수 -> 실수로 형변환
        float a = 10.0F;
        float b = 3.0F;
        System.out.println(a / b);
        // 자동으로 형변환을 함
        System.out.println(a / d);


        int i = 5;
        i++;
        System.out.println(i); // 6
        i--; // 5
        System.out.println(i++); // 다음 번 sysout에 적용
        System.out.println(i); //6

        System.out.println("==========================");

        // 비교 연산자
        System.out.println( 1 == 2 );
        System.out.println("jh" == "jh");
        System.out.println( 1 != 2 );

    }
}
