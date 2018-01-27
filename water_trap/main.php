<?php 
    function calculateTrap($arrayInput) {
        if (is_null($arrayInput) || count($arrayInput) === 0) {
            return 0;
        }
        
        $arr_length = count($arrayInput);
        $arr_max_left = array();
        $arr_max_right = array();
        $temp_max_height = 0;
        for($i = 0; $i < $arr_length; $i++){
            $arr_max_left[$i] = $temp_max_height;
            $temp_max_height = max($temp_max_height, $arrayInput[$i]);
        }

        $temp_max_height = 0;
        for($i = $arr_length - 1; $i >= 0; $i--){
            $arr_max_right[$i] = $temp_max_height;
            $temp_max_height = max($temp_max_height, $arrayInput[$i]);
        }

        $total_trap = 0;
        for($i = 0; $i < $arr_length; $i++){
            $height = max(min($arr_max_left[$i], $arr_max_right[$i]) - $arrayInput[$i], 0);
            $total_trap += $height;
        }

        return $total_trap;
    }

    function main(){
        echo "Enter your array (example:1,2,3,4,...): ";
        $handle = fopen ("php://stdin","r");
        $line = fgets($handle);
        $result = calculateTrap(explode(",",trim($line)));
        echo $result;
    }

    main();
 ?> 