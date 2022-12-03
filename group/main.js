'use strict';
//入った回数のカウント
{
  //グループ数

  var form = document.querySelector('#group_num');
  form.addEventListener('change', handleChange);
  function  handleChange(event) {
    var group_num = form.group_number.value;
    console.log(group_num);
  }
  var group_num = form.group_number.value;
  console.log(group_num);

  document.getElementById('btn1').onclick = function () {
    const number2 = document.getElementById('number2');
    document.getElementById('span2').textContent = number2.value;
    const number = number2.value;
    var pool1 = [];
    var pool2 = [];
    var ex_pool =[];
    var girl = [];
    var noob = [];
    var match_count = Array(80).fill(0);
    var pool_id = 1;
    var ex_num = -1;
    var ex_group = 0;
    var type = 0;
    var plus = Number(number);
    var i,j;
    var chk;
    var set1, set2, set3, set4, set5, set6;
    var l1, l2, l3, l4, l5, l6;
    var data1=[],data2=[],data3=[],data4=[],data5=[],data6=[];
    var mix_set;
    var counter = 0;
    var mark_num;
    for(j=0;j < number;j++){
      pool1.push(j+1);
    }
//メンバーの追加
    document.querySelector('.add').addEventListener('click', () => {
      plus++;
      document.getElementById('span2').textContent = plus;
      if(pool_id === 1){
        pool1.push(plus);
      }else{
        pool2.push(plus);
      }
      showPool();
    });

    const arrayLength = pool1.length;
//変更するメンバーの表示
    function chenge_num(n){
      if(n !== -1){
        document.getElementById('chenge_num').textContent = n;
      }else{
        document.getElementById('chenge_num').textContent = '';
      }
      console.log(typeof(n));
    }


  //比較する関数
    function compareFunc(a, b){
      return a - b;
    }

    function arraySort(arr){
      for(var i=0;i<arr.length; i++){
        for(var j=0;j<arr.length;j++){
          if(arr[i] > arr[j]){
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
          }
        }
      }
    }

  //メンバーを削除する関数
    function del(pool, num){
      pool.splice(num, 1);
    }

  //削除の確認
  function confirm(pool,num){
    var n = pool[num];
    if(window.confirm(n+"を削除しますか?")){
      del(pool, num);
      // plus--;
      // document.getElementById('span2').textContent = plus;
    }
  }

  //プールからプールに移動させる関数
  function move(poola,poolb, num){
    var tmp = poola[num];
    poola.splice(num, 1);
    poolb.push(tmp);
  }


//プールをシャッフルする関数
    function shuffleArray(sourceArr) {
      const array = sourceArr.concat();
      const arrayLength = array.length;
      for (let i = arrayLength -1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
      }
      return array;
    }
//定期的にシャッフルする関数
    function shuffle(counter){
      //console.log("count:"+counter);

      var shuffle_count = Math.ceil(number / group_num);
      //console.log("shuffle_count:"+shuffle_count);
      pool1 = shuffleArray(pool1);
      pool2 = shuffleArray(pool2);
      // if(shuffle_count <= counter){
      //   if(counter % shuffle_count === 0){
      //     pool1 = shuffleArray(pool1);
      //     pool2 = shuffleArray(pool2);
      //     console.log("shuffle");
      //   }
      // }
    }
//チェックする関数
    function check(checkArr1, checkArr2, n){
      const array1 = checkArr1.concat();
      const arrayLength1 = array1.length;
      const array2 = checkArr2.concat();
      const arrayLength2 = array2.length;
      for(var i=0; i<arrayLength1; i++){
        if(n === array1[i]){
          return 1;
        }
      }
      for(i=0; i<arrayLength2; i++){
        if(n === array2[i]){
          return 2;
        }
      }
      return 0;
    }

//色消す関数
      function delColor(arr, girl, num, chk){
        if(chk === 1){
          girl = girl.filter(function(item){
            return item !== arr[num];
          });
          return girl;
        }else{
          girl.push(arr[num]);
          return girl;
        }
      }
//ミックス
    function serchGirl(poolx, pooly, girl, index){
      //女子を検索して入れ替える
      for(i=4;i<poolx.length;i++){
        for(j=0;j<girl.length;j++){
          if(poolx[i]===girl[j]){
            var tmp = poolx[i];
            poolx[i] = poolx[index];
            poolx[index] = tmp;
            console.log("3");
            break;
          }
        }
      }
      if(poolx[index] !== tmp){
        for(i=0;i<pooly.length;i++){
          for(j=0;j<girl.length;j++){
            if(pooly[i]===girl[j]){
              poolx.splice(4, 0, pooly[i]);
              pooly.splice(i, 1);
              var tmp = poolx[4];
              poolx[4] = poolx[index];
              poolx[index] = tmp;
              console.log("4");
              break;
            }
          }
        }
        if(pool_id === 1){
          return 1;
        }else{
          return 2;
        }
      }
    }

  function serchGirl2(pool, girl){
    var girl_id = 0;
    for(i=0;i<girl.length;i++){
      if(pool[0] === girl[i]){
        girl_id += 1;
      }else{
        girl_id += 2;
      }
      if(pool[1] === girl[i]){
        girl_id += 10;
      }else{
        girl_id += 20;
      }
      if(pool[2] === girl[i]){
        girl_id += 100;
      }else{
        girl_id += 200;
      }
    }
    return girl_id;
  }

  function setMix(pool, girl, mix, mix_id){
    if(mix === 2){
      if(mix_id===122||mix_id===212||mix_id===221){
        //女子の位置変更
        for(i=1;i<3;i++){
          for(j=0;j<girl.length;j++){
            if(pool[i] === girl[j]){
                tmp = pool[0];
                pool[0] = pool[i];
                pool[i] = tmp;
            }
          }
        }
        //女子と男子を交換
        for(i=3;i<pool.length;i++){
          for(j=0;j<girl.length;j++){
            if(pool[i]===girl[j]){
              var tmp = pool[i];
              pool[i] = pool[2];
              poolx[2] = tmp;
              break;
            }
          }
        }
      }else if(mix_id === 111){
        //男子を検索
        for(i=3;i<pool.length;i++){
          for(j=0;j<girl.length;j++){
            if(pool[i]===girl[j]){
              i++;
            }
          }
          var index = i;
          break;
        }
        //女子と男子を交換
        tmp = pool[index];
        pool[index] = pool[2];
        pool[2] = tmp;
      }
    }else if(mix === 1){
      if(mix_id===211||mix_id===121||mix_id===112){
        if(mix_id === 211){
          tmp = pool[2];
          pool[2] = pool[0];
          pool[0] = tmp;
        }
          //男子を検索
        for(i=3;i<pool.length;i++){
          for(j=0;j<girl.length;j++){
            if(pool[i]===girl[j]){
              i++;
            }
          }
          var index = i;
          break;
        }
        //女子と男子を交換
        tmp = pool[index];
        pool[index] = pool[0];
        pool[0] = tmp;
      }
    }else if(mix === 22 || mix === 11){
      if(mix_id === 12 || mix_id === 21){
        if(mix_id === 21){
          tmp = pool[1];
          pool[1] = pool[0];
          pool[0] = tmp;
        }
        //男子を検索
        for(i=2;i<pool.length;i++){
          for(j=0;j<girl.length;j++){
            if(pool[i]===girl[j]){
              i++;
            }
          }
          var index = i;
          break;
        }
        //女子と男子を交換
        tmp = pool[index];
        pool[index] = pool[0];
        pool[0] = tmp;
      }
    }else if(mix === 12 || mix === 21){
      if(mix_id === 22){
        //女子を検索
        for(i=0;i<pool.length;i++){
          for(j=0;j<girl.length;j++){
            if(pool[i]===girl[j]){
              tmp = pool[0];
              pool[0] = pool[i];
              pool[i] = tmp;
              break;
            }
          }
        }
      }else if(mix_id === 11){
        //男子を検索
        for(i=2;i<pool.length;i++){
          for(j=0;j<girl.length;j++){
            if(pool[i]===girl[j]){
              i++;
            }
          }
          var index = i;
          break;
        }
        //女子と男子を交換
        tmp = pool[index];
        pool[index] = pool[0];
        pool[0] = tmp;
      }
    }else if(mix===222||mix===112||mix===121||mix===211){
      if(mix_id === 1){
        //男子を検索
        for(i=1;i<pool.length;i++){
          for(j=0;j<girl.length;j++){
            if(pool[i]===girl[j]){
              i++;
            }
          }
          var index = i;
          break;
        }
        //女子と男子を交換
        tmp = pool[index];
        pool[index] = pool[0];
        pool[0] = tmp;
      }
    }else if(mix === 111){
      //女子を検索
      for(i=0;i<pool.length;i++){
        for(j=0;j<girl.length;j++){
          if(pool[i]===girl[j]){
            tmp = pool[0];
            pool[0] = pool[i];
            pool[i] = tmp;
            break;
          }
        }
      }
    }
  }

    function mix(){
      if(pool_id === 1){
        if(3 < pool1.length ){
          var mix = 0;
          for(i=0;i<girl.length;i++){
            if(pool1[0] === girl[i]){
              mix += 1;
            }
            if(pool1[1] === girl[i]){
              mix += 10;
            }
            if(pool1[2] === girl[i]){
              mix += 100;
            }
            if(pool1[3] === girl[i]){
              mix += 1000;
            }
            console.log(mix);
          }
          if(mix === 1 || mix === 10 || mix === 100 || mix === 111 || mix === 1110){
            mix_set = serchGirl(pool1,pool2, girl, 3);
          }else if(mix === 1000 || mix === 1101){
            mix_set = serchGirl(pool1,pool2, girl, 1);
          }else if(mix === 1011){
            mix_set = serchGirl(pool1,pool2, girl, 2);
          }
        }else if(pool1.length <= 3){
          var mix = 0;
          for(i=0;i<girl.length;i++){
            if(pool1[0] === girl[i]){
              mix += 1;
            }
          }
          if(mix !== 1){
            mix += 2;
          }
          if(1 < pool1.length){
            for(i=0;i<girl.length;i++){
              if(pool1[1] === girl[i]){
                mix += 10;
              }
            }
            if(mix !== 11 || mix !== 12){
              mix += 20;
            }
          }
          if(2 < pool1.length){
            for(i=0;i<girl.length;i++){
              if(pool1[2] === girl[i]){
                mix += 100;
              }
            }
            if(mix !== 111 || mix !== 112|| mix !== 121|| mix !== 122){
              mix += 200;
              }
          }

          console.log(mix);
          var mix_id = serchGirl2(pool2, girl);
          setMix(pool2, girl, mix, mix_id);
        }
      }else{
        if(3 < pool2.length ){
          var mix = 0;
          for(i=0;i<girl.length;i++){
            if(pool2[0] === girl[i]){
              mix += 1;
            }
            if(pool2[1] === girl[i]){
              mix += 10;
            }
            if(pool2[2] === girl[i]){
              mix += 100;
            }
            if(pool2[3] === girl[i]){
              mix += 1000;
            }
            console.log(mix);
          }
          if(mix === 1 || mix === 10 || mix === 100 || mix === 111 || mix === 1110){
            mix_set = serchGirl(pool2,pool1, girl, 3);
          }else if(mix === 1000 || mix === 1101){
            mix_set = serchGirl(pool2,pool1, girl, 1);
          }else if(mix === 1011){
            mix_set = serchGirl(pool2,pool1, girl, 2);
          }
        }else if(pool2.length <= 3){
          var mix = 0;
          for(i=0;i<girl.length;i++){
            if(pool2[0] === girl[i]){
              mix += 1;
            }
          }
          if(mix !== 1){
            mix += 2;
          }
          if(1 < pool2.length){
            for(i=0;i<girl.length;i++){
              if(pool2[1] === girl[i]){
                mix += 10;
              }
            }
            if(mix !== 11 || mix !== 12){
              mix += 20;
            }
          }

          if(2 < pool2.length){
            for(i=0;i<girl.length;i++){
              if(pool2[2] === girl[i]){
                mix += 100;
              }
            }
            if(mix !== 111 || mix !== 112|| mix !== 121|| mix !== 122){
              mix += 200;
              }
          }

        console.log(mix);
        var mix_id = serchGirl2(pool1, girl);
        setMix(pool1, girl, mix, mix_id);
      }
    }
    return mix_set;
  }

//試合終了の関数
    function gameSet(group, member, game, l){
      //あまりの処理
      if(pool_id === 1){
      var arrLen = pool1.length;
        switch(arrLen){
          case 1:
            var length = 1;
            break;
          case 2:
            var length = 2;
            break;
          case 3:
            var length = 3;
            break;
          default:
            var length = 0;
            break;
          }
      }else{
        var arrLen = pool2.length;
          switch(arrLen){
            case 1:
              var length = 1;
              break;
            case 2:
              var length = 2;
              break;
            case 3:
              var length = 3;
              break;
            default:
              var length = 0;
              break;
            }
          }
      //グループからプールに移動
      ///mix_set = mix();
      if(mix_set === 1){
        for(i=0;i<3;i++){
          pool2.push(group[i]);
        }
        pool1.push(group[3]);
      }else if(mix_set === 2){
        for(i=0;i<3;i++){
          pool1.push(group[i]);
        }
        pool2.push(group[3]);
      }else{
        for(var i=0;i<member;i++){
          if(game === 2){
            if(l === 1){
              if(0 < i){
                pool2.push(group[i]);
              }else{
                pool1.push(group[i]);
              }
            }else if(l === 2){
              if(1 < i){
                pool2.push(group[i]);
              }else{
                pool1.push(group[i]);
              }
            }else if(l === 3){
              if(2 < i){
                pool2.push(group[i]);
              }else{
                pool1.push(group[i]);
              }
            }else{
              pool1.push(group[i]);
            }
          }else{
            if(l === 1){
              if(0 < i){
                pool1.push(group[i]);
              }else{
                pool2.push(group[i]);
              }
            }else if(l === 2){
              if(1 < i){
                pool1.push(group[i]);
              }else{
                pool2.push(group[i]);
              }
            }else if(l === 3){
              if(2 < i){
                pool1.push(group[i]);
              }else{
                pool2.push(group[i]);
              }
            }else{
              pool2.push(group[i]);
            }
          }
        }
      }

      //プールからグループに割り当て
      var set;
      for(j=0;j<member;j++){
        if(pool_id !== 0){
          group[j] = pool1[0];
          match_count[pool1[0]]++;
          pool1.shift();
          if(pool1.length === 0){
            pool_id = 0;
            pool2 = shuffleArray(pool2);
            var p1 = document.getElementById('show_pool1');
            p1.style.border = "none";
            var p1 = document.getElementById('show_pool2');
            p1.style.border = "1px solid #ff69b4";
          }
          if(j === 0){
            set = 1;
          }
        }else{
          group[j] = pool2[0];
          match_count[pool2[0]]++;
          pool2.shift();
          if(pool2.length === 0){
            pool_id = 1;
            pool1 = shuffleArray(pool1);
            var p1 = document.getElementById('show_pool1');
            p1.style.border = "1px solid #ff69b4";
            var p1 = document.getElementById('show_pool2');
            p1.style.border = "none";
          }
          if(j === 0){
            set = 2;
          }
        }
      }
      //試合に入った回数のカウント
      //console.log(match_count);
      var data = [set, length];
      return data;
    }

//メンバーを表示する関数
    function showMember(num){
      var mem = group[0].concat();
      //mem = mem.sort(compareFunc);

      var ul = document.getElementById('member_list1');

      //２回目以降の確定を押したときの処理
      if(ul.hasChildNodes()){
        while(ul.lastChild){
          ul.removeChild(ul.lastChild);
        }
      }

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        if(mark_num === mem[count]){
          li.style.borderColor = "#3366FF";
        }

        var text = document.createTextNode(mem[count]);

        var c = check(girl, noob, mem[count]);
        if(c === 1){
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      var mem = group[1].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list2');

      if(ul.hasChildNodes()){
        while(ul.lastChild){
          ul.removeChild(ul.lastChild);
        }
      }

      for(var count=0;count<mem.length; count++){
        var li = document.createElement('button');

        //変更するときの色付け
        if(mark_num === mem[count]){
          li.style.borderColor = "#3366FF";
        }

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      var mem = group[2].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list3');

      if(ul.hasChildNodes()){
        while(ul.lastChild){
          ul.removeChild(ul.lastChild);
        }
      }

      for(var count=0;count<mem.length; count++){
        var li = document.createElement('button');

        //変更するときの色付け
        if(mark_num === mem[count]){
          li.style.borderColor = "#3366FF";
        }

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          li.appendChild(text);
        }
        ul.appendChild(li);
      }

      var mem = group[3].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list4');

      if(ul.hasChildNodes()){
        while(ul.lastChild){
          ul.removeChild(ul.lastChild);
        }
      }
      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        //変更するときの色付け
        if(mark_num === mem[count]){
          li.style.borderColor = "#3366FF";
        }

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          li.appendChild(text);
        }
        ul.appendChild(li);
      }

      if(num === '4'){
        var element = document.querySelector('.button6');
        element.style.display = "none";
        var element = document.querySelector('#group6');
        element.style.display = "none";
        var element = document.querySelector('#member_list6');
        element.style.display = "none";
        var element = document.querySelector('.button5');
        element.style.display = "none";
        var element = document.querySelector('#group5');
        element.style.display = "none";
        var element = document.querySelector('#member_list5');
        element.style.display = "none";
        return;
      }else{
        var element = document.querySelector('.button5');
        element.style.display = "inline-block";
        var element = document.querySelector('#group5');
        element.style.display = "block";
        var element = document.querySelector('#member_list5');
        element.style.display = "block";

        var mem = group[4].concat();
        //mem.sort(compareFunc);

        var ul = document.getElementById('member_list5');

        if(ul.hasChildNodes()){
          while(ul.lastChild){
            ul.removeChild(ul.lastChild);
          }
        }
        for(var count=0;count<mem.length; count++){

          var li = document.createElement('button');

          //変更するときの色付け
          if(mark_num === mem[count]){
            li.style.borderColor = "#3366FF";
          }

          var text = document.createTextNode(mem[count]);
          var c = check(girl, noob, mem[count]);
          if(c === 1){
            li.appendChild(text);
            li.style.color = "red";
          }else if (c === 2) {
            li.appendChild(text);
            li.style.color = "#33CC99";
          }else{
            li.appendChild(text);
          }
          ul.appendChild(li);
        }
      }
      if(num === '5' || num === '4'){
        var element = document.querySelector('.button6');
        element.style.display = "none";
        var element = document.querySelector('#group6');
        element.style.display = "none";
        var element = document.querySelector('#member_list6');
        element.style.display = "none";
        return;
      }else{
        var element = document.querySelector('.button5');
        element.style.display = "inline-block";
        var element = document.querySelector('#group5');
        element.style.display = "block";
        var element = document.querySelector('#member_list5');
        element.style.display = "block";
        var element = document.querySelector('.button6');
        element.style.display = "inline-block";
        var element = document.querySelector('#group6');
        element.style.display = "block";
        var element = document.querySelector('#member_list6');
        element.style.display = "block";
        var mem = group[5].concat();
        //mem.sort(compareFunc);

        var ul = document.getElementById('member_list6');

        if(ul.hasChildNodes()){
          while(ul.lastChild){
            ul.removeChild(ul.lastChild);
          }
        }
        for(var count=0;count<mem.length; count++){

          var li = document.createElement('button');

          //変更するときの色付け
          if(mark_num === mem[count]){
            li.style.borderColor = "#3366FF";
          }

          var text = document.createTextNode(mem[count]);
          var c = check(girl, noob, mem[count]);
          if(c === 1){
            li.appendChild(text);
            li.style.color = "red";
          }else if (c === 2) {
            li.appendChild(text);
            li.style.color = "#33CC99";
          }else{
            li.appendChild(text);
          }
          ul.appendChild(li);
        }
      }
    }

    //プールを表示する関数
    function showPool(){
      //pool1
      var mem = pool1;

      mem.sort(compareFunc);

      var ul = document.getElementById('pool1');

      //２回目以降の確定を押したときの処理
      if(ul.hasChildNodes()){
        while(ul.lastChild){
          ul.removeChild(ul.lastChild);
        }
      }

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        //変更するときの色付け
        if(mark_num === mem[count]){
          li.style.borderColor = "#3366FF";
        }

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      //pool2
      var mem = pool2;

      mem.sort(compareFunc);

      var ul = document.getElementById('pool2');

      //２回目以降の確定を押したときの処理
      if(ul.hasChildNodes()){
        while(ul.lastChild){
          ul.removeChild(ul.lastChild);
        }
      }

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        //変更するときの色付け
        if(mark_num === mem[count]){
          li.style.borderColor = "#3366FF";
        }

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      //expool
      var mem = ex_pool;

      var ul = document.getElementById('ex_pool');

      //２回目以降の確定を押したときの処理
      if(ul.hasChildNodes()){
        while(ul.lastChild){
          ul.removeChild(ul.lastChild);
        }
      }

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
    }


    function test() {
      console.log("test");
    }
/////////////////////////////////////////////////////////////////////
    pool1 = (shuffleArray(pool1));

    const groupNumber = form.group_number.value;
    const member = 4;
    var group = {};
    if(groupNumber === "4"){
      var element = document.getElementById('group3');
      element.textContent = "グループ3"
      var element = document.getElementById('group4');
      element.textContent = "グループ4"
    }
    if(groupNumber === "5"){
      var element = document.getElementById('group3');
      element.textContent = "グループ3"
      var element = document.getElementById('group4');
      element.textContent = "グループ4"
      var element = document.getElementById('group5');
      element.textContent = "グループ5"
    }
  ///プールからグループに割り当てる
    for(i=0;i<groupNumber;i++){
      group[i] = [];
      for(j=0;j<member;j++){
        group[i][j] = pool1[0];
        match_count[pool1[0]]++;
        pool1.shift();
      }
    }

    //プールの表示
    showPool();



    //メンバーの交代
    document.querySelector('.button1').addEventListener('click', () => {
      counter++;
      shuffle(counter);
      data1 = gameSet(group[0], member, set1, l1);
      set1 = data1[0];
      l1 = data1[1];
      var mem = group[0].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list1');

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "#dc143c";
        }else if (c === 2) {
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "light#33CC99";
        }else{
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      showPool();
    });

    document.querySelector('.button2').addEventListener('click', () => {
      counter++;
      shuffle(counter);
      data2 =  gameSet(group[1], member, set2, l2);
      set2 = data2[0];
      l2 = data2[1];
      var mem = group[1].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list2');

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      showPool();
    });

    document.querySelector('.button3').addEventListener('click', () => {
      counter++;
      shuffle(counter);
      data3 = gameSet(group[2], member, set3, l3);
      set3 = data3[0];
      l3 = data3[1];
      var mem = group[2].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list3');

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      showPool();
    });

    document.querySelector('.button4').addEventListener('click', () => {
      counter++;
      shuffle(counter);
      data4 = gameSet(group[3], member, set4, l4);
      set4 = data4[0];
      l4 = data4[1];
      var mem = group[3].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list4');

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      showPool();
    });

    document.querySelector('.button5').addEventListener('click', () => {
      counter++;
      shuffle(counter);
      data5 = gameSet(group[4], member, set5, l5);
      set5 = data5[0];
      l5 = data5[1];
      var mem = group[4].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list5');

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      showPool();
    });

    document.querySelector('.button6').addEventListener('click', () => {
      counter++;
      shuffle(counter);
      data6 = gameSet(group[5], member, set6, l6);
      set6 = data6[0];
      l6 = data6[1];
      var mem = group[5].concat();
      //mem.sort(compareFunc);

      var ul = document.getElementById('member_list6');

      for(var count=0;count<mem.length; count++){

        var li = document.createElement('button');

        var text = document.createTextNode(mem[count]);
        var c = check(girl, noob, mem[count]);
        if(c === 1){
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "red";
        }else if (c === 2) {
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
          li.style.color = "#33CC99";
        }else{
          ul.removeChild(ul.firstElementChild);
          li.appendChild(text);
        }
        ul.appendChild(li);
      }
      showPool();
    });

    //メンバーの表示
    showMember(groupNumber);

    //手動交代

    document.getElementById('member_list1').onclick = function() {
      switch (type){
        case 0:
          var ul = event.target.parentNode;
          var li = ul.querySelectorAll("button");
          if(ex_num === -1){
            ex_num = Array.prototype.indexOf.call(li, event.target);
            ex_group = 0;
          }else{
            var ex_2 = Array.prototype.indexOf.call(li, event.target);
            if(group[0][ex_2] === undefined){
              return;
            }else{
              switch (ex_group) {
                case -1:
                  var tmp = pool1[ex_num];
                  pool1[ex_num] = group[0][ex_2];
                  group[0][ex_2] = tmp;
                  ex_num = -1;
                  break;
                  case -2:
                  var tmp = pool2[ex_num];
                  pool2[ex_num] = group[0][ex_2];
                  group[0][ex_2] = tmp;
                  ex_num = -1;
                  break;
                default:
                  var tmp = group[ex_group][ex_num];
                  group[ex_group][ex_num] = group[0][ex_2];
                  group[0][ex_2] = tmp;
                  console.log(group[0]);
                  ex_num = -1;
                  break;
                }
              }
            }
            chenge_num(group[0][ex_num]);
            mark_num = group[0][ex_num];
            break;
          case 1:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            //女子が配列にいるか確認
            chk = check(girl, noob, group[0][ex_num]);
            //色の削除
            girl = delColor(group[0], girl ,ex_num, chk);
            ex_num = -1;
            break;
          case 2:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            //初心者が配列にいるか確認
            chk = check(noob, girl, group[0][ex_num]);
            //色の削除
            noob = delColor(group[0], noob ,ex_num, chk);
            ex_num = -1;
            break;
          case 3:
            ex_num = -1;
            break;
          case 4:
            ex_num = -1;
            break;
          case 5:
            ex_num = -1;
            break;
          case 6:
            ex_num = -1;
            break;
          }
          showMember(groupNumber);
          showPool();
        }

    document.getElementById('member_list2').onclick = function() {
      switch (type){
        case 0:
          var ul = event.target.parentNode;
          var li = ul.querySelectorAll("button");
          if(ex_num === -1){
            ex_num = Array.prototype.indexOf.call(li, event.target);
            ex_group = 1;
            event.target.style.borderColor = "red";
          }else{
            var ex_2 = Array.prototype.indexOf.call(li, event.target);
            if(group[1][ex_2] === undefined){
              return;
            }else{
              switch (ex_group) {
                case -1:
                  var tmp = pool1[ex_num];
                  pool1[ex_num] = group[1][ex_2];
                  group[1][ex_2] = tmp;
                  ex_num = -1;
                  break;
                  case -2:
                  var tmp = pool2[ex_num];
                  pool2[ex_num] = group[1][ex_2];
                  group[1][ex_2] = tmp;
                  ex_num = -1;
                  break;
                default:
                  var tmp = group[ex_group][ex_num];
                  group[ex_group][ex_num] = group[1][ex_2];
                  group[1][ex_2] = tmp;
                  console.log(group[1]);
                  ex_num = -1;
                  break;
                }
              }
            }
            chenge_num(group[1][ex_num]);
            mark_num = group[1][ex_num];
            break;
          case 1:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            //女子が配列にいるか確認
            chk = check(girl, noob, group[1][ex_num]);
            //色の削除
            girl = delColor(group[1], girl ,ex_num, chk);
            ex_num = -1;
            break;
          case 2:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            //初心者が配列にいるか確認
            chk = check(noob, girl, group[1][ex_num]);
            //色の削除
            noob = delColor(group[1], noob ,ex_num, chk);
            ex_num = -1;
            break;
          case 3:
            ex_num = -1;
            break;
          case 4:
            ex_num = -1;
            break;
          case 5:
            ex_num = -1;
            break;
          case 6:
            ex_num = -1;
            break;
          }
          showMember(groupNumber);
          showPool();
        }

      document.getElementById('member_list3').onclick = function() {
        switch (type){
          case 0:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            if(ex_num === -1){
              ex_num = Array.prototype.indexOf.call(li, event.target);
              ex_group = 2;
            }else{
              var ex_2 = Array.prototype.indexOf.call(li, event.target);
              if(group[2][ex_2] === undefined){
                return;
              }else{
                switch (ex_group) {
                  case -1:
                    var tmp = pool1[ex_num];
                    pool1[ex_num] = group[2][ex_2];
                    group[2][ex_2] = tmp;
                    ex_num = -1;
                    break;
                    case -2:
                    var tmp = pool2[ex_num];
                    pool2[ex_num] = group[2][ex_2];
                    group[2][ex_2] = tmp;
                    ex_num = -1;
                    break;
                  default:
                    var tmp = group[ex_group][ex_num];
                    group[ex_group][ex_num] = group[2][ex_2];
                    group[2][ex_2] = tmp;
                    console.log(group[2]);
                    ex_num = -1;
                    break;
                  }
                }
              }
              chenge_num(group[2][ex_num]);
              mark_num = group[2][ex_num];
              break;
            case 1:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              //女子が配列にいるか確認
              chk = check(girl, noob, group[2][ex_num]);
              //色の削除
              girl = delColor(group[2], girl ,ex_num, chk);
              ex_num = -1;
              break;
            case 2:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              //初心者が配列にいるか確認
              chk = check(noob, girl, group[2][ex_num]);
              //色の削除
              noob = delColor(group[2], noob ,ex_num, chk);
              ex_num = -1;
              break;
            case 3:
              ex_num = -1;
              break;
            case 4:
              ex_num = -1;
              break;
            case 5:
              ex_num = -1;
              break;
            case 6:
              ex_num = -1;
              break;
            }
            showMember(groupNumber);
            showPool();
          }

      document.getElementById('member_list4').onclick = function() {
        switch (type){
          case 0:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            if(ex_num === -1){
              ex_num = Array.prototype.indexOf.call(li, event.target);
              ex_group = 3;
            }else{
              var ex_2 = Array.prototype.indexOf.call(li, event.target);
              if(group[3][ex_2] === undefined){
                return;
              }else{
                switch (ex_group) {
                  case -1:
                    var tmp = pool1[ex_num];
                    pool1[ex_num] = group[3][ex_2];
                    group[3][ex_2] = tmp;
                    ex_num = -1;
                    break;
                    case -2:
                    var tmp = pool2[ex_num];
                    pool2[ex_num] = group[3][ex_2];
                    group[3][ex_2] = tmp;
                    ex_num = -1;
                    break;
                  default:
                    var tmp = group[ex_group][ex_num];
                    group[ex_group][ex_num] = group[3][ex_2];
                    group[3][ex_2] = tmp;
                    console.log(group[3]);
                    ex_num = -1;
                    break;
                  }
                }
              }
              chenge_num(group[3][ex_num]);
              mark_num = group[3][ex_num];
              break;
            case 1:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              //女子が配列にいるか確認
              chk = check(girl, noob, group[3][ex_num]);
              //色の削除
              girl = delColor(group[3], girl ,ex_num, chk);
              ex_num = -1;
              break;
            case 2:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              //初心者が配列にいるか確認
              chk = check(noob, girl, group[3][ex_num]);
              //色の削除
              noob = delColor(group[3], noob ,ex_num, chk);
              ex_num = -1;
              break;
            case 3:
              ex_num = -1;
              break;
            case 4:
              ex_num = -1;
              break;
            case 5:
              ex_num = -1;
              break;
            case 6:
              ex_num = -1;
              break;
            }
            showMember(groupNumber);
            showPool();
          }

          document.getElementById('member_list5').onclick = function() {
            switch (type){
              case 0:
                var ul = event.target.parentNode;
                var li = ul.querySelectorAll("button");
                if(ex_num === -1){
                  ex_num = Array.prototype.indexOf.call(li, event.target);
                  ex_group = 4;
                }else{
                  var ex_2 = Array.prototype.indexOf.call(li, event.target);
                  if(group[4][ex_2] === undefined){
                    return;
                  }else{
                    switch (ex_group) {
                      case -1:
                        var tmp = pool1[ex_num];
                        pool1[ex_num] = group[4][ex_2];
                        group[4][ex_2] = tmp;
                        ex_num = -1;
                        break;
                        case -2:
                        var tmp = pool2[ex_num];
                        pool2[ex_num] = group[4][ex_2];
                        group[4][ex_2] = tmp;
                        ex_num = -1;
                        break;
                      default:
                        var tmp = group[ex_group][ex_num];
                        group[ex_group][ex_num] = group[4][ex_2];
                        group[4][ex_2] = tmp;
                        console.log(group[4]);
                        ex_num = -1;
                        break;
                      }
                    }
                  }
                  chenge_num(group[4][ex_num]);
                  mark_num = group[4][ex_num];
                  break;
                case 1:
                  var ul = event.target.parentNode;
                  var li = ul.querySelectorAll("button");
                  ex_num = Array.prototype.indexOf.call(li, event.target);
                  //女子が配列にいるか確認
                  chk = check(girl, noob, group[4][ex_num]);
                  //色の削除
                  girl = delColor(group[4], girl ,ex_num, chk);
                  ex_num = -1;
                  break;
                case 2:
                  var ul = event.target.parentNode;
                  var li = ul.querySelectorAll("button");
                  ex_num = Array.prototype.indexOf.call(li, event.target);
                  //初心者が配列にいるか確認
                  chk = check(noob, girl, group[4][ex_num]);
                  //色の削除
                  noob = delColor(group[4], noob ,ex_num, chk);
                  ex_num = -1;
                  break;
                case 3:
                  ex_num = -1;
                  break;
                case 4:
                  ex_num = -1;
                  break;
                case 5:
                  ex_num = -1;
                  break;
                case 6:
                  ex_num = -1;
                  break;
                }
                showMember(groupNumber);
                showPool();
              }

              document.getElementById('member_list6').onclick = function() {
                switch (type){
                  case 0:
                    var ul = event.target.parentNode;
                    var li = ul.querySelectorAll("button");
                    if(ex_num === -1){
                      ex_num = Array.prototype.indexOf.call(li, event.target);
                      ex_group = 5;
                    }else{
                      var ex_2 = Array.prototype.indexOf.call(li, event.target);
                      if(group[5][ex_2] === undefined){
                        return;
                      }else{
                        switch (ex_group) {
                          case -1:
                            var tmp = pool1[ex_num];
                            pool1[ex_num] = group[5][ex_2];
                            group[5][ex_2] = tmp;
                            ex_num = -1;
                            break;
                            case -2:
                            var tmp = pool2[ex_num];
                            pool2[ex_num] = group[5][ex_2];
                            group[5][ex_2] = tmp;
                            ex_num = -1;
                            break;
                          default:
                            var tmp = group[ex_group][ex_num];
                            group[ex_group][ex_num] = group[5][ex_2];
                            group[5][ex_2] = tmp;
                            console.log(group[5]);
                            ex_num = -1;
                            break;
                          }
                        }
                      }
                      chenge_num(group[5][ex_num]);
                      mark_num = group[5][ex_num];
                      break;
                    case 1:
                      var ul = event.target.parentNode;
                      var li = ul.querySelectorAll("button");
                      ex_num = Array.prototype.indexOf.call(li, event.target);
                      //女子が配列にいるか確認
                      chk = check(girl, noob, group[5][ex_num]);
                      //色の削除
                      girl = delColor(group[5], girl ,ex_num, chk);
                      ex_num = -1;
                      break;
                    case 2:
                      var ul = event.target.parentNode;
                      var li = ul.querySelectorAll("button");
                      ex_num = Array.prototype.indexOf.call(li, event.target);
                      //初心者が配列にいるか確認
                      chk = check(noob, girl, group[5][ex_num]);
                      //色の削除
                      noob = delColor(group[5], noob ,ex_num, chk);
                      ex_num = -1;
                      break;
                    case 3:
                      ex_num = -1;
                      break;
                    case 4:
                      ex_num = -1;
                      break;
                    case 5:
                      ex_num = -1;
                      break;
                    case 6:
                      ex_num = -1;
                      break;
                    }
                    showMember(groupNumber);
                    showPool();
                  }

    document.getElementById('pool1').onclick = function() {
      switch (type){
        case 0:
          var ul = event.target.parentNode;
          var li = ul.querySelectorAll("button");
          if(ex_num === -1){
            ex_num = Array.prototype.indexOf.call(li, event.target);
            ex_group = -1;
          }else{
            var ex_2 = Array.prototype.indexOf.call(li, event.target);
            if(pool1[ex_2] === undefined){
              return;
            }else{
              switch (ex_group) {
                case -1:
                  var tmp = pool1[ex_num];
                  pool1[ex_num] = pool1[ex_2];
                  pool1[ex_2] = tmp;
                  ex_num = -1;
                  break;
                case -2:
                  var tmp = pool2[ex_num];
                  pool2[ex_num] = pool1[ex_2];
                  pool1[ex_2] = tmp;
                  ex_num = -1;
                  break;
                default:
                  var tmp = group[ex_group][ex_num];
                  group[ex_group][ex_num] = pool1[ex_2];
                  pool1[ex_2] = tmp;
                  ex_num = -1;
                  break;
                  }
                }
              }
            chenge_num(pool1[ex_num]);
            mark_num = pool1[ex_num];
            break;
          case 1:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            //女子が配列にいるか確認
            chk = check(girl, noob, pool1[ex_num]);
            //色の削除
            girl = delColor(pool1, girl ,ex_num, chk);
            ex_num = -1;
            break;
          case 2:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            //初心者が配列にいるか確認
            chk = check(noob, girl, pool1[ex_num]);
            //色の削除
            noob = delColor(pool1, noob ,ex_num, chk);
            ex_num = -1;
            break;
          case 3:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            confirm(pool1, ex_num);
            ex_num = -1;
            break;
          case 4:
            ex_num = -1;
            break;
          case 5:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            if(pool1[ex_num] === undefined){
              return;
            }else{
              move(pool1, pool2, ex_num);
              ex_num = -1;
              break;
            }
          case 6:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            ex_num = Array.prototype.indexOf.call(li, event.target);
            if(pool1[ex_num] === undefined){
              return;
            }else{
              move(pool1, ex_pool, ex_num);
              ex_num = -1;
              break;
            }
          }
          showMember(groupNumber);
          showPool();
      }

      document.getElementById('pool2').onclick = function() {
        switch (type){
          case 0:
            var ul = event.target.parentNode;
            var li = ul.querySelectorAll("button");
            if(ex_num === -1){
              ex_num = Array.prototype.indexOf.call(li, event.target);
              ex_group = -2;
            }else{
              var ex_2 = Array.prototype.indexOf.call(li, event.target);
              if(pool2[ex_2] === undefined){
                return;
              }else{
                switch (ex_group) {
                  case -1:
                    var tmp = pool1[ex_num];
                    pool1[ex_num] = pool2[ex_2];
                    pool2[ex_2] = tmp;
                    ex_num = -1;
                    break;
                  case -2:
                    var tmp = pool2[ex_num];
                    pool2[ex_num] = pool2[ex_2];
                    pool2[ex_2] = tmp;
                    ex_num = -1;
                    break;
                  default:
                    var tmp = group[ex_group][ex_num];
                    group[ex_group][ex_num] = pool2[ex_2];
                    pool2[ex_2] = tmp;
                    ex_num = -1;
                    break;
                    }
                  }
                }
              chenge_num(pool2[ex_num]);
              mark_num = pool2[ex_num];
              break;
            case 1:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              //女子が配列にいるか確認
              chk = check(girl, noob, pool2[ex_num]);
              //色の削除
              girl = delColor(pool2, girl ,ex_num, chk);
              ex_num = -1;
              break;
            case 2:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              //初心者が配列にいるか確認
              chk = check(noob, girl, pool2[ex_num]);
              //色の削除
              noob = delColor(pool2, noob,ex_num, chk);
              ex_num = -1;
              break;
            case 3:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              confirm(pool2, ex_num);
              ex_num = -1;
              break;
            case 4:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              if(pool2[ex_num] === undefined){
                return;
              }else{
                move(pool2, pool1, ex_num);
                ex_num = -1;
                break;
              }
            case 5:
              ex_num = -1;
              break;
            case 6:
              var ul = event.target.parentNode;
              var li = ul.querySelectorAll("button");
              ex_num = Array.prototype.indexOf.call(li, event.target);
              if(pool2[ex_num] === undefined){
                return;
              }else{
                move(pool2, ex_pool, ex_num);
                ex_num = -1;
                break;
              }
            }
            showMember(groupNumber);
            showPool();
        }
        document.getElementById('ex_pool').onclick = function() {
          switch (type){
              case 1:
                ex_num = -1;
                break;
              case 2:
                ex_num = -1;
                break;
              case 3:
                var ul = event.target.parentNode;
                var li = ul.querySelectorAll("button");
                ex_num = Array.prototype.indexOf.call(li, event.target);
                confirm(ex_pool, ex_num);
                break;
              case 4:
                var ul = event.target.parentNode;
                var li = ul.querySelectorAll("button");
                ex_num = Array.prototype.indexOf.call(li, event.target);
                if(ex_pool[ex_num] === undefined){
                  return;
                }else{
                  move(ex_pool, pool1, ex_num);
                  break;
                }
              case 5:
                var ul = event.target.parentNode;
                var li = ul.querySelectorAll("button");
                ex_num = Array.prototype.indexOf.call(li, event.target);
                if(ex_pool[ex_num] === undefined){
                  return;
                }else{
                  move(ex_pool, pool2, ex_num);
                  break;
              }
              case 6:
                ex_num = -1;
                break;
            }
            showMember(groupNumber);
            showPool();
          }

    //女子の割り振り
    document.getElementById('girl_btn').onclick = function () {
      const girl_number1 = document.getElementById('girl_num1');
      const girl_number2 = document.getElementById('girl_num2');
      var g_num1 = Number(girl_number1.value);
      var g_num2 = Number(girl_number2.value);
      var i = g_num1;
      for(i;i<=g_num2;i++){
        for(var j=0;j<pool1.length;j++){
          if(i === pool1[j]){
            var chk = check(girl, noob, i);
            if(chk === 0){
              girl.push(i);
            }
          }
        }
        for(j=0;j<groupNumber;j++){
          for(var k=0;k<member;k++){
            if(i === group[j][k]){
              var chk = check(girl, noob, i);
              if(chk === 0){
                girl.push(i);
              }
            }
          }
        }
      }
      console.log(girl);
      showMember(groupNumber);
      showPool();
    }

    document.getElementById('change').onclick = function(){
      type = 0;
      var mode = document.getElementById('mode').textContent = 'メンバー変更:';
    }
    document.getElementById('girl').onclick = function(){
      type = 1;
      var mode = document.getElementById('mode').textContent = 'マーク:女子';
    }
    document.getElementById('noob').onclick = function(){
      type = 2;
      var mode = document.getElementById('mode').textContent = 'マーク:初心者';
    }
    document.getElementById('delete').onclick = function(){
      type = 3;
      var mode = document.getElementById('mode').textContent = 'メンバー削除';
    }
    document.getElementById('pool1_move').onclick = function(){
      type = 4;
      var mode = document.getElementById('mode').textContent = 'プール1に移動';
    }
    document.getElementById('pool2_move').onclick = function(){
      type = 5;
      var mode = document.getElementById('mode').textContent = 'プール2に移動';
    }
    document.getElementById('ex_btn').onclick = function(){
      type = 6;
      var mode = document.getElementById('mode').textContent = '予備に移動';
    }

  }

}
