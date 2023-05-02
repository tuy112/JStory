/**
 * forWhile
 */
public class forWhile {

    public static void main(String[] args) {
        while(true) {
            System.out.println("JH");
            break;
        }

        System.out.println("======================");

        int i = 0;
        while ( i < 10 ) {
            System.out.println("JH" + i);
            i++;
        }

        System.out.println("=====================");
        
        for ( int t = 0; t < 10; t++ ) {
            System.out.println("반복" + t);
        }

        System.out.println("=====================");

        int max = 6;
        for ( int z = 0; z < max; z++ ) {
            System.out.println("코딩공부를하자" + z);
        }

        for ( int y = 0; y < 10; y++) {
            if ( y == 5 ) {
                break; // i가 5와 동일지면 break해라!!
            }
        }
    }
}