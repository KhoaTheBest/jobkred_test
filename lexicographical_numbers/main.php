<?php 
    function performToLexicalOrder($inputNumber){
        $result = array();
        $curNumber = 1;
        while(count($result) < $inputNumber){
            while($curNumber <= $inputNumber){
                array_push($result, $curNumber) ;
                $curNumber*=10;
            }

            $curNumber = $curNumber/10 +1;
            while(($curNumber <= $inputNumber) && ($curNumber % 10 != 0)){
                array_push($result, floor($curNumber));
                $curNumber++;
            }

            while($curNumber%10 === 0){
                $curNumber=floor($curNumber/10);
            }
        }

        return $result;
    }

    function main(){
        echo "Enter your number: ";
        $handle = fopen ("php://stdin","r");
        $line = fgets($handle);
        $result = performToLexicalOrder(trim($line));
        echo json_encode($result);
    }

    main();
?>