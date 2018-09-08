(function() {
    let words = document.getElementById('words');
    let result = document.getElementById('result');
    let result1 = document.getElementById('result1');

    let rule = document.getElementById('rule');
    let guess = document.getElementById('guess');
    let btn = document.getElementById('btn');

    function showResult() {
        //hapus semua titik dan koma diakhir, tambakah spesial character bila perlu
        let regex = new RegExp('[.,]', 'gi');
        let str = words.value.replace(regex,"");
        //jadikan array
        let arr = str.split(" ");

        let tmp = {};
        arr.forEach(function(element, index) {
            if(!tmp[element]) {
                tmp[element]=1;
            } else {
                tmp[element]++;
            }
        });
        //ururtkan berdasar jumlah kata
        let keysSorted = Object.keys(tmp).sort(function(a,b){return a.length-b.length});

        let finalResult = [];
        keysSorted.forEach(element => {
            finalResult.push(element+" :"+tmp[element]);
        });
        result.innerHTML = "Word :"+JSON.stringify(finalResult, null, 2);


        let abj = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
        let wordCount = {};
        abj.forEach(element => {
            wordCount[element]=words.value.split(element).length-1;
        });       

        result1.innerHTML = "Letter :"+JSON.stringify(wordCount, null, 2);
    };

    function showGuess() {
        let cipher = words.value;
        let plain = "";
        let arr = rule.value.split("\n");
    
        //mengubah setiap character sesuai masukan dari guess
        plain = cipher;
        for(let i=0;i<plain.length;i++) {
            for(let j=0;j<arr.length;j++) {
                let tmp = arr[j].split("=");
                //index 0 adalah old token, index 1 new token
                //karena string immutable jadi buat string baru
                if(plain[i] == tmp[0]) {
                    plain = plain.substr(0, i)+plain[i].replace(plain[i], tmp[1])+plain.substr(i+1,plain.length);
                    break;
                }
            };
        }

        guess.innerHTML = plain;
    }


    words.addEventListener('input', showResult);
    btn.addEventListener('click', showGuess);
})();