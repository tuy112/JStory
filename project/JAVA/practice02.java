public class practice02 {
    public static void main(String[] args) {
        if(true) {
            System.out.println(1);
            System.out.println(2);
            System.out.println(3);
            System.out.println(4);
        }
        System.out.println(5);

        System.out.println("===========================");
        
        if (false) {
            System.out.println(1);
        } else if (true) {
            System.out.println(2);
        } else if (false) {
            System.out.println(3);
        } else {
            System.out.println(4);
        }

        System.out.println("===========================");

        System.out.println("switch01");
        switch(1){
            case 1 : System.out.println("one");
            case 2 : System.out.println("two");
            case 3 : System.out.println("three");
        }

        System.out.println("===========================");
        System.out.println("switch02");
        switch(2){
            case 1 : System.out.println(1);
            break;
            case 2 : System.out.println(2);
            case 3 : System.out.println(3);]
            default:
            System.out.println("default");
        }
    }
}
