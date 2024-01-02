export default function LeadsPlayers() {
    function sortByAverage(user1,user2) {
        if(user1[1]< user2[1])
        {
            return -1;
        }
        else if(user1[1]> user2[1])
        {
            return 1;
        }
        else (user1[1] ==  user2[1])
        {
            return 0;
        }
    }

   let userAverage=[]
   let CurrentGameUserArr = JSON.parse(
    localStorage.getItem("users")
  );
   for (let i = 0; i < CurrentGameUserArr.length; i++) {
        let user=CurrentGameUserArr[i]
        let numOfGames=user.steps.length;
        if(numOfGames){
            let sumActivity=0;
            let numWinActivity=0;
            for (let j = 0; j < numOfGames; j++) {
                if(user.steps[j]){
                    sumActivity += user.steps[j];
                    numWinActivity++;
                }
            }
            if(sumActivity){
                userAverage.push([(sumActivity/numWinActivity),user.name]);
            }
        }
    }
    userAverage.sort(sortByAverage);

    return(
        <>
        <h2>🏆שחקנים מובילים 🏆</h2>
        {userAverage.length > 0 && <span> מקום ראשון  {userAverage[0][1]} 🥇</span>}
        {userAverage.length > 1 && <span> מקום שני {userAverage[1][1]} 🥈</span>}
        {userAverage.length > 2 && <span> מקום שלישי  {userAverage[2][1]} 🥉</span>}
    </>
        
    )
}